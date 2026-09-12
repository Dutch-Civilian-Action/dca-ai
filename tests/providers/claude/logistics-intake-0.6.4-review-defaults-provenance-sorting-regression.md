---
document_type: dca_ai_provider_test
status: test-design
provider: claude
workflow: capture-logistics-intake
skill_version: 0.6.4
---

# Claude Logistics Intake 0.6.4 — Review Defaults, Slack Provenance, and Sorting Regression

## Purpose

Retest three verified runtime defects fixed by runtime invariants 10, 11, and 12 in
`capturing-dca-logistics-intake/SKILL.md`:

1. new staged Facts and Operational References were missing an explicit review-status
   default, and a reference's role went unmarked for review even when
   `proposed_operational_roles` was populated;
2. `source_references` for a Slack-sourced submission preserved only a thread- or
   date-level pointer instead of the exact human source message;
3. attachment extraction pre-sorted a human's inventory into `Sorted items` /
   `Unsorted items` headings, and let an assistant-derived conversion or an attached
   photo bleed into the human's own stated wording and quantity.

All fixtures below use synthetic organisations, people, and goods; none refer to a
real DCA person, partner, or transaction.

## Preconditions

Same as `logistics-intake.md`: DCA Logistics Intake plugin attached, explicit
`@Claude` invocation, Airtable identity restricted at base level to
`DCA Evidence & Reconciliation`, write-scope verified by observed behaviour
rather than credential shape. Tests A, B1, and C1/C2 are synthetic write tests
(`controlled_test = true`, `synthetic_test_data = true`); B2 is an explicitly
no-write reasoning case and creates no record.

## Test A — review-status defaults on new staged objects

### A1 — new Fact defaults to `validation_status = unreviewed`

Prompt:

`CONTROLLED TEST. Nova Relief says they have 8 camp stoves ready for pickup next week.`

Expected:

- one `Logistics_Intake_Facts` record is created for the camp-stove offer;
- read back immediately: `validation_status = unreviewed`;
- no other review-status value (for example `validated`, `confirmed`, or blank) is
  written at creation, regardless of how well-supported the statement looks.

### A2 — new Operational Reference defaults to `validation_status = unreviewed`

Using the same submission as A1:

Expected:

- the `Nova Relief` organisation reference is created with `entity_type = organisation`;
- read back immediately: `validation_status = unreviewed`;
- the same default applies to every other operational reference created from this
  submission (none exist yet in this case beyond the organisation).

### A3 — non-empty `proposed_operational_roles` defaults `role_validation_status = unreviewed`

Prompt:

`CONTROLLED TEST. Tomas is coordinating this Nova Relief pickup for this batch, but I am not saying he is DCA's general coordinator or partner contact.`

Expected:

- a person reference for `Tomas` is created with `entity_type = person`;
- `proposed_operational_roles` is populated with the supported contextual role
  (for example `coordinator`), scoped to this pickup only, not a canonical role;
- because `proposed_operational_roles` is non-empty, `role_validation_status` is
  read back as `unreviewed`;
- `validation_status` on the same reference is independently `unreviewed` per A2;
- no canonical Relationship Data role is created or changed.

### Fail conditions (Test A)

- any new Fact or Operational Reference created without an explicit
  `validation_status = unreviewed`, or with any other value;
- a reference with non-empty `proposed_operational_roles` left without
  `role_validation_status = unreviewed`;
- `validation_status` or `role_validation_status` set to a reviewed/validated value
  because the source statement looked credible or uncontested.

## Test B — Slack source provenance resolves to one exact message

`source_references` is one Airtable field on `Logistics_Intake_Submissions`. Everything
below describes the distinct elements that one field's value must hold together for a
Slack-sourced submission — channel, parent thread timestamp, human message timestamp,
and permalink — not four separate fields.

### B1 — controlled live invocation captures full provenance (synthetic write test)

Send an actual `@Claude` message in the real, currently-configured Logistics Slack
channel (the live channel this skill is attached to for the pilot, not a fictional
workspace), as a reply within an existing thread in that channel, so the message's own
timestamp genuinely differs from the thread's parent timestamp:

`CONTROLLED TEST. Nova Relief says they have 8 camp stoves ready for pickup next week.`

Expected:

- exactly one `Logistics_Intake_Submissions` record is created;
- its `source_references` value, read back, holds all four elements as they actually
  are in the live runtime: the real channel (name and ID), the real parent thread
  timestamp, the real human message timestamp for this specific reply (distinct from
  the parent thread timestamp), and the real permalink for this specific reply;
- record the exact captured `source_references` value in the test report for audit,
  since the real channel/timestamps/permalink are only known once this runs live;
- this is a synthetic write test — `controlled_test = true`, `synthetic_test_data = true`
  — so retain the exact created Submission ID (and any Fact/Reference ID it also
  produces) for the cleanup below.

### B2 — coarse-only context leaves provenance unresolved (no-write reasoning case)

This case makes no submission and creates no record. In the same test session, ask
Claude to reason about a hypothetical rather than to capture anything:

`Do not write anything. If all you had for a Slack-sourced Logistics submission was the channel name and the general date of the thread it came from — no specific message timestamp, no permalink — what would you record in source_references, and what would you leave unresolved?`

Expected:

- Claude states it would preserve only the channel within `source_references` and would
  leave the parent-thread timestamp, human-message timestamp, and permalink portions of
  that same field unresolved;
- Claude states it would not fabricate a plausible-looking timestamp or permalink to
  fill the gap, and would not substitute the coarse channel/date description for any of
  the missing elements;
- because this case is explicitly no-write, it is excluded from the write/cleanup
  claims in B1 and in the Cleanup section below — there is no record to retain or
  delete.

### Fail conditions (Test B)

- B1: `source_references` omits the human-message timestamp or the permalink when the
  live runtime context actually made them available;
- B1: the parent thread timestamp and the human message's own timestamp collapse into
  a single identical value, when the message is a reply to an existing thread (they
  must differ);
- B2: Claude's stated answer fabricates or guesses a timestamp/permalink, or proposes
  substituting the coarse channel/date text for one of the missing elements, instead of
  leaving them explicitly unresolved;
- either case: any of the four elements described as if it lived in its own separate
  Airtable field rather than as part of the one `source_references` value.

## Test C — attachment extraction always produces one neutral table, never headings

### C1 — neutral table separates human wording from assistant derivation

A synthetic warehouse-inventory transcript between a DCA contributor, "Priya", and an
AI assistant, submitted together with one photo from the same conversation.

Transcript excerpt (treat as exact wording to preserve, not to paraphrase):

```text
Priya: I've already sorted the 5 tents. There are also 8 camp stoves — I haven't
gotten to those yet. And 3 boxes of blankets, not sure if those need sorting.

Assistant: Got it — here's a cleaned summary:
Sorted items: 5 tents.
Unsorted items: 8 camp stoves, 3 boxes of blankets (roughly 50 blankets estimated).
```

Priya's own figure for the blankets is a box count — "3 boxes of blankets" — not an
individual-blanket count. "Roughly 50 blankets" is the assistant's own derived
estimate, converting Priya's box count into an individual-item estimate; Priya never
stated an individual-blanket number herself.

Attachment: one photo (`camp-stove-photo.jpg`) showing a single camp stove, taken
during the same conversation, for item identification only.

Expected `attachment_analysis` behaviour:

- one neutral inventory table lists all three items with a per-item `sorted-status`:
  - tents → `sorted` (Priya explicitly said she already sorted them);
  - camp stoves → `unsorted` (Priya explicitly said she hasn't gotten to those yet);
  - blankets → `unstated` (Priya said she is not sure whether they need sorting —
    this is neither `sorted` nor `unsorted`, and must not be guessed either way);
- `attachment_analysis` does **not** introduce `Sorted items` / `Unsorted items`
  headings as its own structure, even though the assistant's own transcript reply used
  that framing — the output is always one neutral table regardless of who used heading
  language;
- Priya's own blanket figure ("3 boxes of blankets") is preserved verbatim as her own
  wording; the assistant's "roughly 50 blankets" individual-item estimate is recorded
  as the assistant's derived interpretation, attributed to the assistant, in a column
  or section separate from Priya's own words — the two figures (3 boxes vs. ~50
  individual blankets) are never merged or presented as if Priya stated both;
- the photo is recorded as identifying/describing a camp stove (for example, "photo
  shows a camp stove") and is **not** used to derive, adjust, validate, or
  corroborate the "8 camp stoves" figure — `attachment_analysis` must not say
  anything equivalent to "photo confirms 8 camp stoves";
- as with any `attachment_analysis` output, none of this creates or updates a
  `Logistics_Intake_Facts` or `Logistics_Intake_Operational_References` record on
  its own; it remains proposed extraction pending human review.

### C2 — the neutral table holds even when the human herself uses heading language

A second, separate synthetic transcript excerpt, this time where the human contributor
— "Elin" — uses sorted/unsorted heading language directly, not just the assistant:

```text
Elin: Quick split for the warehouse count: Sorted: 6 blankets, 2 tarps. Unsorted:
10 camp stoves.
```

No photo is attached to this submission.

Expected `attachment_analysis` behaviour:

- `attachment_analysis` still represents these three items as one neutral table with
  a per-item `sorted-status` (blankets → `sorted`, tarps → `sorted`, camp stoves →
  `unsorted`) — it does **not** reproduce Elin's own `Sorted:` / `Unsorted:` heading
  structure as the output's own structure;
- Elin's exact heading wording ("Quick split for the warehouse count: Sorted: ...
  Unsorted: ...") is preserved verbatim in that item's own source wording/notes, so the
  fact that she framed it that way herself is not lost — it is just not used to reshape
  `attachment_analysis` into headed sections.

### Fail conditions (Test C)

- the blankets item in C1 is written as `sorted` or `unsorted` instead of `unstated`;
- the camp stoves item in C1 inherits a `sorted` status merely because it is listed
  near the already-sorted tents, or because the assistant's own summary implied a
  grouping;
- `Sorted items` / `Unsorted items` (or similarly pre-sorted) headings appear as
  `attachment_analysis`'s own structure in either C1 or C2, regardless of whether that
  framing came from the assistant (C1) or from the human herself (C2);
- Priya's own box-count wording ("3 boxes of blankets") and the assistant's derived
  individual-item estimate ("roughly 50 blankets") appear merged, or Priya's statement
  is represented as if she gave an individual-blanket count herself;
- the photo in C1 is used to state, imply, or adjust a camp-stove count (`8`, or any
  other number) rather than only identifying/describing what it shows;
- Elin's own heading wording in C2 is dropped entirely instead of being preserved in
  that item's source wording/notes.

## Cleanup

Tests A, B1, and C1/C2 are synthetic write tests (`controlled_test = true`,
`synthetic_test_data = true`). Retain the exact created Submission/Fact/Reference IDs
from each and delete the complete linked set after inspection. B2 is explicitly a
no-write reasoning case — it creates no record and has nothing to clean up. Never
clean by a broad `controlled_test = true` filter, per the Cleanup rule in
`logistics-intake.md`.

## Pass condition

This regression passes only when every new Fact and Operational Reference in Test A
reads back with the specified `unreviewed` default; when Test B1's `source_references`
value resolves to the one exact human message (channel, parent thread timestamp,
human message timestamp, and permalink, all within that single field) as captured
from the real live runtime, and Test B2's stated answer leaves the missing elements
honestly unresolved rather than fabricating or substituting for them; and when Test
C1/C2's `attachment_analysis` always renders one neutral sorted-status table — never
`Sorted items` / `Unsorted items` headings, regardless of who used that framing —
while keeping the human's own wording, the assistant's derived interpretation, and
(in C1) the photo's identification-only role in three visibly separate places rather
than merging any two of them.
