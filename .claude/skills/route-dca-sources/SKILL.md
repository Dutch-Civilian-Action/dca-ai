---
name: route-dca-sources
description: Choose the correct DCA source before answering or acting. Use when a DCA question could be answered from more than one repository, document, system, channel, or runtime source.
---

# Route DCA sources

This is the Claude Code binding for DCA's provider-independent source-routing policy.

## Procedure

1. Read `context/source-routing.md` and apply it.
2. Read `context/current-authority.md` when current authority, source status, or current-vs-historical selection matters.
3. Use the smallest source set that can answer the requested fact or action.
4. If the request spans multiple fact types, route each part separately rather than forcing one source to answer everything.
5. Broaden only under the conditions defined in `context/source-routing.md`.
6. Preserve access gaps, uncertainty, and real source conflicts rather than silently substituting weaker material.

## Claude Code search discipline

Do not start with repo-wide or cross-source search when the routing policy already identifies a bounded source.

When locating files inside this repository, use the `navigate-dca-ai` skill instead of broad searching.

Keep routing and implementation mechanics out of the user-facing answer unless they are needed to explain uncertainty, an access gap, or a required decision.
