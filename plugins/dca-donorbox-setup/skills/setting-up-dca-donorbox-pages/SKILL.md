---
name: setting-up-dca-donorbox-pages
description: Set up one DCA Donorbox page (currently personal birthday fundraiser pages) from the linked DCA sources — generate a source-bound setup checklist as a Google Sheet, stop for review, then with the responsible person supervising create a new campaign in Donorbox, enter supported values and record what the UI actually shows. Use when someone asks to set up, configure or check a Donorbox page or its setup checklist. Do not use for publishing, inviting fundraisers, outreach drafting, or Airtable schema work.
metadata:
  version: 0.1.0
  dca-workflow: set-up-donorbox-page
---

# Setting Up DCA Donorbox Pages

Claude runtime adapter for the provider-independent
`workflows/set-up-donorbox-page.md`. The workflow defines what a supervised
page setup means: boundaries, checklist contract, statuses, value origins,
release gates and procedure. This skill defines how Claude runs it. Do not
duplicate or redefine the workflow here.

Load a reference only when the task reaches it:

- [references/birthday-template.md](references/birthday-template.md): the
  sources, DCA rules and dated decisions for the birthday page type, plus
  its shared open items.
- [references/donorbox-ui.md](references/donorbox-ui.md): observed Donorbox
  screens, new-form defaults and browser mechanics for Claude in Chrome.

## Before generating

1. Read `workflows/set-up-donorbox-page.md` from the attached
   `Dutch-Civilian-Action/dca-ai` repository and apply it. If it is not
   available, name that as a configuration gap. Do not reconstruct it.
2. Apply `context/source-routing.md`. Resolve the Airtable base by ID through
   `context/airtable-workspace-map.md` and each table by the ID recorded in
   the page-type reference, never by name.
3. Read the page-type reference and every source it lists. Re-read the
   per-page intake documents on each run, because they change. When the Drive
   connector returns not-found, read the document in the browser (the
   `/mobilebasic` view of a Google Doc) and note the route in the source row.
4. Check that no page already exists for the fundraiser, in both the
   Donorbox campaign list and the Airtable `Campaigns` table.
5. Read-only steps within the surface's granted access need no permission
   prompt. Creating the Google Sheet, creating a campaign and saving each
   Donorbox screen are writes: do them only after step 4 of the conversation
   shape below.

## Conversation shape

1. **Bind.** Name the page, the fundraiser (first name as used in the
   title) and the template. Then say what is known and what is open.
2. **Generate the checklist as a Google Sheet** following the workflow's
   contract. Name it `Donorbox setup checklist — <fundraiser> <page type> —
   snapshot <YYYY-MM-DD>`. Leave `effective_state` and `operator_result`
   empty at generation.
3. **Show the open decisions** as short, exact questions, numbered so that
   the responsible person can answer them by number. Reuse decisions already
   recorded in the page-type reference. Do not ask about them again.
4. **Wait for approval.** Nothing is created in Donorbox before the
   responsible person approves. Record the approval as a dated `decision`
   row (for example, `AD01`).
5. **Supervised entry** in the person's Chrome, screen by screen, following
   `references/donorbox-ui.md`. After each screen, reload and write the actual
   value and the result into the sheet.
6. **Report** the campaign ID, URL and `Campaigns` record ID, the remaining
   `DECIDE`/`HOLD`/`VERIFY` rows by gate, and the one next decision needed.
   Do not describe the page as ready, published or approved.

Use plain operational language with the person. Field names, row IDs and
statuses belong in the sheet, not in the chat, unless the person uses them.

## Stop conditions

- An existing page is found for the fundraiser.
- The intake has conflicting identities or dates.
- Something public, legal or financial would have to be entered without
  approval. It stays `HOLD`, except where a dated decision says to enter it
  as a working placeholder marked for future check.
- Any publication, sharing or fundraiser invitation. Ask the person first,
  every time.

## Known gaps (v0.1.0)

- Only the birthday template has been exercised: two supervised runs on 26
  September 2026 (pages A and B in the pilot handoff). No other page type
  has a reference yet.
- In the page B run, the Payments, Tributes, Post-donation, Receipts,
  Donation Page Essentials and Peer-to-Peer screens were not opened. Their
  values are provider defaults that have not been verified.
- The desktop public page was checked on both pages. The checkout
  step-through, stopping before personal data, was done for page A only.
  Mobile preview, test gift, receipt and tracking firing are not verified on
  either page.
- The setup settings remain draft. The skill must not be used for unattended
  or batch page creation.
