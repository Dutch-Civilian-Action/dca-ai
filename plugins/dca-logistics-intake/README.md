# DCA Logistics Intake plugin

Claude runtime packaging for the bounded DCA Logistics intake capability.

Provider-independent behaviour lives in:

- `../../workflows/capture-logistics-intake.md`
- `../../context/source-routing.md`

This plugin does not define Logistics architecture, Operational Reality, final contact-route structures, or final relationship ownership. It adapts the current reconstruction-first intake workflow to Claude and Airtable.

Current pilot storage:

- Airtable base: `DCA Integrations & Reconciliation`
- `Logistics_Intake_Submissions`
- `Logistics_Intake_Facts`
- `Logistics_Intake_Operational_References`

During this pilot, new mixed Logistics-cycle evidence stays in the Integrations staging base. Canonical Relationship Data may be read for identity lookup/reconciliation context, but mixed Logistics intake does not directly mutate canonical relationship records before reconstruction establishes the correct structure.

The plugin should be used with an Airtable identity restricted to the required pilot tables/base and only in bounded operational surfaces such as the Logistics pilot channel.
