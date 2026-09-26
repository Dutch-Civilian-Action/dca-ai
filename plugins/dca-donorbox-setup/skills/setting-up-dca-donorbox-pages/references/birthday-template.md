# Birthday fundraiser page: sources, rules and decisions

Page type: a personal birthday appeal. The fundraiser asks friends to donate
instead of giving presents, and DCA provides the Donorbox page. Status as of
26 September 2026: working. Nothing here is Finance-validated or approved for
publication.

## Sources

Re-read the per-page intake sources on every run. Record each source's date
in its `source` row.

| ID | Source | Status as last read (26 Sep 2026) |
| --- | --- | --- |
| S-OPT | [DCA donation options + birthday working template](https://docs.google.com/document/d/1lLsitXIZABMQ8qAjS891CcqRrPEG-nz4sy6UYyrOYaA/edit) | Bas, 23 Sep; not reviewed by Finance or James |
| S-DBS | [Airtable `Donorbox_Setup_Settings`, `birthday_fundraising`](https://airtable.com/appMdqKYTMnPmVoVu/tblwGcoO9qaBiNK6C/viwf4QosN1QiY475M): base `appMdqKYTMnPmVoVu`, table `tblwGcoO9qaBiNK6C` | 20 rows DBS-0001..0020, all `draft`, platform `untested` (DBS-0012 `not_applicable`), unchanged since creation 25 Sep |
| S-BAS | [Bas's fundraising input (H24-01)](https://docs.google.com/document/d/1PLAsEyvONz9JywJQIrXbTUrwJQVe2ovzB6EfWaVGSoA/edit) | Working input, not approved copy |
| S-HANDOFF | [Birthday Donorbox setup: open inputs and decisions](https://docs.google.com/document/d/1ssNLZ-mFsEP7OSZ57jf6oez3HWPrJwgQo9Byox4PB4g/edit) | Anja, 26 Sep |
| S-COPY | [Copy drafts for the two pilot pages](https://docs.google.com/document/d/1_9oRqDivNVC8Cfqies2FnplgPuaeTsEVihc_fi_ScQo/edit) | Proposed text, not approved |
| S-BRIEF | [Campaign briefs](https://docs.google.com/document/d/1Dt5wxfmF4RODKvxCmSPpmQZXD0G6SIJW6rk4erFHG4w/edit) | Background; claims not verified |
| S-ASANA | [H24-02 Set up and test two Donorbox pages](https://app.asana.com/1/1204854523404532/project/1207017064062702/task/1218860572541375) | Task and comments |
| S-CMP | [Three-campaign comparison 931475 / 931511 / 804304](https://docs.google.com/spreadsheets/d/1OwcP4deIyXnKHL09tNX8ChUp1Xr9omP35UwlLxRKDGQ/edit) | Observed examples only; not defaults |
| S-CAM | Airtable `Campaigns` (`tblbam3UlEdLGiTRT`, same base) | Synced from Donorbox; row appears after the campaign is created |

## DCA rules (working)

Cite these as `DCA rule (working)` with S-OPT and the DBS row.

- **Arrangement:** the fundraiser makes the personal ask; DCA provides the
  donation route. This is not DCA website content. (DBS-0001)
- **Frequency:** one-time gifts only. (DBS-0003)
- **Purpose:** a named project agreed with the fundraiser. An empty or
  disabled designation never means general funding. (DBS-0004)
- **Goal:** only if the fundraiser chooses one. A goal does not authorise
  redirecting any surplus. The €30,000 campaign target and mission minimums
  are not inherited. (DBS-0005, DBS-0007)
- **Financial wording:** no full-gift claim and no unapproved percentage. The
  20% operational share and the surplus treatment await Finance and James.
  (DBS-0012)
- **Donor updates:** agree per page who sends any updates. Do not promise
  fundraiser notifications that have not been tested. (DBS-0009)
- **Consent:** newsletter consent is separate from receipts; no subscription
  by default. (DBS-0010, proposed)
- **Publication:** share only after copy and Finance reviews and an explicit
  release decision. (DBS-0013)

## Decisions by Anja (approved decision, 26 September 2026)

Apply these without asking again. Cite them as `approved decision — Anja
2026-09-26`.

- Create each page with **+ New Campaign → Donation Form**. Never copy or
  edit an existing campaign as defaults.
- Ask before making a page public or inviting a fundraiser.
- **Title:** Title Case, first name only, no surname, matching other
  campaigns: `<First name>'s Birthday Fundraiser for Evacuations`.
- **Slug:** `dca-birthday-<firstname>` in lower case. Replace the long slug
  that Donorbox generates from the title.
- **Shared appearance and donor settings:**
  - Basic customisation, primary colour `#1863B5`, button colour `#FBD149`,
    Sharp Corners.
  - Donor Portal with QuickDonate checked.
  - Anonymous donations on; mailing address, phone and employment off;
    company recognition on.
- **ANBI disclaimer and GDPR consent checkbox:** enter them now, marked
  *future check*. Both texts are copied verbatim from the existing Urgent
  Needs campaign 931511. They are working placeholders, not legal sign-off;
  review is still required (open item C1/C2). The consent text names the
  Privacy Policy but does not link to it. Text:
  - Disclaimer: "Stichting Dutch Civilian Action is a registered Dutch ANBI
    foundation (RSIN 863895542). Donations are tax-deductible in the
    Netherlands according to applicable regulations. Your contribution
    supports our humanitarian work for civilians in Ukraine."
  - GDPR consent: "I agree to the processing of my personal data in
    accordance with Stichting Dutch Civilian Action's Privacy Policy."
- **Tracking:** add the DCA Google tag (GA4 `G-KSHYJ7QP0S`, with
  `cookie_flags: 'secure;samesite=none'`, the same snippet as campaign
  931511) in the form's default tracking-code field.
  The snippet is saved on both pilot pages; whether it fires has not been
  verified.

## Page facts: always per fundraiser

The following are per fundraiser and never inherited from another page:
identity and consent to show the first name, agreed cause, birthday, timing,
goal, description, image, prior fundraisers and outcome claims. Outcome
claims include "€30 saves one life", 1,000 people, about 2,500 evacuated,
400 per month, and fuel at €12 versus €13. They remain `HOLD` until Bas,
James and Finance substantiate them.

## Left at provider default, pending decision O1

Record these as `provider default` with `DECIDE` until Anja decides O1:

- form language (auto-detect)
- donor comments (on)
- suggested amounts €10/€50/€100, custom amount on, minimum €3
- payment order card → Direct Debit, and the pre-checked cover-fees box
- post-donation page: the Donorbox thank-you page
- receipt text: the account's Dutch subject and generic body (`HOLD` for
  birthday-specific text)
- newsletter option
- crowdfunding meter off
- share link: the page's own URL
- Peer-to-Peer off

## Shared open items (as of 26 September 2026)

| ID | Owner | Needed |
| --- | --- | --- |
| B1 | Bas | Receiving designation, common reporting, whether to show the overall €30,000 appeal (both pages support it) |
| B2 | Bas | "Okay as written" or a replacement for each proposed description |
| B3 | Bas + James | Substantiation of "€30 saves one life", the 1,000-person plan and the fuel figure |
| F1–F2 | Fundraisers via Bas | Approval of the description and consent to show their first name |
| F3 | Fundraisers via Bas | Personal goal, or explicitly no goal |
| F4 | Fundraisers + Bas | Story or image: exact file, credit, permission. Text-only is acceptable |
| F5 | Fundraisers + DCA | Whether a fundraiser needs Donorbox access, progress or notices; who sends updates |
| A1 | Finance + James | Receiving purpose, operational-cost treatment, donor wording |
| A2 | Bas + Finance | Treatment if the goal is exceeded or the need changes |
| C1–C2 | DCA copy + privacy | Description, birthday receipt/thank-you, disclaimer, GDPR text, privacy link |
| O1 | Anja | The provider-default settings listed above |
| O2 | Anja | Mobile and checkout preview, consent check, receipt, test gift and attribution, tracking firing |
