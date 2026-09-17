---
document_type: dca_ai_workflow
status: bounded_pilot
scope: meeting_derived_action_capture
---

# Capture meeting-derived actions into Asana

## Purpose and boundary

Prepare one review batch in the existing meeting thread, obtain explicit confirmation, create or link confirmed Asana tasks, and return verified task links to that same batch.

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

## 1. Prepare one review batch

Use the existing huddle/meeting thread. Show only what reviewers need:

| Item | Proposed action | Owner as recorded | Timing/dependency | Needed |
|---|---|---|---|---|
| Stable reference | Concrete bounded action | Named in source, proposed, or unknown | Source wording; unknown remains unknown | Confirm, correct, already done, defer, or not mine |

Include the source link and passage/timestamp for each item. State that confirmation approves the displayed task scope, assignment, destination and any date for capture in Asana; it does not approve executing the underlying action. Show a proposed destination where task creation is requested; if routing is unresolved, keep that item pending.

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

Use the existing validation/reminder arrangements if applicable. Do not duplicate validation requests, send new DMs, add a cadence, or make Anja responsible for chasing this batch by default.

## First bounded case: Shared Reality huddle, 17 September 2026

Source: [AI huddle notes, 12:07–13:55 Europe/Amsterdam](https://dcau.slack.com/docs/T037US21Q2X/F0C2H8RQVN2), linked from the [original huddle thread](https://dcau.slack.com/archives/C0AEEFTS495/p1789639652309889). The following are source-derived candidates, not approved tasks or a current completion report. The timestamps are locators recorded in the AI notes; no independent transcript validation is claimed.

Source correction from Anja in the originating workflow-design conversation: Kees was physically beside Bas using Bas's connected account; Kees was omitted from the notes' attendee list and his speech was labelled as Bas. Preserve Kees as a participant reported by Anja and Bas's account as the shared connection. No passage-by-passage speaker mapping was supplied. The table below preserves what the AI notes extracted; any ownership or commitment relying on that shared speaker label remains unresolved, including H17-03. Do not automatically reassign those actions to Kees. Recheck other affected passages if the source is reviewed; the five-item extraction is not proof that all participants' actions were captured.

| Item | Recorded action / owner | Source locator | Review boundary |
|---|---|---|---|
| H17-01 | Anja enables relationship intake and notifies Bas | 1:44:56 | Check current status. "Next 20 minutes" is historical source wording, not a new overdue deadline or proof of completion. |
| H17-02 | James explores Ukrainian-partner contact retrieval/storage and arranges a follow-up with Anja | 1:32:14 | Confirm the trial and whether the call overlaps H17-05. "Next week" is not an agreed date. |
| H17-03 | Bas submits corrected Rotary emails through Claude once intake is enabled | 1:44:21 | Confirm the actual owner independently of the shared Bas/Kees connection, the authorised intake channel and readiness dependency on H17-01. Contact intake is not newsletter-subscription approval. |
| H17-04 | James identifies one real operational task for the three-week AI test | 1:10:28 | Mission documentation is an example until selected. Do not create a full implementation commitment or an exact deadline. |
| H17-05 | Anja arranges a clarification call with James | 55:55 | Resolve possible overlap with H17-02; if one call, confirm one scheduling owner and retain both source references. |

Bounded task-name searches surfaced related work but did not establish exact Asana matches. Complete the match check and current-state review before capture. Five bullets need not create five tasks; confirmed duplicate source items may link to one task without erasing their lineage.

The pilot is accounted for when every source item is linked to a verified task, reported already completed, declined/deferred, or visibly awaiting a specific clarification. Pending items remain open; accounting for them is not successful task creation.

## Verification and deployment status

Use [the acceptance cases](../tests/workflows/meeting-actions-to-asana.md). This change defines the contract and test case only. Human confirmation of the five actions, task creation, provider access/trigger configuration and live retry behaviour remain unverified until separately observed. Verify the chosen writer and affected runtime configuration before calling the workflow enabled; update the existing implementation summary only to reflect observed status.
