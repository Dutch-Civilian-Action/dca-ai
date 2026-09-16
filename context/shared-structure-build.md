---
document_type: dca_shared_structure_build_record
status: under_construction
scope: supervised_projects_and_needs_build
verified_date: 2026-09-16
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
- Campaigns and Allocations remain distinct shared objects in the intended design. Campaigns stay in their current operational table until a controlled transition. The September 15 build created neither. On September 16, Anja requested completion of the Winter preparation: the draft Campaign, batch, provider proposal and template below were added to the existing outreach tables. The Project's `campaign_references` now points to them. No Allocation was created.
- The first provider proposal preserves the stable Project/Need IDs and record URLs in existing source-reference fields. The bounded capture convention below reuses native links within a base and IDs/URLs across bases; it does not claim a sync or cross-base linked-record implementation. Activity counts cannot be derived from preparation records.
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

## Prepared first provider proposal — 16 September

This is supervised preparation under Anja's request, not a completed approach or a new grant of runtime authority. The published organisation route was incorporated through the current [relationship reconciliation workflow](../workflows/reconcile-relationship-data.md). No personal Contact was created for a generic inbox, and no donor/supplier role was asserted.

| Existing table in Relationships & Workflows | Prepared record | State |
|---|---|---|
| Contact_Intake | [RAJAPACK source intake](https://airtable.com/appMdqKYTMnPmVoVu/tblsMQmCUeRiUiY3F/rec5RTVkPu6GyJzBE) | applied to organisation identity/route only; review and outreach approval remain separate |
| Organizations | [ORG-0341 — RAJAPACK Nederland](https://airtable.com/appMdqKYTMnPmVoVu/tbloQjP99AcWawpyZ/rec1VOesFjR9AJFA4) | needs_review; pending_review; not selected for outreach |
| Campaigns | [CAM-0014 — Winter Project — Track A volume goods](https://airtable.com/appMdqKYTMnPmVoVu/tblbam3UlEdLGiTRT/recE6AwYqMnji9t1k) | draft; Kees owner |
| Outreach_Batches | [BAT-0010 — Winter packing pilot — RAJAPACK for review](https://airtable.com/appMdqKYTMnPmVoVu/tblV4sxqrlQzynLQg/recV26fr35t2eseK9) | review_pending; Kees send operator; no send date |
| Outreach_Cycles | [CYC-0329 — RAJAPACK](https://airtable.com/appMdqKYTMnPmVoVu/tblwgSShU18P2fC0z/rec9KHvyFfYEulW5K) | paused / research / pending_review; Kees owner and signing sender |
| Templates | [TPL-0013 — Dutch packing enquiry](https://airtable.com/appMdqKYTMnPmVoVu/tblatrBYg0yCGOy5V/recX1PkzR7hicAvaW) | draft; no approval or send |

Official [contact information](https://www.rajapack.nl/diensten/verpakkingsadvies_cms_000006.html), [stretch wrap](https://www.rajapack.nl/rekfolie-pallets/rekfolie_C6010.html) and [box range](https://www.rajapack.nl/kartonnen-dozen-verzenddozen-exportcontainers/kartonnen-dozen_C1010.html) were checked on September 16. `sales@rajapack.nl` is a published organisation route. Deliverability, the donation decision-maker and willingness to donate are unverified. Product listings do not establish an offer.

No match was found in current Organizations by domain, or Contacts, Outreach_Cycles, Activities and Contact_Intake by RAJAPACK; an unrelated fuzzy RAJA parish result was rejected. Accessible Slack and Community/Info mailbox searches also returned no matching history. These are bounded checks: Kees's own mailbox and all legacy/private history were not exhausted. Kees must confirm new-provider eligibility and approve the draft. WE Fashion remains excluded. Do not ask him to reconfirm the packing items.

The source-requested Gmail label `Outreach/Kees/Winter Project` was created and read back in `community@dutchcivilianaction.nl` (label ID `Label_1`, empty at verification). No filter, automatic sending or scheduler was configured. The proposed first mode is a draft reviewed/released by Kees from Community. Shared-mailbox access, thread ownership and actual Claude mail tools need runtime verification before use.

## Source precedence for this pilot

- Kees's explicit September 15 message controls the two-item packing selection and the illustrative 60 × 40 cm footprint.
- The readable [phased plan v3](https://dcau.slack.com/files/U09CL1T282D/F0C0Q8YBKV1/winter-project-phased-plan-v3.md) and [goods list v3](https://dcau.slack.com/files/U09CL1T282D/F0C0YDUSCCR/winter-project-goods-list-v3.md) provide supporting scope/specifications. Track A and B remain distinct; strapping and labels stay outside the pilot.
- [Tracker schema v2](https://dcau.slack.com/files/U09CL1T282D/F0C0F51HZRD/winter-project-tracker-schema-v2.md) is a requirements source, not permission to create five duplicate project tables. Its older version references and A7/A6 category mismatch do not control record routing. Use the exact files linked here and current Need IDs, not stale category labels.
- The later-uploaded `winter-project-goods-list-v2.pdf` (`F0C1RG4K8SZ`) could not be downloaded in this preparation (HTTP 403). Its contents and possible changes are unverified. Do not infer precedence from the upload date or filename. This does not reopen Kees's explicit packing selection; broader catalogue and power/heating routing differences remain to reconcile before relying on them operationally.
- Anja's current instruction selects building here followed by a Claude Chat project; the older Claude Code-only implementation proposal is superseded for this task. Original sources remain unchanged.

## Bounded capture convention for the first real cycle

Version: `winter-pilot-v1`, prepared; event/runtime acceptance pending. This uses existing fields and does not add an automation or a competing operational register.

| Evidence or object | Capture responsibility and connection |
|---|---|
| Project and two packing Needs | Shared Structure retains the persistent PRJ/NED IDs and source URLs. Project `campaign_references` points to CAM/BAT/CYC/TPL; each packing Need's notes points to the same cycle. |
| Party, owner, campaign, batch and template | Native links in Relationships & Workflows connect CYC-0329 to ORG-0341, OPR-0002, CAM-0014 and BAT-0010; the batch links TPL-0013. Cycle `source_references` carries the PRJ and both NED IDs/URLs. Do not create personal contacts for generic organisation routes. |
| Actual correspondence | Use Activities only for evidenced events. Native `outreach_cycle` and `outreach_batches` links identify context. Preserve the original message ID in `source_reference`, its URL in `evidence_link`, the thread in `gmail_thread_link`, and actual event times in the applicable sent/reply/date_time fields. `external_reference_notes` carries `capture_version: winter-pilot-v1`, Project and relevant Need IDs/URLs. Preserve human actor versus AI executor in notes; do not guess a performed_by option. |
| Reply, correction and retry | Search the source message ID before creating an Activity. A repeat import must not create another event. Preserve corrections and source lineage. Distinguish a substantive human reply from an automatic acknowledgement. Record next action/owner/date from normal correspondence; ask only for a missing decision, not information already in the email. |
| Offer and collection evidence | Link the actual source Activity/cycle and relevant Need line(s) through the existing [Logistics intake workflow](../workflows/capture-logistics-intake.md) in Evidence & Reconciliation. Preserve item, specification, quantity/unit/precision, condition, availability, location/contact and unknowns. Use existing intake `cycle_reference`, source references and fact lineage. Attachment intake retains its existing staged acceptance rules. |
| Receipt/delivery | Use the established evidence and Logistics responsibilities. An offer, accepted offer, expected arrival, observed arrival and usable receipt remain distinct. Current warehouse observations do not supply a verified receipt/pledge/delivery model. Record gaps explicitly and resolve the real handoff with Logistics; never mark fulfillment from an offer or unsupported arrival inference. |

No Activity was created for research, the draft or record preparation. Dates, quantities and supply outcomes remain blank/unknown where unsupported. An approach for both packing items counts as one provider cycle, not two. Existing automation triggers and send mechanisms have not been runtime-verified; paused/research is a preparation state, not a tested technical send lock.

## Claude handoff after schema acceptance

The [Claude project handover](../providers/claude/projects/winter-project.md) supplies the setup, thin project instructions and first-session acceptance checks. Provider-independent operation remains in this build/capture record and the existing workflows. A project instruction, repo commit or ChatGPT connector readback does not prove Claude capability.

Anja's next action is to repair the two existing primary fields and add the four native metadata fields above. Required technical settings are ISO date, 24-hour time and the Schema Guard's `Europe/Amsterdam` timezone convention. The Airtable UI's timezone selector support was not verified; do not invent a substitute or silently claim timezone acceptance. After editing, read back field types/formulas, settings, six stable IDs, all links and unchanged unknown/validation states. Update the old field/table descriptions that currently mention temporary/under-construction schema only after the repairs are verified.

Then load the reviewed handover into a private Claude project, verify actual tool access and one bounded write/readback, and verify Kees's member access. Use an explicitly authorised source-backed review annotation or a dedicated Dev/Test sample; do not generate a fake send/offer/receipt event to test a connection. New models, unresolved mappings and automation require the [development/testing/promotion standard](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/main/systems/development-testing-and-promotion.md); routine accepted record maintenance does not require another base. The separate identity migration development base must not become the Winter production home or a generic Winter test sandbox.

Keep acceptance results separate: schema pending; prepared-record source/link readback verified here; Claude member/runtime behaviour pending; first real provider cycle pending. Kees reviews provider eligibility and correspondence, then owns actual supplier decisions and follow-up. A full identity migration or hypothetical pledge-system build is not a prerequisite for reviewing this packing proposal.

## Metrics boundary

PR #30's daily capture remains a measurement of validation questions in the existing monitor. Its 20-item baseline is not 20 Winter Needs, and these five Needs are not automatically five queue questions.

Winter procurement/delivery metrics remain unimplemented. The proposed first readout uses evidenced provider-cycle sends/replies/offers, actual next actions and waiting, and usable received quantities with source traceability. Distinguish DCA packing receipt from civilian delivery and impact. Until real event capture and calculation are verified, the Winter measures are **not measured**, not zero. No new automation or monitor change was made.
