---
name: navigate-dca-ai
description: Navigate the DCA AI repository to find the current agent, workflow, skill, governance, provider configuration, plugin, test, or authority-routing source without broad searching.
---

# Navigate DCA AI

Use the attached `Dutch-Civilian-Action/dca-ai` repository as the implementation source.

Start with the repository `README.md` and use the top-level structure directly:

- `context/` — AI-facing current authority and source routing
- `governance/` — AI governance and operating boundaries
- `agents/` — provider-independent agent definitions
- `workflows/` — provider-independent workflows
- `skills/` — provider-independent DCA skills and preserved legacy material
- `providers/` — runtime-specific implementation and configuration
- `plugins/` — packaged Claude/runtime capabilities
- `tests/` — behavioural and regression tests

When source authority matters, use the `route-dca-sources` skill rather than inferring authority from file names or search ranking.

Do not treat the nested `dca-ai/` directory or `skills/legacy/` as current capability sources unless the task explicitly asks for historical material.

Prefer direct path navigation. Search the repository only when the map and known pointers are insufficient.
