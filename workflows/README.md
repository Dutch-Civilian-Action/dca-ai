# Workflows

Provider-independent multi-step AI-supported DCA organisational workflows.

A workflow defines DCA behaviour, evidence boundaries, validation logic, outputs, and failure expectations independently of the AI runtime used to execute it.

Current workflows:

- `full-historical-domain-reconstruction.md` — reconstruct a bounded domain source-first and preserve its evidence graph.
- `reconstruction-self-evaluation-and-routing.md` — test reconstruction sufficiency, establish what the evidence supports, and prepare bounded routing/promotion assessment.
- `reconcile-established-findings-into-maintained-reality.md` — shared handoff used by Historical Reconstruction and Reality Watch to compare established findings with authoritative maintained targets, classify outcomes, route, persist, verify, and record what happened.
- `maintain-dca-reality.md` — maintain Operational Reality, Derived Organisational Reality, and System & Structure Capability Reality from materially changed evidence through the shared reconciliation handoff.
- `reconcile-relationship-data.md` — preserve, reconcile, persist, and retrieve bounded DCA relationship information with provenance, uncertainty, and validation boundaries.

Provider-specific scheduled tasks, prompts, tool bindings, or runtime configuration belong under `providers/` and must not redefine the workflow itself.
