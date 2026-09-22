---
document_type: dca_ai_provider_implementation
status: proposed
provider: claude
workflow: meeting-actions-to-asana
---

# Claude — Meeting actions to Asana

Canonical contract: [meeting-actions-to-asana](../../workflows/meeting-actions-to-asana.md).

**Status: proposed configuration only.** Nothing described here is configured, attached or verified. This record identifies what a Claude executor would need; it does not make Claude the current executor, and it does not authorise any new meeting ingestion. The [ChatGPT runner](../chatgpt/meeting-actions-to-asana.md) is paused, so this workflow currently has no active executor.

## Surface selection

The workflow's source thread, published notes and owner replies all live in Slack, and the review batch must be readable and answerable by the meeting's participants there. The matching Claude surface is therefore **Claude Tag** in the DCA Slack workspace, acting under the organisation-managed channel identity described in [access bundles](tag/access-bundles.md).

A Claude Chat project, Cowork session or Claude Code session is not an equivalent substitute for the in-channel steps: each would need its own verified Slack read/write path to the same thread and notes, and none of them currently has one. Do not treat repository access or a plugin as evidence of that path.

## Executor identity

- The writer is the **Claude Tag channel identity**, not a human participant's account, not DCA Bot, and not a Claude Code session running under an individual account. DCA Bot was the Slack publisher in the historical ChatGPT pilot; it has no role in a Claude implementation.
- Notes edit access must be granted to that Claude Tag identity specifically. Anja's access, channel membership and the ability to read the notes do not establish it. Where the notes are a Slack canvas, an authorised editor shares the canvas with that identity and gives edit access, and the executor rechecks before writing.
- Exactly one executor may hold writes for a batch. While this record stays proposed, any Claude run is a supervised run that must check existing source-thread mappings first and must not overlap with another writer.

## Invocation model — verify, do not assume

Claude Tag is invoked by tagging `@Claude` in a channel it has been added to. Claude Code in Slack, the earlier individual-account integration, is documented as responding to `@mentions` only in channels where it has been added ([Claude Code in Slack](https://code.claude.com/docs/en/slack)); Claude Tag runs the same `@Claude` handle as the organisation's shared identity ([Claude Tag](https://code.claude.com/docs/en/claude-tag)).

Consequences for this workflow, until observed otherwise in DCA's own workspace:

- **The initial processing request requires an explicit tag.** Publishing notes, sharing a canvas or adding Claude to a channel does not start a run.
- **Each subsequent owner reply must be assumed to require an explicit tag as well.** A plain threaded reply carrying only the stable item reference must not be assumed to reach the executor. The review batch must therefore tell owners exactly how to reply so that their confirmation is actually received.
- **Auto-mode allow rules do not change this.** They pre-approve action classes inside a session; they are not an invocation mechanism, and DCA's current bundles set none.
- **No scheduled Claude runner is established for this workflow.** There is no Claude equivalent here of the paused ChatGPT hourly condition watch. If unattended processing is wanted, that trigger mechanism must be established and verified separately before it is described anywhere as available.

Open question, to be resolved in DCA's own Claude Tag admin settings rather than from documentation: whether any proactive/ambient channel setting exists that would let Claude act on a thread without a tag, and whether it is off. Anthropic's Claude Tag setup documentation was not reachable from the session that wrote this record (`claude.com` and `support.claude.com` are blocked by this environment's egress proxy), so the mention-driven model above is recorded from the reachable first-party Claude Code in Slack and Claude Tag pages plus DCA's existing pilot rule of explicit `@Claude` invocation. Treat it as the safe assumption to design against, not as a verified DCA workspace fact.

## Access required

| Need | Source | Current state |
|---|---|---|
| Repository instructions (this workflow, governance, tests) | DCA Core bundle (`dca-ai`, `dca-architecture`) | Attached at workspace scope per [access bundles](tag/access-bundles.md) |
| Source thread, notes/canvas read and publication | The channel carrying the meeting, with the Claude Tag identity added | Channel-dependent; `#structural-alignment` carries DCA Shared Sources + DCA System & Structure |
| Notes/canvas **edit** | Per-meeting share with the Claude Tag identity | Not established for any meeting |
| Asana task read and write | An Asana connector/credential attached to the relevant channel scope | **Gap: no bundle in `tag/access-bundles.md` currently carries Asana access** |

The Asana gap is the blocking capability item. Record the credential, its scope and the channels it is attached to in `tag/access-bundles.md` when it is actually configured — that file remains authoritative on runtime access, and this record must not be read as evidence of an attachment. Keep the credential narrow enough for the least-privileged member of any channel it reaches, per the security boundary in that file.

Model and effort follow [model selection](model-selection.md); this work is ordinary operational processing on the validated baseline, not a reason to escalate.

## Authorisation

Every provider action follows [principal / action authorization](tag/principal-action-authorization.md) in full, on top of the contract's own confirmation gate. Two links deserve advance attention here:

- **Operator binding (link 2).** If a confirming owner has no independently verified DCA Operator record, the chain fails closed and the Asana write is not authorised, however clear the confirmation reads. Establish this before promising owners that a tagged reply completes capture.
- **Channel capability (link 4).** An owner's confirmation cannot manufacture Asana access in a channel whose bundle does not carry it. Where capability is missing, the contract's confirmed-but-blocked handoff applies.

An owner's item confirmation remains a task-capture approval only. It does not authorise the underlying work, and it does not widen the channel's grant.

## Scope

Initial scope would be the meeting explicitly requested for processing, in a channel where the above access is verified — starting from the existing 17 September pilot lineage in `#structural-alignment` (`C0AEEFTS495`, thread `1789639652.309889`, review message `1789683237.845209`). Anja's broader intended meeting coverage is recorded as intent; each additional channel needs its own bundle attachment, its own notes-edit share and its own registration. Do not backfill historical meetings.

## Before this record may be called current

1. Claude Tag identity added to the intended channel, and the channel's bundle verified to carry Asana access.
2. Notes/canvas edit access granted to that identity for the specific meeting, with a write and readback verified.
3. Invocation model observed in DCA's workspace: what the initial request needs, and what an owner reply needs, recorded as observed behaviour with the message references.
4. One bounded end-to-end run against a real batch: confirmation received, Asana task created or reused, task read back, mapping returned to the source thread.
5. A repeat run over the same batch producing no duplicate task, review post or reminder.

Until every step above has been observed, this file stays `proposed` and the workflow's deployment status stays unverified. Configuration that is only written down here is intended configuration, not deployment.
