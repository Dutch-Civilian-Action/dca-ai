---
document_type: dca_ai_source_routing
status: current-testing
scope: all_dca_ai
provider_independent: true
---

# DCA Source Routing

## Purpose

Route DCA questions and actions to the smallest sufficient source set before retrieving or interpreting information.

This file defines provider-independent source-selection behaviour. Provider implementations may package or trigger this behaviour, but must not redefine it.

Use `current-authority.md` when current authority, source status, or current-vs-historical selection matters.

## Route by fact type

- **Current operational work, dependencies, responsibilities in practice, variation, exceptions, bottlenecks, and current workflow consequences** → the current DCA Operational Reality identified in `current-authority.md`.
- **Canonical organisational or system architecture, definitions, methods, and established requirements** → `Dutch-Civilian-Action/dca-architecture`.
- **AI governance, agents, workflows, skills, provider behaviour, tests, runtime configuration, and AI implementation state** → `Dutch-Civilian-Action/dca-ai`.
- **Contacts, organisations, partner identity or status, primary contacts, and reusable relationship context** → the current canonical Relationship Data implementation, currently `2 | DCA Relationships & Workflows`. The Relationship Data Agent and reconciliation workflow govern how this information is retrieved or reconciled; they are not themselves evidence sources for the contact or relationship fact.
- **Current logistics arrangements such as shipment splits, pickup arrangements, loading rules, transport steps, or current workflow responsibilities** → current Logistics or Operational Reality sources, not Relationship Data merely because a partner or contact is mentioned.
- **Slack messages and other communications** → evidence or live conversation context, not organisational truth by themselves.
- **Documents, spreadsheets, platforms, and system records** → sources or representations of facts; do not confuse the artifact with the underlying organisational fact.

## Source versus procedure

Keep the source that supports a fact separate from the method, agent, workflow, or skill that governs how the fact is found, reconciled, interpreted, or acted on.

For example:

- Relationship Data records may support who a contact is;
- `relationship-data-agent.md` defines capability behaviour;
- `reconcile-relationship-data.md` defines how distributed or conflicting relationship evidence is reconciled.

A procedure file is not a fallback evidence source merely because the primary source is insufficient.

## Mixed requests

Split a mixed request by fact type rather than forcing one source to answer every part.

For example:

- contact identity → Relationship Data;
- current pickup arrangement → Logistics reality;
- structural requirement derived from that reality → current Structure Method and canonical architecture.

Do not let one domain source silently redefine facts owned by another sufficiently established source.

## Broadening the evidence set

Broaden beyond the primary routed source only when:

- the primary source is missing or insufficient for the requested fact;
- the primary source contains a genuine unresolved conflict;
- the user asks for provenance, history, verification, reconstruction, or cross-source comparison;
- the task itself requires reconciliation across distributed evidence.

When current Operational Reality is insufficient for a current operational fact, broaden to relevant current operational evidence and apply the Reconstruction & Reconciliation Method as needed. Do not substitute DCA Derived Organisational Reality as the missing operational source; it is a working inference layer, not a replacement for missing current operational evidence.

If broader evidence conflicts with a sufficiently established current or canonical result, preserve the conflict and the status of each source instead of silently replacing the routed result.

If the preferred source is inaccessible, preserve the access gap. Do not silently substitute historical, superseded, similarly titled, or easier-to-retrieve material as current.

## Capability-specific rules

A capability may define stricter retrieval or reconciliation rules for its own domain. Those rules refine this routing policy but must remain consistent with current DCA authority.

For Relationship Data, see:

- `../agents/relationship-data-agent.md`
- `../workflows/reconcile-relationship-data.md`
