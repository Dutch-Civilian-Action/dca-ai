---
document_type: dca_ai_workflow
status: experimental
scope: fundraising-outreach-preparation
workflow: prepare-fundraising-outreach
provider_independent: true
---

# Prepare Fundraising Outreach

## Purpose

Prepare DCA fundraising and outreach communication from current evidence: outreach
emails, funding asks and applications, presentation preparation, replies, thank-you
messages and follow-up, for churches, Rotary clubs, donors, funders and partners.

This workflow defines what outreach preparation means. Provider adapters define how a
runtime executes it. Preparation is drafting and record-reading work: it sends nothing,
publishes nothing and commits DCA to nothing.

Churches and Rotary clubs are audiences within this one scope, not separate workflows.

## Inputs

- The outreach brief for this task: recipient or audience, occasion, intended next step,
  and any supplied material.
- The relevant newsletter campaign or other approved communication material, retrieved
  from its own source rather than re-uploaded.
- Relationship and outreach history for the recipient, read through the Relationship Data
  capability; this workflow keeps no contact store of its own.
- `context/source-routing.md` for source selection, `context/current-authority.md` for
  current-vs-historical status, and, where an Airtable destination is involved,
  `context/airtable-workspace-map.md` for base identity.
- Current verified DCA communication guidance and approved communication material.
- `governance/authority-rules.md` for evidence, authority and automation boundaries.

## Establish before drafting

Establish these from the available evidence, not from assumption, and do not ask again for
what the brief or the reachable sources already supply:

1. **Audience and relationship stage** — who the recipient is, and whether this is first
   contact, an existing relationship, a reply, or follow-up on something already agreed.
2. **Purpose** — why DCA is contacting them now.
3. **Current need** — the confirmed need, project or campaign the message rests on.
4. **The ask** — the specific request and the intended next step.
5. **Constraints** — the facts, figures, links, images, dates and prior commitments the
   message must respect, and which of them are time-sensitive.

Ask only the minimum questions needed to resolve a material gap. Where a gap is not
material to the decision the recipient is being asked to make, use an explicit placeholder
and mark it. A draft containing a placeholder is never presented as ready to send.

## Campaign and approved-material selection

When outreach is built on a newsletter campaign or other approved material:

- Distinguish sent from draft by send status and date. Take the **latest sent** campaign as
  the basis, and **name any newer draft explicitly** rather than silently using or ignoring
  it.
- Confirm which campaign is meant when more than one could plausibly be intended, or the
  reference is genuinely ambiguous. Do not raise a confirmation question when the evidence
  already resolves it.
- Retrieve content, images, links, status and dates from the campaign source directly where
  access exists. If it is unavailable, name the configuration gap and continue from supplied
  material.
- A campaign having been sent establishes that it went out. It does not establish that its
  content is current, still factually true, or approved for a different audience. Recheck
  time-sensitive claims against the relevant current operational or financial source.
- Carry images and links over as they appear. Verify what an image depicts; never invent
  captions, dates, locations or outcomes for one.

## Evidence discipline

Distinguish, and keep distinguishable in the output:

- confirmed facts;
- claims a named source makes;
- interpretation and proposals;
- unresolved uncertainty.

Never invent recipients, prior contact, figures, amounts, relationships, commitments,
dates, outcomes, impact or source contents. A newsletter, an old proposal, a draft budget
or a chat message does not establish current operational or financial state.

Two kinds of missing input behave differently and must not be merged:

- **Missing task evidence** — a campaign, image, thread, brief or specific figure was not
  supplied or is not reachable. Continue with a bounded draft, mark each gap explicitly, and
  do not present the result as verified or send-ready.
- **Configuration gap** — a required routing, authority, relationship or campaign source is
  unavailable to the runtime. Name it as a configuration gap, state which check could not be
  performed, and mark that check unperformed. Do not substitute historical or
  easier-to-retrieve material, and do not imply the check passed. Bounded drafting may still
  continue.

## Adapting across audiences

Keep the factual core, the relevant images and the underlying figures identical between
versions of the same message. Adapt opening, emphasis, length and call to action to the
recipient.

- For churches, use supported community or diaconal context.
- For Rotary clubs, use supported club, presentation or partnership context.

Do not assume religious affiliation, club priorities, existing support, prior giving or a
personal relationship. Do not let adaptation change what is being claimed as true.

Follow current verified DCA communication guidance and approved material; brand authority
and approved material sit with Marketing & Storytelling, not with this workflow. Where that
guidance is reachable, it governs. The working characterisation carried into this workflow —
clear, grounded, concrete, calm; `Need → Action → Delivery → Impact` where it fits; real
numbers, dates and locations; no NGO cliché, manufactured urgency, guilt or inflated impact;
one primary call to action — is a working description, not brand authority, and yields to
the current guidance where they differ. Preserve the sender's own direct, warm, practical
voice from supplied examples. Write in the requested language, otherwise the language of the
existing correspondence.

Do not imply that a donation is unrestricted, earmarked, matched or tax-deductible without
applicable confirmation.

## Output contract

Return:

1. a subject line;
2. a clean recipient-facing draft;
3. outside the draft: material unresolved checks, each naming what could not be established
   and why;
4. outside the draft: a short source note saying what each substantive claim rests on.

Internal uncertainty, working notes, personal data and source mechanics stay out of the
recipient-facing text. State text readiness and send readiness separately; they are
different conclusions.

On a requested correction, preserve scope, structure and wording except where the correction
itself, or a factual problem, requires a change. Do not re-optimise the rest of the draft.

## Authorization

Authorization is governed by `governance/authority-rules.md`. Capability is never
authorization: access to a mailbox, a document, a record, a campaign or an editing tool
never widens what is permitted, and creating an artifact is not itself an organisational
decision.

Treat as three distinct questions, never inferred from one another:

- **content** — may this text be sent in DCA's name;
- **recipient** — may it go to these people;
- **send** — may the sending action be performed now.

One explicit authorization can cover all three when its scope plainly includes all three.
Do not manufacture three separate confirmation exchanges for one clearly scoped
authorization, and do not read a content approval as a send approval.

An instruction to act — "send it to the church list", "just send it" — is a request **and**
potentially the authorization for it. Evaluate it against the context already established in
the task rather than classifying it as unauthorised by default:

- Where the text, the recipients or the requester's authority over this outreach is not
  established, name **that specific gap** — which of the three is unresolved and what would
  settle it. Do not report a generic missing authorization, and do not let one unresolved
  element stand in for the others.
- Where the established context and the instruction together settle content, recipients and
  the sending action, **recognise that** and say so. Do not ask again for what has already
  been given.

Recognising an authorization is not the same as performing the action. This workflow prepares;
it does not send. Where an outreach action is properly authorised but lies outside the
executing capability's scope, say so plainly — the stop is scope, not a missing authorization
and not necessarily a missing tool or access — and hand over the finished draft with the
authorised route named. Keep the three possible reasons for not acting distinct and never
substitute one for another:

- **scope** — the action is outside what this capability does;
- **authorization** — a required permission is not established;
- **access or capability** — the runtime cannot technically reach or perform it.

Tool availability settles none of them: a send-capable connector neither grants authorization
nor removes the scope boundary, and an absent tool is not a finding about authority.

Before recommending or handing over a send, check recipient and thread history: prior
outreach, replies, promises, duplicate receipt, bounced addresses, opt-outs, and an existing
thread that should be continued. Drafting is not evidence of sending. Never claim an action
succeeded without a confirming result.

Responsibilities and decision rights come from current governed sources. Where an artifact is
stored does not settle who decides about it. Where a specific communication decision has no
owner established by a current source, name it as an open decision and say who could settle
it; do not assign it.

## Funding asks and follow-through

For a funding request, keep separate: the underlying need; the request to this funder; what
is already covered; the remaining gap; and the evidence the funder needs. Do not reuse an
old amount as the current one.

Keep these five states distinct and never collapse them into "raised" or "spent": proposed
support, donor commitment, received donation, allocation, actual expenditure.

After outreach, a reply or a presentation, identify outcome, outstanding commitment, next
action, owner and agreed timing. Preserve them through the existing authorised record route;
where that is not possible, give a concise proposed record with source links and say it is
unrecorded. Do not invent deadlines, and do not mark work complete from intent alone.

## Boundary with other capabilities

- Source routing, repository navigation and shared object boundaries → the Core routing
  capability.
- Contact, organisation and relationship facts, and any record addition or correction needed
  for authorised follow-through → the Relationship Data capability, under its identity,
  provenance and confirmation rules. No parallel contact store, and no extra handoff step for
  follow-through that capability already permits.
- Newsletter subscription intake → `intake-newsletter-contacts.md`. This workflow reads
  campaigns; it does not subscribe anyone.
- Goods, pickup and delivery evidence → Logistics intake.
- Need review and prioritisation → the Need review workflow.

This workflow performs no campaign, audience or contact mutation of any kind.

## Dataset prerequisite

Before reviewing an automation plan or proposing, building, configuring or enabling
downstream operational automation arising from outreach work, apply
`governance/authority-rules.md` → `Dataset prerequisite for operational automation`. The stop
condition is scoped to downstream operational automation. It does not restrict ordinary
drafting, reading, replying or preparation work.

## Known gaps

These remain open and must stay visible wherever this workflow is implemented:

1. **Communication's functional decision rights are not established by a current source.**
   Reachable current sources state the split as storage and routing: Fundraising is canonical
   for outreach operations, emails and follow-up; Marketing & Storytelling is canonical for
   brand, content production and published content, explicitly not for fundraising outreach
   execution. A functional layer model naming Communication as a decision owner appears only
   in historical material that current Claude guidance forbids falling back to. Until a
   current source settles it, work from verified guidance and approved material and mark an
   unowned communication decision as open.
2. **Fundraising, Finance and operational ownership.** Fundraising is responsible for outreach
   intent, funding asks, donor and partner relationships, and fundraising follow-through.
   Finance validates amounts paid and remaining funding gaps. Operational owners validate
   needs, delivery and mission claims. Do not expand an ordinary drafting task into a system
   redesign.
3. **Write capability is a credential question, not a behaviour question.** Whether a record or
   campaign change is technically possible is settled by the identity and account role in use;
   whether it is permitted is settled by the authority rules. State which of the two is the
   limit whenever a change does not proceed, and verify capability at the credential rather
   than by observing a session.
