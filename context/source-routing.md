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

Use `airtable-workspace-map.md` to resolve *which* Airtable workspace and base a routed Airtable destination actually is (production vs. non-production, and canonical role within production) once this file has identified that the destination is an Airtable base. Resolve by workspace + base identity there, never by name similarity or search ranking.

## Route by fact type

- **Current operational work, dependencies, responsibilities in practice, variation, exceptions, bottlenecks, and current workflow consequences** → compare established candidates through `workflows/reconcile-established-findings-into-maintained-reality.md`, then update the current DCA Operational Reality identified in `current-authority.md` only when the recorded outcome and target rules justify it.
- **Live operational state about specific current goods, offers, expected or incoming goods, pickup/delivery arrangements, unresolved carry-over, or other cycle-level Logistics facts** → the current Logistics operational-state source when one exists. During the bounded Logistics intake pilot, capture new or changed evidence in `DCA Evidence & Reconciliation` through the Logistics intake workflow; do not put the changing item-level/cycle-level state into the Operational Reality document merely because it is operational.
- **New mixed current-cycle Logistics evidence containing goods state together with people, organisations, locations, contact routes, operational functions/steps, or other contextual references** → during the bounded reconstruction pilot, preserve the full submission and minimally extracted facts/references in `DCA Evidence & Reconciliation`. Do not force the new evidence directly into canonical Relationship Data or a final Logistics schema before reconstruction establishes the correct structure.
- **Canonical organisational or system architecture, definitions, methods, and established requirements** → `Dutch-Civilian-Action/dca-architecture`.
- **AI governance, agents, workflows, skills, provider behaviour, tests, runtime configuration, and AI implementation state** → `Dutch-Civilian-Action/dca-ai`.
- **Established contacts, organisations, partner identity or status, primary contacts, and reusable relationship context** → the current canonical Relationship Data implementation, currently `2 | DCA Relationships & Workflows`. The Relationship Data Agent and reconciliation workflow govern how this information is retrieved or reconciled; they are not themselves evidence sources for the contact or relationship fact.
- **Donorbox page setup settings and current campaign records** → the bounded `Donorbox_Setup_Settings` and operational `Campaigns` tables in `2 | DCA Relationships & Workflows` (`appMdqKYTMnPmVoVu`); the page-type reference supplies exact table IDs. Read the draft settings with their status, not as approved policy. Per-page fundraiser choices and copy come from current intake and decision records; Donorbox supplies observed interface state. This route grants no Airtable or Donorbox write authority.
- **Company or person background research against a documented project need** → `Company & People Research | AI Play` in the DCA workspace for research briefs, AI drafts, checked findings and project-specific assessments. Its output is candidate evidence, not a canonical relationship, contact permission, reviewed decision or outreach event. Resolve the exact base ID in `airtable-workspace-map.md`; promote verified information only through the relevant existing source/relationship workflow.
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
- what changed, was cancelled, or remains unresolved in this cycle;
- which person, organisation, route, or location is currently involved in a specific operational context.

Operational-state and reconstruction-staging records may become evidence for a later Operational Reality update when they reveal or confirm a material pattern, dependency, workflow change, variation, or visibility gap. Do not copy every changing operational-state or reference record into the Operational Reality document.

Once such a candidate is sufficiently established, route it through `workflows/reconcile-established-findings-into-maintained-reality.md`. Record whether it was already represented, confirmation only, an addition, correction, qualification, unresolved conflict, historical only, proposed future state, alternate destination, or not ready. Reconstruction staging records the downstream outcome but does not become the maintained truth source.

## Source versus procedure

Keep the source that supports a fact separate from the method, agent, workflow, or skill that governs how the fact is found, reconciled, interpreted, or acted on.

For example:

- Relationship Data records may support who a contact is;
- `relationship-data-agent.md` defines capability behaviour;
- `reconcile-relationship-data.md` defines how distributed or conflicting relationship evidence is reconciled.

A procedure file is not a fallback evidence source merely because the primary source is insufficient.

## Mixed requests and mixed intake

Split a mixed **question** by fact type rather than forcing one source to answer every part.

For example:

- established contact identity → Relationship Data;
- current pickup arrangement → Logistics reality/state;
- structural requirement derived from that reality → current Structure Method and canonical architecture.

Do not let one domain source silently redefine facts owned by another sufficiently established source.

A mixed **new Logistics-cycle submission** is different. During the bounded reconstruction pilot, preserve the full submission in the Logistics intake staging environment first, then minimally extract supported goods/state facts and operational references. Relationship Data may be queried to see whether an identity already exists, but the new mixed submission does not directly mutate canonical Contacts, Organizations, Partners, contact routes, or other relationship structures. Promotion follows later reconstruction/reconciliation and the shared maintained-reality handoff. Validation or a promotion recommendation is not itself evidence that the target was updated.

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

For resolving which Airtable workspace/base a Logistics or Relationship Data destination actually is — including keeping production bases distinct from the non-production `DCA Dev/Test` workspace, and keeping `DCA Evidence & Reconciliation` (staging) distinct from the canonical `DCA Warehouse & Logistics` base — see:

- `airtable-workspace-map.md`
