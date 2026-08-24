# Providers

Provider/runtime-specific implementation for DCA AI.

DCA organisational capabilities, workflows, skills, authority rules, and behavioural expectations should remain provider-independent wherever practical. Provider directories translate those capabilities into the configuration required by a specific AI platform or embedded AI runtime.

Current provider/runtime areas:

- `claude/` — current primary operational DCA AI runtime/interface implementation area;
- `chatgpt/` — current System & Structure development, live-testing, reconstruction/reconciliation, monitoring, and bounded S&S implementation notes;
- `airtable-omni/` — Airtable Omni embedded-runtime implementation notes where DCA workflows are tested directly against Airtable system state;
- `runtime-selection.md` — current runtime roles, criteria, and rules for selecting or changing runtimes.

The current primary operational runtime does not have to execute every workflow. DCA should not introduce multiple runtimes merely for architectural symmetry, and a workflow may remain on another runtime when its tested requirements and operational fit justify that choice.

A provider/runtime implementation must not redefine DCA organisational authority or the meaning of a provider-independent agent, skill, or workflow.
