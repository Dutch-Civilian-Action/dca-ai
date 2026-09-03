# Tests

Validation and regression tests for DCA AI skills, agents, workflows, and provider implementations.

Tests should check behaviour against DCA authority rules, evidence handling, uncertainty preservation, expected outputs, and provider portability.

Where a capability is provider-independent, test the same behavioural contract across any runtime being considered rather than writing provider-specific organisational expectations.

Current skill tests:

- `skills/dca-document-authoring.md` — standalone-reader context, source-guide usability, authority/status visibility, private drafting-history separation, and native document structure.
- `skills/dca-output-routing.md` — output-family selection, explicit-format preservation, maintained destination defaults, document-like HTML/web artifacts, interface/application separation, runtime capability limits, and multi-output derivatives.

Current workflow tests:

- `workflows/full-historical-domain-reconstruction.md` — standalone final synthesis, reader-usable source guide, unpublished-process-language separation, Establish-task reuse, and delta-only validation handoff.
- `workflows/maintain-dca-reality.md` — Reality Watch behaviour, material-change detection, authority boundaries, uncertainty preservation, capability-health findings, validation-request deduplication, and provider portability.
- `workflows/reconstruction-self-evaluation-and-routing.md` — operational-validation language and role boundaries, validation-request preflight, Establish-task topology, corrected-wording confirmation, no-change closure, and validator routing.
- `workflows/reconcile-established-findings-into-maintained-reality.md` — shared comparison outcomes, routing, persistence/verification, no-change confirmations, corrected-wording confirmation, and caller consistency.
- `workflows/relationship-data-reconciliation.md` — relationship identity, provenance, uncertainty, conflict handling, retrieval, write boundaries, privacy, and provider portability. Concrete live cases are developed separately from the workflow definition.
- `workflows/logistics-intake-reconstruction.md` — reconstruction-first mixed Logistics intake, source preservation, operational people/organisation/location/route context, non-premature modelling, relationship write boundaries, and later reconciliation.
