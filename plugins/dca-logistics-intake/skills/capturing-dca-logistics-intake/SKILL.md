---
name: capturing-dca-logistics-intake
description: Capture new or changed DCA Logistics-cycle evidence such as goods state, people, organisations, locations, contact routes, pickup/delivery arrangements, carry-over, changes, or cancellations. Use for conversational Logistics intake and updates; do not use for explaining how the Logistics workflow works generally.
metadata:
  version: 0.6.4
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

Do not select a similarly named copy, test, rebuild, staging, snapshot, or historical base merely because search returns it first. Resolve the intended base explicitly before writing, using `context/airtable-workspace-map.md` for the current production vs. non-production (`DCA Dev/Test`) workspace distinction and the recorded base identity — never by fuzzy/substring name match. The same principle applies to Relationship Data lookups: use the current canonical base named by the workflow/source-routing policy, not a similarly named copy.

The attached Airtable identity is restricted at base level, not table level. It can technically write other tables in that base. Therefore the three-table boundary is a runtime rule, not a credential guarantee.

Never create or change records in any other table in that base as a side effect of Logistics intake.

Do not mutate canonical Relationship Data as a side effect of mixed Logistics intake.

## Before writing

Read and apply:

1. `workflows/capture-logistics-intake.md` — provider-independent Logistics intake behaviour;
2. `context/source-routing.md` when routing or mixed-domain facts matter;
3. `context/airtable-workspace-map.md` to confirm the current production workspace/base identity for the destination before writing;
4. `organisation/shared-foundations/shared-object-boundaries.md` from `Dutch-Civilian-Action/dca-architecture` when the submission contains people, organisations, locations, routes, roles/functions, or other mixed object types.

If one of these required current sources is unavailable, preserve the configuration/access gap rather than reconstructing the rule from old implementation material.

Inspect the current Airtable schema before writing. Do not write legacy/deprecated fields and do not invent fields, select options, tables, relationships, or canonical structures to make the submission fit.

Confirm that `Logistics_Intake_Submissions` exposes both `controlled_test` and `synthetic_test_data`. They express different provenance dimensions and must never be collapsed into one inference.

Confirm that `Logistics_Intake_Submissions` also exposes `attachments`, `source_references`, and `attachment_analysis`. `attachments` retains the original filenames the operator supplied; `source_references` records the parent Slack message together with every source file ID; `attachment_analysis` is a separate, bounded, proposed-extraction field gated for manual execution and human review. See "Attachments" below and the "Attachment handling" section of `workflows/capture-logistics-intake.md` for the full rule.

Confirm that `Logistics_Intake_Facts` and `Logistics_Intake_Operational_References` each expose `validation_status`, and that `Logistics_Intake_Operational_References` also exposes `proposed_operational_roles` and `role_validation_status`. See invariant 10 below for the defaults each must carry at creation.

Current legacy fields that must not receive new writes include:

- Submissions: `capture_type`, `source_types`;
- Facts: `fact_type`, legacy `certainty`;
- Operational References: `reference_type`, legacy `certainty`.

When an exact technical omission or correction is already established and can be repaired safely without changing organisational meaning, execute the deterministic repair directly and verify it. Do not turn a safe implementation repair into manual work for the operator. If the repair would choose between plausible meanings, overwrite conflicting evidence, change canonical identity/relationship meaning, or otherwise have a consequential interpretation, require the workflow's normal clarification/approval boundary instead.

## Runtime execution invariants

The live acceptance runs established the following execution requirements. Apply them as a checklist, not as new organisational semantics.

### 0. Separate a controlled processing run from synthetic content

Determine the two markers independently:

- `controlled_test = true` only when the intake capability is deliberately being tested or observed;
- `synthetic_test_data = true` only when the submission content itself is intentionally fictional or simulated.

Genuine operational evidence used during a controlled run has `controlled_test = true` and `synthetic_test_data = false`. A fictional write fixture has both markers set to `true`. Never infer that evidence is fictional merely because `controlled_test` is true.

Before search-before-create, predecessor matching, correction targeting, current-goods reconstruction, warehouse-inventory answers, or promotion, exclude every submission with `synthetic_test_data = true` and every fact/reference supported only by such submissions. Synthetic records can never become a match or predecessor for genuine evidence.

For a synthetic write test, retain the exact created submission/fact/reference IDs and remove the entire linked fixture after inspection. Never clean by a broad `controlled_test = true` filter because genuine evidence may carry that marker.

### 1. Preserve source/destination per separable goods fact

Evaluate direction independently for each extracted goods fact.

When the supporting clause establishes who is giving and who is receiving according to the provider-independent workflow, populate the supported source/destination fields for that fact. Do not let direction captured for one item in a long submission substitute for checking the other items.

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

### 6. Verify supersession consequences on predecessor records

The provider-independent workflow defines the lifecycle transition when a fact is superseded. Claude's responsibility here is to verify that the transition was actually executed.

Whenever a new fact sets `supersedes_fact`, read back the directly superseded predecessor and confirm that its lifecycle state matches the workflow rule. Do not verify only the forward link on the new fact.

If the predecessor state does not match the deterministic workflow consequence and no semantic ambiguity is involved, repair the implementation omission and verify again before reporting success.

### 7. Verify semantic consequences, not only record existence

After a write, read back:

- the new submission;
- every new fact/reference;
- every pre-existing record intentionally changed by the operation, including superseded predecessors or correction flags;
- the relevant source/destination, entity type, location function, quantity, lifecycle, provenance, and correction/supersession links;
- observed write scope, confirming no unintended table or canonical Relationship Data mutation occurred;
- the independently supported values of `controlled_test` and `synthetic_test_data`.

A successful create/link response is not sufficient verification when the operation also changes the semantic status of existing records.

### 8. `operational_process` depends only on concrete goods progression

`workflows/capture-logistics-intake.md` defines `operational_process` (`goods_intake` or `logistics_information_intake`). This section does not redefine that rule; it states the runtime invariant needed to apply it correctly.

Derive `operational_process` only from whether the submission is evidence in a concrete goods progression — from the first concrete notice that goods are coming, through later warehouse entry, handling, and warehouse exit. Use `goods_intake` whenever the submission is such evidence, including hedged or uncertain phrasing (for example "might not happen", "not confirmed yet") describing a concrete goods offer, expectation, pickup/delivery arrangement, or warehouse state. Do not read hedging as a signal to reclassify concrete goods evidence as `logistics_information_intake`.

`baseline_capture`, `controlled_test`, `synthetic_test_data`, and `submission_kind` are independent axes and must never determine `operational_process`:

- a `baseline_capture` reconstruction of a concrete goods state is still `goods_intake`;
- `controlled_test` and `synthetic_test_data` describe processing/content provenance, not the operational meaning of the evidence;
- `submission_kind` (`new_information`, `update`, or `correction`) does not change `operational_process`.

A correction or update to concrete goods evidence remains `goods_intake`. Context-only Logistics information — people, organisations, routes, or other reconstruction context with no concrete goods progression — remains `logistics_information_intake`.

### 9. Route attachments through the configured Submission path, never around it

An operator asking Claude to "process" attachments as part of Logistics intake — including phrasing such as "process them together as one intake" — is asking Claude to run the configured path: create the `Logistics_Intake_Submissions` record with `attachments` populated, read it back, and stop there for manual `attachment_analysis` execution and human review. It is not a request for Claude to read the files directly and produce its own structured report, dry-run summary, or artifact in their place.

Labeling the output a "dry run" does not exempt it from this rule. A standalone Claude-generated artifact that summarizes attachments outside the configured `attachments` → `attachment_analysis` path is not a lighter-weight or safer version of this capability — it bypasses the capability entirely, and it must not happen, controlled test or not.

When multiple related attachments arrive in one ordinary request, create exactly one `Logistics_Intake_Submissions` record for them, per `workflows/capture-logistics-intake.md`. Do not create one envelope per file, and do not split a single multi-file operator request across separate ad hoc handling.

If the configured write path is unavailable in the current context (for example, no Airtable connector is attached), say so and stop. Do not fall back to reading the attachments directly and generating a substitute report, even as a clearly labeled dry run.

### 10. New staged Facts and Operational References begin unreviewed

`workflows/capture-logistics-intake.md` ("Validated operational distinctions") defines the review-default rule; this section states the runtime invariant needed to apply it.

Every new `Logistics_Intake_Facts` record starts with `validation_status = unreviewed`. Every new `Logistics_Intake_Operational_References` record starts with `validation_status = unreviewed`. Whenever a reference's `proposed_operational_roles` is populated, that same reference's `role_validation_status` also starts `unreviewed`.

Do not write any other review-status value at creation time, even when the supporting submission looks well-supported, genuine, or uncontested. Setting a validation/role-validation status to anything other than `unreviewed` is a separate, later human review step; it is never part of capture itself.

### 11. Slack source provenance must resolve to one exact message, not a thread or a day

`workflows/capture-logistics-intake.md` ("Preserve the human submission") defines the provenance-granularity rule; this section states the runtime execution point.

For a Slack-sourced submission, `source_references` must capture the exact channel, the parent thread timestamp, the human source-message timestamp, and the permalink for that specific message — not merely the channel, or a thread/date-level reference that could point to more than one message in the thread. This is in addition to, not instead of, the file-ID provenance already required for attachments under "Attachments" below.

When one of these four elements is not available from the runtime context, preserve the ones that are and leave the rest unresolved rather than substituting a coarser reference.

### 12. Preserve the human's own inventory wording separately from any derived sorting, label, or quantity

`workflows/capture-logistics-intake.md` ("Attachment handling") defines this evidence-separation rule; this section states the runtime execution points and extends the "Attachments" bullets below with the same detail.

When `attachment_analysis` proposes extraction from a submitted transcript or notebook, represent the human's stated inventory as one neutral table with a per-item `sorted-status` value of `sorted`, `unsorted`, or `unstated`. Do not introduce `Sorted items` / `Unsorted items` (or similarly pre-sorted) headings unless the human themselves used that framing; a `sorted-status` value follows only from what the human explicitly stated for that item, never from proximity to another item that was.

Keep every assistant-derived label, unit conversion, category, or total in a column or section separate from the human's exact wording; never merge the two into one field that reads as the human's own statement.

An image attached to the same submission may identify or describe visible goods. It must not be used to derive, adjust, validate, or corroborate a quantity the human already stated in the transcript — for example, a photo showing tents may support "photo shows tents" but never "photo confirms 12 tents" when the transcript states 12.

This extends the evidence-separation requirements already stated under "Attachments" below; `attachment_analysis` remains proposed extraction only and never itself creates or updates Facts, Operational References, or any other canonical record.

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

Preserve every original attachment's filename on the source `Logistics_Intake_Submissions` record's `attachments` field, and record the parent Slack message together with every source file ID in `source_references`. See "Attachment handling" in `workflows/capture-logistics-intake.md` for the full rule; this section states only the Claude-runtime execution points.

Creating the Submission and reading it back is the deliverable of this step. Do not treat generating `attachment_analysis` — or any substitute for it — as part of the same turn unless the operator has separately triggered that manual execution; stop after read-back and tell the operator only that both originals were saved together and are ready for the next review step. Keep the Submission record ID and the fact that `attachment_analysis` is pending manual execution and human review out of that reply — record them in maintainer/test-report notes instead.

When `attachment_analysis` does run, it is proposed extraction only, sourced only from `attachments`:

- preserve exact supporting wording, visible evidence, and filename;
- preserve speaker attribution when the attachment is a transcript or exported AI-assisted chat — do not merge a human's and an assistant's statements into one attributed voice;
- preserve stated uncertainty and contradictions rather than resolving them;
- record unreadable or illegible content as such;
- preserve per-item sorted/unsorted/unstated status, keep assistant-derived labels/conversions/totals separate from the human's own wording, and never let an image adjust or corroborate a transcript-stated quantity, per invariant 12 above;
- do not treat generated analysis as validated operational fact;
- do not let it create canonical objects or broaden the write scope;
- connect extracted proposals back to the attachment/submission.

Only after a human reviews `attachment_analysis` may Claude propose a search-before-create create/update/conflict set against existing non-synthetic staging evidence; writing that proposal into Facts or Operational References needs separate explicit human approval, and promotion into DCA Logistics is a further, separately gated step.

When the source is an exported AI-assisted chat or notebook:

- treat the human's own messages as source evidence;
- treat assistant replies, cleaned tables, totals, inferred locations, category suggestions, and unit conversions as derived interpretation;
- preserve the full transcript as provenance, but construct `raw_submission` from the human messages rather than substituting the assistant's cleaned version;
- an assistant-suggested label becomes supported only when the human explicitly confirms it, and the confirmation must remain traceable;
- a local image path in the transcript is not an attachment. Preserve the actual image separately when supplied.

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
