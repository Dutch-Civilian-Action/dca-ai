---
name: capturing-dca-logistics-intake
description: Capture new or changed DCA Logistics-cycle evidence such as goods state, people, organisations, locations, contact routes, pickup/delivery arrangements, carry-over, changes, or cancellations. Use for conversational Logistics intake and updates; do not use for explaining how the Logistics workflow works generally.
metadata:
  version: 0.4.0
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

## Schema-bound execution rule

The current Airtable staging schema is an implementation surface for this pilot; it is not permission for Claude to redesign the model.

When executing intake:

- inspect/use the current configured pilot tables and current field names;
- do not write to fields marked legacy or deprecated;
- do not invent a replacement field, option, table, or relationship when the current schema does not support a value cleanly;
- preserve the evidence in the nearest valid raw/qualified field and leave unsupported structure unresolved;
- if the current Airtable schema conflicts with this skill or blocks an otherwise valid intake, report the mismatch as a System & Structure issue rather than silently working around it;
- do not ask the Logistics operator to manually repair Airtable schema during normal intake;
- schema repair belongs to the DCA Airtable implementation/Schema Guard path, while the Logistics conversation should remain focused on the operational information being captured;
- after any write, verify that the intended records/fields were written and report only the operational result unless implementation detail is explicitly requested.

When an exact technical correction is already established and the available system can execute it safely, do not turn it into manual work for the user. Safe deterministic corrections may execute directly. Consequential corrections require explicit approval, then execution and verification where supported.

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

## Operational interpretation rules

Infer the following from ordinary language. Do not ask the operator to classify the submission.

### Submission kind

- `new_information` — introduces evidence not already being updated or corrected;
- `update` — reports a later operational state or development without saying the earlier report was wrong;
- `correction` — says an earlier submission, extraction, identity, quantity, state, or interpretation was wrong.

A correction links to `corrects_submission` only when exactly one prior submission is sufficiently identified as the target. Never use "most recent matching submission" (or any other recency heuristic) to pick a target. When more than one prior submission is a plausible target, still preserve the correction submission and its content, leave `corrects_submission` unresolved, and flag the ambiguity for human clarification instead of guessing. Preserve the original submission and any earlier fact; never overwrite source history.

When a submission — a correction or otherwise — explicitly states which party is giving and which is receiving goods, including when DCA itself is the receiving/destination party, preserve that direction using `source_organisation_text` / `destination_organisation_text` (or the equivalent contact fields). Do not omit DCA from `destination_organisation_text` merely because DCA is the operator of this system; a stated direction such as "H4U → DCA" must remain recoverable, not implicit.

### Operational process

- `goods_intake` — the submission is evidence in a concrete goods-intake progression, beginning with the first concrete partner/source message that goods are coming and continuing through warehouse entry and warehouse exit;
- `logistics_information_intake` — the submission reconstructs, reviews, or maintains Logistics information but is not itself evidence of a concrete goods-intake progression.

Do not label an ordinary message about concrete goods as `logistics_information_intake` merely because Claude is recording it.

### Cycle and state boundaries

Treat the cycle as:

`previous Ukraine transport → ongoing Logistics work → next Ukraine transport`

Carry-over may remain unresolved or current across transports. Do not assign goods to the next transport without evidence.

The **current goods picture** may include offered, expected, incoming, arranged, carried-over, and in-warehouse goods. **Warehouse inventory** means only goods physically present in the warehouse at the relevant time.

The distinction between `offered` and `expected` as `goods_state` values is currently unresolved: the schema does not define which applies when a source reports goods as available but with an unconfirmed pickup/delivery. Do not resolve this arbitrarily and do not invent a new definition to close the gap. Preserve the supported evidence (quantity/timing text, notes) and flag the case as requiring organisational/operational validation before a consistent rule can be relied on.

Preserve three distinct capture moments when supported:

1. first concrete partner/source message;
2. warehouse entry;
3. warehouse exit.

A later state may supersede an earlier fact only when the same goods are sufficiently identified. Warehouse exit is preserved through the submission, lifecycle/provenance, notes, and supersession/resolution handling; do not invent a non-existent `goods_state`.

### Flow, roles, and locations

Direct Transit is a flow distinction. It may include sorting or bypass it; preserve what the evidence says and do not infer either. Do not add a new schema field for Direct Transit until a structured flow representation has been validated; until then, preserve it descriptively in the Fact's free-text context/notes only. Never translate Direct Transit into `goods_state`, into storage behaviour (e.g. assuming or denying temporary warehouse storage), or into sorting behaviour — sorting stays unresolved unless the evidence states it.

Use only the currently configured provisional operational-role vocabulary. Store the evidence-grounded function in `function_or_step_text` / `operational_context`; a provisional role does not create a canonical Relationship Data role.

Use descriptive `temporary holding location` and `handover point` vocabulary in location/function context where supported. Do not create a canonical location or new select option as a side effect.

### Attachments

Preserve attachments on the source submission. Attachment analysis is bounded, proposed extraction only:

- do not treat generated analysis as validated operational fact;
- do not let it create canonical objects or broaden the write scope;
- connect extracted proposals back to the attachment/submission;
- leave materially uncertain extraction for human review.

## Write flow

1. Preserve one `Logistics_Intake_Submissions` record for the human submission.
2. Keep `raw_submission` verbatim.
3. Preserve the authenticated human actor separately from the Claude/runtime identity.
4. Infer `submission_kind` as `new_information`, `update`, or `correction`.
5. Infer `operational_process` as `goods_intake` or `logistics_information_intake`.
6. Use `baseline_capture` only when the submission is part of initial reconstruction of the current goods picture.
7. Use `controlled_test` when the submission is also a controlled pilot/test; this marker must not change operator-facing language.
8. Preserve evidence form and evidence channel separately in `evidence_forms` and `evidence_channels`.
9. Extract only separable, evidence-supported goods/state facts into `Logistics_Intake_Facts`.
10. Extract only separable, evidence-supported people/organisation/location/route references into `Logistics_Intake_Operational_References`.
11. Preserve approximate or unknown quantities, timing, identity, destination, route, function, location, and status without inventing precision.
12. Keep mixed new Logistics-cycle evidence in the Integrations staging base during this reconstruction pilot.
13. Relationship Data may be queried to check whether a person or organisation already exists, but do not mutate canonical Relationship Data as a side effect of mixed Logistics intake.
14. Do not create canonical Logistics, contact-route, workflow-role, location, or Relationship Data objects as a side effect of intake.
15. Return a concise summary of what was recorded and any ambiguity that materially affects operational meaning.

## Table map

### Logistics_Intake_Submissions

Use for the preserved source/provenance envelope. Current relevant fields include:

- `submission_id`
- `submission_display_name`
- `submitted_at`
- `submitted_by`
- `submission_interface`
- `submission_kind`
- `evidence_forms`
- `evidence_channels`
- `raw_submission`
- `source_references`
- `cycle_reference`
- `processing_status`
- `notes`
- `baseline_capture`
- `controlled_test`
- `operational_process`
- `corrects_submission`
- `attachments`
- `attachment_analysis`

Do not write new values to legacy `capture_type` or `source_types`. Treat `attachment_analysis` as proposed extraction rather than validated source evidence.

### Logistics_Intake_Facts

Use for minimally interpreted goods/state facts. Current relevant fields include:

- `fact_id`
- `submission`
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
- `reconciliation_status`
- `canonical_references`
- `notes`
- `goods_state`
- `operational_certainty`
- `quantity_precision`
- `supersedes_fact`
- `validation_status`
- `validation_notes`
- `validated_by`
- `validated_at`

Do not write new values to legacy `fact_type` or legacy `certainty`.

Use `goods_state` only when the current evidence supports the operational state. Change, correction, cancellation, warehouse exit, and carry-over context are represented through submission/lifecycle/provenance fields rather than by forcing those concepts into `goods_state`.

For a supported state transition, preserve the later fact and link `supersedes_fact` only when the same goods are sufficiently identified. Keep the earlier assertion and source evidence visible. A correction uses `corrects_submission`; it is not automatically a new goods state.

Use `quantity_text` as the preserved quantity wording. Populate `quantity_value` and `quantity_unit` only when the supported structured value does not erase ambiguity. Use `quantity_precision` to preserve whether the stated quantity is exact, approximate, vague, or unknown according to the current configured option set.

### Logistics_Intake_Operational_References

Use for people, organisations, locations, routes, and other references whose operational meaning must stay connected to the context in which they are used. Current relevant fields include:

- `reference_id`
- `submission`
- `related_fact`
- `reference_text`
- `related_party_text`
- `function_or_step_text`
- `operational_context`
- `route_type`
- `route_value`
- `direction_or_action_text`
- `reconciliation_status`
- `canonical_reference`
- `notes`
- `proposed_operational_roles`
- `role_validation_status`
- `reference_certainty`
- `entity_type`
- `validation_status`
- `validation_notes`
- `validated_by`
- `validated_at`

Do not write new values to legacy `reference_type` or legacy `certainty`.

Use `entity_type` only as the current minimal staging class for the underlying entity/reference according to the configured options. A contact route remains in `route_type` / `route_value`; it is not itself treated as an entity type.

`proposed_operational_roles` is provisional terminology only. Use only the configured vocabulary: `source_partner`, `goods_source`, `offering_party`, `potential_goods_source`, `coordinating_partner`, `coordinator`, `source_contact`, `intermediary`, `associated_organisation`, `pickup_location`, `dropoff_location`, and `partner_organisation`. Do not treat an extracted role label as canonical merely because the field exists. Role validation and identity reconciliation remain separate.

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

Keep the implementation hidden during normal intake.

Good completion messages:

- `Recorded: 4 pallets still in the warehouse, 2 expected Friday, and one pickup still unresolved.`
- `Recorded the goods and the contact/address context. I kept the unloading address separate from the general organisation context.`
- `Recorded the update. The exact quantity is unknown, so I left it unknown.`
- `Recorded the route and when it is used. I left the person's broader role unresolved.`

Do not teach the user about staging tables, reconciliation, Schema Guard, or field repairs unless they ask.

## Failure behaviour

If the information is incomplete, do not block capture unnecessarily.

Ask a clarification only when the ambiguity would cause a materially different operational meaning or unsafe write. Otherwise preserve the uncertainty and continue.

If a schema mismatch prevents a safe write:

- preserve what can be preserved without changing meaning;
- do not manufacture structure;
- do not ask the operator to redesign Airtable;
- identify the mismatch for System & Structure follow-up;
- keep the operator-facing response focused on what was captured and what remains operationally unresolved.
