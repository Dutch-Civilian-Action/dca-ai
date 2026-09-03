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

These tests supplement `logistics-intake.md`. They isolate the underlying invariants rather than replaying the exact acceptance-run entities and wording.

Run the companion `logistics-intake-0.6.0-realistic-acceptance-cases.md` as a separate acceptance layer. That file preserves the difficult mixed scenarios derived from the live `#logistics` run — messy multi-party dumps, thread-vs-top-level corrections, longitudinal warehouse progression, Direct Transit/location combinations, and mixed Relationship Data context — using synthetic permanent fixtures.

Passing this invariant suite does not replace the realistic acceptance cases, and passing the realistic cases does not replace the isolated regressions.

## Cross-cutting checks for every write test

For every regression that writes data:

1. preserve the human source submission and source timestamp;
2. verify the intended new/changed records by read-back rather than trusting the write response;
3. compare write scope before/after and confirm no record was created or changed outside:
   - `Logistics_Intake_Submissions`;
   - `Logistics_Intake_Facts`;
   - `Logistics_Intake_Operational_References`;
4. when canonical Relationship Data is read for identity context, compare the relevant canonical records before/after and confirm no canonical mutation occurred;
5. preserve uncertainty and do not invent unsupported schema values merely to make the test pass;
6. write `controlled_test = true` and `synthetic_test_data = true` for every fictional fixture, and verify that synthetic records are excluded from operational search-before-create, matching, current-goods answers, warehouse-inventory answers, and promotion.

A write-boundary failure or canonical Relationship Data mutation fails the regression run even when the target staging records look correct.

## Regression 1 — direction is resolved per fact, not by batch default

### Message A — DCA destination plus no-direction control

Submit one mixed message with three distinct goods facts:

```text
CONTROLLED TEST.
Northstar Aid is handing 5 pallets of blankets to DCA.
Riverside Depot has 6 boxes of hygiene goods for us.
7 walking frames are in the warehouse now.
```

Precondition: invocation occurs in the authenticated DCA Logistics context so `for us` has an unambiguous DCA referent in this message.

Pass:

- Northstar Aid fact preserves `Northstar Aid → DCA`;
- Riverside Depot fact preserves DCA as destination because `for us` is unambiguous in this immediate conversational context;
- walking-frames fact leaves direction unresolved because none was stated;
- direction is evaluated independently for all three facts rather than copied from another clause.

### Message B — third-party direction control

Submit separately:

```text
CONTROLLED TEST. Delta Foundation is handing 2 pallets of medical goods to Eastside Clinic.
```

Pass:

- the fact preserves `Delta Foundation → Eastside Clinic`;
- DCA is not substituted as destination merely because the message was posted in DCA Logistics.

This regression fails if the runtime "fixes" direction by always writing DCA, or if it ignores an unambiguous `for us` referent in Message A.

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

### Case B — non-current predecessor guard derived from Case A

Use the records produced by Case A; do not create a manual Airtable fixture.

After warehouse exit, the original first fact is already legitimately `superseded`. Send a further supported follow-up about the same goods that clearly refers back to the original report but adds only non-lifecycle context, for example a source/contact detail or other operational context that does not state that the original lifecycle was wrong.

Pass:

- the follow-up may preserve/link the additional evidence according to the normal workflow;
- the original first fact remains `superseded`;
- the runtime does not blindly rewrite an already legitimate non-current lifecycle merely because the later operation references or links back to that earlier evidence;
- lifecycle changes occur only when the provider-independent workflow rule and evidence support them.

This case must be executable entirely through the normal intake path; no manual lifecycle edit or special Airtable setup is part of the test.

## Non-regression — correction targeting

The 0.5.0 acceptance run passed both correction cases and 0.6.0 must preserve them:

- a threaded correction may use thread context as sufficient target identification when exactly one parent submission is clearly intended;
- a top-level correction with multiple plausible targets must leave `corrects_submission` unresolved, avoid recency heuristics, preserve candidate facts, and request the smallest clarification needed.

Do not add a new confirmation loop to cases that are already sufficiently identified.

## Non-regression — `controlled_test` is behaviour-neutral

Send an otherwise ordinary synthetic Logistics submission prefixed with `CONTROLLED TEST.`

Pass:

- `controlled_test = true` is preserved as processing-test metadata;
- `synthetic_test_data = true` is preserved separately because this fixture is fictional;
- the operational interpretation is the same as it would be without either marker;
- the ordinary completion message reports the operational result and does not volunteer placeholder/test-data commentary merely because either marker is present;
- implementation/test mechanics appear only when the user explicitly asks for them;
- cleanup uses the fixture's exact record IDs rather than every record with `controlled_test = true`.

Paired genuine-evidence control:

- when genuine operator evidence is processed while the capability is deliberately being observed, write `controlled_test = true` and `synthetic_test_data = false`;
- the genuine evidence remains eligible for operational reconstruction;
- no synthetic fact may be selected as its match, predecessor, or current warehouse state.

## Non-regression — passing 0.5.0 semantics

The regression run must also preserve previously passing behaviour:

- offered/expected ambiguity remains unresolved rather than arbitrarily classified;
- Direct Transit remains descriptive flow context and does not imply sorting/storage or invent a state;
- warehouse exit remains recoverable without inventing a new `goods_state`;
- carry-over is not forced into the next transport;
- raw evidence and correction history remain preserved;
- canonical Relationship Data remains read/reference-only during mixed Logistics intake.

## Non-regression — `operational_process` derives only from concrete goods progression

Retest the production classification pattern observed in `Logistics_Intake_Submissions`: six live records were misclassified as `logistics_information_intake`. The only established common factor across all six is `baseline_capture = true`. Some of the six also contained hedged/uncertain phrasing on the goods state, but no cue has been established as the actual cause of the runtime failure — test both factors independently rather than assuming which one caused the defect.

### Case A — initial baseline reconstruction of concrete goods states, including hedged phrasing

There is no separate setup/context turn. Submit each of the following as its own separate top-level Slack message, where the message's own ordinary wording establishes that it is part of the initial reconstruction of the current Logistics picture, so that `baseline_capture = true` is grounded per-submission rather than by an external framing message:

```text
CONTROLLED TEST. As part of the initial reconstruction of the current Logistics picture: Northstar Aid has offered 4 pallets of blankets.
CONTROLLED TEST. As part of the initial reconstruction of the current Logistics picture: we are expecting 3 boxes of hygiene kits from Riverside Depot, but it might not happen.
CONTROLLED TEST. As part of the initial reconstruction of the current Logistics picture: pickup of 2 pallets of tarpaulins from Example Supplier is arranged for Thursday.
CONTROLLED TEST. As part of the initial reconstruction of the current Logistics picture: 6 walking frames are in the warehouse now.
```

The third message (the Example Supplier tarpaulins pickup) becomes the **thread root used in Case B**: Case B's update and correction are posted as replies within that same thread, with the correction targeting this root submission.

Pass for every message — read back and confirm as two separate assertions, neither substituting for the other:

- `baseline_capture = true` is recorded, inferred from that message's own "as part of the initial reconstruction…" wording, not from any external setup turn and not asserted with no grounding;
- `operational_process = goods_intake` is independently derived from the concrete goods content of the message itself, not inferred from the `baseline_capture` marker;
- the hedged Riverside Depot message (`might not happen`) is still `operational_process = goods_intake` — uncertainty about whether the goods movement completes is preserved in the fact/lifecycle fields, not by reclassifying `operational_process`.

This case fails if any message is written as `logistics_information_intake`, if `baseline_capture = true` is written with no supporting wording in that specific message, if `operational_process = goods_intake` is asserted only because `baseline_capture = true` rather than independently supported by the goods content, or if hedged/uncertain wording is treated as a reason to reclassify concrete goods evidence.

**Control — hedging without baseline capture**

Make this its own separate top-level message, outside the thread(s) above, whose own wording establishes that the initial reconstruction is already complete and this is a new incremental update rather than baseline reconstruction:

```text
CONTROLLED TEST. The initial reconstruction of the current Logistics picture is complete; this is a new incremental update. Test Org Delta says the pallets of tents might not be released this week after all, but the shipment is already on its way.
```

Mark this submission `controlled_test = true` and `synthetic_test_data = true` as the fixture's own declared provenance.

Pass — read back and confirm:

- `baseline_capture = false` appears only as the expected read-back outcome, inferred from the message's own "initial reconstruction is complete... new incremental update" wording — it is not written as an externally forced input value;
- `operational_process = goods_intake` still applies — the message states a concrete goods progression (a shipment already under way) despite hedged/uncertain phrasing about whether the release completes as planned;
- this control isolates hedging from `baseline_capture` as two independent variables: hedged phrasing alone, on a message that is not baseline reconstruction, still does not change `operational_process`.

### Case B — correction to concrete goods evidence stays `goods_intake`

The submission being corrected is the exact Case A top-level message reporting the Example Supplier tarpaulins pickup — the thread root identified in Case A — not a paraphrase of it. First submit an intervening update as a reply in that same thread:

```text
CONTROLLED TEST. Update: the Example Supplier pickup is now confirmed for Friday instead of Thursday.
```

Then, as a **threaded reply directly to the original Case A tarpaulins root message** (not to the intervening Friday-update reply), submit a correction that genuinely disagrees with it:

```text
CONTROLLED TEST. Correction: the Example Supplier pallets were tents, not tarpaulins.
```

Pass:

- both the update and the correction preserve `operational_process = goods_intake`;
- `submission_kind` (`update`, `correction`) is recorded independently and does not change `operational_process`;
- `corrects_submission` on the correction links to the exact Case A tarpaulins thread-root submission — not the intervening Friday-update reply and not a paraphrased "fact" — using the thread relationship to that root message as the identifying evidence, per the workflow's thread-context correction rule; the intervening update in the same thread must not cause the target to shift to it;
- the correction genuinely disagrees with the targeted submission (tarpaulins vs. tents, same 2-pallet Example Supplier pickup) without altering `operational_process` on either submission.

### Case C — `controlled_test` / `synthetic_test_data` never change the classification

This is a no-write static resolution matrix, not an instruction to create any Airtable record and not an instruction to submit fictional content as if it were genuine. Trace all four `controlled_test` / `synthetic_test_data` combinations against the same abstract concrete-goods semantics — for example, "Example Supplier is arranging pickup of 3 pallets of tarpaulins for delivery to DCA" — without submitting anything:

| `controlled_test` | `synthetic_test_data` | Content genuineness | `operational_process` |
|---|---|---|---|
| `true` | `true` | fictional | `goods_intake` |
| `false` | `true` | fictional | `goods_intake` |
| `true` | `false` | genuine | `goods_intake` |
| `false` | `false` | genuine | `goods_intake` |

Pass:

- all four rows resolve to `operational_process = goods_intake` for the same abstract concrete-goods content;
- this matrix is a reasoning trace only — it creates no `Logistics_Intake_Submissions`, `Logistics_Intake_Facts`, or `Logistics_Intake_Operational_References` record, and does not relabel fictional evidence as genuine: the two `synthetic_test_data = false` rows describe evidence that is actually genuine, not fictional content with the marker flipped;
- neither `controlled_test` nor `synthetic_test_data`, alone or in any combination, changes `operational_process` for otherwise identical concrete-goods content.

The two `controlled_test = false` rows stay part of the static trace only — they are valid classifications for a combination that could arise naturally outside a controlled test, not something to actually execute live in this regression run. Any fixture that is actually run live here is, by definition, being actively tested/observed, so it must carry `controlled_test = true`.

What may actually be run live in this regression run is restricted to exactly the two `controlled_test = true` rows, and nothing else:

- **synthetic controlled fixture** — `controlled_test = true`, `synthetic_test_data = true`: created, marked, and cleaned up per the normal synthetic-fixture rules;
- **genuinely supplied evidence under controlled observation** — `controlled_test = true`, `synthetic_test_data = false`: requires genuinely supplied real operational evidence (its content recorded in execution notes only, not in this permanent test design) and must be its own distinct submission with its own ID.

A live control must never reuse a fictional fixture's content or ID with `synthetic_test_data` merely flipped to `false`.

### Case D — context-only Logistics information stays `logistics_information_intake`

Submit, using a name that is itself unmistakably synthetic (never a real DCA person):

```text
CONTROLLED TEST. Nora Test is the person to call when a truck arrives at the warehouse.
Transport updates for the current cycle come in by WhatsApp rather than email.
```

Pass:

- `operational_process = logistics_information_intake`;
- no concrete goods offer, expectation, pickup/delivery arrangement, incoming notice, or warehouse state is present in the submission, so `goods_intake` is not used;
- the operational references (Nora Test, the WhatsApp route) are still preserved as `Logistics_Intake_Operational_References` per the normal reference rules; only `operational_process` is at issue in this case.

Pass condition for this section: all four cases classify `operational_process` correctly, and no combination of `baseline_capture`, `controlled_test`, `synthetic_test_data`, or `submission_kind` changes that classification for otherwise identical goods content.

## Deliberately parked

Not part of this 0.6.0 regression gate unless separately requested:

- resolving an already-preserved ambiguous correction after the human later answers Claude's clarification;
- attachment handling, which remains untested in the live 0.5.0 acceptance run.

## Pass condition

0.6.0 passes only when:

- the targeted invariant tests confirm no regression across: the seven originally demonstrated defects, plus the `operational_process` classification section added in this PR;
- positive controls show that valid direction, pickup semantics, and supported quantity normalization still work;
- write scope stays inside the three Logistics staging tables;
- canonical Relationship Data is not mutated by mixed Logistics intake;
- `controlled_test` remains operator-language neutral and independent from `synthetic_test_data`;
- synthetic fixtures remain excluded from operational matching and are removed by exact ID after audit;
- previously passing correction, uncertainty, carry-over, Direct Transit, and warehouse-exit behaviour does not regress;
- the separate realistic acceptance-case layer also passes before operational acceptance is declared.
