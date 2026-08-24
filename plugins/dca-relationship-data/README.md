# DCA Relationship Data Plugin

Claude plugin packaging for the current DCA Relationship Data capability.

## Contains

- `skills/managing-dca-relationship-data/SKILL.md` — Claude runtime implementation of the provider-independent `relationship-data-agent` and `reconcile-relationship-data` workflow.

## Runtime boundary

The plugin supplies behaviour. It does not grant data access by itself.

For the current DCA Claude Tag implementation, attach the plugin together with the appropriate Airtable credential/access bundle. The plugin must not redefine organisational authority, relationship meaning, or Airtable permissions.

## Source alignment

The packaged skill currently mirrors:

`providers/claude/skills/managing-dca-relationship-data/SKILL.md`

When the Claude implementation changes, update both copies together until packaging is consolidated to a single source path.

## Distribution

This plugin is listed in the repository marketplace:

`.claude-plugin/marketplace.json`

The intended organization marketplace source is:

`Dutch-Civilian-Action/dca-ai`
