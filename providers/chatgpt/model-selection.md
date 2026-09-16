---
document_type: dca_ai_provider_configuration
status: proposed
provider: chatgpt
scope: model-and-effort-selection
last_verified: 2026-09-16
---

# ChatGPT Model Usage

## Purpose

Choose a model and reasoning effort after ChatGPT has been selected for the work. This guide covers the Astra, Sol, Terra and Luna choices used in ChatGPT Work, with relevant notes for Codex and configured workflows.

It is the counterpart to [Claude Model Selection](https://github.com/Dutch-Civilian-Action/dca-ai/blob/main/providers/claude/model-selection.md). Use [Runtime Selection](https://github.com/Dutch-Civilian-Action/dca-ai/blob/main/providers/runtime-selection.md) when deciding which provider or surface should perform the task.

These are proposed working recommendations. No comparative DCA evaluation or runtime-setting change is established by this document.

## Selection principle

Choose the least resource-intensive configuration that reliably completes the requested work and preserves its meaning, sources and boundaries.

Model and reasoning effort are separate choices. A harder task may need a more capable model, more effort, better evidence, or a clearer workflow. Identify the actual limitation.

Missing access, stale sources, conflicting instructions and incorrect routing require their own fixes. Additional reasoning cannot establish facts that have not been retrieved or validated. Model choice never changes DCA authority, permissions or the scope of an authorised action.

## Current working defaults

OpenAI describes Astra as its strongest model for demanding work across reasoning, tools and research, and Sol as a flagship for complex professional work. Both support Max reasoning. These are provider descriptions, not results from DCA testing. [Astra model documentation](https://developers.openai.com/api/docs/models/gpt-6-astra), [Sol model documentation](https://developers.openai.com/api/docs/models/gpt-5.6-sol).

Terra is the balanced option; Luna targets economical, narrow workloads. [OpenAI model catalogue](https://developers.openai.com/api/docs/models).

The following task assignments are DCA recommendations inferred from those capabilities and our workload.

| Work type | Starting model | Effort | Practical use |
| --- | --- | --- | --- |
| Short messages, wording corrections, straightforward explanations and summaries | Terra | Light/Low or Medium | Draft a casual update to Kees from facts already established. Match the requested tone and length. |
| Routine source lookup, bounded schema inspection and ordinary operational questions | Terra | Medium | Retrieve a specific record or compare a small, clearly defined set of sources. Preserve gaps. |
| Routine code edits, configuration checks and implementation of an accepted mapping | Terra or Sol | Medium | Start with Terra for narrow changes; use Sol when dependencies or interpretation make the work complex. |
| Difficult coding, nuanced reconciliation and substantial source-backed documents | Sol | High | Reconcile a bounded set of conflicting records or prepare a detailed handover with clear completion criteria. |
| System & Structure analysis, architecture review and difficult cross-domain source conflicts | Astra | High or Extra High | Resolve shared identity, relationship context, domain responsibilities and migration dependencies together. |
| Especially difficult investigation with intertwined architectural decisions | Astra | Max, selectively | Use when deeper analysis is worth the additional time and usage. Record unresolved questions rather than forcing a complete-looking answer. |
| Long repository work or complex work across several applications | Astra | High or Extra High | Judge by dependencies and ambiguity. Length alone does not justify Max. |
| Repeated extraction, classification or transformation with a clear output contract | Luna | Light/Low or Medium | Adopt only after representative cases show that missing values, uncertainty and source references survive correctly. |

**For the current identity and relationships investigation:** Astra Max is a reasonable supervised choice. The task combines current repo decisions, live Airtable organisation, earlier builds and domain boundaries. That recommendation does not establish that Max outperforms Extra High on this DCA task; that comparison has not been run.

Sol remains suitable for complex investigation as well as implementation. Choose subsequent work by its actual difficulty, rather than assigning one model permanently to planning and another to execution.

## Effort guidance

| Effort | Use |
| --- | --- |
| Light / Low | A narrow task with little interpretation. |
| Medium | Routine work requiring some planning and checking. |
| High | Difficult reasoning, coding or reconciliation. |
| Extra High / xHigh | Several interacting sources, dependencies or tradeoffs. |
| Max | The hardest individual problems, when depth matters more than speed or usage. |

Higher effort can take longer and consume more tokens. Light is the label used on some app surfaces; Low is used in the CLI. Use only the options available for the selected model and client. [Official OpenAI effort guidance](https://learn.chatgpt.com/docs/models).

**Ultra is a separate execution choice:** it uses subagents for parallel work. Use it when the task can be divided meaningfully and the task instructions permit that approach. Most tasks do not need Max or Ultra. [Official OpenAI Max and Ultra guidance](https://learn.chatgpt.com/docs/models#know-when-to-use-max-or-ultra).

Importance alone does not justify higher effort. A consequential action may primarily need better evidence, a relevant owner’s validation, or a verified execution path.

## Escalation pattern

1. Start at the appropriate configuration above and inspect the result against the task’s completion criteria.
2. Identify the failure: missing evidence, wrong interpretation, incorrect tool behaviour, insufficient reasoning, or unnecessary work.
3. Fix source, access and instruction problems directly. Raise effort or model capability when reasoning remains the limiting factor.
4. Stop escalating once the result is sufficiently correct and verified. Reduce effort for simple follow-up edits.

Astra Max is not the automatic response to a failed connector call. A connector limitation remains a connector limitation.

## Surface guidance

### Interactive ChatGPT work and projects

Use the relevant project context and give the chat the concrete task, current sources and expected deliverable.

For DCA architecture investigations, fetch the current relevant repo files and inspect live system evidence. Keep recorded architecture, observed implementation and proposed changes separate. A repo map does not prove that Airtable’s physical arrangement matches it.

Model availability and picker options vary by plan, client and rollout. Verify the active options; API documentation alone does not establish account access. [Official ChatGPT model guidance](https://learn.chatgpt.com/docs/models).

### Coding and implementation

Use the same task-based selection in Codex or a tool-enabled ChatGPT chat. Give the model the accepted scope, relevant files, dependencies and verification requirement.

For schema and migration experiments, follow the [Development, Testing and Production Promotion standard](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/main/systems/development-testing-and-promotion.md). Resolve the designated test environment separately from production. Model capability does not establish a migration destination or production adoption.

### Scheduled and operational workflows

Keep the configuration that has passed the relevant workflow checks. Treat a proposed model change as a bounded configuration change, with verification against the same contract.

This guide does not change Reality Watch, the validation monitor, reminder settings, or any saved model selection.

## Evaluation rule

Before adopting a configuration as a recurring operational default, compare representative cases using the same sources and completion criteria.

Assess correctness, uncertainty preservation, source routing, tool behaviour, clarity, time, observed usage and unnecessary searching. Include an incomplete or conflicting case where the workflow needs to handle one.

Use existing tests or an inspectable sample appropriate to the actual risk; do not create a large evaluation programme for a minor change. Keep structure acceptance, data validation, behaviour verification and production adoption distinct.

DCA’s [authority rules](https://github.com/Dutch-Civilian-Action/dca-ai/blob/main/governance/authority-rules.md) and workflow contracts apply at every model and effort level.

## Maintenance

Official model guidance was checked on **16 September 2026**. Recheck model names, available controls and recommendations when the product changes or observed task performance warrants it.

Maintain this guide alongside the Claude guide in `dca-ai`. Record changes to actual runtime defaults separately, with the affected workflow and verification evidence.
