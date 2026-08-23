# DCA AI

Official version-controlled home for DCA AI governance, context, skills, agents, workflows, provider-specific configuration, and tests.

## Current runtime

Claude is the current official DCA AI runtime.

Claude applies DCA organisational knowledge, rules, skills, and workflows. Claude does not define organisational truth by itself. Authority remains in the relevant canonical DCA sources and specifications.

## Top-level structure

- `governance/` — authority, evidence, uncertainty, human/AI boundaries, and AI operating rules
- `context/` — reusable organisational context supplied to AI systems
- `skills/` — bounded repeatable DCA capabilities
- `agents/` — role-based AI configurations that combine context, rules, and skills
- `workflows/` — multi-step AI-supported organisational workflows
- `providers/` — provider-specific implementation; Claude is current official runtime
- `tests/` — skill, agent, workflow, and regression tests

## Boundary

Canonical DCA organisational and system specifications belong in `dca-architecture`.

This repository defines how AI uses those specifications in DCA work.
