---
paths:
  - "dca-ai/**/*"
  - "skills/legacy/**/*"
---

# Historical material boundary

This rule activates when Claude Code works with files under the matched paths. It governs how opened historical material is treated; it does not prevent the initial read that caused the rule to load.

The `dca-ai/**/*` pattern refers only to the nested `./dca-ai/` legacy redirect directory inside this repository, not to the repository as a whole.

When material under these paths is used:

- treat it as preserved historical material, not current DCA AI capability or authority;
- do not apply or promote it as current behaviour unless the task explicitly asks for history, comparison, migration, or recovery of an earlier design;
- if it conflicts with current authority, keep its historical status explicit and follow the current source;
- place new DCA AI work in the repository-level structure described by `README.md`, not under the nested legacy `dca-ai/` directory.
