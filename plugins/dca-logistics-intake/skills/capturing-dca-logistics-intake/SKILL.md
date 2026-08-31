---
name: capturing-dca-logistics-intake
description: Capture new or changed DCA Logistics-cycle evidence such as goods state, people, organisations, locations, contact routes, pickup/delivery arrangements, carry-over, changes, or cancellations. Use for conversational Logistics intake and updates; do not use for explaining how the Logistics workflow works generally.
metadata:
  version: 0.6.0
  dca-workflow: capture-logistics-intake
  mcp-server: airtable
---

# Capturing DCA Logistics Intake

## Purpose

Provide the Claude runtime adapter for the provider-independent `capture-logistics-intake` workflow.

The workflow defines Logistics intake meaning. This skill defines how Claude executes it safely against the current Airtable pilot surface. Do not duplicate or redefine the full Logistics workflow here.

## Runtime path and write boundary

```text
DCA user in Slack / Claude
→ this skill
→ Airtable connector
→ DCA Integrations & Reconciliation
→ Logistics_Intake_Submissions
→ Logistics_Intake_Facts
→ Logistics_Intake_Operational_References
```

Use only `DCA Integrations & Reconciliation` for new mixed Logistics-cycle intake during the current pilot.

The attached Airtable identity is restricted at base level, not table level. It can technically write other tables in that base. Therefore the three-table boundary is a runtime rule, not a credential guarantee.

Never create or change records in any other table in that base as a side effect of Logistics intake.

Do not mutate canonical Relationship Data as a side effect of mixed Logistics intake.

## Before writing

Read and apply:

1. `workflows/capture-logistics-intake.md` — provider-independent Logistics intake behaviour;
2. `context/source-routing.md` when routing or mixed-domain facts matter;
3. `organisation/shared-foundations/shared-object-boundaries.md` from `Dutch-Civilian-Action/dca-architecture` when the submission contains people, organisations, locations, routes, roles/functions, or other mixed object types.

If one of these required current sources is unavailable, preserve the configuration/access gap rather than reconstructing the rule from old implementation material.

Inspect the current Airtable schema before writing. Do not write legacy/deprecated fields and do not invent fields, select options, tables, relationships, or canonical structures to make the submission fit.

Current legacy fields that must not receive new writes include:

- Submissions: `capture_type`, `source_types`;
- Facts: `fact_type`, legacy `certainty`;
- Operational References: `reference_type`, legacy `certainty`.

## Runtime execution invariants

The live 0.5.0 acceptance run established the following execution requirements. Apply them as a checklist, not as new organisational semantics.

### 1. Preserve source/destination per separable goods fact

Evaluate direction independently for each extracted goods fact.

When the supporting clause explicitly identifies or clearly establishes who is giving and who is receiving, populate the supported source/destination fields for that fact. Do not let direction captured for one item in a long submission substitute for checking the other items.

In a DCA Logistics conversation, wording such as `for DCA` is explicit. Wording such as `for us` may support DCA as destination only when the immediate authenticated DCA context makes that referent unambiguous.

Do not invent direction when it is merely implied by warehouse context or by DCA operating the system.

### 2. Preserve object type before operational role

A single operational-reference record must represent one underlying entity/reference only.

Do not collapse distinct people, organisations, or locations into one reference merely because they occur in the same sentence or share one operational context.

- person → `entity_type = person`;
- organisation → `entity_type = organisation`;
- location → `entity_type = location`.

Operational roles/functions qualify the entity; they do not change its type.

A location role such as `pickup_location` or `dropoff_location` must never be applied to a person or organisation record.

When a person and organisation are both supplied, preserve separate references and connect them through shared submission/fact context or supported association fields rather than one combined `reference_text`.

### 3. Do not substitute location functions

Preserve the function actually stated by the evidence.

A handover point is not automatically a pickup location. A temporary holding place is not automatically a warehouse or general address. An unloading location is not automatically the organisation's canonical address.

If the configured provisional role vocabulary has no exact supported location role, leave the controlled role unresolved and preserve the function in `function_or_step_text`, `operational_context`, `direction_or_action_text`, or other valid descriptive fields.

Create a separate staging location reference when the place materially affects where goods are, where a handoff occurs, or what an operator must do. Do not create location references for incidental place mentions that have no operational function.

### 4. Never normalize an unsupported quantity unit to the nearest available unit

Preserve the source wording in `quantity_text`.

Populate `quantity_value` / `quantity_unit` only when the structured representation preserves the same meaning. If the source says `12 pairs` and `pairs` is not a configured unit, do not write `items` merely because it is the closest available option.

When an unsupported unit makes the normalized value ambiguous, leave the unsupported structured value/unit blank and preserve the exact source wording. `quantity_precision` describes the wording actually supplied; it must not be used to make an invented normalization appear exact.

### 5. `submitted_at` is required provenance when the source timestamp is available

For Slack intake, use the human source-message timestamp, not the later Airtable creation time or Claude reply time.

Before confirming success, read the submission back and verify that `submitted_at` is populated and matches the source message time. If the source timestamp is available and the field was omitted, repair this deterministic omission before reporting completion.

### 6. Supersession is a two-sided lifecycle transition

When a new fact validly sets `supersedes_fact` to an earlier current fact:

- preserve the earlier fact and its evidence;
- set the earlier fact's `lifecycle_status` to `superseded`;
- keep the new fact's own lifecycle status according to the supported new state (`current`, `resolved`, etc.).

Do not leave a directly superseded predecessor marked `current`.

Do not alter an already resolved/cancelled/superseded predecessor merely to force this rule; preserve the existing non-current state unless the evidence itself requires a correction.

### 7. Verify semantic consequences, not only record existence

After a write, read back:

- the new submission;
- every new fact/reference;
- every pre-existing record intentionally changed by the operation, including superseded predecessors or correction flags;
- the relevant source/destination, entity type, location function, quantity, lifecycle, provenance, and correction/supersession links;
- observed write scope, confirming no unintended table or canonical Relationship Data mutation occurred.

A successful create/link response is not sufficient verification when the operation also changes the semantic status of existing records.

## Correction handling

Apply the correction rules from `workflows/capture-logistics-intake.md` exactly.

In particular:

- preserve every correction as a new submission;
- link `corrects_submission` only when exactly one prior submission is sufficiently identified;
- thread/context can be valid identifying evidence when it unambiguously points to one parent submission;
- never choose a target by recency;
- when multiple plausible targets remain, leave `corrects_submission` empty, preserve the ambiguity, change no candidate fact merely to resolve it, and ask the smallest clarification needed;
- preserve originals rather than overwriting source history.

## Mixed Logistics and Relationship Data boundary

Relationship Data may be read for established identity/reconciliation context when the capability and access are available.

That does not transfer canonical ownership to Logistics and does not authorize canonical mutation.

Keep canonical person identity, organisation identity, their relationship, domain-specific operational context, and location/route references separate according to DCA shared object boundaries.

If a canonical match is sufficiently supported, preserve the stable canonical reference as reconciliation context where the current schema supports it. If the staging reference itself wrongly combines multiple underlying entities, fix the staging separation first rather than forcing one canonical reference onto a combined record.

## Attachments

Preserve attachments on the source submission where supported.

Attachment analysis is proposed extraction only:

- do not treat generated analysis as validated operational fact;
- do not let it create canonical objects or broaden the write scope;
- connect extracted proposals back to the attachment/submission;
- leave materially uncertain extraction for human review.

## User-facing behaviour

Accept ordinary, messy operational language. Do not require the Logistics user to classify fields, clean input, or understand staging/reconciliation mechanics.

Unknown may remain unknown.

After successful capture, respond in simple operational language with what was recorded and any ambiguity that materially affects the work.

Do not narrate Airtable tables, field names, schema repair, reconciliation internals, or verification mechanics unless the user explicitly asks.

## Failure behaviour

If the information is incomplete, preserve it rather than blocking unnecessarily.

Ask only when ambiguity would cause a materially different operational meaning or unsafe write.

If the schema cannot represent supported meaning cleanly:

- preserve the evidence in valid raw/descriptive fields;
- leave unsupported structure unresolved;
- do not manufacture the nearest field/option/role/entity type;
- identify the mismatch for System & Structure follow-up;
- keep the operator-facing reply focused on the operational result.
