---
document_type: dca_ai_provider_implementation
status: current-testing
provider: chatgpt
workflow: maintain-dca-reality
---

# ChatGPT Implementation — DCA Reality Watch

## Canonical workflow

`../../workflows/maintain-dca-reality.md`

Shared maintained-reality handoff:

`../../workflows/reconcile-established-findings-into-maintained-reality.md`

This file records the current ChatGPT implementation of that provider-independent DCA workflow. It is not the workflow authority itself.

The ChatGPT runtime must execute the current canonical workflow, including its Output contract. Provider-specific instructions may define runtime access, persistence mechanics and publication routing, but must not redefine Operational Reality, Derived Organisational Reality, Capability Reality, or output eligibility rules.

## Current implementation

Task name: **DCA Reality Watch**

Runtime: **ChatGPT scheduled condition watch**

Cadence: **daily at 08:00 Europe/Amsterdam**

Notification rule: **publish only when the canonical workflow identifies materially new or changed DCA reality**

Current maintained reality views include:

- DCA Operational Reality;
- DCA Derived Organisational Reality;
- DCA System & Structure — Capability Reality.

Current source classes include, where available:

- current maintained reality documents;
- current DCA methods and authority map;
- Google Drive;
- GitHub;
- public DCA Slack;
- Airtable/system state;
- integrations, automations, and runtime evidence;
- downstream use.

## Maintained-reality persistence

Maintaining reality means **persisting supported changes into the current maintained reality documents**, not merely detecting, summarising, or reporting them in the scheduled run.

For every run:

1. resolve and read the current maintained Operational Reality, Derived Organisational Reality, and System & Structure Capability Reality documents before evaluating change;
2. determine evidence coverage from what is actually represented in the maintained reality and its provenance, not from the scheduled task's `last_run_time` and not from Google Drive modification time alone;
3. inspect materially relevant evidence that has not yet been represented, including backlog created by a previous incomplete or failed run;
4. invoke the shared maintained-reality reconciliation workflow for each established candidate;
5. record its controlled outcome, destination, comparison target/revision, and required action;
6. when the canonical Output contract supports an update, write that update into the relevant maintained document;
7. re-read or otherwise verify the persisted document after the write before treating that output as completed;
8. record the persisted target/revision, actor/time, and verification state in the originating lineage or equivalent run-result record;
9. only after persistence has succeeded may the run close a change-bearing source review, treat the maintained-reality output as complete, or publish a Slack summary of that maintained change.

A task execution, generated finding, Slack message, or successful source read is **not** evidence that maintained reality was updated.

If a required maintained-document write cannot be completed or verified:

- preserve the finding as unpersisted work rather than silently treating it as maintained;
- do not advance evidence coverage past the failed material;
- do not claim that Operational Reality, Derived Organisational Reality, or Capability Reality was updated;
- surface the persistence failure as System & Structure capability/runtime evidence at the next appropriate human-visible check rather than masking it as a no-change run.

Recovery rule: after any maintenance gap, process the unrepresented evidence backlog before limiting attention to the newest day. A later successful scheduled run must therefore recover materially relevant evidence missed by earlier runs rather than assuming that prior task execution means prior evidence was processed.

## Publication routing

Organisation-facing publication routing is active.

Route each material Reality Watch finding by its actual scope:

- **domain-specific operational finding** → the relevant public domain channel;
- **cross-domain structural finding, shared-model change, capability dependency, architecture/reconciliation issue, or working organisational finding** → `#structural-alignment` (`C0AEEFTS495`);
- **major organisation-wide finding, decision implication, or synthesis materially affecting DCA beyond one domain** → `#organisation` (`C038ABGL8SD`).

Rules:

- route by scope rather than posting everything everywhere;
- do not duplicate the same finding across channels unless separate audiences are genuinely required;
- do not post routine implementation activity, low-signal changes, or unvalidated inference merely to keep the automation active;
- `#test-automations` is no longer the normal publication target.

## Output implementation

All output eligibility, authority, structure, and no-output behaviour are defined by the canonical workflow's **Output contract**.

The ChatGPT runtime must therefore preserve the distinction between:

1. Operational Reality updates;
2. Derived Organisational Reality updates;
3. System & Structure Capability Reality updates;
4. top-level Reality Watch Slack publication;
5. the optional **What this makes visible** thread;
6. no-output conditions.

When the canonical workflow supports a **What this makes visible** case, publish it as a thread reply beneath the relevant Reality Watch Slack post rather than as a separate top-level broadcast.

The thread must remain grounded in the evidence and maintained reality that produced the parent finding. It must not create a new organisational finding, invent a benefit, or present a proposed future state as current reality.

## Implementation requirements

The ChatGPT task must preserve the canonical workflow's:

- evidence classification;
- source/provenance boundaries;
- authority and lifecycle status;
- uncertainty/conflict handling;
- reconstruction and reconciliation rules;
- material-change criteria;
- validation boundary;
- output contract;
- maintained-document comparison outcome, persistence, verification, and source-review closure;
- an auditable originating-lineage/result record;
- backlog recovery after incomplete runs;
- no-change → no-notification behaviour.

Provider implementation must not duplicate or silently override these rules. When the canonical workflow changes, the runtime should follow the current workflow unless a provider-specific technical limitation prevents it; any such limitation should be recorded here as implementation reality.

## Testing status

This implementation remains part of System & Structure development and live organisational testing.

Operational publication is active. Testing now concerns finding quality, routing, usefulness, thread-case quality, source coverage, maintained-document persistence, recovery after failed/incomplete runs, and whether outputs are actually used by DCA.

Running Reality Watch in ChatGPT does not imply ChatGPT is the permanent runtime.

## Runtime portability

The implementation may later:

- remain on ChatGPT;
- be implemented in Claude;
- be implemented in another AI runtime;
- be moved into a broader orchestration layer.

Any replacement should be tested against the same provider-independent workflow and behavioural expectations rather than redefining the DCA capability around the new provider.
