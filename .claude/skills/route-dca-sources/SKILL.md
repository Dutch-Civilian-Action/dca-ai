---
name: route-dca-sources
description: Choose the correct DCA source before answering or acting. Use when a DCA question could be answered from more than one repository, document, system, channel, or runtime source.
---

# Route DCA sources

Use this skill to select the smallest authoritative source set for the requested fact or action.

## Start here

Read `context/current-authority.md` when current authority, source status, or current-vs-historical selection matters.

Do not substitute a similarly named or easier-to-retrieve source for the routed current source.

## Route by fact type

- **Current operational work, dependencies, responsibilities in practice, variation, exceptions, bottlenecks** → current DCA Operational Reality identified in `context/current-authority.md`.
- **Canonical organisational or system architecture, definitions, methods, requirements** → `Dutch-Civilian-Action/dca-architecture`.
- **AI governance, agents, workflows, skills, provider behaviour, tests, runtime configuration** → this `dca-ai` repository.
- **Contacts, organisations, partner identity/status, primary contacts, reusable relationship context** → current canonical Relationship Data implementation, currently `2 | DCA Relationships & Workflows`, using the Relationship Data Agent/workflow when that capability is available.
- **Current logistics arrangements such as shipment splits, pickup arrangements, loading rules, transport steps, or workflow responsibilities** → current Logistics/Operational Reality sources, not Relationship Data merely because a partner or contact is mentioned.
- **Slack messages** → evidence or live conversation context, not organisational truth by themselves.
- **Documents, spreadsheets, platforms, and system records** → sources or representations of facts; do not confuse the artifact with the underlying organisational fact.

## Mixed questions

Split a mixed request by fact type instead of forcing one source to answer everything.

Example:

- contact identity → Relationship Data
- current pickup arrangement → Logistics reality
- structural requirement derived from that reality → current Structure Method / architecture

Do not let one domain source redefine facts owned by another sufficiently established source.

## Broadening the search

Broaden beyond the primary routed source only when:

- the primary source is missing or insufficient;
- the primary source contains a genuine unresolved conflict;
- the user asks for provenance, history, verification, reconstruction, or a cross-source comparison.

If broader evidence conflicts with a sufficiently established canonical/current result, preserve the conflict and source status instead of silently replacing the routed result.

If the preferred source is inaccessible, state the access gap and do not silently fall back to historical material.