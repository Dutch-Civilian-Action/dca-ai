---
document_type: dca_ai_provider_configuration
status: current-testing
provider: claude-tag
scope: slack-access-bundles
---

# Claude Tag Access Bundles

## Purpose

Define a small, reusable access-bundle structure for Claude Tag in DCA Slack.

Access bundles are provider configuration. They do not define organisational authority, structure, or workflow meaning. They expose only the context, credentials, repositories, plugins, and standing instructions needed for a bounded operational surface.

## Design rule

Claude should know the DCA architecture, but operational users should not have to know or speak in architectural language.

Use:

- `Dutch-Civilian-Action/dca-architecture` for current canonical organisational/system architecture;
- `Dutch-Civilian-Action/dca-ai` for AI authority routing, agents, workflows, governance, provider behaviour, skills, and tests;
- current DCA shared sources for current organisational and operational reality;
- access-bundle instructions only as a small runtime operating contract.

Do not duplicate the architecture into Claude Tag instructions.

## Bundle 1 — DCA Core

**Recommended scope:** DCA Slack workspace.

**Repositories:**

- `Dutch-Civilian-Action/dca-ai`
- `Dutch-Civilian-Action/dca-architecture`

Do not grant all organisation repositories by default.

**Credentials:** none.

**Plugins:** none required at baseline. Add the DCA AI plugin when the current skills are packaged for organisation use.

**Instructions:**

> Use `Dutch-Civilian-Action/dca-ai` as the routing source for DCA AI authority context, agents, workflows, governance, tests, skills, and provider behaviour, and use `Dutch-Civilian-Action/dca-architecture` for current canonical organisational and system architecture. Follow `context/current-authority.md` before treating any source as authority. Use current shared DCA sources for claims about organisational and operational reality. Do not treat Slack memory, prompts, technical schemas, implementation state, or historical documents as organisational truth by themselves. With operational users, speak in ordinary work language: ask about the work and translate it into DCA system/structure concepts internally. Reuse existing agents and workflows rather than inventing new structures or meanings. Keep implementation details hidden unless needed to explain uncertainty or obtain a decision. Preserve uncertainty, conflicting evidence, role and ownership boundaries, and the distinction between current reality and proposals.

This is the shared DCA communication and authority-routing layer.

## Bundle 2 — DCA Relationship Data Pilot

**Recommended scope:** `#relationships-workflows` and the bounded read pilot in `#logistics`. Keep write/intake behaviour in testing until its provenance and identity path has been validated.

**Inherited:** DCA Core.

**Credentials:**

- Airtable Agent Identity restricted to `2 | DCA Relationships & Workflows` and only the permissions required by the current test stage.

Prefer separate read and write identities later if the Airtable permission model makes that practical.

**Plugins / skills:**

- Airtable tool/plugin layer;
- DCA Relationship Data skill/plugin.

The Airtable plugin provides generic Airtable operations. The DCA Relationship Data plugin provides DCA-specific meaning, routing, identity, reconciliation, and user-facing behaviour. Do not duplicate generic Airtable tooling inside the DCA plugin.

**Instructions:**

> For ordinary contact, organisation, partner, and relationship questions, use the canonical relationship data in `2 | DCA Relationships & Workflows` as the first and normally sufficient source. Do not search Slack, Drive, contracts, partner lists, shared memory, historical documents, or other sources when the canonical relationship records already answer that part of the question. When one question combines relationship information with another operational domain, split it by fact type: use canonical relationship data for contact identity, organisation identity, partner/relationship status, primary-contact status, and stored partner/support context; use the relevant current operational source only for operational facts such as logistics splits, pickup arrangements, shipment rules, or current workflow responsibilities. Do not let logistics documents or other operational sources redefine contact or partner identity when canonical relationship data already provides those facts. If the sources genuinely conflict, preserve the conflict instead of collapsing them. Follow the current Relationship Data Agent and `reconcile-relationship-data` workflow from `dca-ai`. Keep Airtable schema, `Contact_Intake`, matching mechanics, tools, searches, and review internals hidden from operational users unless needed to resolve uncertainty. Answer the operational question directly. Search before create. Do not merge by name alone or infer partner status from operational context. For human intake, resolve the initiating Slack actor to the internal Operator by stable Slack user ID where available; record the human operator separately from the Claude/Slack runtime and preserve the original submission as source evidence.

**Initial auto-mode allow rules:** none.

## Bundle 3 — DCA Shared Sources

**Recommended scope:** channels that genuinely need current shared Drive material, beginning with `#structural-alignment`.

**Inherited:** DCA Core.

**Credentials:**

- Google Drive Agent Identity with access limited to the DCA shared material required by the intended channels.

Do not attach a broadly privileged personal Drive account to the workspace baseline.

**Instructions:**

> Use current shared DCA sources according to the authority routing in `dca-ai` and `dca-architecture`. Treat documents as sources or representations of reality, not automatic truth. Preserve document status, validation state, recency, evidence boundaries, and conflicts. Do not substitute an older document for a current source merely because it is easier to retrieve.

## Bundle 4 — DCA System & Structure

**Recommended scope:** `#structural-alignment` and other explicitly bounded System & Structure channels.

**Inherited:** DCA Core. Usually combine with DCA Shared Sources.

**Credentials / repositories:**

- add Airtable only when live system state is actually needed;
- add other GitHub repositories only when the channel has a demonstrated need for them.

**Instructions:**

> Ground System & Structure work in current organisational and operational reality. For questions about how work currently happens — including current workflows, person-dependencies, bottlenecks, responsibilities in practice, and operational consequences — consult the current DCA Operational Reality first. Use canonical architecture to interpret or contextualise that evidence, or to reason from reality toward requirements; do not use architecture as a substitute for current operational reality. Distinguish current reality from proposed, planned, desired, historical, or inferred states. Preserve uncertainty, variation, exceptions, conflicting evidence, ownership boundaries, and visibility gaps. Use the current Structure Method for reality-to-requirement reasoning and the Reconstruction & Reconciliation Method for distributed or conflicting evidence. Do not turn technical implementation, Slack discussion, or artifact creation into organisational truth without the relevant authority and validation boundary.

## Bundle 5 — DCA Automation & Build

**Recommended scope:** `#automation-hub` and `#test-automations`.

**Inherited:** DCA Core.

**Credentials / repositories:**

- only the implementation repositories and test systems needed by the channel;
- use test or bounded credentials where available;
- do not expose broad production credentials merely because the channel is called a test channel.

**Instructions:**

> Treat automation as implementation of a sufficiently established operational requirement, not as the source of organisational truth. Reuse existing DCA agents, workflows, objects, and authority boundaries before creating new ones. Test consequential changes in a bounded environment before production use. Keep test state distinguishable from current production reality.

## Channel assignment — initial pilot

| Slack scope | Bundles |
| --- | --- |
| DCA workspace | DCA Core |
| `#relationships-workflows` | DCA Relationship Data Pilot |
| `#logistics` | DCA Relationship Data Pilot — read pilot active; write/intake still under validation |
| `#structural-alignment` | DCA Shared Sources + DCA System & Structure |
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
- Default model: use the current Sonnet-class model for ordinary operational channels; use the current Opus-class model only where deeper structural reasoning materially justifies it.

## Security boundary

A Claude Tag channel grants the channel's Claude identity the configured access, independently of whether each human channel member has equivalent direct access to the underlying system. Therefore every credential or repository attached to a channel must be appropriate for the least-privileged intended member of that channel.

Prefer narrow credentials and bounded channel scopes over broad workspace-wide tool access.
