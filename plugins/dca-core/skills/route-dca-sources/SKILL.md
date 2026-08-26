---
name: route-dca-sources
description: Choose the correct current DCA evidence/source before answering or acting. Use for operational reality, relationship facts, architecture/authority, mixed-domain facts, or current-vs-historical source status. Do not use merely to locate an implementation/configuration file inside dca-ai; use navigate-dca-ai for that.
---

# Route DCA sources

This skill is a Claude runtime adapter for DCA's provider-independent source-routing policy.

## Procedure

1. Read `context/source-routing.md` from the attached `Dutch-Civilian-Action/dca-ai` repository.
2. Read `context/current-authority.md` when current authority, source status, or current-vs-historical selection matters.
3. Route each requested fact to the smallest sufficient source set.
4. For mixed requests, split by fact type before retrieval.
5. Broaden only under the conditions defined in `context/source-routing.md`.
6. If a routed source is unavailable, preserve the access gap rather than silently substituting historical or weaker material.

Do not redefine DCA source authority inside this skill. If `context/source-routing.md` is unavailable, treat that as a configuration gap rather than reconstructing the policy from memory.

Keep source-routing mechanics out of ordinary user-facing answers unless they materially affect confidence, access, or a decision.
