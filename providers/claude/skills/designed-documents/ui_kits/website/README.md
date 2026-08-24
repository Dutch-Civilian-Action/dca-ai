# DCA Website — UI kit

A brand-grounded recreation of the **public Dutch Civilian Action website**: the surface where civilians, donors and partners encounter operations and give support.

> **Note on source.** No DCA codebase or Figma file was provided — only the *DCA Brand Guidelines 2026*. This kit is an interpretation built from those guidelines (voice, palette, type, the Need → Action → Delivery → Impact structure), not a pixel recreation of a shipped product. Treat it as a starting point and replace placeholder photos with real operational imagery.

## Files
- `index.html` — interactive shell with header nav + routing (Home → Donate → Report).
- `parts.jsx` — `SiteHeader`, `SiteFooter`, `PhotoBlock`, `Icon` (Lucide helper). Exported to `window`.
- `screens.jsx` — `HomeScreen`, `DonateScreen`, `ReportScreen`. Exported to `window`.

## Screens
- **Home** — hero, traceability band (`Trace`), current appeals (`Progress` + `Card`), transparency stat band on black.
- **Donate** — appeal summary, frequency + amount selector, `Input` fields, "where it goes" trace. Fully interactive.
- **Report** — operational report layout: meta, stats, trace, delivery log table, continuation note.

## How it composes the system
Built entirely from `window.DesignSystem_cf89c3` primitives (`Button`, `Badge`, `Card`, `Eyebrow`, `Stat`, `Input`, `Progress`, `Trace`) over the global tokens in `styles.css`. Icons are **Lucide via CDN** (substituted — the brand defines no icon set).

## Interactions
Header nav routes between screens; "Donate" buttons jump to the donate flow; amount/frequency chips and inputs are live; clicking back returns home.
