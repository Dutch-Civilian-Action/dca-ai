---
name: capturing-dca-logistics-intake
description: Capture new or changed DCA Logistics-cycle evidence such as goods state, people, organisations, locations, contact routes, pickup/delivery arrangements, carry-over, changes, or cancellations. Use for conversational Logistics intake and updates; do not use for explaining how the Logistics workflow works generally.
metadata:
  version: 0.2.0
  dca-workflow: capture-logistics-intake
  mcp-server: airtable
---

# Capturing DCA Logistics Intake

## Purpose

Provide the Claude runtime adapter for the provider-independent `capture-logistics-intake` workflow.

This skill captures live Logistics-cycle evidence for reconstruction and reconciliation. It does not define DCA Logistics architecture, the full Logistics workflow, final contact-route structures, or organisational truth by itself.

## Runtime path

```text
DCA user in Slack / Claude
→ this skill
→ Airtable connector
→ DCA Integrations & Reconciliation
→ Logistics_Intake_Submissions
→ Logistics_Intake_Facts
→ Logistics_Intake_Operational_References
```

Use only the intended staging base for new Logistics intake:

`DCA Integrations & Reconciliation`

Do not select similarly named bases or use the canonical Relationship Data base as the write destination for mixed Logistics-cycle intake during this pilot.

## Before writing

Read and apply:

- `workflows/capture-logistics-intake.md`
- `context/source-routing.md` when routing or mixed-domain facts matter.

Do not reconstruct this behaviour from old Logistics implementation documents when these current sources are available.

## What users may submit

Accept ordinary operational language about the current Logistics cycle, including:

- goods in the warehouse now;
- goods offered, expected, or incoming;
- pickup or delivery arrangements;
- carry-over from the previous movement;
- changes or cancellations;
- people and organisations involved;
- phone, WhatsApp, email, address, location, or other routes;
- which person, route, or location is relevant to which operational purpose or step;
- who contacts whom and when;
- unresolved or incomplete operational context.

Users may paste or summarize WhatsApp/email/Slack messages or attach supporting evidence where the runtime supports it.

Do not require cleanup, complete fields, or extra research. Unknown may remain unknown.

## Write flow

1. Preserve one `Logistics_Intake_Submissions` record for the human submission.
2. Keep `raw_submission` verbatim.
3. Preserve the authenticated human actor separately from the Claude/runtime identity.
4. Use `capture_type = initial_capture` for the starting picture and `cycle_update` for later changes.
5. Extract only separable, evidence-supported goods/state facts into `Logistics_Intake_Facts`.
6. Extract only separable, evidence-supported people/organisation/location/route references into `Logistics_Intake_Operational_References`.
7. Preserve approximate or unknown quantities, timing, identity, destination, route, function, location, and status without inventing precision.
8. Keep mixed new Logistics-cycle evidence in the Integrations staging base during this reconstruction pilot.
9. Relationship Data may be queried to check whether a person or organisation already exists, but do not mutate canonical Relationship Data as a side effect of mixed Logistics intake.
10. Do not create canonical Logistics, contact-route, workflow-role, location, or Relationship Data objects as a side effect of intake.
11. Return a concise summary of what was recorded and any ambiguity that materially affects operational meaning.

## Table map

### Logistics_Intake_Submissions

Use for source/provenance envelope. Relevant fields:

- `submission_id`
- `capture_type`
- `submitted_at`
- `submitted_by`
- `submission_interface`
- `cycle_reference`
- `raw_submission`
- `source_types`
- `source_references`
- `processing_status`
- `notes`

### Logistics_Intake_Facts

Use for minimally interpreted goods/state facts. Relevant fields:

- `fact_id`
- `submission`
- `fact_type`
- `lifecycle_status`
- `goods_summary`
- `quantity_text`
- `quantity_value`
- `quantity_unit`
- `source_organisation_text`
- `source_contact_text`
- `destination_organisation_text`
- `destination_contact_text`
- `location_text`
- `timing_text`
- `certainty`
- `reconciliation_status`
- `canonical_references`
- `notes`

### Logistics_Intake_Operational_References

Use for people, organisations, locations, contact routes, and other references whose operational meaning must stay connected to the context in which they are used. Relevant fields:

- `reference_id`
- `submission`
- `related_fact`
- `reference_type`
- `reference_text`
- `related_party_text`
- `function_or_step_text`
- `operational_context`
- `route_type`
- `route_value`
- `direction_or_action_text`
- `certainty`
- `reconciliation_status`
- `canonical_reference`
- `notes`

Use `reference_type` only as a minimal staging class:

- `person`
- `organisation`
- `location`
- `contact_route`
- `other`

Do not manufacture a final operational object from these fields.

## Supported goods/state fact types

Use only when supported by the submission:

- `in_warehouse`
- `offered`
- `expected`
- `incoming`
- `pickup_arranged`
- `delivery_arranged`
- `remaining_from_previous_movement`
- `change`
- `cancellation`
- `no_longer_expected`
- `unresolved`

If the best interpretation is unclear, preserve `unresolved` rather than guessing.

## Mixed information boundary

A Logistics message may contain several kinds of evidence at once. Do not force the message into one canonical domain during intake.

Example:

```text
"Olga from Help Window says 3 pallets are ready Friday. Call her on this WhatsApp number when the truck reaches the unloading address."
```

May support:

- a goods/state fact about 3 pallets and timing;
- a person reference;
- an organisation reference;
- a WhatsApp route;
- an unloading-location reference;
- an operational action/context connecting the route to that step.

Preserve those together through the same submission. Do not infer that the number is Olga's general canonical contact route, that the unloading address is the organisation's general address, or that Olga has a stable formal Logistics role.

Relationship Data can be read for identity lookup/reconciliation context. New mixed Logistics-cycle intake stays in Integrations staging until reconstruction determines what should later be promoted where.

## Operational Reality boundary

Do not write the changing goods list, contact-route details, or item-level operational references into the DCA Operational Reality document.

Live/staging records preserve specific changing evidence. The maintained Operational Reality describes how the work currently happens, including roles, dependencies, handoffs, variation, exceptions, and visibility gaps.

Captured intake may later become evidence for an Operational Reality update when it reveals a material pattern or change.

## User-facing behaviour

Keep the implementation hidden.

Good completion messages:

- `Recorded: 4 pallets still in the warehouse, 2 expected Friday, and one pickup still unresolved.`
- `Recorded the goods and the contact/address context. I kept the unloading address separate from the general organisation context.`
- `Recorded the update. The exact quantity is unknown, so I left it unknown.`
- `Recorded the route and when it is used. I left the person's broader role unresolved.`

Do not teach the user about staging tables or reconciliation unless they ask.

## Failure behaviour

If the information is incomplete, do not block capture unnecessarily.

Ask a clarification only when the ambiguity would cause a materially different operational meaning or unsafe write. Otherwise preserve the uncertainty and continue.
