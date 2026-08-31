---
document_type: dca_ai_provider_test
status: test-design
provider: claude
workflow: capture-logistics-intake
skill_version: 0.6.0
scenario_source: 2026-08-31-live-acceptance-and-historical-logistics-channel
---

# Claude Logistics Intake 0.6.0 — Realistic Acceptance Cases

## Purpose

Keep the difficult, messy, multi-signal situations that exposed the real behaviour of Logistics Intake during the 31 August 2026 `#logistics` live acceptance run, plus recurring operational patterns found in historical `#logistics` conversations.

The invariant regression suite in `logistics-intake-0.6.0-regressions.md` isolates individual rules. This file does the opposite: it deliberately recombines them into realistic operator messages so DCA can test whether the capability still works when several valid distinctions must be preserved at once.

These cases are derived from real Logistics-channel patterns, but permanent fixtures use synthetic names, routes, locations, and quantities. Do not commit live canonical IDs, phone numbers, partner identities, addresses, or controlled-run Airtable record IDs here. Record execution-specific IDs only in temporary execution notes.

Use explicit `@Claude` invocation in `#logistics`. Apply the same cross-cutting write-boundary, canonical non-mutation, provenance, and read-back checks as the regression suite.

## Why keep both layers

```text
invariant regressions
= can the runtime preserve one rule under controlled conditions?

realistic acceptance cases
= can the runtime preserve several rules simultaneously in the kind of messy input Logistics actually produces?
```

Passing the invariant suite is necessary but not sufficient. These scenarios guard against failures that only appear under mixed load, thread context, longitudinal updates, conflicting source information, or interactions between Relationship Data and Logistics staging.

## Case 1 — messy multi-party current-picture dump

### What this exercises

- ordinary messy language;
- one submission containing many independent goods facts;
- quoted source text;
- approximate versus exact quantities;
- offered/expected ambiguity;
- explicit and implicit direction;
- carry-over versus current warehouse inventory;
- Direct Transit;
- temporary holding and handover locations;
- person/organisation separation;
- step-specific contact route;
- intermediary context without a goods fact;
- canonical identity read/reference boundary;
- unsupported quantity unit.

### Prompt

```text
@Claude CONTROLLED TEST. ok here is everything i have now, sorry is a bit chaos

Mila from Northstar Supplies say about 3 pallets hygiene goods ready friday. she want you call her on whatsapp +31 6 00000000 when truck is by Dock B. NOT the office adres. the pallet count can still change she was not sure.

Foodbank Delta have around 20 boxes mixed food for us. we can probably pick up next week but date is not confirmed yet.

H7X Test - 5 pallets tents. they are handing over to DCA, so DCA is receiving. pickup not confirmed.

Petra is still de intermediary between DCA and Ridgeline Test Amenities. nothing new offered there at moment.

MedSupply Test has 2 pallets Hero boxes for us, this is Direct Transit. they stay temporary by Dana her parents house and the handover is at the Shell station on A4. is not anybody general adres. sorting we dont know yet.

Azzurro Test say maybe another batch clothing come available. Harry Test is the contact who was mentioned.

this is what i get about the foodbank:
"Hoi, we hebben weer dozen staan. Weet niet precies hoeveel, een stuk of 20. Wanneer kan het opgehaald worden?"

medical goods:
wheelchairs     4         2 need repair, left over from last transport
crutches        12 pairs  left over from last transport
hospital beds   2         electric, expected next month
bandages        6 boxes   expiry unknown, expected next month
walking frames  7         in warehouse now
```

### Pass

- the entire raw message and quoted message remain preserved;
- separable goods facts do not inherit direction, state, quantity, or certainty from neighbouring clauses;
- explicit `H7X Test → DCA` is preserved;
- unambiguous `for us` clauses may resolve to DCA according to the provider-independent direction rule; clauses with no supported direction remain unresolved;
- offered/expected remains unresolved where the evidence does not justify choosing one;
- wheelchairs/crutches remain carry-over evidence without being forced into `in_warehouse` or the next transport;
- hospital beds and bandages may be `expected`; walking frames may be `in_warehouse`;
- `12 pairs` remains `quantity_text`; no nearest-fit `items` normalization is invented when `pairs` is unsupported;
- Direct Transit remains descriptive and does not imply sorting or storage behaviour;
- temporary holding and handover remain distinct location functions;
- Mila, Northstar Supplies, Dock B, MedSupply Test, temporary holding place, handover place, Azzurro Test, and Harry Test remain separable references where operationally meaningful;
- the step-specific WhatsApp route is not promoted to a general canonical contact route;
- Petra's intermediary context can be preserved without manufacturing a goods fact;
- no canonical Relationship Data record is mutated;
- `controlled_test` does not change the ordinary operational confirmation language.

This case should remain difficult. It is specifically meant to expose behaviour that passes isolated rules but fails under batch load.

## Case 2 — same organisation, two separate batches

### Message A

```text
@Claude CONTROLLED TEST. H7X Test has 5 pallets tents for DCA. pickup not confirmed.
```

### Message B — later top-level message

```text
@Claude CONTROLLED TEST. H7X Test mention also a second batch, 3 boxes hygiene kits for DCA. timing not clear.
```

### Pass

- two distinct goods batches remain distinguishable;
- Message B is `new_information`, not a correction to Message A;
- quantities and goods descriptions do not merge merely because the source organisation is the same;
- uncertainty in Message B remains unresolved;
- source/destination is evaluated separately for each fact;
- source timestamps are present on both submissions.

## Case 3 — thread context identifies a correction target

Precondition: post this inside the thread of Case 2 Message A, while Message B also exists as a separate top-level submission.

### Prompt

```text
@Claude CONTROLLED TEST. correction on the earlier H7X Test update: H7X Test is handing the goods over to DCA, not other way around.
```

### Pass

- the new submission is a correction;
- thread context is accepted as sufficient identifying evidence for the thread-parent submission when it is unambiguous;
- `corrects_submission` links to that one parent rather than using recency;
- the second H7X Test batch does not make the correction artificially ambiguous merely because the organisation name matches;
- if the stored direction was already correct, source history is preserved and no unnecessary fact rewrite is required.

## Case 4 — top-level correction is genuinely ambiguous

Precondition: both H7X Test batches from Case 2 exist. Send this as a new top-level message, not in either thread.

### Prompt

```text
@Claude CONTROLLED TEST. correction on the earlier H7X Test update: the number is not right, it is less than what i said.
```

### Pass

- a correction submission is preserved;
- both plausible batches are recognized;
- `corrects_submission` remains unresolved;
- no recency heuristic chooses one target;
- neither existing quantity is changed;
- candidate records may carry an open-correction note/flag if supported by the current schema, but source evidence is not overwritten;
- Claude asks only the smallest clarification needed: which batch and the corrected number.

Leave the clarification unanswered during this acceptance case. Later clarification-resolution remains a separately parked behaviour until explicitly specified.

## Case 5 — longitudinal warehouse progression

Use a new synthetic goods case, not the 31 August controlled records.

### Message A — first concrete source report

```text
@Claude CONTROLLED TEST. Foodbank Echo say they have around 16 boxes mixed food for us. pickup date not confirmed.
```

### Message B — warehouse entry, in Message A's thread

```text
@Claude CONTROLLED TEST. the Foodbank Echo boxes are arrived now in warehouse. is actually 14 boxes not 16.
```

### Message C — warehouse exit, same thread

```text
@Claude CONTROLLED TEST. the Foodbank Echo boxes left the warehouse this morning on the transport.
```

### Pass

After Message B:

- the original approximate report remains preserved;
- the new fact records 14 boxes and `in_warehouse` when supported;
- the new fact supersedes the earlier current fact;
- the directly superseded predecessor becomes `lifecycle_status = superseded`.

After Message C:

- warehouse exit remains recoverable without inventing a new `goods_state`;
- the exit fact supersedes the in-warehouse fact;
- the in-warehouse predecessor becomes `superseded`;
- the exit fact receives its supported lifecycle such as `resolved`;
- the full evidence chain remains navigable;
- only the appropriate final/current state is treated as operative when answering inventory questions.

## Case 6 — operational route and locations are not general contact/address data

### Prompt

```text
@Claude CONTROLLED TEST. For Example Supplier use Warehouse Road 3 when collecting. Truck unloads at Rear Gate 7 instead. Call Nora on WhatsApp +31 6 00000001 only when the truck reaches the rear gate. none of these is meant as their general office contact.
```

### Pass

- Example Supplier, Nora, Warehouse Road 3, Rear Gate 7, and the WhatsApp route remain distinct supported references;
- collection/pickup and unloading/handover functions remain distinct;
- route scope remains step-specific;
- no location is silently promoted to a canonical/general organisation address;
- no phone route is silently promoted to Nora's general canonical route;
- no canonical Relationship Data mutation occurs.

## Case 7 — relationship identity present, Logistics context remains separate

Precondition: choose one existing unambiguous canonical organisation and one existing canonical contact linked to it. Keep their live names/IDs in execution notes only; substitute them into the prompt at runtime.

### Prompt pattern

```text
@Claude CONTROLLED TEST. [Organisation] say maybe another clothing batch come available. [Contact] is the contact who was mentioned. nothing confirmed yet.
```

### Pass

- canonical lookup may establish identity context;
- organisation and person remain separate operational references;
- one staging reference is not used to stand for both identities;
- tentative goods evidence remains tentative;
- no canonical contact/organisation/relationship is mutated merely because the mixed Logistics submission referenced it.

## Case 8 — Direct Transit plus temporary holding, handover, and unknown sorting

### Prompt

```text
@Claude CONTROLLED TEST. Relay Medical has 2 pallets Hero boxes for DCA. this is Direct Transit. they stay temporary at Holding Site X and handover is at Transfer Point Y. sorting we dont know yet. neither place is a general address.
```

### Pass

- source/destination is preserved;
- Direct Transit remains descriptive flow context;
- no Direct Transit `goods_state` or unsupported structured flow field is invented;
- no sorting assumption is made;
- Holding Site X and Transfer Point Y remain separate operationally meaningful locations;
- temporary holding is not translated into warehouse;
- handover is not translated into pickup merely because pickup is an available role;
- neither becomes a canonical/general address.

## Case 9 — current goods picture is broader than warehouse inventory

### Prompt

```text
@Claude CONTROLLED TEST. from last transport we still have 4 wheelchairs and 12 pairs crutches unresolved. 2 hospital beds are expected next month. 7 walking frames are in warehouse now. nothing is assigned to next transport yet.
```

### Pass

- all supported goods remain part of the current Logistics picture;
- only the walking frames are represented as physically `in_warehouse` from this evidence;
- carry-over goods are not forced into warehouse inventory merely because they remain unresolved/current;
- expected beds remain future/expected evidence;
- nothing is assigned to the next transport without evidence;
- unsupported `pairs` normalization remains unresolved.

## Case 10 — short-message provenance stress

The 0.5.0 live run produced one missing `submitted_at` on a very short message while surrounding writes were correct. Keep a short-form scenario in every acceptance cycle.

### Prompt

```text
@Claude CONTROLLED TEST. Northstar Test also 3 boxes hygiene kits for DCA. timing unclear.
```

### Pass

- `submitted_at` matches the human Slack message timestamp;
- display-name formula renders successfully;
- Claude read-back catches and deterministically repairs an omitted source timestamp before reporting completion;
- short input does not receive a reduced provenance envelope compared with longer submissions.

## Case 11 — historical `#logistics` pattern: conflicting delivery location, physical drop, and paperwork identity

### Source pattern

This scenario is derived from an August 2026 `#logistics` transport-planning thread where DCA had several unloading points, one partner location was known first only through a map pin, two people held different address representations, the physical drop still had to happen at that partner's location, and the partner was represented under another organisation's CMR paperwork.

The permanent fixture below deliberately removes the real organisations, people, addresses, phone numbers, and map links. What matters is the structure of the operational ambiguity.

### Prompt

```text
@Claude CONTROLLED TEST. transport update, bit messy.

We want 20 pallets on the truck. 3 pallets need to go to Partner Alpha before the other two unload places.

For Partner Alpha I first only had a google maps pin, not a proper address. The place is at a rural road / small square. I found an address across the road that can be used as a reference, but James Test has a different street address for the same Partner Alpha location, so I am not sure which written address is correct.

The driver still needs to drop the 3 pallets at Partner Alpha and will call contact Nora Test before arrival because otherwise the place is difficult to find.

Important: on the transport paperwork Partner Alpha is included under Main Aid Hub's CMRs. That does NOT mean the pallets should be physically unloaded at Main Aid Hub.

The other unloads are Aid Point Beta and Aid Point Gamma. Their addresses are known.
```

### Pass

- three operational unloading destinations remain separately recoverable;
- `3 pallets → Partner Alpha` remains distinct from the rest of the load;
- the map pin, descriptive rural-place context, across-the-road reference address, and conflicting street address remain evidence about the same unresolved physical destination without one being silently promoted to canonical truth;
- the runtime does not pick the newest/most complete-looking Partner Alpha address merely to produce a clean field;
- Nora Test remains a person/contact reference and the pre-arrival call remains a step-specific operational route/function;
- Main Aid Hub's paperwork/CMR representation does not merge Partner Alpha into Main Aid Hub, redefine Partner Alpha's identity, or change the physical delivery destination;
- `paperwork representation ≠ physical unloading location ≠ organisation identity` remains explicit;
- known Aid Point Beta/Gamma addresses remain separate from the unresolved Partner Alpha location;
- the whole submission can be captured without requiring the operator to solve the address conflict first;
- unresolved address conflict is surfaced for operational clarification rather than silently normalized.

This is intentionally a historical-realism test: it checks whether Claude can preserve the exact kind of fragmented, person-held transport context that appears in actual Logistics coordination instead of flattening it into one clean address record.

## Execution discipline

- Run invariant regressions and realistic cases as two distinct layers; do not score one as a substitute for the other.
- Use synthetic permanent fixtures. Live canonical identities may be selected only when a test explicitly requires reconciliation; keep their IDs/names in execution notes rather than committing them here.
- Historical channel-derived cases must preserve the **structure of the operational problem**, not the live identifying data.
- Preserve exact controlled-run Airtable record IDs until the run is fully audited and accepted.
- Do not delete standing evidence from a previous acceptance run before the replacement regression/acceptance run is complete when that evidence is still being used to verify a previously passing behaviour.
- Cleanup controlled synthetic records by exact ID after the complete run and audit, never by a broad `controlled_test = true` filter.

## Acceptance condition

0.6.0 should not be considered operationally accepted merely because the isolated regressions pass. The capability should also survive these realistic mixed cases without reintroducing cross-fact leakage, object collapse, provenance loss, lifecycle inconsistency, premature canonicalisation, schema-driven invention, or false resolution of real operational conflict.
