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

- the original human submission is preserved verbatim;
- authenticated human actor remains distinct from runtime/interface identity;
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
- later reconstruction/reconciliation can still recover the source submission and the context linking facts and operational references.

## Controlled mixed-message case

Use a synthetic equivalent of this case in concrete runtime tests:

```text
Mila from Test Partner says about 3 pallets of hygiene goods should be ready Friday. Call her on WhatsApp +31 6 00000000 when the truck reaches Dock B; do not use the office address. The exact pallet count may still change.
```

Expected staging result:

- one source submission preserving the complete text;
- one approximate `expected` goods/state fact for hygiene goods, about 3 pallets, Friday;
- a person reference for Mila;
- an organisation reference for Test Partner;
- a WhatsApp route reference tied to truck-arrival/unloading context;
- a Dock B location reference tied to unloading context and explicitly distinct from the office address;
- no inference that the WhatsApp number is a general canonical contact route;
- no inference that Dock B is the organisation's canonical/general address;
- no canonical Contact/Organization/Partner mutation from this intake alone.

## Current pilot implementation target

Claude using the Airtable connector against `DCA Integrations & Reconciliation` with write access restricted to:

- `Logistics_Intake_Submissions`
- `Logistics_Intake_Facts`
- `Logistics_Intake_Operational_References`

Canonical `2 | DCA Relationships & Workflows` may be available read-only/reference-only in the Logistics channel for established identity lookup during the pilot.

Provider-specific Claude Tag validation belongs under `tests/providers/claude/`.
