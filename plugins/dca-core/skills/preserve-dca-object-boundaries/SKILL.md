---
name: preserve-dca-object-boundaries
description: Preserve DCA's shared distinctions between people, organisations, locations, contact routes, operational functions, relationships, and operational assertions/states when evidence or a request mixes them together. Use when extracting, reconciling, or acting on mixed-domain operational information; source selection and routing remain the responsibility of route-dca-sources.
---

# Preserve DCA object boundaries

This skill is a Claude runtime adapter for DCA's organisation-wide shared object-boundary architecture.

## Procedure

1. Read `organisation/shared-foundations/shared-object-boundaries.md` from the attached `Dutch-Civilian-Action/dca-architecture` repository.
2. Preserve each supported person, organisation, location, route, operational function, relationship, and operational assertion/state as a distinct kind of thing.
3. Keep multiple objects connected through the same source/provenance rather than collapsing them because they occur in one message.
4. Do not translate one location function into another merely to fit an available field or select option.
5. Keep canonical identity/reconciliation separate from domain-specific operational capture and separate again from access/permission to mutate canonical data.
6. If the current implementation cannot preserve a supported distinction cleanly, preserve the evidence and leave the unsupported structure unresolved rather than inventing or collapsing meaning.

Do not redefine the shared object boundaries inside this skill. If the architecture source is unavailable, treat that as a configuration gap rather than reconstructing the policy from memory.
