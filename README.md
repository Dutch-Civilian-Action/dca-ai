# DCA AI

Official version-controlled home for DCA AI governance, context, skills, agents, workflows, provider-specific implementation, and tests.

## Runtime position

DCA AI capabilities and workflows should remain provider-independent wherever practical.

For **System & Structure**, ChatGPT is currently used as the primary development and live-testing environment for architecture work, reconstruction, reconciliation, workflow design, testing, capability monitoring, and early operational execution where appropriate.

This does not make ChatGPT the permanent runtime.

A validated workflow may remain on ChatGPT, move to Claude, move to another suitable runtime, or use more than one runtime where there is a justified operational reason.

**Runtime selection is an implementation decision, not part of DCA organisational architecture.**

AI runtimes apply DCA organisational knowledge, rules, skills, workflows, and tests. They do not define organisational truth by themselves. Authority remains in the relevant canonical DCA sources and specifications.

See `providers/runtime-selection.md` for runtime-selection guidance.

## Top-level structure

- `governance/` — authority, evidence, uncertainty, human/AI boundaries, and AI operating rules
- `context/` — reusable organisational context supplied to AI systems
- `skills/` — bounded repeatable DCA capabilities
- `agents/` — role-based AI configurations that combine context, rules, and skills
- `workflows/` — provider-independent multi-step AI-supported organisational workflows
- `providers/` — provider-specific implementation for ChatGPT, Claude, or other runtimes
- `tests/` — skill, agent, workflow, provider-portability, and regression tests

## Boundary

Canonical DCA organisational and system specifications belong in `dca-architecture`.

This repository defines how AI uses those specifications in DCA work without binding DCA capability definitions to one AI provider.
