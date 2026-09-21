---
document_type: dca_ai_provider_implementation
status: current-testing
provider: chatgpt
workflow: monitor-validation-queue
---

# ChatGPT Implementation — DCA Validation Queue Monitor

## Canonical workflow

`../../workflows/monitor-validation-queue.md`

Related governing workflows:

- `../../workflows/maintain-dca-reality.md`;
- `../../workflows/reconcile-established-findings-into-maintained-reality.md`;
- `../../workflows/reconstruction-self-evaluation-and-routing.md`.

This file records the current ChatGPT runtime implementation. It does not redefine validation, organisational truth, maintained-reality outcomes, or publication eligibility.

## Current implementation

Task name: **Monitor validation queue**

Runtime: **ChatGPT scheduled condition watch**

Cadence: **hourly, every day, Europe/Amsterdam**

Trigger semantics: **act on every newly detected material validation-state transition and reconstruct the full unresolved validation queue on every run**

This is near-event-driven polling rather than a true webhook. A validated response may therefore be processed on the next hourly check rather than at the exact moment it is submitted.

Publication surface: **`#dca-validation-queue` (`C0C02JP9ZB4`)**

Notification rule: **post in the validation queue only when reconciliation completes, reviewer evidence materially changes the case, or a required persistence/lineage step blocks closure**

No material state change means no publication.

Reminder surface: **direct Slack DM from DCA Bot to the verified operational owner**

Validation DM delivery days: **Monday–Friday, Europe/Amsterdam; only verified Anja may receive validation DMs on Saturday or Sunday**

Reminder ceiling: **at most one DM per owner per Europe/Amsterdam calendar day**, including Anja

Reminder contents: **the owner's complete current actionable unresolved validation list, including older items**

Reminder delivery is additional to validation-queue publication. It does not change the channel's event-based notification rules.

## Runtime relationship with Reality Watch

The ChatGPT implementation has two maintained-reality entry paths:

```text
scheduled DCA Reality Watch sweep
        └── broad evidence coverage / backlog recovery / capability health

validation queue condition watch
        ├── full unresolved queue
        │       └── owner reminder eligibility / daily ceiling
        │
        └── newly established candidate
                ↓
        Maintain DCA Reality — bounded event run
                ↓
        Reconcile Established Findings into Maintained DCA Reality
                ↓
        persist → read back → record lineage → close or continue
```

The validation monitor does not wait for the next daily Reality Watch when a candidate becomes sufficiently established. The daily Reality Watch remains the safety and recovery sweep for failed triggers, missed evidence, incomplete writes, changed evidence outside the queue, and cross-view lag.

## Current access surfaces

Use the current connected ChatGPT access where available to inspect:

- DCA Operational Reality and other authoritative maintained-reality documents in Google Drive;
- Google Docs review and correction threads;
- Airtable validation, staging, and `Reconstruction_Objects` lineage;
- Asana Establish task, subtask, and comment lineage;
- public DCA Slack validation and Reality Watch threads;
- existing owner DM history for reminder deduplication and delivery verification;
- GitHub canonical workflows and provider implementation records.

A single status field is not sufficient evidence of queue membership or completion. The runtime must resolve the candidate, reviewer response, scope, source, target, and current lineage before acting.

## Validation-queue publication routing

The current ChatGPT publication surface for validation-monitor notifications is `#dca-validation-queue` (`C0C02JP9ZB4`).

Routing rules:

- use one top-level thread per atomic validation item and continue that thread for later state changes;
- continue an existing authoritative validation or Reality Watch thread when it already covers the same bounded meaning; do not recreate the validation request in the new channel;
- when an existing thread remains authoritative elsewhere, the validation-queue post may link to it and record the monitor state without duplicating the underlying review;
- every material update must state the validation item, reviewer or equivalent evidence, reconciliation outcome, whether the maintained target changed, verification status, and any remaining blocker;
- do not publish routine polling, silence, unchanged states, repeated detection, or implementation activity without a material validation transition or blocker;
- DCA Reality Watch publication remains governed by `dca-reality-watch.md` and its scope-based routing. Do not reroute Reality Watch publications into the validation queue; cross-link only when a validation handoff materially affects a published Watch.

## Handoff and persistence requirements

When a candidate becomes sufficiently established, the runtime must:

1. preserve the exact validated wording, reviewer, response surface, scope, and provenance;
2. invoke the canonical maintained-reality workflow for that bounded candidate;
3. read the authoritative target at its current revision;
4. execute the shared controlled-outcome comparison;
5. persist only a supported addition, correction, or qualification;
6. read back and verify every change-bearing write;
7. record the comparison target/revision, outcome, destination, target reference/revision, actor/time, verification state, and notes in the required lineage;
8. close or advance the validation item only when canonical completion criteria are satisfied.

A successful monitor run, Airtable state change, task completion, reviewer reply, generated draft, or Slack message is not proof that maintained reality changed.

## Changed-wording boundary

When a reviewer changes meaning, the runtime must show the precise revised operational wording back to that reviewer before the candidate may be treated as established. The monitor may record and route the response, but it must not let a System & Structure paraphrase silently become organisational truth.

A response equivalent to “correct” establishes the reviewed wording as validation provenance. The maintained-target outcome is still determined independently and may be `already_represented`, `confirmation_only`, `addition`, `correction`, `qualification`, or another supported result.

## Idempotency and recovery

Every hourly run must compare represented state rather than relying only on the previous task run time.

Repeated observation of the same response must not create duplicate validation asks, reality statements, target writes, lineage records, tasks, or Slack publications.

When the monitor cannot complete a required target read, write, verification, or lineage update:

- keep the candidate visibly unresolved or blocked;
- do not claim maintenance or closure;
- preserve enough state for the daily Reality Watch to recover it;
- surface the failure as System & Structure runtime capability evidence.

## Reviewer reminder implementation

Automated bounded validation reminders are **active in the current ChatGPT monitor implementation**. They are reminders to use the existing authoritative review surface, not escalation or reviewer chasing.

On every hourly run, the monitor must reconstruct each verified owner's complete unresolved-validation queue from represented state and current authoritative lineage, regardless of when an item was first discovered. An older item remains in the queue until authoritative evidence establishes validation and required reconciliation, correction or withdrawal, rerouting, changed ownership, or another explicit closure state.

### Validation DM contact window

Before sending any validation DM, evaluate the current day in **Europe/Amsterdam**. This applies to initial validation inquiries, requests to confirm revised wording, and reminders, including delivery through another runtime on the monitor's behalf.

- **Monday–Friday:** normal owner, review-surface, preflight, availability and reminder-cadence rules apply.
- **Saturday–Sunday:** do not send validation inquiries or reminders to any owner except **verified Anja**. Resolve her existing verified account; a display-name match alone is insufficient. This exception permits contact only about her own explicitly authorised validation scope. It does not make her a substitute recipient or chaser for other owners.
- Retain each deferred item and its owner in the unresolved queue and existing lineage. Contact-window deferral is not closure, reassignment, failed delivery, or a material validation-state change.
- Reassess deferred items on the next eligible weekday against current evidence, replies, ownership, review links and DM history. Send only if still actionable and due, within one consolidated owner reminder and the existing daily ceiling; never accumulate or replay one DM per missed day.
- Evaluate the window again at actual send time. A Friday preparation does not authorise Saturday delivery, and a UTC day boundary does not override the Europe/Amsterdam day.

Hourly observation, processing of incoming responses, supported reconciliation, daily measurement and already-authorised material-event channel publication continue every day. The contact window does not waive confirmation of revised wording or authorise extra messages or channel requests to bypass a deferred DM. All existing publication boundaries and the one-reminder-per-owner-per-day ceiling remain in force, including for Anja.

For each owner:

- send no more than one reminder DM in a Europe/Amsterdam calendar day;
- when a reminder is sent, include the complete current actionable unresolved list, not only new or recently changed items;
- use `Validation reminders — [count] open`, followed by one brief line per item containing the bounded topic, `Needed: [atomic confirmation, correction, or evidence]`, and a direct link to the exact Google Docs comment or anchored passage, Asana validation task/subtask, or authoritative Slack thread;
- do not use a folder, shared-drive root, broad document, or general channel as the reminder link;
- direct the owner to respond at the linked authoritative location; the DM is delivery, not a second source of truth;
- inspect existing DM and validation lineage before sending, and record recipient, timestamp, bounded items, authoritative links, Slack message reference, and delivery verification;
- retain blocked or non-actionable items in the derived queue, but exclude them from the actionable DM until their dependency or review surface is ready;
- stop or reroute reminders immediately when the item is resolved, corrected, withdrawn, reassigned, or no longer belongs to that owner.

Do not invent deadlines, mark silence as disagreement or lateness, add fallback reviewers, or disregard operational availability. Reminder activity alone must not produce a `#dca-validation-queue` post.

## Private measurement configuration

The optional measurement contract is `../../workflows/measure-validation-queue.md`. It reuses this monitor; no second scheduled task or source-truth table is introduced.

Activation is explicit and separate from repository implementation. Keep measurement disabled until the task prompt contains both `validation_metrics.enabled=true` and a verified `validation_metrics.library_file_id`. An unmerged branch or prepared artifact is not an active configuration.

When activated:

- the existing hourly invocation remains unchanged;
- after its normal queue assessment and reconciliation, capture once per Europe/Amsterdam calendar day, beginning with the first successful run that day;
- maintain the configured private Markdown measurement log in the requesting user's ChatGPT files, retaining dated JSON snapshots and a concise current readout;
- resolve the artifact by its configured stable identity; use a version-checked replacement and verify the saved result. Do not search by a similar title and overwrite an arbitrary file;
- reuse the existing baseline when its metric version and scope match. Keep coverage changes and reclassifications explicit; first capture alone cannot show improvement;
- retry failed or partial capture on a later hourly run as needed. Preserve and explicitly supersede a partial snapshot when repairing it, instead of counting the repair as a new operational event;
- store no operational snapshot payloads in the implementation repository;
- do not send routine metric counts, daily summaries, or additional reminders to Slack. This opt-in stores history privately; the current material-event and reminder rules are unchanged;
- on a new capture-persistence failure, retain the prior verified snapshot and make the failure visible in the task's private run result. Do not post it as an operational validation failure.

Activation sequence: merge and read back the reviewed repository change; verify the saved baseline artifact identity; add the exact opt-in binding to the existing task without changing its schedule or other instructions; read back task configuration; refresh the affected technical implementation summary under `maintain-dca-reality.md`. Record configured status separately from the first successful scheduled capture.

## Testing status

This implementation is active System & Structure testing.

Testing concerns include:

- correct recognition of genuine validation-state transitions;
- suppression of duplicate or already settled asks;
- correct treatment of confirmation, correction, qualification, rerouting, and unresolved responses;
- event-to-reconciliation latency;
- target freshness and idempotency;
- persistence and lineage verification;
- closure behaviour;
- recovery by the scheduled Reality Watch after incomplete or failed monitor runs;
- continuity of older unresolved items across runs with no new activity;
- complete owner-specific reminder contents and direct review links;
- one-DM-per-owner-per-day enforcement and reminder delivery lineage;
- weekday-only validation DM delivery, the verified Anja-only weekend exception, Europe/Amsterdam day boundaries, and fresh reassessment after deferral;
- strict separation between private reminder delivery and event-based `#dca-validation-queue` publication.

## Runtime portability

A later runtime may replace hourly polling with a webhook or event stream. That change may reduce latency but must preserve the same provider-independent validation, unresolved-queue continuity, reminder boundaries, reconciliation, persistence, verification, and no-output behaviour.
