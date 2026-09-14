---
document_type: dca_ai_workflow_test_boundary
status: test-design
workflow: capture-logistics-intake
provider_independent: true
---

# Logistics Intake Reconstruction — Test Boundary

## Purpose

Define the provider-independent behaviour that concrete Logistics intake tests should validate during the bounded reconstruction pilot.

The test should prove that messy current-cycle evidence can be preserved without forcing a final Logistics, relationship, contact-route, location, or workflow model too early.

## Behaviour to test

Tests should cover at minimum:

- `submission_kind` and `operational_process` are inferred from ordinary language without asking the operator to classify them;
- the original human submission is preserved verbatim;
- authenticated human actor remains distinct from runtime/interface identity;
- `controlled_test` describes whether processing is being tested, while `synthetic_test_data` independently describes whether the content itself is fictional;
- genuine evidence processed during a controlled run remains operational evidence; synthetic submissions and facts/references supported only by them are excluded from all matching, current-state answers, and promotion;
- one mixed submission may produce multiple goods/state facts and multiple operational references;
- approximate quantity and timing remain approximate rather than being normalized beyond the evidence;
- people, organisations, locations, and routes remain connected to the operational context in which they were supplied;
- a route used for one operational step is not silently promoted to a general canonical contact route;
- an unloading/pickup address is not silently treated as an organisation's general address;
- a person mentioned in a step is not silently assigned a stable operational role;
- Relationship Data may be queried for existing identity context without mutating canonical relationship records from the mixed Logistics submission;
- unknown identity, function, route ownership, or location meaning remains unresolved rather than guessed;
- no final Logistics, contact-route, workflow-role, location, or relationship object is created during intake merely to complete structure;
- user-facing confirmation summarizes what was recorded without exposing staging/schema mechanics;
- first concrete message, warehouse entry, and warehouse exit remain separately recoverable;
- current goods picture remains distinct from physical warehouse inventory;
- the cycle remains previous Ukraine transport → ongoing Logistics work → next Ukraine transport, with carry-over allowed and no forced next-transport assignment;
- updates, corrections, and supersession remain distinct and never overwrite source history;
- a correction links `corrects_submission` only when exactly one prior submission is a sufficiently identifiable target; when more than one plausible target exists, the correction is still preserved, the target is left unresolved, and the ambiguity is flagged for human clarification rather than resolved by recency or any other heuristic;
- a stated transfer direction (including DCA as the receiving/destination party) is preserved through source/destination fields rather than lost or left implicit;
- Direct Transit remains a flow distinction and does not imply whether sorting occurred; it is preserved descriptively in Fact context/notes without a new schema field until a structured flow representation is validated, and is never translated into `goods_state`, storage behaviour, or sorting behaviour;
- `offered` vs `expected` is treated as an unresolved semantic distinction — not something the runtime resolves arbitrarily — and is flagged for organisational/operational validation when a submission falls in the gap between the two;
- contextual Logistics roles use only validated provisional vocabulary and do not become canonical Relationship Data roles;
- temporary holding and handover locations remain contextual rather than canonical;
- attachments remain linked source evidence and automated analysis remains bounded/proposed;
- for an AI-assisted chat transcript, human messages remain source evidence while assistant summaries, category suggestions, calculations, and inferred labels remain derived interpretation unless explicitly confirmed by the human;
- later reconstruction/reconciliation can still recover the source submission and the context linking facts and operational references.

## Controlled mixed-message case

Use a synthetic equivalent of this case in concrete runtime tests:

```text
Mila from Test Partner says about 3 pallets of hygiene goods should be ready Friday. Call her on WhatsApp +31 6 00000000 when the truck reaches Dock B; do not use the office address. The exact pallet count may still change.
```

Expected staging result:

- one source submission preserving the complete text;
- `controlled_test = true` and `synthetic_test_data = true` for this fictional fixture;
- one approximate `expected` goods/state fact for hygiene goods, about 3 pallets, Friday;
- a person reference for Mila;
- an organisation reference for Test Partner;
- a WhatsApp route reference tied to truck-arrival/unloading context;
- a Dock B location reference tied to unloading context and explicitly distinct from the office address;
- no inference that the WhatsApp number is a general canonical contact route;
- no inference that Dock B is the organisation's canonical/general address;
- no canonical Contact/Organization/Partner mutation from this intake alone.

## AI-assisted inventory-transcript case

Use a synthetic transcript in which a warehouse operator dictates messy observations to an AI assistant, the assistant produces cleaned tables and calculated totals, the operator confirms one assistant-suggested item name, and the transcript references a photograph.

Expected boundary:

- preserve the operator's messages as source evidence and the complete transcript as provenance;
- do not attribute assistant-generated clean prose, totals, location labels, categories, or unit conversions to the operator;
- treat the confirmed suggested item name as supported only through the explicit human confirmation;
- require the actual photograph as an attachment rather than treating a local path as image evidence;
- for a genuine version of this scenario processed under observation, use `controlled_test = true` and `synthetic_test_data = false`;
- exclude all synthetic test facts from matching against the genuine inventory.

## Current pilot implementation target

Claude using the Airtable connector against `DCA Evidence & Reconciliation`, with the write boundary limited to:

- `Logistics_Intake_Submissions`
- `Logistics_Intake_Facts`
- `Logistics_Intake_Operational_References`

This write boundary is a required behavioural rule, not a credential restriction: the current Airtable implementation cannot scope an identity to specific tables within a base, so the attached identity can technically read/write any table in `DCA Evidence & Reconciliation`. Tests must verify this boundary by observing that no write occurs outside these three tables, not by asserting the identity cannot reach other tables.

Canonical `2 | DCA Relationships & Workflows` is a separate base and may be available read-only/reference-only in the Logistics channel for established identity lookup during the pilot; that base-level separation is a real credential restriction and is not affected by the table-level limitation above.

Provider-specific Claude Tag validation belongs under `tests/providers/claude/`.

