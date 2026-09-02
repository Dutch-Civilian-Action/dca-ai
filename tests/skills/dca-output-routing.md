---
document_type: dca_ai_skill_test_spec
status: current
skill: dca-output-routing
provider_independent: true
---

# Tests — DCA Output Routing

## Purpose

Verify that DCA output routing chooses the artifact family from user intent and work purpose, preserves explicit destinations, keeps HTML web artifacts available without making HTML a universal fallback, and keeps interfaces distinct from document-like web outputs.

## Test 1 — explicit PowerPoint

Request: `Make a PowerPoint for the board.`

Expected:

- family: presentation;
- destination: PPTX;
- presentation capability is primary;
- `dca-design` may apply;
- no document or HTML substitution.

## Test 2 — maintained SOP without explicit format

Request: `Create the canonical Logistics SOP so we can maintain it.`

Expected:

- family: document;
- default maintained destination: Google Docs when the runtime supports creation there;
- `dca-document-authoring` governs construction;
- `dca-design` governs visual treatment;
- PDF may be a derivative, not the only maintained source.

## Test 3 — explicit PDF

Request: `Give me a PDF version of this approved report.`

Expected:

- family: document;
- PDF is produced as requested;
- if an editable master already exists, preserve it;
- do not invent a second maintained master.

## Test 4 — maintained tracker

Request: `Build a tracker we can update every week.`

Expected:

- family: spreadsheet;
- Google Sheets preferred when available;
- XLSX acceptable when explicitly required or runtime-limited;
- no document-table substitution.

## Test 5 — HTML version of a guide

Request: `Make an HTML version of this operator guide, like a Claude Artifact.`

Expected:

- family: web artifact;
- HTML/CSS/JS is valid;
- `dca-document-authoring` semantic/content-integrity principles apply because the artifact is document-like;
- `dca-design` applies visually;
- the output is not misclassified as an operational interface.

## Test 6 — canonical guide plus Claude version

Request: `Give me the canonical guide and a nice Claude version.`

Expected:

- maintained document master plus web-artifact derivative;
- Google Docs preferred for the maintained document when available;
- HTML/Claude Artifact allowed as the browsing derivative;
- both derive from the same supported semantic source.

## Test 7 — outreach interface

Request: `Build an interface where Bas can search organisations, see outreach state, and update records.`

Expected:

- family: interface/application;
- HTML/React/established application stack selected based on scope;
- operational actions distinguish it from a web artifact;
- `dca-design` applies;
- `dca-document-authoring` is not the primary constructor.

## Test 8 — static dashboard ambiguity

Request: `Make a dashboard showing the current shipment picture.`

Expected:

- determine whether purpose is static/browsable visual reporting or operational interaction;
- if the request contains no operating actions and purpose remains materially ambiguous, ask one focused clarification;
- do not assume "dashboard" always means application.

## Test 9 — explicit Google Sheet when connector unavailable

Request: `Put this reconciliation table in Google Sheets.`

Runtime condition: no Google Sheets write capability is available.

Expected:

- do not claim a Google Sheet was created;
- do not silently replace it with HTML;
- use the closest supported workbook only if that still satisfies the task and surface the materially relevant limitation.

## Test 10 — existing Word document edit

Request: `Update the attached Word handover with these corrections.`

Expected:

- preserve existing document family and DOCX destination;
- use `dca-document-authoring`;
- do not migrate to Google Docs merely because it is the DCA collaborative default.

## Test 11 — presentation source is long prose

Request: `Turn this 12-page report into a presentation for Friday's meeting.`

Expected:

- family follows intended use: presentation;
- source shape does not force document output;
- presentation capability is primary;
- `dca-design` applies.

## Test 12 — CSV export

Request: `Export these validated contact rows as CSV for import.`

Expected:

- family: structured data/export;
- preserve field/schema contract;
- no decorative or document formatting added;
- CSV is not treated as a maintained spreadsheet unless separately requested.

## Test 13 — existing operational Canvas

Request: `Update the Logistics Slack Canvas with this validated operational description.`

Expected:

- family: document;
- existing Canvas destination is preserved;
- `dca-document-authoring` governs standalone-reader context, source visibility, semantic headings, and real supported list structures;
- the Canvas is not flattened into chat prose and does not become a second canonical master when a maintained source already exists.

## Pass criterion

Routing passes when explicit destinations are honoured, purpose determines the family when unspecified, maintained Google Workspace defaults are used only when supported, collaborative text canvases receive document-authoring safeguards, document/presentation/spreadsheet construction remains separated, HTML web artifacts remain first-class, operational interfaces remain distinct from document-like HTML, and no runtime pretends to create an unavailable destination.
