---
document_type: dca_ai_current_authority_context
status: current
scope: all_dca_ai
---

# Current DCA Authority Context

This file is an AI-facing pointer map. It does not replace the underlying sources.

## Canonical architecture

- DCA authority map:
  `Dutch-Civilian-Action/dca-architecture/organisation/shared-foundations/authority-map.md`
- Capability Reality foundation:
  `Dutch-Civilian-Action/dca-architecture/organisation/shared-foundations/capability-reality.md`
- Current Structure Method:
  `Dutch-Civilian-Action/dca-architecture/organisation/shared-foundations/reality-to-requirements-method.md`
- Current Reconstruction & Reconciliation Method:
  `Dutch-Civilian-Action/dca-architecture/organisation/shared-foundations/reconstruction-reconciliation-method.md`
- Shared Drive routing logic:
  `Dutch-Civilian-Action/dca-architecture/organisation/drive-architecture/routing-logic.md`

## Current organisation-facing reality

Use the current DCA Operational Reality source for claims about what happens in domain work and preserve its explicit validation, evidence, uncertainty, variation, pilot, and proposal statuses.

When reasoning about System & Structure itself, do **not** limit the evidence base to domain Operational Reality or intended role descriptions.

Reconstruct and monitor **System & Structure Capability Reality** from relevant observable evidence, including where appropriate:

- Google Drive artifacts, revisions, routing, and maintained shared assets;
- GitHub commits, ADRs, architecture/specification changes, and repository state;
- Slack alignment, validation, correction, dependency, publication, and use evidence;
- Airtable/system state, reconciliation, integrations, automations, monitoring, and failures;
- downstream evidence that other DCA work retrieves, uses, depends on, corrects, or ignores S&S outputs.

Preserve these distinctions:

- artifact creation ≠ organisational adoption;
- GitHub commit ≠ organisational decision unless current authority supports it;
- Slack discussion ≠ validated organisational fact automatically;
- technical implementation ≠ organisational structure;
- tool presence ≠ demonstrated capability;
- activity ≠ successful outcome;
- intended mandate ≠ current capability reality.

Use DCA Derived Organisational Reality as a working evidential inference source only. It is not the Operating Model.

## Method boundaries

Use the Structure Method when asking:

**What does relevant current reality justify DCA needing?**

Relevant reality may be Operational Reality, Capability Reality, or both.

Use the Reconstruction & Reconciliation Method when asking:

**How does distributed organisational or operational evidence, or live capture, become reliable reusable shared organisational information?**

System support may move forward when the relevant requirement is sufficiently established. Do not impose an organisation-wide waterfall.

## Capability monitoring

AI may compare current S&S evidence across sources to identify material changes such as:

- changed or stale architecture;
- documentation/system mismatch;
- authority drift;
- unresolved dependency;
- automation/integration failure;
- key-person continuity risk;
- outputs that are produced but not actually used;
- capability changes not yet reflected in shared documentation.

Surface material findings rather than generating exhaustive activity logs.

## Runtime boundary

DCA capabilities, workflows, authority rules, and tests should remain provider-independent wherever practical.

For System & Structure, ChatGPT is currently used as the primary development and live-testing environment for architecture work, reconstruction, reconciliation, workflow design, testing, capability monitoring, and early operational execution where appropriate.

This is a current implementation fact, not permanent architecture.

A validated workflow may remain on ChatGPT, move to Claude, move to another suitable runtime, or use more than one runtime where there is a justified operational reason.

**Runtime selection is an implementation decision, not part of DCA organisational authority.**

Provider-specific prompts, scheduled tasks, tool bindings, and configuration must implement the provider-independent workflow rather than redefining it.

See:

- `workflows/maintain-dca-reality.md`
- `providers/runtime-selection.md`
- `providers/chatgpt/dca-reality-watch.md`

## Working sources

Working organisational plans, capability reconstructions, workflow reconstructions, concept models, and structural-alignment material may inform reasoning but do not independently become architecture.

Examples currently include:

- DCA System & Structure — Organisation-Wide Plan
- DCA Organisational Concepts & Relationships
- current S&S Capability Reality / monitoring outputs

## Superseded predecessor material

`DCA Workflow-Based Structural Alignment Logic` is no longer an active current method. Its useful workflow/dependency/consequence/function/requirement logic is incorporated into the current Structure Method.

Do not apply its older principle “System Support Comes Later.” Use instead:

**System support follows the relevant requirement once that requirement is sufficiently established.**

## Historical / non-current structural sources

Do not treat the following as current structural authority:

- DCA Operating Model — From Circles to System Layers
- old Definitions — Core / Extended
- old fixed-layer Structure Method
- old Structure / Layer / Pilot templates
- archived System Logic — Overview
- archived DCA System — Airtable Schema
- DCA System Builder v2 — Gem Instructions
- historical pre-reality-first skills preserved under `skills/legacy/`

These sources may be consulted for history, prior implementation logic, or reusable distinctions only after their status is made explicit.

## Short rule

When current reality and an old model disagree, do not force current reality back into the old model.

When information or capability reality is distributed or conflicting, do not resolve uncertainty silently. Preserve provenance, preserve what kind of evidence it is, apply the Reconstruction & Reconciliation Method, and only persist conclusions that satisfy the relevant validation boundary.
