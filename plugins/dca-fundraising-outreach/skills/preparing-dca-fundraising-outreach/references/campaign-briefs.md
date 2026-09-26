# Campaign briefs

Load this when the request is for a campaign brief or briefing: draft copy, a proposed
ask, stat blocks, charts, cost-allocation tables and imagery for one campaign. What the
work is: `workflows/prepare-fundraising-outreach.md` → Campaign briefs. This file says
how to run it.

The deliverable is a draft and a review ledger, never a finished brief.

## Composition

- Format and destination: `dca-output-routing`. Document construction:
  `dca-document-authoring`. Visual identity, tone, figures and image description:
  `dca-design`. If one is not available in this session, name the configuration gap
  and do not reproduce its rules.
- The ask and its cost table: `funding-asks.md`. Audience versions: `audiences.md`.
- Source selection: `route-dca-sources`. People, organisations and places:
  `preserve-dca-object-boundaries`. Named partners and funders: Relationship Data.

## Values

Apply this to every value: each figure, amount, count, date and percentage, and every
data point behind a stat block, chart or table. Take the first tier that yields the
value and record which tier it came from. Never mix tiers invisibly in one brief.

### Tier 1 — the requester

A value the requester states as current in this task — in their message, or by pointing to a specific value in
material they link.

- Use it in the draft, marked unverified.
- Record `provided by [person], [date]`, with the link where there is one.
- It stays **user-provided, unverified** until the validator named in the ledger
  confirms it.
- A figure that only appears in material the requester links — an old proposal, an
  earlier campaign, a workbook — is not a tier-1 value until they state it as current.
  Say what you found and ask, or leave it open.

### Tier 2 — a current shared DCA source

Only when tier 1 yields nothing. Route the fact type through `route-dca-sources`; for
an Airtable destination, resolve the base in `context/airtable-workspace-map.md`.

- Read through the connector this session actually has. This plugin supplies
  behaviour, not access.
- Record the source (base and table, or document), the record, the retrieval date and
  the record's stored validation or confirmation status.
- The stored status travels with the value: **shared source, [stored status]**. It
  becomes **validated** only when the record says so or the named validator confirms it.
- Keep qualified wording. Where a record holds qualified text and a normalised number,
  use the number only if it drops no qualifier the text carries.

Three different stops. Report each as what it is and never merge them:

- **Access gap** — a route exists but this session cannot reach it. Name the
  configuration gap and the check left unperformed.
- **Routing gap** — `context/source-routing.md` has no route for this fact type. Name
  the fact type. Do not search for a source.
- **Dataset gap** — the route resolves and is reachable, but the value is not there.

All three end at tier 3 for this value. Never substitute a weaker, historical,
similarly named or non-production source.

### Tier 3 — no value

- Produce no value. Do not propose, estimate or reconstruct one from documentation,
  sheets, workbooks, old proposals, earlier campaigns or memory.
- Name the missing dataset: what it would hold, at what grain, for what period.
- Say what incorporating it needs, using the four tests in
  `governance/authority-rules.md` → `Dataset prerequisite for operational automation`:
  a traceable source, explicit uncertainty, a responsible owner and an update process.
  Recommend incorporation. The automation stop itself does not apply to drafting.
- Do not produce the affected figure, stat block, chart or table. Leave a marked gap
  where it would stand, and continue the rest of the brief as a bounded draft.

### Conflicts

When two sources give different values for one quantity, including two of the
requester's own sources:

- show both in the ledger, each with its source and status;
- do not choose one, average them, or present a range as settled;
- leave a marked open value in the body;
- compute nothing that depends on it: no total, per-unit amount or chart.

The validator named for that value resolves it; record who resolved it and when.

### Derived values, stat blocks, charts and tables

- A total, per-unit amount or percentage takes the weakest status of its inputs. Show
  its arithmetic in the ledger.
- Build stat blocks, charts and tables only from values that passed this ladder, with
  the underlying data and an as-of date recorded.
- A chart or table image supplied without its reconciled data is source material. Do
  not reproduce it or read values off it as fact; list it in the ledger.
- A stat block carries the qualifier, period and source of the sentence it summarises.
- Apply `dca-design` for figures and series colours. It defines no chart style; do not
  invent one.

## Values that need more than a source

- A partner's figures — counts, shares, caseload — need the partner's own statement
  or records. Attribute them to the partner in the body.
- A restricted-purpose fund counts only for its purpose. Never show it as covering, or
  reducing the gap of, an unrelated ask. Structure of the ask: `funding-asks.md`.
- Keep apart, never summed or substituted: a donation, a funded cost, a shipment, a
  mission, an evacuation activity, a person evacuated, a person reached. Money states:
  `funding-asks.md`. Entity kinds: `preserve-dca-object-boundaries`.
- A public number states its period, its source and DCA's role in it.

## Historical material

Prior-year proposals, earlier campaigns, sent newsletters and old briefs are source
material only. They never define a current brief's figures or narrative. Old amounts:
`funding-asks.md`.

## Media

Apply this to every image or video. Assets are shortlisted, never selected.

### Tier 1 — linked or provided by the requester

- Each is a candidate, not a selection.
- Record the link and what the asset visibly shows, described under `dca-design`'s
  image-description rule.
- Record any condition the requester attaches, word for word. It travels with the
  asset into the ledger.
- File names, folder names and captions are claims about an asset. Take no date,
  place, mission number or person's name from them without a source.
- If the asset sits in an operational evidence drive, say so in the ledger. Do not
  decide its reuse.

### Tier 2 — compatible shared-drive media

Only when tier 1 yields nothing, or the requester asks for more options.

- Look only in communication-production media in DCA Marketing & Storytelling, as
  `organisation/drive-architecture/shared-drives/marketing-storytelling.md` defines it.
- Never take verification or evidence media from an operational drive.
- Compatible means documentary and real, with no identifiable vulnerable person
  without recorded consent, no unsafe location detail, and describable under
  `dca-design`.

### Tier 3 — nothing compatible, or no drive access

- Say which of the two it is.
- Use a labelled placeholder stating what the image should show.
- Never generate or fabricate imagery, use external stock, or substitute silently.

For every shortlisted asset, list rights, credit, consent and location safety in the
ledger for review.

## Structure of the draft

Adapt to the content. Leave out a part the evidence cannot support rather than filling
it.

1. **Title** — what the campaign aims to do, not a result.
2. **Narrative** — specific places and incidents the sources support and safety review
   allows.
3. **What cannot be fixed** — where a figure cannot be established, say so and why,
   instead of a precise-looking number.
4. **Stat block** — ladder-passed values with qualifier and period.
5. **The ask** — per `funding-asks.md`, with a cost-allocation table: category ·
   description · per unit · total.
6. **Payment designation** — only as validated; otherwise a marked gap.
7. **Transparency commitments** — only those with an established reporting route;
   otherwise listed in the ledger.
8. **Sources.**

## Sources

Every brief ends with a Sources section: one row per value and per asset, giving the
item, its source, the retrieval date and its status.

Status is one of: **user-provided, unverified** · **shared source, [stored status]** ·
**validated by [role], [date]** · **conflicting** · **not available**.

Mark unverified, conflicting and unavailable values where they appear in the body as
well. No claim may go beyond what its source supports. Name historical material used
as context, with its date.

## Review ledger

Outside the brief. One row per unverified claim, value, asset and open decision: the
item, its status, what would settle it, and the validator.

- Validators, from `funding-asks.md`: Finance for amounts paid and remaining gaps; the
  operational owner for needs, delivery, mission and field facts; Fundraising for the
  ask and the relationship.
- Designation, surplus and allocation wording: list Finance as the proposed validator
  and mark the ownership unconfirmed.
- Copy, imagery, consent, timing and publication: list as **open — owner not
  established by a current source** and say who could settle it. Do not assign it.
- Carry each asset's conditions word for word.

## Output

Return, in this order:

1. the draft brief, ending with its Sources section;
2. the review ledger;
3. text readiness — complete, or bounded with its gaps listed;
4. publication readiness — what remains, by validator and open decision. This skill
   never declares a brief ready to publish.

On a requested correction, change only what the correction or a factual problem needs.

## Boundaries

This file prepares a draft. It publishes, sends and selects nothing, and writes no
record, campaign, drive file or base.
