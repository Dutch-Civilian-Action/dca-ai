---
document_type: dca_ai_provider_test
status: test-design
provider: claude
context: airtable-workspace-map
---

# Claude Airtable Workspace/Base Routing — Regression Tests

## Purpose

Validate that any Claude-runtime capability resolving an Airtable destination (Logistics intake, Relationship Data lookup, or a future capability) resolves it by **workspace + base identity**, per `context/airtable-workspace-map.md`, and never by name similarity, familiarity, or search ranking.

These tests exist because production and non-production Airtable content live in separate workspaces with deliberately similar names (`DCA Logistics` vs. `3 | DCA Logistics`), because `DCA Integrations & Reconciliation` is easily mislabelled informally as "the Logistics base" when it is bounded staging only, and because one non-production base (`3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing`) is a legitimate legacy source under narrow conditions rather than being uniformly "never selectable" like the rest of `DCA Dev/Test`.

## How these tests are run

This repository has no executable/code test harness; behavioural tests here are run as scenario prompts against the live Claude Tag + Airtable runtime, matching the convention already used by `logistics-intake.md` and `logistics-intake-0.6.0-regressions.md`. Do not attempt to satisfy these tests by calling Airtable directly from a non-runtime context.

Absent a live runtime session, each test below can also be dry-run as a static resolution trace against `context/airtable-workspace-map.md`: apply the resolution rule in that file to the scenario's requested destination and confirm the traced result matches "Pass" below. This dry-run substitutes for a live run only for reviewing the routing *logic*; it does not substitute for a live acceptance run before this capability handles real production writes.

## Preconditions

- `context/airtable-workspace-map.md` is present and lists the current production `DCA` workspace's five bases and the non-production `DCA Dev/Test` workspace's bases.
- The capability under test has read access to `context/source-routing.md` and `context/airtable-workspace-map.md`.
- No test in this file writes to Airtable. Where a scenario implies a write, stop at destination resolution and state the resolved workspace + base identity rather than performing the write.

## Test 1 — production `DCA Logistics` resolves and is distinct from dev/test `3 | DCA Logistics`

Prompt pattern:

`Where should a new canonical Logistics record for production work be written — resolve the destination base only, do not write anything.`

Pass:

- the resolved destination is `DCA Logistics` in the production `DCA` workspace;
- the runtime does not select `3 | DCA Logistics` (non-production `DCA Dev/Test` workspace) despite the near-identical name;
- the runtime states the workspace explicitly, not only the base name, so the two are not conflated;
- if `DCA Logistics`'s base ID is not yet recorded in `airtable-workspace-map.md`, the runtime says so as a gap rather than silently falling back to the dev/test base or guessing an ID.

Fail conditions: the dev/test base is selected; the base name alone is stated without workspace disambiguation; an ID is invented.

## Test 2 — `DCA Integrations & Reconciliation` resolves as staging-only, never as canonical Logistics

Prompt pattern:

`A Logistics user just sent new mixed current-cycle evidence (goods state plus a contact). Where does this get captured, and is that the canonical Logistics base?`

Pass:

- the destination for the new mixed evidence is `DCA Integrations & Reconciliation`;
- the runtime explicitly states this is bounded staging, not the canonical operational Logistics base;
- the runtime does not describe `DCA Integrations & Reconciliation` as "the Logistics base" or "the Logistics pilot base" standing in for canonical Logistics;
- the runtime does not route the evidence to `DCA Logistics` during the current pilot, since no current workflow/plugin targets it yet.

Fail conditions: `DCA Integrations & Reconciliation` is presented as canonical/operational Logistics; the distinction is left implicit or is not raised when asked directly.

## Test 3 — a dev/test base is never selected for a production request despite a close name match

Prompt pattern:

`I need the production Logistics base for a real operational write. Just confirm the destination base and workspace, do not write anything yet.`

Precondition: seed the runtime's available context with both `DCA Logistics` (production) and `3 | DCA Logistics` (`DCA Dev/Test`) so a naive search/fuzzy match has two candidates.

Pass:

- the resolved destination is the production `DCA Logistics` base only;
- the runtime does not offer `3 | DCA Logistics`, `[LEGACY] DCA Promotion Pipelines & Workflows`, `[TEST] 2 | DCA Relationships & Workflows`, `MIGRATING LOGISTICS | DCA System — Shared Structure testing`, `3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing`, `Bug tracker`, or `SOP Template` as a candidate for production work — this holds even for `3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing`, which is a legitimate legacy *source* under Test 6 but is never a production *destination*;
- if the runtime is genuinely unable to disambiguate from available context, it says so and asks, rather than guessing the more production-sounding of two similarly named options.

Fail conditions: any `DCA Dev/Test` base is selected or offered as a viable production destination.

## Test 4 — resolution is by workspace + base identity, not name similarity or search ranking

Prompt pattern:

`Search for "DCA Logistics" across everything available and tell me which base is the production Logistics destination.`

Pass:

- a substring/fuzzy match on "DCA Logistics" is not used as the resolution method by itself;
- the runtime resolves via `context/airtable-workspace-map.md`'s workspace + base identity, and states the production `DCA Logistics` base as the answer;
- the runtime does not return `3 | DCA Logistics` merely because it also matches the substring or a prior search ranked it comparably;
- when asked to explain how it decided, the runtime cites workspace + base identity (or the map file), not "it was the best/first search match."

Fail conditions: the runtime states or implies that substring/fuzzy match on the name was sufficient; `3 | DCA Logistics` is returned as the, or a, production answer.

## Test 5 — Relationship Data destination is unaffected by the Logistics correction

Prompt pattern:

`Where does an established contact/organisation lookup go?`

Pass:

- the resolved destination remains `2 | DCA Relationships & Workflows` in the production `DCA` workspace, unchanged by this routing correction;
- the runtime does not select `[TEST] 2 | DCA Relationships & Workflows`.

This test exists to confirm the Airtable workspace map addition does not regress the already-correct Relationship Data routing.

## Test 6 — the `ACTIVE LOGISTICS` legacy base is a legitimate source only on explicit request, and never a destination

Precondition: available context includes `3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing` (`DCA Dev/Test`, non-production).

### 6a — no explicit request: not read, not cited

Prompt pattern:

`What's the current Logistics picture? Just answer from what's normally in scope.`

Pass:

- the runtime does not read or cite `3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing` for an ordinary current-operational answer;
- it is not treated as interchangeable with, or a substitute for, the canonical `DCA Logistics` base or `DCA Integrations & Reconciliation` staging.

### 6b — explicit migration/reconstruction/reconciliation request: legitimate source

Prompt pattern:

`For a reconstruction pass, pull whatever legacy Logistics history exists in 3 | ACTIVE LOGISTICS | LEGACY DCA System — Shared Structure testing and compare it against current staging.`

Pass:

- the runtime treats this base as a legitimate legacy active-data source for the explicitly requested reconstruction/reconciliation/migration work and may read/cite it;
- its content is treated as legacy operational history, not dismissed as irrelevant test/scaffolding data;
- the runtime does not write any new production record to this base, and does not treat it as, or promote its content directly into, the canonical `DCA Logistics` base without the normal reconstruction/reconciliation and validation handoff;
- the runtime does not extend this same legacy-source treatment to any other `DCA Dev/Test` base (for example `3 | DCA Logistics` or `[LEGACY] DCA Promotion Pipelines & Workflows`) merely because they are also legacy-sounding names in the same workspace.

Fail conditions: the base is read/cited without an explicit request (6a); the base is refused or dismissed as irrelevant test data even under an explicit reconstruction/reconciliation/migration request (6b); the base is used, or another `DCA Dev/Test` base is used, as if it were a production write destination; the legacy-source treatment is generalised to other `DCA Dev/Test` bases without explicit human direction.

## Pass condition

This suite passes when every test above resolves the stated destination correctly, no non-production `DCA Dev/Test` base is ever selected or offered as a production write destination, `DCA Integrations & Reconciliation` is never conflated with canonical `DCA Logistics`, the `ACTIVE LOGISTICS` legacy base is used as a source only on explicit request and never as a destination or a stand-in for canonical Logistics, and resolution is justified by workspace + base identity rather than name similarity or search ranking.
