# Providers

Provider-specific implementation for DCA AI runtimes.

DCA organisational capabilities, workflows, authority rules, and behavioural expectations should remain provider-independent wherever practical. Provider directories translate those capabilities into the configuration required by a specific AI platform.

Current provider areas:

- `chatgpt/` — current System & Structure development and live-testing implementation notes;
- `claude/` — Claude-specific implementation notes where Claude is used or evaluated;
- `runtime-selection.md` — criteria and rules for selecting or changing runtimes.

DCA should not introduce multiple providers merely for architectural symmetry. A workflow may remain on one provider if that is the best operational fit.

A provider implementation must not redefine DCA organisational authority or the meaning of a provider-independent workflow.
