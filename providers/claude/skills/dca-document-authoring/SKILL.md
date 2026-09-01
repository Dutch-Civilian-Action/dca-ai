---
name: dca-document-authoring
description: Claude runtime implementation of the canonical DCA document-authoring capability. Use for professional DCA document creation, restructuring, formatting, and final QA.
metadata:
  version: 0.1.0
  dca-skill: dca-document-authoring
  visual-dependency: dca-design
---

# DCA Document Authoring — Claude Implementation

## Purpose

Provide the Claude runtime implementation of the provider-independent DCA capability defined at:

`skills/dca-document-authoring/SKILL.md`

This file is an execution adapter.

It must not redefine the canonical DCA document-authoring rules, DCA organisational truth, or DCA design system.

## Runtime path

```text
DCA source-grounded content
→ canonical dca-document-authoring capability
→ this Claude implementation
→ Claude native document capabilities / available document tools
→ dca-design where visual treatment is required
→ rendered and verified document
```

## Required behaviour

Before creating or substantially restructuring a DCA document:

1. Apply the canonical `dca-document-authoring` rules.
2. Identify the destination format and the native structures it supports.
3. Preserve source hierarchy and semantic relationships.
4. Use native headings, lists, tables, links, sections, and other supported document elements rather than plain-text simulations.
5. Use the current DCA design organisation skill, `dca-design`, when DCA visual treatment is required and available.
6. Keep design treatment subordinate to source meaning and current DCA authority.
7. Render and inspect layout-sensitive final outputs before completion.
8. Repair structural or visual defects and verify again.

## Claude document tools

Use Claude's available native document-generation capabilities for the requested output type rather than defaulting to HTML when the requested result is a document.

Document requests include, where supported by the runtime:

- Word documents
- Google Docs
- PDFs
- reports
- internal methods and specifications
- SOPs
- handovers
- briefs
- vacancy documents
- other professional DCA document artifacts

Do not treat a document request as an interface, mockup, website, or HTML artifact request merely because `dca-design` contains web components or HTML assets.

For slides or presentations, use the appropriate presentation capability rather than this skill as the primary construction method. `dca-design` may still provide visual identity.

For a deliberately requested document-like HTML/web artifact, preserve the canonical semantic hierarchy and apply `dca-design`, but do not treat that derivative as the maintained native document unless the task explicitly makes HTML the primary artifact.

## Design dependency

`dca-design` provides visual identity and design-system guidance.

It does not provide organisational authority and does not replace the canonical document-authoring capability.

The versioned Claude provider snapshot of `dca-design` lives at `providers/claude/skills/dca-design/`.

If design guidance conflicts with current source-grounded DCA content or the canonical document-authoring rules, preserve current content and semantic structure.

## Completion gate

Do not report a document as finished until the canonical quality gate has passed.

For layout-sensitive output, completion requires:

```text
construct
→ render
→ inspect
→ repair if needed
→ render / inspect again
→ hand off
```

Correct text without correct native structure and readable rendering is not a completed DCA document.
