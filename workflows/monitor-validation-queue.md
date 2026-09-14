---
document_type: dca_ai_workflow
status: current
scope: organisation-wide
workflow: monitor-validation-queue
provider_independent: true
---

# Monitor DCA Validation Queue

## Purpose

Monitor live validation work, maintain a current unresolved-validation queue across old and new items, and hand every newly sufficiently established finding or correction into maintained-reality reconciliation without waiting for the next scheduled Reality Watch evidence sweep.

This workflow owns validation-state observation and handoff. It does **not** independently define organisational truth, reconstruct a parallel reality, or write directly around the maintained-reality workflows.

## Governing workflows

Apply the current:

- `workflows/reconstruction-self-evaluation-and-routing.md` for validation readiness, anti-duplicate preflight, operator-facing review boundaries, and Establish task structure;
- `workflows/maintain-dca-reality.md` for evidence boundaries, reality-view separation, materiality, connected consequences, publication eligibility, and no-output behaviour;
- `workflows/reconcile-established-findings-into-maintained-reality.md` for target comparison, controlled outcomes, routing, persistence, verification, lineage, and source-review closure.

The validation monitor is a caller and state-transition observer. These governing workflows remain authoritative.

## Trigger model

The logical trigger for reconciliation is a **material validation-state transition**, not a particular daily time.

Invoke this workflow whenever available evidence indicates that a live validation candidate may have moved into one of these states:

- validated as written;
- corrected and subsequently confirmed in its revised wording;
- established with a bounded qualification;
- materially conflicted, rerouted, or blocked by the reviewer response;
- no longer requiring the reviewer because equivalent authoritative evidence resolved the same bounded question.

A provider may implement this through a webhook, event stream, condition watch, or polling. Trigger mechanics and polling cadence belong in the provider implementation record.

Reminder evaluation is state-based rather than event-based. On every invocation, reconstruct the full current unresolved-validation queue even when no material transition is detected. An unchanged outstanding item may remain eligible for a bounded reminder under the provider cadence; the reminder itself is not a validation-state transition or publication event.

The scheduled Reality Watch remains necessary as the broad evidence-coverage, backlog-recovery, and failed-trigger safety sweep. It is not the only reconciliation clock.

## Queue-membership boundary

Do not treat a status field such as `needs_owner_validation`, an open task, an unresolved comment, or silence as sufficient queue membership or state change by itself.

For every candidate, inspect the bounded validation lineage that is relevant to its meaning:

- current authoritative maintained reality;
- source evidence and reconstruction wording;
- prior responsible-owner replies, corrections, and confirmations;
- active or resolved Google Docs comments and Reality Watch threads;
- existing Asana Establish task, subtask, and comment lineage;
- staging and reconciliation records where they exist;
- the current routing and authority decision.

Before creating or recommending new validation work, apply the anti-duplicate preflight. Continue the existing live thread when it already covers the same bounded meaning. Exclude documentary, technical, architectural, historical-only, proposed-future, already represented, or already confirmed material unless a genuine operational delta remains.

Maintain a derived unresolved-validation queue from represented state and lineage, not from a single status field, source timestamp, or previous-run window. Carry every older unresolved item forward regardless of discovery date or later activity. Remove or reroute it only when authoritative evidence establishes validation and required reconciliation, correction or withdrawal, changed ownership/destination, or another explicit closure state.

For each tracked item preserve or derive:

- the bounded validation-item identity and current atomic validation need;
- the verified responsible owner or reviewer;
- the exact authoritative response location and stable link;
- the last authoritative response or correction;
- whether the item is currently actionable or blocked by another dependency;
- the last reminder time, recipient, delivery reference, and closure evidence.

This queue is an operational worklist over authoritative evidence and lineage. It is not a second source of organisational truth.

## Measurement hook

When the current provider configuration explicitly enables a private measurement destination, apply `measure-validation-queue.md` after reconstructing the full queue and completing supported reconciliation for the run. Derive the snapshot from that assessed state; do not initiate another validation or reality-maintenance process. Measurement does not change queue membership, reminder eligibility, closure, or publication rules. Keep capture failures separate from validation failures.

## Reviewer-response interpretation

Interpret responses at their actual boundary:

- **Confirm as written / correct** validates the reviewed wording. It does not predetermine whether the maintained-target outcome is `already_represented`, `confirmation_only`, `addition`, `correction`, `qualification`, or another supported result.
- **Corrected wording** does not pass the establishment gate until the precise revised operational wording has been shown back to the reviewer and confirmed.
- **Depends / varies** may establish a qualification when the variation is sufficiently bounded; otherwise it remains unresolved.
- **Unsure / missing** preserves the gap and does not establish the candidate.
- **Not mine to confirm** changes the validation route; it is not disagreement with the wording.
- **Silence** is not confirmation, correction, disagreement, or lateness.
- **Private response** may be used as evidence when provenance and scope are preserved; reconcile the supported result into the visible and authoritative path where appropriate.

## State-transition sequence

For each candidate whose validation state materially changed:

1. **Resolve the live candidate**
   - identify the atomic wording, validation scope, source and validation references, responsible reviewer, and current establishment state;
   - preserve remaining uncertainty, conflict, variation, and authority boundaries.

2. **Decide whether the establishment gate is met**
   - `established` or `established_with_qualification` may proceed;
   - changed but unconfirmed wording, unresolved conflict, missing authority, or incomplete evidence remains `not_ready` or `unresolved`.

3. **Invoke Maintain DCA Reality as a bounded event run**
   - pass the established candidate and its validation provenance into `workflows/maintain-dca-reality.md`;
   - assess the directly affected Operational Reality, Derived Organisational Reality, and System & Structure Capability Reality separately;
   - do not require a full new evidence sweep merely to process the event, but do inspect current target state and any unresolved lineage concerning the same meaning.

4. **Execute the maintained-reality handoff**
   - run `workflows/reconcile-established-findings-into-maintained-reality.md`;
   - resolve and read the authoritative target at its current revision;
   - classify exactly one controlled outcome;
   - make only the smallest supported change;
   - persist and read back every addition, correction, or qualification;
   - record the required lineage, target, revision, actor/time, outcome, verification state, and remaining uncertainty.

5. **Close or continue validation work**
   - a no-change or confirmation-only item may close after its outcome and validation provenance are recorded and any target-required evidence/status write is verified;
   - a change-bearing item closes only after the authoritative target change is persisted and verified;
   - `conflict_unresolved`, `not_ready`, failed, and blocked cases remain visibly open or transfer to an explicit validation/reconciliation item.

6. **Apply publication rules**
   - publish only when the canonical Reality Watch Output contract supports a materially useful organisational update;
   - validation completion, queue movement, or reconciliation activity alone is not publication-worthy.

## Idempotency and repeated detection

The same response or transition may be observed more than once. Repeated detection must not create duplicate reality statements, validation asks, tasks, lineage records, or Slack posts.

On every invocation:

- re-read the current authoritative target;
- compare meaning rather than relying on a previous run marker;
- reuse existing lineage where it represents the same candidate;
- record `already_represented` or `confirmation_only` when that is the current result;
- do not replay a previously verified change merely because the monitor saw the source again.

## Reminders and contact

Reconciliation transitions and reminder evaluation are separate capabilities.

A runtime may send reminders only when its current implementation and governance permit it. When enabled:

- derive each person's reminder from their complete current actionable unresolved list, including older items, rather than only newly detected or recently changed candidates;
- state each bounded item briefly, name the one atomic confirmation, correction, or evidence needed, and link directly to the exact authoritative review location;
- do not link only to a folder, shared-drive root, broad document, or general channel;
- use one compact owner-specific reminder with one line per active actionable item when several items are outstanding;
- direct the response back to the authoritative review surface so reminder delivery does not create a parallel source of truth;
- inspect prior contact and current validation lineage before sending, then record recipient, time, bounded items, authoritative links, and delivery verification in the existing lineage;
- keep blocked or currently non-actionable items in the unresolved queue, but do not ask an owner to act until the dependency or review surface is actionable;
- stop or reroute reminders when the item is resolved, corrected, withdrawn, reassigned, or no longer belongs to that person.

Do not invent due dates, fallback reviewers, escalation, disagreement, or lateness. Reminder cadence and delivery surfaces belong in the provider implementation record. A reminder is not organisational evidence, a validation-state transition, or a publication event.

## Failure behaviour

Do not claim reconciliation completion when any required step fails, including:

- the current target cannot be resolved or read;
- the reviewer response cannot be tied to the candidate and scope;
- changed wording has not been reconfirmed;
- authority or evidence remains insufficient;
- a required write cannot be completed;
- persistence cannot be read back and verified;
- required lineage cannot be recorded;
- the result would silently resolve a conflict.

Preserve and surface the blocker as runtime or capability evidence. The scheduled Reality Watch must be able to recover the unprocessed candidate from represented state and lineage rather than assuming that the monitor invocation completed it.

## Output contract

Notify the responsible System & Structure maintainer only when at least one of these occurs:

- a validation candidate newly becomes sufficiently established and reconciliation completes;
- reconciliation produces a material correction, qualification, conflict, or routing decision requiring attention;
- a required persistence, verification, or lineage step fails or blocks closure;
- reviewer evidence materially changes what still needs validation.

No material validation-state change and no blocker means no notification.

## Short rule

**Maintain the full unresolved validation queue across runs. Remind responsible owners through the existing bounded review surfaces. When a finding becomes sufficiently established, hand it immediately into the canonical maintained-reality comparison, persistence, verification, and closure path. Keep the scheduled Reality Watch as recovery and broad coverage, not as the only reconciliation clock.**
