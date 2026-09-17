# Newsletter Intake — Small Build and First Use

Status: proposed build/runbook, 17 September 2026. No Airtable build, Claude deployment or Mailchimp execution is established by this file.

## Decision and PR order

Keep this pilot in **Relationships & Workflows**. It needs **no new production tables or fields**: reuse `Contact_Intake`, `Contacts`, `Operators` and existing organisation restrictions. Add only one private working review view. This does not make Relationships & Workflows the permanent identity architecture.

| PR | What merging it records or enables | Dependency on this pilot |
| --- | --- | --- |
| [dca-ai #37](https://github.com/Dutch-Civilian-Action/dca-ai/pull/37) | R01 identity-test evidence, replay checks and dated base inventory | Related evidence; not a runtime prerequisite |
| [dca-architecture #9](https://github.com/Dutch-Civilian-Action/dca-architecture/pull/9) | Identity/relationship research and proposals | Related research; not adoption of the candidate or a runtime prerequisite |
| [dca-ai #44](https://github.com/Dutch-Civilian-Action/dca-ai/pull/44) | This bounded Claude newsletter-intake behaviour and build plan | Review/install/test this version before use |

Suggested housekeeping order: review #37 and architecture #9 together, then merge #37, architecture #9, and #44. This is not a technical dependency chain: #44 can proceed independently after its own review. The two dca-ai PRs both update `tests/README.md`; retain both index entries when updating against main. Merging any of these PRs does not adopt Shared Identity, promote R01, install a plugin, grant credentials or subscribe anyone.

## What goes where now

| Responsibility | Existing production destination |
| --- | --- |
| Original submission, row provenance, consent evidence, intent and audience-specific processing history | `appMdqKYTMnPmVoVu` / `Contact_Intake` / `tblsMQmCUeRiUiY3F`; existing `raw_submission`, `review_notes` and other mapped fields |
| Reusable person or contact route | Same base / `Contacts` / `tbl5NfixO7QO9IBLA`; preserve `contact_id` and source-qualified Airtable IDs |
| Human attribution | Same base / `Operators` / `tbl0rMfAOKGa6Umi5` |
| Applicable organisation restrictions | Same base / `Organizations` / `tbloQjP99AcWawpyZ`; do not create affiliations from newsletter interest |
| Actual audience membership | Mailchimp, observed through an authorized working connector; scoped result recorded with the intake |

Use the [packaged field mapping and event contract](../../plugins/dca-relationship-data/skills/managing-dca-relationship-data/references/newsletter-intake.md). The existing Contact-level Mailchimp status is not an audience-scoped subscription register and must not be overwritten by this pilot. Appended intake events are temporary, bounded processing history, not a concurrent/background integration.

Do not write to Shared Identity candidate `appScO2P8fD8yprCW` or R01 `appTpzRmniNpMv35Q`. Do not change base locations/names, Winter outreach, relationship roles, existing forms, interfaces, automations or access. Later identity migration must preserve the source/contact/intake/member crosswalk and must not replay subscriptions.

## First real batch and present blocker

The first case is the **11 Rotary Altena newsletter sign-ups**, not a generic new prospect list. Use [Kees's corrected list of 17 September](https://dcau.slack.com/archives/C037S4YL6MT/p1789638970903079) as the current transcription, retaining the [original sign-up/photo thread](https://dcau.slack.com/archives/C037S4YL6MT/p1789507099076419) as earlier evidence. Preserve the reported sign-up context as source-linked attestation, not independent verification of every address or club affiliation. Earlier OCR/name doubts are superseded only where the corrected source resolves them. Eleven rows do not necessarily mean eleven new Contacts.

[The marketing thread reports that the connected Claude Mailchimp connector cannot add subscribers](https://dcau.slack.com/archives/C037S4YL6MT/p1789552162597009). No working subscription-write capability, audience ID or current member states have been verified for this pilot. A plugin instruction cannot supply a missing tool. Intake may proceed under its own authority; subscription remains not attempted until the actual lookup/write capability, audience, restrictions and action authorization are established. Do not invent an API integration or request credentials as part of this build.

Keep real names, addresses, raw source and populated event payloads out of GitHub.

## Small build and promotion sequence

1. **Prepare/test behaviour:** use the [bounded cases](../../tests/providers/claude/newsletter-intake.md) with simulated tools first. For the live Airtable check, designate a small isolated base in DCA Dev/Test `wspCZsYbWYC7OXX1l`. No newsletter test base is designated yet. Create one dedicated base only when the builder prompt is explicitly invoked for that purpose; do not repurpose an older build, R01 or evidence staging.
2. **Build only the test slice:** mirror the fields consumed by the newsletter mapping in `Contact_Intake`, `Contacts`, `Operators` and `Organizations`, with local links and any required formula dependencies. No 22-table clone, source automations or interfaces. Apply the current implementation standard to new structures; record necessary differences from the existing production schema without repairing production. Retain exact source IDs separately from newly returned local IDs. Read back the schema and view.
3. **Run one small source-linked check:** under the explicit test-base override in a fresh Claude session, copy the first two entries of the corrected list, the relevant original source context and only the required matching/restriction/Operator records. Mark copied real data as such in existing processing metadata; keep the source and returned-ID mapping privately. Forbid Mailchimp mutations. Check saved source, identity match, links, uncertainty, current route, and a repeat run that creates no duplicate intake/Contact. Simulate duplicate, no-consent, suppression and missing-tool cases. Record actual results, not assumed passes.
4. **Accept and promote separately:** review structure, sample mapping/data and Claude behaviour against the [current promotion standard](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/main/systems/development-testing-and-promotion.md). Promote only the accepted view/configuration to existing production; do not move the test base or copy test records/events into production. Install the reviewed plugin revision in the intended authorized Claude surface and verify its real capabilities. A successful Airtable-only test does not pass the Mailchimp continuation.
5. **Use the real list:** process those two source rows in production and read them back; after review, continue the other nine. Reconcile against the full relevant production contacts/routes, not just the sample. Resume existing production intake IDs if already captured. Continue from the saved records only when the separate Mailchimp gate is satisfied; otherwise report the precise blocker and zero subscription attempts.

### The one production view

On 17 September, the live `Contact_Intake` view list returned only `Grid view` (`viwIHXXpLxyfU2IOa`). No newsletter-specific view was returned. Recheck before creating anything.

- Name: `Newsletter Intake — Review`, ordinary grid, no public sharing or automation trigger.
- Filter: `reason_for_adding` contains the marker `DCA newsletter subscription requested` used by the mapping; group by `intake_status`; sort `submitted_at` newest first.
- Show `contact_name`, `email`, `intake_status`, `canonical_contact`, `reason_for_adding`, `clarification_needed`, `submitted_by_operator`, `submitted_at`, `review_notes`. Keep `raw_submission` available in record detail. Hiding a field is not an access restriction.
- Description: “Newsletter intake and processing review. Includes unresolved and completed rows. Saved/applied does not mean subscribed. Review current evidence, audience and platform state before action.”

This is **not a send queue**. Do not filter for `ready` or `subscribed` inside historical JSON/text, or trigger subscriptions when a record enters this view. Reuse a view only after verifying equivalent configuration; never overwrite a same-named but different view without review. If a tool cannot inspect/configure the view, return the exact manual step rather than claiming completion. The view is useful for review, not a prerequisite for saving intake through Claude.

## Copyable prompt for Omni or another Airtable-capable builder

Use this prompt for the build only. It does not instruct the builder to process the list or subscribe anyone. Default `MODE=TEST`. For later promotion use `MODE=PROMOTE_VIEW` and supply the accepted test-base ID and result reference. That explicit invocation authorizes only the named mode's bounded build.

```text
Build only DCA's bounded newsletter-intake test slice/review view.
MODE=TEST
ACCEPTED_TEST_BASE_ID=not_yet_designated
ACCEPTANCE_REFERENCE=not_yet_available

First read from the reviewed PR #44 revision:
- providers/airtable-omni/newsletter-intake-build.md
- plugins/dca-relationship-data/skills/managing-dca-relationship-data/references/newsletter-intake.md
- skills/dca-airtable-implementation/SKILL.md
Also read the current architecture systems/development-testing-and-promotion.md
and the live DCA Airtable Implementation Standard:
https://docs.google.com/document/d/17yO7HdChXXvlxekLJjSqiHNgDWmKQm2VstpErtSJ_4c/edit
If you cannot retrieve any required instruction, ask for its contents and stop.

Source/production base: appMdqKYTMnPmVoVu in DCA (wspYnyJ08xBNYOjXw).
Source tables: Contact_Intake tblsMQmCUeRiUiY3F;
Contacts tbl5NfixO7QO9IBLA; Operators tbl0rMfAOKGa6Umi5;
Organizations tbloQjP99AcWawpyZ.
Inspect actual IDs, schema, options and views; do not select by name alone.

If MODE=TEST:
  Production is read-only. Use workspace wspCZsYbWYC7OXX1l (DCA Dev/Test).
  Inspect whether a dedicated newsletter-intake test base already exists.
  Reuse it only if its identity, isolation and purpose are verified; if unclear, stop.
  Otherwise create one empty base: [DEV] DCA Newsletter Intake.
  Record its returned base ID separately from production and R01.
  Build only the four-table slice described in this runbook, matching consumed
  fields/options and required dependencies from the live source schema.
  Apply the implementation standard to new structures; document differences.
  Remap native links to test-local tables. No production IDs in native links.
  Build the Newsletter Intake — Review view specified in this runbook.
  Do not import people, source lists, automations, integrations or interfaces.

If MODE=PROMOTE_VIEW:
  Require the exact accepted test-base ID and a reviewed result reference.
  If either is missing or the accepted view differs from this plan, stop.
  Recheck production schema and existing views, then create/reuse only the
  specified review view in appMdqKYTMnPmVoVu / tblsMQmCUeRiUiY3F.
  Do not change a table, field, select option, record, existing view or primary.

For both modes:
  Never modify appScO2P8fD8yprCW, appTpzRmniNpMv35Q, legacy or other bases.
  Never rename/move/archive bases, share publicly, grant access, install
  credentials, enable automations, call Mailchimp, or send any messages.
  Stop on unsupported capabilities, permission failures or schema conflicts.
  Read back what you built. Report exact workspace/base/table/view IDs,
  changed objects, unperformed steps and acceptance gaps. Do not claim that
  Claude is deployed, records are migrated or anyone is subscribed.
```

The next action is to review this PR's bounded routing and run the default test-build prompt. Testing and review of #44 need not wait for final decisions on the whole identity/relationship architecture.
