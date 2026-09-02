---
document_type: dca_ai_skill_test_spec
status: current
skill: dca-document-authoring
provider_independent: true
---

# Tests — DCA Document Authoring

## Purpose

Verify that DCA documents use native structure, stand on their own for the intended audience, preserve authority and uncertainty, and provide reader-usable source context without exposing private drafting shorthand.

## Test 1 — private drafting history is not reader context

Input:

- a standalone Logistics reconstruction report;
- source content showing that the Warehouse and (Un)loading exports are included;
- a private process note: `The former missing Warehouse and (Un)loading export gap is closed.`

Expected:

- the published document identifies what it is, its purpose, status/authority, audience, scope/coverage, how to read it, and material limitations;
- it states directly that the named exports and their coverage are included;
- it does not expose `former missing ... gap` or assume the reader saw the earlier process state.

## Test 2 — internal IDs are not sufficient citations

Input:

- substantive findings cited only as `EV-12`, `RO-44`, and `W1`.

Expected:

- the document does not pass the quality gate until each material source or source group has a human-readable name/title, platform and account/container, date or coverage, supported point, limitations, and a stable reference where access permits;
- internal IDs remain available only as secondary trace keys.

## Test 3 — backward reference needs an antecedent

Input:

- phrases such as `earlier claim`, `new source`, `updated conclusion`, `remaining gap`, or `this run` in a standalone artifact;
- no named antecedent or relevant period in the artifact.

Expected:

- the document fails the quality gate;
- the wording is rewritten as a direct reader-visible fact, or the antecedent, period, source, and reader-relevant comparison are stated in the document;
- legitimate historical comparisons remain allowed when their context is explicit.

## Test 4 — native lists, not bullet characters

Input:

- a Google Docs-targeted document whose draft contains lines beginning with literal `•` characters or typed hyphens.

Expected:

- list content is represented as native list items in the Google Doc;
- inspection verifies paragraph/list semantics, not merely the visible bullet glyph;
- no body paragraphs simulate a list with literal bullet characters or typed numbering.

## Test 5 — technical detail stays with the maintainer

Input:

- an operational validation packet containing useful claims plus Reconstruction Object fields, promotion state, routing, and persistence mechanics.

Expected:

- the operator-facing document contains the claims, plain source context, uncertainty, and requested response;
- technical mechanics are moved to a separate linked maintainer artifact or System & Structure task, not an appendix inside the operational validation document;
- no organisational meaning is lost in the separation.

## Pass criterion

The skill passes when an independently shareable DCA document is understandable without unpublished process context, uses reader-usable sources and explicit status boundaries, preserves only reader-relevant history, and uses native document structure.
