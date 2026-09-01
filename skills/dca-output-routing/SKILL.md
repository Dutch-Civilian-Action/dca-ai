---
name: dca-output-routing
description: Determine the correct DCA output family, editable master, implementation format, and useful derivatives before construction begins. Use when the requested output could be a document, presentation, spreadsheet, web artifact, interface/application, visual asset, or structured-data export.
metadata:
  version: 0.1.0
---

# DCA Output Routing

## Purpose

Choose **what kind of artifact should be created and in which native destination/format** before a construction or design capability takes over.

This skill owns routing only.

It does not define:

- organisational or operational truth;
- document construction quality;
- presentation design;
- spreadsheet schema or business logic;
- interface requirements;
- DCA visual identity;
- publication approval.

## Core sequence

```text
User intent / task requirement
→ explicit destination or constraint, if any
→ output family
→ editable master / implementation format
→ construction capability
→ dca-design where relevant
→ optional derivatives / exports
```

## Routing priority

Apply the following order.

### 1. Explicit user or task destination wins

When the requested format or platform is explicit, use it unless the runtime cannot support it or a higher-order safety/authority rule prevents it.

Examples:

```text
"Make a PowerPoint"
→ PPTX

"Put this in Google Docs"
→ Google Doc

"Create an Excel file"
→ XLSX

"Give me a PDF"
→ PDF

"Make an HTML version"
→ web artifact / HTML

"Build an interface"
→ interface/application
```

Do not silently substitute another format merely because another tool is easier to use.

### 2. Preserve an established destination

When editing or continuing an existing artifact, keep its current native platform unless the task explicitly asks for conversion or there is a justified platform constraint.

### 3. If unspecified, route from the work purpose

Determine the output family from what the user needs to do with the result, not merely from the shape of the source material.

## Output families

### Document

Use for maintained or formal prose-based material whose primary purpose is reading, reference, governance, instruction, reporting, or collaborative editing.

Examples:

- report;
- SOP;
- method;
- specification;
- policy;
- brief;
- handover;
- decision document;
- operator guide;
- vacancy document.

Construction owner: `dca-document-authoring`.

Default editable destination when no other constraint exists and the runtime can create it: **Google Docs** for maintained collaborative DCA documents.

Use DOCX when Microsoft compatibility is explicitly required or is the established destination.

PDF is normally a portable/final derivative of an editable master, unless the task explicitly requires PDF as the primary artifact.

### Presentation

Use when the result is primarily intended to be presented, walked through, pitched, briefed, or discussed visually in a sequence of slides.

Examples:

- board presentation;
- meeting deck;
- pitch deck;
- training slides;
- visual briefing.

Default editable destination when no other constraint exists and the runtime can create it: **Google Slides**.

Use PPTX when explicitly requested, required for compatibility, or already established.

Use the runtime's native presentation capability. `dca-document-authoring` is not the primary construction capability for slides.

### Spreadsheet

Use when the main work is structured rows/columns, calculation, filtering, sorting, reconciliation, import/export preparation, data entry, or repeated tabular maintenance.

Examples:

- tracker;
- register;
- analysis workbook;
- import table;
- reconciliation sheet;
- calculation model.

Default editable destination when no other constraint exists and the runtime can create it: **Google Sheets**.

Use XLSX when explicitly requested, required for compatibility, or already established.

Use CSV only when the task is specifically a flat-data interchange/export requirement rather than an editable workbook.

Do not create a document table when the operational purpose is actually spreadsheet work.

### Web artifact

Use for a **document-like, browsable web presentation** whose primary purpose is reading, understanding, navigating, or sharing rather than operating a system.

Examples:

- polished Claude Artifact version of an operator guide;
- browsable explainer;
- interactive handbook page;
- visual HTML version of a report;
- rich internal guide with anchors, collapsible sections, or copy controls.

Typical implementation:

- HTML/CSS/JS;
- Claude web artifact or equivalent runtime surface.

A web artifact may be a derivative of the same semantic source as a Google Doc, DOCX, or PDF.

For document-like web artifacts:

- preserve the semantic hierarchy and content-integrity rules of `dca-document-authoring`;
- apply `dca-design` for visual treatment;
- do not treat the HTML derivative as the maintained native document unless the task explicitly makes HTML the primary maintained artifact.

### Interface / application

Use when a person is meant to **operate**, not merely read.

Signals include:

- search;
- filter;
- enter or edit data;
- confirm;
- reconcile;
- submit;
- trigger an action;
- change state;
- manage records;
- work through an operational flow.

Examples:

- outreach workspace;
- Logistics console;
- contact lookup tool;
- reconciliation dashboard;
- shipment-management interface;
- operational intake UI.

Typical implementation:

- HTML/CSS/JS for a bounded prototype;
- React or the established production framework for a richer or production interface;
- the existing repository/application stack when working inside a live codebase.

`dca-design` supplies visual identity where relevant.

Do not route an operational interface through `dca-document-authoring` merely because it contains explanatory text.

### Standalone visual asset

Use when the primary deliverable is a visual rather than a maintained document or application.

Examples:

- diagram;
- illustration;
- poster;
- graphic;
- map visual;
- reusable vector asset.

Use the appropriate image/vector/native visual capability and apply `dca-design` where DCA identity is relevant.

### Structured data / export

Use when the requested deliverable is primarily machine-readable or intended for interchange rather than human authoring.

Examples:

- CSV;
- JSON;
- import payload;
- export bundle.

Preserve the schema and destination requirements supplied by the task. Do not add presentation formatting that changes the data contract.

## Web artifact versus interface

Keep these distinct.

```text
WEB ARTIFACT
read
navigate
understand
share

INTERFACE / APP
search
filter
enter
change
confirm
act
operate
```

Both may use HTML, CSS, JavaScript, or React. The implementation technology does not determine the artifact family; the **purpose of the output** does.

## One source, multiple outputs

A single source may legitimately produce more than one artifact when the outputs serve different purposes.

Example:

```text
DCA operator-guide content
→ Google Doc maintained master
├→ PDF portable/final version
└→ HTML web artifact for easy browsing
```

Another example:

```text
validated briefing content
→ Google Slides maintained presentation
└→ PDF presentation export
```

Do not force the user to choose one format forever when a maintained master plus useful derivative is the better fit.

## DCA default destination rule

When the user has not named a platform, no existing destination controls the task, and the runtime supports the destination, prefer collaborative maintained DCA artifacts in Google Workspace:

```text
maintained document → Google Docs
maintained presentation → Google Slides
maintained spreadsheet → Google Sheets
```

Then create portable or compatibility derivatives when needed:

```text
document → PDF / DOCX where useful
presentation → PDF / PPTX where useful
spreadsheet → XLSX / CSV where useful
```

If the preferred destination is unavailable in the current runtime, do not pretend it was created. Use the closest supported native artifact only when that still satisfies the task, and state the limitation when it materially changes the requested result.

## Construction boundaries

After routing:

- document → `dca-document-authoring`;
- presentation → runtime native presentation capability;
- spreadsheet → runtime native spreadsheet capability;
- web artifact → semantic web construction, using `dca-document-authoring` principles when it is document-like;
- interface/application → appropriate web/application construction capability and production stack;
- standalone visual → appropriate visual capability;
- structured data/export → schema-appropriate data generation.

Use `dca-design` across DCA-branded visual outputs where relevant. `dca-design` does not choose the artifact family and does not override explicit destination requirements.

## Ambiguity rule

If the request is sufficiently clear from purpose, proceed without asking a format question.

Ask only when the unresolved choice would materially affect how the user can use or maintain the result.

Examples where clarification may matter:

- whether a final external report needs an editable master as well as PDF;
- whether a "dashboard" means a static visual summary or an operational interface;
- whether a "guide" should be maintained collaboratively or only published as a fixed artifact.

Do not ask merely because several technically possible file formats exist.

## Anti-patterns

Do not:

- default everything to HTML because web components are available;
- default everything to PDF because it looks final;
- turn spreadsheet work into document tables;
- turn a presentation request into a prose report;
- treat an HTML operator guide as an operational application merely because it is interactive;
- use `dca-document-authoring` as the primary constructor for interfaces or slides;
- let `dca-design` decide organisational content or output purpose;
- create parallel maintained masters without a reason.

## Boundary

This skill answers:

> **What kind of output should be created, where should the editable/operational master live, and which construction capability should take over?**

It does not answer what DCA organisational reality is, what the content should claim, or how an implementation-specific workflow must operate.
