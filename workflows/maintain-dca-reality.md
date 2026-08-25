---
document_type: dca_ai_workflow
status: current
scope: organisation-wide
workflow: maintain-dca-reality
provider_independent: true
---

# Maintain DCA Reality

## Purpose

Maintain DCA's current shared reality by detecting and processing materially new or changed evidence across two evidence views:

- **Operational Reality** — what changes in actual DCA domain work;
- **System & Structure Capability Reality** — what System & Structure actually does, maintains, changes, supports, depends on, enables, and whether that capability remains current, aligned, usable, monitored, and transferable.

This workflow is provider-independent. It defines DCA behaviour, not a ChatGPT-, Claude-, or model-specific prompt.

## Governing sources

Use the current DCA authority and method layer, including:

- DCA Operational Reality;
- DCA Derived Organisational Reality;
- DCA Structure Method — Reality to Requirements;
- DCA Reconstruction & Reconciliation Method;
- DCA Capability Reality foundation;
- DCA Authority Map;
- DCA System & Structure — Capability Reality;
- relevant current domain/system specifications where the evidence requires them.

## Evidence surfaces

Use relevant observable evidence from, where available:

- Google Drive;
- GitHub;
- public DCA Slack;
- Airtable and current system state;
- integrations, automations, and runtime evidence;
- downstream use of shared outputs.

## Workflow

```text
scheduled / explicit check
        ↓
identify materially changed evidence
        ↓
classify evidence
Operational / Capability / both
        ↓
reconstruct what the evidence supports
        ↓
reconcile identity, meaning, conflict, or state where needed
        ↓
compare with maintained current reality
        ↓
detect material change
        ↓
preserve provenance, authority, uncertainty, variation, conflict
        ↓
identify affected reality / dependency / capability health / architecture
        ↓
prepare required update or bounded validation
        ↓
notify only when material
```

## Operational Reality change criteria

Surface only meaningful changes such as:

- new operational evidence;
- correction or contradiction;
- changed workflow or dependency;
- new uncertainty or visibility gap;
- validation-status change;
- operational consequence that changes current shared understanding.

## System & Structure Capability Reality change criteria

Surface only material changes such as:

- a new, changed, or stopped recurring capability;
- architecture or authority drift;
- documentation/system mismatch;
- stale assumptions;
- unresolved dependency;
- automation or integration failure or unobserved behaviour;
- key-person continuity risk;
- repeated reconstruction that should become organisation-held;
- output produced but not actually used;
- downstream use/outcome evidence contradicting the intended benefit.

## Evidence boundaries

Keep explicit:

- artifact creation ≠ organisational adoption;
- GitHub commit ≠ organisational decision unless current authority supports it;
- Slack discussion ≠ validated organisational fact automatically;
- technical implementation ≠ organisational structure;
- tool presence ≠ demonstrated capability;
- activity ≠ successful outcome;
- AI output ≠ validated organisational truth.

## Method application

Apply the **Reconstruction & Reconciliation Method** when evidence is distributed, conflicting, duplicated, incomplete, or must become reusable shared information.

Apply the **Structure Method** only when sufficiently established reality justifies a new or changed organisational, information, structural, or system requirement.

Do not force current evidence into superseded fixed-layer, entry-point, anchor, or other historical models.

## Validation boundary

Do not request broad revalidation when only a bounded uncertainty needs confirmation.

Preserve unresolved uncertainty when evidence does not support a conclusion.

A finding may be prepared for human validation when its consequence or authority boundary requires it.

## Output

Notify only when materially changed reality exists.

Use only the headings that are relevant:

- Changed reality
- Evidence
- Conflict / uncertainty
- Validation status
- Capability / dependency / health impact
- Required reconciliation or next update

Keep Slack publication compact:

- do not insert a blank line after the title;
- do not insert blank lines between sections;
- place the first section heading immediately after the title;
- place each following section heading immediately after the preceding content;
- place bullets immediately under their heading;
- omit unused sections entirely instead of leaving visual space;
- use blank lines only when they carry meaning, not as decorative spacing.

No material change → no unnecessary report.

## Runtime independence

The same workflow may be executed by ChatGPT, Claude, another AI runtime, or a future orchestration layer, provided the runtime can satisfy the required source access, authority rules, validation boundaries, failure behaviour, and tests.

Runtime choice is an implementation decision, not part of DCA organisational architecture.
