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

Trigger semantics: **act on every newly detected material validation-state transition**

This is near-event-driven polling rather than a true webhook. A validated response may therefore be processed on the next hourly check rather than at the exact moment it is submitted.

Notification rule: **notify Anja only when reconciliation completes, reviewer evidence materially changes the case, or a required persistence/lineage step blocks closure**

No material state change means no notification.

## Runtime relationship with Reality Watch

The ChatGPT implementation has two maintained-reality entry paths:

```text
scheduled DCA Reality Watch sweep
        └── broad evidence coverage / backlog recovery / capability health

validation queue condition watch
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
- GitHub canonical workflows and provider implementation records.

A single status field is not sufficient evidence of queue membership or completion. The runtime must resolve the candidate, reviewer response, scope, source, target, and current lineage before acting.

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

## Reviewer contact status

Automated reviewer chasing is **not active in the current ChatGPT monitor implementation**.

The monitor may observe replies and manage the reconciliation handoff. Any future reminder behaviour must be separately enabled, must point to the existing bounded validation request, and must follow the canonical no-invented-deadline, no-silence-as-disagreement, and operational-availability boundaries.

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
- recovery by the scheduled Reality Watch after incomplete or failed monitor runs.

## Runtime portability

A later runtime may replace hourly polling with a webhook or event stream. That change may reduce latency but must preserve the same provider-independent validation, reconciliation, persistence, verification, and no-output behaviour.
