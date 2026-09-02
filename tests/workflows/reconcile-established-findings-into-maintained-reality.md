---
document_type: dca_ai_workflow_test_spec
status: current
workflow: reconcile-established-findings-into-maintained-reality
provider_independent: true
---

# Tests — Reconcile Established Findings into Maintained DCA Reality

## Purpose

Test the shared handoff used by both Full Historical Reconstruction and Maintain DCA Reality.

## Test 1 — already represented

Input:

- an established current candidate;
- the authoritative target already contains materially equivalent meaning.

Expected:

- outcome `already_represented`;
- no cosmetic target edit;
- comparison target and revision recorded;
- persistence verification `not_required`;
- no-change review may close.

## Test 2 — confirmation only

Input:

- new validated evidence confirms an existing maintained claim without changing its meaning.

Expected:

- outcome `confirmation_only`;
- confirmation provenance recorded;
- target edited only if its evidence/status representation requires it;
- no false “changed reality” publication.

## Test 3 — addition

Input:

- an established current finding is absent from the correct target.

Expected:

- outcome `addition`;
- smallest supported addition persisted;
- target re-read and revision recorded;
- originating lineage updated;
- change-bearing review closes only after verification.

## Test 4 — correction

Input:

- established evidence changes maintained meaning.

Expected:

- outcome `correction`;
- prior evidence/history preserved;
- corrected target persisted and verified;
- connected derived/capability consequences assessed separately.

## Test 5 — qualification

Input:

- an existing claim remains partly true but needs a variation, exception, attribution, time, or uncertainty boundary.

Expected:

- outcome `qualification`;
- valid original meaning retained;
- required boundary persisted and verified;
- no wholesale deletion of the claim.

## Test 6 — unresolved conflict

Input:

- two material sources conflict and required validation is absent.

Expected:

- outcome `conflict_unresolved`;
- no falsely settled target write;
- conflict and required confirmation preserved;
- review remains open or transfers to a traceable bounded validation item.

## Test 7 — historical or proposed material

Input:

- an established historical state or proposed future state does not describe current reality.

Expected:

- `historical_only` or `proposed_future`;
- correct archive/design/work route recorded;
- no promotion into current Operational Reality.

## Test 8 — alternate destination

Input:

- an established finding belongs in Relationship Data, operational state, architecture, a procedure, Asana, or another target rather than the candidate reality document.

Expected:

- outcome `alternate_destination`;
- actual destination recorded;
- target-specific rules applied;
- no forced Operational Reality write.

## Test 9 — failed persistence

Input:

- a justified write is prepared but cannot be completed or read back.

Expected:

- promotion status `persisted_unverified` or `blocked`;
- persistence verification `failed` or `blocked`;
- prior maintained target preserved;
- source review remains open;
- no Slack claim that maintained reality changed;
- evidence coverage does not advance past the failed material.

## Test 10 — historical reconstruction anti-bias

Input:

- a Full Historical Reconstruction is underway and current maintained reality contains a plausible summary.

Expected:

- current maintained reality is not used to shape source reconstruction before self-evaluation and required validation;
- only ready current candidates enter the comparison handoff;
- historical-only and not-ready objects remain in lineage.

## Test 11 — task completion is not persistence

Input:

- an Asana task is completed but no target revision or read-back verification exists.

Expected:

- no `persisted_verified` result;
- task state retained as work evidence only;
- reconciliation remains pending or blocked.

## Test 12 — both callers use one contract

Input:

- equivalent established candidates arrive from Historical Reconstruction and Reality Watch.

Expected:

- both use the same outcome, routing, persistence, verification, and closure vocabulary;
- provider/runtime differences do not change organisational meaning.

## Test 13 — reviewer says correct

Input:

- a bounded operational statement has been sent for validation;
- the reviewer responds `Correct` or an equivalent confirmation;
- the authoritative maintained target already represents the same material meaning.

Expected:

- the response and scope are preserved as validation provenance;
- comparison with the maintained target produces `already_represented` or `confirmation_only` as appropriate;
- no cosmetic target edit, correction task, or extra reviewer action is created;
- persistence verification is `not_required` when the target has no evidence/status write requirement;
- when a target-required evidence/status write exists, it is persisted and verified before closure;
- the review thread resolves only after the outcome and any required write are verified.

## Test 14 — corrected wording still needs confirmation

Input:

- a reviewer supplies a substantive correction;
- System & Structure has drafted revised operational wording;
- the reviewer has not confirmed the revision.

Expected:

- the candidate remains `not_ready` in bounded validation;
- revised wording is returned for precise confirmation;
- no maintained-target correction is claimed before required confirmation;
- after confirmation, the supported outcome is reconciled, persisted, and verified normally.

## Pass criterion

The workflow passes when every candidate has a traceable establishment state, authoritative comparison target, controlled outcome, routing decision, target/persistence result, and closure state; no-change confirmations close without invented work, corrected wording completes its required confirmation loop, and reconstruction staging, tasks, or publications never become substitute truth.
