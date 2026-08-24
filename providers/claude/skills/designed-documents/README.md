# Designed Documents

Claude-specific skill location for DCA designed-document generation.

The exported skill package is now in this directory. `SKILL.md` is the skill
entry point; `SKILL-README.md` is the design-system guide that ships with the
export.

## Snapshot provenance

```
Source: Claude Design — DCA project
Exported: 2026-08-24
Refresh: re-export, re-trim (drop uploads/, Canvas.dc.html, .thumbnail),
         replace folder contents, open a PR.
```

This is a point-in-time export, not a live link. Claude Design remains the
source of truth; nothing here syncs automatically.

## What is in the package

| Path | Contents |
| --- | --- |
| `SKILL.md` | Skill entry point (frontmatter declares `name: dca-design`) |
| `SKILL-README.md` | Full design-system guide shipped with the export |
| `styles.css`, `tokens/` | Single stylesheet entry point and all design tokens |
| `assets/` | Roboto/Roboto Condensed/Roboto Mono TTFs, DCA logos and marks |
| `components/` | core, forms, feedback, operational — `.jsx` / `.d.ts` / `.prompt.md` each |
| `guidelines/` | Foundation specimen cards (brand, colour, spacing, type) |
| `ui_kits/` | `website/` (public site) and `operations/` (internal console) |
| `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`, `support.js` | Generated — do not edit |

Excluded from the export: `uploads/` (19 MB of source .docx files and raw
logos), `Canvas.dc.html`, `.thumbnail`. Trimmed size 1.6 MB.

## Reference document

- [DCA Design — Output Instructions](https://docs.google.com/document/d/13orvxiPek5co_buFvYRztp15IxSrfBSvKzAuVDnyQuo/edit?usp=drivesdk)

The reference document contains the current DCA design-output instructions, including the reusable-pattern / first-build distinction and the Claude Chat / Claude Code skill setup guidance.

## Org-wide availability

Making this skill available to everyone is a Claude admin action, not a Git
action: a workspace Owner uploads the skill once under **Organization settings
→ Skills**. Nothing in this repository does that automatically.
