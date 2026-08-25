---
document_type: dca_ai_provider_configuration
status: current-testing
provider: claude-tag
scope: slack-access-bundles
---

# Claude Tag Access Bundles

## Purpose

Define a small, reusable access-bundle structure for Claude Tag in DCA Slack.

Access bundles are provider configuration. They do not define organisational authority, structure, workflow meaning, or source-routing semantics. They expose only the repositories, credentials, plugins, and standing instructions needed for a bounded operational surface.

## Design rule

Claude should know how to reach DCA's current shared information without requiring operational users to understand the underlying architecture or implementation.

Use:

- `Dutch-Civilian-Action/dca-architecture` for current canonical organisational/system architecture;
- `Dutch-Civilian-Action/dca-ai` for AI authority routing, agents, workflows, governance, provider behaviour, skills, plugins, and tests;
- current DCA shared sources for current organisational and operational reality;
- packaged plugins/skills for reusable Claude behaviour;
- access-bundle instructions only as a small runtime operating contract.

Do not duplicate architecture or detailed capability procedures into Claude Tag instructions.

## Bundle 1 — DCA Core

**Recommended scope:** DCA Slack workspace.

**Repositories:**

- `Dutch-Civilian-Action/dca-ai`
- `Dutch-Civilian-Action/dca-architecture`

Do not grant all organisation repositories by default.

**Credentials:** none.

**Plugins:**

- DCA Core plugin.

The DCA Core plugin packages Claude-facing source-routing and repository-navigation adapters. The provider-independent routing policy remains in `dca-ai/context/source-routing.md`; current authority pointers remain in `dca-ai/context/current-authority.md`.

**Instructions:**

> Use the DCA Core plugin for DCA source routing and repository navigation. Use `dca-ai` for DCA AI implementation and `dca-architecture` for canonical organisational/system architecture. Follow current authority and source-routing pointers rather than choosing sources by search ranking or familiarity. Preserve access gaps and real uncertainty. Keep implementation details internal unless they materially affect the request.

This is the shared DCA routing layer. It does not grant Google Drive, Airtable, or other operational-source access by itself.

## Bundle 2 — DCA Relationship Data Pilot

**Recommended scope:** `#relationships-workflows` and the bounded read pilot in `#logistics`. Keep write/intake behaviour in testing until its provenance and identity path has been validated.

**Inherited:** DCA Core.

**Credentials:**

- Airtable Agent Identity restricted to `2 | DCA Relationships & Workflows` and only the permissions required by the current test stage.

Prefer separate read and write identities later if the Airtable permission model makes that practical.

**Plugins / skills:**

- Airtable tool/plugin layer;
- DCA Relationship Data plugin.

The Airtable plugin provides generic Airtable operations. The DCA Relationship Data plugin provides DCA-specific relationship-data behaviour. Do not duplicate generic Airtable tooling inside the DCA plugin.

**Instructions:**

> Use the DCA Relationship Data plugin for contact, organisation, partner, and relationship questions. Use the canonical relationship records as the first and normally sufficient source for those facts; do not broaden when they already answer the question. For mixed-domain questions, route non-relationship facts through DCA Core rather than letting another domain redefine relationship identity or status. Answer the operational question directly and keep schema, matching, reconciliation, and tool mechanics hidden unless needed to resolve uncertainty. Search before create and preserve the authenticated human actor separately from the Claude/Slack runtime for intake.

**Initial auto-mode allow rules:** none.

## Bundle 3 — DCA Shared Sources

**Recommended scope:** channels that genuinely need current shared Drive material, beginning with `#structural-alignment`.

**Inherited:** DCA Core.

**Credentials:**

- Google Drive Agent Identity with access limited to the DCA shared material required by the intended channels.

Do not attach a broadly privileged personal Drive account to the workspace baseline or DCA Core.

**Instructions:**

> Use current shared DCA sources according to DCA Core source routing and current authority. Treat documents as sources or representations of reality, not automatic truth. Preserve document status, validation state, recency, evidence boundaries, and conflicts. Do not substitute an older document for a current source merely because it is easier to retrieve.

## Bundle 4 — DCA System & Structure

**Recommended scope:** `#structural-alignment` and other explicitly bounded System & Structure channels such as `#struct-system-build` during testing.

**Inherited:** DCA Core. Usually combine with DCA Shared Sources.

**Credentials / repositories:**

- add Airtable only when live system state is actually needed;
- add other GitHub repositories only when the channel has a demonstrated need for them.

**Instructions:**

> For questions about how work currently happens, start from the current DCA Operational Reality available through the shared-source route. Use canonical architecture to interpret that evidence or reason from reality toward requirements; do not use architecture as a substitute for current operational reality. Use the current Structure Method and Reconstruction & Reconciliation Method when relevant. Preserve uncertainty, variation, ownership boundaries, and visibility gaps.

## Bundle 5 — DCA Automation & Build

**Recommended scope:** `#automation-hub` and `#test-automations`.

**Inherited:** DCA Core.

**Credentials / repositories:**

- only the implementation repositories and test systems needed by the channel;
- use test or bounded credentials where available;
- do not expose broad production credentials merely because the channel is called a test channel.

**Instructions:**

> Treat automation as implementation of a sufficiently established requirement, not as the source of organisational truth. Reuse existing DCA agents, workflows, objects, and authority boundaries before creating new ones. Test consequential changes in a bounded environment before production use.

## Channel assignment — initial pilot

| Slack scope | Bundles |
| --- | --- |
| DCA workspace | DCA Core |
| `#relationships-workflows` | DCA Relationship Data Pilot |
| `#logistics` | DCA Relationship Data Pilot — read pilot active; write/intake still under validation |
| `#structural-alignment` | DCA Shared Sources + DCA System & Structure |
| `#struct-system-build` | DCA Shared Sources + DCA System & Structure during S&S testing |
| `#automation-hub` | DCA Automation & Build |
| `#test-automations` | DCA Automation & Build with test/bounded credentials |

## Advanced defaults

Initial recommendation:

- Claude Tag version: New
- Environment: Organization default
- Guests: Restrict
- Channel member edits: Block
- Auto-mode allow rules: none at workspace level
- Auto-join patterns: none during pilot
- Model and effort selection: follow `../model-selection.md`; keep ordinary operational channels on the validated Sonnet baseline and use stronger models only for work that demonstrably requires them.

## Security boundary

A Claude Tag channel grants the channel's Claude identity the configured access, independently of whether each human channel member has equivalent direct access to the underlying system. Therefore every credential or repository attached to a channel must be appropriate for the least-privileged intended member of that channel.

Prefer narrow credentials and bounded channel scopes over broad workspace-wide tool access.
