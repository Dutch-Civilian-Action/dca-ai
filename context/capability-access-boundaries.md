---
document_type: dca_ai_architecture
status: current-testing
scope: all_dca_ai
provider_independent: true
---

# DCA AI Capability and Access Boundaries

## Purpose

Keep shared organisational meaning, AI capability behaviour, and runtime access authority separate.

The Logistics Intake 0.5.0 live acceptance run showed why the distinction matters: the Relationship Data capability was attached in `#logistics`, yet a person and organisation were still collapsed in staging. The missing protection was not broader Relationship Data access. It was a shared object-boundary invariant that should apply before any domain capability or credential decision.

## Three layers

### 1. Shared Core meaning and routing

Applies across DCA AI contexts where relevant.

Includes:

- current authority and source routing;
- evidence/provenance and uncertainty boundaries;
- cross-domain object distinctions established in canonical DCA architecture;
- rules that prevent one domain from silently redefining another domain's established identity or meaning.

Core does not require broad operational credentials.

### 2. Capability behaviour

A capability defines how a bounded kind of work is performed.

Examples:

- DCA Relationship Data — retrieve/reconcile/maintain canonical people, organisations, and relationships;
- DCA Logistics Intake — preserve and minimally interpret current Logistics-cycle evidence;
- other future domain capabilities.

Capabilities may use shared Core meaning but must not redefine it locally.

A capability being installed or attached does not itself grant data access.

### 3. Runtime access / authority

Provider/runtime configuration determines which repositories, tools, credentials, systems, and write scopes are available in a particular context.

Examples:

- Claude Tag access bundles;
- bounded Airtable identities;
- Google Drive identities;
- repository attachments.

Access answers **what this runtime may use or change here**. It does not define organisational semantics.

## Composition rule

Use the smallest sufficient combination:

```text
shared Core meaning
+ required capability behaviour
+ least-privileged runtime access
```

Do not solve a missing shared invariant by attaching a domain capability or credential everywhere.

Do not solve a missing domain capability by putting detailed domain procedure into Core.

Do not solve a permission problem by changing organisational meaning.

## Relationship Data in Logistics

For current Logistics intake:

- shared person / organisation / location / route boundaries come from Core/canonical architecture;
- DCA Logistics Intake owns the mixed Logistics intake behaviour and staging write path;
- DCA Relationship Data may be attached with bounded read/reference access when Logistics needs established identity context;
- canonical Relationship Data mutation is not implied by mixed Logistics intake;
- Relationship Data access should not be inherited workspace-wide merely to make object distinctions available.

This preserves least privilege while allowing the same organisational object meaning to apply across domains.

## Provider boundary

Provider-specific configuration such as Claude Tag access bundles should compose these layers without redefining them.

A provider instruction may point to the relevant capability and access boundary, but detailed capability procedure belongs in provider-independent workflows/agents plus runtime adapter skills, and stable organisational meaning belongs in canonical architecture.
