---
document_type: dca_ai_provider_test_result
status: test-result
provider: claude
workflow: capture-logistics-intake
related_pull_request: https://github.com/Dutch-Civilian-Action/dca-ai/pull/12
---

# Claude Logistics Intake — PR 11 Static Config Walkthrough (Results)

## Purpose

Record the results of a static config walkthrough run against the Claude
Logistics Intake provider config on branch `claude/logistics-intake-pr11-test-ur27ab`
(commits `267ea07`, `c56fb3c` — "Apply Kees-validated logistics intake
semantics"). No live Claude Tag or Airtable call was made; this traces six
operator inputs against the rule text in `workflows/capture-logistics-intake.md`,
`plugins/dca-logistics-intake/skills/capturing-dca-logistics-intake/SKILL.md`,
and `tests/providers/claude/logistics-intake.md` / `tests/workflows/logistics-intake-reconstruction.md`
as they existed at each point in time.

Two passes are recorded:

1. **Initial pass**, against the branch as delivered for PR 11.
2. **Rerun**, against the same branch after the four corrective changes in
   [PR 12](https://github.com/Dutch-Civilian-Action/dca-ai/pull/12).

## Test inputs

- **A** — `Voedselbank Teylingen says they have around 20 boxes of mixed food for us. We can probably pick them up next week, but the date isn't confirmed yet.`
- **B** — `Leonie is still the person between us and Hunter Amenities. Nothing new is being offered right now.`
- **C** — `Correction to the earlier H4U update: H4U is giving the boxes to DCA. DCA is receiving them.`
- **D** — `The Voedselbank boxes arrived today. There are actually 18 boxes.`
- **E** — `Two pallets of medical equipment are coming for Direct Transit. They might stay in the warehouse for a bit and we don't know yet if they need sorting.`
- **F** — `Some boxes are staying at someone's parents' house for now before they move onward.`

## Initial pass — verdicts

| Case | Verdict | Governing rule | Gap found |
|---|---|---|---|
| A | PASS (flagged ambiguity) | SKILL.md "Submission kind"/"Operational process" (l.85–98) | No disambiguation rule for `offered` vs `expected` when pickup is probable but unconfirmed. |
| B | PASS | `proposed_operational_roles` vocabulary incl. `intermediary` (SKILL.md l.248) | None found. |
| C | PARTIAL | workflow.md step 7 (corrects_submission); SKILL.md l.91 | No rule for matching a correction target when more than one candidate exists; no rule on whether DCA itself belongs in `destination_organisation_text`. |
| D | PASS (one live-dependency) | workflow.md step 7 supersession; SKILL.md l.212–214 | Same-goods matching for `supersedes_fact` is a runtime behavior, not provable statically. |
| E | **FAIL** | workflow.md "Validated operational distinctions"; SKILL.md l.118–124 | Rule requires preserving Direct Transit as a flow distinction, but the `Logistics_Intake_Facts` table map (SKILL.md l.181–216) has no field for it — stated policy with no schema field to hold it. |
| F | PASS | workflow.md "temporary holding location ≠ canonical location"; SKILL.md l.118–124; Test 10 | None found. |

Legacy-field check (`capture_type`, `source_types`, `fact_type`, `certainty`,
`reference_type`): all five are explicitly barred from new writes in SKILL.md
(l.179, l.210, l.244). PASS at config-definition level; live absence not
provable statically.

### Config-definition failures identified (pre-PR 12)

1. **E** — no schema field for the Direct Transit flow distinction despite an
   explicit rule requiring it to be preserved.
2. **C** — undefined semantics for DCA-as-destination in
   `destination_organisation_text`, and no disambiguation rule for
   correction-target matching when multiple candidates exist.

## Rerun — after PR 12

PR 12 changed exactly four things, scoped to
`workflows/capture-logistics-intake.md`,
`plugins/dca-logistics-intake/skills/capturing-dca-logistics-intake/SKILL.md`,
`tests/providers/claude/logistics-intake.md`, and
`tests/workflows/logistics-intake-reconstruction.md`:

1. `corrects_submission` links only when exactly one prior submission is
   sufficiently identifiable; recency is barred as a heuristic; multiple
   candidates → preserve the correction, leave the target unresolved, flag for
   clarification.
2. A stated transfer direction (including DCA as receiving/destination party)
   must be preserved via `source_organisation_text`/`destination_organisation_text`,
   not left implicit.
3. Direct Transit stays in Fact free-text context/notes only — no new schema
   field — and must never be translated into `goods_state`, storage behaviour,
   or sorting behaviour.
4. `offered` vs `expected` is explicitly marked an unresolved semantic
   distinction requiring organisational/operational validation, not an
   arbitrary runtime choice. (Confirmed no authoritative resolution exists
   elsewhere in the repo — `context/source-routing.md` l.44 lists both terms
   side by side with no distinguishing criteria.)

| Case | Verdict before | Verdict after | Why it changed |
|---|---|---|---|
| A | PASS (flagged ambiguity) | PASS (flagged ambiguity, now rule-backed) | The ambiguity is now an explicit stated rule (workflow.md, SKILL.md) rather than an implicit gap; same live-test dependency remains. |
| B | PASS | PASS | Unaffected. |
| C | PARTIAL | **PASS** (with explicit unresolved-flag path) | Correction-target matching rule and direction-preservation rule both now stated explicitly; matching logic itself remains a live-test dependency. |
| D | PASS | PASS | Unaffected. |
| E | **FAIL** | **PASS** | Schema/policy mismatch resolved by aligning the rule to the existing schema (no new field promised) rather than adding a field. |
| F | PASS | PASS | Unaffected. |

## Remaining items — cannot be proven statically, require the live Claude Tag test

1. Whether the runtime correctly counts correction-target candidates
   (exactly-one vs. more-than-one) and behaves accordingly — covered by new
   Test 5a in `tests/providers/claude/logistics-intake.md`.
2. Whether a stated transfer direction actually lands in
   `source_organisation_text`/`destination_organisation_text` with DCA
   correctly represented as destination — covered by new Test 5b.
3. Whether same-goods matching correctly links warehouse-entry facts to
   earlier offer/expectation facts via `supersedes_fact` — covered by
   existing Test 6.
4. Whether the runtime actually surfaces the offered/expected gap (e.g. in
   its confirmation or internal notes) rather than silently picking one —
   covered by new Test 8a.
5. Whether the legacy fields (`capture_type`, `source_types`, `fact_type`,
   `certainty`, `reference_type`) are absent from actual writes and from the
   live Airtable schema itself, not just from the rule text.

No files were changed as part of producing this record beyond the review
document itself. No live Claude Tag or Airtable call was made.
