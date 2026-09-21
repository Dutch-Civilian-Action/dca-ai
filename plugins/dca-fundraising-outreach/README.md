# DCA Fundraising & Outreach Plugin

Claude plugin packaging for the DCA fundraising and outreach preparation capability.

## Contains

- `skills/preparing-dca-fundraising-outreach/SKILL.md` — Claude runtime adapter for the
  provider-independent [`workflows/prepare-fundraising-outreach.md`](../../workflows/prepare-fundraising-outreach.md).
- `skills/preparing-dca-fundraising-outreach/references/audiences.md` — audience and
  relationship stage; what may and may not be adapted between versions.
- `skills/preparing-dca-fundraising-outreach/references/campaign-selection.md` — latest-sent
  versus newer-draft campaign selection, image and link handling, and the retrieval-only
  Mailchimp boundary.
- `skills/preparing-dca-fundraising-outreach/references/funding-asks.md` — funding-ask
  distinctions, applications, and follow-through after a reply or presentation.

The references load progressively. Only the task at hand pulls one in.

## Runtime boundary

The plugin supplies behaviour. It grants no data access, no write authority and no send
authority by itself. What a session can technically reach depends on the account, connector
grants and credentials in use; whether a specific action is permitted is governed by
[`governance/authority-rules.md`](../../governance/authority-rules.md).

This capability retrieves newsletter campaigns and reads relationship history. It creates,
edits, schedules, duplicates and sends nothing, and it changes no Mailchimp campaign,
audience, list or contact. Newsletter subscription intake stays with the
[DCA Relationship Data](../dca-relationship-data/README.md) capability.

Attach it alongside **DCA Core** (source routing, repository navigation, shared object
boundaries) and **DCA Relationship Data** (identity, relationship history, authorised record
updates). Without the `dca-ai` and `dca-architecture` repositories reachable, the skills
declare a configuration gap rather than routing.

Installation alone does not establish that any standing instruction is active, or that a
required connector is available on a given surface. Verify fresh-session behaviour per
surface.

## Source alignment

`workflows/prepare-fundraising-outreach.md` is the single source of outreach-preparation
meaning. This plugin's skill is the single maintained Claude implementation; no mirrored
`SKILL.md` is maintained under `providers/claude/skills/`.

The intended Claude Chat project configuration is recorded in
[`providers/claude/projects/fundraising-outreach.md`](../../providers/claude/projects/fundraising-outreach.md).
Behavioural acceptance cases are in
[`tests/providers/claude/fundraising-outreach.md`](../../tests/providers/claude/fundraising-outreach.md);
none has been executed on any runtime.

Skill version `0.1.0` is the first packaging of this capability. As with the other plugins in
this repository, the manifest carries no pinned `version` field, so a new commit is
recognised as a new plugin version during internal testing rather than requiring a manual
semantic-version bump.

## Distribution

This plugin is listed in the repository marketplace:

`.claude-plugin/marketplace.json`

The intended organization marketplace source is:

`Dutch-Civilian-Action/dca-ai`
