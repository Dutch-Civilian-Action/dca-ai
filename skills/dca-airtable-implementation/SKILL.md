---
name: dca-airtable-implementation
description: Apply the current DCA Airtable Implementation Standard whenever designing, building, modifying, migrating, repairing, auditing, or generating implementation instructions for DCA Airtable.
metadata:
  version: 0.1.0
---

# DCA Airtable Implementation

## Scope

Use this skill for any work that may create, assess, or change DCA Airtable implementation, including:

- bases, tables, fields, field types, descriptions, formulas, and identifiers;
- links, views, interfaces, automations, and staging structures;
- migrations, schema repairs, and compliance audits;
- implementation instructions generated for Airtable AI/Omni or another builder or agent.

## Authoritative standard

Before proposing or executing Airtable implementation, retrieve and read the current **DCA Airtable Implementation Standard**:

https://docs.google.com/document/d/17yO7HdChXXvlxekLJjSqiHNgDWmKQm2VstpErtSJ_4c/edit?usp=drivesdk

The live document is authoritative for Airtable implementation. Do not substitute this skill, remembered conventions, existing Airtable structures, Schema Guard rules, or an earlier copy of the standard for the current document.

If the current document cannot be retrieved, stop the affected Airtable implementation and state what could not be verified.

## Boundary

The DCA Airtable Implementation Standard governs **how established requirements are implemented in Airtable**. It does not define DCA organisational architecture or decide what organisational objects, relationships, states, or workflows should exist.

Before deciding what should exist in Airtable:

1. establish the relevant current DCA reality and requirement;
2. identify the applicable current architecture or authoritative specification;
3. inspect the actual target Airtable structure;
4. only then determine the Airtable implementation.

Use `context/source-routing.md` and `context/current-authority.md` to resolve DCA sources. Resolve Airtable environments through `context/airtable-workspace-map.md`. Development, testing, acceptance, and production promotion follow `Dutch-Civilian-Action/dca-architecture/systems/development-testing-and-promotion.md`.

Existing Airtable structure is evidence of current implementation, not proof that the structure is canonical or should be preserved.

Do not invent organisational objects, relationships, fields, statuses, controlled vocabularies, or workflows merely to complete an Airtable design.

## Workflow

### 1. Load the current standard

- Retrieve the live DCA Airtable Implementation Standard.
- Identify the requirements relevant to the requested work.
- Keep the standard distinct from architecture, current operational reality, and current implementation.

### 2. Establish the requirement

- Determine what is actually required before choosing an Airtable structure.
- Use current DCA architecture and authoritative operational evidence where relevant.
- Preserve unresolved uncertainty rather than converting it into structure.
- Treat an instruction to implement as authority only for the requested scope; it does not authorize adjacent redesign.

### 3. Inspect the current implementation

- Read the relevant base, tables, fields, types, formulas, links, descriptions, views, interfaces, automations, records, and dependencies needed to understand the change.
- Confirm the exact workspace, base, and environment role before writing.
- Do not design from an assumed schema state.

### 4. Compare the states

Keep these distinct:

- current implementation;
- required state;
- implementation-standard requirements;
- confirmed drift;
- unresolved architectural or operational questions.

Do not convert a difference into a repair until both the required state and the applicable implementation rule are established.

### 5. Plan safely

- Reuse or correct existing structures where appropriate.
- Do not create a field, table, relationship, option, or other schema element unless its information requirement is sufficiently established.
- Apply current DCA development, testing, migration, approval, and production-promotion rules.
- Treat destructive, dependency-sensitive, semantic, primary-field, populated-type, identifier, formula, link/cardinality, split/merge, and canonical/staging movement changes as consequential.
- For consequential changes, define the exact change, dependencies, data-preservation approach, verification, rollback or recovery path, and required approval before execution.

### 6. Execute only the established change

- Make only changes justified by the established requirement and current standard.
- Preserve existing data, source evidence, provenance, and uncertainty.
- Do not silently resolve conflicts, manufacture precision, or broaden an approved change into adjacent redesign.
- An audit, proposal, or generated plan does not by itself authorize a write.

### 7. Read back and verify

- Inspect the affected Airtable structures after execution.
- Compare the resulting state with the intended change and the current standard.
- Verify dependent formulas, links, views, interfaces, automations, and records where the change could affect them.
- Do not treat a successful API, connector, agent, or tool response as proof that the implementation is correct.

## Schema Guard

Use DCA Schema Guard where its current capabilities cover the required audit or repair.

Schema Guard enforces established Airtable implementation rules. It does not define DCA architecture and must not resolve architectural uncertainty.

Do not assume Schema Guard enforces the entire human-readable standard. Apply and verify requirements explicitly where they are not machine-enforced. A Schema Guard limitation remains a visible implementation gap; it is not permission to bypass the standard.

## Uncertainty and conflicts

Do not guess when:

- the requirement is not sufficiently established;
- authoritative sources conflict;
- the standard conflicts with an applicable architectural requirement;
- a migration cannot be performed safely;
- the target environment or production destination is uncertain;
- dependencies or consequences cannot be determined.

Preserve the current state where necessary, identify the exact unresolved issue, and request or route the required validation.

## Completion

An Airtable implementation task is complete only when:

- the current standard was consulted;
- the implementation is grounded in an established requirement;
- the actual target structure and environment were inspected;
- the change was executed within the authorized scope;
- the resulting state was read back and verified;
- uncertainty and exceptions remain explicit;
- no unsupported structure was introduced.

When reporting completion, briefly state:

- what changed;
- what was verified;
- any remaining drift, exception, uncertainty, deployment gap, or validation requirement.

