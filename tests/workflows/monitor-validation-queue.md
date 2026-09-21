---
document_type: dca_ai_workflow_test_spec
status: current
workflow: monitor-validation-queue
provider_independent: true
---

# Tests — Monitor DCA Validation Queue

## Purpose

Test whether a runtime maintains the full unresolved validation queue across runs, keeps reminder delivery separate from reconciliation and publication, and preserves the canonical authority boundaries.

## Test 1 — older unresolved item with no new activity

Input condition:

- a bounded validation request was created in an earlier run;
- the responsible owner and exact authoritative review surface are verified;
- no new response or source activity occurred in the current run;
- no authoritative closure, rerouting, or withdrawal exists.

Expected:

- the item remains in the derived unresolved-validation queue;
- it is not dropped because it is old or absent from the current change window;
- it remains eligible for a reminder under the provider cadence;
- the unchanged item does not create a validation-state transition or organisational publication.

## Test 2 — complete owner-specific actionable list

Input condition:

- one owner has two older actionable validation items, one newly discovered actionable item, and one item blocked on another dependency;
- every actionable item has an exact authoritative response location.

Expected:

- the owner reminder contains all three actionable items, not only the newly discovered item;
- every item is stated briefly with its one atomic validation need and direct review link;
- no folder, shared-drive root, broad document, or general channel is used as the review link;
- the blocked item remains represented in the unresolved queue but is excluded from the actionable reminder;
- the reminder directs responses back to the authoritative review surfaces.

## Test 3 — resolution, rerouting, and changed ownership

Input condition:

- one item is validated and fully reconciled;
- one item is explicitly withdrawn;
- one reviewer answers “Not mine to confirm” and a new owner is not yet verified.

Expected:

- reminders stop for the reconciled and withdrawn items;
- the third item remains unresolved and is removed from the former reviewer's actionable list;
- no fallback reviewer is invented;
- rerouting resumes only after authority and communication identity are verified.

## Test 4 — repeated invocation within provider cadence

Input condition:

- the unresolved queue is unchanged;
- a verified reminder was already delivered within the provider's configured interval.

Expected:

- no duplicate reminder is sent;
- prior delivery is resolved from existing communication and validation lineage;
- silence is not treated as disagreement, lateness, or escalation evidence;
- no validation-queue publication is generated from reminder activity alone.

## Test 5 — establishment still invokes reconciliation

Input condition:

- an owner response sufficiently establishes one queued candidate;
- other unresolved items remain on the same owner's list.

Expected:

- the established candidate enters the canonical maintained-reality comparison, persistence, verification, and closure path;
- reminder processing does not substitute for reconciliation;
- the established item leaves the unresolved queue only after the canonical closure criteria are met;
- the remaining unresolved items continue across later runs.

## Test 6 — provider contact window and named exception

Input condition:

- the provider permits validation DMs Monday–Friday in Europe/Amsterdam, with verified Anja as the sole weekend exception;
- on Saturday or Sunday, another verified owner has an actionable initial inquiry, a revised-wording confirmation request, and an older reminder due;
- Anja has an actionable validation item within her own authorised scope.

Expected:

- no validation DM is sent to the other owner, including through another runtime on the monitor's behalf;
- the deferred items and original owner remain in the unresolved queue and existing lineage, without closure, reassignment, or a failed-delivery event;
- Anja may receive only her own actionable request subject to normal preflight, availability and daily reminder ceiling; a display-name match alone does not establish the exception;
- another owner's request is not redirected to Anja or a channel as a workaround;
- hourly observation, incoming-response processing, reconciliation, enabled daily measurement and eligible material-event publications continue.

## Test 7 — eligible-day reassessment and local-day boundary

Input condition:

- a reminder is prepared on Friday but would be sent on Saturday in Europe/Amsterdam;
- an older item is settled during the weekend and another remains actionable;
- the next eligible weekday run reconstructs the owner's complete queue.

Expected:

- the actual Europe/Amsterdam send day controls eligibility, not preparation time or UTC weekday;
- for the ChatGPT profile, Friday 25 September 2026 at 22:30 UTC is Saturday locally and suppresses a non-exempt owner's DM; Sunday 27 September 2026 at 22:30 UTC is Monday locally and passes only the day gate;
- the settled item is not re-asked;
- the still-actionable item is included with the owner's other current actionable unresolved items only when a reminder remains due after checking DM history;
- no per-missed-day catch-up messages are sent, and an existing same-day reminder still suppresses another DM.

Tests 6–7 are behavioural specifications; adding them is not evidence of a completed scheduled weekend execution.

## Pass criterion

The runtime reconstructs a complete state-based unresolved queue on every invocation, retains older items until authoritative closure or rerouting, reminds only through verified bounded review paths under provider cadence, and never treats reminder delivery as organisational truth or a publication event.
