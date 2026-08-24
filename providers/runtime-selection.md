# DCA AI Runtime Selection

## Principle

DCA AI capabilities, workflows, tests, and authority rules should remain provider-independent wherever practical.

**Runtime selection is an implementation decision, not part of DCA organisational architecture.**

## Current System & Structure position

ChatGPT is currently used as the primary System & Structure AI environment during development and live testing, including architecture work, reconstruction, reconciliation, workflow design, testing, and capability monitoring.

This is a current implementation fact, not a commitment to a permanent provider.

A validated workflow may:

- stay on ChatGPT;
- move to Claude;
- move to another suitable AI runtime;
- run across more than one runtime where there is a justified operational reason.

DCA should not introduce multiple providers merely for architectural symmetry.

## Selection criteria

Choose a runtime based on the workflow's actual requirements, including:

- access to required DCA evidence and systems;
- reliability and failure behaviour;
- ability to preserve authority and validation boundaries;
- test performance on real DCA cases;
- monitoring and auditability;
- maintainability and handover;
- security and governance;
- operational burden and cost.

## Migration rule

A runtime change should preserve the provider-independent workflow and rerun relevant behavioural/regression tests.

Do not rewrite DCA organisational meaning around a provider simply because a provider offers a convenient feature.
