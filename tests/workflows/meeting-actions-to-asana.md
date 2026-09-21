# Meeting actions → Asana: acceptance cases

Contract: [Capture meeting-derived actions into Asana](../../workflows/meeting-actions-to-asana.md).

Status: behavioural acceptance specification with a supervised partial ChatGPT pilot recorded below. Unexecuted cases and unattended runtime behaviour remain unverified. The dated follow-up below records two verified Asana captures; the original 18 September result is preserved as history. The five original huddle items and one follow-up restored from transcript review are real source-derived candidates, not synthetic operational records or approved task fixtures. The additional scenarios below are synthetic variations for read-only evaluation; never post them into live Slack or Asana.

## Real-source walkthrough

Use the 17 September 2026 huddle source and H17-01–H17-06 references in the contract.

| Input / observation | Required result |
|---|---|
| Anja's supplied correction establishes Kees attended alongside Bas through Bas's connection | Reuse the correction; patch the original huddle Attendees section to show Kees and the shared connection, with correction provenance and a separate speaker-uncertainty note. No repeated attendance confirmation is required. |
| Initial five AI-extracted action items, no task approvals | One proposed review batch; zero Asana mutations. Source review may correct or add candidates, but does not grant task approval. |
| Anja reports Kees attended through Bas's account and was omitted/misattributed in the notes | Record reported participation and the shared connection; retain original labels as source evidence, not verified speakers. Do not infer Kees's absence or remap all Bas statements to Kees. |
| H17-03 names Bas, but its speaker basis is the shared connection | Leave ownership unresolved until explicitly confirmed. Do not claim Bas or Kees made the original commitment; recheck affected passages without assuming the five extracted items are exhaustive. |
| H17-01 originally says "next 20 minutes"; transcript shows an estimate and notification requested from the shared connection | Preserve the wording correction; ask current status and notification recipient. Do not fabricate a due date, infer completion or assume the requester was Bas. |
| H17-02 and H17-05 may concern the same call | Preserve both references, resolve scope and scheduling owner, then use one task if confirmed identical. |
| H17-03 depends on enabled relationship intake | Preserve dependency and verify the authorised channel; capture does not subscribe anyone to Mailchimp. |
| H17-04's mission example is followed by James's preference for warehouse documentation (1:11:45–1:12:21) | Restore the preference in notes and the same candidate; confirm the first bounded task. Do not assign Kees/Anja or infer an approved implementation project. |
| Transcript restores Anja's omitted channel-instructions follow-up (57:40–59:20) | Add H17-06 to the same notes/review batch, preserving H17-01–05. Check current completion and existing instructions; no automatic task creation. |
| Related Asana search results but no exact match | Inspect candidate task details; do not assert duplicate identity from a name match. |

## Synthetic boundary and recovery cases

| Scenario | Required result |
|---|---|
| Transcript clearly supports a material omission or corrects the AI summary | Patch the original notes within authorised maintenance scope, preserving source locators, prior meaning/history and a concise change note; verify readback. |
| AI notes present a proposal as an agreed decision or assign an unsupported owner | Correct the status to proposal/uncertain ownership; do not invent agreement or create an Asana task. |
| Participant correction conflicts with transcript or an existing human edit | Preserve the conflict and request a bounded clarification; do not silently choose a confident version. |
| Attachment retrieval fails despite an exposed transcript file | Recheck the authorised connector and fresh attachment retrieval before declaring access unavailable; preserve the initial failure and actual recovery/coverage result. Do not bypass permissions. |
| Transcript/recording is unavailable but specific participant corrections are supplied | Apply supported corrections, disclose review coverage, and do not claim full transcript verification. |
| A later reply changes a decision or accepts a task | Add a dated follow-up linked to the reply; preserve the distinction from what occurred in the meeting. Task creation still follows the confirmation gate. |
| Repeated run finds no new evidence or correction | No cosmetic rewrite, duplicate summary, reintroduced error or duplicate action list. |
| A meeting statement conflicts with current organisational context | Flag the discrepancy; do not rewrite the historical meeting as if participants stated the current position. |
| Attendance patch is authorised and huddle edit access is available | Apply the supported attendance/attribution patch, preserve unrelated content and source history, then verify by readback. Thread-only acknowledgement is not completion of the huddle patch. |
| Attendance patch is already present on rerun | Reuse it; no duplicate attendee or correction note. |
| Huddle edit access is unavailable or write/readback fails | Keep the exact patch in the existing review thread, mark the huddle update pending/unverified, and do not claim success. Unaffected independently approved actions need not be blocked. |
| Current human-edited attendee list conflicts with a proposed patch | Preserve the human edit and resolve the conflict rather than overwrite it. |
| Bas explicitly accepts H17-03 as his task now | Only that scoped action proceeds, subject to existing authorisation; the new acceptance does not prove he was the original speaker. |
| A shared-account reply says "Kees here" or "Kees agreed" | Preserve the claim and actual principal; no authenticated Kees grant or delegation is inferred. |
| A participant corrects who spoke, or confirms Kees's attendance | Preserve sourced correction separately; no task-capture approval follows from it. |
| Owner accepts the bounded task through their own authenticated account, but historical speaker remains unknown | Capture on the new explicit commitment if other gates pass; historical attribution stays unresolved. Do not require reconstruction of every utterance. |
| One action depends on uncertain shared-microphone attribution; other items have independent valid approvals | Hold only affected actions. Keep one batch and no blanket repeated validation of unaffected work. |
| Unambiguous owner reply: "Confirm item 3; no deadline yet" to a proposal listing scope, assignment and project | No redundant approval request; date remains empty. Verify identity and existing runtime authorisation before writing. |
| Someone confirms another person's task without established delegation | Item stays pending; meeting organiser status cannot substitute for assignment authority. |
| Source names an owner but nobody confirms; or reply says only "looks good" without a clear target | No Asana mutation. |
| Owner says "not mine", "later", or remains silent | Preserve the distinct disposition; no invented owner, deadline, reminders or default Anja follow-up. |
| Owner supplies a precise replacement action | Preserve the original and correction; apply within authority without asking again. AI-generated material expansion still needs confirmation. |
| Owner/date/project changes after confirmation | Re-check current state; do not apply stale approval to the changed proposal. |
| Scope and owner confirmed, material permission or destination unresolved | No create; preserve exact gap. Incidental qualified uncertainty need not block unrelated clear work. |
| Correct human name but ambiguous Asana identity, missing capability or wrong channel | No write; verified stable identity and existing access rules remain required. |
| Task already exists with different scope/date/owner | Do not overwrite or create a duplicate; resolve the exact change needed. |
| Owner reports already done, evidence absent | Preserve reported completion and limitation; no new outstanding task or invented proof. |
| Two runtimes see the same batch | Only the designated writer executes; no write if exclusive ownership is unresolved. |
| Create succeeds, response times out | Recover via stable meeting/item reference; unresolved existence stays unverified rather than retried blindly. |
| Three tasks succeed and one fails | Retain successful task IDs; retry only the failed item after checking its state. |
| Asana readback succeeds, thread update fails | Retain task mapping; retry thread update only. |
| Notes are reordered or edited on rerun | Keep original item references and confirmation lineage; no duplicate review batch or tasks. |
| Existing validation item already covers a question | Link/reuse it; do not reopen settled validation or create a second reminder stream. |
| Task capture succeeds | Do not execute the underlying subscription, configuration change or calendar invitation without its own authority. |
| Published canvas is readable but DCA Bot has no edit permission | Mark notes maintenance blocked, retain the proposed patch in the existing thread, request Share Canvas → DCA Bot → edit access from an authorised editor, and recheck. Anja's access or attendance cannot stand in for writer access. |
| A registered batch receives an item-scoped owner reply without a bot mention | The existing monitor reads the thread and dispatches the authorised capture to the designated writer; no mention or redundant confirmation is required. Record detection separately from task persistence. |
| Canvas is shared or bot is mentioned in an unregistered meeting | Do not infer general recurring ingestion or a task-capture grant; establish the bounded processing request and registration. |
| A valid reply arrives several days later, after the underlying action was completed | Recheck current work and preserve a supported already-done outcome without creating obsolete outstanding work. Age alone does not invalidate the reply. |
| Detection succeeds but the designated capture writer is unavailable | Preserve a confirmed-but-blocked handoff and its exact capability gap; do not falsely mark captured or silently wait for a broad Reality Watch sweep. |
| A new meeting test starts while older candidates are pending | Retain old item references and dispositions in their original thread; do not reset or drop them. |
| Workflow is committed or merged | Do not claim runtime deployment, five approved actions, successful live writes or operational adoption. |

## Observed supervised pilot — 18 September 2026

Initial run against PR #46 commit `fc953bf42bc5d9703966cf6bfadc146fe6806040`, explicitly requested by Anja. The initial partial result was recorded at `b663d35dacbc665977d39b7a8bcbd53129b7436c`; Anja then requested a transcript-access recheck, which recovered the source and continued the same pilot. ChatGPT was the supervised executor; the initial Slack review readback identified DCA Bot as publisher with a ChatGPT footer. The edited review still identifies the run as a supervised ChatGPT pilot. This is not evidence that a recurring trigger or another runtime has been configured.

| Step | Observed result |
|---|---|
| Source preflight | Read the current huddle canvas and full existing thread. Bas's approval of the workflow was not treated as item-level task approval. |
| Initial transcript retrieval | The connector exposed the attachment; the initial download method returned HTTP 403, so that first pass did not inspect it. This was a retrieval failure, not established lack of permission. |
| Transcript access recheck and review | A fresh connector attachment link downloaded successfully using curl. The executor read all 614 timestamped transcript segments and used passage locators for corrections. This verifies text access/review, not audio accuracy, individual Bas/Kees attribution or the operational truth of meeting reports. |
| Notes write and readback | Original canvas updated in place: Kees added with Anja's correction provenance, shared connection explained, introduction made attribution-neutral, an unrelated video link removed as evidence for contact intake, historical runtime wording qualified, and five stable action references marked as candidates. Readback matched all intended changed sections; media/transcript links remained. |
| Transcript-based notes correction and readback | Updated the same canvas: corrected presentation duration and Debbie/recipient conflation, qualified capability and savings claims, restored James's warehouse-documentation preference, clarified H17-01's estimate/shared-connection requester and H17-05's unsettled scheduler, and added the omitted channel-instructions candidate H17-06. Readback matched the replacement sections and preserved all untouched sections, including attendee provenance and source/media links. |
| Existing work / timing | Bounded Asana searches found related work but established no exact task matches. The scheduled 18 September setup event named Bas, Kees and Anja; it was not assumed to be the James follow-up. Exact-match checks remain required before any later task write. |
| Review publication and readback | One [action-review batch](https://dcau.slack.com/archives/C0AEEFTS495/p1789683237845209?thread_ts=1789639652.309889&cid=C0AEEFTS495) posted and read back in the original huddle thread. It includes the five references, proposed Asana destinations, unresolved owner/call questions and the confirmation boundary. |
| Review update and readback after transcript access | Edited the same review message `1789683237.845209`, retaining H17-01–05 and adding H17-06 with transcript locators and a proposed destination. No duplicate review post. Shared-account ownership and item-level confirmation remain unresolved. |
| Asana writes | None performed. Six source candidates await item-level confirmation, correction or disposition; no owner/deadline was invented. |

Evidence: [maintained huddle notes](https://dcau.slack.com/docs/T037US21Q2X/F0C2H8RQVN2) and the linked review batch. These links contain the live records; this test record does not duplicate personal contact data or the full meeting transcript.

At the end of the 18 September source-review pass, owner responses and task capture had not yet been observed. Later results below supersede that status without changing the initial run history.

## Observed follow-up — 19–21 September 2026

The current [review batch](https://dcau.slack.com/archives/C0AEEFTS495/p1789683237845209) records dated dispositions and mappings. The 21 September task reads confirmed the assignee, empty due date, source/item references, owner-confirmation link and bounded scope in both tasks.

| Item | Observed disposition |
|---|---|
| H17-03 | Kees's 18 September reply accepted ownership while newsletter-related. The 19 September reconciliation recorded the bounded submission as already performed, based on source-linked intake/contact readback. No new Asana task; contact validation and Mailchimp approval/completion remain separate. This review reused that existing reconciliation evidence. |
| H17-01 | Anja's [21 September reply](https://dcau.slack.com/archives/C0AEEFTS495/p1789978905108639) confirmed enablement/testing and notification to Kees already done. No new Asana task. |
| H17-05 / H17-02 scheduling | The same reply confirmed one call and Anja as scheduler, after James tests Claude. [Task 1218705686220498](https://app.asana.com/1/1204854523404532/project/1213240028232976/task/1218705686220498) exists, assigned to Anja without a due date, and is linked from the original review. The task remains incomplete; H17-02's trial/follow-up is not thereby completed. |
| H17-06 | Anja confirmed one remaining guidance rollout excluding completed Logistics guidance. [Task 1218699908671102](https://app.asana.com/1/1204854523404532/project/1213240028232976/task/1218699908671102) exists, assigned to Anja without a due date, and is linked from the review. Completion remains unverified. |
| H17-02 / H17-04 | Preserve the remaining James trial/follow-up and first-task selection questions; do not close them because scheduling was captured or another test is planned. |

Read-only inspection on 21 September found the existing **Monitor validation queue** automation enabled on its hourly schedule, with explicit 19 September coverage for this thread and instructions to read replies without requiring a mention. Configuration is evidenced; the task records do not establish which scheduled invocation created them or prove automatic latency/reliability. No new automation or schedule was created by this PR update.

The delay exposed a useful late-reconciliation case and did not invalidate the successful bounded captures. Still unverified: independent audio/speaker validation, new-meeting registration and automatic end-to-end processing, repeat-run duplicate avoidance after capture, uncertain-create/partial-failure recovery and concurrent-writer handling.

## Next bounded meeting test

1. On an explicit request for the next meeting, identify its published canvas and source thread. Verify the selected writer's edit permission; if missing, request the Share Canvas access step and verify recovery.
2. Review the transcript and patch the original notes; read back changes and publish one source-linked review batch with stable references, proposed owners/destinations and uncertainties. State the actual processing mode.
3. Register that authorised batch in the existing monitor's current scope/lineage and verify registration. Do not create a new reminder automation or infer general ingestion.
4. Ask owners to review shortly after publication. Process one genuine scoped confirmation without requiring a bot mention; preserve already-done, correction, defer and silence outcomes independently.
5. Verify the resulting Asana task and original-thread mapping. Record publication, owner reply, detection and verified capture times where available; leave missing clocks unknown.
6. Re-run the same batch and verify that the existing task mapping is reused, with no duplicate task, review post or reminder. Keep unexecuted recovery scenarios unverified.

Success for this next test means the confirmed item completes that handoff and survives the repeat run. It does not require all meeting items or their underlying operational work to be completed.

## Recording a live result

For an authorised bounded pilot, record source/item, actual confirmation reference, writer/runtime, task ID, readback evidence and observed disposition in the existing review thread or relevant private test record. Do not commit contact lists or new operational records as test output.

Acceptance evidence must distinguish static contract review, read-only scenario evaluation and actual runtime execution. Leave unexecuted scenarios unverified.
