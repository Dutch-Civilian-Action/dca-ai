# DCA Schema Guard

Airtable Interface Extension for auditing DCA Airtable schema against the current DCA Airtable Implementation Standard.

## Runtime scope

Airtable Interface Extensions are evaluated in the table/page context exposed by the interface. DCA Schema Guard therefore operates as a **table-level guard** in v0.1. The UI must show the current audited table/context explicitly.

Cross-table or base-wide reconciliation is a separate capability and must not be implied by this extension.

## Boundary

Schema Guard enforces established Airtable implementation rules. It does not define DCA organisational architecture, invent canonical objects, or decide that contextual information belongs in a shared CRM structure.

The architecture remains authoritative outside this implementation. The machine-readable rules in this directory contain only enforceable Airtable conventions and explicit configuration.

## v0.1 behaviour

- **Audit** — scans the current Airtable table context and reports implementation drift.
- **Fix safe** — applies only explicitly configured safe changes and re-audits after execution.
- **Plan** — shows review-required changes. When Schema Guard can define an exact executable change, Plan exposes **Approve & apply** rather than leaving a manual checklist.

For an approval-executable change, Schema Guard must:

1. state the exact proposed change and relevant risk;
2. wait for explicit approval;
3. re-check current state and collisions immediately before execution;
4. apply only that approved change;
5. re-audit the table and report the result.

Mechanical table/field rename candidates are the first approval-executable action in v0.1. An approval authorizes only the exact proposed rename. Unsupported migrations remain review-only.

v0.1 deliberately does not auto-change populated field types, primary fields, formulas, linked-record targets/cardinality, table splits/merges, or contextual/organisational structures without an exact migration definition.

Review-required does not mean that a human must manually perform the eventual Airtable edit. A controlled migration may execute an exact approved change where the Airtable runtime/API supports it. The distinction is authorization and safety, not manual versus automated execution.

## Initial rules enforced

- Tables use `Title_Case` with underscores and no spaces.
- Fields use lowercase `snake_case`.
- Maintained tables and fields require descriptions.
- Primary field should be a formula unless an explicitly configured exception exists.
- Exact canonical field-name mappings are checked for known semantic types such as `email`, `phone`, `website`, `notes`, `validation_status`, `confirmation_status`, `created_at`, and `last_modified`.
- Type mismatches are reported and require an exact migration definition before execution.
- Known external-source/reconciliation fields are treated as evidence surfaces; Schema Guard does not infer last-write-wins behaviour or overwrite policy.
- Communication/language requirements are checked only where a table is explicitly configured as communication-related. v0.1 does not infer organisational semantics from field names alone.

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
