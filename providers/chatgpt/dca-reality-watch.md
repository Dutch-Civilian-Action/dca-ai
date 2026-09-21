---
document_type: dca_ai_provider_implementation
status: current-testing
provider: chatgpt
workflow: maintain-dca-reality
---

# ChatGPT Implementation — DCA Reality Watch

## Canonical workflow

`../../workflows/maintain-dca-reality.md`

Shared maintained-reality handoff:

`../../workflows/reconcile-established-findings-into-maintained-reality.md`

Validation-state monitoring caller:

`../../workflows/monitor-validation-queue.md`

Current ChatGPT monitor implementation:

`dca-validation-queue-monitor.md`

This file records the current ChatGPT implementation of the provider-independent DCA workflow. It is not the workflow authority itself.

The ChatGPT runtime must execute the current canonical workflows, including the Reality Watch Output contract. Provider-specific instructions may define runtime access, trigger mechanics, persistence mechanics, authoritative file resolution, and publication routing, but must not redefine Operational Reality, Derived Organisational Reality, Capability Reality, validation sufficiency, or output eligibility.

## Current runtime topology

The ChatGPT implementation has two entry paths into maintained-reality processing:

```text
DCA Reality Watch — scheduled condition watch
        ↓
broad evidence coverage, backlog recovery, correction recovery,
capability health, and cross-view maintenance

Monitor validation queue — hourly condition watch
        ↓
newly detected sufficiently established candidate
        ↓
bounded Maintain DCA Reality execution
        ↓
shared maintained-reality reconciliation
        ↓
persist → read back → record lineage → close or continue
```

### Scheduled evidence sweep

Task name: **DCA Reality Watch**

Runtime: **ChatGPT scheduled condition watch**

Cadence: **daily morning sweep in Europe/Amsterdam, according to the active ChatGPT task configuration**

Purpose: **broad evidence coverage, backlog recovery, unresolved-correction recovery, capability-health inspection, and protection against missed or failed event handoffs**

The scheduled sweep is not the only reconciliation clock.

### Validation-triggered handoff

Task name: **Monitor validation queue**

Runtime: **ChatGPT scheduled condition watch**

Cadence: **hourly, every day, Europe/Amsterdam**

Purpose: **act on every newly detected material validation-state transition and execute the canonical maintained-reality handoff without waiting for the daily sweep**

This is near-event-driven polling rather than a true webhook. Processing latency may therefore extend to the next hourly check.

### Notification rule

Notify or publish only when the applicable canonical workflow supports it:

- no material maintained change → no organisational Reality Watch publication;
- no material validation-state transition or blocker → no validation-monitor notification;
- validation completion or processing activity alone is not a material maintained change.

## Current maintained reality views

Current maintained reality views include:

- DCA Operational Reality;
- DCA Derived Organisational Reality;
- DCA System & Structure — Capability Reality.

### Authoritative Capability Reality target

The authoritative maintained **DCA System & Structure — Capability Reality** Google Doc is:

- file ID: `1F9STwBk0S0nibS8AtFTSFgRxcXLAnL5eWEnjCieLkzw`;
- title: **DCA System & Structure — Capability Reality**.

Resolve Capability Reality maintenance to that stable file ID. Do not select a target merely because another Drive document has a similar title, contains Capability Reality reconstruction material, or was updated by a previous run.

Google Doc `1LRgdRrxA1nQGyTGh6hKxq_7nvEVtfs8VDIGCemQ5xic` is **working reconstruction evidence / dossier material, not the maintained Capability Reality authority**. Reality Watch must not write Capability Reality maintenance updates into it. Its prompts, chat/session material, reconstruction analysis, evidence notes, and unrelated tabs may be useful evidence but do not become maintained reality by being present there.

If authoritative-target identity and document content disagree, stop the affected write, preserve the mismatch as capability/runtime evidence, and resolve the authority boundary before maintenance continues.

Current source classes include, where available:

- current maintained reality documents;
- current DCA methods and authority map;
- Google Drive;
- GitHub;
- public DCA Slack;
- Airtable/system state;
- Asana validation and Establish lineage;
- integrations, automations, and runtime evidence;
- downstream use.

## Maintained-reality persistence

Maintaining reality means **persisting supported changes into the current authoritative maintained reality documents**, not merely detecting, validating, summarising, or reporting them.

For every scheduled or validation-triggered execution:

1. resolve and read the relevant current maintained target before evaluating change;
2. determine represented state from maintained meaning and provenance, not only from task `last_run_time`, source modification time, or validation status;
3. inspect materially relevant unrepresented backlog or unresolved same-target lineage before assuming the candidate is new or complete;
4. invoke the shared maintained-reality reconciliation workflow for each established candidate;
5. record its controlled outcome, destination, comparison target/revision, and required action;
6. when the canonical Output contract supports an update, write the smallest supported change into the relevant maintained document;
7. re-read or otherwise verify the persisted document after the write before treating that output as completed;
8. record the persisted target/revision, actor/time, and verification state in the originating lineage or equivalent run-result record;
9. only after persistence has succeeded may the runtime close a change-bearing source review, treat the maintained-reality output as complete, or publish a Slack summary of that maintained change.

A task execution, reviewer reply, generated finding, Airtable status change, Slack message, or successful source read is **not** evidence that maintained reality was updated.

If a required maintained-document write cannot be completed or verified:

- preserve the finding as unpersisted work rather than silently treating it as maintained;
- do not advance evidence coverage or validation closure past the failed material;
- do not claim that Operational Reality, Derived Organisational Reality, or Capability Reality was updated;
- preserve enough lineage for the next monitor or scheduled sweep to recover the item;
- surface the persistence failure as System & Structure capability/runtime evidence rather than masking it as a no-change run.

Recovery rule: after any maintenance gap, process the unrepresented evidence backlog before limiting attention to the newest evidence. A later successful scheduled or validation-triggered run must recover materially relevant work missed by earlier executions rather than assuming that task execution means processing completed.

## Repository and implementation-summary maintenance

The existing daily Reality Watch also executes the repository/runtime/document alignment check in `../../workflows/maintain-dca-reality.md`. Keep its current schedule and publication rules.

Resolve the implementation summary through `../../context/current-authority.md` (Google Doc `11u_vHjYJ8GHfG3rrDcbi6iJ2PKcV_1rByUf1-9i4294`). Inspect repository revisions, live base metadata where routing changed, affected deployed task configuration, and the summary's actual sections. Repository changes are implementation evidence, not proof of deployment or use.

For an affected ChatGPT task, read its live configuration and apply only the authorised alignment patch. Preserve schedule, enabled state, source scope, validation and publication boundaries; read back the result. Continue an existing PR or unresolved correction instead of duplicating work.

Report alignment complete only after the required default-branch change is verified, runtime differences are reconciled or explicitly blocked, and affected summary sections are persisted and read back. Preserve partial outcomes for recovery by the next daily sweep.

## Validation-trigger boundary

A validation monitor event does not bypass canonical validation or reconciliation rules.

When a reviewer confirms wording, preserve that confirmation as validation provenance and independently compare it with the current authoritative target. The maintained-reality outcome may be `already_represented`, `confirmation_only`, `addition`, `correction`, `qualification`, or another supported result.

When a reviewer changes meaning, show the precise revised operational wording back to that reviewer before treating the candidate as established. The monitor must not silently promote a System & Structure paraphrase.

Repeated detection must remain idempotent: re-read the current target, reuse existing lineage, and do not duplicate writes, validation asks, tasks, or Slack posts.

## Publication routing

Organisation-facing publication routing is active.

Route each material Reality Watch finding by its actual scope:

- **domain-specific operational finding** → the relevant public domain channel;
- **cross-domain structural finding, shared-model change, capability dependency, architecture/reconciliation issue, or working organisational finding** → `#structural-alignment` (`C0AEEFTS495`);
- **major organisation-wide finding, decision implication, or synthesis materially affecting DCA beyond one domain** → `#organisation` (`C038ABGL8SD`).

Rules:

- route by scope rather than posting everything everywhere;
- do not duplicate the same finding across channels unless separate audiences are genuinely required;
- do not post routine implementation activity, validation completion, low-signal changes, or unvalidated inference merely to keep an automation active;
- `#test-automations` is not the normal publication target.

## Output implementation

All output eligibility, authority, structure, and no-output behaviour are defined by the canonical workflow's **Output contract**.

The ChatGPT runtime must preserve the distinction between:

1. Operational Reality updates;
2. Derived Organisational Reality updates;
3. System & Structure Capability Reality updates;
4. top-level Reality Watch Slack publication;
5. the optional **What this makes visible** thread;
6. private System & Structure notification from the validation monitor;
7. no-output conditions.

When the canonical workflow supports a **What this makes visible** case, publish it as a thread reply beneath the relevant Reality Watch Slack post rather than as a separate top-level broadcast.

The thread must remain grounded in the evidence and maintained reality that produced the parent finding. It must not create a new organisational finding, invent a benefit, or present a proposed future state as current reality.

## Implementation requirements

The ChatGPT tasks must preserve the canonical workflows' requirements for:

- evidence classification;
- source/provenance boundaries;
- authority and lifecycle status;
- uncertainty/conflict handling;
- reconstruction and reconciliation rules;
- material-change criteria;
- validation sufficiency and anti-duplicate boundary;
- operational-review language and role boundary, including `Not mine to confirm`, no-change closure, and changed-wording confirmation;
- validation-event idempotency;
- output contract;
- standalone-reader context, reader-usable source visibility, and native document structure through the canonical document-authoring skill;
- maintained-document comparison outcome, persistence, verification, and source-review closure;
- an auditable originating-lineage/result record;
- backlog recovery after incomplete scheduled or event-triggered executions;
- no-change → no-notification behaviour.

Provider implementation must not duplicate or silently override these rules. When a canonical workflow changes, the runtime should follow the current workflow unless a provider-specific technical limitation prevents it; any such limitation should be recorded here as implementation reality.

## Testing status

This implementation remains part of System & Structure development and live organisational testing.

Operational publication is active. Validation-triggered reconciliation is active through hourly condition watching. Bounded validation-reminder DMs are active in the current validation-monitor configuration: one complete actionable unresolved list per verified owner, at most once per Europe/Amsterdam day. Validation DM inquiries and reminders are sent only Monday–Friday in Europe/Amsterdam, except that verified Anja may also receive them on weekends for her own authorised scope. Deferred items remain open and are reassessed on the next eligible weekday; observation and reconciliation continue daily. See `dca-validation-queue-monitor.md`; this does not widen escalation or channel-publication authority.

Testing concerns include finding quality, routing, usefulness, source coverage, correct recognition of validation transitions, target freshness, idempotency, maintained-document persistence, recovery after failed or incomplete runs, closure behaviour, event-to-reconciliation latency, and whether outputs are actually used by DCA.

Running Reality Watch in ChatGPT does not imply ChatGPT is the permanent runtime.

## Runtime portability

The implementation may later:

- remain on ChatGPT;
- replace hourly polling with a webhook or event stream;
- be implemented in Claude;
- be implemented in another AI runtime;
- be moved into a broader orchestration layer.

Any replacement should be tested against the same provider-independent workflows and behavioural expectations rather than redefining the DCA capability around the new provider.