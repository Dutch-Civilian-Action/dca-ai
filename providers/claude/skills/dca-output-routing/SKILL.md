---
name: dca-output-routing
description: Claude runtime adapter for the canonical DCA output-routing capability. Use internally to choose the correct output family and native destination before construction begins.
user-invocable: false
metadata:
  version: 0.1.0
  dca-skill: dca-output-routing
---

# DCA Output Routing — Claude Implementation

## Purpose

Implement the provider-independent routing rules defined at:

`skills/dca-output-routing/SKILL.md`

This adapter decides which Claude/runtime construction path should take over. It must not redefine the canonical routing rules, DCA organisational truth, or DCA visual identity.

## Runtime sequence

```text
user request
→ apply canonical dca-output-routing
→ resolve explicit format/platform or infer output family from purpose
→ choose the native Claude/connected-app capability that can actually produce it
→ hand off to the relevant construction capability
→ apply dca-design where visually relevant
→ create derivatives only when justified
```

## Claude routing

### Document

Use Claude's available native document-generation or connected Google Docs capability.

Apply `dca-document-authoring` as the construction standard.

Typical outputs:

- Google Docs when a connected/native Google Docs write path is available and the task calls for a maintained collaborative DCA document;
- DOCX when requested or when the runtime's native file-generation path is the appropriate editable result;
- PDF as requested or as a final/portable derivative.

Do not silently claim a Google Doc was created if the connected runtime cannot create it.

### Presentation

Use Claude's native presentation/slide capability or connected Google Slides capability where available.

Typical outputs:

- Google Slides for maintained collaborative DCA presentations when supported;
- PPTX when requested or when the available presentation runtime produces PPTX;
- PDF as a derivative where useful.

Do not route slides through `dca-document-authoring` as the primary constructor.

### Spreadsheet

Use Claude's native spreadsheet/file capability or connected Google Sheets capability where available.

Typical outputs:

- Google Sheets for maintained collaborative DCA spreadsheet work when supported;
- XLSX when requested or when the native runtime path produces Excel workbooks;
- CSV only for deliberate flat-data interchange/export.

Do not replace spreadsheet work with a document table merely because a document tool is available.

### Web artifact

Use Claude Artifacts / HTML-CSS-JS when the user wants a rich browsable document-like web output.

This branch intentionally preserves outputs such as:

- an HTML version of a DCA operator guide;
- a polished browsable internal explainer;
- a document-like Claude Artifact;
- a report rendered as a rich web artifact.

When the web artifact is document-like:

- preserve `dca-document-authoring` semantic hierarchy/content-integrity principles;
- apply `dca-design` for DCA visual treatment;
- keep it distinct from an operational interface/application;
- do not silently replace the maintained native document with HTML unless HTML is explicitly the primary artifact.

### Interface / application

Use Claude Code, HTML/CSS/JS, React, or the established production stack depending on scope and repository context.

Route here when the user needs to operate: search, filter, enter, update, confirm, reconcile, submit, trigger, or manage state.

Apply `dca-design` where relevant.

Do not treat an interface as a document merely because it includes explanatory content.

### Standalone visual

Use the available image/vector/visual-generation path appropriate to the requested output.

### Structured data/export

Use native file/data generation and preserve the requested schema/contract.

## Connected-app rule

A preferred DCA default such as Google Docs, Google Slides, or Google Sheets is a routing preference, not permission to pretend a connected write exists.

When a connected Google destination is available, use it when the canonical routing rules choose that maintained destination.

When it is unavailable:

- use a supported native file equivalent only if it still satisfies the request;
- tell the user when the destination difference materially matters;
- do not create HTML merely to avoid the native-format limitation.

## Explicit request examples

```text
"Make me a PowerPoint"
→ presentation → PPTX

"Put this in a Google Doc"
→ document → Google Docs if the connected write is available

"Build a tracker I can maintain"
→ spreadsheet → Google Sheets if available, otherwise the closest supported workbook after applying the canonical rule

"Make an HTML version of this guide"
→ web artifact → HTML/CSS/JS + document semantics + dca-design

"Build an outreach interface for Bas"
→ interface/application → appropriate interactive web stack + dca-design

"Give me the canonical guide and a nice Claude version"
→ document maintained master + web-artifact derivative
```

## Boundary

This adapter chooses and invokes the correct construction path. It does not decide organisational facts, invent missing content, or redefine the purpose of `dca-document-authoring` or `dca-design`.
