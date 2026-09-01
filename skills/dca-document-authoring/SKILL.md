---
name: dca-document-authoring
description: Use when creating, editing, restructuring, formatting, or finalising DCA documents. Turns source-grounded DCA content into professional native documents while preserving semantic hierarchy, current organisational authority, DCA design conventions, and document quality.
metadata:
  version: 0.2.0
---

# DCA Document Authoring

## Purpose

Turn approved or source-grounded DCA content into a professional, readable, structurally correct document.

This skill governs document construction.

It does not define DCA organisational reality, operational reality, roles, workflows, requirements, terminology, or policy.

## Core sequence

```text
Source-grounded content
→ semantic document structure
→ native document structure
→ proportionate DCA visual treatment
→ render / inspect
→ final document
```

Content correctness alone is not sufficient.

A document is not complete until its structure and rendered presentation are also correct.

## Authority

Apply authority in this order:

1. Explicit user or task instruction.
2. Designated current DCA source or approved content.
3. Supplied document template or reference for structure and style.
4. Current DCA design-output guidance.
5. `dca-design` for visual identity where available.
6. Runtime or platform defaults.

A document template may define presentation and semantic organisation without becoming authority for current DCA facts.

Neither this skill nor `dca-design` may invent or redefine organisational reality.

## Document construction rules

Preserve the meaning and relationships present in the source.

Translate semantic roles into native document structures.

Use:

- native document title styles
- native heading hierarchy
- native bulleted and numbered lists
- native tables where information is genuinely tabular or comparative
- native links
- intentional paragraph spacing
- proper indentation and nesting
- appropriate emphasis for governing rules, distinctions, warnings, or key statements
- headers, footers, page numbering, metadata, or navigation when appropriate to the document

Do not simulate structure using plain text.

Never use:

- typed hyphens as fake bullets
- typed numbering as fake numbered lists
- bold normal paragraphs as substitutes for headings
- repeated blank paragraphs for spacing
- aligned text as a substitute for tables
- Markdown syntax in a finished native document
- decorative formatting that has no semantic function

A structured document flattened into normal body text fails this skill.

## Preserve hierarchy

Before formatting, identify the semantic hierarchy of the content.

Typical roles include:

```text
Title
→ major sections
→ subsections
→ rules / principles
→ explanatory text
→ lists
→ sequences
→ examples
→ tables / comparisons
→ references
```

Do not flatten hierarchy during conversion between formats.

Do not promote minor content merely for visual effect.

Do not introduce sections, categories, stages, claims, or distinctions that are not supported by the source.

## Existing documents and references

When editing an existing document:

- preserve structure and formatting outside the requested edit
- do not rebuild the whole document for a targeted change
- preserve native document elements where possible
- maintain established DCA document patterns unless there is a reason to change them

When using an older document as a reference:

- reuse appropriate structure and visual treatment
- adapt the content to the current source
- do not carry obsolete facts, people, dates, workflows, terminology, links, statuses, or assumptions forward merely because they existed in the reference

## Reusable document patterns

If a current approved DCA pattern exists for the output type, reuse it.

Examples may include:

- internal method or specification
- operational document
- report
- handover
- SOP
- vacancy
- brief
- decision document

Patterns organise content; they do not create factual requirements.

When no approved pattern exists, create the first version intentionally as a potential reusable reference.

A first-build pattern becomes reusable only after it is accepted as such.

## DCA visual treatment

Use `dca-design` for visual identity where available.

For internal DCA documents, default to:

- restrained
- minimal
- highly readable
- strong hierarchy
- generous but efficient spacing
- limited colour
- DCA typography where supported
- functional rather than decorative visual elements

Visual treatment must support the document's meaning.

It must never override source content or semantic hierarchy.

### Approved internal document opening pattern

The default opening pattern for internal DCA methods, specifications, structural documents, and comparable working documents is:

```text
small official DCA logo
→ left-aligned title
→ compact metadata
→ document content
```

Apply the pattern as follows:

- use the official DCA logo once on the first page, small and subordinate to the title
- keep the logo left aligned with the document's main content axis and give it clear breathing room
- use a native document Title style for the title
- use Roboto Condensed for the title where supported
- keep the title left aligned
- set title indentation to zero, with no special, hanging, or first-line indent
- place compact document metadata directly beneath the title and align it to the same left axis
- continue the document body on the same primary left axis
- preserve the restrained internal hierarchy, DCA colour language, and semantic callouts established by the document type

The internal pattern should remain recognisably part of the same DCA visual family as the official external design system, but quieter and more operational in character.

A centred title, hero treatment, or separate cover-page composition is not the default for internal documents. Use those treatments only when the output is explicitly external, publication-like, presentation-like, or the task requires them.

## Uncertainty and incomplete information

Preserve uncertainty exactly where it exists.

Do not visually imply that a draft, assumption, proposed process, unresolved question, or unvalidated fact is confirmed.

Use appropriate labels such as `draft`, `proposed`, `unresolved`, `unknown`, or `TBD` only when supported by the source or task.

## Platform implementation

Use the best native structures available in the destination platform.

Examples:

Google Docs:

- native Title and Heading styles
- native lists
- native tables
- native links and supported smart elements

Word:

- native styles
- native lists
- native tables
- proper sections, headers, footers, fields, and navigation

Other document formats:

- preserve equivalent semantic structure wherever the platform supports it

Platform limitations must not silently flatten document semantics.

## Quality gate

Before completion, verify:

- all required source content is present
- no unsupported content has been introduced
- title is structurally a title
- heading hierarchy is coherent
- lists are native lists
- tables are native tables
- nesting and indentation are correct
- links are native and functional
- paragraph spacing is intentional
- no Markdown markers remain
- no fake bullets or fake numbering remain
- no empty paragraphs are being used as layout tools
- emphasis reflects meaning rather than decoration
- DCA visual treatment is consistent and proportionate
- the document is visually readable page by page
- no clipping, overlap, broken tables, awkward page breaks, or obvious layout defects remain

For internal documents using the approved opening pattern, also verify:

- the official DCA logo is small, first-page-only, and aligned to the main left axis
- the title uses native Title semantics, Roboto Condensed where supported, left alignment, and zero indentation
- metadata and body content follow the same primary left axis
- no centred or hero-style title treatment has been introduced without a justified output context

For layout-sensitive final documents:

```text
render
→ inspect every page
→ correct defects
→ render again
```

Do not declare the document finished before visual QA passes.

## Boundary

This skill owns document construction quality.

It does not own:

- organisational truth
- operational reconstruction
- requirement derivation
- DCA design-system definition
- websites or application interfaces
- presentation-specific design
- source approval

Those remain with the relevant DCA sources, methods, skills, and runtimes.
