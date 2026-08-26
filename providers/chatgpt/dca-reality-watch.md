---
document_type: dca_ai_provider_implementation
status: current-testing
provider: chatgpt
workflow: maintain-dca-reality
---

# ChatGPT Implementation — DCA Reality Watch

## Canonical workflow

`../../workflows/maintain-dca-reality.md`

This file records the current ChatGPT implementation of that provider-independent DCA workflow. It is not the workflow authority itself.

The ChatGPT runtime must execute the current canonical workflow, including its Output contract. Provider-specific instructions may define runtime access and publication routing, but must not redefine Operational Reality, Derived Organisational Reality, Capability Reality, or output eligibility rules.

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
- no-change → no-notification behaviour.

Provider implementation must not duplicate or silently override these rules. When the canonical workflow changes, the runtime should follow the current workflow unless a provider-specific technical limitation prevents it; any such limitation should be recorded here as implementation reality.

## Testing status

This implementation remains part of System & Structure development and live organisational testing.

Operational publication is active. Testing now concerns finding quality, routing, usefulness, thread-case quality, source coverage, and whether outputs are actually used by DCA.

Running Reality Watch in ChatGPT does not imply ChatGPT is the permanent runtime.

## Runtime portability

The implementation may later:

- remain on ChatGPT;
- be implemented in Claude;
- be implemented in another AI runtime;
- be moved into a broader orchestration layer.

Any replacement should be tested against the same provider-independent workflow and behavioural expectations rather than redefining the DCA capability around the new provider.
