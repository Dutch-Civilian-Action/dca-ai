---
name: dca-design
description: Use this skill to generate well-branded interfaces and assets for Dutch Civilian Action (DCA), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the readme.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

**Brand:** Dutch Civilian Action — civilian humanitarian logistics for Ukraine. Every design communicates operational reality through the lens of **Need → Action → Delivery → Impact**. Voice is calm, grounded, human, direct, specific. No emoji; no "changes lives" framing. Use real numbers, locations, timelines.

**Foundations:** `styles.css` is the single stylesheet to link (pulls in all tokens and webfonts). All visual properties are CSS custom properties.

**Type:** Roboto Condensed (Black/ExtraBold for headings, Regular for body). Roboto Mono for operational figures, codes, timestamps.

**Colour:** DCA Blue `#1863B5` · Yellow `#FBD149` · Orange `#FF813D` · Black `#010000`. Supporting: Soft Peach `#FFE3D4`, Light Grey Blue `#E0EFEE`. Operational status: need (orange), planned (grey), progress (blue), delivered (green), impact (yellow).

**Components** (`window.DesignSystem_cf89c3`): `Button`, `Badge`, `Card`, `Eyebrow`, `Stat`, `Input`, `Progress`, `Trace`. Each has a `.prompt.md` — read it for usage examples and prop details.

**UI kits:** `ui_kits/website/` (public site + donate flow + report) and `ui_kits/operations/` (internal logistics console).

**Assets:** logos in `assets/logos/`. No brand icon set — use Lucide via CDN (`unpkg.com/lucide`).

## When building static artifacts outside this project

Copy these to your working directory so fonts and tokens resolve:
- `styles.css` + all of `tokens/`
- `assets/fonts/` (Roboto Condensed, Roboto, Roboto Mono TTFs)
- Any logo files you reference from `assets/logos/`
- `_ds_bundle.js` if you need React components

## Key rules from the brand guidelines

1. Structure copy as **Need → Action → Delivery → Impact** whenever possible.
2. Use real numbers, locations, timelines — specificity builds trust.
3. Prefer: "Fuel funding supported evacuation transport for the past 7 days." Avoid: "Your donation changes lives."
4. Lead social/campaign content with a real operational fact (Presence) before any call to action.
5. All imagery descriptions follow the **Alt Text Rule**: physical reality only ("A warehouse with palletised cargo"), never emotional framing.
6. No emoji, no decorative gradients, no purple/blue hero washes, no rounded-corner coloured-left-border cards.
7. Motion: calm, no bounce. Durations 120–320ms. Always respect `prefers-reduced-motion`.
