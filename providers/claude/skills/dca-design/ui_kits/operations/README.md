# DCA Operations — UI kit

A brand-grounded recreation of an **internal DCA operations / logistics console** — the working surface where the team tracks operational reality (the "shared spine" the brand guidelines describe) before it becomes public reporting.

> **Note on source.** No DCA codebase or Figma file was provided — only the *DCA Brand Guidelines 2026*. This is an interpretation of how DCA's internal operational tooling could look using the brand system, not a recreation of a shipped product.

## Files
- `index.html` — single interactive console (self-contained; loads the DS bundle + Lucide).

## What it shows
- Dark sidebar nav (Operations, Deliveries, Appeals, Finance, Reports).
- Top bar with summary actions.
- Operational summary stats (`Stat` in `Card`).
- **Operations register** table — ref, operation, domain, status (`Badge`), cost.
- **Traceable detail panel** — click any row to load its `Trace` (Need → Action → Delivery → Impact), funding and report link.

## How it composes the system
Uses `window.DesignSystem_cf89c3` primitives (`Badge`, `Stat`, `Trace`, `Progress`, `Button`, `Card`) over the global tokens. Mono numerals (Roboto Mono) carry refs and figures, reinforcing concrete, traceable data. Icons are **Lucide via CDN** (substituted).

## Interactions
Clicking an operation row updates the detail panel live; sidebar items switch the active section.
