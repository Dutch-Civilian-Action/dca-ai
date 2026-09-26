---
document_type: dca_ai_airtable_workspace_map
status: current
scope: all_dca_ai
provider_independent: true
---

# Airtable Workspace & Base Identity Map

## Purpose

Resolve an Airtable destination by **workspace + base identity**, never by name similarity, familiarity, or search ranking.

`context/source-routing.md` decides *what kind of fact or evidence* belongs where (for example, "current Logistics operational-state evidence" or "canonical Relationship Data"). This file resolves *which actual Airtable workspace and base* that routed destination currently is. Do not infer base identity from a document's title, a plugin's historical description, or Airtable search-result ranking; use this map, and prefer a recorded base ID over a name whenever one is recorded here.

If this file is unavailable or a required base ID has not been recorded here, preserve that access/configuration gap rather than resolving the destination by name resemblance.

## Production workspace: "DCA"

Workspace ID: `wspYnyJ08xBNYOjXw`.

The following destinations retain their existing routing roles. Base existence, naming or placement does not itself grant a workflow write authority.

| Base name | Base ID | Current routing boundary |
|---|---|---|
| `1 \| DCA System — Shared Structure` | `app6W5pHT5hj7wbCR` | Historical shared-structure base. Its contents are not blanket evidence of current operational state; resolve authority for the specific object before reuse. It is not the new supervised Projects/Needs build below. |
| `DCA Shared Structure` | `appPBY1g1rYKRHbDC` | Supervised shared-structure build, created in DCA on 15 September 2026 at Anja's request. It contains Projects and Needs plus a bounded 26 September fundraising extension: Appeals, Appeal_Routes and a synced Campaigns_Synced projection. Appeal facts, route mappings, fundraising totals and publication status retain their own validation boundaries; the projection is not a second campaign authority. See [build state and exact boundaries](shared-structure-build.md). This row records identity and bounded build scope; it does not grant autonomous operational writes, migrate campaign authority or validate fundraising claims. |
| `Company & People Research \| AI Play` | `appo2wgk3Potf6DcO` | Research workbench in DCA for company and person profiles, research briefs and project-specific assessments. AI output is a draft for source checking and human review; this base is not the canonical identity, relationship, contact-permission or outreach destination. See the [Winter pilot usage notes](https://docs.google.com/document/d/1xJpXZyaYOpE2wALfH_YU5bUQcfUfrqF5jimNiIo8GEQ/edit) for one bounded use. |
| `2 \| DCA Relationships & Workflows` | `appMdqKYTMnPmVoVu` | Current Relationship Data destination under `source-routing.md`. Keep this route until a separately established migration changes it. |
| `DCA Evidence & Reconciliation` | `appZ1Fv0YtZPbBbWa` | Bounded intake, evidence, staging and reconciliation lineage. Former display name: `DCA Integrations & Reconciliation`. This is the same base, not a migration or a canonical operational Logistics destination. |
| `DCA Ways of Working` | `appZ1ngF9Hc0xeOoI` | Existing ways-of-working base. Workflow-specific scope still applies; this identity mapping does not define a new capture workflow. |
| `DCA Warehouse & Logistics` | `appivZyJTh5tQv1On` | Current operational warehouse/logistics destination referred to as `DCA Logistics` in earlier configuration. Live schema includes `Warehouse_Sessions`, `Warehouse_Locations` and `Warehouse_Inventory_Observations`. The Logistics Intake plugin still writes only to evidence staging; this identity correction does not route its writes here. |
| `DCA Shared Identity & Relationships` | `appScO2P8fD8yprCW` | Prepared candidate in DCA; its existing five-club identity/source import is preserved. Production adoption remains pending. See [R01 build and test record](identity-migration-r01.md); this is not the current routine Relationship Data write route. |

### Verification and adjacent migration

The new `DCA Shared Structure` base was created through an authenticated request targeting workspace `wspYnyJ08xBNYOjXw` on 15 September 2026; its returned base/table IDs, source-backed records and reciprocal Project/Need links were read back. The build remains under construction, with formula-primary and native timestamp requirements still pending. Other base names and IDs above were read from live Airtable `list_bases` on 14 September 2026; workspace names and IDs were read through `list_workspaces`. The warehouse and new identity schemas were also inspected. Those connector responses did not expose base-to-workspace membership. The subsequent 16 September identity investigation independently inspected the authenticated Airtable workspace UI: all seven bases then listed were located in DCA, and eleven existing bases were located in DCA Dev/Test. This records observed membership, not an adopted record-authority change. R01 was subsequently created in Dev/Test, bringing that task's inventory to twelve there. See the dated [research record](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/fc1d0600e0242e85a55ea9310bc01821bb24f58c/systems/identity-relationships-research.md) for inspection limits and proposed dispositions.

The 23 September 2026 inventory also identified `Company & People Research | AI Play` (`appo2wgk3Potf6DcO`) in DCA. It has Companies, People_Research, Research_Briefs and Company_Assessments. Its workspace placement does not make AI-generated findings or assessments canonical DCA relationship data. The earlier seven-base count above is the dated 16 September snapshot, not the current total.

The live account also exposes `DCA Shared Identity & Relationships` (`appScO2P8fD8yprCW`). Its schema contains People, Organisations, Contact_Routes, Functions, Contexts and related temporal relationships. It is the newer identity/relationship structure awaiting migration decisions and validation; its existence or schema wording does not replace `appMdqKYTMnPmVoVu` as the current Relationship Data route. Do not select it for routine production relationship writes until the migration and capability route are explicitly established.

The separate `DCA Shared Identity & Function Context` base (`appMzETiiWf5oev2f`) was verified in DCA Dev/Test during the 16 September investigation and contains earlier source-linked reconstruction. It is not interchangeable with the new identity base or current Relationship Data destination. No additional write route is granted here.

Historical names remain valid source wording. Resolve an old name through the recorded stable ID; do not create another base, move records, widen credentials, or infer a completed migration from a rename.

## Non-production workspace: "DCA Dev/Test"

Workspace ID: `wspCZsYbWYC7OXX1l`, confirmed through live `list_workspaces` during the 15 September 2026 review.

Anja confirmed on 15 September 2026 that this workspace is provided at no charge through her Airtable MVP membership and that all AI and additional features are available there for normal development and testing. This records the workspace arrangement she established; it does not grant a runtime additional credentials or demonstrate equivalent feature availability in production.

### Development and testing role

`DCA Dev/Test` is DCA's designated Airtable workspace for developing and testing new schemas, mappings, interfaces, AI behaviour, integrations and automation before operational adoption. Follow the canonical [Development, Testing and Production Promotion standard](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/main/systems/development-testing-and-promotion.md). Production exclusion is not a prohibition on development.

For each authorised development task, identify the exact test base and its bounded purpose in the existing build record or PR, separately from the intended production base. Check the candidate base's purpose and contents before reuse; use an isolated test copy or a dedicated base where existing operational history could otherwise be changed. General workspace availability does not make every existing base a disposable sandbox.

Use small representative, source-linked copies of real data to test unresolved mappings. Keep copied real data and synthetic fixtures distinct, and preserve sources, identifiers, uncertainty and validation scope. Test copies do not replace the operational source or the maintained production dataset. `DCA Evidence & Reconciliation` remains operational evidence staging, not the development environment.

Review the structure and mapping with System & Structure and the relevant operational owners. Apply the accepted change to the established production destination only within the task's existing authority, reconcile the real data and verify the affected result there. Schema acceptance, validation of the complete dataset and runtime verification are separate. Feature availability in Dev/Test must not be assumed for the production target.

### IDENTITY-R01 designated development base

`[DEV] DCA Identity Migration — R01` (`appTpzRmniNpMv35Q`) was created in this workspace on 16 September 2026 for the explicitly authorised, bounded identity mapping test. It contains six candidate-derived identity/provenance tables and 62 rows of source-linked mappings, controls and evidence. It is not a production route, an evidence-intake destination, or automatically the test base for a different domain workflow.

Its intended production candidate is separately identified as `DCA Shared Identity & Relationships` (`appScO2P8fD8yprCW`) in DCA. R01 passed the recorded technical mapping checks; computed-primary/native-timestamp repairs, scoped mapping review and intended-runtime verification remain pending. Current Relationship Data routing stays `appMdqKYTMnPmVoVu`. See [R01 build and test record](identity-migration-r01.md).

### Dated Dev/Test inventory

Names and membership below were observed during the authorised 16 September investigation; R01 was created afterwards in the exact workspace above. Content observations are bounded samples, not blanket validation, a standing read/write grant, or a finding that a base is disposable.

| Observed base name | Stable base ID | Observed role or limit |
|---|---|---|
| `DCA Shared Identity & Function Context` | `appMzETiiWf5oev2f` | Earlier reference/development build with source-linked internal people/function context; not production or the R01 sandbox |
| `DCA Contact & Relationship Management Tool` | `appFAkQwL71gXCg1D` | Earlier overlapping identity build; preserve for bounded reconciliation |
| `[TEST] 2 \| DCA Relationships & Workflows` | `appbf45XWjDJmlAKa` | Test copy containing sampled real history |
| `[REVIEW] DCA Promotion Pipeline & Outreach Workflow` | `appK7YwypGSMhm9kA` | Review/reconstruction build; overlapping real-source history |
| `[LEGACY] DCA Promotion Pipelines & Workflows` | `appMp7VWzuJmmJRYB` | Earlier build with imported donor/source history |
| `MIGRATING LOGISTICS \| DCA System — Shared Structure testing` | `appyNN9KqVaUg6y33` | Earlier migration copy; sampled overlap with the protected legacy source is not whole-base equivalence |
| `3 \| DCA Logistics` | `appXTzdTNB8KjALbk` | Non-production build with genuine sourced history; not the current Warehouse & Logistics schema |
| `3 \| ACTIVE LOGISTICS \| LEGACY DCA System — Shared Structure testing` | `appK7t991PYJ2u0DO` | Protected legacy operational source under the existing explicit-request boundary below |
| `Contract Operations \| AI Play` | `appH7ql8EGZkOlSyv` | Experimental commercial examples; real/synthetic provenance unverified |
| `SOP Template` | `app6OhvZacoqfq8AR` | Name/membership only; contents not inspected |
| `Bug tracker` | `appjt4FWAtliQL14D` | Name/membership only; contents not inspected |
| `[DEV] DCA Identity Migration — R01` | `appTpzRmniNpMv35Q` | Created for this identity test only; source-linked real sample, no synthetic fixtures |

No existing base was renamed, moved, consolidated or archived by this investigation or R01 execution. Proposed physical cleanup remains separate from changing the authoritative home of records.

The base-specific production and legacy-source boundaries below remain in force.

These bases exist in a separate, non-production workspace. None of them is ever a valid destination for new production writes, but one of them is a legitimate legacy source under specific conditions — see the two subsections below.

### Never selectable as a production destination

These bases must **never** be selected as the destination for a production routing request, full stop:

- `[LEGACY] DCA Promotion Pipelines & Workflows`
- `[TEST] 2 | DCA Relationships & Workflows`
- `MIGRATING LOGISTICS | DCA System — Shared Structure testing`
- `3 | DCA Logistics` (`appXTzdTNB8KjALbk`)
- `Bug tracker`
- `SOP Template`

`3 | DCA Logistics` in particular must never be confused with the production `DCA Warehouse & Logistics` base above. Same/overlapping words, different workspace, different base — resolve by workspace + base identity, not by substring or fuzzy match on "DCA Logistics".

The dated inventory above records the historical/source-linked content actually observed under the explicit investigation scope. It does **not** make these bases current operational sources or grant standing access for other tasks. Do not call them pure synthetic scaffolding or reuse them destructively. Reading their contents as operational or legacy evidence for a new task still requires the existing explicit task/source boundary (see "Out of scope" below); the investigation does not extend the protected legacy source's standing to every copy.

### Non-production, but a legitimate legacy source when explicitly requested

- `3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing`

This base is different from the rest of `DCA Dev/Test`:

- it is **never** a destination for new production writes, exactly like every other `DCA Dev/Test` base;
- it **is** a legitimate legacy active-data source, but only when a human explicitly requests migration, reconstruction, or reconciliation work that references it — do not read it, cite it, or fold its contents into current operational answers on your own initiative, and do not treat it as interchangeable with the current `DCA Warehouse & Logistics` production base;
- it must not be dismissed as irrelevant test data — its content is legacy operational history, not a scaffolding fixture, and remains available as evidence for the kind of bounded reconstruction/reconciliation work described in `workflows/capture-logistics-intake.md` and the Reconstruction & Reconciliation Method, when a human directs that work at it by name. This is an established status for this one base specifically, not an inference extended to it from the rest of `DCA Dev/Test`.

Do not extend this standing legacy-source treatment to any other `DCA Dev/Test` base without an explicit correction from a human authority — it applies to this one named base only. The other `DCA Dev/Test` bases are simply not established as legacy sources either way; that is a different, weaker claim than affirmatively calling them scaffolding with no historical value.

## Do not confuse: Evidence & Reconciliation vs. canonical Logistics

- `DCA Evidence & Reconciliation` is the bounded intake/staging/reconciliation layer. It is where new mixed current-cycle Logistics evidence is preserved and minimally extracted during the reconstruction pilot.
- `DCA Warehouse & Logistics` is the canonical operational Logistics base.
- A submission landing in `DCA Evidence & Reconciliation` is staged evidence, not a canonical Logistics record. Do not describe or treat `DCA Evidence & Reconciliation` as "the Logistics base" or as a "Logistics pilot base" that stands in for canonical Logistics — it stands in for canonical Logistics **staging** only, and promotion out of it follows the reconstruction/reconciliation and Evidence → Validation → Live Use handoff, not implicit reuse as the operational base.

## Resolution rule

When any capability, workflow, plugin, or skill needs to resolve an Airtable destination:

1. Identify the requested environment first: production `DCA` or development/testing in `DCA Dev/Test`. Resolve an authorised development request to its specifically designated test base; never select a `DCA Dev/Test` base for production work.
2. Within the correct workspace, identify the base by its recorded base ID when one is recorded above; otherwise use the exact, unambiguous workspace-qualified name from the table above. For development, use the exact workspace and base identity established for the bounded task.
3. Never resolve by fuzzy/substring name match, text search ranking, or resemblance to a previously used base name. For a production request, a match on "DCA Logistics" text must not return `3 | DCA Logistics` or any other `DCA Dev/Test` base.
4. If the required identity is missing from this map and the task's established development mapping, resolve it through authorised metadata or flag the remaining configuration gap. Never guess an ID or repeat a request for an identity already established in the task.

## Out of scope

For production and operational-source routing, treat every other Airtable workspace or base as out of scope unless a human authority with organisational standing (for example, the person driving System & Structure work) explicitly names it for a specific bounded task. For authorised development/testing in `DCA Dev/Test`, follow the designation and exact-base identification rules above; this does not grant operational-source authority to that base’s existing contents. This map does not itself grant write access; runtime access remains governed by `context/capability-access-boundaries.md` and the relevant provider access-bundle configuration.

## Maintenance

When a base name or ID is confirmed directly against live Airtable, or when a base's canonical role changes (for example, a workflow is updated to target `DCA Warehouse & Logistics` directly), update this file rather than letting runtimes rely on memory, prior Slack context, or search ranking to determine current base identity.
