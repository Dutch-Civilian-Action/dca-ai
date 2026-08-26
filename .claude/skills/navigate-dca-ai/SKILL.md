---
name: navigate-dca-ai
description: Locate a DCA AI implementation/configuration artifact inside the dca-ai repository without broad searching. Use for agents, workflows, skills, provider configuration (including Claude Tag), plugins, tests, governance files, or authority-routing files. Do not use this to answer how DCA currently operates in practice; use route-dca-sources for operational facts.
---

# Navigate DCA AI

Use the repository structure deliberately. Do not search the whole repository when the requested object has a known home.

## Direct routes

- Current authority/source pointer → `context/current-authority.md`
- Repository purpose and top-level boundaries → `README.md`
- AI governance and operating rules → `governance/`
- Provider-independent agent definition → `agents/`
- Provider-independent multi-step workflow → `workflows/`
- DCA skill definitions → `skills/`
- Claude-specific implementation/configuration → `providers/claude/`
- Claude Tag access-bundle configuration → `providers/claude/tag/`
- Claude provider skills/adapters → `providers/claude/skills/`
- Airtable Omni implementation → `providers/airtable-omni/`
- ChatGPT implementation → `providers/chatgpt/`
- Packaged Claude capability/plugin → `plugins/`
- Claude plugin marketplace/package metadata → `.claude-plugin/`
- Behavioural/regression tests → `tests/`

## Important boundaries

- `Dutch-Civilian-Action/dca-architecture` is the canonical home for DCA organisational and system architecture. Do not reconstruct that architecture from this repository when the architecture repo is available.
- `providers/` describes runtime implementation. Provider configuration does not become organisational authority merely because it is operational.
- `plugins/` packages capabilities. Packaging does not redefine the provider-independent agent/workflow meaning.
- The nested `dca-ai/` directory is a legacy redirect. Do not treat it as the current repository root.
- `skills/legacy/` is historical material and must not be loaded as a current capability unless the task explicitly asks for history.

## Search discipline

1. Route to the likely directory from the map above.
2. Read the smallest directly relevant file first.
3. Follow explicit references from that file when needed.
4. Use repository-wide search only if the direct route does not locate the requested material.
5. When multiple versions exist, use `context/current-authority.md`, status metadata, and explicit supersession markers rather than filename similarity.

When the task is about choosing between DCA systems or evidence sources rather than locating a repository file, use `route-dca-sources` instead.
