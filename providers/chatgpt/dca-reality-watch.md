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

## Current implementation

Task name: **DCA Reality Watch**

Runtime: **ChatGPT scheduled condition watch**

Cadence: **daily**

Notification rule: **notify only when materially new or changed DCA reality is detected**

Current evidence views:

- Operational Reality;
- System & Structure Capability Reality.

Current source classes include, where available:

- current Operational Reality and Derived Organisational Reality;
- current DCA methods and authority map;
- Google Drive;
- GitHub;
- public DCA Slack;
- Airtable/system state;
- integrations, automations, and runtime evidence;
- downstream use.

## Implementation requirements

The ChatGPT task must preserve the canonical workflow's:

- evidence classification;
- source/provenance boundaries;
- authority and lifecycle status;
- uncertainty/conflict handling;
- reconstruction and reconciliation rules;
- material-change criteria;
- validation boundary;
- output discipline;
- no-change → no-notification behaviour.

## Testing status

This implementation is part of System & Structure development and live testing.

Operational use during testing is allowed where the workflow boundary is sufficiently clear. Running it in ChatGPT does not imply ChatGPT is the permanent runtime.

## Runtime portability

The implementation may later:

- remain on ChatGPT;
- be implemented in Claude;
- be implemented in another AI runtime;
- be moved into a broader orchestration layer.

Any replacement should be tested against the same provider-independent workflow and behavioural expectations rather than redefining the DCA capability around the new provider.
