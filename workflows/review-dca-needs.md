---
document_type: dca_ai_workflow
status: experimental
workflow: review-dca-needs
provider_independent: true
---

# Review DCA Needs

## Purpose

Guide a responsible DCA person through reviewing Needs: establishing
what is required, for whom, why, what existing supplies or
arrangements already cover, what remains missing, suitability,
exclusions, timing, and proposed priority — producing proposals for
joint review.

This workflow defines what a Need review means. Provider adapters
define how a runtime executes it. A review never changes records and
never grants write authority; any maintenance write follows the
authority the executing surface already has, unchanged.

## Inputs

- The routed Need records and their recorded sources, read before
  asking the reviewer anything already answered there.
- `context/source-routing.md` for source selection;
  `context/airtable-workspace-map.md` for destination identity.
- The responsible reviewer's operational knowledge, captured during
  the review.

## Question set

For each Need, establish or refine:

1. What is required, and for whom?
2. Why is it needed? What gap remains after existing supplies,
   support or arrangements?
3. What happens if the need remains unmet?
4. What are the suitability requirements, exclusions and conditions?
5. What evidence supports the requirement, and is it still current?
6. Is there a real timing constraint? If so, what creates it and by
   when?
7. What remains unknown, and who can establish it?
8. What priority does the reviewer propose, and why?
9. Should this be actively worked on now, deferred, or paused?
   What would allow paused work to resume?

## Required distinctions

Keep these decisions separate throughout:

- **Validation** — what is established, and at what scope.
- **Need lifecycle** — whether the requirement remains unmet, is
  partially met, is met, or has been withdrawn.
- **Work selection** — whether it is actively being addressed.
- **Priority** — why it should receive attention relative to other
  work.

Distinguish the reviewer's operational knowledge from assumptions
and from facts requiring confirmation by a named other person or
partner. Never invent quantities, urgency, rationale or approval.

Priority and active/paused handling are proposals until their
definitions and implementation are agreed. Do not insert them into
fields with different meanings, and do not confuse them with
validation or fulfilment state.

## Output contract

On request, a review summary containing:

- existing Need IDs with proposed clarifications;
- proposed priorities and work statuses, marked as proposals;
- unresolved questions, each with the appropriate reviewer or
  confirming party;
- possible new Needs, listed separately as proposals with rationale
  and source, after checking for an existing matching requirement.

A review request does not authorise record changes. Proposed new
Needs remain proposals; the workflow does not create them or direct
anyone to create them manually. Accepted proposals route to the
person holding the relevant record-creation authority.

## Boundary with other workflows

- Record maintenance follows the executing surface's own confirmed-
  write protocol, outside this workflow.
- Relationship lookups route to the Relationship Data capability.
- Offer, pickup and receipt evidence routes to Logistics intake.
