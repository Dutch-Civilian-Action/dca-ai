# Tests

Validation and regression tests for DCA AI skills, agents, workflows, and provider implementations.

Tests should check behaviour against DCA authority rules, evidence handling, uncertainty preservation, expected outputs, and provider portability.

Where a capability is provider-independent, test the same behavioural contract across any runtime being considered rather than writing provider-specific organisational expectations.

Current workflow tests:

- `workflows/maintain-dca-reality.md` — Reality Watch behaviour, material-change detection, authority boundaries, uncertainty preservation, capability-health findings, and provider portability.
- `workflows/relationship-data-reconciliation.md` — relationship identity, provenance, uncertainty, conflict handling, retrieval, write boundaries, privacy, and provider portability. Concrete live cases are developed separately from the workflow definition.
