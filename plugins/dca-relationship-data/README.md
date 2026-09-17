# DCA Relationship Data Plugin

Claude plugin packaging for the current DCA Relationship Data capability.

## Contains

- `skills/managing-dca-relationship-data/SKILL.md` — Claude runtime implementation of the provider-independent `relationship-data-agent` and `reconcile-relationship-data` workflow.
- `skills/managing-dca-relationship-data/references/newsletter-intake.md` — bounded names/email-list intake using existing DCA records, with consent, audience-specific outcome and retry handling before/after an authorized Mailchimp action.

## Runtime boundary

The plugin supplies behaviour. It does not grant data access by itself.

For the current DCA Claude Tag implementation, attach the plugin together with the appropriate Airtable credential/access bundle. The plugin must not redefine organisational authority, relationship meaning, or Airtable permissions.

## Source alignment

The packaged skill is the maintained implementation. `providers/claude/skills/managing-dca-relationship-data/README.md` redirects here; no provider-side mirrored `SKILL.md` is maintained.

Newsletter behaviour implements `workflows/intake-newsletter-contacts.md`. Version `0.3.0` introduced the pilot; `0.3.1` adds relevant Evidence & Reconciliation reads while keeping current intake/write routing. Credential reach and workflow write restrictions remain distinct; installing/updating the plugin and checking a fresh Claude session remain separate from repository publication. See `tests/providers/claude/newsletter-intake.md` for the first bounded test.

The [small Airtable plan and copyable Omni/GPT prompt](../../providers/airtable-omni/newsletter-intake-build.md) define review-first intake, Claude Tag activation checks, current marketing-list context and the merged status of PRs #37 and architecture #9. Preserve ordinary review notes and all source-supported purposes; Mailchimp is one downstream consequence. Existing fields and review pages support the first step: no new production tables or fields are needed. Actual Mailchimp lookup/write capability remains a separate deployment check.

## Distribution

This plugin is listed in the repository marketplace:

`.claude-plugin/marketplace.json`

The intended organization marketplace source is:

`Dutch-Civilian-Action/dca-ai`
