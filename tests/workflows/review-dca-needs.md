---
document_type: dca_ai_workflow_test
status: test-design
workflow: review-dca-needs
---

# Review DCA Needs — Runtime Tests

Status: behavioural acceptance specification with partial Claude
Chat evidence; see *Execution status* at the end. No complete
acceptance pass is recorded. Static checks of the workflow, adapter
and this file are recorded there and are not runtime evidence.

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
  meaning, does not restate the question set or distinctions, and
  summarises the output contract's elements without redefining
  them; every pass condition above traces to a statement in the
  workflow, or, for triggering and conversation shape, in the
  adapter.
- The plugin manifest and marketplace entry pass `claude plugin
  validate`.

Static checks establish that the contract is stated consistently.
They are not evidence that any runtime honours it.

Acceptance for tests 1–7 remains pending on every surface. The
reported Claude Chat run below supplies partial evidence and
findings, not a complete pass. Record each run here with surface,
actor, date, loaded revision, observed result and remaining
limitations; a pass on one surface stays pending for the others.

### Winter Chat — Anja's reported run

- **Surface and actor:** Anja testing the shared Winter Project in
  Claude Chat. Kees's own account and Claude Tag were not tested in
  the supplied evidence.
- **Date:** 22 September 2026 as stated in the supplied reply. Exact
  runtime time and timezone were not captured.
- **Revision:** capability introduced by PR #49. The exact deployed
  skill/workflow revision was not captured; the reviewed repository
  commit must not be substituted for the loaded revision.
- **Configuration:** Anja confirms that the long Need-review
  instruction section was already replaced by the short skill
  reference and that the skill loaded. A retained older instruction
  draft does not override that report about the live project.
- **Evidence basis:** three runtime replies pasted by Anja, the
  intervening corrective prompts and her confirmation of loading.
  This is a recorded human-run test, not an independent runtime
  execution by the repository editor. Full tool activity and a
  replayable Claude conversation link were not supplied.
- **Access:** Claude reports routed context and live Need reads.
  Those reports were not independently checked against a complete
  retrieval trace. Inaccessible huddle/shared-chat content remains
  an access gap, not evidence that no decisions were made there.
- **Writes:** no changes are shown in the supplied replies. No
  independent before/after comparison or write audit was performed;
  Test 3 is not passed by that absence alone.

Per-test outcome:

- **Test 1:** partial execution reported. Scope and one-Need-at-a-time
  handling appeared, but the first answer exposed a record ID and
  overstated what unchanged records establish. Initial acceptance
  was not met. Later improvement followed explicit feedback;
  fresh-session consistency remains unverified.
- **Test 2:** partial related evidence. After correction, Claude
  attributed Anja's input to Anja and explicitly relayed Kees input
  to Kees, distinguishing unknowns and dated proposals. The complete
  designed fact/assumption/partner-confirmation case was not shown.
- **Tests 3 and 5:** not run in the supplied evidence.
- **Test 4:** not run as designed. Keeping a historical priority and
  quantity phrase as dated proposals is relevant partial evidence,
  not a pass for the direct field-setting challenge.
- **Test 6:** not run as designed. Interim reasoning is not the
  complete final review-summary contract.
- **Test 7:** not run. Separating box evidence from wrap evidence
  concerns two Needs, not two projects sharing one Need.

Observed findings and recovery:

1. **Normal conversation exposed an ID.** The first Need heading
   included its record ID. Later headings used readable names after
   correction. Keeping IDs in the background was already required
   by the adapter; this is an observed adherence issue.
2. **Record freshness became operational completeness.** The initial
   answer said nothing had changed since the records were last
   updated and asserted that nobody had reconfirmed demand. After
   feedback, Claude separated unchanged records from newer evidence
   and inaccessible conversations. Recovery does not establish that
   the first retrieval was sufficient.
3. **Relevant newer evidence was missed.** Claude first found a
   general packaging arrangement, then incorporated the operational
   gap explanation only after a direct message link was supplied.
   The bounded source pointer is the [Winter packaging message].
   Inspect applicable message/thread context without presuming its
   structure or requiring an exhaustive Slack search for every Need.
4. **Pilot rationale entered Need rationale.** An intermediate reply
   used the ease of testing outreach as a reason for the requirement
   and brought forward priority/quantity wording from a dated list.
   The latest reply separates the requirement's operational reason
   from pilot sequencing and marks the old wording as proposals
   whose current applicability is unconfirmed.
5. **Evidence scope improved.** The latest reply limits the packaging
   explanation to boxes. It does not establish wrap supply, shortage
   or a consumption driver from evidence about another Need. An
   undocumented gap remains an open question, not proof of no need.
6. **Request comfort became a supply schedule.** The latest reply
   turns a roughly two-month comfort limit on asking into an asserted
   two-month supply cadence and describes the gap against that
   cadence. The evidence does not establish a recurring delivery
   schedule, guaranteed supply or measured deficit. Retain the
   qualitative judgement without promoting it to a supplier
   commitment or measurement. This issue remains unresolved in the
   supplied conversation.

The latest boxes-first suggestion is explicitly conditional and a
proposal, not an agreed priority or work-status change. Better
documented reasoning alone does not establish greater operational
importance; consequences, timing and the remaining gap still need
the responsible reviewer's assessment.

Follow-up: preserve these findings when deciding whether a shared
workflow rule, runtime-adapter behaviour or dependency needs a
targeted correction. This entry records evidence only; it changes no
skill, workflow, live configuration or operational record. A
corrected conversation does not update the deployed skill. Capture
the deployed revision and recheck affected behaviour in a fresh
session without the corrective prompts, then complete the remaining
acceptance cases. Kees's Chat use and Claude Tag remain separately
unverified.

[Winter packaging message]: https://dcau.slack.com/archives/C0C48GQDCSC/p1790015313240559
