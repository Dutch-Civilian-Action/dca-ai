# Reality observability dashboard

Status: Dev/Test verified; production promotion pending repository review.

## Purpose

Implement the measurement contract in `workflows/measure-reality-observability.md` using existing reconciliation lineage. This reporting layer makes Reality movement visible without becoming a source of organisational truth or an improvement score.

## Dev/Test result — 24 September 2026

A bounded 30-day reconstruction read 845 `Reconstruction_Objects` and selected only records with:
- supported `reconciled_at` in the bounded window; and
- an explicit maintained-reality `routing_destination`.

This produced 164 derived movement events:
- Operational Reality: 74
- Capability Reality: 70
- Derived Reality: 20

The Dev/Test dashboard contains event-level lineage plus 7-day and 30-day movement snapshots. It was published in the isolated Dev/Test base for inspection.

## What is safe now

Safe historical fields include reconciliation timestamp, explicit reality-view routing, maintained-reality outcome, source domain wording, validation status, persistence verification, source lineage record, and bounded capability-stage mapping.

The backfill deliberately leaves unsupported semantics unknown/partial:
- correction origin;
- independent source count;
- complete provenance state;
- normalized organisational function;
- verified capability transition history.

## Promotion contract

1. Review repository schema/binding and Dev/Test dashboard.
2. Create dedicated derived event/snapshot tables in DCA Evidence & Reconciliation; do not alter existing validation tables.
3. Re-run the deterministic backfill from source lineage rather than copying Dev/Test record IDs.
4. Verify event counts and per-view totals against the bounded source population.
5. Add Reality Movement and later Reconstruction Health sections to the existing production observability interface.
6. Keep Change / Improvement interpretation empty or explicitly provisional until comparable history supports it.
7. Extend Reality Watch to append newly verified reconciliation events after production binding exists; no new recurring automation.

Measurement failure never blocks maintained-reality reconciliation.
