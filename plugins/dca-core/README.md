# DCA Core Claude Plugin

Claude-facing adapters for DCA's shared AI source-routing, repository-navigation, and cross-domain object-boundary behaviour.

This plugin does not define organisational authority, source-routing semantics, or organisational object meaning. Those remain in provider-independent/canonical sources:

- `context/source-routing.md`
- `context/current-authority.md`
- `Dutch-Civilian-Action/dca-architecture/organisation/shared-foundations/shared-object-boundaries.md`

The plugin currently packages:

- `route-dca-sources` — applies the provider-independent routing policy in Claude runtimes;
- `navigate-dca-ai` — navigates the attached `dca-ai` repository without broad searching;
- `preserve-dca-object-boundaries` — applies DCA's organisation-wide distinctions between people, organisations, locations, contact routes, operational functions, relationships, and operational assertions/states when evidence mixes them together.

Use this plugin as a reusable Claude distribution surface, including Claude Tag where enabled through the relevant access bundle. Repository-native `.claude/` configuration remains a separate Claude Code mechanism.
