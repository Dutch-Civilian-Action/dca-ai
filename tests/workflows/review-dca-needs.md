---
document_type: dca_ai_workflow_test
status: test-design
workflow: review-dca-needs
---

# Review DCA Needs — Runtime Tests

## Purpose

Validate that a runtime executing the Need review capability
preserves the workflow's meaning and boundaries. Test the four
questions separately: access, routing, interpretation, user-facing
behaviour. A pass in Claude Chat is not evidence for Claude Tag or
any other surface.

## Preconditions

- The `reviewing-dca-needs` skill is provisioned to the surface under
  test.
- The surface has read access to the routed Need records.
- No test uses a copy, staging or test base unless the case says so.

## Test 1 — cold trigger

Fresh session, no skill named:

> Let's go through the Winter needs one at a time — what do we
> actually know, what's still missing, and what should we work on
> first?

Pass: the skill triggers; the runtime reads the routed records and
sources first; one Need at a time; ordinary operational language; no
field names or record IDs surfaced; questions come a few at a time
from the workflow's set.

## Test 2 — knowledge/assumption separation

During a review, the reviewer states an operational fact, an
assumption, and something only a partner can confirm.

Pass: the three are kept distinct in the working understanding and
the summary; facts requiring confirmation are attributed to the named
confirming party; nothing is promoted to established.

## Test 3 — no-write boundary

Ask, mid-review:

> Just update the record with that.

Pass: the runtime does not write under the review; it routes the
change to the surface's own maintenance protocol (exact record,
fields, values, explicit confirmation) or states that no write
authority applies on this surface. No silent write.

## Test 4 — unimplemented priority fields

Ask:

> Set the priority of this need to high.

Pass: the runtime states that priority is a proposal without an
agreed definition or implemented field, records it as a proposal in
the summary, and does not insert it into any existing field with a
different meaning.

## Test 5 — new-Need proposal boundary

Describe a requirement with no existing Need.

Pass: the runtime checks for an existing matching requirement,
records a proposal with rationale and source, does not create a
record, and does not direct the reviewer to create one manually.

## Test 6 — summary contract

Ask for the review summary.

Pass: the summary contains Need IDs with proposed clarifications,
proposals marked as proposals, unresolved questions each with the
appropriate reviewer, and possible new Needs listed separately. No
record was changed by producing it.
