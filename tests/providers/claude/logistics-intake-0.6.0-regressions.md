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

These tests supplement `logistics-intake.md`; they target demonstrated runtime failures only.

## Regression 1 — direction preserved for every separable fact under batch load

Submit one mixed message containing at least three distinct goods facts where DCA is explicitly or unambiguously the destination for each, using varied wording such as:

- `H7X is handing 5 pallets to DCA`;
- `Foodbank Nova has 20 boxes for us` in an authenticated DCA Logistics context;
- `MedSupply Nova has 2 pallets for DCA`.

Pass:

- each separable fact is checked independently;
- all supported destination fields preserve DCA;
- direction on one fact does not substitute for checking the others;
- no destination is invented for a clause that does not establish one.

## Regression 2 — handover does not become pickup and entity type remains correct

Prompt pattern:

`MedSupply Nova has 2 pallets. They are temporarily held at Site A and handed over at Gate B. Gate B is not a general address.`

Pass:

- MedSupply Nova is an organisation reference only;
- Site A and Gate B are separate location references when operationally material;
- Gate B remains a handover point in descriptive function/context;
- `pickup_location` is not applied unless pickup is actually stated;
- no location role is applied to the organisation record;
- no canonical address/location is created.

## Regression 3 — unsupported quantity unit is not normalized

Prompt pattern:

`Crutches: 12 pairs.`

Precondition: `pairs` is not a configured `quantity_unit` option.

Pass:

- `quantity_text = 12 pairs` remains recoverable verbatim;
- `quantity_unit` is not written as `items` or another nearest-fit option;
- a normalized numeric/unit representation is left unresolved when the unit cannot be represented without changing meaning;
- `quantity_precision` does not make an invented normalized representation appear exact.

## Regression 4 — person and organisation remain separate

Precondition: use one organisation and one known contact, preferably identities that already exist unambiguously in canonical Relationship Data.

Prompt pattern:

`Azzurro says another clothing batch may become available. Harry Schuit is the contact mentioned.`

Pass:

- Azzurro and Harry are separate operational references;
- organisation/person entity types are correct;
- shared submission/fact context preserves their association without combining `reference_text`;
- canonical identity lookup may populate separate reconciliation context when sufficiently supported;
- no canonical mutation occurs from mixed Logistics intake.

## Regression 5 — operationally meaningful locations are separately recoverable

Use one message with several locations serving different operational functions, for example:

- truck-arrival point;
- temporary holding place;
- handover point.

Pass:

- each operationally material location is separately recoverable as a staging location reference;
- functions remain evidence-bound and distinct;
- incidental place mentions with no operational function need not become location references;
- no location is promoted to a general/canonical address without evidence.

## Regression 6 — `submitted_at` cannot be omitted when Slack timestamp exists

Run at least six short and long controlled Slack writes.

Pass for every write:

- `submitted_at` exists;
- it matches the human Slack source-message timestamp rather than Airtable creation time or Claude reply time;
- `submission_display_name` renders successfully;
- Claude's post-write verification explicitly catches and repairs a missing `submitted_at` before reporting successful completion.

Any single omission is a failure.

## Regression 7 — supersession retires the predecessor

Use one goods item across three moments:

1. first concrete report, e.g. `around 20 boxes`;
2. warehouse entry with refined count, e.g. `18 boxes now in warehouse`;
3. warehouse exit, e.g. `18 boxes left the warehouse on the transport`.

Pass after entry:

- new warehouse fact supersedes the first fact;
- first fact remains preserved;
- first fact `lifecycle_status = superseded`;
- warehouse fact has the supported current lifecycle/state.

Pass after exit:

- exit fact supersedes the warehouse fact;
- warehouse fact `lifecycle_status = superseded`;
- first fact remains superseded;
- exit fact carries the supported final lifecycle, e.g. `resolved`, without inventing a non-existent goods state;
- no superseded predecessor remains `current`.

Post-write verification must read back the predecessor's lifecycle state, not only the new record and link.

## Existing correction behaviour that must not regress

The 0.5.0 acceptance run passed both correction cases and 0.6.0 must preserve them:

- a threaded correction may use thread context as sufficient target identification when exactly one parent submission is clearly intended;
- a top-level correction with multiple plausible targets must leave `corrects_submission` unresolved, avoid recency heuristics, preserve candidate facts, and request the smallest clarification needed.

Do not add a new confirmation loop to cases that are already sufficiently identified.

## Deliberately parked

Not part of this 0.6.0 regression gate unless separately requested:

- resolving an already-preserved ambiguous correction after the human later answers Claude's clarification;
- attachment handling, which remains untested in the live 0.5.0 acceptance run.

## Pass condition

0.6.0 passes only when all seven demonstrated defects are absent across the targeted regression cases **and** the previously passing correction, uncertainty, carry-over, Direct Transit, write-boundary, and non-canonical-mutation behaviour remains intact.
