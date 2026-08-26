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
- Airtable access for the Logistics intake bundle is restricted to `DCA Integrations & Reconciliation` and the three pilot staging tables.
- DCA Relationship Data is available in `#logistics` only for bounded read/reference lookup during this pilot.
- Automatic responses are off; tests use explicit `@Claude` invocation.
- Auto-mode allow rules are empty during the pilot.

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
- `capture_type = cycle_update`.

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

## Cleanup

Controlled synthetic records must be deleted/reverted after inspection. Do not leave test people, organisations, phone numbers, goods, or locations in live pilot staging.

## Pass condition

Claude Tag passes when it preserves one messy operational submission, separates only the supported goods/state facts and operational references, keeps context and uncertainty intact, avoids canonical relationship writes and premature modelling, and returns a simple operational confirmation.
