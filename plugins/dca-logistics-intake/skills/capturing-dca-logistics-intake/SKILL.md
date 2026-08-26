---
name: capturing-dca-logistics-intake
description: Capture new or changed DCA Logistics state such as goods in the warehouse, offered, expected, incoming, pickup/delivery arrangements, carry-over, changes, or cancellations. Use for conversational Logistics intake and updates; do not use for explaining how the Logistics workflow works generally.
metadata:
  version: 0.1.0
  dca-workflow: capture-logistics-intake
  mcp-server: airtable
---

# Capturing DCA Logistics Intake

## Purpose

Provide the Claude runtime adapter for the provider-independent `capture-logistics-intake` workflow.

This skill captures live Logistics operational-state evidence. It does not define DCA Logistics architecture, the full Logistics workflow, or organisational truth by itself.

## Runtime path

```text
DCA user in Slack / Claude
→ this skill
→ Airtable connector
→ DCA Integrations & Reconciliation
→ Logistics_Intake_Submissions + Logistics_Intake_Facts
```

Use only the intended base:

`DCA Integrations & Reconciliation`

Do not select similarly named bases or the canonical Relationship Data base for Logistics intake staging.

## Before writing

Read and apply:

- `workflows/capture-logistics-intake.md`
- `context/source-routing.md` when routing or mixed-domain facts matter.

Do not reconstruct this behaviour from old Logistics implementation documents when these current sources are available.

## What users may submit

Accept ordinary operational language about goods that are:

- in the warehouse now;
- offered;
- expected;
- incoming;
- arranged for pickup;
- arranged for delivery;
- left or unresolved from the previous movement;
- changed;
- cancelled;
- no longer expected.

Users may paste or summarize WhatsApp/email/Slack messages or attach supporting evidence where the runtime supports it.

Do not require cleanup, complete fields, or extra research. Unknown may remain unknown.

## Write flow

1. Preserve one `Logistics_Intake_Submissions` record for the human submission.
2. Keep `raw_submission` verbatim.
3. Preserve the authenticated human actor separately from the Claude/runtime identity.
4. Use `capture_type = initial_capture` for the starting picture and `cycle_update` for later changes.
5. Extract only separable, evidence-supported facts into `Logistics_Intake_Facts`.
6. Preserve approximate/unknown quantities, timing, identity, destination, and status without inventing precision.
7. Keep organisation/contact mentions as raw operational references unless a separate relationship fact is actually supplied.
8. Do not create canonical Logistics or Relationship Data objects as a side effect of intake.
9. Return a concise summary of what was recorded and any ambiguity that materially affects operational meaning.

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

Use for minimally interpreted operational facts. Relevant fields:

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

## Supported fact types

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

## Relationship boundary

A Logistics message may contain a person or organisation name. That does not automatically make it a relationship-data update.

- Preserve the name in the Logistics intake fact as evidence.
- Do not infer partner status or primary-contact status.
- Do not create/update Contacts or Organizations merely because they are mentioned in a Logistics fact.
- If the human actually supplies a contact correction/addition or asks to maintain relationship data, route that separate consequence through the DCA Relationship Data capability.

## Operational Reality boundary

Do not write the changing goods list into the DCA Operational Reality document.

Live goods state belongs in operational-state records. The maintained Operational Reality describes how the work currently happens, including roles, dependencies, handoffs, variation, exceptions, and visibility gaps.

Captured intake may later become evidence for an Operational Reality update when it reveals a material pattern or change.

## User-facing behaviour

Keep the implementation hidden.

Good completion messages:

- `Recorded: 4 pallets still in the warehouse, 2 expected Friday, and one pickup still unresolved.`
- `Recorded the update. The exact quantity is unknown, so I left it unknown.`
- `Recorded the cancellation and kept the earlier information as history.`

Do not teach the user about staging tables or reconciliation unless they ask.

## Failure behaviour

If the information is incomplete, do not block capture unnecessarily.

Ask a clarification only when the ambiguity would cause a materially different operational meaning or unsafe write. Otherwise preserve the uncertainty and continue.
