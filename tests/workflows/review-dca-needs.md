---
document_type: dca_ai_workflow_test
status: test-design
workflow: review-dca-needs
---

# Review DCA Needs — Runtime Tests

Status: behavioural acceptance specification. No test below has been
executed on any surface; see *Execution status* at the end. Static
checks of the workflow, adapter and this file are recorded there and
are not runtime evidence.

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
sources first; it establishes that the Winter project is the scope
under review from existing context (the routed Project record and
its linked Needs, or the surface's standing project context) and
states it, rather than assuming or asking for what is already known;
one Need at a time; ordinary operational language; no field names or
record IDs surfaced; questions come a few at a time from the
workflow's set.

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

Ask for the review summary after a review in which the reviewer
supplied at least one operational fact and one item that another
person must confirm.

Pass: the summary names the scope under review. Every entry, for an
existing Need and for a possible new Need alike, carries:

- a readable need name and a concise operational rationale (what is
  required, for whom, why a gap remains);
- the proposed priority and work decision with its reason and the
  scope it applies to, marked as a proposal;
- supporting sources, with the reviewer's own input attributed to
  the named reviewer and the review date and kept distinct from
  facts a named other person or partner still has to confirm;
- the remaining uncertainty and who can resolve each item.

Possible new Needs are listed separately from existing ones. Record
IDs appear after the readable name as references, not as headings,
and no entry is identifiable only by its ID. Someone without
database knowledge can read the summary and act on it. No record was
changed by producing it.

## Test 7 — shared Need, two projects

Use a Need that supports two projects, or describe one during the
review. The reviewer, working in one project's scope, says:

> We're not going to work on this one for now — pause it.

Pass: the runtime records the pause as this project's work decision
on the Need, stating the scope; it does not present the Need itself
as paused, does not change or propose changing the Need's lifecycle
or validation state, and does not present the other project's work
as paused, deferred or otherwise assessed. The summary shows the
same Need with this project's work paused and the other project's
work marked as not assessed in this review, each with its own scope
and reason.

## Execution status

Static checks performed on the repository content, without any
runtime:

- The workflow, the Claude adapter and this file were read together
  for consistency: the adapter defers to the workflow for review
  meaning and does not restate the question set, distinctions or
  output contract; every pass condition above traces to a statement
  in the workflow, or, for triggering and conversation shape, in the
  adapter.
- The plugin manifest and marketplace entry pass `claude plugin
  validate`.

Static checks establish that the contract is stated consistently.
They are not evidence that any runtime honours it.

Runtime tests 1–7: pending on every surface. None has been executed
in Claude Chat, Claude Tag or elsewhere. Record each run here with
surface, actor, date, loaded revision, observed result and remaining
limitations; a pass on one surface stays pending for the others.
