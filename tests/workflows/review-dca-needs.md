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
reported Claude Chat runs below supply partial evidence and
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

### Winter Chat — fresh-session run, 22 September 2026 (Test 1)

- **Surface and actor:** Anja, fresh chat in the shared Winter
  Project, Claude Chat. Model/effort per model-selection.md default
  (Sonnet 5, Medium) — reported by the operator; exact send time and
  timezone not captured. Conversation link not captured. Assessment
  performed in a separate configuration chat against this
  specification; corrective input and environment repair are marked
  below wherever they occurred.
- **Loaded revision:** the loaded revision was not established in
  this run. The inspected skill files did not expose a revision
  identifier (frontmatter is name + dca-workflow only); no other
  provenance method was verified (finding C below). The runtime
  reported two byte-identical SKILL.md copies on its filesystem:
  plugins path dca-needs-review:reviewing-dca-needs and a standalone
  reviewing-dca-needs (finding D; runtime self-report, not
  independently verified by the repository editor). Airtable reads
  appeared live in the supplied tool-activity trace (Needs
  lastModifiedTime 2026-09-16T08:53:37Z on all five records).
- **Evidence basis:** full first response with visible tool-activity
  trace (screenshot captured); the runtime's own capability
  self-report in answer to a post-hoc meta-question; subsequent
  turns pasted into the configuration chat. Human-run and
  operator-assessed; not an independent runtime execution by the
  repository editor. The repository editor verified nothing inside
  the runtime environment: every configuration and filesystem
  statement here is operator-reported or runtime-reported.

**Test 1 — cold trigger:** FAIL on initial acceptance.

- **Met:** routed reads first (trace shows source-routing/authority
  searches, shared-structure-build, Airtable schema, live Need
  records, then Slack channel/thread); scope established from
  standing context and stated; Winter-scoped work proposal
  explicitly separated from the Needs' shared validation and
  fulfilment state; no redundant scope clarification.
- **Unmet:** all five Needs presented at once with a prioritisation,
  not one at a time; record IDs in Need headings and base/table IDs
  and technical statuses inline (recorded finding 1 reproduced,
  uncoached); no questions asked from the set — the response ended
  in action offers.
- **Diagnosis:** the runtime stated retrospectively that the
  reviewing-dca-needs skill did not load, that the per-Need
  structure was echoed from the live project instructions'
  description of the skill, and that one knowledge search for the
  SKILL.md missed and was not retried. That statement is supporting
  evidence for a loading or triggering diagnosis, not independent
  proof of root cause: it was produced by the same runtime whose
  behaviour is under assessment, and no independent trace of skill
  loading was captured. It does not exclude behavioural failures,
  and it does not establish that the adapter's wording is
  exonerated. The unmet items above remain unattributed until a
  fresh-session retest separates triggering from adherence.
- **Recorded-findings recheck within this response:** finding 1
  reproduced (IDs exposed); finding 6 recurred (the ~2-month
  asking-comfort limit on Beelen/Kitemana was again treated as a
  supply cadence with an asserted usage excess against it); findings
  2 and 3 did NOT recur (unchanged records were separated from newer
  Slack evidence unprompted, and the Beelen/Kitemana gap was
  surfaced with dataset-prerequisite framing, visible in the trace
  as "Flagging unrecorded supply evidence before updating shared
  records").
- **Status:** Test 1 remains FAILED pending a fresh-session retest
  after correction. Fresh-session consistency of the recorded run's
  coached improvements is now partially answered: finding 1 and
  finding 6 recur uncoached; findings 2 and 3 held.

Session continuation (explicitly-invoked, not cold acceptance):

- After the operator directed the runtime to load the skill by name
  (corrective input, recorded as such), both SKILL.md copies were
  read in full and the review restarted conforming: scope stated per
  adapter step 4, one Need (stretch wrap), a few questions from the
  set, ordinary operational language, offer-answerable suitability
  questions deferred, reviewer
  knowledge/assumption/partner-confirmation distinction offered
  unprompted. Minor: the scope line carried the Project record ID as
  a trailing reference (contract-compatible; monitored).
- workflows/review-dca-needs.md was NOT retrievable from the Winter
  project's knowledge index across six targeted queries in two
  turns, while the same file was retrievable from the separate
  configuration project's index the same day (finding B). The
  runtime explicitly declined to reconstruct the question set by
  analogy to retrievable sibling workflows. The operator then
  supplied the workflow text inline, provenance-marked as an
  unverified snapshot copy (environment repair, recorded as such).
- Runtime reconciliation of the supplied workflow against its
  SKILL.md-only run: no contradiction found; two material
  self-findings: (1) question-set under-coverage — only Q1, Q4, Q7
  had been drawn; Q3, Q6, Q8, Q9 missed (finding E); (2) the output
  contract's "proposed clarifications to what is recorded" element
  is not separately named in the SKILL.md paraphrase and would have
  been folded into uncertainty (finding F, self-corrected forward;
  verify at Test 6). The runtime also correctly read the workflow's
  status: experimental as carrying less settled authority than
  current siblings, and held Q8/Q9 back as premature before the
  missing/timing picture — correct sequencing judgment not spelled
  out by the workflow.

Tests 2–7 at the time of this entry: PENDING, with the session
positioned at the Test 2 input (reviewer's answers on the
stretch-wrap Need). Their results are recorded in the continuation
entry below as explicitly-invoked evidence, distinct from cold
acceptance; Test 1 cold acceptance additionally requires a fresh
session after correction. Kees's own account and Claude Tag remain
untested.

New findings (this run):

- A. **Trigger miss:** a cold request matching the skill description
  verbatim did not produce skill-conforming behaviour. On the
  runtime's own account the skill did not load and the request was
  satisfied from the project instructions' method paraphrase plus
  repository fragments, while reporting routed reads honestly. That
  account is consistent with the observed behaviour; it is not
  independent confirmation of the cause.
- B. **Per-project knowledge-index divergence:** the workflow file
  retrievable in one project's index and persistently missed in
  another's the same day; suspected stale sync of the Winter
  project's repository source (verification and refresh are an
  operator action; see the continuation entry below for the
  operator's reported cause and repair).
- C. **Loaded revision not established:** the inspected skill files
  did not expose a revision identifier, and no other provenance
  method was verified in this run. A revision identifier carried in
  the skill files is one possible remedy; other provenance methods
  were not assessed.
- D. **Duplicate provisioning reported:** the runtime reported two
  byte-identical SKILL.md copies under distinct installed paths on
  its filesystem (runtime self-report, not independently verified by
  the repository editor). The plugin README prohibits maintaining a
  mirrored implementation inside the repository; it does not
  establish that two installed copies breach that rule. Any
  contribution to the trigger failure remains a hypothesis.
- E. **Adapter-alone under-coverage:** without the workflow file the
  question set degrades to a subset (Q1/Q4/Q7 observed); the
  anti-duplication design makes workflow reachability load-bearing.
- F. **Paraphrase hazard:** the live project instructions describe
  the skill's method richly enough that a runtime that did not load
  it, as reported here, produced a convincing partial imitation; a
  thinner pointer would fail louder.
