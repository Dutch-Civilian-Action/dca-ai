# Workflows

Provider-independent multi-step AI-supported DCA organisational workflows.

A workflow defines DCA behaviour, evidence boundaries, validation logic, outputs, and failure expectations independently of the AI runtime used to execute it.

Current workflows:

- `full-historical-domain-reconstruction.md` — reconstruct a bounded domain source-first, preserve its evidence graph, and produce a standalone reader-ready synthesis with usable source context.
- `reconstruction-self-evaluation-and-routing.md` — test reconstruction sufficiency, establish what the evidence supports, suppress settled or duplicate validation requests through a delta-only preflight, prepare operator-appropriate validation through the Establish task structure, and assess bounded routing/promotion readiness.
- `monitor-validation-queue.md` — maintain the full unresolved validation queue across old and new items, deliver bounded provider-enabled owner reminders through existing authoritative review surfaces, and hand each newly sufficiently established finding or correction immediately into the canonical maintained-reality comparison, persistence, verification, and closure path; the scheduled Reality Watch remains recovery and broad evidence coverage rather than the only reconciliation clock.
- `reconcile-established-findings-into-maintained-reality.md` — shared handoff used by Historical Reconstruction and Reality Watch to compare established findings with authoritative maintained targets, classify outcomes, route, persist, verify, record what happened, and close genuine no-change results without invented work.
- `maintain-dca-reality.md` — maintain Operational Reality, Derived Organisational Reality, and System & Structure Capability Reality from materially changed evidence through the shared reconciliation handoff and reader-ready Reality Watch outputs.
- `reconcile-relationship-data.md` — preserve, reconcile, persist, and retrieve bounded DCA relationship information with provenance, uncertainty, and validation boundaries.
- `intake-newsletter-contacts.md` — intake names/email lists into current DCA relationship records before any authorized Mailchimp subscription, preserving consent evidence, audience-specific results and migration continuity.

Provider-specific scheduled tasks, prompts, tool bindings, trigger mechanics, polling cadence, or runtime configuration belong under `providers/` and must not redefine the workflow itself.
