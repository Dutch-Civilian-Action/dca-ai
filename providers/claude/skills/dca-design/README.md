# DCA Design — Claude provider snapshot

Claude-specific versioned snapshot of the DCA visual design system.

`SKILL.md` is the Claude skill entry point. `readme.md` is the design-system guide shipped with the export.

## Snapshot provenance

```
Source: Claude Design — DCA project
Exported: 2026-08-24
Refresh: re-export, re-trim (drop uploads/, Canvas.dc.html, .thumbnail),
         replace folder contents, open a PR.
```

This is a point-in-time export, not a live link. Claude Design remains the design-system working source; nothing here syncs automatically.

## What is in the package

| Path | Contents |
| --- | --- |
| `SKILL.md` | Claude skill entry point (`name: dca-design`) |
| `readme.md` | Full design-system guide shipped with the export |
| `styles.css`, `tokens/` | Stylesheet entry point and design tokens |
| `assets/` | Roboto/Roboto Condensed/Roboto Mono TTFs, DCA logos and marks |
| `components/` | Core, forms, feedback and operational components |
| `guidelines/` | Foundation specimen cards |
| `ui_kits/` | Website and operations example kits |
| `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`, `support.js` | Generated support files |

Excluded from this snapshot: `uploads/`, `Canvas.dc.html`, `.thumbnail`.

## Runtime relationship

This directory is the Claude provider snapshot for the `dca-design` skill. It is not a provider-independent organisational model and does not make repository content organisational authority by itself.

## Org-wide availability

Making this skill available to everyone is a Claude admin action, not a Git action: a workspace Owner uploads the exported skill under **Organization settings → Skills**. Nothing in this repository does that automatically.
