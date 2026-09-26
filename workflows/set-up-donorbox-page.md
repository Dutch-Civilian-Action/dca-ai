---
document_type: dca_ai_workflow
status: experimental
workflow: set-up-donorbox-page
provider_independent: true
---

# Set Up a DCA Donorbox Page

## Purpose

Generate a source-bound setup checklist for **one** Donorbox page, have a
responsible DCA person review it, enter the supported values under that
person's supervision, and record what the provider interface actually shows
after entry, so that setup is repeatable and every value can be traced.

This workflow defines what a supervised Donorbox page setup means. Provider
adapters define how a runtime executes it. The workflow does not grant
Donorbox, Airtable, Drive or Asana access. It also grants no authority to
publish, share or invite. Any write stays within the authority the executing
surface already has.

First pilot: two personal birthday fundraiser pages, 26 September 2026. See
`handoffs/donorbox-birthday-pages/HANDOFF.md`. The birthday template is the
only template exercised so far.

## Boundaries

- **One page per checklist.** A checklist is bound to one fundraiser or page.
  One page's personal facts, goal, consent or approvals never fill another
  page's fields.
- **New campaign only.** Create each page with Donorbox's new-campaign flow.
  Do not copy or edit an existing campaign as if its values were approved
  defaults. Donorbox's Copy action carries over every setting of the source,
  including personal fields.
- **No draft state in Donorbox.** In the observed account, a saved campaign
  is reachable at its URL; the campaign filters are All/Active/Archived
  only. "Not shared" is therefore a distribution state, not a platform state.
  Record it as such.
- **No publication, sharing or fundraiser invitation** without an explicit,
  recorded release decision by the responsible person. Configuration,
  testing and review do not imply release.
- **Supervised, not automated.** Interface entry is performed or supervised
  in a live session with the responsible person. The Donorbox setup settings
  (`Donorbox_Setup_Settings`, `2 | DCA Relationships & Workflows`,
  `appMdqKYTMnPmVoVu`) are draft and untested, so they are not yet a
  dataset that downstream automation may rely on. See
  `governance/authority-rules.md` → *Dataset prerequisite for operational
  automation*. Do not build unattended page creation from this workflow
  until that prerequisite is met.
- **Airtable is read-only here.** This workflow reads setup settings and the
  operational `Campaigns` table, which includes both Donorbox-derived and
  manually entered records. It creates no `Campaigns` row; the Donorbox sync
  creates the page's row after the page exists. Any Airtable schema
  or record change belongs to its own authorised workflow and follows the
  current DCA Airtable Implementation Standard.

## Inputs

Resolve sources through `context/source-routing.md`. Resolve Airtable bases
by ID through `context/airtable-workspace-map.md`.

- **DCA donation option / working template:** the donor promise, purpose,
  frequency and Finance constraints for the page type.
- **Donorbox setup settings for the template** (for the birthday template,
  `template_key = birthday_fundraising`): the reusable defaults. Record their
  approval and platform status as read.
- **Per-page intake:** the fundraiser, agreed cause, goal, copy, media,
  consent, timing and approvals. It may be spread over several working
  documents. List each one as a separate source with its date.
- **Decisions by the responsible person:** dated, named, per setting.
- **Interface evidence:** what the provider interface shows. This includes
  the defaults of a new form, which must be observed, not assumed.
- **Earlier runs:** only as evidence of how controls behave, never as a source
  of another page's facts.

Before generating, confirm that no page for this fundraiser already exists,
in both the provider's campaign list and the synced `Campaigns` table.

## Checklist contract

A checklist is a dated snapshot with one row per source, rule, page fact or
interface action. The columns are:

`row_id`, `row_type`, `fundraiser`, `screen`, `control`,
`exact_value_or_question`, `value_origin`, `source`, `entry_status`,
`effective_state`, `operator_result`, `evidence_link`, `release_gate`.

Row types separate what must not be conflated:

- `meta`: snapshot identity, legend.
- `source`: each input, with link, revision/date and status.
- `dca_rule`: DCA-level rules for the page type, with their working or
  approved status.
- `reusable_setting`: template settings (setting ID, scope, rule status).
- `page_fact`: this fundraiser's facts only.
- `checklist`: one interface action.
- `decision`: a dated decision by the responsible person.

**Entry status:**

- `ENTER`: the value and its interface control are both supported.
- `DECIDE`: a choice is missing. State it as a precise question; never fill
  it with a default.
- `HOLD`: unapproved public, legal or Finance content, or an action that
  needs explicit approval.
- `VERIFY`: the actual interface, checkout or event must be checked.

**Value origin:** `DCA rule` (working/approved), `approved decision` (who,
date), `Airtable setting`, `intake`, `observed example`, `provider default`,
`UI evidence`.

Keep a provider default visible as `provider default` until someone decides
it. Matching values across existing campaigns do not make a value approved.

**Release gates**, recorded separately and never implied by one another:
`configuration`, `tested`, `content_reviewed`, `finance_validated`,
`approved_to_publish`.

**Source conflicts** produce a `DECIDE` row that names both sources. They
never produce a silently chosen winner.

## Procedure

1. **Bind** the checklist to one page and fundraiser. Record the template
   and the sources' revisions or dates.
2. **Read** every input and check for an existing page. Record access gaps
   as gaps rather than substituting other material.
3. **Generate** the checklist according to the contract. Separate DCA rules,
   reusable settings and page facts.
4. **Stop for review.** Show the checklist and the open decisions to the
   responsible person. Record each decision as a dated `decision` row, then
   regenerate the affected rows.
5. **Supervised entry.** Create the new campaign and enter only `ENTER`
   rows and decided values. After each screen, record the interface's actual
   value (`effective_state`), what the operator did (`operator_result`), and
   whether the value persisted after a reload.
6. **Re-check** campaign ID, URL, title, slug and the synced `Campaigns` row.
   Record any difference between the requested and the effective values as a
   deviation.
7. **Release support.** List what each remaining gate needs, with owner and
   exact question. Ask the responsible person before any publication, sharing
   or invitation.

## Outputs

- A checklist snapshot per page, stored where the responsible person
  designates, with `effective_state` filled in for every entered row.
- Campaign ID, URL and synced `Campaigns` record ID recorded against the page's
  intake or task.
- An open-items list for everything that is still open, shared across pages
  where it applies, with owner, gate and the exact answer needed.

## Failure expectations

- A required source is inaccessible: state the gap; do not reconstruct the
  source from memory.
- An interface control cannot be found or does not save: record it as
  observed; do not report it as set.
- A page for the fundraiser already exists: stop and ask; do not create a
  second one.
- Identity or date conflicts in the intake: `DECIDE`; do not use either value
  as a fact.
