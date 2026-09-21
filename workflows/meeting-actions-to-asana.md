---
document_type: dca_ai_workflow
status: bounded_pilot
scope: meeting_derived_action_capture
---

# Capture meeting-derived actions into Asana

## Purpose and boundary

Review and maintain the original meeting notes against available sources, prepare one review batch in the existing meeting thread, obtain explicit confirmation, create or link confirmed Asana tasks, and return verified task links to that same batch.

This is a provider-independent capture and validation workflow. It records work people have confirmed; it does not infer decisions, ownership, operational commitments, or permission to perform the underlying work. It does not configure a scheduler, Slack listener, Asana integration, or new reminder stream. Repository publication is not evidence of deployment or a successful live run.

Apply [authority rules](../governance/authority-rules.md), including the dataset prerequisite. This workflow directly establishes source-linked action records; it does not establish readiness for downstream automation such as contact subscription, valuation, or reporting.

Asana remains the work/assignment/completion surface. Existing Ways of Working Meetings and Action Items may link the same tasks, preserving meeting and decision context without an independently maintained task list. Do not require a new table, project, or schema for this pilot.

## Entry and source

Start from an explicit request to process a specific meeting, or an already authorised bounded trigger. Merely finding notes is not permission to post messages or create tasks.

Read the current notes, relevant source passages, existing review replies and known linked tasks. Preserve the meeting identity, date/time zone, source URL and exact action locator (timestamp or passage). Treat AI notes as an extraction, not independently confirmed commitments. If a transcript is unavailable, state that limitation rather than attributing verbatim speech.

Keep the connected account, actual participants, attributed speaker, action owner and authoriser distinct. A platform attendee list identifies connected accounts, not everyone physically present; a transcript speaker label may identify a shared microphone rather than a person. Do not infer absence from a missing account or ownership from a speaker label alone.

Where a shared connection is known or suspected, ask one bounded attendance/attribution correction in the existing batch, such as "Was anyone joining through another person's account?" Preserve the answer and who supplied it. A declaration such as "Bas and Kees are together on Bas's connection" supports reported participation; it does not identify which person spoke each passage. Keep affected passages attributed to the shared connection with speaker unresolved unless supported by a specific correction. Do not guess from subject expertise, writing style or organisational role, and do not replace every account label with the other participant's name.

Flag any action, first-person commitment or claimed approval that depends on that attribution. Ask who owns the concrete action; unaffected items may proceed. An authorised person may accept a task now without reconstructing every historical utterance: record that as a new explicit commitment, not proof of who originally spoke. Preserve original notes and source-qualified corrections together.

Assign a stable reference to each candidate within the meeting and retain it across edits/retries. Do not regenerate references from changing checkbox order or titles. Preserve source wording alongside proposed wording when meaning differs.

## 0. Review and maintain the meeting notes

Treat Slack AI notes as a first draft, not the authoritative account of the meeting. Before deriving actions, check the existing notes against the available transcript/recording, meeting thread and participant corrections. Review attendance, attribution, summary, material omissions, decisions, action items, dependencies, timing and unresolved questions. This applies to meeting notes generally, including huddle canvases.

Before editing a published canvas, verify edit access for the actual selected writer identity. Channel membership, meeting attendance, source-read access or Anja's access does not prove DCA Bot can edit it. If DCA Bot lacks edit access, ask the canvas owner or an authorised editor to use **Share Canvas → add DCA Bot → give edit access**, then recheck. Keep the notes update blocked until access and write/readback are verified; use the existing pending-patch fallback below. Do not grant access yourself unless authorised. No default automatic-sharing mechanism is established by this pilot; do not claim such sharing is impossible.

Patch the original notes where evidence supports a correction or clarification; do not create a competing summary by default. Preserve the existing useful structure and human edits. Within an authorised notes-maintenance run, clear source-backed corrections and wording cleanup that preserves meaning do not need a separate approval each time. Material ambiguity or conflicting evidence does: keep it visibly unresolved and ask the relevant person a bounded question. Do not substitute another AI's more confident account for evidence.

Keep discussion, proposals, decisions, reported facts and confirmed commitments distinct. Restoring an omitted proposal does not make it a decision; restoring an action candidate does not approve its owner or Asana creation. Meeting statements about operational reality remain attributed reports unless independently validated. If a later correction or new commitment changes the record, identify it as a dated follow-up rather than rewriting what happened in the meeting. Broader organisational context may identify a discrepancy, but cannot prove what was said.

If a transcript attachment is exposed but retrieval fails, distinguish a download failure from missing access: recheck through the authorised connector and a fresh attachment link before declaring the source unavailable. Do not bypass permissions. If the underlying transcript/recording remains unavailable, use the sources that are available and state the review's coverage limits. Do not label the whole meeting verified because some passages were corrected. Preserve accessible source links/locators and a concise change note stating what changed, why, who supplied a correction where relevant, and when; retain prior wording through available version history or a bounded correction record. Do not alter raw transcript evidence to make it match the maintained notes.

Reconcile the attendee list with supported participation corrections already supplied. Reuse those corrections without asking again. Ask only about missing or disputed participation; lack of a separate connected account is not evidence of absence.

Where the correction and edit are authorised, patch the **Attendees** section of the original huddle notes so readers can see who was actually present, including people sharing another person's connection. Keep the attendance edit bounded to supported participation and a short attribution note; apply other note corrections only under the source-backed review rules above. Record who supplied the correction, when, and its source reference in a concise correction note. Preserve the original account-list context in that note or available version history rather than silently replacing the source evidence.

For the 17 September case, retain the existing attendees and add **Kees — joined alongside Bas through Bas's connection; attendance correction supplied by Anja**. Beside the attendee list add: **Bas and Kees shared Bas's connection. Speaker labels under Bas may refer to either person; individual attribution remains unresolved unless specifically corrected.** This records the supplied attendance correction, not a new claim that every labelled utterance has been checked.

Read back the maintained notes to verify each intended correction, preserved human content, source references and uncertainty labels, including the attendee list and attribution note. Link the corrected notes from the existing review batch. If edit access is unavailable or the write cannot be verified, retain the exact proposed notes patch in the same thread, explicitly mark the notes update pending/unverified, and do not claim the notes were corrected. Independently confirmed actions may proceed if this persistence gap does not affect their scope, owner or authority.

On rerun, inspect the current notes and correction history first; apply only new supported corrections, without duplicating entries, reintroducing superseded wording or performing a cosmetic rewrite. If a human edit conflicts with the proposed patch, preserve it and resolve the discrepancy. Improving the notes neither resolves unsupported speaker attribution nor approves any action. Build the review batch from the maintained notes and unresolved source questions; later participant replies feed corrections back into the same notes. Preserve stable action references and reconcile affected task proposals rather than generating a second list.

## 1. Prepare one review batch

Use the existing huddle/meeting thread. Show only what reviewers need:

| Item | Proposed action | Owner as recorded | Timing/dependency | Needed |
|---|---|---|---|---|
| Stable reference | Concrete bounded action | Named in source, proposed, or unknown | Source wording; unknown remains unknown | Confirm, correct, already done, defer, or not mine |

Include the source link and passage/timestamp for each item. State that confirmation approves the displayed task scope, assignment, destination and any date for capture in Asana; it does not approve executing the underlying action. Show a proposed destination where task creation is requested; if routing is unresolved, keep that item pending.

Request review shortly after the batch is published, while actions are current; this is a practical expectation, not an invented due date, immediate-response requirement or escalation rule. Delayed replies remain valid evidence. Before capture, compare them with current work, later corrections and completion reports. Use the existing already-done path rather than creating obsolete outstanding tasks. A new meeting test does not discard unresolved items from an earlier batch.

An owner can reply in this thread with the stable item reference; a bot mention is not required for a registered batch. Receipt in Slack, detection by the meeting-workflow runner, authorisation and verified Asana capture are distinct. State the actual processing mode in the batch: supervised on request, or the dedicated scheduled meeting-workflow runner. Sharing a canvas or tagging a bot does not itself register a meeting or trigger processing.

The [dedicated meeting-workflow runner](../providers/chatgpt/meeting-actions-to-asana.md) owns notes correction, the action review batch, item confirmations, Asana capture and returned mappings. Retain authorised meeting registrations and pending items in their existing source threads. It reads replies without a bot mention and continues older pending batches; access alone does not register a new meeting.

The [validation monitor](monitor-validation-queue.md) checks validation of the workflow's test, not operational H17 ownership or execution. It may inspect outcomes as evidence, but must not edit these notes, collect action confirmations, dispatch capture, mutate operational tasks or send operational action reminders. A pending action is not itself a pending test-validation judgement. Keep test evidence and any exact test-review question linked to the existing pilot-validation lineage. Test validation is not an execution prerequisite for the already authorised bounded workflow.

If the meeting runner cannot complete a capture, preserve the confirmed-but-blocked handoff in its own batch. Do not transfer execution to the validation queue or make Anja the default chaser. This workflow adds no automatic reminder stream; follow-up contact beyond its source-thread review requires its own authorisation.



Check for existing actions, review requests and Asana tasks first. Reuse existing confirmations within their exact scope; do not ask people to validate settled facts again. Keep one maintained review batch rather than publishing another list on every run.

Do not assign work to System & Structure by default. Do not turn an example into a selected project, a suggestion into a decision, or an elapsed relative deadline into a freshly imposed due date.

## 2. Confirm scope and ownership

Accept an authenticated, directly traceable reply from the proposed owner, or a person with established authority to make that assignment. Meeting attendance, organiser status, mention, shared credentials or name similarity alone do not establish that authority.

An attribution correction is not task approval. A message sent through Bas's account saying "Kees here" or "Kees agreed" does not by itself authenticate Kees or establish his task-capture grant. Preserve the reported human separately from the connected principal. Use Kees's own authenticated reply, or an established authorised assignment/delegation route; do not invent a new identity exception. Confirming attendance also grants no assignment authority.

A short reply such as "Confirm item 3; no deadline yet" is sufficient when it unambiguously refers to the displayed proposal. Record the exact reply and actor separately from the AI executor and credential identity. Apply the runtime's existing action-authorisation and access rules; for Claude Tag see [principal-action authorization](../providers/claude/tag/principal-action-authorization.md). A task-capture confirmation does not grant missing capability or override a channel boundary.

Handle replies per item:

- **Confirmed:** proceed only for the confirmed scope and assignment.
- **Corrected:** preserve the correction; use an explicit replacement instruction from the authorised person without redundant confirmation. If AI must reinterpret or materially expand it, show the revised proposal for confirmation.
- **Already done:** preserve the report and supporting result/evidence; reconcile any existing task only within the authorised scope. Do not manufacture new outstanding work. Keep reported completion distinct from verified outcome.
- **Deferred / not mine / unclear:** preserve that disposition and any stated condition; do not invent a replacement owner or date.
- **Silence:** keep pending. It is not approval.

Approval of one item is not approval of the others. Ambiguous "looks good" replies or approval of this workflow are not approval of unspecified task mutations. Owners may confirm several explicitly identified items within their authority.

An absent date does not block an otherwise clear task: leave the Asana date empty. Material uncertainty about ownership, scope, identity, destination or permission does block creation. Other unresolved facts may remain qualified if the confirmed task does not depend on treating them as settled. Do not convert "next week" or "next three weeks" into an exact date without agreement.

## 3. Create or reuse the confirmed task

Before writing, re-read relevant confirmation/corrections and current task state. Resolve the assignee to a verified stable Asana identity. Route by the work produced, not the meeting channel:

- operational work → relevant existing operational Asana project;
- build / validation / experiment → DCA Structural Alignment & Pilots.

Follow the [Evidence → Validation → Live Use Loop](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/main/organisation/shared-foundations/evidence-validation-to-live-use-loop.md). Use its Establish structure when the purpose actually is establishing shared operational reality; do not wrap ordinary meeting actions in unnecessary reconstruction subtasks.

Search for an existing equivalent task using the source/item mapping and bounded context. Read candidate matches before deciding: similar names alone do not establish identity. Reuse confirmed matches without overwriting unrelated assignees, dates, scope or completion history. Updating an existing task requires authority for that exact change.

Minimum task content:

- confirmed action and verified assignee;
- agreed date only when supplied;
- meeting source, stable item reference and passage/timestamp;
- confirmation link, authoriser and confirmation time;
- relevant dependency, qualification and known result.

Keep personal contact lists and unrelated sensitive meeting content out of task descriptions. Link to appropriately accessible sources.

One designated runtime/executor owns writes for the batch. Another AI may assist with extraction or review but must hand off to that writer. If exclusive write ownership cannot be established, leave capture pending.

Preserve the meeting/item reference in the task and retain the returned Asana task ID/URL in the batch. Check both before retrying. If a create request times out or returns an uncertain result, look for the task using the same reference; do not blindly create again. If existence cannot be resolved, mark capture unverified and pause that item. Partial success must not cause successful items to be recreated.

Task capture does not authorise contact subscription, outreach, production changes, scheduling invitations or other downstream actions. Those retain their own existing authorisation and data prerequisites.

## 4. Verify and close the handoff

Read back the task to verify its scope, assignee, date, source and confirmation references. Then update the original review batch with the task link or existing-task match.

If task creation succeeds but the Slack update fails, retain the verified task ID and retry only the thread update. Do not claim successful handoff until the mapping is visible. Keep confirmed-but-unwritten or unverified items distinct from items still awaiting human confirmation.

A source correction after capture remains a correction to the same item. Propose any material task change against its current state and obtain the necessary authority; do not create another task or silently overwrite a human edit.

Keep operational action review and any authorised follow-up within this meeting workflow. The validation queue may assess the workflow test but must not chase its operational actions. Do not duplicate requests, send new DMs or make Anja responsible for chasing this batch by default.

## First bounded case: Shared Reality huddle, 17 September 2026

Source: [AI huddle notes, 12:07–13:55 Europe/Amsterdam](https://dcau.slack.com/docs/T037US21Q2X/F0C2H8RQVN2), linked from the [original huddle thread](https://dcau.slack.com/archives/C0AEEFTS495/p1789639652309889). The following are source-derived candidates, not approved tasks or a current completion report. The original AI notes extracted five items. On 18 September, the supervised executor retrieved and read the full available [Slack transcript](https://dcau.slack.com/files/USLACKBOT/F0C2K4KR3EW/huddle_transcript), corrected the existing notes and candidates, and restored one omitted follow-up as H17-06. Locators below refer to that machine-transcribed text; no audio verification, individual Bas/Kees speaker reconstruction or independent operational validation is claimed.

Source correction from Anja in the originating workflow-design conversation: Kees was physically beside Bas using Bas's connected account; Kees was omitted from the notes' attendee list and his speech was labelled as Bas. Preserve Kees as a participant reported by Anja and Bas's account as the shared connection. No passage-by-passage speaker mapping was supplied. The table below preserves H17-01–05 and incorporates transcript-backed corrections; any ownership or commitment relying on the shared speaker label remains unresolved, including H17-03 and the notification recipient in H17-01. Do not automatically reassign those actions to Kees. The original five-item extraction was not exhaustive: H17-06 was restored from the transcript.

| Item | Reviewed candidate / owner | Transcript locator | Review boundary |
|---|---|---|---|
| H17-01 | Anja enables relationship intake for a test and notifies the requester | 1:44:29–1:45:10 | Original notes named Bas and said "next 20 minutes"; the requester is on the shared connection and the timing was an estimate (an hour was also acceptable). Confirm recipient, current status and capture; no new overdue deadline or inferred completion. |
| H17-02 | James tries Ukrainian-partner contact retrieval/storage, then follows up with Anja | 52:44–53:19; 1:32:08–1:33:01 | Confirm trial scope and intake readiness. Check overlap with H17-05; "next week" is not an agreed date or settled scheduling owner. |
| H17-03 | Submit corrected Rotary emails through Claude once intake is enabled; owner unresolved | 1:43:23–1:44:27 | Original notes named Bas. Confirm actual owner independently of the shared connection. Marketing was proposed in the meeting; verify the currently authorised channel and readiness. Intake is not newsletter-subscription approval. |
| H17-04 | James defines one bounded operational AI trial, informed by his preference to finish warehouse documentation | 1:10:28–1:12:21; 1:14:34–1:15:23 | Missions were an example, followed by James's warehouse-documentation preference involving Kees and Anja. Confirm the actual first task; do not assign others or infer a full implementation commitment or exact deadline. |
| H17-05 | Arrange a clarification call involving James and Anja | 55:55–56:25; 1:08:23; 1:32:08–1:32:19 | Anja proposed a call; confirm scheduler and attendees. Resolve overlap with H17-02 and preserve both references if one call. |
| H17-06 | Anja adds/completes channel-specific instructions and links explaining where to ask what | 57:40–59:20 | Omitted from the initial AI action list; restored after transcript review. Some Logistics instructions already existed. Confirm remaining scope, current completion and capture; reuse existing work. |

Bounded task-name searches surfaced related work but did not establish exact Asana matches. Complete the match check and current-state review before capture. Source bullets need not each create a task; confirmed duplicate source items may link to one task without erasing their lineage.

The pilot is accounted for when every source item is linked to a verified task, reported already completed, declined/deferred, or visibly awaiting a specific clarification. Pending items remain open; accounting for them is not successful task creation.

## Verification and deployment status

Use [the acceptance cases](../tests/workflows/meeting-actions-to-asana.md). A supervised ChatGPT pilot on 18 September 2026 verified in-place notes correction and one review-batch publication. An initial transcript download failed; the access recheck recovered the attachment, completed review of the available transcript text, and verified further corrections to the same notes and review batch. Its evidence and limitations are recorded in the acceptance cases. Later evidence extends that initial result: H17-03 was reconciled as already done on 19 September; on 21 September H17-01 was confirmed already done, one H17-05/H17-02 scheduling task and one H17-06 guidance task were created and read back with source-thread mappings. H17-02's trial/follow-up and H17-04 remain pending. These are dated dispositions, not a rewrite of the original extraction. An earlier hourly validation-monitor configuration included operational pilot handoffs; Anja corrected that boundary on 21 September. The dedicated meeting-workflow runner owns execution, while the validation queue tracks only test validation. General meeting ingestion is not enabled. Automatic detection-to-capture latency, repeat-run duplicate avoidance, uncertain-write recovery and reliability across new meetings remain unverified. Verify the chosen writer and affected runtime configuration before calling the workflow enabled; update the existing implementation summary only to reflect observed status.
