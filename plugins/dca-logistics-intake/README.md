# DCA Logistics Intake plugin

Claude runtime packaging for the bounded DCA Logistics intake capability.

Provider-independent behaviour lives in:

- `../../workflows/capture-logistics-intake.md`
- `../../context/source-routing.md`

This plugin does not define Logistics architecture, Operational Reality, final contact-route structures, or final relationship ownership. It adapts the current reconstruction-first intake workflow to Claude and Airtable.

Current pilot storage:

- Airtable base: `DCA Evidence & Reconciliation` (production workspace `DCA`; see `../../context/airtable-workspace-map.md` for its recorded base ID and to confirm this identity — do not resolve it by name search)
- `Logistics_Intake_Submissions`
- `Logistics_Intake_Facts`
- `Logistics_Intake_Operational_References`

`DCA Evidence & Reconciliation` is bounded staging only. It is not, and must not be described or treated as, the canonical operational Logistics base — that is the separate `DCA Warehouse & Logistics` production base, which this plugin does not currently target. Never select a `DCA Dev/Test` workspace base (for example `3 | DCA Logistics`) merely because its name resembles a production base.

During this pilot, new mixed Logistics-cycle evidence stays in the Evidence staging base. Canonical Relationship Data may be read for identity lookup/reconciliation context, but mixed Logistics intake does not directly mutate canonical relationship records before reconstruction establishes the correct structure.

`controlled_test` records whether the intake capability is being tested or observed. `synthetic_test_data` separately records whether the submitted content itself is fictional. Genuine evidence captured during a controlled run remains operational evidence; synthetic fixtures are excluded from operational matching and removed from live staging by exact record ID after audit.

The plugin should be used with an Airtable identity restricted at the base level to `DCA Evidence & Reconciliation`, and only in bounded operational surfaces such as the Logistics pilot channel. The current Airtable implementation cannot restrict that identity to the three pilot tables specifically; writing only to those tables is a procedural rule this plugin/skill must follow, not a credential-level restriction, and must be verified by checking actual writes rather than assumed from the credential.
