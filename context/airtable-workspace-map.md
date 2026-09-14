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
| `1 \| DCA System — Shared Structure` | `app6W5pHT5hj7wbCR` | Existing shared-structure base. Its contents are not blanket evidence of current operational state. Resolve authority for the specific object before reuse; a replacement shared-structure base or new project/need write route has not been established by this map. |
| `2 \| DCA Relationships & Workflows` | `appMdqKYTMnPmVoVu` | Current Relationship Data destination under `source-routing.md`. Keep this route until a separately established migration changes it. |
| `DCA Evidence & Reconciliation` | `appZ1Fv0YtZPbBbWa` | Bounded intake, evidence, staging and reconciliation lineage. Former display name: `DCA Integrations & Reconciliation`. This is the same base, not a migration or a canonical operational Logistics destination. |
| `DCA Ways of Working` | `appZ1ngF9Hc0xeOoI` | Existing ways-of-working base. Workflow-specific scope still applies; this identity mapping does not define a new capture workflow. |
| `DCA Warehouse & Logistics` | `appivZyJTh5tQv1On` | Current operational warehouse/logistics destination referred to as `DCA Logistics` in earlier configuration. Live schema includes `Warehouse_Sessions`, `Warehouse_Locations` and `Warehouse_Inventory_Observations`. The Logistics Intake plugin still writes only to evidence staging; this identity correction does not route its writes here. |

### Verification and adjacent migration

Names and IDs above were read from live Airtable `list_bases` on 14 September 2026; workspace names and IDs were read through `list_workspaces`. The warehouse and new identity schemas were also inspected. Those connector responses do not expose base-to-workspace membership, so the existing production role assignments are retained rather than claiming fresh verification of membership.

The live account also exposes `DCA Shared Identity & Relationships` (`appScO2P8fD8yprCW`). Its schema contains People, Organisations, Contact_Routes, Functions, Contexts and related temporal relationships. It is the newer identity/relationship structure awaiting migration decisions and validation; its existence or schema wording does not replace `appMdqKYTMnPmVoVu` as the current Relationship Data route. Do not select it for routine production relationship writes until the migration and capability route are explicitly established.

The separate `DCA Shared Identity & Function Context` base (`appMzETiiWf5oev2f`) also exists. It is not interchangeable with the new identity base or current Relationship Data destination. No additional write route is granted here.

Historical names remain valid source wording. Resolve an old name through the recorded stable ID; do not create another base, move records, widen credentials, or infer a completed migration from a rename.

## Non-production workspace: "DCA Dev/Test"

These bases exist in a separate, non-production workspace. None of them is ever a valid destination for new production writes, but one of them is a legitimate legacy source under specific conditions — see the two subsections below.

### Never selectable as a production destination

These bases must **never** be selected as the destination for a production routing request, full stop:

- `[LEGACY] DCA Promotion Pipelines & Workflows`
- `[TEST] 2 | DCA Relationships & Workflows`
- `MIGRATING LOGISTICS | DCA System — Shared Structure testing`
- `3 | DCA Logistics`
- `Bug tracker`
- `SOP Template`

`3 | DCA Logistics` in particular must never be confused with the production `DCA Warehouse & Logistics` base above. Same/overlapping words, different workspace, different base — resolve by workspace + base identity, not by substring or fuzzy match on "DCA Logistics".

Whether any of these bases also holds historical or operational facts worth reading for some bounded non-production task is **not established here** — this map only settles that none of them is a production write destination. Do not assert they are pure test/scaffolding data with no historical value, and do not treat any of them as a legitimate legacy source either, absent a separate, explicit determination. Reading one of them for a bounded task is out of scope unless a human authority explicitly names that specific base for that task (see "Out of scope" below); it does not get the same standing `3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing` has below.

### Non-production, but a legitimate legacy source when explicitly requested

- `3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing`

This base is different from the rest of `DCA Dev/Test`:

- it is **never** a destination for new production writes, exactly like every other `DCA Dev/Test` base;
- it **is** a legitimate legacy active-data source, but only when a human explicitly requests migration, reconstruction, or reconciliation work that references it — do not read it, cite it, or fold its contents into current operational answers on your own initiative, and do not treat it as interchangeable with the current `DCA Warehouse & Logistics` production base;
- it must not be dismissed as irrelevant test data — its content is legacy operational history, not a scaffolding fixture, and remains available as evidence for the kind of bounded reconstruction/reconciliation work described in `workflows/capture-logistics-intake.md` and the Reconstruction & Reconciliation Method, when a human directs that work at it by name. This is an established status for this one base specifically, not an inference extended to it from the rest of `DCA Dev/Test`.

Do not extend this legacy-source treatment to any other `DCA Dev/Test` base without an explicit correction from a human authority — it applies to this one named base only. The other `DCA Dev/Test` bases are simply not established as legacy sources either way; that is a different, weaker claim than affirmatively calling them scaffolding with no historical value.

## Do not confuse: Evidence & Reconciliation vs. canonical Logistics

- `DCA Evidence & Reconciliation` is the bounded intake/staging/reconciliation layer. It is where new mixed current-cycle Logistics evidence is preserved and minimally extracted during the reconstruction pilot.
- `DCA Warehouse & Logistics` is the canonical operational Logistics base.
- A submission landing in `DCA Evidence & Reconciliation` is staged evidence, not a canonical Logistics record. Do not describe or treat `DCA Evidence & Reconciliation` as "the Logistics base" or as a "Logistics pilot base" that stands in for canonical Logistics — it stands in for canonical Logistics **staging** only, and promotion out of it follows the reconstruction/reconciliation and Evidence → Validation → Live Use handoff, not implicit reuse as the operational base.

## Resolution rule

When any capability, workflow, plugin, or skill needs to resolve an Airtable destination:

1. Identify the workspace first: production `DCA` or non-production `DCA Dev/Test`. Never select a `DCA Dev/Test` base for production work.
2. Within the correct workspace, identify the base by its recorded base ID when one is recorded above; otherwise use the exact, unambiguous workspace-qualified name from the table above.
3. Never resolve by fuzzy/substring name match, text search ranking, or resemblance to a previously used base name. A match on "DCA Logistics" text must not return `3 | DCA Logistics` or any other `DCA Dev/Test` base.
4. If the correct base's ID is not yet recorded here, treat that as a configuration gap: ask for it or flag it, rather than guessing from the name.

## Out of scope

Treat every other Airtable workspace or base as out of scope for routing decisions unless a human authority with organisational standing (for example, the person driving System & Structure work) explicitly names it for a specific bounded task. This map does not itself grant write access; runtime access remains governed by `context/capability-access-boundaries.md` and the relevant provider access-bundle configuration.

## Maintenance

When a base name or ID is confirmed directly against live Airtable, or when a base's canonical role changes (for example, a workflow is updated to target `DCA Warehouse & Logistics` directly), update this file rather than letting runtimes rely on memory, prior Slack context, or search ranking to determine current base identity.
