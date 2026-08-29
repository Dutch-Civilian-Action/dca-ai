# DCA Schema Guard

Airtable Interface Extension for auditing DCA Airtable schema against the current DCA Airtable Implementation Standard.

## Boundary

Schema Guard enforces established Airtable implementation rules. It does not define DCA organisational architecture, invent canonical objects, or decide that contextual information belongs in a shared CRM structure.

The architecture remains authoritative outside this implementation. The machine-readable rules in this directory contain only enforceable Airtable conventions and explicit configuration.

## v0.1 behaviour

- **Audit** — scans tables and fields and reports implementation drift.
- **Fix safe** — applies only deterministic mechanical renames when the runtime exposes the required schema mutation method and no collision exists.
- **Plan** — shows review-required changes without applying them.

v0.1 deliberately does not auto-change populated field types, primary fields, formulas, linked-record targets/cardinality, table splits/merges, or contextual/organisational structures.

## Initial rules enforced

- Tables use `Title_Case` with underscores and no spaces.
- Fields use lowercase `snake_case`.
- Maintained tables and fields require descriptions.
- Primary field should be a formula unless an explicitly configured exception exists.
- Exact canonical field-name mappings are checked for known semantic types such as `email`, `phone`, `website`, `notes`, `validation_status`, `confirmation_status`, `created_at`, and `last_modified`.
- Type mismatches are reported, never auto-fixed.
- Known external-source/reconciliation fields are treated as evidence surfaces; Schema Guard does not infer last-write-wins behaviour or overwrite policy.
- Communication/language requirements are exposed as advisory checks only where the table is explicitly configured as communication-related. v0.1 does not infer organisational semantics from field names alone.

## Source of truth

Human standard: **DCA Airtable Implementation Standard** in Google Drive.

Architecture boundary: `Dutch-Civilian-Action/dca-architecture`, especially the Shared System structural rules.

## Local development

This source is compatible with Airtable's current Interface Extensions template using `@airtable/blocks` with the `interface-alpha` dist tag.

From the local extension directory:

```powershell
npm install
block run
```

The Airtable-created `.block/remote.json` is environment-specific and should remain local; do not commit access tokens or local Airtable credentials.
