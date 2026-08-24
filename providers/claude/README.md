# Claude

This area is for Claude-specific implementation notes, configuration, packaging, and tests where DCA chooses to use or evaluate Claude for a DCA AI capability.

Claude is **not** the organisational authority and is not a mandatory target runtime for System & Structure workflows.

Canonical DCA organisational meaning, methods, workflows, skills, and tests remain outside provider-specific configuration. Claude applies DCA specifications; it does not define organisational truth by itself.

## Runtime position

A provider-independent DCA workflow or skill may be implemented in Claude when Claude is a suitable operational runtime for that capability.

The same workflow may instead remain on ChatGPT or move to another suitable runtime. Runtime selection is an implementation decision based on the workflow's tested requirements and operational fit.

See `../runtime-selection.md`.

## Provider-specific structure

- `skills/` — Claude-specific packaging, configuration, or adapters for current provider-independent DCA skills when needed.

The Claude skills area is currently prepared but contains no active Claude-specific skill implementation yet.

Legacy skills under `/skills/legacy/` must not be loaded as current Claude skills.

## Required authority inputs

Any Claude implementation for DCA should apply, at minimum:

- `../../governance/authority-rules.md`
- `../../context/current-authority.md`
- the relevant provider-independent workflow or skill
- the current canonical DCA architecture referenced by those files

Claude must not fall back to the pre-reality-first fixed Layer / Entry Point / Anchor model merely because legacy instructions or historical documents remain accessible.

Provider-specific prompts may adapt formatting and execution behaviour, but they must not redefine DCA organisational authority, skill meaning, or workflow meaning.
