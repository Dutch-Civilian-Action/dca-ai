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
- The project or operational scope under review, established from
  existing context — the routed Project record and its linked Needs,
  the executing surface's standing project context, or the reviewer's
  statement of what is being reviewed — before any priority or
  work-selection question is asked. Do not assume a scope.
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
8. Within the scope under review, what priority does the reviewer
   propose, and why?
9. Within that scope, should work on this Need be active now,
   deferred, or paused? What would allow paused work to resume?

## Required distinctions

Keep these decisions separate throughout:

- **Validation** — what is established, and at what scope.
- **Need lifecycle** — whether the requirement remains unmet, is
  partially met, is met, or has been withdrawn.
- **Work selection** — whether it is actively being addressed.
- **Priority** — why it should receive attention relative to other
  work.
- **Scope of the decision** — which project or operational scope a
  priority or work-selection decision belongs to.

Priority, active work, deferral and pausing are decisions of a
project or operational scope about a Need, not properties of the Need
itself. A Need may support more than one project, and each holds its
own work decision. Pausing or deferring one project's work on a
shared Need does not pause the Need, does not change its lifecycle,
and says nothing about another project's work on it. Carry the
established scope into every such proposal, and state it; where a
Need supports other projects, note that their work decisions were not
assessed in this review.

Distinguish the reviewer's operational knowledge from assumptions
and from facts requiring confirmation by a named other person or
partner. Never invent quantities, urgency, rationale or approval.

Priority and active/paused handling are proposals until their
definitions and implementation are agreed. Do not insert them into
fields with different meanings, and do not confuse them with
validation or fulfilment state.

## Output contract

On request, a review summary that a responsible person can act on
without database knowledge. It names the scope under review, then
lists existing Needs, and separately possible new Needs listed as
proposals after checking for an existing matching requirement.

For every entry, existing or proposed new, the summary gives:

- a readable need name and a concise operational rationale — what is
  required, for whom, and why a gap remains;
- proposed clarifications to what is recorded, where any;
- the proposed priority and work decision (active, deferred, paused),
  each with its reason and the scope it applies to, marked as a
  proposal;
- the supporting sources: recorded sources by reference, and the
  reviewer's own input attributed to the named reviewer and the
  review date, kept distinct from facts a named other person or
  partner still has to confirm;
- the remaining uncertainty, and who can resolve each item.

Record IDs are carried for traceability but stay secondary: they
follow the readable name rather than replace it, and never serve as
the only way to tell entries apart. Unresolved questions may be
gathered in one closing list as well, each with its resolver, but
every entry keeps its own uncertainty visible.

A review request does not authorise record changes. Proposed new
Needs remain proposals; the workflow does not create them or direct
anyone to create them manually. Accepted proposals route to the
person holding the relevant record-creation authority.

## Boundary with other workflows

- Record maintenance follows the executing surface's own confirmed-
  write protocol, outside this workflow.
- Relationship lookups route to the Relationship Data capability.
- Offer, pickup and receipt evidence routes to Logistics intake.
