---
document_type: dca_ai_workflow
status: current
scope: organisation-wide
workflow: reconcile-established-findings-into-maintained-reality
provider_independent: true
---

# Reconcile Established Findings into Maintained DCA Reality

## Purpose

Define the shared provider-independent handoff between an established finding and DCA's maintained organisational reality.

Both of these callers must use this workflow:

- **Full Historical Domain Reconstruction** — after source-first reconstruction, self-evaluation, and required human validation, for each current candidate that is ready for target assessment;
- **Maintain DCA Reality / Reality Watch** — after materially changed evidence has been reconstructed and any required bounded validation is complete.

Validation and reconciliation answer different questions:

- **validation:** what does the evidence support, and at what boundary?
- **maintained-reality reconciliation:** is that supported meaning already represented, does it change maintained reality, where does it belong, was the result persisted, and was persistence verified?

A finding is not maintained merely because it was reconstructed, validated, written in a handoff, added to Airtable, converted into an Asana task, or reported in Slack.

## Governing sources

Apply the current:

- DCA Authority Map;
- DCA Reconstruction & Reconciliation Method;
- DCA Evidence → Validation → Live Use Loop;
- DCA Structure Method — Reality to Requirements;
- DCA Capability Reality foundation;
- AI current-authority and source-routing context;
- target-specific authority, identity, naming, validation, and write rules.

This workflow implements the shared method. It does not outrank a maintained target or create write authority by itself.

## Entry gate

A candidate may enter only when:

- its original evidence and provenance are preserved;
- reconstruction is sufficiently complete for this candidate;
- conflicts, corrections, and supersession lineage are visible;
- self-evaluation has passed where the caller is a historical reconstruction;
- human validation has been completed where the consequence or authority boundary requires it;
- the candidate is atomic enough to compare and route without hiding mixed meanings.

Do not enter a candidate merely because it is plausible, repeated by one source, detailed, recent, technically implemented, marked complete in a task, or included in a polished synthesis.

A candidate that fails the gate receives `not_ready` and remains in reconstruction, evidence, or bounded validation work.

When a validator has corrected or qualified wording, the revised operational wording must be shown back to that validator for bounded confirmation before the candidate passes this gate. An unconfirmed System & Structure paraphrase remains `not_ready`.

## Historical-reconstruction anti-bias boundary

Full Historical Reconstruction must remain source-first.

Do not read the current Operational Reality, Derived Organisational Reality, Capability Reality, or another candidate target early merely to make the reconstruction agree with it.

The maintained target is loaded only after the reconstruction object has passed self-evaluation and required validation and is ready for target assessment. The target is then used for comparison and routing, not as retroactive evidence for the historical reconstruction.

## Required sequence

For each candidate:

1. **Resolve the candidate and establishment state**
   - identify the atomic claim/object and source/run references;
   - record whether it is `established`, `established_with_qualification`, `unresolved`, or `not_ready`;
   - preserve remaining uncertainty and the validation basis.

2. **Resolve the authoritative destination**
   - apply current authority and source routing;
   - identify the exact maintained target, operational system, architecture source, work tracker, calendar, archive, or validation path;
   - do not infer a destination from the source channel or reconstruction table.

3. **Read the current target**
   - retrieve the current authoritative target and revision/version before comparing;
   - if the target cannot be resolved or read, record `not_ready` or blocked as appropriate and stop before any claimed write; use `alternate_destination` only when evidence establishes that the finding actually belongs elsewhere.

4. **Compare atomically**
   - compare material meaning, scope, time, attribution, status, variation, uncertainty, and provenance;
   - do not treat different wording as a change when the maintained meaning is equivalent;
   - do not hide a real correction merely because part of the old statement remains true.

5. **Classify the maintained-reality outcome**
   - use exactly one primary outcome from the controlled vocabulary below;
   - use reconciliation notes for connected or secondary effects.
   - when a reviewer said “correct” or the equivalent, preserve that response as validation provenance; then classify independently from the target comparison. The result may be `already_represented`, `confirmation_only`, `addition`, `correction`, `qualification`, or another supported outcome. Do not manufacture a change, and do not suppress a real one.

6. **Prepare the smallest supported action**
   - no-change outcomes do not generate cosmetic edits;
   - change outcomes update only the affected maintained meaning;
   - unresolved, historical, proposed, and alternate-destination outcomes remain visibly bounded.

7. **Persist**
   - apply the target's write rules;
   - preserve provenance and status;
   - never delete or rewrite source history to make the maintained target look cleaner.

8. **Verify**
   - re-read or otherwise verify the exact persisted target, changed meaning, and revision;
   - a successful API response alone is not sufficient when the written result can be read back;
   - record failed or blocked persistence without claiming completion.

9. **Record the downstream outcome**
   - write the comparison outcome, destination, target reference, target revision, actor, time, persistence status, and remaining uncertainty back to the originating lineage;
   - for Historical Reconstruction, use the Reconstruction Object record or an equivalent linked outcome record;
   - for Reality Watch evidence not represented by a Reconstruction Object, preserve an equivalent auditable run/result record.

10. **Propagate only supported consequences**
    - assess connected Operational Reality, Derived Organisational Reality, Capability Reality, relationship, requirement, architecture, implementation, documentation, work, and publication effects separately;
    - do not invent downstream consequences merely because the candidate changed one target.

11. **Close or continue the source review**
    - close a confirmation/no-change thread after the outcome and validation provenance are recorded and any target-required evidence/status write is persisted and verified;
    - do not create a cosmetic edit, correction task, or extra validator action merely because the recorded response was “correct”;
    - close a change-bearing thread only after persistence is verified;
    - leave `conflict_unresolved`, `not_ready`, failed, or blocked cases open or transfer them to an explicit validation/reconciliation item with a traceable link.

12. **Publish only after maintenance**
    - a Reality Watch publication may describe a material maintained change only after required persistence is verified;
    - no material maintained change means no organisational publication merely to report processing activity.

## Controlled maintained-reality outcome

Use one primary value:

| Outcome | Meaning | Target action |
|---|---|---|
| `already_represented` | The authoritative target already contains materially equivalent meaning. | No text/data change; record comparison. |
| `confirmation_only` | New evidence strengthens an existing maintained claim without changing its meaning. | Preserve confirmation/provenance; change target only if its evidence/status field requires it. |
| `addition` | Established current meaning is absent from the correct target. | Add the smallest supported current statement/record. |
| `correction` | Established evidence changes maintained meaning. | Correct the affected meaning while preserving history and provenance. |
| `qualification` | Maintained meaning remains valid only with a boundary, variation, exception, attribution, time, or uncertainty qualifier. | Add or adjust the required qualification. |
| `conflict_unresolved` | Material evidence conflicts and cannot yet be responsibly resolved. | Preserve the conflict; do not write a falsely settled current claim. |
| `historical_only` | The finding is established history but not current maintained reality. | Keep it in historical lineage/archive; do not promote it as current. |
| `proposed_future` | The finding is intended, proposed, expected, or planned future state. | Route to the appropriate decision/design/work area; do not present it as current reality. |
| `alternate_destination` | The finding is established but belongs somewhere other than the candidate target. | Route it and record the actual destination; do not force it into maintained reality. |
| `not_ready` | Evidence, validation, authority, atomicity, or target rules are insufficient. | Continue evidence/validation/reconciliation work. |

## Destination routing

Route by organisational object:

| Established result | Primary destination |
|---|---|
| Current recurring operational practice, dependency, responsibility, variation, exception, handoff, or visibility gap | DCA Operational Reality |
| Evidence-backed organisational pattern or implication | DCA Derived Organisational Reality |
| Actual System & Structure capability, dependency, health, adoption, continuity, or downstream use | System & Structure Capability Reality |
| Live item/cycle operational state | Relevant operational system or staging source |
| Canonical person, organisation, relationship, or reusable contact context | Relationship Data reconciliation workflow |
| Stable cross-organisational method, boundary, or architecture | `dca-architecture` |
| Provider-independent AI behaviour or AI implementation | `dca-ai` |
| Validated operator-facing standard or procedure | Current Shared Drive standards/procedures location |
| Required operational or implementation work | Relevant Asana project/task |
| Shared future occurrence or agreed time commitment | DCA Shared Calendar |
| Historical-only result | Reconstruction lineage / historical archive |
| Proposed future state | Relevant decision, design, pilot, or work route |
| Unresolved result | Explicit validation/reconciliation item plus preserved evidence |

One candidate may have connected consequences in several destinations, but each destination is assessed and recorded separately. Do not use a multi-destination finding to bypass the target-specific write boundary.

## Required outcome record

Every processed candidate must preserve an equivalent of:

- `finding_ref`;
- `source_or_run_refs`;
- `validation_refs`;
- `establishment_status`;
- `routing_destination`;
- `comparison_target`;
- `comparison_target_revision`;
- `maintained_reality_outcome`;
- `promotion_status`;
- `target_reference`;
- `target_revision`;
- `reconciled_at`;
- `reconciled_by`;
- `persistence_verification`;
- `reconciliation_notes`;
- remaining uncertainty / next action.

When the originating lineage is `DCA Evidence & Reconciliation.Reconstruction_Objects`, use the corresponding fields on that object. This records downstream state without turning the reconstruction base into a second canonical truth source.

### Establishment status

Use:

- `not_assessed`;
- `not_ready`;
- `established`;
- `established_with_qualification`;
- `unresolved`.

### Promotion status

Use:

- `not_assessed`;
- `not_applicable`;
- `ready_for_target_assessment`;
- `pending_target_write`;
- `persisted_unverified`;
- `persisted_verified`;
- `blocked`.

### Persistence verification

Use:

- `not_required`;
- `pending`;
- `verified`;
- `failed`;
- `blocked`.

## Caller contract — Full Historical Reconstruction

After `workflows/reconstruction-self-evaluation-and-routing.md`:

- select only objects ready for target assessment;
- run this workflow object by object;
- record every comparison, including no-change and alternate-destination outcomes;
- update the formal handoff with the actual downstream result;
- keep not-ready objects and coverage gaps in staging;
- do not call the reconstruction complete merely because the handoff document exists.

A historical reconstruction run may be complete as an investigation while individual objects remain unresolved or unpromoted. State both conditions separately.

## Caller contract — Maintain DCA Reality / Reality Watch

For each materially changed candidate:

- begin from the current maintained target, not the previous Watch post;
- process pending corrections from earlier review threads first;
- use this workflow for the comparison, action, persistence, verification, and closure decision;
- record “correct” as validation provenance, then classify the maintained-target outcome independently; do not create cosmetic rewrites or manufactured tasks for a genuine no-change result, and do not suppress a supported target change;
- always return materially changed wording to the reviewer for bounded confirmation before persistence;
- do not publish a claimed maintained change before verification;
- do not advance evidence coverage past a failed material write.

## Failure behaviour

Stop the affected candidate when:

- current authority or target cannot be resolved;
- required evidence or validation is missing;
- target rules are incompatible or unknown;
- write access is missing;
- persistence cannot be verified;
- the result would require silently resolving a conflict.

Preserve the previous maintained target. Record the candidate as `not_ready`, `conflict_unresolved`, or blocked as appropriate. Create or update a bounded validation/reconciliation task when human action is genuinely required.

When the purpose of that work is to establish shared operational reality, place it under the existing or newly created **Establish** parent defined in `workflows/reconstruction-self-evaluation-and-routing.md`. Keep technical reconciliation work with System & Structure and give an operational person only the bounded operational review or confirmation action.

Do not conceal failure as `already_represented`, no material change, or successful completion.

## Completion criteria

A candidate is complete only when:

- the establishment and routing decision are recorded;
- the current target and comparison revision are recorded;
- one controlled outcome is recorded;
- every required write is persisted;
- persistence is verified or explicitly `not_required`;
- the originating lineage contains the target/result record;
- connected consequences have been assessed separately;
- source review closure matches the verified state.

## Short rule

**Reconstruct without bias. Validate what the evidence supports. Then compare with current authority, classify the outcome, route it, persist only the justified change, verify it, and record what happened.**
