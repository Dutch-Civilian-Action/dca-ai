# DCA Donorbox Setup Plugin

Claude plugin packaging for supervised DCA Donorbox page setup.

## Contains

- `skills/setting-up-dca-donorbox-pages/SKILL.md`: the Claude runtime
  adapter for the provider-independent
  [`workflows/set-up-donorbox-page.md`](../../workflows/set-up-donorbox-page.md).
- `skills/setting-up-dca-donorbox-pages/references/birthday-template.md`:
  sources, working DCA rules, Anja's dated decisions and the shared open items
  for birthday fundraiser pages.
- `skills/setting-up-dca-donorbox-pages/references/donorbox-ui.md`: observed
  Donorbox behaviour, new-form defaults and Claude in Chrome mechanics.

The references load progressively.

## Runtime boundary

The plugin supplies behaviour. By itself it grants no data access, no write
authority, and no authority to publish, share or invite. What a session can
reach depends on the account, connectors and browser session in use.
Whether an action is permitted is governed by
[`governance/authority-rules.md`](../../governance/authority-rules.md).

Donorbox changes are made only with the responsible person supervising in a
live session, after they approve the generated checklist. The capability
reads Airtable `Donorbox_Setup_Settings` and `Campaigns`
(`appMdqKYTMnPmVoVu`) and writes to neither. The Donorbox setup settings are
draft, so the dataset prerequisite for operational automation is not met.
This plugin must not be used for unattended or batch page creation.

This capability is kept separate from **DCA Fundraising & Outreach**, which
is preparation-only and changes no external platform (Anja, 26 September
2026). It is deliberately **not** part of the Fundraising & Outreach project
setup for now. Attach it, with **DCA Core**, only on the surface where a
supervised page setup is actually run; so far that is Cowork with Claude in
Chrome and the repository attached. Revisit project inclusion once all of
these hold:

- a page-setup operator other than Anja is agreed;
- that operator's surface can load the plugin and drive the browser;
- one acceptance run has passed there.

If the `dca-ai` repository is not reachable, the skill declares a
configuration gap.

## Source alignment

`workflows/set-up-donorbox-page.md` is the single source of the meaning of
page setup. This plugin's skill is the single maintained Claude
implementation.

Behavioural acceptance cases are in
[`tests/workflows/set-up-donorbox-page.md`](../../tests/workflows/set-up-donorbox-page.md).
The first pilot record is in
[`handoffs/donorbox-birthday-pages/HANDOFF.md`](../../handoffs/donorbox-birthday-pages/HANDOFF.md).

Skill version `0.1.0` is the first packaging, drawn from the two supervised
birthday-page runs on 26 September 2026. As with the other plugins in this
repository except `dca-relationship-data`, the manifest carries no pinned
`version` field.

## Distribution

This plugin is listed in the repository marketplace:

`.claude-plugin/marketplace.json`
