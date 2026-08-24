# Providers

Provider-specific implementation for DCA AI runtimes.

DCA organisational capabilities, workflows, authority rules, and behavioural expectations should remain provider-independent wherever practical. Provider directories translate those capabilities into the configuration required by a specific AI platform or embedded AI runtime.

Current provider/runtime areas:

- `chatgpt/` — current System & Structure development and live-testing implementation notes;
- `claude/` — Claude-specific implementation notes where Claude is used or evaluated;
- `airtable-omni/` — Airtable Omni embedded-runtime implementation notes where DCA workflows are tested directly against Airtable system state;
- `runtime-selection.md` — criteria and rules for selecting or changing runtimes.

DCA should not introduce multiple runtimes merely for architectural symmetry. A workflow may remain on one runtime if that is the best operational fit.

A provider/runtime implementation must not redefine DCA organisational authority or the meaning of a provider-independent workflow.
