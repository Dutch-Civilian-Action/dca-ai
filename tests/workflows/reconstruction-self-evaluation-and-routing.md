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
- the default item is a concrete reconstructed reality statement concerning what the person did, saw, decided, received, handed over, what varies, or what happens now;
- response paths include **Confirm as written**, **Correct**, **Depends**, and **Not mine to confirm**;
- an open question appears only when one precisely named operational fact is missing, after the packet states what is already established;
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

## Test 7 — already-settled claim is excluded

Input:

- a staging object is marked as needing owner validation;
- current maintained Operational Reality already represents the same bounded meaning;
- prior responsible-owner validation is traceable;
- the reconstruction introduces no material delta.

Expected:

- the validation-request preflight records the maintained-reality and validation references;
- the item is excluded from the operator packet and no reviewer task is created;
- staging status alone does not override the settled lineage;
- no formal maintained-reality comparison outcome is asserted by the preflight.

## Test 8 — active validation thread is continued

Input:

- a reconstructed candidate touches an unresolved operational fact;
- an active comment or task thread already asks the same bounded question;
- the reconstruction contributes additional evidence or a narrower delta.

Expected:

- the existing thread is reused and receives the relevant evidence or precise delta;
- no duplicate packet item, comment thread, or Asana task is created;
- the prior established context is not re-asked;
- the thread remains assigned only to a person who can know the operational fact.

## Test 9 — genuine delta produces one bounded statement

Input:

- source-first reconstruction and self-evaluation are complete for a candidate;
- current maintained reality and prior validation do not settle one material operational delta;
- no active thread already covers it.

Expected:

- the operator receives one concrete reconstructed reality statement containing only the genuine delta;
- response paths are **Confirm as written**, **Correct**, **Depends**, and **Not mine to confirm**;
- an open question is used only if one precisely named fact cannot be stated from evidence;
- architecture, schema, routing, promotion, and system-terminology decisions remain with System & Structure or live-use testing;
- formal target comparison and persistence remain downstream of required validation.

## Test 10 — validation of inputs does not validate a derived claim

Input: the owner confirms a movement scope and one quantity; a reconstruction object combines those with document figures and a proposed explanation of another person's total.

Expected: the confirmed inputs keep their lineage, while derived comparisons and explanations retain their own unreviewed status. Record-level `owner_validated` is used only for the exact confirmed claim; a caveat in notes does not repair an overbroad status. No new owner request is generated merely to validate arithmetic or reverse a prior instruction not to pursue the mechanism.

## Test 11 — arithmetic compatibility and later answers

Input: a decomposition reproduces a reported difference; owner answers subsequently settle some prepared questions, and one question is expressly dropped.

Expected: compatible arithmetic is distinguished from evidence of the original calculation method. Accepted answers update the affected current claims and draft review list without being re-asked; the dropped question stays dropped. A fresh preflight precedes release of remaining questions. An earlier preflight is assessed against information available at its checkpoint, not retroactively declared wrong because answers arrived later.

Tests 10–11 are added regression specifications; adding them does not record a successful runtime execution.

## Pass criterion

The workflow passes when settled claims are excluded, live validation threads are continued rather than duplicated, genuine deltas become bounded work-level statements, technical responsibilities remain with System & Structure, corrections make a confirmation round-trip, and no-change or non-ownership responses are handled without invented work.
