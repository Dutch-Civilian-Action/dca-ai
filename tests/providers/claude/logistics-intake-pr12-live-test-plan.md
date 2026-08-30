---
document_type: dca_ai_provider_test
status: test-design
provider: claude
workflow: capture-logistics-intake
related_pull_request: https://github.com/Dutch-Civilian-Action/dca-ai/pull/12
---

# Claude Logistics Intake — PR 12 Live Test Plan (#struct-system-build)

## Purpose

Execute a controlled live Claude Tag run to verify the four rule changes in
[PR 12](https://github.com/Dutch-Civilian-Action/dca-ai/pull/12) — correction
target matching, correction direction preservation, Direct Transit non-field
handling, and the offered/expected unresolved flag — plus the surrounding
cases (A/B/D/F equivalents) they sit alongside. This supersedes the earlier
ad hoc six-message test prompt, which bundled all cases into a single input
turn and used real-sounding partner/people names; see "Why this plan differs"
below.

Preconditions and cleanup rules follow
`tests/providers/claude/logistics-intake.md` (explicit `@Claude` invocation,
`controlled_test = true`, synthetic data only).

**Correction on credential scope:** the Airtable identity attached to this
channel is restricted at the base level to `DCA Integrations & Reconciliation`
only. The current Airtable implementation cannot restrict it to the three
Logistics intake staging tables specifically — it can technically read/write
any table in that base. "The identity cannot reach other tables" is **not**
a valid pass criterion anywhere in this plan. The actual safety boundary is
runtime write behaviour: Logistics Intake must write only to
`Logistics_Intake_Submissions`, `Logistics_Intake_Facts`, and
`Logistics_Intake_Operational_References`, and must not write to any other
table in that base. This is verified by inspecting what was actually
written after each step, not by the credential. Canonical Relationship Data
(`2 | DCA Relationships & Workflows`) is a separate base and is not part of
this test unless separately attached — that base-level separation is a real
credential boundary and is unaffected by the limitation above.

## Preflight (before Step 1)

Send one routing-only, no-write message and confirm both answers before
running Step 1:

> `@Claude Do not write anything yet. Which Logistics intake skill/plugin are you using and what version does its metadata declare? Separately: if I gave you Logistics information right now, which Airtable tables would you write to, and would you write anywhere else in that base or to canonical Relationship Data?`

Required answers:

- Skill version `0.5.0` (confirms the PR #12 branch, `claude/logistics-intake-pr11-test-ur27ab`, is actually installed — not `main`, which reports `0.2.0`, or an earlier PR-branch commit reporting `0.4.0`).
- Claude states it writes only to the three Logistics intake staging tables and would not write elsewhere in `DCA Integrations & Reconciliation`, and would not write to canonical Relationship Data. Note this is Claude's *stated intent*, not proof of a technical restriction — the credential permits more; the per-step checks below are what actually confirm behaviour matched intent.

If either answer is wrong, stop and fix configuration before Step 1.

## Setup

Synthetic entities only — never real DCA partner or person names:

- `Foodbank Nova` — source organisation (baseline goods case)
- `Ridgeline Amenities` — contextual partner (role case)
- `Petra` — intermediary (role case)
- `H7X` — correction-target organisation (used twice, to create both a
  clean single-target case and a genuinely ambiguous multi-target case)
- `Dana` — person referenced in the temporary-location case

Send each numbered item below as its **own** `@Claude` message/turn, not
batched. Prefix every message with `CONTROLLED TEST.` After each turn, read
(do not write) the Airtable base to confirm two things before sending the
next turn:

1. the expected fields in the relevant Logistics intake staging table(s);
2. that **no other table in `DCA Integrations & Reconciliation` gained,
   lost, or changed any record** — list all tables in the base and check
   record counts/timestamps, since the credential does not prevent a
   miswrite there.

A wrong classification or an out-of-scope write early in the sequence can
otherwise contaminate a later case that depends on it (e.g. the supersession
case in step 5 depends on step 1 having landed correctly).

## Sequence

### 1 — first concrete message (baseline; exercises the offered/expected flag)

`CONTROLLED TEST. Foodbank Nova says they have around 20 boxes of mixed food for DCA. We can probably pick them up next week, but the date is not confirmed.`

Expected: `submission_kind=new_information`; `operational_process=goods_intake`;
`quantity_text="around 20 boxes"`. `goods_state` may contain `offered` or
`expected` only as the current schema-level representation — that field
alone is not the pass criterion. The run **passes only if** the unresolved
semantic distinction is explicitly preserved in notes/confirmation **and**
Claude does not present the selected value as an authoritative
classification. A confident pick of either value with no surfaced caveat is
a FAIL, even if the value itself is defensible. Maps to Test 5/8a in
`tests/providers/claude/logistics-intake.md`.

### 2 — contextual role, no goods change (baseline)

`CONTROLLED TEST. Petra is still the intermediary between DCA and Ridgeline Amenities. Nothing new is being offered right now.`

Expected: `submission_kind=update`; `operational_process=logistics_information_intake`;
operational reference `proposed_operational_roles=intermediary`; no canonical
Relationship Data write. Maps to Test 9.

### 3a — establish exactly one prior H7X submission

`CONTROLLED TEST. H7X says they have 5 pallets of tents for DCA, pickup unconfirmed.`

Expected: ordinary `new_information` / `goods_intake` capture; no correction
involved yet. This exists purely to give step 3b exactly one valid target.

### 3b — unambiguous correction (single target — should resolve)

`CONTROLLED TEST. Correction to the earlier H7X update: H7X is handing the tents over to DCA. DCA is receiving them.`

Expected: `submission_kind=correction`; exactly one candidate exists, so
`corrects_submission` **should** resolve to 3a; `source_organisation_text=H7X`,
`destination_organisation_text=DCA` (direction preserved, not omitted); 3a
remains preserved, not overwritten. Maps to new Test 5b.

### 4a — establish a second prior H7X submission (creates real ambiguity)

`CONTROLLED TEST. H7X also mentioned a second batch, 3 boxes of hygiene kits for DCA, timing unclear.`

Expected: ordinary `new_information` / `goods_intake` capture. After this
step, two prior H7X submissions exist (3a and 4a).

### 4b — ambiguous correction target (the case the original prompt never tested)

`CONTROLLED TEST. Correction to the earlier H7X update: H7X is handing the goods over to DCA, not the other way round.`

Expected: this is the actual test of the PR 12 rule. With two plausible
targets (3a, 4a), `corrects_submission` **must** be left unresolved, the
correction content still preserved, and the ambiguity flagged for
clarification. Picking either prior H7X submission (e.g. by recency) is a
FAIL of the exact rule PR 12 added. Maps to new Test 5a.

### 5 — warehouse entry + quantity refinement (baseline; exercises supersession)

`CONTROLLED TEST. The Foodbank Nova boxes have now arrived at the warehouse. There are actually 18 boxes.`

Expected: `goods_state=in_warehouse`; `supersedes_fact` linking to the step-1
fact once the same goods are sufficiently identified; step-1 fact retained,
not deleted; `quantity_text="18 boxes"`. Maps to Test 6/7.

### 6 — Direct Transit, unresolved sorting (exercises the no-new-field rule)

`CONTROLLED TEST. Two pallets of medical equipment are coming for Direct Transit. They may stay in the warehouse temporarily and we do not yet know whether they need sorting.`

Expected: `goods_state=incoming`; confirm **no new field or select option**
was created for Direct Transit — it should land only in free-text
notes/context; sorting left unresolved, not inferred either way; the label
must not be read as implying "no storage" or "no sorting." Maps to amended
Test 8.

### 7 — temporary holding location (baseline)

`CONTROLLED TEST. Some boxes are temporarily staying at Dana's parents' house before moving onward.`

Expected: location preserved as an unresolved temporary holding context; not
tagged `pickup_location`/`dropoff_location`; `goods_state` left unset rather
than forced. Maps to Test 10.

## Cleanup

Delete/revert all controlled-test submissions, facts, and operational
references created in steps 1–7 (Foodbank Nova, Ridgeline Amenities, Petra,
all H7X submissions and related facts/references created by steps 3a–4b,
Dana, the medical-equipment/Direct Transit case) from
`DCA Integrations & Reconciliation` after inspection. Steps 3a–4b create
four H7X submissions in total (3a, 3b, 4a, 4b) plus whatever facts/references
were extracted from them — all of them must be removed, not just the two
correction messages. Nothing synthetic should remain in live staging, per
the Cleanup rule in `tests/providers/claude/logistics-intake.md`.

## Why this plan differs from the earlier ad hoc prompt

- **Sequential turns, not a batch.** Correction/supersession mechanics only
  mean something if each message becomes its own
  `Logistics_Intake_Submissions` record over time; a single bundled turn
  risks collapsing them into one `raw_submission`.
- **Fully synthetic entities.** The earlier prompt used real-sounding
  DCA partner/people names (Voedselbank Teylingen, Hunter Amenities, H4U,
  Leonie); any resulting `controlled_test` records risk being confused with
  genuine operational history and are harder to guarantee full cleanup of.
- **An actual ambiguous-target case.** The earlier prompt referenced "the
  earlier H4U update" with no prior H4U message in the sequence at all, so
  it could not exercise the multi-candidate correction-matching rule this
  PR added. Steps 3a/3b/4a/4b construct both the clean single-target case
  and the genuine multi-target case as a deliberate contrast pair.
