---
document_type: dca_ai_provider_test
status: test-design
provider: claude
workflow: capture-logistics-intake
skill_version: 0.6.0
---

# Claude Logistics Intake 0.6.0 — Regression Tests

## Purpose

Retest the seven defects demonstrated during the 31 August 2026 live Claude Tag acceptance run without reopening broad Logistics reconstruction.

Use explicit `@Claude` invocation in `#logistics`. Use synthetic data only. Inspect both Slack output and Airtable state after each write.

These tests supplement `logistics-intake.md`. They test the underlying invariants rather than replaying the exact acceptance-run entities and wording.

## Cross-cutting checks for every write test

For every regression that writes data:

1. preserve the human source submission and source timestamp;
2. verify the intended new/changed records by read-back rather than trusting the write response;
3. compare write scope before/after and confirm no record was created or changed outside:
   - `Logistics_Intake_Submissions`;
   - `Logistics_Intake_Facts`;
   - `Logistics_Intake_Operational_References`;
4. when canonical Relationship Data is read for identity context, compare the relevant canonical records before/after and confirm no canonical mutation occurred;
5. preserve uncertainty and do not invent unsupported schema values merely to make the test pass.

A write-boundary failure or canonical Relationship Data mutation fails the regression run even when the target staging records look correct.

## Regression 1 — direction is resolved per fact, not by batch default

Submit one mixed message with four distinct goods facts:

```text
CONTROLLED TEST.
Northstar Aid is handing 5 pallets of blankets to DCA.
Riverside Depot has 6 boxes of hygiene goods for us.
Delta Foundation is handing 2 pallets of medical goods to Eastside Clinic.
7 walking frames are in the warehouse now.
```

Precondition: invocation occurs in the authenticated DCA Logistics context so `for us` has an unambiguous DCA referent.

Pass:

- Northstar Aid fact preserves `Northstar Aid → DCA`;
- Riverside Depot fact preserves DCA as destination because `for us` is unambiguous in this context;
- Delta Foundation fact preserves `Delta Foundation → Eastside Clinic`; DCA is not substituted;
- walking-frames fact leaves direction unresolved because none was stated;
- direction is evaluated independently for all four facts rather than copied from another clause.

This regression fails if the runtime "fixes" direction by always writing DCA.

## Regression 2 — location functions remain distinct while valid pickup still works

Prompt:

```text
CONTROLLED TEST. Example Supplier has 2 pallets.
Pickup is at Collection Yard.
They are held temporarily at Site A after pickup.
Handover is at Gate B.
Gate B is not their general address.
```

Pass:

- Example Supplier is an organisation reference only;
- Collection Yard, Site A, and Gate B are separately recoverable location references because each has operational meaning;
- Collection Yard may use the configured pickup role because pickup is explicitly stated;
- Site A remains temporary-holding context, not pickup/warehouse/general-address meaning unless separately stated;
- Gate B remains handover context and is **not** tagged `pickup_location` merely because that is the nearest configured role;
- no location role is applied to the Example Supplier organisation record;
- no canonical/general address is created.

This regression fails if the runtime "fixes" the acceptance defect by never using `pickup_location` even when pickup is actually stated.

## Regression 3 — unsupported units stay unresolved while supported units still normalize

Prompt:

```text
CONTROLLED TEST.
Crutches: 12 pairs.
Bandages: 6 boxes.
Tents: 5 pallets.
```

Precondition: `pairs` is not a configured `quantity_unit`; `boxes` and `pallets` are configured supported units.

Pass:

- crutches preserve `quantity_text = 12 pairs`;
- crutches do not write `items` or another nearest-fit unit;
- unsupported crutch unit/value normalization remains unresolved where normalization would change meaning;
- bandages normalize to `6` + `boxes`;
- tents normalize to `5` + `pallets`;
- `quantity_precision` does not make an invented representation appear exact.

This regression fails if the runtime "fixes" unsupported units by refusing all structured quantity normalization.

## Regression 4 — person and organisation stay separate with read-only canonical reconciliation

Precondition:

- select one existing unambiguous canonical organisation and one existing unambiguous canonical contact linked to it;
- record their canonical IDs in the execution notes, not in this permanent test design;
- snapshot the relevant canonical records before the test.

Prompt pattern:

```text
CONTROLLED TEST. [Organisation] says another batch may become available. [Contact] is the contact mentioned.
```

Pass:

- organisation and contact become separate operational references;
- entity types remain organisation/person respectively;
- their shared submission/context preserves the association without combining both identities into one `reference_text`;
- sufficiently supported canonical matches may be stored separately as reconciliation context;
- the staging representation does not require one canonical reference to stand for two entities;
- before/after comparison shows no canonical Relationship Data record changed.

## Regression 5 — material locations are extracted; incidental place mentions are not

Prompt:

```text
CONTROLLED TEST. The goods are stored temporarily at Holding Site C.
The truck hands them over at Transfer Point D.
Call the driver when the truck reaches Loading Gate E.
The driver mentioned stopping for coffee at Service Plaza F on the way.
```

Pass:

- Holding Site C, Transfer Point D, and Loading Gate E are separately recoverable staging location references;
- their functions remain evidence-bound and distinct;
- Service Plaza F **must not** become an operational location reference because it has no operational function in the goods flow;
- no location is promoted to a general/canonical address without evidence.

## Regression 6 — `submitted_at` cannot be omitted when a Slack timestamp exists

Run at least six controlled Slack writes, deliberately mixing:

- very short submissions;
- long mixed submissions;
- new information;
- updates;
- corrections.

Pass for every write:

- `submitted_at` exists;
- it matches the human Slack source-message timestamp rather than Airtable creation time or Claude reply time;
- `submission_display_name` renders successfully;
- Claude's post-write verification catches and repairs a missing `submitted_at` before reporting successful completion.

Any single omission is a failure.

## Regression 7 — supersession retires current predecessors without rewriting non-current lifecycle

### Case A — normal three-moment progression

Use one synthetic goods item across:

1. first concrete report with an approximate quantity;
2. warehouse entry with a refined exact quantity;
3. warehouse exit.

Do not reuse the Foodbank Nova fixture or the exact 20→18 sequence from the acceptance run.

Pass after entry:

- warehouse fact validly supersedes the first fact;
- first fact remains preserved;
- first fact changes from `current` to `superseded`;
- warehouse fact carries the supported current lifecycle/state.

Pass after exit:

- exit fact validly supersedes the warehouse fact;
- warehouse fact changes from `current` to `superseded`;
- first fact remains `superseded`;
- exit fact carries the supported final lifecycle, such as `resolved`, without inventing a non-existent goods state;
- no directly superseded predecessor remains `current`.

Post-write verification must read back the predecessor lifecycle state, not only the new record and forward link.

### Case B — non-current predecessor guard

Prepare a controlled fixture in which the predecessor already has a legitimate non-current lifecycle such as `resolved`, `cancelled`, or `superseded`, then execute a supported operation that references/links the later fact without evidence that the predecessor lifecycle itself was wrong.

Pass:

- the runtime does not blindly overwrite the legitimate non-current predecessor lifecycle with `superseded` merely because a supersession/reference link exists;
- lifecycle changes occur only when the provider-independent workflow rule and evidence support them.

## Non-regression — correction targeting

The 0.5.0 acceptance run passed both correction cases and 0.6.0 must preserve them:

- a threaded correction may use thread context as sufficient target identification when exactly one parent submission is clearly intended;
- a top-level correction with multiple plausible targets must leave `corrects_submission` unresolved, avoid recency heuristics, preserve candidate facts, and request the smallest clarification needed.

Do not add a new confirmation loop to cases that are already sufficiently identified.

## Non-regression — `controlled_test` is behaviour-neutral

Send an otherwise ordinary synthetic Logistics submission prefixed with `CONTROLLED TEST.`

Pass:

- `controlled_test = true` is preserved as provenance/test metadata;
- the operational interpretation is the same as it would be without the marker;
- the ordinary completion message reports the operational result and does not volunteer placeholder/test-data commentary merely because the marker is present;
- implementation/test mechanics appear only when the user explicitly asks for them.

## Non-regression — passing 0.5.0 semantics

The regression run must also preserve previously passing behaviour:

- offered/expected ambiguity remains unresolved rather than arbitrarily classified;
- Direct Transit remains descriptive flow context and does not imply sorting/storage or invent a state;
- warehouse exit remains recoverable without inventing a new `goods_state`;
- carry-over is not forced into the next transport;
- raw evidence and correction history remain preserved;
- canonical Relationship Data remains read/reference-only during mixed Logistics intake.

## Deliberately parked

Not part of this 0.6.0 regression gate unless separately requested:

- resolving an already-preserved ambiguous correction after the human later answers Claude's clarification;
- attachment handling, which remains untested in the live 0.5.0 acceptance run.

## Pass condition

0.6.0 passes only when:

- all seven demonstrated defects are absent across the targeted invariant tests;
- positive controls show that valid direction, pickup semantics, and supported quantity normalization still work;
- write scope stays inside the three Logistics staging tables;
- canonical Relationship Data is not mutated by mixed Logistics intake;
- `controlled_test` remains operator-language neutral;
- previously passing correction, uncertainty, carry-over, Direct Transit, and warehouse-exit behaviour does not regress.
