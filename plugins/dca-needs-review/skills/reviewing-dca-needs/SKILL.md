---
name: reviewing-dca-needs
description: Guide a responsible DCA person through reviewing Needs — what is required, for whom, why, what existing supplies or arrangements cover, what remains missing, suitability, exclusions, timing, and proposed priority — producing proposals for joint review. Use when someone wants to review, prioritise, or clarify Needs. Do not use for record maintenance, logistics intake, or relationship lookups.
metadata:
  dca-workflow: review-dca-needs
---

# Reviewing DCA Needs

Claude runtime adapter for the provider-independent
`workflows/review-dca-needs.md`. The workflow defines what a review
means; this skill defines how Claude runs one. Do not duplicate or
redefine the workflow here.

## Before reviewing

1. Read `workflows/review-dca-needs.md` and apply it.
2. Apply `context/source-routing.md`; resolve any Airtable
   destination through `context/airtable-workspace-map.md` by
   workspace and base ID, never by name similarity.
3. Read the routed Need records and their recorded sources before
   asking the reviewer anything they already answered.
4. Establish which project or operational scope is being reviewed
   before asking about priority or work selection: from the routed
   Project record and its linked Needs, from the project context the
   surface already carries, or by asking the reviewer. Do not assume
   a scope, and state the one in use.

## Conversation shape

- One Need at a time, in ordinary operational language. Keep field
  names, record IDs and technical statuses in the background.
- A few relevant questions per turn, drawn from the workflow's
  question set. Update the working understanding as answers arrive;
  do not repeat answered questions.
- Ask priority and work-selection questions for the established
  scope, and record the answers as that scope's decisions. When a
  Need is linked to more than one project, say so, treat a pause or
  deferral as this scope's work only — the Need and the other
  projects' work stay as they are — and note that the other
  projects' work decisions were not assessed.
- Distinguish the reviewer's operational knowledge from assumptions
  and from facts requiring confirmation by a named other person or
  partner. Never invent quantities, urgency, rationale or approval.
- Flag contradictions, unsupported conclusions and missing reasoning
  clearly and neutrally.

## Output

On request, produce the review summary as the workflow's output
contract defines it: state the scope, then one entry per existing
Need and, separately, per possible new Need. Lead each entry with the
readable need name and a short operational rationale; then the
proposed priority and work decision with its reason and scope, marked
as a proposal; then the supporting sources, attributing the
reviewer's own input to them by name and review date; then what is
still uncertain and who can resolve it. Put the record ID after the
name, as a reference, not as the heading. Kees or Anja should be
able to read and act on the summary without knowing the database.

## Boundaries

- A review produces proposals. It changes no records and grants no
  write authority; any maintenance write follows the authority the
  runtime surface already has, unchanged, including its confirmation
  protocol.
- Priority and active/paused handling are proposals until their
  definitions and implementation are agreed; never insert them into
  fields with different meanings.
- Proposed new Needs remain proposals; do not create them or direct
  anyone to create them manually.
- For record maintenance, logistics intake or relationship lookups,
  use the capability that owns that domain instead of this skill.
