import os
import json, uuid, hashlib
from pathlib import Path
from datetime import datetime, timezone

evidence_dir = os.environ.get('DCA_R01_EVIDENCE_DIR')
if not evidence_dir:
    raise SystemExit('Set DCA_R01_EVIDENCE_DIR to the private extracted r01 evidence directory; do not copy evidence into the repository.')
DIR = Path(evidence_dir).expanduser().resolve()
if not DIR.is_dir():
    raise SystemExit('DCA_R01_EVIDENCE_DIR must be an existing directory.')
TARGET = 'appTpzRmniNpMv35Q'
CANDIDATE = 'appScO2P8fD8yprCW'
RW = 'appMdqKYTMnPmVoVu'
MZ = 'appMzETiiWf5oev2f'
BATCH = 'IDENTITY-R01'
snapshots = json.loads((DIR / 'source_snapshots.json').read_text()) + json.loads((DIR / 'additional_snapshots.json').read_text())
candidate = json.loads((DIR / 'candidate_schema.json').read_text())['schema']
schemas = {CANDIDATE: candidate, RW: json.loads((DIR / 'source_schemas/appMdqKYTMnPmVoVu.json').read_text()), MZ: json.loads((DIR / 'source_schemas/appMzETiiWf5oev2f.json').read_text())}
idfile = DIR / 'persistent_ids.json'
id_registry = json.loads(idfile.read_text()) if idfile.exists() else {}
captured = id_registry.setdefault('_snapshot_time', datetime.now(timezone.utc).isoformat())

def persistent(key, prefix):
    return id_registry.setdefault(key, prefix + '-' + str(uuid.uuid4()))

def norm(v):
    if isinstance(v, dict) and 'name' in v and 'id' in v: return v['name']
    if isinstance(v, list) and all(isinstance(a, dict) and 'name' in a for a in v): return [a['name'] for a in v]
    return v

def links(v):
    if isinstance(v, list): return [a['id'] for a in v if isinstance(a, dict) and 'id' in a]
    return []

raw = {}; named = {}; meta = {}; by_table = {}
for group in snapshots:
    b, t = group['args']['baseId'], group['args']['tableId']
    table = next(x for x in schemas[b]['tables'] if x['id'] == t)
    field_names = {f['id']: f['name'] for f in table['fields']}
    for row in group['result']['records']:
        key = b + '/' + t + '/' + row['id']
        raw[key] = row
        named[key] = {field_names.get(k, k): v for k, v in row['cellValuesByFieldId'].items()}
        meta[key] = (b, t, row['id'], table['name'])
        by_table.setdefault((b, table['name']), []).append(key)

def find(b, rid): return next(k for k in raw if meta[k][0] == b and meta[k][2] == rid)
def url(key): return 'https://airtable.com/' + key
def copykey(key): return BATCH + '|copy|' + key
def mapkey(key, kind): return BATCH + '|map|' + key + '|' + kind
def snapshotkey(key): return BATCH + '|snapshot|' + key

def common(key, purpose, migration_key, note=''):
    n = named[key]
    result = {'migration_key': migration_key, 'test_batch': BATCH, 'sample_purpose': purpose,
              'copied_real_data': True, 'synthetic_test_data': False, 'mapping_review': 'pending_review',
              'source_record_url': url(key), 'source_created_at': raw[key]['createdTime'],
              'migration_note': note}
    changed = n.get('last_modified') or n.get('Last Modified Time') or n.get('last_modified_at')
    if isinstance(changed, str): result['source_modified_at'] = changed
    return result

id_fields = {'People':'person_id','Organisations':'organisation_id','Contact_Routes':'contact_route_id',
             'Person_Organisation_Roles':'role_record_id','Source_Systems':'source_system_id','Source_Records':'source_record_id'}
labels = {'People':'person_name','Organisations':'organisation_name','Contact_Routes':'contact_route',
          'Person_Organisation_Roles':'role_record','Source_Systems':'source_system_name','Source_Records':'source_record_key'}
prefixes = {'People':'PER','Organisations':'ORG','Contact_Routes':'CRT','Person_Organisation_Roles':'POR','Source_Systems':'SYS','Source_Records':'SRC'}

selected = set()
for rid in ['recDKSDDqic9LHKd9','recoQhxJccPY3fxht','rectqiWBeFBFYFxhn','rec6L3EmTTN8bhaOD']:
    selected.add(find(CANDIDATE, rid))
party_ids = {meta[k][2] for k in selected}
for table_name in ['Contact_Routes', 'Person_Organisation_Roles']:
    for k in by_table[(CANDIDATE, table_name)]:
        if party_ids.intersection(links(named[k].get('person')) + links(named[k].get('organisation'))): selected.add(k)
source_ids = set()
for k in list(selected): source_ids.update(links(named[k].get('source_records')))
for rid in source_ids: selected.add(find(CANDIDATE, rid))
system_ids = set()
for k in list(selected): system_ids.update(links(named[k].get('source_system')))
for rid in system_ids: selected.add(find(CANDIDATE, rid))

records = []
for k in sorted(selected):
    table_name = meta[k][3]
    table_schema = next(t for t in candidate['tables'] if t['name'] == table_name)
    field_types = {f['name']: f['type'] for f in table_schema['fields']}
    fields = {}
    refs = {}
    for name, value in named[k].items():
        typ = field_types.get(name)
        if name in ['created_at', 'last_modified']: continue
        if typ == 'multipleRecordLinks':
            targets = []
            for rid in links(value):
                keys = [kk for kk in selected if meta[kk][2] == rid and meta[kk][0] == CANDIDATE]
                targets += [copykey(kk) for kk in keys]
            if targets and name in ['person','organisation','source_system','people','organisations','contact_routes','person_organisation_roles']:
                # Author only forward links; reciprocal fields are maintained by Airtable.
                if table_name in ['Contact_Routes','Person_Organisation_Roles'] and name in ['person','organisation']: refs[name] = targets
                elif table_name == 'Source_Records': refs[name] = targets
        elif typ != 'formula' or name == id_fields[table_name]: fields[name] = norm(value)
    fields.update(common(k, 'source_evidence' if table_name.startswith('Source_') else 'existing_identity_control', copykey(k),
                         'Copied real control. Existing source approval/validation is retained; this copy has no production authority.'))
    fields['legacy_identifiers'] = json.dumps({'source': k, 'retained_id': fields[id_fields[table_name]]}, ensure_ascii=False)
    if table_name == 'Person_Organisation_Roles' and fields.get('valid_from'):
        date = fields.pop('valid_from')
        fields['observed_at'] = date
        fields['mapping_review'] = 'pending_review'
        fields['migration_note'] += ' R01 date interpretation proposal: source valid_from ' + date + ' is preserved in the raw snapshot and represented as observation date; tenure start remains unknown. Review this mapping separately from the already-confirmed office fact.'
    fields['record_display'] = str(fields[id_fields[table_name]]) + ' — ' + str(fields.get(labels[table_name], ''))
    records.append({'table': table_name.replace('_',' '), 'key': copykey(k), 'source_key': k, 'fields': fields, 'links': refs})

we = find(RW, 'rec9CvmqcAVSR90S8'); anne = find(RW, 'rec1qibA5RkVQgziH'); association = find(RW, 'recnU9BeDyCoeNW5H')
partner = find(RW, 'recZXBv2Yg9iRu8gb'); rene = find(RW, 'rec1eiYAM8jIHlgS1'); kees = find(MZ, 'recGvOadRfaTGs67i')
operator = find(RW, 'recdzTXRVLKNZnsME'); mark_intake = find(RW, 'recMPgtwERolQmpAH')
domain_we = 'RW partner remains authoritative for partnership and goods context: ' + url(partner) + '\nRW contact relationship remains authoritative for partner/primary-contact context: ' + url(association) + '\nWE Fashion is excluded from Winter new-provider outreach.'

def add_mapped(table, source, kind, fields, refs=None, purpose='proposed_transfer', note=''):
    canonical_table = table.replace(' ','_')
    key = mapkey(source, kind)
    fields[id_fields[canonical_table]] = persistent(key, prefixes[canonical_table])
    fields.update(common(source, purpose, key, note))
    fields['record_display'] = fields[id_fields[canonical_table]] + ' — ' + fields[labels[canonical_table]]
    records.append({'table':table,'key':key,'source_key':source,'fields':fields,'links':refs or {}})
    return key

we_key = add_mapped('Organisations',we,'organisation',{
    'organisation_name':norm(named[we]['organization_name']), 'aliases_as_reported':'WE Fashion',
    'identity_status':'confirmed','validation_state':'confirmed','source_type':'spreadsheet','source_link':url(we),
    'processing_status':'review_required','notes':'Identity follows the validated RW organisation; no organisation contact route is populated in that source.',
    'legacy_identifiers':json.dumps({'source':we,'organization_id':norm(named[we]['organization_id'])}),
    'domain_record_references':domain_we}, note='Proposed R01 transfer mapping; source-confirmed identity is retained. Organisation numbering is source-qualified, not assumed globally unique.')
anne_key = add_mapped('People',anne,'person',{
    'person_name':norm(named[anne]['contact_name']), 'identity_status':'confirmed','validation_state':'confirmed',
    'source_type':'spreadsheet','source_link':url(anne),'processing_status':'review_required',
    'notes':'Validated named organisation contact. Office/title unknown. No global partner or donor role assigned.',
    'legacy_identifiers':json.dumps({'source':anne,'contact_id':norm(named[anne]['contact_id'])}),
    'domain_record_references':domain_we}, note='Proposed R01 transfer mapping; original source validation retained. Contact email validity remains unverified.')
email = norm(named[anne]['email'])
route_key = add_mapped('Contact Routes',anne,'personal_email',{
    'contact_route':'Anne Reeser — personal email','route_type':'email','route_value':email,'normalized_value':email.strip().lower(),
    'verification_status':'unverified','validation_state':'confirmed','source_type':'spreadsheet','source_link':url(anne),
    'processing_status':'review_required','notes':'Email value from historical partner evidence. Existence in a validated Contact does not establish email verification.',
    'legacy_identifiers':json.dumps({'source':anne,'source_field':'email'})},refs={'person':[anne_key]},note='Only the existing personal email is mapped; no phone or generic organisation route is invented.')
assoc_key = add_mapped('Person Organisation Roles',association,'association',{
    'role_record':'Anne Reeser — association with We Fashion','validation_state':'confirmed',
    'source_type':'spreadsheet','source_link':url(association),'processing_status':'review_required',
    'notes':'Supported person–organisation association. The office/title is unknown and is left blank. Partner and primary-contact context remains in the RW record.',
    'legacy_identifiers':json.dumps({'source':association,'contact_organization_role_id':'COR-0261'}),
    'domain_record_references':domain_we},refs={'person':[anne_key],'organisation':[we_key]},note='Map the association only. No tenure dates, function, organisation status or personal donor/partner classification is inferred.')
rene_key = add_mapped('People',rene,'person_control',{
    'person_name':norm(named[rene]['contact_name']),'identity_status':'provisional','validation_state':'unresolved',
    'source_type':'other','source_link':url(rene),'processing_status':'held',
    'notes':'Identity label retained for uncertainty control. Exact church affiliation remains unresolved; no organisation/office link is created in this test.',
    'legacy_identifiers':json.dumps({'source':rene,'contact_id':'CON-0044'}),
    'domain_record_references':'Original unresolved context: '+url(rene)},purpose='unresolved_control',note='No church merge. Original Den Haag/Zoetermeer/Oosterkerk evidence and review status remain in the full source snapshot.')
records[-1]['fields']['mapping_review']='held'
kees_key = add_mapped('People',kees,'person_control',{
    'person_name':norm(named[kees]['Person']),'aliases_as_reported':norm(named[kees]['Aliases / source names']),
    'identity_status':'provisional','validation_state':'proposed','source_type':'document','source_link':url(kees),
    'processing_status':'review_required','notes':'Internal person reference from the earlier build, used only to test the proposed association with the current operator. No function/role taxonomy is adopted.',
    'legacy_identifiers':json.dumps({'person_source':kees,'person_id':'P-INT-003','operator_source':operator,'operator_id':'OPR-0002'}),
    'domain_record_references':'Current independently existing operational actor: '+url(operator)+'\nOPR-0002. Actor identity and action authority remain distinct from this proposed person identity.'},purpose='unresolved_control',note='Proposed person↔operator crosswalk for review. Preserves both identifiers and their distinct meanings; does not change the Project or grant access.')

# Each original Airtable row copied/mapped into this test gets one immutable snapshot envelope.
# Operational control sources remain only evidence; no parallel Partner, Operator, or Intake tables are created.
snapshot_sources = set(selected) | {we,anne,association,partner,rene,kees,operator,mark_intake}
existing_by_source = {}
for r in records: existing_by_source.setdefault(r['source_key'],[]).append(r)
snapshot_systems = {}
for b in sorted({meta[k][0] for k in snapshot_sources}):
    if b == RW:
        existing_system = next(r for r in records if r['table'] == 'Source Systems' and b in r['fields'].get('source_link', ''))
        snapshot_systems[b] = existing_system['key']
        existing_system['fields']['migration_note'] += ' Reused for R01 snapshots of this same Airtable base. Current Relationships & Workflows authority remains scoped by the current routing; the test copy has no production authority.'
        continue
    key = BATCH + '|snapshot_system|' + b
    sid = persistent(key,'SYS')
    system_name = {CANDIDATE:'Shared Identity candidate — R01 snapshot',RW:'Relationships & Workflows — R01 snapshot',MZ:'Identity & Function Context — R01 reference snapshot'}[b]
    fields = {'source_system_name':system_name,'source_system_id':sid,'source_type':'service','provider':'Airtable',
              'connection_type':'import','source_link':'https://airtable.com/'+b,'status':'active',
              'authority_scope':'Evidence snapshot for the authorised R01 test only. Source authority remains scoped by the current routing; the test copy never becomes a production source.',
              'validation_state':'proposed','processing_status':'applied','migration_key':key,'test_batch':BATCH,
              'sample_purpose':'source_evidence','copied_real_data':True,'synthetic_test_data':False,'mapping_review':'pending_review',
              'record_display':sid+' — '+system_name}
    records.append({'table':'Source Systems','key':key,'fields':fields,'links':{}})
    snapshot_systems[b]=key

for k in sorted(snapshot_sources):
    b,t,rid,tname=meta[k]; key=snapshotkey(k); sid=persistent(key,'SRC')
    payload={'source_base_id':b,'source_table_id':t,'source_table_name':tname,'record':raw[k], 'source_fields_by_name':named[k]}
    raw_text=json.dumps(payload,ensure_ascii=False,sort_keys=True,separators=(',',':'))
    refs={'source_system':[snapshot_systems[b]]}
    forward={'People':'people','Organisations':'organisations','Contact Routes':'contact_routes','Person Organisation Roles':'person_organisation_roles'}
    for mapped in existing_by_source.get(k,[]):
        if mapped['table'] in forward: refs.setdefault(forward[mapped['table']],[]).append(mapped['key'])
    if k==partner: refs.update({'people':[anne_key],'organisations':[we_key],'person_organisation_roles':[assoc_key]})
    if k==operator: refs['people']=[kees_key]
    if k==mark_intake: refs['people']=[copykey(find(CANDIDATE,'recoQhxJccPY3fxht'))]
    fields={'source_record_key':k,'source_record_id':sid,'source_object_type':tname,'external_record_id':rid,
            'source_row_reference':k,'external_url':url(k),'raw_value_or_payload':raw_text,'source_type':'service',
            'source_link':url(k),'match_status':'proposed' if k in [kees,operator,mark_intake,rene] else 'matched',
            'match_confidence':'unknown' if k in [kees,operator,mark_intake,rene] else 'exact',
            'processing_status':'held' if k in [rene,mark_intake] else 'applied','validation_state':'unreviewed',
            'source_timestamp':raw[k]['createdTime'],
            'notes':'Immutable R01 snapshot captured '+captured+'. source_timestamp is source-record creation, not event occurrence. Original validation and processing fields are preserved in the payload. SHA-256: '+hashlib.sha256(raw_text.encode()).hexdigest(),
            'record_display':sid+' — '+k}
    fields.update(common(k,'source_evidence',key,'A test snapshot is not an independently corroborating source. No operational state is promoted.'))
    if k==mark_intake: fields['uncertainty_note']='Canonical Contact match remains unconfirmed in RW; candidate identity linkage here is a review pointer, not an intake update or donor processing verification.'
    if k==rene: fields['uncertainty_note']='Exact church affiliation remains unresolved; do not merge or assign an organisation.'
    records.append({'table':'Source Records','key':key,'source_key':k,'fields':fields,'links':refs,'payload_sha256':hashlib.sha256(raw_text.encode()).hexdigest()})

# Link each mapped/copied identity to its immutable source via Source Records forward references.
# Candidate evidence links retained above point to the same logical people/routes/roles.
all_keys={r['key'] for r in records}
assert len(all_keys)==len(records)
for row in records:
    for field, targets in row['links'].items():
        assert all(t in all_keys for t in targets), (row['key'],field,targets)
    assert row['fields']['copied_real_data'] and not row['fields']['synthetic_test_data']
    assert len(row['fields'].get('raw_value_or_payload','')) < 100000
idfile.write_text(json.dumps(id_registry,ensure_ascii=False,indent=2)+'\n')
manifest={'batch':BATCH,'target_base_id':TARGET,'workspace_id':'wspCZsYbWYC7OXX1l','production_candidate_id':CANDIDATE,
          'captured_at':captured,'record_count':len(records),'records':records,
          'acceptance':{'structure':'not_yet_accepted','mapping':'prepared_for_technical_test','source_validation':'retained_at_source_scope','runtime':'not_verified','production':'not_adopted'},
          'keys':{'we':we_key,'anne':anne_key,'anne_route':route_key,'anne_association':assoc_key,'rene':rene_key,'kees':kees_key}}
(DIR/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'records':len(records),'by_table':{t:sum(r['table']==t for r in records) for t in sorted({r['table'] for r in records})},'selected_existing_controls':len(selected),'source_snapshots':len(snapshot_sources),'largest_payload':max(len(r['fields'].get('raw_value_or_payload','')) for r in records)},indent=2))
