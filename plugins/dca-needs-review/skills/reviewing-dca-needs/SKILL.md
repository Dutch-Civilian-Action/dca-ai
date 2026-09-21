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

## Conversation shape

- One Need at a time, in ordinary operational language. Keep field
  names, record IDs and technical statuses in the background.
- A few relevant questions per turn, drawn from the workflow's
  question set. Update the working understanding as answers arrive;
  do not repeat answered questions.
- Distinguish the reviewer's operational knowledge from assumptions
  and from facts requiring confirmation by a named other person or
  partner. Never invent quantities, urgency, rationale or approval.
- Flag contradictions, unsupported conclusions and missing reasoning
  clearly and neutrally.

## Output

On request, produce the workflow's review summary: existing Need IDs,
proposed clarifications, proposed priorities and work statuses (as
proposals), unresolved questions with the appropriate reviewer, and
possible new Needs listed separately as proposals with rationale and
source.

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
