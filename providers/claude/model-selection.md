---
document_type: dca_ai_provider_configuration
status: current-testing
provider: claude
scope: model-and-effort-selection
---

# Claude Model Selection

## Purpose

Choose the Claude model and effort level according to the work being done after Claude has already been selected as the runtime.

This is provider configuration, not DCA organisational authority. Model choice must not change source authority, permissions, validation boundaries, or who is allowed to make a decision.

Use `../runtime-selection.md` first when the question is whether Claude is the right runtime at all.

## Selection principle

Use the least expensive and least deliberative configuration that passes the relevant DCA behavioural tests reliably.

Do not use a stronger model to compensate for:

- wrong source routing;
- overly broad access;
- missing evidence;
- weak workflow definition;
- unclear authority or validation boundaries;
- poor repository or skill configuration.

Escalate model or effort because the work requires more capability, not because the implementation is underspecified.

## Current working defaults

| Work type | Starting model | Effort | Notes |
| --- | --- | --- | --- |
| Ordinary organisation-facing lookup, retrieval, bounded tool use, and routine operational questions | Sonnet 5 | Medium | Default DCA operational baseline where evaluations confirm quality. Optimises responsiveness without asking the model to over-investigate. |
| Routine Claude configuration tests, skill/routing checks, bounded code edits, and normal implementation work | Sonnet 5 | Medium | Good baseline for testing whether the configuration itself works rather than whether a stronger model can rescue it. |
| Difficult coding, nuanced operational analysis, ambiguous reconciliation, or consequential multi-step work | Sonnet 5 or Opus 5 | High | Start with Sonnet where tests show it is sufficient; use Opus when the task is materially reasoning-sensitive. |
| System & Structure analysis, cross-domain reconciliation, architecture review, difficult source conflicts, and high-ambiguity organisational reasoning | Opus 5 | High | Current default for deeper DCA structural reasoning. Raise effort only when the work demonstrably benefits. |
| Large repository refactors, multi-repository investigations, long-running autonomous coding, or long-horizon agentic work | Fable 5 | High or xHigh | Use selectively for work that genuinely benefits from sustained exploration and coordination over many steps. Not a default operational model. |
| High-volume, narrow, low-risk classification, extraction, routing, or sub-agent work | Haiku 4.5 | Low or Medium | Use only after task-specific evaluation. Not the default for uncertain organisational reasoning or consequential actions. |

These are starting points, not permanent assignments. Validate them against real DCA cases and revise when model behaviour, cost, latency, or available models change.

## Effort guidance

Treat effort as a separate control from model choice.

- **Low** — short, narrow, latency-sensitive, high-volume tasks where evaluation shows quality holds.
- **Medium** — preferred baseline for routine operational work and configuration testing when speed and cost matter.
- **High** — complex reasoning, difficult coding, nuanced analysis, or agentic work where quality matters more than latency.
- **xHigh** — long-running or especially demanding coding/agentic work where extended exploration is justified and supported by the selected model.
- **Max** — exceptional cases only, after tests show measurable value beyond xHigh/high.

Do not increase effort merely because a task is important. Importance may require stronger validation, better evidence, or human review rather than more model deliberation.

## Escalation pattern

Prefer deliberate escalation rather than assigning the strongest model everywhere:

```text
routine task
→ configured baseline model/effort
→ evaluate result against behavioural contract
→ if capability is genuinely insufficient, raise effort
→ if still insufficient, raise model class
→ preserve the same source, authority, permission, and validation boundaries
```

When a failure comes from routing, access, stale evidence, or workflow design, fix that failure instead of escalating the model.

## Surface guidance

### Claude Tag / Slack

Use Sonnet 5 as the ordinary operational default unless a bounded channel or workflow has demonstrated need for a stronger model.

Current System & Structure channels may use Opus 5 because their work regularly involves reconstruction, conflicting evidence, architecture, and multi-domain reasoning.

Do not assign Fable 5 workspace-wide merely because it is more capable.

### Claude Code

Use Sonnet 5 Medium for routine implementation and configuration tests.

Use Sonnet 5 High or Opus 5 High for difficult coding and architecture review.

Use Fable 5 High/xHigh for genuinely long-horizon repository work, large refactors, or extended autonomous investigations.

For configuration validation, start below the strongest available model. A routing or skill design that only succeeds on the strongest model should be treated as a configuration warning until tested further.

## Evaluation rule

Model recommendations become operational defaults only when they perform adequately on the relevant DCA tests.

Evaluate at least:

- task correctness;
- source routing;
- authority and uncertainty preservation;
- tool-call behaviour;
- latency;
- cost per completed task;
- unnecessary searching or over-investigation;
- user-facing clarity;
- failure behaviour.

Prefer the lowest model/effort combination that reliably satisfies the behavioural contract. Re-test when Anthropic changes the available model family or effort behaviour.
