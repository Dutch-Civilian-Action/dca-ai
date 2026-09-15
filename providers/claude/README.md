# Claude

This area is for Claude-specific implementation notes, configuration, packaging, and tests for DCA AI capabilities executed in Claude.

## Runtime position

**Claude is DCA's current primary operational AI runtime/interface.**

This is an implementation and operating decision, not organisational authority. Claude applies current DCA organisational knowledge, methods, agents, workflows, skills, governance, and tests; it does not define organisational truth by itself.

Claude is not required to execute every DCA AI workflow. System & Structure may continue to use ChatGPT for development, reconstruction, reconciliation, testing, monitoring, and bounded workflows such as DCA Reality Watch. Airtable Omni may remain useful as an embedded testing or inspection runtime where direct Airtable execution is useful.

The Relationship Data Agent is now moving to Claude as its primary operational runtime/interface.

## Claude configuration surfaces

Do not assume one Claude configuration mechanism applies to every Claude runtime.

- `.claude/CLAUDE.md`, `.claude/rules/`, and `.claude/skills/` are repository-native Claude Code configuration used when Claude Code is working in this repository.
- Claude Tag is configured through organisation-managed access bundles, repositories, credentials, plugins/skills, and standing instructions.
- Claude Chat / Cowork receive reusable packaged capability behaviour through supported plugins/skills and their configured connections.

Therefore provider-independent DCA behaviour must not exist only inside `.claude/`. Put shared behaviour in the provider-independent repository structure, then use the relevant Claude mechanism as a thin runtime adapter.

## Dataset prerequisite across Claude surfaces

The shared rule is `../../governance/authority-rules.md` → `Dataset prerequisite for operational automation`. Apply it before reviewing or implementing an operational automation plan.

- **Claude Code in this repository:** the thin adapter is in `../../.claude/CLAUDE.md`.
- **Claude Tag:** the adapter belongs in the DCA Core standing instructions in `tag/access-bundles.md`, inherited by the domain/build bundles.
- **Claude Chat projects / Cowork:** add the following small standing instruction to the supported project/runtime instruction surface and make the shared rule and required sources available. Installing a plugin or attaching a repository alone does not establish that the instruction is active.

> Before reviewing an automation plan or proposing, building, configuring, or enabling downstream operational automation, apply `dca-ai/governance/authority-rules.md` → `Dataset prerequisite for operational automation`. Verify the required data is incorporated into the current shared system, with source/validation status and a responsible owner/update process. If this is missing or cannot be verified, stop downstream automation work and redirect to data incorporation. Intake, bounded migration, reconciliation and validation may continue under existing authority/access rules; incomplete history remains explicit. Do not substitute a legacy base or a promised later migration.

A repository change records intended configuration. Keep live rollout pending until the relevant runtime instructions are updated and fresh-session behaviour is checked for that surface. Do not claim that a Code check proves Tag, Chat project, or Cowork behaviour.

## Relationship Data Agent implementation

The first directly supported implementation surface is:

```text
Claude Chat / Cowork
→ DCA Relationship Data plugin / managing-dca-relationship-data skill
→ Airtable connector / MCP
→ 2 | DCA Relationships & Workflows
```

The intended organisation-facing Slack path is:

```text
James / DCA user in Slack
→ Claude Tag
→ DCA Core + DCA Relationship Data plugins / access bundles
→ Relationship Data Agent behaviour
→ Airtable
```

Claude Tag channel mode acts under an organisation-managed identity with admin-configured repositories, credentials, plugins/skills, instructions, memory, and access boundaries. DCA should package reusable workflow behaviour as plugins/skills where practical and use access-bundle instructions only for small runtime routing, scope, and communication rules.

`Contact_Intake`, matching logic, reconciliation queues, Operator resolution mechanics, and Airtable schema remain implementation details. They should not be exposed as the normal user interface.

Airtable Omni may still be used for bounded embedded testing or inspection. It is not the primary conversational intake interface.

See `../runtime-selection.md` for runtime/provider choice and `model-selection.md` for Claude model and effort choice once Claude is the selected runtime.

## Provider-specific structure

- `model-selection.md` — current Claude model and effort guidance by work type.
- `tag/access-bundles.md` — current Claude Tag access-bundle and channel-scope design.
- `../../plugins/dca-core/` — packaged DCA source-routing and repository-navigation adapters for Claude runtimes.
- `../../plugins/dca-relationship-data/` — packaged Claude implementation of the Relationship Data capability.

The packaged plugin skill is the maintained Claude implementation of Relationship Data. Do not maintain a second mirrored `SKILL.md` under `providers/claude/skills/`.

Legacy skills under `/skills/legacy/` must not be loaded as current Claude skills.

## Required authority inputs

Any Claude implementation for DCA should apply, as relevant:

- `../../governance/authority-rules.md`
- `../../context/source-routing.md`
- `../../context/current-authority.md`
- the relevant provider-independent agent, workflow, or skill
- the current canonical DCA architecture referenced by those files

Claude must not fall back to the pre-reality-first fixed Layer / Entry Point / Anchor model merely because legacy instructions or historical documents remain accessible.

Provider-specific prompts, access bundles, plugins, skills, model choices, and effort settings may adapt discovery, formatting, access, execution behaviour, and resource use, but they must not redefine DCA organisational authority, agent meaning, skill meaning, workflow meaning, or source-routing semantics.
