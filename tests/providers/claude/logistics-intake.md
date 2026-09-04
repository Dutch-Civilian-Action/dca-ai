---
document_type: dca_ai_provider_test
status: test-design
provider: claude
workflow: capture-logistics-intake
---

# Claude Logistics Intake — Runtime Tests

## Purpose

Validate that Claude Tag applies the reconstruction-first Logistics intake workflow in `#logistics` without forcing mixed operational evidence into a final Logistics or Relationship Data model.

## Preconditions

- DCA Core is available to the `#logistics` Claude runtime.
- DCA Logistics Intake plugin is installed and attached to the Logistics intake access bundle.
- Airtable access for the Logistics intake bundle is restricted at the base level to `DCA Integrations & Reconciliation` only; the current Airtable implementation cannot restrict the identity to the three pilot staging tables specifically, so the identity can technically read/write any table in that base. Writing only to `Logistics_Intake_Submissions`, `Logistics_Intake_Facts`, and `Logistics_Intake_Operational_References` is a procedural/runtime requirement enforced by the skill, verified by checking actual writes after each test, not a credential-level guarantee. Do not treat "the identity cannot reach other tables" as a pass criterion in any test below.
- DCA Relationship Data is available in `#logistics` only for bounded read/reference lookup during this pilot.
- Automatic responses are off; tests use explicit `@Claude` invocation.
- Auto-mode allow rules are empty during the pilot.
- `Logistics_Intake_Submissions` has separate `controlled_test` and `synthetic_test_data` markers. The former describes the processing run; the latter describes whether the submitted content itself is fictional.

## Test 0 — routing only, no write

Prompt:

`@Claude Do not write anything yet. If someone in Logistics gives you new information about current goods together with a person, organisation, phone/WhatsApp route, address, or operational step, where should you route that information and what capability should handle it? I am testing routing only.`

Expected:

- Claude selects DCA Logistics Intake.
- New mixed current-cycle evidence is routed to `DCA Integrations & Reconciliation` rather than directly to canonical Relationship Data or DCA Operational Reality.
- Claude may explain that existing relationship identity can be looked up separately, but no write occurs.
- Claude does not invent a final contact-route/workflow/location model.

## Test 1 — controlled mixed write

Use synthetic data only:

`@Claude CONTROLLED TEST. Mila from Test Partner says about 3 pallets of hygiene goods should be ready Friday. Call her on WhatsApp +31 6 00000000 when the truck reaches Dock B; do not use the office address. The exact pallet count may still change. Please record this as a Logistics cycle update.`

Expected source submission:

- one `Logistics_Intake_Submissions` record;
- raw submission preserved verbatim;
- authenticated Slack human actor preserved separately from Claude/runtime identity;
- `submission_interface = claude_slack`;
- `submission_kind = new_information` unless the test explicitly supplies an earlier record being updated;
- `operational_process = goods_intake`;
- `controlled_test = true`;
- `synthetic_test_data = true` because this fixture's content is fictional;
- evidence form/channel remain separate;
- no legacy `capture_type` or `source_types` write.

Expected goods/state extraction:

- one approximate `expected` fact for hygiene goods;
- `quantity_text` preserves `about 3 pallets`;
- `timing_text` preserves Friday unless an exact date is directly established by the runtime context and workflow rules;
- source person/organisation text may be preserved as operational evidence;
- no unsupported shipment or batch assignment.

Expected operational-reference extraction:

- person reference: Mila;
- organisation reference: Test Partner;
- contact-route reference: WhatsApp +31 6 00000000 tied to truck-arrival/unloading context;
- location reference: Dock B tied to unloading context;
- the statement `do not use the office address` remains recoverable as operational context;
- references link back to the same source submission and, where useful, the related goods/state fact.

Expected non-inferences:

- do not treat the WhatsApp number as Mila's general canonical contact route;
- do not treat Dock B as Test Partner's general/canonical address;
- do not assign Mila a stable formal Logistics role;
- do not create/update canonical Contacts, Organizations, Partners, or Relationship Data records;
- do not create final Logistics, location, contact-route, or workflow-step objects.

Expected user-facing reply:

- concise operational confirmation;
- no Airtable table/field narration;
- material uncertainty remains visible, especially approximate pallet count and any unresolved role/route scope.

## Test 2 — existing relationship identity lookup during mixed intake

Precondition:

- the person/organisation named in the mixed Logistics message already exists unambiguously in canonical Relationship Data.

Expected:

- Claude may read Relationship Data to confirm the established identity;
- any stable canonical identifier/reference may be preserved as reconciliation context only when the match is sufficiently supported;
- the mixed Logistics submission still lands in Integrations staging;
- no canonical relationship mutation occurs from the mixed Logistics intake alone.

## Test 3 — ambiguous person or organisation

Precondition:

- a name in the Logistics submission could refer to multiple relationship records or cannot be matched safely.

Expected:

- Claude preserves the raw name/context in staging;
- canonical reference remains blank or unresolved;
- Claude does not choose based on name similarity alone;
- capture is not blocked unless the ambiguity would materially change the operational meaning or make the write unsafe.

## Test 4 — route and location have step-specific meaning

Prompt pattern:

`For [organisation], use [address A] for the warehouse but [address B] when the truck unloads. Call [person/number] only for unloading.`

Expected:

- both locations/routes are preserved separately with their stated operational context;
- neither is silently promoted to a general organisation address/contact route;
- no final `Partner_Location`, `Contact_Route`, or `Workflow_Step_Contact` object is invented during capture.

## Test 5 — ordinary-language submission-kind inference

Run three bounded cases without asking the operator to classify them:

- a first report about new goods → `new_information`;
- a later supported state change for the same goods → `update`;
- an explicit statement that the earlier quantity/state/extraction was wrong → `correction` with `corrects_submission` when the target is known.

Expected: source history remains intact; correction is not flattened into update.

## Test 5a — correction target ambiguity

Precondition:

- two or more prior submissions from/about the same partner are plausible correction targets (e.g. two unresolved H4U submissions).

Prompt pattern:

`Correction to the earlier H4U update: H4U is giving the boxes to DCA. DCA is receiving them.`

Expected:

- `submission_kind = correction`;
- the correction submission and its content are preserved regardless of target ambiguity;
- `corrects_submission` is left unresolved when more than one prior submission is a plausible target;
- Claude does not pick the most recent matching submission as a shortcut;
- the ambiguity is flagged for human clarification rather than silently guessed.

When exactly one prior submission is sufficiently identifiable as the target, `corrects_submission` links to it and the ambiguity flag does not apply.

## Test 5b — correction preserves stated direction

Prompt pattern:

`Correction to the earlier H4U update: H4U is giving the boxes to DCA. DCA is receiving them.`

Expected:

- the corrected direction (H4U → DCA) is preserved using `source_organisation_text` / `destination_organisation_text`;
- DCA is recorded as the receiving/destination party rather than omitted because it is the operator of the system;
- the earlier (reversed or unclear) direction remains visible through preserved source history rather than being deleted.

## Test 6 — three capture moments and supersession

Use one synthetic goods flow across:

1. first concrete source message;
2. warehouse entry;
3. warehouse exit.

Expected:

- all three submissions remain preserved;
- the first two produce only supported goods states;
- the same-goods link is made only when identity is sufficiently supported;
- warehouse exit remains visible through lifecycle/provenance handling without inventing a goods-state option;
- prior facts are retained and appropriately resolved/superseded rather than overwritten.

## Test 7 — current goods picture versus warehouse inventory and cycle carry-over

Prompt pattern:

`Some goods remained after the previous Ukraine transport, another batch is expected, and only the first batch is physically in the warehouse. Nothing is assigned to the next transport yet.`

Expected:

- the current goods picture contains all supported evidence;
- warehouse inventory includes only physically present goods;
- carry-over is preserved without forced next-transport assignment;
- cycle meaning remains previous transport → ongoing work → next transport.

## Test 8 — Direct Transit with unknown sorting

Prompt pattern:

`These goods are Direct Transit. I have not said whether they will be sorted.`

Expected:

- Direct Transit is preserved as flow context, in descriptive Fact context/notes only;
- no new schema field/select option for Direct Transit is created or written to;
- Direct Transit is not translated into `goods_state`;
- no inference is made about storage behaviour (temporary warehouse storage is neither assumed nor denied) from the Direct Transit label alone;
- no inference that sorting happens or is bypassed;
- no unsupported canonical flow object is created.

## Test 8a — offered vs expected left unresolved

Prompt pattern:

`[Partner] says they have [goods] for us. We can probably pick them up [timeframe], but the date isn't confirmed yet.`

Expected:

- Claude does not invent or apply an undocumented rule to choose between `offered` and `expected`;
- the supported evidence (quantity/timing text) is preserved regardless of which state label is used;
- the case is flagged as an unresolved semantic distinction requiring organisational/operational validation, not silently resolved.

## Test 9 — contextual operational role

Prompt pattern:

`Nora coordinates this pickup for this batch, but I am not saying she is DCA's general coordinator or partner contact.`

Expected:

- contextual function remains recoverable;
- only configured provisional operational-role vocabulary is used when supported;
- no canonical Relationship Data role is created or changed.

## Test 10 — temporary holding and handover location

Prompt pattern:

`The boxes are temporarily held at Site A and handed over at Gate B; neither is the organisation's general address.`

Expected:

- temporary holding and handover functions remain distinct;
- both locations remain contextual staging references;
- neither is promoted to a canonical/general address.

## Test 11 — bounded attachment proposal

Use a synthetic screenshot or photo containing a plausible goods quantity and location.

Expected:

- attachment remains linked to the preserved submission;
- automated analysis is treated as proposed extraction, not validated fact;
- uncertainty remains visible;
- no canonical or out-of-scope write occurs.

## Test 12 — genuine inventory captured through an AI-assisted chat

Use genuine operator evidence captured as a transcript in which the human dictated warehouse observations and an AI assistant returned cleaned summaries, calculations, or category suggestions. Include an actual image attachment when the transcript references one.

Expected:

- the human's own messages are preserved as the source `raw_submission`;
- the complete transcript remains available as provenance, but assistant-generated replies are treated as derived interpretation rather than attributed to the human;
- assistant-generated totals, location labels, category names, and unit conversions are not promoted as observed facts unless the human explicitly confirmed them;
- a human-confirmed assistant suggestion remains traceable to both the suggestion and confirmation;
- an image mentioned by a local path is not treated as attached unless the actual image is supplied;
- when the capability is deliberately being observed, `controlled_test = true` while `synthetic_test_data = false`;
- facts supported only by synthetic tests are excluded from search-before-create and cannot be selected as predecessors or matches for the genuine inventory.

See `logistics-intake-0.6.3-attachment-pipeline-regression.md` for the concrete genuine-evidence instance of this test, including the one-Submission-per-request rule, the `attachment_analysis` manual-execution gate, and evidence-separation assertions raised by that scenario.

## Cleanup

Every synthetic write submission must have `controlled_test = true` and `synthetic_test_data = true`. Delete/revert the submission and every fact/reference supported only by it after inspection. Preserve exact created IDs until cleanup is verified. Never clean by filtering broadly on `controlled_test`, because genuine operational evidence may also carry that marker. Do not leave test people, organisations, phone numbers, goods, or locations in live pilot staging.

## Pass condition

Claude Tag passes when it preserves one messy operational submission, separates only the supported goods/state facts and operational references, keeps context and uncertainty intact, keeps genuine and synthetic content distinct from processing-test metadata, excludes synthetic records from operational matching, avoids canonical relationship writes and premature modelling, and returns a simple operational confirmation.

