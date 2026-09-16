"""Plan the bounded R01 import against a fresh readback; never calls Airtable.

Run scalars, refresh, links, refresh, all. The final all plan should be empty.
The external executor must check base/table IDs and apply only this plan.
"""
import argparse
import os
import json
from datetime import datetime
from pathlib import Path

evidence_dir = os.environ.get('DCA_R01_EVIDENCE_DIR')
if not evidence_dir:
    raise SystemExit('Set DCA_R01_EVIDENCE_DIR to the private extracted r01 evidence directory; do not copy evidence into the repository.')
ROOT = Path(evidence_dir).expanduser().resolve()
if not ROOT.is_dir():
    raise SystemExit('DCA_R01_EVIDENCE_DIR must be an existing directory.')
TARGET = 'appTpzRmniNpMv35Q'
parser = argparse.ArgumentParser()
parser.add_argument('--phase', choices=['scalars', 'links', 'all'], required=True)
args = parser.parse_args()
manifest = json.loads((ROOT / 'manifest.json').read_text())
schema = json.loads((ROOT / 'target_schema_before_load.json').read_text())
live = json.loads((ROOT / 'live_records.json').read_text())
assert manifest['target_base_id'] == TARGET == live['base_id']
tables = {t['name']: t for t in schema['tables']}
field_maps = {n: {f['name']: f for f in t['fields']} for n, t in tables.items()}
existing = {}
for group in live['tables']:
    table = tables[group['name']]
    assert table['id'] == group['id']
    assert not group['result'].get('nextCursor'), 'Read all pages first'
    key_field = field_maps[group['name']]['migration_key']['id']
    for row in group['result']['records']:
        key = row['cellValuesByFieldId'].get(key_field)
        assert key and key not in existing, 'Missing or duplicate migration key'
        existing[key] = (group['name'], row)

def normalize(value, field_type):
    if field_type == 'checkbox': return bool(value)
    if field_type == 'multipleRecordLinks':
        return sorted(x['id'] if isinstance(x, dict) else x for x in (value or []))
    if field_type == 'singleSelect' and isinstance(value, dict): return value['name']
    if field_type == 'multipleSelects':
        return sorted(x['name'] if isinstance(x, dict) else x for x in (value or []))
    if field_type == 'dateTime' and value:
        return datetime.fromisoformat(value.replace('Z', '+00:00')).isoformat()
    return '' if value is None else value

plan = {'base_id': TARGET, 'phase': args.phase, 'create': [], 'update': [], 'unchanged': 0}
assert len({r['key'] for r in manifest['records']}) == len(manifest['records'])
for row in manifest['records']:
    table, key = row['table'], row['key']
    fields = field_maps[table]
    desired = {}
    if args.phase in ['scalars', 'all']:
        for name, value in row['fields'].items():
            assert name in fields, (table, name)
            assert fields[name]['type'] not in ['formula', 'createdTime', 'lastModifiedTime', 'autoNumber']
            desired[fields[name]['id']] = value
    if args.phase in ['links', 'all']:
        for name, targets in row['links'].items():
            assert fields[name]['type'] == 'multipleRecordLinks'
            assert all(k in existing for k in targets), 'Refresh after scalar creation before linking'
            desired[fields[name]['id']] = [existing[k][1]['id'] for k in targets]
    if key not in existing:
        assert args.phase == 'scalars', 'Scalar phase must complete first'
        plan['create'].append({'table': table, 'table_id': tables[table]['id'], 'key': key, 'fields': desired})
        continue
    actual_table, actual = existing[key]
    assert actual_table == table
    field_types = {f['id']: f['type'] for f in tables[table]['fields']}
    changes = {fid: value for fid, value in desired.items()
               if normalize(actual['cellValuesByFieldId'].get(fid), field_types[fid]) != normalize(value, field_types[fid])}
    if changes:
        plan['update'].append({'table': table, 'table_id': tables[table]['id'], 'key': key, 'id': actual['id'], 'fields': changes})
    else:
        plan['unchanged'] += 1
(ROOT / ('plan_' + args.phase + '.json')).write_text(json.dumps(plan, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'phase': args.phase, 'create': len(plan['create']), 'update': len(plan['update']), 'unchanged': plan['unchanged']}))
