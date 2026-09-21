# DCA Needs Review Plugin

Claude plugin packaging for the DCA Need review capability.

## Contains

- `skills/reviewing-dca-needs/SKILL.md` — Claude runtime adapter for
  the provider-independent `workflows/review-dca-needs.md`.

## Runtime boundary

The plugin supplies behaviour. It does not grant data access or write
authority by itself. A review produces proposals; any maintenance
write follows the authority and confirmation protocol of the surface
executing it, unchanged.

For Claude Chat, provision the skill to the account; for Claude Tag,
attach the plugin through the relevant access bundle. Installation
alone does not establish that any standing instruction is active;
verify fresh-session behaviour per surface.

## Source alignment

The provider-independent workflow `workflows/review-dca-needs.md` is
the single source of review meaning. This plugin's skill is the
single maintained Claude implementation; do not create a mirrored
copy under `providers/claude/skills/`.

## Distribution

This plugin is listed in the repository marketplace:
`.claude-plugin/marketplace.json`.
