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

## Pass criterion

The runtime reconstructs a complete state-based unresolved queue on every invocation, retains older items until authoritative closure or rerouting, reminds only through verified bounded review paths under provider cadence, and never treats reminder delivery as organisational truth or a publication event.
