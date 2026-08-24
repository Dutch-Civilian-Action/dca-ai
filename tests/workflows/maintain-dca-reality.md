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
- do not silently choose the newer or more detailed source;
- notify because current reality may materially change.

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

- current system behaviour and current documentation disagree.

Expected behaviour:

- identify documentation/system mismatch;
- use authority status and current evidence to determine what can be concluded;
- do not silently rewrite organisational reality to match either source;
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

## Pass criterion

A runtime is suitable for this workflow when it consistently preserves DCA authority and evidence boundaries, detects material changes without over-reporting, retains uncertainty, and produces usable bounded findings across representative real DCA cases.
