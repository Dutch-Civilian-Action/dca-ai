# Claude

This area is for Claude-specific implementation notes, configuration, packaging, and tests for DCA AI capabilities executed in Claude.

## Runtime position

**Claude is DCA's current primary operational AI runtime/interface.**

This is an implementation and operating decision, not organisational authority. Claude applies current DCA organisational knowledge, methods, agents, workflows, skills, governance, and tests; it does not define organisational truth by itself.

Claude is not required to execute every DCA AI workflow. System & Structure may continue to use ChatGPT for development, reconstruction, reconciliation, testing, monitoring, and bounded workflows such as DCA Reality Watch. Airtable Omni may remain useful as an embedded testing or inspection runtime where direct Airtable execution is useful.

The Relationship Data Agent is now moving to Claude as its primary operational runtime/interface. The first implementation uses Claude's Airtable MCP connector against the canonical relationship base `2 | DCA Relationships & Workflows`.

The intended organisation-facing path is:

```text
Slack / Claude conversation
→ Claude
→ Relationship Data Agent skill
→ Airtable MCP
→ canonical relationship data
```

`Contact_Intake`, matching logic, reconciliation queues, and Airtable schema remain implementation details. They should not be exposed as the normal user interface.

Airtable Omni may still be used for bounded embedded testing or inspection. It is not the primary conversational intake interface.

See `../runtime-selection.md`.

## Provider-specific structure

- `skills/` — Claude-specific packaging, configuration, or adapters for current provider-independent DCA skills when needed.
- `skills/managing-dca-relationship-data/` — current Claude implementation of the Relationship Data Agent against Airtable.

Legacy skills under `/skills/legacy/` must not be loaded as current Claude skills.

## Required authority inputs

Any Claude implementation for DCA should apply, at minimum:

- `../../governance/authority-rules.md`
- `../../context/current-authority.md`
- the relevant provider-independent agent, workflow, or skill
- the current canonical DCA architecture referenced by those files

Claude must not fall back to the pre-reality-first fixed Layer / Entry Point / Anchor model merely because legacy instructions or historical documents remain accessible.

Provider-specific prompts and skills may adapt formatting and execution behaviour, but they must not redefine DCA organisational authority, agent meaning, skill meaning, or workflow meaning.
