---
document_type: dca_ai_bounded_mapping_test
status: technical-checks-passed-review-pending
batch: IDENTITY-R01
observed_on: 2026-09-16
---

# IDENTITY-R01 — mapping test and private-evidence replay

The [build record](../../../context/identity-migration-r01.md) states the question, scope, source revisions, results, open gaps and promotion boundary. This directory versions the actual local checks used for that bounded real-data sample. It does not install a production importer or a new relationship model.

## Exact environments

| Role | Workspace | Base |
|---|---|---|
| Isolated test | DCA Dev/Test `wspCZsYbWYC7OXX1l` | `appTpzRmniNpMv35Q` |
| Intended production candidate; not adopted | DCA `wspYnyJ08xBNYOjXw` | `appScO2P8fD8yprCW` |
| Current Relationship Data and workflow source | DCA `wspYnyJ08xBNYOjXw` | `appMdqKYTMnPmVoVu` |
| Earlier Kees person-reference source | DCA Dev/Test `wspCZsYbWYC7OXX1l` | `appMzETiiWf5oev2f` |

The test contains 62 rows across six identity/provenance tables. No synthetic fixtures were loaded. WE Fashion/Anne is the four-object transfer proposal; Paul/Almere, Mark/Apeldoorn, Kees and René are controls. WE Fashion is excluded from Winter new-provider outreach. Existing domain and workflow records remain authoritative at their current scope.

## Observed checks

[observed-results.json](observed-results.json) preserves the result from the original run, including 20 passed checks, six table counts and the four separate acceptance states. It is not updated merely because a later replay succeeds.

- Persistent IDs and source-qualified migration keys survive copying; the 23 selected candidate IDs remain literal values.
- Seven personal/organisation routes remain separate; unknown office, tenure and affiliation are not invented.
- All 102 local linked-record relationships resolve with reciprocal links.
- All 31 full source snapshots match their original source rows and recorded hashes.
- The repeat-import planner proposes zero creates and zero updates for all 62 rows.
- All 54 inspected source rows match the pre-test capture, including all 46 candidate identity/source rows.

Mark's intake match remains proposed/unknown/held. René has no asserted church association. Kees's proposed person-to-Operator link does not grant authority. Signature dates mapped to observation dates remain a proposal; earlier office confirmations are preserved.

## Replay without publishing private data

The private archive and input hashes are identified in [evidence-reference.json](evidence-reference.json). Raw contact values, source payloads, schema descriptions containing private evidence, input manifests and full record crosswalks are intentionally not committed. Repository access does not imply access to that archive. The `.gitignore` is an accidental-add guard, not a replacement for a privacy review.

Use an authorised private copy of the extracted archive outside the checkout. Keep the original archive unchanged. Set the path to its extracted `r01` directory:

```bash
export DCA_R01_EVIDENCE_DIR=/absolute/private/path/to/r01
python3 tests/workflows/identity-migration-r01/prepare_manifest.py
python3 tests/workflows/identity-migration-r01/plan_import.py --phase all
python3 tests/workflows/identity-migration-r01/verify_mapping.py
```

Run without Python optimisation (`-O`), because the check scripts deliberately use assertions. The scripts use the Python standard library and make no network calls. The only packaging change from the retained scripts is explicit private evidence-directory selection; substantive mapping/check logic is unchanged. They write derived manifests, plans, crosswalks and replay results only inside that private directory. The persistent-ID registry must be retained: do not delete it and silently regenerate identities for an existing batch.

This replay consumes saved readbacks. It verifies the retained sample, **not** current live Airtable state, a second live import, or Claude behaviour. `prepare_manifest.py` is specific to this sample and is not a generic production migration tool.

## Live test procedure and safe resumption

For an explicitly authorised rerun, resolve the exact workspace/base and read all six tables and current schema first. Refresh `live_records.json`; never plan new writes against a stale or partial readback. Only the isolated R01 base is an allowed write target. The intended production candidate and source bases remain read-only at this stage.

Run the planner with `--phase scalars` first. Inspect its creates/updates and apply only the authorised operations through a supported Airtable executor, using field IDs and `typecast=false`. Persist returned record IDs. After a complete fresh readback, run `--phase links`, resolving logical migration keys to local R01 record IDs. Read back again and run `--phase all`. A repeated unchanged batch should propose zero operations.

After an error, re-read affected tables before retrying. The original Source Records request hit a payload-size limit with zero records created; smaller batches then succeeded. Record count limits alone do not bound request size. Do not regenerate IDs, guess partial success or replay creates blindly.

No remote-write executor is included in these scripts. The original live writes and their readbacks are retained in the private archive. A future executor must enforce this same base guard, source provenance and review boundary.

## Remaining acceptance

1. Review the bounded mapping and observation-date interpretation without reopening previously confirmed Rotary facts.
2. Repair computed primaries and native timestamps through a supported executor. The current text primaries and formula timestamps are documented gaps, not accepted exceptions.
3. Exercise the actual intended runtime's retrieval and current RW context, including the existing [WE Fashion Claude test](../../providers/claude/relationship-data-agent.md). Do not change its production target to R01 by default.
4. Separately authorise and verify any production promotion. Preserve accepted identities and compatibility references; never promote the whole test base or every control automatically.

The provider-independent [relationship reconciliation test boundary](../relationship-data-reconciliation.md) and the canonical [development/testing/promotion standard](https://github.com/Dutch-Civilian-Action/dca-architecture/blob/985ff937627cae887671f7f2301f1bd48cdc5db0/systems/development-testing-and-promotion.md) continue to govern this work.
