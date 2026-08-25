# DCA AI repository

This repository is the version-controlled home for DCA AI governance, context, provider-independent agents, workflows and skills, provider implementations, plugins, and tests.

Canonical DCA organisational and system architecture lives in `Dutch-Civilian-Action/dca-architecture`, not here.

This `.claude/` layer configures Claude Code when working in this repository. It does not define provider-independent DCA behaviour and must not be assumed to configure Claude Tag, Chat, or Cowork.

## How to use this repository

- Do not infer authority from filenames, directory names, search ranking, detail, or recency alone.
- DCA's provider-independent source-routing policy is `context/source-routing.md`; `context/current-authority.md` identifies current authority and source pointers.
- When choosing which DCA source should answer a question, use the `route-dca-sources` skill.
- When locating an AI definition, workflow, skill, provider implementation, plugin, test, or governance file in this repository, use the `navigate-dca-ai` skill.
- Keep provider-independent DCA behaviour separate from provider/runtime implementation.
- `providers/`, `plugins/`, `.claude-plugin/`, and runtime configuration implement DCA behaviour; they do not create organisational authority.
- Treat the nested `dca-ai/` directory and `skills/legacy/` as historical unless a task explicitly asks for historical material.
- Prefer the smallest relevant source set. Do not scan or synthesize the whole repository when a bounded source already answers the task.
- Preserve access gaps and unresolved conflicts rather than silently substituting a weaker or historical source.

## Repository map

- `context/` — current AI-facing authority pointers and provider-independent source routing
- `governance/` — AI governance and operating boundaries
- `agents/` — provider-independent agent definitions
- `workflows/` — provider-independent workflows
- `skills/` — DCA skills and preserved legacy skills
- `providers/` — runtime-specific implementation and configuration
- `plugins/` — packaged runtime capabilities
- `tests/` — behavioural and regression tests

Use `README.md` for the fuller repository boundary and runtime-position overview.
