# Claude

This area is for Claude-specific implementation notes, configuration, packaging, and tests for DCA AI capabilities executed in Claude.

## Runtime position

**Claude is DCA's current primary operational AI runtime/interface.**

This is an implementation and operating decision, not organisational authority. Claude applies current DCA organisational knowledge, methods, agents, workflows, skills, governance, and tests; it does not define organisational truth by itself.

Claude is not required to execute every DCA AI workflow. System & Structure may continue to use ChatGPT for development, reconstruction, reconciliation, testing, monitoring, and bounded workflows such as DCA Reality Watch. Airtable Omni may remain useful as an embedded testing runtime where direct Airtable execution is required.

The current Relationship Data Agent is being tested in Airtable Omni. Its provider-independent agent and reconciliation workflow remain the authority for behaviour; Claude is the intended operational runtime/interface for intake and retrieval once that capability is sufficiently tested and validated.

See `../runtime-selection.md`.

## Provider-specific structure

- `skills/` — Claude-specific packaging, configuration, or adapters for current provider-independent DCA skills when needed.

The Claude skills area is currently prepared but contains no active Claude-specific skill implementation yet.

Legacy skills under `/skills/legacy/` must not be loaded as current Claude skills.

## Required authority inputs

Any Claude implementation for DCA should apply, at minimum:

- `../../governance/authority-rules.md`
- `../../context/current-authority.md`
- the relevant provider-independent agent, workflow, or skill
- the current canonical DCA architecture referenced by those files

Claude must not fall back to the pre-reality-first fixed Layer / Entry Point / Anchor model merely because legacy instructions or historical documents remain accessible.

Provider-specific prompts may adapt formatting and execution behaviour, but they must not redefine DCA organisational authority, agent meaning, skill meaning, or workflow meaning.
