# Validation metrics dashboard

Status: active System & Structure testing; introduced at Anja's request on 17 September 2026.

## Purpose and authority

The Airtable Interface is a derived reporting surface for the existing validation measurement contract. It does not decide queue membership, validate operational facts, send reminders, reconcile findings, or create another source of truth. Governing semantics remain in workflows/measure-validation-queue.md and the existing monitor/reconciliation workflows.

Anja explicitly authorized the dashboard in DCA Evidence & Reconciliation and asked to start measuring and recording what existing records support, without extra volunteer input. The existing private snapshot log remains intact. This opt-in additionally mirrors its reviewed measurements and exact review links into the named DCA base; it does not change access or publish outside existing Airtable permissions.

Exact runtime, source, production and isolated development IDs are in binding.json. Described fields and controlled vocabularies are in schema.json. No operational snapshot payloads belong in this repository.

## Daily capture and mirror

Reuse automation 6a98285a53248191a1a1743ec41e3e1c; retain its hourly schedule and all reminder/publication limits. No new AI polling job.

After the normal once-per-Europe/Amsterdam-day reviewed snapshot is saved and read back:
1. Read the configured log by stable Library identity. Parse complete JSON snapshot blocks, preserve source captured_at, version, scope, coverage, evidence links and item identities; do not infer current queue state from source statuses.
2. Compare deterministic snapshot_id (metric_version + "|" + captured_at) against the Airtable summaries. Import missing captures and item observations. observation_id is snapshot_id + "|" + need_id. Paginate all identity lookups; retries must not duplicate records.
3. Summarize only validation_needed items into actionable, held_dependency, needs_preparation and unknown-actionability subsets. Count reconciliation_pending and unknown primary states separately. Sum of the four open subsets must equal validation_needed.
4. Compute request age as (captured_at - requested_at) / 86400 seconds only for validation_needed with a supported clock. Retain verified/lower_bound/unknown. Never use now(), created_at, reminders or generic edits as request time. Age bands describe the measured minimum for lower bounds, not the actual age. Age is not effort or lateness.
5. Source comparison fields supply verified closures and genuinely new arrivals. Leave them blank at baseline. Preserve coverage additions, reclassification and identity changes as comparison notes; never calculate closures by subtracting backlog totals.
6. Historical exception: when measurement_state=closed and source actionability=closed, preserve the source value in notes and map reporting actionability to unknown. This is a reporting normalization only, not a source-log rewrite. All other invalid states or negative/unsupported clocks block that capture and remain explicit errors.
7. Create incoming summary and item rows with is_latest=false. Read all writes back and verify field values, counts and deterministic identities before switching latest flags. Retain previous published snapshot on failure. Recover partial mirrors on the next existing run; never claim a fresh capture from a stale prior snapshot. Flag switching spans calls, so keep the interval short and report/recover interrupted switches.
8. Preserve accepted history. A source correction requires explicit supersession lineage and reason, not silent replacement; if the representation cannot retain that lineage, stop only the affected correction and report privately.
9. No routine Slack posts or extra volunteer requests. Mirror failure is a private measurement failure, not an operational validation failure. First scheduled mirror remains unverified until a later run writes and reads back successfully.

Latest cards and item charts use is_latest=true; history uses every accepted daily summary. The detail grid links to the authoritative review surface. Source captured_at is visible so an old snapshot cannot masquerade as a live queue.

## Warehouse measurements

Once per local day, use a complete read of Warehouse_Inventory_Observations in the production warehouse base. Paginate fully and use field IDs discovered from current schema. Select record_status=current; retain record IDs and the read cutoff. These measures count observation records, not unique goods, stock, throughput, physical discrepancies, or volunteer productivity.

- warehouse_current_records: all records in this population.
- warehouse_missing_observed_at: observed_at blank; do not substitute technical creation time.
- warehouse_missing_location_link: warehouse_location empty. This is field completeness; not-found observations may legitimately lack a location.
- warehouse_unreviewed: stored validation_status equals unreviewed. It is not a count of active validation requests.
- warehouse_approximate_quantity: quantity_precision equals approximate. Approximation is not automatically error.
- warehouse_exact_quantity: quantity_precision equals exact. This is not owner validation or current-stock confirmation.

metric_observation_id = dca-record-completeness/1 + "|" + captured_at + "|" + metric_key. Store value, population_count, definition, source table URL, all population record IDs, matched record IDs, coverage and cutoff. Values are recomputed from live records, never copied forward as fresh. Do not write a partial read as a complete-population snapshot. Mark the newest verified capture latest separately for each metric series.

Intake backlog is deliberately not active: records mix controlled baselines, normal submissions, corrections and a blank status; population and workflow-completion meaning need definition before a reliable backlog count. This does not block the supported measurements above.

## Verification on 17 September 2026

- Read live implementation standard, development/promotion policy, workspace map, private source log, source schemas and complete warehouse observation records.
- Created isolated Dev/Test base; tested source-linked baseline/latest summaries, actionable, held, preparation, unknown-clock, unclassified and historical-closed cases. Test data are real source copies, not synthetic facts.
- Verified source-scoped dashboard elements return the latest summary only, full history separately, and open needs only for actionability charts.
- Production: read back all four summary records, 86 item observations and six warehouse measurements; every imported field matched the reviewed transformation.
- Native Created time and Last modified time implemented. Formula primary remains a documented connector limitation; stable source identities are separate.
- Existing snapshots cover 14–17 September in Europe/Amsterdam. Latest source cutoff 17 September 00:35; importing does not refresh its source assessment.
- Dashboard configuration published and read back; rendered acceptance and final runtime binding are recorded in the PR.
- Routine scheduled refresh must be verified independently after configuration; a successful manual import is not proof of later automation.

## Recovery

Never clear or overwrite the source log, evidence, operational records or existing validation threads. Only the three dedicated derived reporting tables and the new metrics interface are in write scope. A failed import can resume by missing deterministic IDs. Preserve existing snapshot values and source timestamps. If a source snapshot changes under the same identity, flag the mismatch rather than silently rewriting history. Keep prior latest capture visible until the new capture is verified.
