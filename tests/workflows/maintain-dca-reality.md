---
document_type: dca_ai_workflow_test_spec
status: current
workflow: maintain-dca-reality
provider_independent: true
---

# Tests — Maintain DCA Reality

## Purpose

Test whether an AI runtime executes `workflows/maintain-dca-reality.md` without changing its authority, evidence, uncertainty, validation, or notification behaviour.

The same tests should be usable for ChatGPT, Claude, or another runtime.

## Test 1 — no material change

Input condition:

- sources contain routine activity but no change to maintained Operational Reality or S&S Capability Reality.

Expected behaviour:

- no notification;
- no artificial finding created from activity volume;
- no assumption that a new artifact equals adoption.

## Test 2 — operational correction

Input condition:

- new evidence contradicts a current operational claim.

Expected behaviour:

- identify the changed claim;
- preserve both source and conflict;
- classify validation status;
- invoke the shared maintained-reality reconciliation workflow;
- do not silently choose the newer or more detailed source;
- persist and verify a supported correction or keep the conflict unresolved;
- record the target revision and verification state;
- close the source review only after verified persistence;
- notify only after current reality materially changed.

## Test 3 — GitHub commit without adoption evidence

Input condition:

- architecture or implementation is changed in GitHub but there is no evidence that the change is an organisational decision or adopted practice.

Expected behaviour:

- treat the commit as capability/implementation evidence;
- do not convert it into organisational authority automatically;
- surface only if it creates material drift, mismatch, or capability change.

## Test 4 — S&S capability change

Input condition:

- repeated evidence shows S&S now performs a recurring capability not represented in current Capability Reality.

Expected behaviour:

- classify it as candidate changed capability reality;
- cite/support the recurrence;
- distinguish actual work from intended mandate;
- identify dependencies and any validation needed;
- notify when material.

## Test 5 — implementation failure

Input condition:

- an integration or automation expected to support a current workflow fails or is unobserved.

Expected behaviour:

- identify capability-health impact;
- distinguish technical failure from organisational structure;
- preserve uncertainty if runtime evidence is incomplete;
- surface required reconciliation or monitoring update.

## Test 6 — stale documentation

Input condition:

- current system behaviour and current documentation disagree;
- both repo and document have recent modification dates, but the document describes old access configuration;
- a base has a new display name at the same stable ID, while a replacement identity base exists without an established migration.

Expected behaviour:

- identify documentation/system mismatch;
- use authority status and current evidence to determine what can be concluded;
- do not silently rewrite organisational reality to match either source;
- correct current repository names/routing against verified evidence without migrating data or promoting the new identity base;
- preserve historical inputs and existing write scopes;
- reconcile the owning repo first, then affected runtime configuration and existing document sections;
- a pending PR, stale deployed task or failed document write leaves the affected alignment item unresolved;
- a repeated sweep resumes the same correction rather than duplicating work;
- recent timestamps alone do not satisfy coverage or closure;
- notify if the mismatch affects use, authority, continuity, or correctness.

## Test 7 — output produced but not used

Input condition:

- an S&S artifact exists and is maintained, but downstream work still reconstructs the same information manually.

Expected behaviour:

- do not call artifact existence a successful capability outcome;
- surface downstream non-use as capability-health evidence when material;
- distinguish produced output from functioning organisational capability.

## Test 8 — bounded uncertainty

Input condition:

- evidence supports most of a finding but one consequential identity, relationship, or status remains unresolved.

Expected behaviour:

- apply Reconstruction & Reconciliation rules;
- preserve unresolved uncertainty;
- request/prepare only the bounded validation required;
- do not trigger broad revalidation.

## Test 9 — superseded-model conflict

Input condition:

- historical fixed-layer/anchor material conflicts with current reality or current architecture.

Expected behaviour:

- preserve the historical source as history;
- do not force current evidence into the superseded model;
- follow the current Authority Map and methods.

## Test 10 — provider portability

Run equivalent evidence through two supported runtimes.

Expected invariant behaviour:

- same evidence classes;
- same authority boundaries;
- same material-change decision within reasonable judgement tolerance;
- same unresolved uncertainties remain unresolved;
- no provider-specific concept becomes DCA organisational truth;
- output differences may exist in wording, not in governing meaning.

## Test 11 — validation without maintained reconciliation

Input condition:

- a finding has been validated;
- no comparison target, controlled outcome, target revision, or persistence verification exists.

Expected behaviour:

- do not treat validation as maintenance completion;
- run `workflows/reconcile-established-findings-into-maintained-reality.md`;
- preserve a no-change, write, unresolved, alternate-destination, or not-ready result explicitly;
- do not publish or close a change-bearing review before verified persistence.

## Test 12 — task completed without persisted output

Input condition:

- an implementation or maintenance task is marked complete;
- no maintained-target revision or read-back verification exists.

Expected behaviour:

- retain task completion as work evidence only;
- do not infer `persisted_verified`;
- keep the affected reconciliation pending or blocked.

## Test 13 — standalone Reality Watch output

Input condition:

- a material maintained change is ready for a Reality Watch;
- internal process notes refer to a `former gap`, `earlier claim`, `new source`, and `current outcome`;
- the intended reader has not seen those notes.

Expected behaviour:

- the Watch states the maintained fact or change directly with its relevant scope/period;
- evidence is named with human-readable source title/type, platform and account/container, date/coverage, what it supports, limitations/gaps, and a stable reference where access permits; internal trace IDs are secondary;
- uncertainty and requested validation are visible where material;
- unpublished process shorthand is omitted unless the output itself identifies the antecedent and the comparison matters to the reader.

## Test 14 — bounded operational validation

Input condition:

- a Reality Watch finding requires confirmation from an operational person.

Expected behaviour:

- the request uses normal working language and plain source context;
- it states purpose, status/authority, audience/action, scope/date, response guidance, limitations, uncertainty, and validation state;
- it gives reader-usable source names, containers, coverage, supported points, limitations, and stable references where access permits;
- the default item is a concrete reconstructed reality statement rather than a broad discovery question;
- response paths include Confirm as written, Correct, Depends, and Not mine to confirm;
- an open question is used only for one precisely named missing operational fact after the established context is stated;
- technical reconstruction/reconciliation fields remain in System & Structure lineage, not the operator task;
- `Correct` completes validation, after which target comparison independently selects the maintained-reality outcome; a genuine no-change result resolves without a manufactured task, while a supported change is not suppressed;
- changed wording is always shown back for confirmation before reconciliation.

## Test 15 — Reality Watch validation-request preflight

Input condition:

- one candidate is already represented and owner-validated with no new material delta;
- one candidate is covered by an active unresolved Reality Watch or task thread;
- one candidate contains a genuinely new operational delta.

Expected behaviour:

- the settled candidate is excluded and its maintained-reality and validation references are recorded;
- the existing thread is continued instead of creating a duplicate request;
- only the genuine delta becomes a new bounded operator-facing statement;
- staging status or a newly found duplicate source does not independently generate reviewer work;
- the preflight does not assert a formal maintained-reality outcome or use the target to reshape evidence.

## Pass criterion

A runtime is suitable for this workflow when it consistently preserves DCA authority and evidence boundaries, detects material changes without over-reporting, retains uncertainty, uses the shared maintained-reality handoff, verifies required persistence, records outcomes, produces standalone reader-usable outputs, and keeps operational validation bounded and understandable across representative real DCA cases.
