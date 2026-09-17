# Meeting actions → Asana: acceptance cases

Contract: [Capture meeting-derived actions into Asana](../../workflows/meeting-actions-to-asana.md).

Status: behavioural acceptance specification; runtime execution has not been performed. The five huddle items are real source-derived candidates, not synthetic operational records or approved task fixtures. The additional scenarios below are synthetic variations for read-only evaluation; never post them into live Slack or Asana.

## Real-source walkthrough

Use the 17 September 2026 huddle source and H17-01–H17-05 references in the contract.

| Input / observation | Required result |
|---|---|
| Anja's supplied correction establishes Kees attended alongside Bas through Bas's connection | Reuse the correction; patch the original huddle Attendees section to show Kees and the shared connection, with correction provenance and a separate speaker-uncertainty note. No repeated attendance confirmation is required. |
| Five AI-extracted action items, no task approvals | One proposed review batch; zero Asana mutations. Notes remain unverified extraction. |
| Anja reports Kees attended through Bas's account and was omitted/misattributed in the notes | Record reported participation and the shared connection; retain original labels as source evidence, not verified speakers. Do not infer Kees's absence or remap all Bas statements to Kees. |
| H17-03 names Bas, but its speaker basis is the shared connection | Leave ownership unresolved until explicitly confirmed. Do not claim Bas or Kees made the original commitment; recheck affected passages without assuming the five extracted items are exhaustive. |
| H17-01 says "next 20 minutes" | Ask current status; do not fabricate a due date or infer completion. |
| H17-02 and H17-05 may concern the same call | Preserve both references, resolve scope and scheduling owner, then use one task if confirmed identical. |
| H17-03 depends on enabled relationship intake | Preserve dependency and verify the authorised channel; capture does not subscribe anyone to Mailchimp. |
| H17-04 mentions mission documentation as an example | Capture only confirmed task selection; no inferred mission-documentation implementation project. |
| Related Asana search results but no exact match | Inspect candidate task details; do not assert duplicate identity from a name match. |

## Synthetic boundary and recovery cases

| Scenario | Required result |
|---|---|
| Transcript clearly supports a material omission or corrects the AI summary | Patch the original notes within authorised maintenance scope, preserving source locators, prior meaning/history and a concise change note; verify readback. |
| AI notes present a proposal as an agreed decision or assign an unsupported owner | Correct the status to proposal/uncertain ownership; do not invent agreement or create an Asana task. |
| Participant correction conflicts with transcript or an existing human edit | Preserve the conflict and request a bounded clarification; do not silently choose a confident version. |
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
| Workflow is committed or merged | Do not claim runtime deployment, five approved actions, successful live writes or operational adoption. |

## Recording a live result

For an authorised bounded pilot, record source/item, actual confirmation reference, writer/runtime, task ID, readback evidence and observed disposition in the existing review thread or relevant private test record. Do not commit contact lists or new operational records as test output.

Acceptance evidence must distinguish static contract review, read-only scenario evaluation and actual runtime execution. Leave unexecuted scenarios unverified.
