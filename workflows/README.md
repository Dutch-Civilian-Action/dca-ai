# Workflows

Provider-independent multi-step AI-supported DCA organisational workflows.

A workflow defines DCA behaviour, evidence boundaries, validation logic, outputs, and failure expectations independently of the AI runtime used to execute it.

Current workflows:

- `meeting-actions-to-asana.md` — capture meeting-derived action candidates in the existing review thread, confirm scope/ownership, create or reuse Asana tasks with source and approval provenance, and verify the handoff; bounded supervised capture tested, general recurring ingestion unverified.

- `full-historical-domain-reconstruction.md` — reconstruct a bounded domain source-first, preserve its evidence graph, and produce a standalone reader-ready synthesis with usable source context.
- `reconstruction-self-evaluation-and-routing.md` — test reconstruction sufficiency, establish what the evidence supports, suppress settled or duplicate validation requests through a delta-only preflight, prepare operator-appropriate validation through the Establish task structure, and assess bounded routing/promotion readiness.
- `monitor-validation-queue.md` — maintain the full unresolved validation queue across old and new items, deliver bounded provider-enabled owner reminders through existing authoritative review surfaces, and hand each newly sufficiently established finding or correction immediately into the canonical maintained-reality comparison, persistence, verification, and closure path; the scheduled Reality Watch remains recovery and broad evidence coverage rather than the only reconciliation clock.
- `reconcile-established-findings-into-maintained-reality.md` — shared handoff used by Historical Reconstruction and Reality Watch to compare established findings with authoritative maintained targets, classify outcomes, route, persist, verify, record what happened, and close genuine no-change results without invented work.
- `maintain-dca-reality.md` — maintain Operational Reality, Derived Organisational Reality, and System & Structure Capability Reality from materially changed evidence through the shared reconciliation handoff and reader-ready Reality Watch outputs.
- `reconcile-relationship-data.md` — preserve, reconcile, persist, and retrieve bounded DCA relationship information with provenance, uncertainty, and validation boundaries.
- `intake-newsletter-contacts.md` — intake names/email lists into current DCA relationship records before any authorized Mailchimp subscription, preserving consent evidence, audience-specific results and migration continuity.
- `prepare-fundraising-outreach.md` — prepare fundraising and outreach communication for churches, Rotary clubs, donors, funders and partners from established audience, relationship stage, purpose, need and ask, with campaign selection, evidence discipline, distinct content/recipient/send authorization and funding-ask distinctions; preparation only, sending nothing and mutating nothing.
- `set-up-donorbox-page.md` — generate a source-bound setup checklist for one Donorbox page, stop for review, create a new campaign under the responsible person's supervision and record the actual interface state, with release gates kept separate; experimental, two supervised birthday-page runs (26 Sep 2026), no publication authority.

Provider-specific scheduled tasks, prompts, tool bindings, trigger mechanics, polling cadence, or runtime configuration belong under `providers/` and must not redefine the workflow itself.
