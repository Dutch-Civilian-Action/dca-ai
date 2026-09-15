---
document_type: dca_shared_structure_build_record
status: under_construction
scope: supervised_projects_and_needs_build
verified_date: 2026-09-15
provider_independent: true
---

# Shared Structure — supervised Projects and Needs build

## Authority and present state

Anja selected a new Shared Structure direction and then requested building it together in ChatGPT through the Airtable plugin, with a Claude project for further handling after completion. That instruction supersedes the earlier Winter handoff's proposed Claude Code build path for this bounded task.

The base now exists and contains sourced preparation records. It is **under construction**, with schema acceptance and routine maintenance capability still pending. Creating the base and these records does not activate any autonomous workflow, migrate Campaigns or identities, or establish a completed procurement/delivery cycle.

The [canonical structural rules](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/main/systems/shared-system-structural-rules.md), [workspace map](airtable-workspace-map.md), [source routing](source-routing.md), [capability/access boundaries](capability-access-boundaries.md) and [Schema Guard conventions](../providers/airtable-schema-guard/rules/dca-airtable-rules.json) continue to apply.

## Verified identities

The DCA workspace was returned by live `list_workspaces` with owner access. The authenticated creation request explicitly targeted this workspace ID; these are not identities inferred from fuzzy search.

| Object | Verified ID / reference |
|---|---|
| Workspace DCA | `wspYnyJ08xBNYOjXw` |
| [DCA Shared Structure](https://airtable.com/appPBY1g1rYKRHbDC) | `appPBY1g1rYKRHbDC` |
| Projects | `tbljIlUyCtbSweB0X` |
| Needs | `tblPCCn7sm2F6KplK` |
| [Winter Project](https://airtable.com/appPBY1g1rYKRHbDC/tbljIlUyCtbSweB0X/rec88ys5XHgHBMajH) | `rec88ys5XHgHBMajH` |
| Projects.needs | `fld0NeU6a3sMRFUkG`; native reciprocal link to Needs |
| Needs.projects | `fldqj2t3CXWZHyRVk`; native reciprocal link to Projects |
| Kees, current owner reference | `OPR-0002`; [current Operator record](https://airtable.com/appMdqKYTMnPmVoVu/tbl0rMfAOKGa6Umi5/recdzTXRVLKNZnsME); Slack identity `U0ABU10D2KD` verified by readback |

Stored `project_id` and `need_id` values are generated once, independent of Airtable record identity. Retain them across renames or migrations; never regenerate them merely because a display name or platform changes.

| Object | Persistent DCA identifier |
|---|---|
| Winter Project | `PRJ-0e04a92c-2e34-419e-bb67-bcef0c5135b6` |
| Help Window civilian bedding — candidate | `NED-97feac83-6334-4ae1-a012-b92f28b4d172` |
| DCA stretch wrap for packing | `NED-022c8044-bbbe-43d3-8f17-0a8cdbae3df2` |
| DCA pallet-compatible cardboard boxes | `NED-cb635f42-853a-4906-a2a5-d347e849386b` |
| Help Window winter clothing and footwear — candidate | `NED-6d4a90b8-fb21-4f0f-a110-4d66b53ffe78` |
| Civilian gas-heating support — conditional candidate | `NED-8a2cb842-249e-4ceb-bba3-cfc1c5bd4277` |

## Initial sourced records

Winter Project is in `preparation`. Its scope is supported at the stated resolution: new providers only, WE Fashion excluded, Track A volume goods, Track B individually researched power/heating approaches, no arbitrary project-wide quantity target or overall deadline. Kees explicitly confirmed stretch wrap and Euro-pallet-compatible boxes for DCA's own packing work on [15 September](https://dcau.slack.com/archives/C0BH11B5PPE/p1789453422129289); 60 × 40 cm is an example, not a mandatory exact footprint.

| Need | Airtable record | Type | Validation / lifecycle |
|---|---|---|---|
| [Help Window civilian bedding — candidate](https://airtable.com/appPBY1g1rYKRHbDC/tblPCCn7sm2F6KplK/rec3x5F90MnkjCN79) | `rec3x5F90MnkjCN79` | civilian_assistance | pending_validation; candidate |
| [DCA stretch wrap for packing](https://airtable.com/appPBY1g1rYKRHbDC/tblPCCn7sm2F6KplK/recEe3riGaFe9rEPF) | `recEe3riGaFe9rEPF` | dca_operational_capacity | confirmed_at_stated_scope; open |
| [DCA pallet-compatible cardboard boxes](https://airtable.com/appPBY1g1rYKRHbDC/tblPCCn7sm2F6KplK/recN5jK82mbcbGH1l) | `recN5jK82mbcbGH1l` | dca_operational_capacity | confirmed_at_stated_scope; open |
| [Help Window winter clothing and footwear — candidate](https://airtable.com/appPBY1g1rYKRHbDC/tblPCCn7sm2F6KplK/recoJXZZUsg4lWqdL) | `recoJXZZUsg4lWqdL` | civilian_assistance | pending_validation; candidate |
| [Civilian gas-heating support — conditional candidate](https://airtable.com/appPBY1g1rYKRHbDC/tblPCCn7sm2F6KplK/recpebxRRJ1QYg0xY) | `recpebxRRJ1QYg0xY` | civilian_assistance | pending_validation; candidate |

All five Needs link to the same Project. Linkage does not validate demand, authorise procurement, allocate resources or establish fulfillment. Required quantities and next-action dates remain blank where unknown or unagreed. Source dates, original links, validation scope, open questions and next actions are retained.

Civilian bedding and clothing/footwear remain candidate bundles pending current Help Window confirmation; refine independently fulfillable lines before measuring fulfillment. The gas-heating source is conditional and has unresolved recipients/specifications. Power stations and generators remain research scope without invented confirmed demand records. Strapping and labels are excluded from the first packing pilot.

## Existing connections and remaining integration

- The native Projects ↔ Needs links are built and verified.
- The Project and the two DCA requirements reference Kees through `owner_id` plus `owner_source_link`. No duplicate People/Organisations tables were created.
- Current relationship/outreach records remain in `appMdqKYTMnPmVoVu`. The prepared Identity & Relationships base `appScO2P8fD8yprCW` awaits its own adoption and mapping.
- Campaigns and Allocations remain distinct shared objects in the intended design. Campaigns stay in their current operational table until a controlled transition. No Winter Campaign, provider batch, provider cycle or Allocation was created by this build; `campaign_references` is blank.
- The first real outreach cycle must preserve the stable Project/Need IDs and source record URLs through its existing source references, with a clearly defined capture convention or separately reviewed fields. Activity counts cannot be derived merely from Project/Need records.
- Mixed offers, pickup and receipt evidence continue through the established Logistics intake route in `appZ1Fv0YtZPbBbWa`. The operational Warehouse & Logistics base remains `appivZyJTh5tQv1On`; its sessions, locations and observations do not constitute an implemented pledge/receipt/delivery model.
- Reusable work and findings continue in Ways of Working. No parallel workflow or metric register was added.

## Schema acceptance: exact outstanding changes

The connector rejected `formula`, `createdTime` and `lastModifiedTime` during base creation. That rejected request created nothing. A subsequent supported request created the present supervised structure. This is a capability limitation, not an approved exception to the standard.

| Table | Existing primary field | Required result |
|---|---|---|
| Projects | `project`, `fldCivuC2QgWJoZzM`, currently singleLineText | Formula `{project_name}`; preserve `project_name`, `project_id`, record identity and all links |
| Needs | `need`, `fldL7isaPjMesHjo9`, currently singleLineText | Formula `{need_name}`; preserve `need_name`, `need_id`, record identity and all links |
| Both tables | Native metadata fields not created | Add `created_at` as createdTime and `last_modified` as lastModifiedTime; use the standard's technical display settings |

These items remain **Guard support pending**: the exposed connector cannot convert the primary field types or create the native timestamp types. It can create a regular formula field, but that does not finish a formula-primary requirement. Table/primary descriptions explicitly record this state. Do not silently substitute text timestamps, call the current schema compliant, or drop the required changes. Complete the exact changes through a supported development executor, then re-audit and read back.

Verified now: 1 Project, 5 Needs, every prepared field value, 5 reciprocal links, 6 unique persistent DCA identifiers, Kees's current owner reference, table/field naming and useful descriptions, 2 confirmed-at-scope DCA requirements, 3 pending civilian candidates, and blank unknown quantities/unagreed dates. No complete Schema Guard acceptance is claimed.

## Claude handoff after acceptance

Anja intends to create a Claude project after this build is complete. Give it the current repository rules, this verified base/table/record mapping, Kees's source documents and the existing Winter support plan. First verify its actual Airtable access and bounded maintenance behaviour; a project instruction is not a credential or write capability.

Its first task should be to read the existing Project and Needs, report confirmed scope and remaining unknowns, and prepare one new-provider approach for Kees's review using existing outreach records. It should continue this structure and preserve its IDs. Schema redesign, identity/Campaign migration, outgoing correspondence and procurement commitments require their own established authority.

The next practical build step here is to complete the exact schema changes above and review the source references/outreach connection. Then verify one actual provider cycle and an evidenced intake/receipt handoff when goods are offered. Provider approval and real offer decisions remain with Kees.

## Metrics boundary

PR #30's daily capture remains a measurement of validation questions in the existing monitor. Its 20-item baseline is not 20 Winter Needs, and these five Needs are not automatically five queue questions.

Winter procurement/delivery metrics remain unimplemented. The proposed first readout uses evidenced provider-cycle sends/replies/offers, actual next actions and waiting, and usable received quantities with source traceability. Distinguish DCA packing receipt from civilian delivery and impact. Until real event capture and calculation are verified, the Winter measures are **not measured**, not zero. No new automation or monitor change was made.
