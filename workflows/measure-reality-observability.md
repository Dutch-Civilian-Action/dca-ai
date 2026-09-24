# Reality observability metrics

Status: proposed implementation contract

## Purpose

Expose how DCA's maintained Operational Reality, System & Structure Capability Reality, and Derived Organisational Reality move over time, and provide cautious evidence-backed indicators of whether reconstruction and organisational observability are improving.

This is a derived reporting layer. Maintained reality and reconciliation lineage remain authoritative.

## Principles

1. Movement is measured before improvement is interpreted.
2. Change is not automatically improvement or deterioration.
3. No composite maturity score.
4. Preserve coverage, denominators, unknowns, lower-bound clocks, conflicts and reclassification.
5. Derive from work Reality Watch and reconciliation already perform; no extra volunteer input.
6. Dashboard metrics never determine maintained truth or validation state.
7. Compare like-for-like periods only when source coverage is materially comparable.

## Event model

One measurement event represents one accepted maintained-reality reconciliation outcome or one explicitly preserved non-change outcome when needed for denominators.

Minimum fields:

- event_id — deterministic identity from lineage object + reconciliation timestamp/outcome
- occurred_at
- reality_view — operational | capability | derived
- organisational_function — bounded function/domain when supported
- reconciliation_outcome — existing controlled outcome
- change_class — addition | correction | qualification | confirmation | conflict | unresolved | historical | proposed_future | alternate_destination
- correction_origin — human_correction | cross_source_contradiction | validation | reality_watch_reconstruction | system_runtime_evidence | external_evidence | not_applicable | unknown
- source_count / independent_source_count where supportable
- provenance_state — complete | partial | unknown
- validation_required / validation_completed
- validation_requested_at / validated_at / reconciled_at where supported
- maintained_target / target_revision
- persistence_verified
- coverage_notes
- source_reference / lineage_reference

Capability events may additionally carry capability_state_from/to using the bounded vocabulary:
available_configured, demonstrated, repeated_use, operationally_relied_upon, blocked, failed, recovered, unknown.

Derived events may additionally carry derived_change:
added, strengthened, qualified, weakened, corrected, contradicted, superseded, confirmation_only.

## First metrics

### Reality movement

For 7-day and 30-day windows, by reality view:

- additions
- corrections
- qualifications
- confirmation-only / already-represented outcomes
- conflicts/not-ready
- uncertainties newly exposed
- uncertainties resolved

Do not infer improvement from these counts alone.

### Reconstruction health

Where clocks and denominators are supported:

- provenance completeness rate
- validation-to-reconciliation latency
- evidence-to-maintained-reality latency
- unresolved uncertainty count and age basis
- conflict count and age basis
- repeated-question/rework events
- reconstructable-without-human-reask rate

The last metric requires an explicit denominator of material state questions assessed in the period. Do not infer it from total claims.

### Capability trajectory

Count transitions, not merely artifacts:

- configured → demonstrated
- demonstrated → repeated use
- repeated use → operationally relied upon
- blocked/failed → recovered
- newly blocked/failed
- unresolved dependency gaps

### Derived-reality trajectory

- findings added
- strengthened
- qualified
- weakened/corrected
- contradicted
- superseded
- stable under materially new evidence

### Correction pressure

Break down corrections by correction origin and organisational function. This is a reconstruction/visibility signal, not a ranking or performance metric.

## Improvement interpretation

Expose a separate interpretation layer only after enough comparable history exists. Candidate directional indicators include:

- faster reconstruction with equal or better coverage;
- increasing provenance completeness;
- lower repeated-question burden;
- shorter supported unresolved/validation latency;
- movement from person-held evidence to organisation-held reconstructable state;
- capability progression backed by actual use and recovery evidence;
- derived findings gaining independent support or remaining stable under materially new evidence.

Every improvement statement must name the supporting metric movement, period, coverage and relevant limitation. If interpretation is ambiguous, display the movement without an improvement label.

## Initial implementation

1. Extend the existing validation/metrics reporting implementation in DCA Evidence & Reconciliation rather than creating a separate base or automation.
2. Add dedicated derived event/snapshot tables only after schema review; keep current validation tables intact.
3. Backfill up to 30 days from Reconstruction_Objects and maintained-document lineage. Mark unsupported historical fields unknown; never reconstruct fake clocks.
4. Capture new events from verified Reality Watch reconciliation as part of the existing broad sweep.
5. Build dashboard sections: Validation; Reality Movement; Reconstruction Health; Change / Improvement.
6. Verify counts against source lineage before making the dashboard team-facing.
7. Keep correction-pressure charts free of person-level ranking.

## Non-goals

- measuring volunteer productivity;
- scoring teams or individuals;
- using correction volume as error rate;
- treating claim count growth as progress;
- replacing Operational, Capability or Derived Reality;
- creating another recurring monitor;
- requiring people to maintain metric fields manually.
