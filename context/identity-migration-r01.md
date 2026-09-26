---
document_type: dca_ai_build_record
status: development-tested-review-pending
scope: identity-r01
recorded_on: 2026-09-16
production_adoption: not-adopted
---

# IDENTITY-R01 build and mapping test

16 September 2026 · User-authorised Dev/Test execution · Technical mapping checks passed; acceptance and production adoption remain pending.

The isolated sample is loaded in **[DEV] DCA Identity Migration — R01**, base `appTpzRmniNpMv35Q`, created in **DCA Dev/Test** `wspCZsYbWYC7OXX1l`. The intended production candidate remains **DCA Shared Identity & Relationships**, `appScO2P8fD8yprCW`, in DCA `wspYnyJ08xBNYOjXw`. The test base must never become production through a rename or move.

The current main branches were re-fetched before execution: dca-ai `d755e968410d916d398019db6875ab7d7884b475`; dca-architecture `985ff937627cae887671f7f2301f1bd48cdc5db0`. The build follows the [development/testing/promotion standard](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/985ff937627cae887671f7f2301f1bd48cdc5db0/systems/development-testing-and-promotion.md). Production was inspected read-only. During the Airtable test, no operational route, consumer, automation, message, repository branch, base name or existing base location was changed. This follow-up PR publishes that test record; it does not promote the data.

## Loaded scope

| Table | Rows | Meaning |
|---|---:|---|
| People | 5 | Anne; Paul and Mark controls; Kees and René provisional controls |
| Organisations | 3 | WE Fashion; Almere Weerwater and Apeldoorn 't Loo controls |
| Contact Routes | 7 | Anne's personal email plus six existing candidate controls; personal and generic organisation routes stay separate |
| Person Organisation Roles | 5 | Anne's association with unknown office, Paul's three offices, Mark's office |
| Source Systems | 5 | Three retained source-system identities plus two snapshot sources; the existing RW system is reused |
| Source Records | 37 | Six retained source-evidence records plus 31 immutable full-record snapshots |

Total: **62 rows**. These contain copied real evidence and proposed mappings, labelled distinctly from synthetic fixtures; no synthetic fixture was loaded. This is a six-table subset of the candidate, not adoption of its eleven-table relationship/function model. Current Partner, Operator, intake, Project, campaign, batch and cycle records remain in their established bases.

## First transfer proposal, available for review

| Object | R01 record | Stable ID allocated once |
|---|---|---|
| WE Fashion | [Organisation](https://airtable.com/appTpzRmniNpMv35Q/tbl14dvgrt6tWn0Yu/recMJXUWltnQXpwgv) | `ORG-9825e9d0-2d56-4741-b7e4-29998ca5fa55` |
| Anne Reeser | [Person](https://airtable.com/appTpzRmniNpMv35Q/tblMECaqrdwh76Sre/recHSlCkxIF6aqYf9) | `PER-1479a5a0-15d2-4ac8-928c-02860763ce69` |
| Anne's email | [Personal route](https://airtable.com/appTpzRmniNpMv35Q/tbl3xfvyFG00Cm80i/recM2sRctSvSImhBr) | `CRT-1fae91c0-f36b-47a5-bf3f-c64f0994c7c3` |
| Anne ↔ WE | [Association](https://airtable.com/appTpzRmniNpMv35Q/tblDYa7wK4y5UNRlM/recQXfNT8ZB1NekBM) | `POR-9b70adbf-1dcb-472a-aeb2-0ec781ccc9de` |

These IDs are reserved for the proposed mapping, not yet production-authoritative. Preserve them at promotion only if the mapping is accepted and no existing identity is found to represent the same object. `ORG-0052`, `CON-0090` and `COR-0261` remain source-qualified aliases. Do not regenerate IDs from new Airtable record IDs. All 23 selected existing candidate control/source IDs were retained as literal values.

Anne's source-confirmed identity remains distinct from her unverified email. No generic WE route, phone, office or tenure was invented. The existing RW Partner `recZXBv2Yg9iRu8gb` and COR `recnU9BeDyCoeNW5H` preserve partnership, goods and primary-contact context. **WE Fashion remains excluded from Kees's Winter new-provider outreach.** Relationships & Workflows continues supporting that work.

## Observed results and limits

Twenty technical checks passed against the saved schema and readbacks. All 62 expected rows are present; 102 native linked-record relationships resolve to the correct local tables with reciprocal links. The 31 immutable source payloads match their recorded SHA-256 and original source rows. The same import planner run against a fresh readback proposes **zero creates and zero updates**; no unnecessary second writes were made.

Paul retains three separate offices and separate personal/organisation routes. A proposed mapping represents the signature dates as `observed_at`, leaving tenure start unknown: Paul 23 July, Mark 24 August. Original `valid_from` values remain in the source snapshots. The office confirmations are carried forward; this date interpretation is a separate review item.

Mark's RW intake match remains proposed, unknown-confidence and held; its candidate-person link is only a review pointer. René's church affiliation remains unresolved with no organisation, role or route copied. Kees's proposed person mapping retains `P-INT-003` separately from current Operator `OPR-0002`; it changes no Project ownership or action authority.

Readback of **54 source rows** found no changes: all 46 candidate rows, seven selected RW rows, and the earlier-build Kees row. This verifies those exact records, not every production record, integration or automation. The earlier comprehensive investigation retains its stated coverage limits.

| Acceptance dimension | Status |
|---|---|
| Structure | Review pending; two implementation gaps below remain |
| Data | Existing scoped source validation retained; new mapping/date interpretation and uncertain associations await scoped review |
| Behaviour | Import, local links, formula readback and repeat-import planning verified; Claude Tag or another intended consumer was not exercised |
| Production | Not adopted; production candidate and active workflows were read-only |

## Implementation gaps

The available Airtable connection rejected formula primary fields and native timestamp field types at creation. It did allow separate formula fields. Every table therefore has a text `record_display` primary, an equivalent computed `record_label`, and working `CREATED_TIME()` / `LAST_MODIFIED_TIME()` formula fields. All display values agree at this readback, but a copied text primary can become stale after a name change. Native timestamp fields and computed primaries still require a supported repair executor; this build does not establish an exception to the [DCA Airtable Implementation Standard](https://docs.google.com/document/d/17yO7HdChXXvlxekLJjSqiHNgDWmKQm2VstpErtSJ_4c/edit?usp=drivesdk). Original source timestamps remain separate from new test-record timestamps.

The Source Records request exceeded the server payload limit before creating any records. After verifying that table was empty, the loader used smaller batches. No duplicate or partial source rows remain; the final counts and repeat-import plan confirm this recovery.

## Exact next action

**Anja/System & Structure reviews the four linked WE/Anne records above and the proposed office-date interpretation against their attached source evidence.** Record the bounded mapping decision without resetting prior Rotary confirmations or resolving held affiliations by inference. Repair the six computed primaries and native timestamps through a supported executor, then exercise the intended runtime's WE-contact lookup and scoped source/partner-context retrieval. Keep production adoption separate.

After these checks, prepare the exact production delta and reconcile any source changes. Promote only the accepted WE/Anne objects and supporting provenance into `appScO2P8fD8yprCW`, retaining the accepted stable IDs and adding compatibility references to RW at that authorised stage. Check actual production capabilities and consumers, read back the affected records, and update object-level routing. Do not promote all controls or copy the test base wholesale.

Rollback at this stage requires no production reversal: leave R01 excluded from operational routing and retain its evidence. Any correction should update the manifest and rerun the planner; reread live data before retrying a failed write. If a later production batch fails, use a separately captured pre-promotion crosswalk/configuration snapshot and reconcile intervening changes before restoring the old route.

## Reproducible checks and retained evidence

The [R01 test package](../tests/workflows/identity-migration-r01/README.md) contains the same local manifest preparation, import planning and mapping checks, with an explicit private evidence-directory parameter. [Observed results](../tests/workflows/identity-migration-r01/observed-results.json) record the 20 checks and separate acceptance states.

The private **DCA-Identity-R01-Evidence.zip** archive retains the manifest, persistent-ID registry, full 62-row crosswalk, source snapshots/schemas, actual test schema/configuration and write/readback responses. These files contain contact values and raw evidence and must not be committed. SHA-256 and exact input inventory are recorded in [evidence-reference.json](../tests/workflows/identity-migration-r01/evidence-reference.json). The archive is retained with Anja's 16 September investigation; source-linked evidence is also inspectable in the R01 base under its existing access controls. No organisation-wide archive permission or Drive handoff is claimed by this PR.

Existing schema and source metadata are dated readbacks, not continuous monitoring. The test scripts make no network calls. Replaying them verifies the retained sample; it does not perform or prove a new live Airtable or Claude Tag run.

The research and proposed responsibilities are recorded separately in the [dated architecture research](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/fc1d0600e0242e85a55ea9310bc01821bb24f58c/systems/identity-relationships-research.md) ([review PR](https://github.com/Dutch-Civilian-Action/dca-architecture/pull/9)). A GitHub publication or merge records this work; it does not accept the proposed data meanings, reorganise Operations, change the authoritative home of records, or authorise production writes.
