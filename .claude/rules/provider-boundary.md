---
paths:
  - "providers/**/*"
  - "plugins/**/*"
  - ".claude-plugin/**/*"
---

# Provider implementation boundary

- Provider/runtime files implement provider-independent DCA behaviour; they do not define organisational authority or organisational structure.
- Keep agents and workflows provider-independent wherever practical. Put runtime-specific bindings, prompts, credentials, packaging, and tool behaviour under the relevant provider/plugin layer.
- Treat current runtime roles as implementation state, not permanent architecture.
- Access bundles control what a runtime can reach and the small standing contract it receives; they are not organisational authority.
- Do not embed secrets or credentials in repository files.
- Where packaged plugin skills mirror provider-source skills during testing, keep them aligned until the duplication is deliberately consolidated.