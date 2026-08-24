# Airtable Omni

Provider/runtime-specific implementation notes for DCA AI workflows executed inside Airtable Omni.

Airtable Omni may be used where direct access to current Airtable system state makes it a useful testing or operational runtime.

Files in this directory must implement provider-independent DCA workflows and authority rules. They must not turn the current Airtable schema, fields, or Omni behaviour into organisational architecture.

Current implementation:

- `relationship-data-agent.md` — current-testing implementation of the Relationship Data Agent and `reconcile-relationship-data` workflow against `2 | DCA Relationships & Workflows`.
