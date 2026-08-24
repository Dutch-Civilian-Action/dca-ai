# Claude Skill Implementations

Claude-specific packaging, configuration, or adapters for current DCA skills live here when needed.

Canonical agent, workflow, and skill definitions remain provider-independent elsewhere in the repository wherever practical.

## Current implementations

- `managing-dca-relationship-data/` — Claude runtime implementation of the provider-independent Relationship Data Agent and relationship-data reconciliation workflow, using the canonical Airtable relationship base through MCP.
- `designed-documents/` — Claude-specific designed-document capability.

Do not load or reuse `/skills/legacy/` as current Claude skills. Legacy material may be consulted only as historical reference after its status is made explicit.
