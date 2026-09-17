# Airtable Omni

Provider/runtime-specific implementation notes for DCA AI workflows executed inside Airtable Omni.

Airtable Omni may be used where direct access to current Airtable system state makes it useful for bounded testing, inspection, or comparison.

It is not the current primary organisation-facing conversational runtime for DCA relationship data.

Files in this directory must implement provider-independent DCA workflows and authority rules. They must not turn the current Airtable schema, fields, or Omni behaviour into organisational architecture.

Retained implementation:

- `relationship-data-agent.md` — retained Airtable Omni test/reference implementation of the Relationship Data Agent and `reconcile-relationship-data` workflow against `2 | DCA Relationships & Workflows`.
- [Newsletter intake build](newsletter-intake-build.md) — small test/promotion plan and copyable builder prompt; reuses existing production fields and adds only a review view, not a subscription integration.

The current operational implementation target for relationship-data intake and retrieval is Claude; see `../claude/` and `../runtime-selection.md`.
