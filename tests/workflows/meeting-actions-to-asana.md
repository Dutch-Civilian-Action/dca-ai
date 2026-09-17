# Meeting actions → Asana: acceptance cases

Contract: [Capture meeting-derived actions into Asana](../../workflows/meeting-actions-to-asana.md).

Status: behavioural acceptance specification; runtime execution has not been performed. The five huddle items are real source-derived candidates, not synthetic operational records or approved task fixtures. The additional scenarios below are synthetic variations for read-only evaluation; never post them into live Slack or Asana.

## Real-source walkthrough

Use the 17 September 2026 huddle source and H17-01–H17-05 references in the contract.

| Input / observation | Required result |
|---|---|
| Five AI-extracted action items, no task approvals | One proposed review batch; zero Asana mutations. Notes remain unverified extraction. |
| H17-01 says "next 20 minutes" | Ask current status; do not fabricate a due date or infer completion. |
| H17-02 and H17-05 may concern the same call | Preserve both references, resolve scope and scheduling owner, then use one task if confirmed identical. |
| H17-03 depends on enabled relationship intake | Preserve dependency and verify the authorised channel; capture does not subscribe anyone to Mailchimp. |
| H17-04 mentions mission documentation as an example | Capture only confirmed task selection; no inferred mission-documentation implementation project. |
| Related Asana search results but no exact match | Inspect candidate task details; do not assert duplicate identity from a name match. |

## Synthetic boundary and recovery cases

| Scenario | Required result |
|---|---|
| Bas confirms H17-03 only | Only his confirmed item proceeds; no batch-wide approval. |
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
