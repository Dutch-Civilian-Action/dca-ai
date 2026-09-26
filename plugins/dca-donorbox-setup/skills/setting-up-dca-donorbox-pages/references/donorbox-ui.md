# Donorbox interface: observed facts and browser mechanics

Observed in DCA's Donorbox account on 26 September 2026 during two supervised
runs (pages A and B in the pilot handoff). This is interface evidence, not a
DCA rule. Re-observe whenever the interface looks different.

## Account behaviour

- The campaign list filters are **All Campaigns / Active / Archived** only.
  There is no draft state, so a saved campaign is reachable at its URL.
- The campaign card menu offers only **Copy / Archive**. Copy carries over
  every setting of the source campaign, including personal fields. Do not use
  it for a new fundraiser's page.
- New campaign route: **Campaigns → + New Campaign → Donation Form**.
- The Donorbox → Airtable sync creates a `Campaigns` row with the Donorbox ID
  shortly after the campaign is saved. Record that row's ID and `status`. The
  sync has created a row as `active`. Both pilot rows are now `draft`, and the
  responsible person sets `active` by hand once everything is settled (Anja,
  26 September 2026). Report the value; do not change it or read it as a
  publication state.

## New-form defaults (observed, not approved)

Compare every screen against these values; a value left untouched is a
provider default, not a decision.

| Screen | Default observed |
| --- | --- |
| Campaign Details | Goal empty; language Auto-Detect (browser default); slug generated from the title |
| Essential | Primary `#0F77CC`, Default Corners; **Monthly pre-ticked**; Recommended interval "Not selected"; QuickDonate off; donor comments on |
| Amounts | EUR; €10 / €50 / €100; custom amount on; minimum €3 |
| Payments | UltraSwift on; card before Direct Debit; cover-fees shown and pre-checked |
| Information | Anonymous off; mailing address **on**; company recognition off |
| Compliance & Disclaimer | No disclaimer; GDPR checkbox off |
| Tracking | No tracking code |
| Donation Page | Crowdfunding off; share link = own URL; Peer-to-Peer off |

For a one-time page: untick Monthly, keep One-time, and set both Default
and **Recommended** interval to One-time.

When company recognition is turned on, the Information screen shows a notice
that UltraSwift is disabled on the form. Record the notice; do not change
payment settings because of it.

Entering `#FBD149` as the button colour triggers a notice about a
10%-darkened button. Record the colour as entered.

## Browser mechanics (Claude in Chrome)

- **Text fields** (title, slug, disclaimer, consent text, tracking code): set
  them with `form_input` on the element reference from `find`. Typing
  keystrokes into these fields did not register.
- **Save Changes:** click through its element reference from `find`, not by
  coordinates. The button moves when the page scrolls, and a coordinate click
  missed it.
- **Toggles:** check the state after clicking. The company-recognition toggle
  needed a second click in both runs.
- **Persistence:** reload each screen after saving and record the value that
  is shown then. That value goes in `effective_state`. In the page B run,
  the first save of the tracking code did not stick; it had to be entered and
  saved again.
- **Checkout check:** step through the public form up to the donor-information
  step, then stop before entering personal data or paying. The test gift is
  made by a person, not by Claude.
- **Avoid the Donorbox assistant chat** ("Jay"). If it opens, close it.
- **Google Sheets entry:** use the Name Box to go to the cell, type the value,
  then press Tab or Return. Clipboard paste did not work. Check any value that
  starts with `0` or `#` after entry.
- **JavaScript reads of page state were blocked.** Rely on screenshots,
  `find` and `get_page_text`.
- **Google Docs the Drive connector cannot find:** read them through the
  `/mobilebasic` view.
