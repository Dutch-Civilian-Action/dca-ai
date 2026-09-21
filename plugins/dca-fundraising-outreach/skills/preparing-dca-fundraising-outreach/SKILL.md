---
name: preparing-dca-fundraising-outreach
description: Prepare DCA fundraising and outreach communication — outreach emails to churches, Rotary clubs, donors, funders and partners; funding asks and applications; presentation preparation; replies, thank-you messages and follow-up — built from the latest sent newsletter campaign, current DCA evidence and relationship history. Use when someone asks for an outreach or donor email, a funding request, a reply to a funder or partner, or material for a presentation. Do not use for newsletter subscription intake, contact-record maintenance, or logistics intake.
metadata:
  version: 0.1.0
  dca-workflow: prepare-fundraising-outreach
  mcp-server: mailchimp
---

# Preparing DCA Fundraising Outreach

Claude runtime adapter for the provider-independent
`workflows/prepare-fundraising-outreach.md`. The workflow defines what outreach
preparation means; this skill defines how Claude runs it. Do not duplicate or redefine the
workflow here.

Load a reference only when the task reaches it:

- [references/audiences.md](references/audiences.md) — audience and relationship stage,
  and what may and may not be adapted between versions.
- [references/campaign-selection.md](references/campaign-selection.md) — selecting the
  relevant newsletter campaign, and the retrieval-only Mailchimp boundary.
- [references/funding-asks.md](references/funding-asks.md) — funding-ask distinctions,
  applications, and follow-through after a reply or presentation.

## Before drafting

1. Read `workflows/prepare-fundraising-outreach.md` from the attached
   `Dutch-Civilian-Action/dca-ai` repository and apply it. If it is unavailable, say so as a
   configuration gap; do not reconstruct it from memory.
2. Use the DCA Core skills for source routing, repository navigation and shared object
   boundaries. Use the DCA Relationship Data skill for contact, organisation and
   relationship facts, and for any record addition or correction that authorised
   follow-through needs. Do not restate their rules here and do not create a parallel
   contact store.
3. Establish audience and relationship stage, purpose, current need, the concrete ask, and
   the facts, figures, links, images and prior commitments that constrain the message —
   from the brief and the reachable sources first. Do not ask again for what was supplied.
4. Retrieve the relevant campaign or approved material from its own source rather than
   asking for it to be uploaded.

Ask only the minimum questions needed to resolve a material gap; otherwise use an explicit,
marked placeholder.

## While drafting

- Keep the factual core identical across versions of the same message; adapt opening,
  emphasis, length and call to action.
- Distinguish confirmed facts, source claims, interpretation and proposals, and unresolved
  uncertainty. Never invent figures, relationships, prior contact, commitments, dates,
  outcomes or impact.
- Follow current verified DCA communication guidance and approved material, and preserve the
  sender's own direct, warm, practical voice from supplied examples. Brand authority sits
  with Marketing & Storytelling, not with this skill.
- Recheck time-sensitive claims against the relevant current operational or financial source
  before repeating them to a new audience.

## Output

Return a subject line and a clean recipient-facing draft. Keep outside the draft: material
unresolved checks, and a short source note for the substantive claims. State text readiness
and send readiness separately.

On a requested correction, preserve scope, structure and wording except where the correction
or a factual problem requires a change.

## Missing input

- **Missing task evidence** — continue with a bounded draft, mark each gap, and do not
  present it as verified or send-ready.
- **Configuration gap** — a required routing, authority, relationship or campaign source is
  unavailable. Name it, state which check could not be performed, mark that check
  unperformed, and do not substitute historical or easier material. Bounded drafting may
  continue.

Never merge the two: an unreachable source is not a missing figure.

## Authorization

Authorization is governed by `governance/authority-rules.md`. Apply the governing principle
of `providers/claude/tag/principal-action-authorization.md` — capability is never
authorization, and creating an artifact is not itself an organisational decision. That
document's five-link decision chain is Claude Tag–scoped; the principle transfers, the chain
does not. Do not cite the chain as if it were established for another surface.

Content, recipients and the sending action are distinct authorization questions and are
never inferred from one another. One explicit authorization can cover all three when its
scope plainly includes them — do not manufacture three confirmation exchanges for one clearly
scoped authorization. Before recommending a send, check recipient and thread history for
prior outreach, replies, promises, duplicate receipt, bounces, opt-outs and an existing
thread that should be continued. Never claim an action succeeded without a confirming result.

Whether a change is technically possible depends on the identity and account role in use;
whether it is permitted depends on the authority rules. When a change does not proceed, say
which of the two is the limit.

Before reviewing an automation plan or proposing, building, configuring or enabling
downstream operational automation, apply `governance/authority-rules.md` → `Dataset
prerequisite for operational automation`. That stop condition does not restrict ordinary
drafting, reading, replying or preparation work.

## Boundaries

- This skill sends, publishes and commits nothing, and mutates no campaign, audience,
  contact or record of its own accord.
- Newsletter subscription intake belongs to the Relationship Data capability's
  newsletter-intake route, not here.
- Goods, pickup and delivery evidence goes to Logistics intake; Need prioritisation goes to
  the Need review capability.
- Do not expand an ordinary drafting task into a system redesign. When the same outreach work
  recurs, propose it as a candidate DCA skill through the existing review and publication
  process rather than inventing local procedure.
