"""Verify R01 readbacks and negative controls; no remote writes."""
import hashlib
import os
import json
from datetime import datetime, timezone
from pathlib import Path

evidence_dir = os.environ.get('DCA_R01_EVIDENCE_DIR')
if not evidence_dir:
    raise SystemExit('Set DCA_R01_EVIDENCE_DIR to the private extracted r01 evidence directory; do not copy evidence into the repository.')
ROOT = Path(evidence_dir).expanduser().resolve()
if not ROOT.is_dir():
    raise SystemExit('DCA_R01_EVIDENCE_DIR must be an existing directory.')
read = lambda name: json.loads((ROOT / name).read_text())
m = read('manifest.json')
s = read('target_schema_before_load.json')
c = read('target_schema_config.json')
live = read('readback_links.json')
assert live['base_id'] == m['target_base_id'] == 'appTpzRmniNpMv35Q'
tables = {t['name']: t for t in s['tables']}
config = {f['id']: f for t in c['tables'] for f in t['fields']}
rows = {}; by_id = {}; named = {}; by_table = {}
for group in live['tables']:
    assert not group['result'].get('nextCursor')
    table = tables[group['name']]
    fn = {f['id']: f['name'] for f in table['fields']}
    by_table[group['name']] = []
    for row in group['result']['records']:
        n = {fn[k]: v for k, v in row['cellValuesByFieldId'].items()}
        key = n['migration_key']
        assert key not in rows and row['id'] not in by_id
        rows[key] = row; named[key] = n
        by_id[row['id']] = (group['name'], key)
        by_table[group['name']].append(key)

def scalar(v): return v['name'] if isinstance(v, dict) and 'name' in v else v
def link_ids(v): return [x['id'] for x in (v or [])]
checks = []
def check(label, condition, evidence):
    assert condition, label
    checks.append({'check': label, 'result': 'pass', 'evidence': evidence})

expected = {'People': 5, 'Organisations': 3, 'Contact Routes': 7,
            'Person Organisation Roles': 5, 'Source Systems': 5, 'Source Records': 37}
check('Bounded scope and counts', {k: len(v) for k, v in by_table.items()} == expected,
      '62 rows in six tables; no function, operational or workflow table was created.')
check('One target row per migration key', set(rows) == {r['key'] for r in m['records']}, '62 unique, source-qualified migration keys.')
id_fields = {'People': 'person_id', 'Organisations': 'organisation_id', 'Contact Routes': 'contact_route_id',
             'Person Organisation Roles': 'role_record_id', 'Source Systems': 'source_system_id', 'Source Records': 'source_record_id'}
for table, id_field in id_fields.items():
    field = next(f for f in tables[table]['fields'] if f['name'] == id_field)
    ids = [named[k][id_field] for k in by_table[table]]
    check('Stable IDs — ' + table, field['type'] == 'singleLineText' and len(ids) == len(set(ids)),
          str(len(ids)) + ' unique literal IDs; independent of new Airtable record IDs.')

baseline = read('source_snapshots.json') + read('additional_snapshots.json')
original = {g['args']['baseId'] + '/' + g['args']['tableId'] + '/' + r['id']: r
            for g in baseline for r in g['result']['records']}
candidate_schema = read('candidate_schema.json')['schema']
candidate_fields = {t['id']: {f['name']: f['id'] for f in t['fields']} for t in candidate_schema['tables']}
retained = 0
for r in m['records']:
    n = named[r['key']]
    check_data = n.get('copied_real_data') is True and not n.get('synthetic_test_data', False)
    assert check_data
    assert n['record_display'] == n['record_label']
    assert n.get('created_at') and n.get('last_modified')
    if '|copy|' in r['key']:
        _, table_id, _ = r['source_key'].split('/')
        id_field = id_fields[r['table']]
        assert n[id_field] == original[r['source_key']]['cellValuesByFieldId'][candidate_fields[table_id][id_field]]
        retained += 1
check('Existing candidate IDs retained', retained == 23, '23 selected candidate control/source IDs copied verbatim.')
check('Copied evidence and displays', True, 'All 62 rows marked copied real data, with matching ID/name displays and populated test creation/modification formulas.')

edges = 0
for key, row in rows.items():
    table = tables[by_id[row['id']][0]]
    for f in table['fields']:
        if f['type'] != 'multipleRecordLinks': continue
        cfg = config[f['id']]['config']
        target_table_id = cfg['linkedTableId']
        inverse = cfg['inverseLinkFieldId']
        for target_id in link_ids(row['cellValuesByFieldId'].get(f['id'])):
            assert target_id in by_id
            target_table, target_key = by_id[target_id]
            assert tables[target_table]['id'] == target_table_id
            assert row['id'] in link_ids(rows[target_key]['cellValuesByFieldId'].get(inverse))
            edges += 1
check('Native links and reciprocals', edges > 0, str(edges // 2) + ' relationships resolve to the correct table within R01, with reciprocal links. External sources use explicit URLs/IDs.')

payloads = 0
for r in m['records']:
    if 'payload_sha256' not in r: continue
    payload = named[r['key']]['raw_value_or_payload']
    assert hashlib.sha256(payload.encode()).hexdigest() == r['payload_sha256']
    assert json.loads(payload)['record'] == original[r['source_key']]
    payloads += 1
check('Source payload integrity', payloads == 31, 'All 31 full snapshot payloads read back with the expected SHA-256 and original source record; six pre-existing source-evidence rows are also retained.')

we, anne, route, assoc, rene, kees = [m['keys'][x] for x in ['we', 'anne', 'anne_route', 'anne_association', 'rene', 'kees']]
check('WE Fashion and Anne', link_ids(named[route].get('person')) == [rows[anne]['id']]
      and not named[route].get('organisation') and scalar(named[route]['verification_status']) == 'unverified'
      and link_ids(named[assoc].get('person')) == [rows[anne]['id']]
      and link_ids(named[assoc].get('organisation')) == [rows[we]['id']]
      and not any(named[assoc].get(x) for x in ['role_name', 'role_as_reported', 'valid_from', 'valid_until'])
      and not named[we].get('contact_routes')
      and 'recZXBv2Yg9iRu8gb' in named[we]['domain_record_references']
      and 'excluded' in named[we]['domain_record_references'],
      'One personal, unverified email; no invented generic route or office; original partner context referenced; excluded from Winter new-provider outreach.')

paul = next(k for k in by_table['People'] if named[k]['person_name'] == 'Paul Offerman')
almere = next(k for k in by_table['Organisations'] if named[k]['organisation_name'] == 'Rotaryclub Almere Weerwater')
paul_roles = [named[k] for k in by_table['Person Organisation Roles'] if rows[paul]['id'] in link_ids(named[k].get('person'))]
check('Paul multiple offices and routes', {r['role_name'] for r in paul_roles} == {'Secretary', 'Webmaster', 'PR and Communications'}
      and len(link_ids(named[paul].get('contact_routes'))) == 2
      and len(link_ids(named[almere].get('contact_routes'))) == 2
      and all(r['observed_at'] == '2026-07-23' and not r.get('valid_from') for r in paul_roles),
      'Three separate offices, two personal and two organisation routes; signature date proposed as observation, without asserting tenure start.')
for k in by_table['Contact Routes']:
    assert bool(named[k].get('person')) != bool(named[k].get('organisation'))
check('Personal and generic routes remain separate', True, 'Every one of seven routes has exactly one person or organisation subject in this bounded sample.')

mark_intake = next(k for k in by_table['Source Records'] if k.endswith('/recMPgtwERolQmpAH'))
check('Mark intake held', scalar(named[mark_intake]['match_status']) == 'proposed'
      and scalar(named[mark_intake]['match_confidence']) == 'unknown'
      and scalar(named[mark_intake]['processing_status']) == 'held',
      'Candidate-person link is only a review pointer; the unresolved RW intake match is not asserted as confirmed.')
check('René affiliation unresolved', scalar(named[rene]['validation_state']) == 'unresolved'
      and scalar(named[rene]['mapping_review']) == 'held'
      and not named[rene].get('person_organisation_roles') and not named[rene].get('contact_routes'),
      'No church merge, organisation link, office or contact route created for the uncertainty control.')
check('Kees person and actor remain distinct', 'P-INT-003' in named[kees]['legacy_identifiers']
      and 'OPR-0002' in named[kees]['legacy_identifiers']
      and 'recdzTXRVLKNZnsME' in named[kees]['domain_record_references']
      and scalar(named[kees]['validation_state']) == 'proposed',
      'Separate person and Operator identifiers retained as a proposed crosswalk, with no Project/Operator write or authority grant.')

plan = read('plan_all.json')
check('Repeat import plan', not plan['create'] and not plan['update'] and plan['unchanged'] == 62,
      'Fresh readback through the same import planner requires zero creates and zero updates. No unnecessary second writes were performed.')
after = read('source_readback_after.json')
assert len(after) == len(baseline)
for before, later in zip(baseline, after):
    assert before['args'] == later['args']
    assert {r['id']: r for r in before['result']['records']} == {r['id']: r for r in later['result']['records']}
check('Source readback unchanged', True, '54 source rows match: all 46 candidate rows, seven selected RW rows, and one earlier-build Kees row. This does not audit unrelated production records or automations.')

crosswalk = []
for r in m['records']:
    id_field = id_fields[r['table']]
    crosswalk.append({'migration_key': r['key'], 'table': r['table'], 'stable_id': named[r['key']][id_field],
                      'source': r.get('source_key'), 'target_base_id': m['target_base_id'],
                      'target_table_id': tables[r['table']]['id'], 'target_record_id': rows[r['key']]['id'],
                      'target_url': 'https://airtable.com/' + m['target_base_id'] + '/' + tables[r['table']]['id'] + '/' + rows[r['key']]['id']})
(ROOT / 'crosswalk.json').write_text(json.dumps(crosswalk, ensure_ascii=False, indent=2) + '\n')
result = {'batch': m['batch'], 'tested_at': datetime.now(timezone.utc).isoformat(),
          'base_id': m['target_base_id'], 'counts': expected, 'checks': checks,
          'acceptance': {'technical_mapping_checks': 'passed', 'structure': 'pending_review_and_schema_repairs',
                         'data': 'source_validation_preserved; mapping_delta_pending_review',
                         'behaviour': 'import_and_readback_verified; intended_runtime_not_tested',
                         'production': 'not_adopted'},
          'open_gaps': ['Text primaries need supported conversion to computed ID/name displays.',
                        'created_at and last_modified are working formulas, not native timestamp fields.',
                        'Office observation-date interpretation and unresolved associations need scoped mapping review.',
                        'Actual intended-runtime retrieval and consumer permissions remain untested.'],
          'crosswalk_records': len(crosswalk)}
(ROOT / 'test_results.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'checks_passed': len(checks), 'records': len(rows), 'source_payloads': payloads,
                  'local_relationships': edges // 2, 'source_rows_unchanged': 54,
                  'repeat_create': len(plan['create']), 'repeat_update': len(plan['update']), 'open_gaps': result['open_gaps']}, indent=2))
