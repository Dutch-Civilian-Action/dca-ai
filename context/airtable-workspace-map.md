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

Only the following five bases are current production bases. A capability doing production work must resolve to one of these, by base ID where recorded, otherwise by this unambiguous workspace-qualified name.

| # | Base name | Base ID | Canonical role |
|---|---|---|---|
| 1 | `1 \| DCA System — Shared Structure` | not yet recorded here | Shared structure base. |
| 2 | `2 \| DCA Relationships & Workflows` | not yet recorded here | Canonical Relationship Data source (see `source-routing.md`). |
| 3 | `DCA Integrations & Reconciliation` | `appZ1Fv0YtZPbBbWa` (recorded from prior operational context; verify directly against the live Airtable workspace before treating it as authoritative, since this file cannot query Airtable to confirm it) | Bounded intake/staging/reconciliation layer. **Not** the canonical operational Logistics base — see "Do not confuse" below. Current consumer: the Logistics intake pilot (`workflows/capture-logistics-intake.md`, `plugins/dca-logistics-intake/`). |
| 4 | `DCA Ways of Working` | not yet recorded here | Ways-of-working base. |
| 5 | `DCA Logistics` | not yet recorded here — someone with direct Airtable admin access should record it here once known | The canonical operational Logistics base. As of this writing, no current DCA AI workflow, plugin, or skill targets this base; the Logistics intake pilot targets `DCA Integrations & Reconciliation` for staging only. Do not assume a Logistics capability writes here until the relevant workflow/plugin/skill is explicitly updated to target it. |

A base ID recorded above as "not yet recorded here" is a gap, not a license to guess one from the base name. Fill it in only from a direct, verified read of the live production workspace.

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

`3 | DCA Logistics` in particular must never be confused with the production `DCA Logistics` base above. Same/overlapping words, different workspace, different base — resolve by workspace + base identity, not by substring or fuzzy match on "DCA Logistics".

Whether any of these bases also holds historical or operational facts worth reading for some bounded non-production task is **not established here** — this map only settles that none of them is a production write destination. Do not assert they are pure test/scaffolding data with no historical value, and do not treat any of them as a legitimate legacy source either, absent a separate, explicit determination. Reading one of them for a bounded task is out of scope unless a human authority explicitly names that specific base for that task (see "Out of scope" below); it does not get the same standing `3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing` has below.

### Non-production, but a legitimate legacy source when explicitly requested

- `3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing`

This base is different from the rest of `DCA Dev/Test`:

- it is **never** a destination for new production writes, exactly like every other `DCA Dev/Test` base;
- it **is** a legitimate legacy active-data source, but only when a human explicitly requests migration, reconstruction, or reconciliation work that references it — do not read it, cite it, or fold its contents into current operational answers on your own initiative, and do not treat it as interchangeable with the current `DCA Logistics` production base;
- it must not be dismissed as irrelevant test data — its content is legacy operational history, not a scaffolding fixture, and remains available as evidence for the kind of bounded reconstruction/reconciliation work described in `workflows/capture-logistics-intake.md` and the Reconstruction & Reconciliation Method, when a human directs that work at it by name. This is an established status for this one base specifically, not an inference extended to it from the rest of `DCA Dev/Test`.

Do not extend this legacy-source treatment to any other `DCA Dev/Test` base without an explicit correction from a human authority — it applies to this one named base only. The other `DCA Dev/Test` bases are simply not established as legacy sources either way; that is a different, weaker claim than affirmatively calling them scaffolding with no historical value.

## Do not confuse: Integrations & Reconciliation vs. canonical Logistics

- `DCA Integrations & Reconciliation` is the bounded intake/staging/reconciliation layer. It is where new mixed current-cycle Logistics evidence is preserved and minimally extracted during the reconstruction pilot.
- `DCA Logistics` is the canonical operational Logistics base.
- A submission landing in `DCA Integrations & Reconciliation` is staged evidence, not a canonical Logistics record. Do not describe or treat `DCA Integrations & Reconciliation` as "the Logistics base" or as a "Logistics pilot base" that stands in for canonical Logistics — it stands in for canonical Logistics **staging** only, and promotion out of it follows the reconstruction/reconciliation and Evidence → Validation → Live Use handoff, not implicit reuse as the operational base.

## Resolution rule

When any capability, workflow, plugin, or skill needs to resolve an Airtable destination:

1. Identify the workspace first: production `DCA` or non-production `DCA Dev/Test`. Never select a `DCA Dev/Test` base for production work.
2. Within the correct workspace, identify the base by its recorded base ID when one is recorded above; otherwise use the exact, unambiguous workspace-qualified name from the table above.
3. Never resolve by fuzzy/substring name match, text search ranking, or resemblance to a previously used base name. A match on "DCA Logistics" text must not return `3 | DCA Logistics` or any other `DCA Dev/Test` base.
4. If the correct base's ID is not yet recorded here, treat that as a configuration gap: ask for it or flag it, rather than guessing from the name.

## Out of scope

Treat every other Airtable workspace or base as out of scope for routing decisions unless a human authority with organisational standing (for example, the person driving System & Structure work) explicitly names it for a specific bounded task. This map does not itself grant write access; runtime access remains governed by `context/capability-access-boundaries.md` and the relevant provider access-bundle configuration.

## Maintenance

When a base ID is confirmed directly against the live Airtable workspace, or when a base's canonical role changes (for example, a workflow is updated to target `DCA Logistics` directly), update this file rather than letting runtimes rely on memory, prior Slack context, or search ranking to determine current base identity.
