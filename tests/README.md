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

Current provider tests:

- `providers/claude/airtable-workspace-routing.md` — Airtable destination resolution by workspace + base identity, keeping production `DCA` bases distinct from the non-production `DCA Dev/Test` workspace, keeping staging-only `DCA Integrations & Reconciliation` distinct from canonical `DCA Logistics`, and keeping the one established `DCA Dev/Test` legacy-source base distinct from any production destination and from the other `DCA Dev/Test` bases (production-destination-excluded like it, but not established as sources).
- `providers/claude/tag-principal-action-authorization.md` — the authenticated-principal/action-authorization decision chain (trusted workspace + principal → exact Operator binding → explicit action grant → correct channel/bundle capability → explicit current-request scope), the rule that identity never substitutes for Operator binding and a delegation-authorization message never substitutes for a scoped action grant, spoofed-identity and wrong-workspace/channel rejection, access-without-authority and grant-without-access rejection, scope-escalation and merge denial, under-specified/destructive-repair refusal, the staging-repair boundary carve-out, minimal-identity output, delegated-controller limits, intended-configuration-is-not-deployed-access, and distinct requester/executor/delegate/GitHub-actor/Airtable-identity attribution.
