---
document_type: dca_ai_workflow_test_spec
status: current
workflow: full-historical-domain-reconstruction
provider_independent: true
---

# Tests — Full Historical Domain Reconstruction

## Purpose

Verify that a complete reconstruction produces a source-first evidence graph plus a standalone, reader-ready synthesis and role-separated validation/reconciliation work.

## Test 1 — durable standalone synthesis

Input:

- a sufficiently investigated reconstruction run with detailed Airtable lineage;
- an intended DCA audience that has not followed the run.

Expected:

- a durable synthesis is produced in addition to the concise chat/task handoff;
- `dca-document-authoring` governs native construction and quality;
- the opening identifies purpose, status/authority, audience/action, domain/time/source coverage, validation boundaries, limitations, and gaps;
- confirmed, validation-pending, uncertain, historical, and proposed material remain distinguishable.
- process-maintainer fields, target revisions, and persistence mechanics remain in a linked technical handoff unless the named audience is explicitly a process maintainer.

## Test 2 — reader-usable source guide

Input:

- findings currently linked only to Evidence IDs and Reconstruction Object IDs.

Expected:

- the synthesis contains human-readable source names/titles, platform and account/container, date/coverage, supported points, limitations, and stable references where access permits;
- internal IDs remain secondary trace keys;
- no substantive claim is presented with an opaque ID as its only citation.

## Test 3 — no unpublished process shorthand

Input:

- private reconstruction notes use `former gap`, `earlier claim`, `new source`, `remaining issue`, and `this run`;
- the intended reader has not seen the referenced earlier state.

Expected:

- the synthesis states audience-visible facts directly;
- comparative wording is retained only when the antecedent, relevant period/source, and reader value are explicit in the artifact;
- private drafting history is not presented as reader context.

## Test 4 — Establish task reuse

Input:

- the run requires operational input, human validation, maintained-reality reconciliation, and a live-use test.

Expected:

- the workflow creates or reuses the Establish parent and A–E/C1–C3 topology from self-evaluation and routing;
- operational people receive only bounded operational input/review/confirmation/use actions;
- System & Structure retains reconstruction, comment processing, reconciliation, and technical detail;
- no duplicate standalone technical validation task is assigned to the operator.

## Test 5 — huddles cannot disappear behind broad Slack coverage

Input:

- a domain channel contains a material huddle between operational owners;
- the reconstruction-owner DM contains the huddle canvas or transcript;
- a later Reality Watch finding cites that source;
- the reconstruction run otherwise contains many Slack messages and threads.

Expected:

- channel, DM, canvas/transcript and maintained-reality provenance routes are checked;
- the huddle is represented in the huddle coverage ledger by stable source identifiers;
- material transcript segments become Evidence and Evidence Links for this domain, even when the source was already processed by another run;
- derivative copies are not counted as independent corroboration;
- broad Slack record counts do not permit a complete-coverage claim while the huddle is absent.

## Test 6 — reviewed low-content huddle remains auditable

Input:

- a discovered huddle transcript contains too little intelligible content to support a claim.

Expected:

- the huddle receives a `reviewed_insufficient_content` coverage outcome and source-register record;
- no unsupported Reconstruction_Object is created;
- the absence of a derived finding is distinguishable from an unprocessed source gap.

## Test 7 — primary display-name invariant

Input:

- an Evidence or Evidence Link write includes valid substantive fields and relationships but omits its manual primary/display field.

Expected:

- the batch fails the post-write quality gate;
- coverage does not advance;
- a deterministic display name is written and the zero-blank check passes before the run proceeds.

## Test 8 — cross-run and maintained-reality back-propagation

Input:

- a source informed maintained Operational Reality or a different domain reconstruction but is absent from the active domain run.

Expected:

- the underlying source is backfilled or cross-linked when relevant;
- the active run receives its own domain-appropriate Evidence interpretation where an existing bounded excerpt describes a different claim;
- the source is not treated as new independent corroboration;
- the reconstruction synthesis and validation material receive reader-usable source context.

## Test 9 — reconstruction handoff does not recreate settled validation

Input:

- reconstruction staging contains candidates marked as needing owner validation;
- some are already represented and owner-validated in current Operational Reality;
- one is already covered by an active unresolved review thread;
- one contains a genuinely new operational delta.

Expected:

- the post-self-evaluation validation-request preflight excludes the settled candidates and records their references;
- the active thread is continued instead of duplicated;
- only the genuine delta becomes a new bounded operator-facing validation statement;
- current maintained reality is not used to reshape the reconstruction or to assert a formal reconciliation outcome before required validation.

## Test 10 — governing access and revision gaps

Input: governing files are initially inaccessible; later they become readable from an attachment whose revision is unknown.

Expected: the runtime records actual access/read history, respects the task's inventory-only fallback while required text is unavailable, and reassesses affected earlier work after access returns. Unknown revision remains a provenance gap; it does not force readable text to be treated as unavailable. No SHA or single root cause is invented.

## Test 11 — intended unloading versus reported completion

Input: one message says a person will unload; another describes intended travel after unloading; a separate fixture reports unloading completed.

Expected: the first two support plans only unless additional context establishes execution; the third supports reported completion with its attribution limits. A second-hand label or grammatical tense alone does not decide event state.

## Test 12 — consistent checkpoint exports

Input: an earlier export carries an unresolved source-total discrepancy; a later owner answer accepts the line sum, and additional evidence is incorporated.

Expected: all current exports and run coverage refer to one identified checkpoint; the accepted quantity stays numeric; original figures remain labelled source history. No current paragraph says incorporated evidence is pending or an answered discrepancy is unresolved. Saved-file row/source/object alignment and formula/error checks run. A later source update makes the old export a dated snapshot, not proof its earlier preflight was defective.

## Test 13 — correction propagation preserves original evidence

Input: an object has been corrected from completed to planned, while its evidence summary and run coverage still imply completion.

Expected: the dependent current summaries/statuses are reconciled within scope, original excerpts are unchanged, and superseded interpretations remain labelled history. “None found in the inspected sources” does not become universal non-existence. This check does not claim complete source coverage.

Tests 10–13 are added regression specifications; adding them does not record a successful runtime execution.

## Pass criterion

The workflow passes when evidence remains source-first and traceable, huddle coverage and post-write invariants are explicit, cross-run provenance is reconciled, the final synthesis is independently understandable and source-usable, validation requests pass the delta-only anti-duplication preflight and follow the Establish role boundary, and no publication or task substitutes for maintained-reality reconciliation.
