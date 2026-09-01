# Claude Skill Implementations

Claude-specific packaging, configuration, or adapters for current DCA skills live here when needed.

Canonical agent, workflow, and skill definitions remain provider-independent elsewhere in the repository wherever practical.

## Current implementations

- `managing-dca-relationship-data/` — Claude runtime implementation of the provider-independent Relationship Data Agent and relationship-data reconciliation workflow, using the canonical Airtable relationship base through MCP.
- `dca-design/` — versioned Claude provider snapshot of the DCA visual design system exported from the Claude Design working source.
- `dca-document-authoring/` — Claude runtime implementation of the provider-independent `dca-document-authoring` capability, using Claude's native document capabilities and `dca-design` where visual treatment is required.
- `dca-output-routing/` — Claude runtime adapter that chooses the correct output family and native destination before document, presentation, spreadsheet, web-artifact, interface/application, visual, or data-export construction begins.

Do not load or reuse `/skills/legacy/` as current Claude skills. Legacy material may be consulted only as historical reference after its status is made explicit.
