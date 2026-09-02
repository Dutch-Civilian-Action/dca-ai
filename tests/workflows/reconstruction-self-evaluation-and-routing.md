---
document_type: dca_ai_workflow_test_spec
status: current
workflow: reconstruction-self-evaluation-and-routing
provider_independent: true
---

# Tests — Reconstruction Self-Evaluation, Establishment & Routing

## Purpose

Verify that operational validation remains usable for the people doing the work, while System & Structure retains reconstruction, comment processing, reconciliation, and technical translation.

## Test 1 — operator-facing validation packet

Input:

- a sufficiently reconstructed operational claim requiring validation from a person doing the work;
- internal technical lineage and routing fields are available.

Expected:

- the packet states what it is and why review is needed, status/authority, audience/action, scope/time, how to respond, limitations, uncertainty, and validation state;
- each material source is represented by a reader-usable name/title, platform and account/container, date/coverage, supported point, limitations, and stable reference where access permits; internal IDs are secondary;
- questions concern what the person did, saw, decided, received, handed over, what varies, what happens now, examples, and record location;
- response paths include **Confirm as written**, **Correct**, **Missing**, **Unsure**, and **Not mine to confirm**;
- the operator body does not expose Reconstruction Object, Evidence Link, epistemic/promotion, routing, target revision, persistence, architecture, or reconciliation mechanics.

## Test 2 — Establish task topology and assignments

Input:

- shared operational reality must be established and validated;
- an operational reviewer and System & Structure are both involved.

Expected:

- one parent task is of type **Establish**;
- children are A Provide input, B Reconstruct, C Validate, D Reconcile, and E Test / put in use;
- C contains C1 Review, C2 Process comments and corrections, and C3 Reply / confirm revised wording;
- the operational person receives only relevant input, C1, C3, and live-use work;
- System & Structure or the reconstruction runtime owns B, C2, D, and technical detail;
- the parent may be linked to the operational project without transferring technical responsibility.

## Test 3 — correction round-trip

Input:

- the reviewer corrects material wording during C1.

Expected:

- C2 records the comment as new evidence and prepares precise revised operational wording;
- C3 always shows that wording back to the reviewer;
- the candidate does not advance as validated on the basis of an unconfirmed paraphrase.

## Test 4 — correct / no change

Input:

- the reviewer responds `Correct` to the bounded wording;
- the maintained target already represents the same material meaning and requires no evidence/status write.

Expected:

- scope and provenance of the confirmation are recorded;
- maintained-target comparison records `already_represented` or `confirmation_only` as appropriate;
- validation closes after the outcome is recorded and any target-required evidence/status write is verified;
- no correction, cosmetic rewrite, or new reviewer task is manufactured.

## Test 5 — not mine to confirm

Input:

- the named reviewer selects `Not mine to confirm`.

Expected:

- the response is preserved as validation-routing evidence;
- it is not classified as dispute or rejection;
- the item is routed to the appropriate validator or remains explicitly unresolved.

## Test 6 — unnecessary stage

Input:

- a bounded Establish case genuinely requires no new input or no changed-wording confirmation.

Expected:

- the unneeded stage is omitted or closed with a recorded reason;
- empty work is not assigned merely to satisfy the topology;
- required reconstruction, validation, reconciliation, and use boundaries are not skipped.

## Pass criterion

The workflow passes when operational people receive only understandable work-level validation, technical responsibilities remain with System & Structure, corrections make a confirmation round-trip, and no-change or non-ownership responses are handled without invented work.
