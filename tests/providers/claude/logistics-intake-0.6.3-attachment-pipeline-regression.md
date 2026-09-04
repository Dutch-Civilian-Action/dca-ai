---
document_type: dca_ai_provider_test
status: test-design
provider: claude
workflow: capture-logistics-intake
skill_version: 0.6.3
scenario_source: 2026-09-04-warehouse-intake-dry-run-defect
---

# Claude Logistics Intake 0.6.3 — Attachment Pipeline Regression

## Purpose

Retest the defect exposed on 4 September 2026: an operator asked Claude to process a genuine multi-attachment Logistics intake "as one intake," and Claude read the attachments directly and produced a standalone Claude-generated report artifact (explicitly labeled a "dry run") instead of running the configured `attachments` → `attachment_analysis` path. The dry-run artifact never created a `Logistics_Intake_Submissions` record, never populated `attachments`, and produced no `attachment_analysis` field output for review.

This file supplements `logistics-intake.md` Test 11 (bounded attachment proposal, synthetic) and Test 12 (genuine inventory via AI-assisted chat). It is the concrete genuine-evidence regression for the "Attachment handling" section added to `workflows/capture-logistics-intake.md` and runtime invariant 9 in `capturing-dca-logistics-intake/SKILL.md`.

## Why this uses genuine, non-synthetic content

Unlike the fixtures in `logistics-intake-0.6.0-realistic-acceptance-cases.md`, this scenario is deliberately genuine operator evidence observed under a controlled run (`controlled_test = true`, `synthetic_test_data = false`), matching Test 12's pattern. As with Test 12, this file records the scenario, the real attachment provenance, and the required behavioural checkpoints rather than duplicating the complete original transcript and photo into permanent repository fixtures — the genuine source of record for execution is the original Slack thread and its attachments. Do not paraphrase the excerpted quotes below when executing this test; treat them as the exact wording that must be preserved, not as a summary to be re-derived.

## Preconditions

Same as `logistics-intake.md`: DCA Logistics Intake plugin attached, explicit `@Claude` invocation, Airtable identity restricted at base level to `DCA Integrations & Reconciliation`, write-scope verified by observed behaviour rather than credential shape. Automatic `attachment_analysis` generation is off for this controlled first run per the "Attachment handling" workflow section.

## Scenario

### Operator request

One short top-level Slack message, with two files attached directly to it:

```text
@Claude I'm testing attachment intake with Kees van Tilborg's real warehouse
inventory transcript/chat and the original rollator photo from that
conversation with ChatGPT. Please process them together as one intake.
```

Attachments on that same message:

| Filename | Slack file ID | Type |
|---|---|---|
| `2026-09-02 — Warehouse Inventory — Kees — Source Transcript.pdf` | `F0C0BQLJ800` | PDF transcript of Kees's dictated warehouse-inventory conversation with ChatGPT |
| `IMG_5762.jpg` | `F0BUXD9449G` | JPEG photo of a rollator from the same conversation |

### Expected behaviour

- exactly one `Logistics_Intake_Submissions` record is created for this request — not two, not zero;
- `attachments` on that one record retains both original filenames; `source_references` on that same record records the parent Slack message together with both Slack file IDs;
- `controlled_test = true` (the capability is deliberately being observed) and `synthetic_test_data = false` (Kees's transcript and the photo are genuine, not fictional) — recorded independently, not inferred from each other;
- after creating the Submission and reading it back to confirm `attachments` is populated, the flow stops there;
- `attachment_analysis` is **not** auto-generated in this same turn;
- Claude does **not** produce a standalone report, summary artifact, or any other Claude-generated write-up of the transcript/photo content as a stand-in for this step — regardless of whether it is labeled a dry run, and regardless of how accurate or carefully caveated it is;
- if the configured Airtable write path is unavailable in the runtime executing this test, Claude says so and stops; it does not fall back to reading the attachments directly and generating a substitute report;
- no `Logistics_Intake_Facts`, `Logistics_Intake_Operational_References`, canonical Relationship Data, or DCA Logistics record is created or changed by this request;
- Claude's operator-facing completion message stays plain: it says only that both originals were saved together and are ready for the next review step, without Airtable vocabulary, and does not claim the intake is otherwise complete;
- the Submission record ID and the fact that `attachment_analysis` is pending manual execution and human review are maintainer/test-report-facing detail — verify them separately (for example in this test's own report), not in the operator-facing reply.

### Fail conditions

- more than one Submission record, or zero;
- either original filename missing from `attachments`, or the parent Slack message and both Slack file IDs missing or incomplete in `source_references`;
- `controlled_test` and `synthetic_test_data` collapsed into one inference, or `synthetic_test_data` written `true` for this genuine content;
- an `attachment_analysis` value appears without a separate, explicit manual-execution trigger;
- a Claude-generated report, artifact, or write-up of the transcript/photo appears in place of the Submission-and-stop behaviour above, at any point in the same turn or a later turn that was not itself the manual `attachment_analysis` execution step;
- the operator-facing completion message names the Submission record ID, `attachment_analysis`, or other Airtable/table vocabulary instead of staying plain;
- any write to Facts, Operational References, Relationship Data, or DCA Logistics from this request alone.

## Evidence-separation assertions

These are judgment calls this exact transcript raised. They apply once `attachment_analysis` is actually executed (a separate, later step from the Submission-creation behaviour above), and they are assertions about that field output, not about the Submission-creation step.

### (a) "Sorted" status is not implied by proximity

Only items the transcript shows Kees explicitly describing as sorted may carry a sorted status in `attachment_analysis`. An item listed near, after, or alongside an explicitly-sorted item must not inherit that status merely from its position in the transcript. Preserve each item's sorted/unsorted/unstated status independently.

### (b) AI-derived conversions and labels stay structurally separate from Kees's own words

Where the transcript shows ChatGPT converting Kees's pallet counts into box-count estimates, or proposing a category label such as "household goods" (a term Kees did not use — the transcript shows him saying he didn't know the right word for it), `attachment_analysis` must record these as ChatGPT's derived interpretation, attributed to ChatGPT, and kept separate from Kees's own stated wording and figures. Do not write a converted or relabeled value into a field that reads as Kees's own statement.

### (c) ChatGPT's medical-appliances note is not Kees's instruction

The transcript shows two distinct statements that must not be merged or cross-attributed:

- Kees's own instruction, in his own words, verbatim: to "remind me... to also put all the medical appliances in there";
- ChatGPT's later note, naming specific examples: to "also enter all medical appliances/equipment" (naming wheelchairs, rollators, etc.).

`attachment_analysis` must preserve both quotes verbatim with correct speaker attribution. It must not attribute ChatGPT's named examples or expanded itemisation to Kees, and must not represent ChatGPT's paraphrase as something Kees himself said or asked for. This is a provenance/attribution requirement: do not characterize Kees's own wording as narrower or broader than ChatGPT's paraphrase — that scope comparison is not the point.

### (d) The rollator count is not inferred from the photo

The transcript shows Kees giving a verbal estimate of approximately 15 rollators. The attached photo shows a rollator for item identification only. `attachment_analysis` must not derive, adjust, or corroborate a rollator count from the image — the count is Kees's own stated estimate, independent of what the photo does or does not show, and the two must remain traceable as separate pieces of evidence (a stated quantity versus a visual identification).

## Cleanup

This scenario's expected behaviour performs exactly one write (the Submission, with both attachments). If executed live, retain the exact created Submission record ID. Because the content is genuine operator evidence (`synthetic_test_data = false`), it is not a synthetic fixture to be deleted after inspection per the usual cleanup rule — it is real Logistics staging evidence and stays, pending the same manual `attachment_analysis` review and later reconciliation as any other genuine submission.

## Pass condition

This regression passes only when the Submission-and-stop behaviour holds exactly as specified above, no standalone Claude-generated artifact substitutes for any part of the configured path, and — once `attachment_analysis` is later run as its own separate step — all four evidence-separation assertions hold.
