# DCA AI Runtime Selection

## Principle

DCA AI capabilities, workflows, tests, and authority rules should remain provider-independent wherever practical.

**Runtime selection is an implementation decision, not part of DCA organisational architecture or authority.**

A primary operational runtime may be designated without making that provider organisational authority or forcing every workflow onto it.

## Current DCA runtime position

### Claude — primary operational AI runtime/interface

Claude is DCA's current primary operational AI runtime/interface for organisation-facing AI capabilities.

This is a current implementation and operating decision. Claude applies current DCA authority, provider-independent agents, workflows, skills, and tests; it does not define organisational truth by itself.

A bounded DCA workflow is not required to run in Claude merely because Claude is the primary operational runtime.

### ChatGPT — System & Structure development, testing, and monitoring

ChatGPT is currently used as the primary System & Structure AI environment for:

- architecture work and correction;
- reconstruction and reconciliation;
- workflow design;
- behavioural and live testing;
- capability monitoring;
- bounded operational S&S workflows where appropriate, including DCA Reality Watch.

This is a current implementation fact, not a commitment to a permanent provider.

### Airtable Omni — embedded workflow testing

Airtable Omni is currently used as an embedded testing runtime where direct access to current Airtable state makes it useful.

The current example is the Relationship Data Agent / `reconcile-relationship-data` workflow against `2 | DCA Relationships & Workflows`.

Omni testing does not make Airtable schema or Omni behaviour organisational architecture.

## Per-workflow selection

A workflow may:

- run operationally in Claude;
- remain on ChatGPT where that is the better operational fit;
- use Airtable Omni as a bounded embedded test or execution runtime;
- move to another suitable AI runtime;
- run across more than one runtime where there is a justified operational reason.

DCA should not introduce multiple runtimes merely for architectural symmetry.

## Selection criteria

Choose a runtime based on the workflow's actual requirements, including:

- access to required DCA evidence and systems;
- reliability and failure behaviour;
- ability to preserve authority and validation boundaries;
- test performance on real DCA cases;
- monitoring and auditability;
- maintainability and handover;
- security and governance;
- operational burden and cost;
- interaction and retrieval requirements.

## Migration rule

A runtime change should preserve the provider-independent agent, workflow, skill, authority boundary, and relevant behavioural/regression tests.

Do not rewrite DCA organisational meaning around a provider simply because a provider offers a convenient feature.
