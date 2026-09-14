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
- Practical Evidence → Validation → Live Use Loop, including operational-review and Establish-task boundaries:
  `Dutch-Civilian-Action/dca-architecture/organisation/shared-foundations/evidence-validation-to-live-use-loop.md`
- Established finding → maintained reality workflow:
  `Dutch-Civilian-Action/dca-ai/workflows/reconcile-established-findings-into-maintained-reality.md`
- Shared Drive routing logic:
  `Dutch-Civilian-Action/dca-architecture/organisation/drive-architecture/routing-logic.md`

## Current organisation-facing reality

### Current Operational Reality

Primary current source:

- **DCA Operational Reality — 2nd Pass**
  - Google Drive document: `https://docs.google.com/document/d/11_JG166GB_OUydQdzHU7dMUYOCJUpxj_yFLkJgOOOLU/edit`
  - Document ID: `11_JG166GB_OUydQdzHU7dMUYOCJUpxj_yFLkJgOOOLU`

Use this source for claims about what currently happens in DCA domain work, including current workflows, dependencies, roles as observed in practice, variation, exceptions, validation state, uncertainty, pilots, and proposals. Preserve the source's explicit validation, evidence, uncertainty, variation, pilot, and proposal statuses.

Do not select an older or similarly titled Operational Reality document merely because it appears in search results. If the current source above is unavailable, preserve that access gap rather than silently substituting a historical copy as current reality.

If the current Operational Reality is accessible but insufficient for a requested current operational fact, broaden to relevant current evidence and apply the Reconstruction & Reconciliation Method as needed. Do not treat a derived inference document as a substitute for missing operational evidence.

When the canonical current Operational Reality source changes, update this pointer here so runtimes do not rely on title matching or memory to determine which document is current.

### Current System & Structure Capability Reality

- **DCA System & Structure — Capability Reality**
  - Google Doc: `https://docs.google.com/document/d/1F9STwBk0S0nibS8AtFTSFgRxcXLAnL5eWEnjCieLkzw/edit`
  - Document ID: `1F9STwBk0S0nibS8AtFTSFgRxcXLAnL5eWEnjCieLkzw`

This is the maintained capability view. The reconstruction dossier `1LRgdRrxA1nQGyTGh6hKxq_7nvEVtfs8VDIGCemQ5xic` is supporting working evidence, not this target.

### Derived Organisational Reality

Current working inference source:

- **DCA Derived Organisational Reality**
  - Google Drive document: `https://docs.google.com/document/d/17AGt3ZqsQ8YChjJLlArLtjMechQai6xly3IKXBUnVfQ/edit`
  - Document ID: `17AGt3ZqsQ8YChjJLlArLtjMechQai6xly3IKXBUnVfQ`

Use DCA Derived Organisational Reality as a working evidential inference source only. It is not the Operating Model and does not override the current Operational Reality source or canonical architecture.

Do not use Derived Organisational Reality as the default fallback when current Operational Reality lacks a current operational detail. Missing or conflicting operational detail should be reconstructed from relevant current evidence under the Reconstruction & Reconciliation Method. Derived Organisational Reality may then be used for the organisational findings or inferences it explicitly supports.

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

## Method boundaries

Use the Structure Method when asking:

**What does relevant current reality justify DCA needing?**

Relevant reality may be Operational Reality, Capability Reality, or both.

Use the Reconstruction & Reconciliation Method when asking:

**How does distributed organisational or operational evidence, or live capture, become reliable reusable shared organisational information?**

Use the Evidence → Validation → Live Use Loop for the practical handoff into operational review, the Establish task structure, role-separated validation work, routing, implementation, testing, and return to live use.

After a finding is sufficiently established, validation alone does not make it maintained reality. Use `workflows/reconcile-established-findings-into-maintained-reality.md` to resolve the authoritative target, compare, classify, route, persist any justified change, verify it, and record the result.

Full Historical Reconstruction invokes that handoff only after source-first reconstruction, self-evaluation, and required human validation. Maintain DCA Reality invokes the same handoff for incremental candidates and pending feedback corrections.

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

DCA agents, skills, workflows, authority rules, and tests should remain provider-independent wherever practical.

Current runtime roles are:

- **Claude — primary operational DCA AI runtime/interface.** Claude is the default organisation-facing runtime for operational AI capabilities, including intake and retrieval where the relevant capability has been sufficiently tested and validated.
- **ChatGPT — current System & Structure development, reconstruction/reconciliation, testing, and monitoring environment.** ChatGPT also runs bounded S&S workflows where appropriate, including the current DCA Reality Watch implementation.
- **Airtable Omni — current embedded testing runtime where direct Airtable system access is useful.** The current example is Relationship Data Agent reconciliation testing against `2 | DCA Relationships & Workflows`.

These are current implementation roles, not organisational authority or permanent architecture.

The Relationship Data Agent and `reconcile-relationship-data` workflow remain provider-independent. Airtable Omni currently tests the behaviour; Claude is the intended operational runtime/interface for intake and retrieval once the capability satisfies its testing and validation boundary.

A bounded workflow may remain on ChatGPT, run in Claude, use Airtable Omni for embedded testing, move to another suitable runtime, or use more than one runtime where justified by actual requirements.

**Runtime selection is an implementation decision, not part of DCA organisational authority.**

Provider-specific prompts, scheduled tasks, tool bindings, packaging, and configuration must implement provider-independent DCA behaviour rather than redefining it.

See:

- `providers/runtime-selection.md`
- `providers/claude/README.md`
- `providers/chatgpt/dca-reality-watch.md`
- `providers/airtable-omni/relationship-data-agent.md`
- `workflows/maintain-dca-reality.md`
- `workflows/reconcile-relationship-data.md`

## Airtable workspace and base identity

When a routed destination is an Airtable base, resolve which workspace and base it actually is from `airtable-workspace-map.md`, not from a document title, a plugin's historical description, or search ranking. That file identifies current routing destinations and adjacent migration boundaries (including the canonical `DCA Warehouse & Logistics` base and the staging-only `DCA Evidence & Reconciliation` base) and the non-production `DCA Dev/Test` workspace's bases, which must never be selected for production work.

## Current technical implementation record

- **DCA AI & Shared Operational Reality — Current Technical Implementation**
  - Google Doc: `https://docs.google.com/document/d/11u_vHjYJ8GHfG3rrDcbi6iJ2PKcV_1rByUf1-9i4294/edit`
  - Document ID: `11u_vHjYJ8GHfG3rrDcbi6iJ2PKcV_1rByUf1-9i4294`

This is a maintained reader-facing implementation summary. `dca-ai` remains the version-controlled implementation source; `dca-architecture` governs architecture. Compare repository configuration with verified runtime evidence before refreshing the summary. Record reviewed repository revisions and preserve implementation, deployed configuration, demonstrated use and unresolved validation as distinct states. A recent document edit or repo commit alone does not establish alignment.

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
