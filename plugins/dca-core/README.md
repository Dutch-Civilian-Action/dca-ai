# DCA Core Claude Plugin

Claude-facing adapters for DCA's shared AI source-routing and repository-navigation behaviour.

This plugin does not define organisational authority or source-routing semantics. Those remain in the provider-independent repository sources:

- `context/source-routing.md`
- `context/current-authority.md`

The plugin currently packages:

- `route-dca-sources` — applies the provider-independent routing policy in Claude runtimes;
- `navigate-dca-ai` — navigates the attached `dca-ai` repository without broad searching.

Use this plugin as a reusable Claude distribution surface, including Claude Tag where enabled through the relevant access bundle. Repository-native `.claude/` configuration remains a separate Claude Code mechanism.
