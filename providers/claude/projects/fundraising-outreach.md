---
document_type: claude_chat_project_setup
status: current-testing
provider: claude
surface: claude-chat-project
scope: fundraising_outreach
prepared_for: Bas (primary user), Anja (maintainer)
---

# DCA — Fundraising & Outreach — Claude Chat project setup

Manual setup guide for the Claude Chat project that runs the DCA fundraising and outreach
capability. It records **intended** configuration. Nothing here is evidence that the project
exists, that a plugin is active in it, or that a connector is reachable from it; see
[Intended configuration versus observed deployment](#intended-configuration-versus-observed-deployment).

Behaviour is packaged, not pasted: the capability lives in
[`plugins/dca-fundraising-outreach`](../../../plugins/dca-fundraising-outreach/README.md),
implementing [`workflows/prepare-fundraising-outreach.md`](../../../workflows/prepare-fundraising-outreach.md).
The project instruction surface carries only runtime scope, routing and the standing
instruction this repository requires. Acceptance cases are in
[`tests/providers/claude/fundraising-outreach.md`](../../../tests/providers/claude/fundraising-outreach.md).

## Name and description

**Name:** `DCA — Fundraising & Outreach`

**Description:**

> Prepare and follow through on DCA fundraising and outreach: churches, Rotary clubs, donors,
> funders and partners. Accurate, audience-specific emails, funding asks, presentations and
> replies built from current DCA evidence, newsletter campaigns and relationship history,
> with commitments, owners and next actions kept in existing DCA records.

## Project instructions

Set through **Set project instructions → Save instructions**. This is the whole block. It is
deliberately short: source routing, object boundaries, relationship rules, campaign
selection, evidence discipline, the output contract, the authorization distinctions and the
funding-ask distinctions are carried by the packaged skill and the provider-independent
workflow, and must not be restated here where they would drift out of review.

The dataset-prerequisite paragraph is reproduced verbatim as
[`providers/claude/README.md`](../README.md) requires for Claude Chat projects and Cowork.

```text
You support Dutch Civilian Action fundraising and outreach: churches, Rotary clubs, donors, funders and partners. Scope: outreach emails, funding asks and applications, presentation preparation, replies, thank-you messages and follow-up. Bas is the primary user and normally the owner of outreach follow-through. Treat this configuration as experimental until it has been validated in this project.

Use the DCA Fundraising & Outreach skill for outreach preparation, the DCA Core plugin for source routing, repository navigation and shared object boundaries, and the DCA Relationship Data plugin for contact, organisation and relationship facts and for any record change that authorised follow-through needs. Do not restate or re-derive their rules here, and do not create a parallel contact store. If a required plugin, skill, repository or connector is not available in this project, name it as a configuration gap, state which check could not be performed, and continue with bounded drafting from what is reachable.

Before reviewing an automation plan or proposing, building, configuring, or enabling downstream operational automation, apply `dca-ai/governance/authority-rules.md` → `Dataset prerequisite for operational automation`. Verify the required data is incorporated into the current shared system, with source/validation status and a responsible owner/update process. If this is missing or cannot be verified, stop downstream automation work and redirect to data incorporation. Intake, bounded migration, reconciliation and validation may continue under existing authority/access rules; incomplete history remains explicit. Do not substitute a legacy base or a promised later migration.

That stop condition applies to downstream operational automation. It does not restrict ordinary drafting, reading, replying or preparation work.

Start with the useful result or the next decision. Be concise and practical, and keep architecture and source mechanics out of answers unless they materially affect confidence, access or a decision. Where a specific communication decision has no owner established by a current source, name it as an open decision and say who could settle it; do not assign it, and do not treat these instructions as establishing organisational decision rights. When the same outreach work recurs, propose it as a candidate DCA skill through the existing review and publication process rather than inventing local procedure. Bring Anja bounded structural questions only: the situation, the unclear responsibility or object, the consequence, and the specific decision needed.
```

**If check 2 below shows that the packaged skill is not active inside a project chat**, this
block is insufficient on its own: the outreach behaviour would then not be loaded from
anywhere. Use one of the two routes in
[If the packaged skill does not load](#if-the-packaged-skill-does-not-load). Do not silently
expand this block instead.

## If the packaged skill does not load

Whether a user-installed plugin is active inside a project chat is unresolved (see
[Interface facts](#interface-facts)). If check 2 shows it is not, take one of these two
routes. Both keep the behaviour in the maintained workflow and skill; neither creates a second
copy of it.

**Route A — use a surface where plugin loading is documented.** Support documentation covers
plugin installation for Cowork (**Customize** within the Cowork tab) and the packaged skill is
also available to Claude Code with the repository attached. Run the outreach work there and
keep the project for the material that does not depend on the skill. This is the preferred
route: the capability stays packaged and reviewed.

**Route B — keep the project chat and add one pointer line.** Append this single line to the
instruction block above:

```text
If the DCA Fundraising & Outreach skill is not available in this chat, read `dca-ai/workflows/prepare-fundraising-outreach.md` and `dca-ai/plugins/dca-fundraising-outreach/skills/preparing-dca-fundraising-outreach/SKILL.md` together with its `references/` files from the attached repository, and apply them as written. State in the first reply of a task which of the two you are working from.
```

The line is a **pointer, not a copy**. The behaviour stays in one maintained, reviewed place
and is versioned with the repository revision the project has synced. Do not paste the
workflow's or the skill's content into the instruction surface: that creates an ungoverned
second copy outside the review process, which is exactly what packaging this capability
avoids.

Route B depends on the repository actually syncing into the project (check 1) **and** on the
runtime actually reading it. A pasted path is not evidence that its contents were read;
confirm by asking which revision and which file the answer came from.

If neither route works, record it as a configuration gap, keep the affected checks
explicitly unperformed, and raise it as a bounded structural question rather than
reconstructing the behaviour locally.

## Required repositories

Both, read-only, as synced sources:

| Repository | Why |
| --- | --- |
| `Dutch-Civilian-Action/dca-ai` | The workflow, `context/source-routing.md`, `context/current-authority.md`, `governance/authority-rules.md` |
| `Dutch-Civilian-Action/dca-architecture` | `organisation/shared-foundations/shared-object-boundaries.md` and current canonical architecture |

Without these, the DCA Core skills declare a configuration gap rather than routing. Attaching
a repository is not evidence that it was read.

## Required plugins

| Plugin | Role |
| --- | --- |
| DCA Fundraising & Outreach | This capability's behaviour |
| DCA Core | Source routing, repository navigation, shared object boundaries |
| DCA Relationship Data | Identity, relationship and outreach history, and authorised record updates |

DCA Relationship Data is required, not optional: reading relationship and outreach history is
in scope, and when follow-through needs a record added or corrected, that capability is the
route carrying the identity, provenance and confirmation rules. There is no separate handoff
step and no parallel contact store.

**Plugins are installed on the account, not on the project.** There is no project-level plugin
control in the documented project interface: the project screen carries instructions,
knowledge, sharing and whatever connector configuration the surface provides, and nothing that
adds or removes a plugin. Install from Claude itself — **Customize → Plugins → Browse plugins
→ Install** in web chat, **Customize** within the Cowork tab — then return to the project.
Step 2 of the build order happens outside the project, before or after creating it.

**Marketplace prerequisite, currently unrecorded.** These plugins are not public. They are
published through this repository's marketplace, `.claude-plugin/marketplace.json` in
`Dutch-Civilian-Action/dca-ai`, so a DCA plugin appears under *Browse plugins* only once that
marketplace is connected to the account or organisation. The DCA Core and DCA Relationship Data
plugins are already reachable from at least one DCA Cowork session, so a working route exists —
but **how that marketplace was connected is not recorded anywhere in this repository**, and this
guide does not establish it. If a DCA plugin is visible under *Browse plugins*, this capability
comes from the same source and may need the marketplace refreshed before the newly added entry
appears. If no DCA plugin is visible, resolve that first: it blocks installation on every
surface, and nothing in the project configuration substitutes for it.

Three separate things, which attachment does not merge:

- **Behaviour** — the plugin supplies how the work is done. Attaching it grants no access and
  no authorization.
- **Access** — the Airtable identity in use determines what is technically possible. Decide
  deliberately whether this project's identity is read-scoped or write-capable, and verify it
  at the credential (token scopes, connector grants), not by observing a chat.
- **Authorization** — whether a specific change is permitted is governed by
  [`governance/authority-rules.md`](../../../governance/authority-rules.md) and the
  relationship capability's confirmation rules. An instruction in a project is not a
  permission, and a permission is not an authorization.

## Connectors

All connectors run under each user's own account. Project instructions grant nothing, and a
grant in one person's session says nothing about another's.

| Connector | Use | Boundary |
| --- | --- | --- |
| **Mailchimp** | Newsletter campaign content, images, links, status and dates | **Retrieval only.** No create, edit, duplicate, schedule or send; no audience, list or contact change. The tool surface includes campaign-editing and save operations — that is capability, not authorization. Check the account role behind the connector, not the observed behaviour. |
| Gmail | Recipient and thread history, drafting context | Reading and drafting; sending is a separate authorization |
| Google Drive | Approved communication material, brand material, fundraising working material | Read |
| Airtable | Relationship and outreach history | Only through the Relationship Data route |
| Calendar | Only where scheduling matters to the message | Read |

Whether connectors are configurable or available inside a project chat is **unresolved**; see
[Interface facts](#interface-facts).

## Project knowledge

Keep it small. Add through **+**.

- The current approved DCA Brand Guidelines 2026. Brand authority sits with Marketing &
  Storytelling; the `dca-design` readme is a derivative, not the authority.
- One approved example of Bas's external writing, as a voice reference.
- The current fundraising relationship/outreach handover, **if one is actually maintained**.
  If none is, leave it out rather than reconstructing one.

**Do not add:** architecture or routing documents pasted into knowledge; DCA CRM & Outreach
Infrastructure as current architecture; the 7 September action queue; newsletter exports or
campaign copies — the campaign is retrieved from Mailchimp, not stored here.

**Per chat, not knowledge:** the specific outreach brief and the relevant threads. Promote
material to knowledge only once it is approved and reusable. A campaign is not approved for a
new audience merely because it was sent.

## Sharing

Share with **Bas** as **Can view**: he can use the project's chats but cannot alter
instructions or knowledge. Keep reusable approved content in shared DCA records or project
knowledge, not in an individual chat.

That *Can view* behaves this way on DCA's current plan is part of check 1.

## Build order

1. Create the project; set the name and description above.
2. Install the three plugins **on the account, outside the project** — web chat:
   **Customize → Plugins → Browse plugins → Install**; Cowork: **Customize** within the
   Cowork tab. There is no plugin control inside a project. This step depends on the DCA
   marketplace already being connected to the account; see *Required plugins* above.
3. Sync both repositories, read-only.
4. Connect Mailchimp, Gmail, Drive and Airtable; Calendar only if scheduling is in scope.
5. Inspect credentials before use: the Airtable identity's scopes and the Mailchimp account
   role. Record read-scoped or write-capable as an observed fact, not an intention.
6. Paste the instruction block; **Save instructions**.
7. Add the small knowledge set.
8. Share with Bas as *Can view*.
9. Run the checks below. Record what is actually reachable.

If a plugin, repository or connector turns out to be unavailable, record it as a configuration
gap and continue; the affected checks stay explicitly unperformed. For the specific case of the
skill not loading in a project chat, see
[If the packaged skill does not load](#if-the-packaged-skill-does-not-load).

## Checks

What a check can show: an observed result is evidence of behaviour **in that session**. It
does not establish an enforced permission boundary and does not guarantee later sessions.
Permissions are verified at the credential — Airtable token scopes, Mailchimp account role,
connector grant screens, repository access — separately from behaviour. Do not test
write-related behaviour by attempting a change to a real record or campaign; ask what it
*would* change, or use an authorised test environment.

Checks marked **[Bas]** depend on his own account and connector grants and **cannot be
answered from Anja's session or from this repository**.

| # | Check | Whose session |
| --- | --- | --- |
| 1 | Access: does the project reach both repositories, the brand material, Mailchimp and the other connectors; does *Can view* give chat access without edit rights | **[Bas]** |
| 2 | Is the packaged skill actually active inside a project chat, and does a plain outreach request trigger it without being named. If not, take Route A or Route B in [If the packaged skill does not load](#if-the-packaged-skill-does-not-load) | **[Bas]**, then Anja |
| 3 | Credential permissions, inspected not inferred: Airtable scopes, Mailchimp account role, connector grants | Anja, at the credential |
| 4 | Campaign retrieval: the latest sent campaign identified by name, status and date, with content, images and links, and any newer draft named | **[Bas]** |
| 5 | Campaign ambiguity: a deliberately vague reference draws a confirmation question, not a guess | **[Bas]** |
| 6 | Mailchimp retrieval-only conduct: a requested campaign change is declined, with access or authorization named as the limit, without attempting it | **[Bas]**, non-mutating |
| 7 | Relationship routing: a correction that would touch a record goes through Relationship Data, states what it would change, and names the access or authorization limit | **[Bas]**, non-mutating |
| 8 | Routing: one question mixing a contact fact and a current operational fact routes to two sources without collapsing | Either, once repositories are attached |
| 9 | Configuration gap versus missing evidence: an unreachable campaign yields a bounded draft with explicit gaps; an unavailable routing source is named as a configuration gap with the affected check unperformed | **[Bas]**, against real access |
| 10 | Interpretation: a sent campaign offered as the only evidence for a delivery claim is not promoted to current operational state | Either |
| 11 | User-facing behaviour: drafts arrive with an unresolved-checks list, and text readiness is stated separately from send readiness | **[Bas]** |

The behavioural expectations behind these checks are specified in
[`tests/providers/claude/fundraising-outreach.md`](../../../tests/providers/claude/fundraising-outreach.md).

## First chat

> Two outreach emails: one for churches, one for Rotary clubs, based on our latest sent
> newsletter campaign and its images.
>
> Retrieve the relevant campaign from Mailchimp yourself. If more than one could be meant, or
> there is a newer draft, say so and confirm with me before drafting.
>
> First establish audience and relationship stage, purpose, the confirmed need and the
> concrete call to action from the available evidence. Ask only the minimum questions needed
> to resolve material gaps.
>
> Then give two audience-specific drafts with subject lines: common factual core preserved,
> opening, emphasis and ask adapted where the context warrants it. Source notes and unresolved
> checks outside the emails. Text readiness and send readiness stated separately. Do not send
> anything, do not change anything in Mailchimp, and do not reconstruct the wider fundraising
> work queue.

## Interface facts

**Verified from Claude support documentation (21 September 2026)** — articles 9519177 (create
and manage projects) and 13837440 (use plugins in Claude). These are documented interface
facts, not observations of DCA's account:

- Plugins install in web chat via **Customize → Plugins → Browse plugins → Install**, and in
  Cowork via **Customize** within the Cowork tab. Hooks and sub-agents inside plugins function
  only in Cowork.
- Projects use **Set project instructions → Save instructions**; knowledge is added via **+**;
  sharing uses the **Share** button with **Can view** or **Can edit**.

**Unresolved, and not resolved by this guide:**

- Whether a user-installed plugin is active inside a project chat. The project documentation
  does not mention plugin, skill or connector settings inside a project — which also means
  there is no documented way to add one *to* a project; installation is account-level. Check 2
  is the only thing that settles whether an account-installed plugin reaches a project chat, and
  [If the packaged skill does not load](#if-the-packaged-skill-does-not-load) covers both
  outcomes.
- How the DCA plugin marketplace is connected to a Claude account or organisation. A working
  route exists — DCA Core and DCA Relationship Data are reachable from a DCA Cowork session —
  but the route itself is not recorded in this repository and was not established by this guide.
  It is a prerequisite for installing any DCA plugin on any surface.
- Connector availability inside projects, and which Mailchimp account and audience a project's
  connector is attached to. Checks 1 and 3 settle it for a given account.

Do not treat either as answered on the strength of this document.

## Intended configuration versus observed deployment

This file records intended configuration. A repository change does not create a project,
install a plugin, attach a credential or verify a session. Keep live rollout pending until
the project is actually configured and fresh-session behaviour is checked on the surface in
question, per person. A check passing in Anja's session is not evidence about Bas's.

## Known gaps

These stay visible. They are not blocking: bounded drafting continues while they stand.

1. **Communication's functional decision rights are not established by a current source.**
   Reachable current sources state the split as storage and routing —
   `organisation/drive-architecture/shared-drives/fundraising.md` makes Fundraising canonical
   for outreach operations, emails and follow-up, and `marketing-storytelling.md` makes
   Marketing & Storytelling canonical for brand, content production and published content and
   explicitly not for fundraising outreach execution. A functional layer model naming
   Communication as a decision owner appears only in `skills/legacy/`, which
   [`providers/claude/README.md`](../README.md) forbids falling back to. The instruction block
   therefore works from verified guidance and approved material and marks an unowned
   communication decision as open.
2. **`principal-action-authorization.md` is Claude Tag–scoped.** Its five-link chain starts
   from a trusted Slack workspace and an Operator binding and encodes one Slack pilot instance.
   The skill applies its governing principle — capability is never authorization — together
   with `governance/authority-rules.md`, and does not extend the chain to this surface. Do not
   cite the chain here as if it were established.
3. **Relationship and Mailchimp write capability are credential questions, not instruction or
   behaviour questions.** [`access-bundles.md`](../tag/access-bundles.md) records that the
   current Airtable implementation cannot restrict an identity to specific tables within a
   base; the Mailchimp connector likewise exposes campaign-editing and save operations
   regardless of intent. Whether a change is possible is settled by the token or account role
   (check 3); whether it is permitted is settled by the authority rules; what a session did is
   evidence about that session only.
