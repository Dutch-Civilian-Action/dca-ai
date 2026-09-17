# Verification record — 17 September 2026

- Source log read completely (1,395 lines), four JSON snapshots parsed and ordered by capture time.
- Source timestamps remain evidence cutoffs, displayed in Europe/Amsterdam.
- Live warehouse source enumerated completely with no remaining cursor; record-count, blank-field and precision classifications preserve source record IDs.
- Isolated development base: appXI5DFgnCbWzbvz; production: appZ1Fv0YtZPbBbWa.
- All imported field values were compared to readback: four summary records, 86 item observations and six warehouse measures.
- Historical invalid actionability on two closed items was preserved in notes and normalized only in the reporting projection; measurement_state was retained.
- Published elements were inspected through source reads: latest summary 1 row; history 4 rows; open actionability/age charts 18 rows; current detail 20 rows; warehouse chart and definition table 6 rows.
- Browser rendered the production counts and actionability/age charts. Selecting unknown state returned two detail rows; Reset restored all 20 current rows.
- Final layout places counts, source cutoff and history first. Non-additive numeric grid summaries use maximum or supported-age count, not sums across snapshots or overlapping populations.
- Final recommended page: https://airtable.com/appZ1Fv0YtZPbBbWa/pagkoCY8BAabcX1zK. Earlier same-task page pagOz6PbRt8mLWNc4 is retained: automatic approval review rejected deleting it. Publication was allowed after verifying both pages remained; no deletion was retried. Use the final recommended page.
- Existing automation identity, hourly schedule, timezone and enabled status are preserved. The additive daily mirror/warehouse-capture opt-in was saved and read back. The specification is loaded only when daily capture or recovery is due.
- No extra recurring task, notification audience, volunteer form, operational source mutation or access change was introduced.
- First subsequent scheduled mirror remains unverified; do not treat manual import/configuration as proof of scheduled execution.
- Formula-primary limitation remains recorded in schema descriptions and binding.json. A supported later migration needs its own dependency check.

- Visual QA caught dateTime history sorted by clock time; added deterministic Europe/Amsterdam capture_day formula and used it on the corrected page's history charts. Readback: 14 Sep=20, 15 Sep=20, 16 Sep=18, 17 Sep=18. Original source timestamps remain unchanged.
