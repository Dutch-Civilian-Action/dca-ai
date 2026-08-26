# DCA Logistics Intake plugin

Claude runtime packaging for the bounded DCA Logistics intake capability.

Provider-independent behaviour lives in:

- `../../workflows/capture-logistics-intake.md`
- `../../context/source-routing.md`

This plugin does not define Logistics architecture or Operational Reality. It adapts the current intake workflow to Claude and Airtable.

Current pilot storage:

- Airtable base: `DCA Integrations & Reconciliation`
- `Logistics_Intake_Submissions`
- `Logistics_Intake_Facts`

The plugin should be used with an Airtable identity restricted to the required pilot tables/base and only in bounded operational surfaces such as the Logistics pilot channel.
