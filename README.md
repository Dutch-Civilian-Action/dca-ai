# DCA AI

Official version-controlled home for DCA AI governance, context, skills, agents, workflows, provider-specific implementation, and tests.

## Runtime position

DCA AI capabilities, workflows, tests, and authority rules should remain provider-independent wherever practical.

**Claude is DCA's current primary operational AI runtime/interface.** This describes the current operational runtime position; it does not make Claude organisational authority or make every DCA AI workflow a Claude workflow.

For **System & Structure**, ChatGPT is currently used as the primary development and live-testing environment for architecture work, reconstruction, reconciliation, workflow design, testing, capability monitoring, and bounded operational workflows such as DCA Reality Watch.

**Airtable Omni** may be used as an embedded testing or inspection runtime where direct execution against Airtable system state is useful. It is not the primary conversational intake interface.

The first current operational Claude implementation is the Relationship Data Agent, using the Airtable MCP connector against `2 | DCA Relationships & Workflows`, with Slack as the intended organisation-facing conversational surface where Claude is enabled.

Runtime roles may change when workflow requirements, testing, access, reliability, governance, or operational fit justify it. A bounded workflow may remain on ChatGPT, run in Claude, use Airtable Omni for testing, move to another suitable runtime, or use more than one runtime where there is a justified reason.

**Runtime selection is an implementation decision, not part of DCA organisational architecture or authority.**

AI runtimes apply DCA organisational knowledge, rules, skills, workflows, and tests. They do not define organisational truth by themselves. Authority remains in the relevant current DCA reality, canonical sources, methods, governance, and specifications.

See `providers/runtime-selection.md` for runtime-selection guidance.

## Current implementation and maintenance

Current repository capabilities include Relationship Data, bounded Logistics Intake with attachment handling, maintained-reality reconciliation, Reality Watch, and validation-queue monitoring with bounded owner reminders. Repository implementation and a configured task do not by themselves prove live correctness, organisation-wide adoption or outcomes.

- `context/current-authority.md` resolves the maintained reality documents and implementation summary.
- `context/airtable-workspace-map.md` records stable base identities, current names and migration boundaries.
- `workflows/maintain-dca-reality.md` owns repository-to-runtime-to-document drift checks.
- `providers/chatgpt/dca-reality-watch.md` records the running maintenance route.

For a material implementation change, reconcile the relevant repository files first, then verify affected runtime configuration and refresh the existing implementation summary. Keep an unmerged change, deployment gap or failed document write visibly pending.

## Top-level structure

- `governance/` — authority, evidence, uncertainty, human/AI boundaries, and AI operating rules
- `context/` — reusable organisational context supplied to AI systems
- `skills/` — bounded repeatable DCA capabilities; historical pre-reality-first skills are isolated under `skills/legacy/`
- `agents/` — role-based AI configurations that combine context, rules, and skills
- `workflows/` — provider-independent multi-step AI-supported organisational workflows
- `providers/` — provider/runtime-specific implementation for Claude, ChatGPT, Airtable Omni, or other runtimes
- `tests/` — skill, agent, workflow, provider-portability, and regression tests

## Boundary

Canonical DCA organisational and system specifications belong in `dca-architecture`.

This repository defines how AI uses those specifications in DCA work without binding DCA capability definitions to one AI provider or runtime.
