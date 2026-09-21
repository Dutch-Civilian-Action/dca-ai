---
document_type: dca_ai_provider_implementation
status: paused
provider: chatgpt
workflow: meeting-actions-to-asana
---

# ChatGPT — Meeting actions to Asana

Canonical contract: [meeting-actions-to-asana](../../workflows/meeting-actions-to-asana.md).

## Responsibility and scope

The dedicated **Process meeting actions** task owns source review, original-canvas correction, one action-review batch, owner-confirmation processing, Asana capture and verified links returned to the original thread. DCA Bot is the Slack publisher; the scheduled ChatGPT task is the executor. Verify the actual connector identity and edit permission before each write.

The validation queue checks validation of the workflow TEST. It may observe outcomes and reconcile supported capability findings, but cannot gate, dispatch or perform this already authorised workflow, chase its operational owners or mutate its operational records.

Initial scope is the existing 17 September pilot in #structural-alignment (`C0AEEFTS495`, thread `1789639652.309889`, review message `1789683237.845209`) and later meetings explicitly requested for processing in that channel or added through an authorised task update. Do not process every accessible meeting or backfill unrelated historical huddles. Sharing a canvas alone is not an execution request.

## Invocation and continuity

Run as one hourly condition watch in Europe/Amsterdam. This is the highest supported scheduled frequency, not instant response. Inspect the current registered threads for replies without requiring a bot mention. Discover explicit new processing requests in the scoped channel with a persisted checkpoint/overlap, record their registration in the original review batch, and keep all pending registered batches across runs. If a checkpoint is absent, inspect current requests without treating every old huddle as newly authorised.

Apply the canonical scope, identity, approval, no-invented-date, duplicate-check and uncertain-write recovery rules. Reuse H17 references and existing task links; start from current state rather than the initial candidate list. Do not re-extract an unchanged transcript or rewrite unchanged notes on every check.

Keep output brief. A confirmation response should normally state the item, result/task link and any remaining blocker. Do not repeat the complete pilot history or all constraints after each reply. No change means no message. Do not create a new DM/reminder stream or bypass contact restrictions through other surfaces.

## Access and activation

Required connectors: GitHub for current instructions; Slack for source threads, transcript/canvas and source-thread publication; Asana for verified task reads/writes. A successful read preflight is necessary, but canvas edit access remains a per-meeting prerequisite.

Before activation, remove operational H17 handoffs and reminders from the validation monitor and verify the narrowed prompt. Preserve its test-validation scope and all unrelated configuration. Register this task as the sole scheduled operational writer; another supervised run must check the same source-thread mappings and avoid concurrent writes.

Verify task creation and its saved prompt/schedule separately from a successful run. The initial source review and two historical Asana captures are evidence of the earlier supervised pilot, not proof this new task has run. Record the first successful scheduled result only after notes/task/source-thread readback and preserve untested recovery cases.

## Verified runtime binding — 21 September 2026

- Automation: **Process meeting actions**, ID `6ab13793dc4c8191be129b9c3a5d5bd8`.
- Created and read back enabled, hourly condition watch, Europe/Amsterdam. Saved prompt matched the scoped implementation.
- GitHub, DCA Bot Slack and Asana read preflights succeeded before creation. Canvas write access remains a per-meeting check.
- Existing validation-monitor prompt was narrowed to test validation and read back before activation; its schedule and unrelated instructions were preserved.
- No scheduled execution of this new task has yet been verified. Existing task captures are historical pilot evidence.

## Current runtime status — 21 September 2026

Anja broadened the intended meeting coverage beyond #structural-alignment and proposed Claude as the operational executor. The ChatGPT task above was paused and read back disabled. Attempts to convert it to Slack events returned service errors; readback confirmed no trigger was saved. Adding ChatGPT to the channel did not activate an event-driven workflow.

Keep the provider-independent meeting contract and validation-test separation. Claude is DCA's primary operational interface, but this workflow's Claude notes-editing, Asana access and reply-trigger behaviour still require a bounded live check before claiming deployment. Do not infer permission for every channel or create overlapping writers. The earlier hourly configuration record remains historical evidence, not current activation status.
