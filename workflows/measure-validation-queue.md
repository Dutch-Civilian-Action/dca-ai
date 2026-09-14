---
document_type: dca_ai_workflow
status: current
scope: validation-queue-measurement
workflow: measure-validation-queue
provider_independent: true
---

# Measure the DCA validation queue

## Purpose and authority

Derive a small, traceable measurement history from the queue already reconstructed by `monitor-validation-queue.md`. Initial measures are unresolved validation count and age, and sufficiently established findings still awaiting verified reconciliation. This is a measurement of the evidence-to-maintained-reality process, not all DCA work, labor time, impact, productivity, or an organisational performance score.

The governing validation, authority, reconciliation, closure and publication rules remain in `monitor-validation-queue.md`, `maintain-dca-reality.md` and `reconcile-established-findings-into-maintained-reality.md`. Measurement consumes their assessed state; it does not resolve, validate, publish, remind, alter source records, or initiate a second reality-maintenance workflow.

No human time entry or new operational reporting is required. Source event dates and request waiting time must never be interpreted as labor time. DCA Ways of Working may represent the recurring practice once appropriately established; its empty tables do not imply zero organisational work, and copying the validation queue there is not required.

## Unit and state

Use one stable ID per bounded, independently resolvable validation need. Split distinct partner identities, events, or handoffs even when one message or task groups them. Keep inseparable prerequisites for one reviewed output together, with the boundary explicit. Deduplicate across owners, reminders, source threads, tasks and staging records. A parent task and its child do not both count for the same need. A correction preserves the existing ID while it addresses the same meaning; split or replacement needs retain lineage and a reason.

Assign exactly one primary measurement state from inspected evidence:

| State | Inclusion |
| --- | --- |
| `validation_needed` | A genuine current validation or clarification need remains, including precise changed wording awaiting confirmation. |
| `reconciliation_pending` | Establishment is sufficiently evidenced at the required scope, and a specific required target comparison, persistence, verification, routing or closure-lineage step demonstrably remains. |
| `closed` | Authoritative evidence supports closure, including verified no-write outcomes when applicable. |
| `unknown` | Available evidence cannot support one of the other classifications. |

An Airtable status, open task, unresolved comment or old blocked post is not enough. A compound record can contain an already reconciled finding and a separate open operational question. Attribute each need at its own boundary. A staging establishment flag cannot override recorded owner-validation requirements.

Track actionability separately: `actionable`, `held_dependency`, `needs_preparation`, or `unknown`. Held items remain in the validation total. Required wording preparation, missing recipient identity and a future physical test are distinct reasons. Reminder eligibility and personal availability continue to follow the existing monitor rules; metric age does not change them.

## Metric definitions

1. **Validation needed:** distinct `validation_needed` IDs. Show held and preparation subsets alongside the total when useful.
2. **Validation age:** elapsed calendar time from the earliest verified request of the same bounded need to the observation cutoff. Preserve exact source and basis. If only a later same-need request or bounded review-task creation is verified, report a lower bound. If delivery/request timing is unsupported, leave it unknown. Never start this clock at the operational event, evidence creation, unrelated parent task, reminder, queue publication, or generic source modification time. Narrowing an existing question does not restart its clock.
3. **Established but reconciliation pending:** distinct `reconciliation_pending` IDs, with establishment evidence and the specific closure gap. Its age uses establishment time, separately from initial validation-request age. Unknown establishment time stays unknown.
4. **Coverage:** source inventory, pagination/access gaps, unclassified candidates, known/unknown/lower-bound clocks, capture time, metric version and scope.

A zero is scoped: state “no verified pending items in the inspected set” when coverage is partial. Missing coverage or unclassified records must never become a claim of zero backlog. Do not sum `unknown` into either headline count. Broad review tasks without atomic scope remain visible coverage gaps until resolved; do not invent a count for their paragraphs.

Age is not lateness. No targets, deadlines, SLA, ranking, personnel score or trend are introduced by this workflow. First capture is a baseline; compare later captures only when metric version, grain and coverage are compatible. Describe added coverage, reclassification, splits, duplicate removal and corrections separately from actual arrivals or verified closures.

## Snapshot contract

Every snapshot records:

- `metric_version` = `dca-validation-metrics/1`;
- observation cutoff, source-read interval where material, timezone, scope and coverage;
- source coverage notes and any incomplete pagination/access;
- item ID, bounded wording, owner when verified, primary state, actionability and reason;
- authoritative source/review links and current state/closure evidence;
- request time and `age_basis` (`verified`, `lower_bound`, `unknown`);
- for pending reconciliation: establishment source/time and specific `closure_gap`;
- verified exclusions where necessary to explain classification;
- any prior snapshot being corrected and the reason.

`scripts/validation_metrics.py` mechanically validates and summarizes reviewed snapshot JSON. It deliberately does not classify raw connector records. The caller must perform the evidence review first. Tests use synthetic examples only.

## Persistence and failure

The provider records the approved private snapshot destination, cadence and artifact identity. Preserve dated history; do not use an ephemeral scratch file, run-success marker, unverified write, previous count, or current status alone as measurement history.

Use source reads already required by the monitor. Capture after the bounded reconciliation work for the run so newly verified closure is reflected. If a source cannot be read, keep its affected items unknown or explicitly stale and declare partial coverage. Do not silently carry an old assessment as freshly verified. Keep unbounded candidates and missing-source inventory visible.

Save and verify each accepted snapshot. Deduplicate retries for the same daily capture; if later evidence repairs a partial or incorrect capture, preserve the earlier snapshot and explicitly supersede it. Never overwrite historical measurement without an auditable correction.

Measurement failure does not alter validation state, reopen closed work or block a supported reconciliation. Preserve the last verified snapshot, record the capture failure and retry at the provider cadence. No metric collection may send extra reviewer messages or routine counts to an organisational channel. The existing event-based publication contract remains unchanged.
