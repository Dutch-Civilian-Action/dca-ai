# Handoff — Donorbox birthday pages pilot (two pages)

**Date:** 26 September 2026. **Run by:** Claude (Cowork) with Claude in
Chrome, supervised by Anja. **Task:**
[H24-02](https://app.asana.com/1/1204854523404532/project/1207017064062702/task/1218860572541375).

These are interim run outputs from supervised configuration. They are not
test acceptance results, not approved defaults and not a publication
decision.

This public record uses synthetic labels: page A, page B, `<First name>`
and `<firstname>`. The fundraisers' names, campaign IDs, page URLs, synced
record IDs and the full checklists stay in DCA Drive.

## What exists

| | Page A | Page B |
| --- | --- | --- |
| Donorbox campaign | ID in the page A checklist | ID in the page B checklist |
| Title | `<First name>'s Birthday Fundraiser for Evacuations` | Same pattern |
| URL | `https://donorbox.org/dca-birthday-<firstname>` | Same pattern |
| Airtable `Campaigns` (synced) | Row created by the sync; `status` read as `draft` | Row created by the sync as `active`; set to `draft` by Anja on 26 September |
| Checklist snapshot | DCA Drive (includes the **Open items - both** tab) | DCA Drive |
| Created via | + New Campaign → Donation Form | + New Campaign → Donation Form (AD01) |
| Shared / invited | No | No |

Donorbox has no draft state, so both pages can be reached at their URLs. Not
shared means not distributed; it is not a platform state. The synced
`Campaigns` `status` is DCA's working state, not a Donorbox state: both rows
are now `draft`, and Anja will set `active` by hand once everything is
settled.

## Entered on both pages (effective state verified after reload)

- **Goal:** empty.
- **Donation intervals:**
  - One-time only. Monthly had been pre-ticked by Donorbox and was unticked.
  - Default and Recommended interval both One-time.
- **Appearance:** Basic, `#1863B5` / `#FBD149`, Sharp Corners.
- **Donor settings:**
  - QuickDonate on.
  - Anonymous on; mailing address, phone and employment off; company
    recognition on.
- **ANBI disclaimer and GDPR consent checkbox:** entered as working
  placeholders marked *future check*, copied verbatim from campaign 931511.
  The consent text does not link to the Privacy Policy. The text is in the
  skill reference.
- **Tracking:** DCA Google tag `G-KSHYJ7QP0S` saved in the tracking-code
  field. Whether it fires has not been verified.
- **Title and slug:** set to Anja's rules (first name only, Title Case,
  `dca-birthday-<firstname>`). Page A's title was first entered in sentence
  case and corrected to Title Case.
- **Decisions behind these values:**
  - Page A checklist: D01 (create, do not send), D04 (title and slug), D05
    (first name only), D09 (shared settings bundle).
  - Page B checklist: AD01 (create like page A, with page A's non-personal
    settings).

The full per-control record, including provider defaults left untouched, is
in each Drive checklist, columns J (`effective_state`) and K
(`operator_result`).

## Not verified

- In the page B run, the Payments, Tributes, Post-donation, Receipts,
  Donation Page Essentials and Peer-to-Peer screens were not opened. They are
  expected to hold provider defaults.
- Desktop public page: checked on both pages.
- Checkout step-through (stopped before personal data; nothing submitted):
  page A only.
- Not verified on either page: mobile preview, test gift, receipt, redirect,
  consent display at checkout, and tracking firing.
- `evidence_link` is empty in both checklists.

## Open before any sharing

The owners and exact questions are in the **Open items - both** tab of the
page A checklist and in the skill's
[birthday-template reference](../../plugins/dca-donorbox-setup/skills/setting-up-dca-donorbox-pages/references/birthday-template.md):

- **B1–B3:** designation and reporting, description approval, outcome claims.
  Owners: Bas and James.
- **F1–F5:** consent, goal, story or image, and access. Owners: the
  fundraisers via Bas.
- **A1–A2:** receiving purpose, operational share, surplus. Owners: Finance
  and James.
- **C1–C2:** copy, receipt, legal and privacy text. Owners: DCA copy and
  privacy.
- **O1–O2:** provider-default settings and the checkout test. Owner: Anja.

Bas reported a date by which each fundraiser needed a link; the dates are in
the Drive checklists. They are working targets, not release permission.

## What was learned (incorporated in skill v0.1.0)

- **Copy carries every setting.** A new page must be created from scratch.
- **New-form defaults differ from DCA's intent.** Monthly is pre-ticked,
  mailing address is required, colours are `#0F77CC`, and cover-fees is
  pre-checked. Record each default explicitly.
- **Browser mechanics:**
  - Text fields needed `form_input`.
  - Save Changes moves on scroll, so click it through its element
    reference.
  - The company-recognition toggle needed a second click.
  - In Sheets, clipboard paste failed.
- **Intake changed during the day.** Bas's H24-01 answers and the
  Fundraising folder documents were updated; each run must re-read them.

## Airtable

This run made no Airtable change. The Donorbox sync created one `Campaigns`
row per page; Anja's later change of page B's `status` to `draft` is noted
above. The 20 `Donorbox_Setup_Settings` rows (`birthday_fundraising`) are
still `draft` and unchanged. Promoting them, or recording the dated decisions
there, is a separate change under the DCA Airtable Implementation Standard.
