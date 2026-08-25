---
document_type: dca_ai_provider_test
status: current-testing
provider: claude
scope: repository-configuration
---

# Claude Repository Configuration Tests

## Purpose

Validate the DCA Claude configuration layer without assuming that behaviour proven in one Claude runtime propagates to another.

Test four distinct questions separately:

1. can Claude access the required source or configuration;
2. does Claude route to the correct source;
3. does Claude interpret the source correctly;
4. is the final user-facing behaviour appropriate.

A pass in Claude Code is not evidence that Claude Tag, Chat, or Cowork use the same configuration mechanism.

## Test 1 — Claude Code project instructions

Start a fresh Claude Code session at the repository root.

Confirm:

- `.claude/CLAUDE.md` is loaded as project instructions;
- it remains the only always-loaded repository instruction file from this experimental layer;
- the session is not preloading `context/current-authority.md`, `context/source-routing.md`, or capability procedures before they are relevant.

Pass condition: the repository briefing is present and detailed routing/governance content is still progressively loaded.

## Test 2 — Path-scoped rules

Work with a file under `providers/` and confirm `provider-boundary.md` becomes active.

Work with a file under `skills/legacy/` and confirm `legacy-material.md` becomes active and the material remains explicitly historical.

Pass condition: scoped rules activate only in their relevant file contexts and do not appear as general session instructions beforehand.

## Test 3 — Repository navigation skill

Ask without naming a path:

> Where is the current DCA authority pointer?

Then ask:

> Where is the Claude Tag access-bundle configuration?

Pass condition: `navigate-dca-ai` is discoverable or invoked appropriately and reaches the direct bounded paths without broad repo-wide search.

## Test 4 — Source-routing skill

Ask:

> Who is our contact at a named DCA partner, and what is the current pickup arrangement with them?

Pass condition:

- contact or relationship facts route to canonical Relationship Data;
- current pickup or logistics facts route to current operational/logistics reality;
- the two fact types are not collapsed into one source;
- broader search occurs only if the routed source is insufficient or the task requires reconciliation.

## Test 5 — Historical conflict

Present or open a historical source that conflicts with a current source.

Pass condition:

- historical status remains visible;
- Claude does not promote the older source merely because it is detailed or easier to retrieve;
- current authority routing is followed;
- a genuine unresolved conflict is preserved rather than silently erased.

## Test 6 — Operational interface

Run a normal Relationship Data retrieval question through the packaged capability.

Pass condition:

- the answer is direct and operational;
- Airtable schema, matching internals, agent names, source-search narration, and reconciliation mechanics remain hidden unless materially needed;
- correct uncertainty is surfaced when relevant.

## Test 7 — Plugin distribution and update behaviour

Install the repository marketplace and DCA plugins in a clean Claude Code environment.

Confirm:

- `dca-core` exposes source-routing and repository-navigation skills;
- `dca-relationship-data` exposes the Relationship Data skill;
- plugin validation passes;
- with explicit plugin versions omitted, a new git commit is recognized as a new plugin version rather than remaining pinned to an older manifest version.

Pass condition: a plugin change can propagate through the intended internal-development update path without manual semantic-version bumps during active testing.

## Test 8 — Claude Tag boundary

In a bounded Claude Tag test channel, verify behaviour independently from Claude Code.

Check:

- whether attached repositories are readable;
- whether enabled `dca-core` and capability plugins/skills are available;
- whether Tag follows `context/source-routing.md` through the packaged DCA Core skill;
- whether `.claude/CLAUDE.md`, `.claude/rules/`, or `.claude/skills/` have any observable effect.

Do not assume repository-native `.claude/` configuration propagates to Tag. Record the observed implementation state either way.

Pass condition: Tag obtains required DCA routing behaviour through its supported configured surfaces, without relying on unproven `.claude/` propagation.

## Test 9 — Latency / unnecessary search

Compare a bounded operational lookup before and after the DCA Core / capability routing configuration.

Record:

- first response latency;
- number and type of source/tool lookups where visible;
- whether unrelated repositories, Drive sources, or broad searches are consulted.

Pass condition: a bounded question reaches its expected source without unnecessary cross-source discovery. Treat latency improvement as an observed runtime result, not as guaranteed by configuration structure alone.
