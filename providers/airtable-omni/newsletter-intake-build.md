# Relationship Intake First — Small Build and First Use

Status: proposed rollout/runbook, updated 17 September 2026. Live schema/page inspection is recorded below; no Airtable build, Claude deployment or Mailchimp execution is established by this file.

## Decision and PR order

Keep the first step in **Relationships & Workflows** and use the existing **Relationship Data Pilot** bundle. Intake remains general and **review notes come first when requested**. A person may have several evidenced purposes or relationships; Mailchimp is one possible consequence, not the intake destination.

| PR | Verified state on 17 September | Meaning |
| --- | --- | --- |
| [dca-ai #37](https://github.com/Dutch-Civilian-Action/dca-ai/pull/37) | Merged | R01 evidence and dated base inventory; not candidate adoption |
| [dca-architecture #9](https://github.com/Dutch-Civilian-Action/dca-architecture/pull/9) | Merged | Research/proposals; not blanket implementation approval |
| [dca-ai #44](https://github.com/Dutch-Civilian-Action/dca-ai/pull/44) | Merged | Intake extension published; installation and runtime verification remain separate |

There is no remaining #37 → #9 merge dependency to manage. Merging #44 does not install a plugin, activate a credential, adopt Shared Identity, promote R01 or subscribe anyone.

## What goes where now

| Responsibility | Existing destination and boundary |
| --- | --- |
| Raw submission, provenance, intended uses, human-readable review notes and unresolved questions | Relationships & Workflows `appMdqKYTMnPmVoVu` / `Contact_Intake` / `tblsMQmCUeRiUiY3F`; reuse `raw_submission`, `reason_for_adding`, `relationship_context`, `review_notes`, `clarification_needed` |
| Reusable person or contact route, after supported reconciliation | Same base / `Contacts` / `tbl5NfixO7QO9IBLA`; preserve existing contact IDs |
| Real decisions needing human input | Same base / existing `Review_Queue` / `tbl4PuspNKOVE9ooc`; only when needed, not a second intake register |
| Human attribution and applicable organisation restrictions | Same base / `Operators` / `tbl0rMfAOKGa6Umi5` and `Organizations` / `tbloQjP99AcWawpyZ` |
| Other supported domain relationships/work | Follow the established domain workflow after review and appropriate authorization; unresolved destination stays an explicit question. No new cross-domain writes in this pilot |
| Actual newsletter audience membership | Mailchimp, only through a separately verified authorized continuation from saved records |
| Existing integration evidence scaffolds | Evidence & Reconciliation `appZ1Fv0YtZPbBbWa`: `Mailchimp_Audiences` `tbla8XaaNazFFgugO`, `Mailchimp_Members` `tblWobdsDev3fjgrY`, `Platform_Sources`, `Sync_Runs`, `Integration_Review_Queue`. Retain for later integration work; not replacement intake or canonical people |

The integration tables inspected contained only their identifier field and a blank record each. Their existence is not proof of a working sync. Do not create competing integration tables or modify Donorbox tables. A future cross-base reference must preserve a stable contact ID and source-qualified base/table/record reference; native record links are not cross-base links.

Use the [packaged mapping](../../plugins/dca-relationship-data/skills/managing-dca-relationship-data/references/newsletter-intake.md). Newsletter events append to, never replace, ordinary review notes. The existing Contact-level Mailchimp status has no audience scope; preserve it. Intake notes/events are a bounded human-operated history, not a background queue.

Do not write to Shared Identity candidate `appScO2P8fD8yprCW` or R01 `appTpzRmniNpMv35Q`. No identity migration, base move/rename, Winter outreach change, inferred roles or domain reorganisation is part of this enablement.

## Airtable: reuse the review step that already exists

Live inspection on 17 September found the fields above and the existing **Relationship Data Review** interface:

- **New Contact Intake**: page `pagKRGtiFkekWsGmT`, sourced from `Contact_Intake`.
- **Review Needed**: page `pagVMYeJMohSVaqky`, sourced from `Review_Queue`.
- The `Contact_Intake` view list returned `Grid view` `viwIHXXpLxyfU2IOa`.

Page existence is verified; reviewer access and exact field visibility must still be checked in the intended runtime/UI. Start with these, not another newsletter-only queue. **No new tables, fields, views, automation or test base is required just to capture a submission through the accepted intake workflow.**

If a real UI gap prevents review, make only the separately reviewed display change needed to expose `review_notes`, `relationship_context`, `clarification_needed`, source and status to the authorized reviewer. Do not use hidden fields as a security boundary or turn the review page/view into a send trigger.

## Claude Tag activation and first use

1. #44 is merged to `dca-ai/main`. Install/update **DCA Relationship Data 0.3.1** from the reviewed revision; verify the actual commit in a fresh Claude session. A version label or merge alone is not deployment evidence.
2. Keep **DCA Core**, the generic **Airtable tool/plugin**, and **DCA Relationship Data** together. Use the existing Relationship Data Pilot bundle; do not create a Mailchimp intake bundle.
3. In Tag admin, configure access to Relationships & Workflows `appMdqKYTMnPmVoVu` and Evidence & Reconciliation `appZ1Fv0YtZPbBbWa`. Use either the existing bundle with one PAT restricted to those two bases (`data.records:read`, `data.records:write`, `schema.bases:read`), or the [supplemental evidence bundle with its own PAT](../claude/tag/access-bundles.md#supplemental-bundle--dca-evidence--reconciliation). One PAT's scopes apply to both bases, subject to its owner's permissions; the workflow's evidence-read-only rule is not technical enforcement. With separate credentials, verify that Tag can route to both. No schema-write or Mailchimp credential is needed. Check actual access on every surface receiving the credential.
4. Start in the existing bounded `#anja-ai` attachment after checking its membership/access suitability. [Issue #36](https://github.com/Dutch-Civilian-Action/dca-ai/issues/36) records the earlier attachment and an inactive `relationship-data-read` identity; those observations are not proof of current capability. Verify the authenticated requester → Operator binding under [principal/action authorization](../claude/tag/principal-action-authorization.md). Keep explicit `@Claude` invocation and auto-mode off. Do not extend access to `#marketing`, the whole workspace or mixed Logistics intake merely for this list.
5. Exercise the changed review-first and multiple-purpose cases in a fresh isolated session with simulated tools before enabling the change. If live experimental writes are needed, designate an appropriate verified Dev/Test base separately, preserve source/test distinctions and record actual results under the [promotion standard](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/main/systems/development-testing-and-promotion.md). Never use production, R01 or operational evidence staging as a disposable test sandbox. Do not create a four-table clone solely to save ordinary intake through the accepted workflow.
6. First real use is **capture and review only**, two rows of the source-linked list below. Claude searches for possible existing matches, saves intake and readable notes, reads them back, and stops before canonical changes or Mailchimp. Review identity, stated purposes, uncertainty and next actions; then continue the remaining nine. Resume the same intake IDs, not new copies. The requesting operator maintains corrections for this batch unless an explicit handoff establishes another owner.
7. After that review, reconcile only the supported, authorized relationship records. A Contact can support multiple later workflows. Resolve a domain destination only where actually needed; do not make users classify every future possibility before preserving the source.

Relevant Evidence & Reconciliation records may be read for source/history/conflict checks under the skill's evidence-access boundary. Keep relationship intake and review notes in Relationships & Workflows; do not update integration/evidence records through this capability. Stored Mailchimp evidence is not a substitute for a current platform-state check.

Tag admin access and a fresh Claude runtime were not verified by this repository change. It must not be reported as activated or behaviour-tested.

### First source and invocation

Use the **11 Rotary Altena newsletter sign-ups**: [Kees's corrected 17 September list](https://dcau.slack.com/archives/C037S4YL6MT/p1789638970903079), retaining the [original sign-up/photo thread](https://dcau.slack.com/archives/C037S4YL6MT/p1789507099076419). The reported signup is source-linked attestation, not independent address verification or club membership. Earlier OCR questions are superseded only where corrected. Eleven rows do not imply eleven new Contacts. Keep all actual names/emails and populated evidence outside GitHub.

Example instruction in the authorized private surface, after runtime checks:

> @Claude, intake the first two rows of the corrected Rotary Altena list for review only. Preserve the original and corrected sources. Search for existing contacts and put proposed matches, newsletter intent, any other explicitly stated purposes, uncertainties and next actions in readable review notes. Do not create/update canonical contacts, assign roles or subscribe anyone yet. Show a concise review summary with restricted record links; do not repeat email addresses in the channel.

Do not infer other purposes that the source does not state. A possible follow-up suggested by a reviewer remains a suggestion, not a relationship fact or action grant.

## Separate Mailchimp gate

[Marketing reported missing subscriber-write capability](https://dcau.slack.com/archives/C037S4YL6MT/p1789552162597009). A working write tool, audience ID and current member states have not been verified.

The [dataset prerequisite](../../governance/authority-rules.md#dataset-prerequisite-for-operational-automation) applies before proposing/building/configuring downstream automation. First verify that the relevant batch is actually saved, reconciled at the needed scope, source/consent-qualified, and has a responsible owner/correction process. A schema, draft or promise to incorporate it later is insufficient.

Until then, **do not build an Airtable automation, webhook or Mailchimp API executor**. Intake requires none of them. Preserve the continuation gap, then assess the smallest separate implementation from the saved records when the prerequisite is met. Reuse the integration scaffolds where they fit. Do not infer newsletter consent from another purpose or close unrelated review items after subscription.

## Copyable prompt for Omni or another Airtable-capable builder

Default to verification/reuse. This prompt is not a grant to migrate identities, create an integration or process a real list.

```text
Verify DCA's existing general relationship intake and review support.
The first requirement is review notes before choosing downstream actions,
not a Mailchimp-only intake table.

Read the reviewed PR #44 revision of:
- providers/airtable-omni/newsletter-intake-build.md
- plugins/dca-relationship-data/skills/managing-dca-relationship-data/SKILL.md
- skills/dca-airtable-implementation/SKILL.md
Also read the current architecture systems/development-testing-and-promotion.md
and the live standard:
https://docs.google.com/document/d/17yO7HdChXXvlxekLJjSqiHNgDWmKQm2VstpErtSJ_4c/edit
If any required instruction is inaccessible, stop and report the gap.

Inspect appMdqKYTMnPmVoVu / Contact_Intake tblsMQmCUeRiUiY3F.
Verify raw_submission, reason_for_adding, relationship_context, review_notes,
clarification_needed, intake_status, canonical_contact and operator attribution.
Inspect the existing Relationship Data Review pages:
New Contact Intake pagKRGtiFkekWsGmT and Review Needed pagVMYeJMohSVaqky.
Check actual reviewer access and visibility of source, notes and unresolved items.
Use stable IDs; do not infer authority or workspace membership from names.

If existing structures support this, report "no Airtable build required for
review-first intake". Do not create tables/fields/views/bases to satisfy the word build.
If a specific display gap remains, report the exact smallest proposed change for review.
For any new structure or behaviour, identify a suitable Dev/Test target separately
before making experimental writes, then follow test/acceptance/promotion rules.

No records, canonical identities, roles, permissions, automations, credentials,
base names/locations or Mailchimp membership may be changed by this inspection.
Do not touch R01, Shared Identity candidate, Donorbox or other domain tables.
Report verified IDs, actual gaps and unperformed steps, not assumed deployment.
```

Next action: sync/install the reviewed plugin revision, configure the chosen access setup in Tag admin, and run the fresh-session review-first check before the first two-row capture. Broader identity decisions and Mailchimp integration are separate work.
