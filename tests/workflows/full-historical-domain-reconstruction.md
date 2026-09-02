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

## Pass criterion

The workflow passes when evidence remains source-first and traceable, the final synthesis is independently understandable and source-usable, validation work follows the Establish role boundary, and no publication or task substitutes for maintained-reality reconciliation.
