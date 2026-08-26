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
- **Live operational state about specific current goods, offers, expected or incoming goods, pickup/delivery arrangements, unresolved carry-over, or other cycle-level Logistics facts** → the current Logistics operational-state source when one exists. During the bounded Logistics intake pilot, capture new or changed evidence in `DCA Integrations & Reconciliation` through the Logistics intake workflow; do not put the changing item-level/cycle-level state into the Operational Reality document merely because it is operational.
- **Canonical organisational or system architecture, definitions, methods, and established requirements** → `Dutch-Civilian-Action/dca-architecture`.
- **AI governance, agents, workflows, skills, provider behaviour, tests, runtime configuration, and AI implementation state** → `Dutch-Civilian-Action/dca-ai`.
- **Contacts, organisations, partner identity or status, primary contacts, and reusable relationship context** → the current canonical Relationship Data implementation, currently `2 | DCA Relationships & Workflows`. The Relationship Data Agent and reconciliation workflow govern how this information is retrieved or reconciled; they are not themselves evidence sources for the contact or relationship fact.
- **Current logistics arrangements such as shipment splits, pickup arrangements, loading rules, transport steps, or current workflow responsibilities** → current Logistics or Operational Reality sources, not Relationship Data merely because a partner or contact is mentioned.
- **Slack messages and other communications** → evidence or live conversation context, not organisational truth by themselves.
- **Documents, spreadsheets, platforms, and system records** → sources or representations of facts; do not confuse the artifact with the underlying organisational fact.

## Operational Reality versus operational state

Keep these two different questions separate.

**Operational Reality** answers questions such as:

- how does this work currently;
- who currently does or decides what;
- where does work depend on a person, channel, tool, or undocumented judgement;
- what variations, exceptions, handoffs, and visibility gaps exist.

**Operational state** answers questions such as:

- what goods are in the warehouse now;
- what has been offered or is expected now;
- what is already incoming or arranged for pickup/delivery;
- what changed, was cancelled, or remains unresolved in this cycle.

Operational-state records may become evidence for a later Operational Reality update when they reveal or confirm a material pattern, dependency, workflow change, variation, or visibility gap. Do not copy every changing operational-state record into the Operational Reality document.

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

For the bounded Logistics intake pilot, see:

- `../workflows/capture-logistics-intake.md`
