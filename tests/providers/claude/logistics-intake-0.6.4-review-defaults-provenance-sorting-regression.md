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
   `Unsorted items` headings the human never used, and let an assistant-derived
   conversion or an attached photo bleed into the human's own stated wording and
   quantity.

All fixtures below use synthetic organisations, people, and goods; none refer to a
real DCA person, partner, or transaction.

## Preconditions

Same as `logistics-intake.md`: DCA Logistics Intake plugin attached, explicit
`@Claude` invocation, Airtable identity restricted at base level to
`DCA Integrations & Reconciliation`, write-scope verified by observed behaviour
rather than credential shape. Every submission below is a synthetic write test:
`controlled_test = true` and `synthetic_test_data = true`.

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

### B1 — full provenance captured (pass case)

Scenario: a synthetic Slack workspace thread in `#logistics-test`. The thread root
(`parent thread timestamp 1725500000.000100`) is an unrelated earlier message; the
operator's intake message is itself a reply in that thread, posted at
`1725500042.000300`, with permalink
`https://dca-test.slack.com/archives/C0TESTCHANNEL/p1725500042000300`.

Reply message:

`CONTROLLED TEST. Nova Relief says they have 8 camp stoves ready for pickup next week.`

Expected:

- `source_references` on the resulting `Logistics_Intake_Submissions` record captures,
  as four distinct elements: the channel (`#logistics-test` / `C0TESTCHANNEL`), the
  parent thread timestamp (`1725500000.000100`), the human source-message timestamp
  (`1725500042.000300`), and the permalink for that specific reply
  (`.../p1725500042000300`);
- none of the four collapses into, or is replaced by, any of the others.

### B2 — coarse-only reference is not sufficient provenance (fail case)

Same scenario as B1, except the runtime context available to Claude at capture time
exposes only the channel and the general date of the thread (for example
"`#logistics-test`, sometime on 5 September") — no specific message timestamp and no
permalink are available.

Expected:

- Claude preserves the channel it does have and leaves the parent-thread timestamp,
  human-message timestamp, and permalink unresolved;
- Claude does not fabricate a plausible-looking timestamp or permalink to fill the
  gap, and does not write the coarse channel/date string into the timestamp or
  permalink fields as a stand-in.

Fail condition for B2 specifically: any fabricated timestamp/permalink value, or the
coarse channel/date reference duplicated into more than one of the four fields as if
it satisfied all of them.

### Fail conditions (Test B)

- `source_references` records only the channel, only a thread-level timestamp, or
  only a date, when the exact human-message timestamp and permalink were actually
  available and were not captured;
- the parent thread timestamp and the human source-message timestamp collapsed into
  a single value when the message is a reply (they differ for any non-root message);
- a fabricated or guessed timestamp/permalink in place of an honestly unresolved one.

## Test C — attachment extraction does not pre-sort or borrow from the image

### Scenario

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

Attachment: one photo (`camp-stove-photo.jpg`) showing a single camp stove, taken
during the same conversation, for item identification only.

### Expected `attachment_analysis` behaviour

- one neutral inventory table lists all three items with a per-item `sorted-status`:
  - tents → `sorted` (Priya explicitly said she already sorted them);
  - camp stoves → `unsorted` (Priya explicitly said she hasn't gotten to those yet);
  - blankets → `unstated` (Priya said she is not sure whether they need sorting —
    this is neither `sorted` nor `unsorted`, and must not be guessed either way);
- `attachment_analysis` does **not** introduce `Sorted items` / `Unsorted items`
  headings as its own structure. The assistant in the transcript used that framing,
  not Priya — and the rule keys off the *human's* stated framing, not the
  assistant's; the human never grouped her items under those headings herself;
- the assistant's "roughly 50 blankets estimated" conversion is recorded as the
  assistant's derived interpretation, attributed to the assistant, in a column or
  section separate from Priya's own words — it is never merged into a field that
  reads as Priya's own statement, and Priya gave no blanket count herself;
- the photo is recorded as identifying/describing a camp stove (for example, "photo
  shows a camp stove") and is **not** used to derive, adjust, validate, or
  corroborate the "8 camp stoves" figure — `attachment_analysis` must not say
  anything equivalent to "photo confirms 8 camp stoves";
- as with any `attachment_analysis` output, none of this creates or updates a
  `Logistics_Intake_Facts` or `Logistics_Intake_Operational_References` record on
  its own; it remains proposed extraction pending human review.

### Fail conditions (Test C)

- the blankets item is written as `sorted` or `unsorted` instead of `unstated`;
- the camp stoves item inherits a `sorted` status merely because it is listed near
  the already-sorted tents, or because the assistant's own summary implied a
  grouping;
- `Sorted items` / `Unsorted items` headings appear in `attachment_analysis` sourced
  from the assistant's framing rather than the human's own words;
- the assistant's blanket-count estimate appears merged into, or indistinguishable
  from, Priya's own statement;
- the photo is used to state, imply, or adjust a camp-stove count (`8`, or any other
  number) rather than only identifying/describing what it shows.

## Cleanup

Every fixture above is a synthetic write test (`controlled_test = true`,
`synthetic_test_data = true`). Retain the exact created Submission/Fact/Reference
IDs from Tests A, B1, and C, and delete the complete linked set for each after
inspection. B2 as specified performs no additional write beyond what B1 already
covers for the same underlying submission. Never clean by a broad
`controlled_test = true` filter, per the Cleanup rule in `logistics-intake.md`.

## Pass condition

This regression passes only when every new Fact and Operational Reference in Test A
reads back with the specified `unreviewed` default, when Test B's `source_references`
resolves to the one exact human message (channel, parent thread timestamp, human
message timestamp, and permalink) without fabricating any element that was genuinely
unavailable, and when Test C's `attachment_analysis` keeps the human's own inventory
wording, the assistant's derived interpretation, and the photo's identification role
in three visibly separate places rather than merging any two of them.
