---
name: slidev-rich-media
description: Use when the user asks for Slidev, rich media slides, Markdown decks, web-presentable decks, presentation websites, PDF/PNG/PPTX snapshot exports, or a slide workflow that bridges copy, design, screenshots, motion, and PowerPoint.
---

# Slidev Rich Media

Use this skill in Claude Code to create and export Slidev decks as part of the VideoMaking rich media workflow.

## Role

Slidev is the web-native deck layer:

- Markdown authoring,
- Vue/HTML/CSS rich slides,
- interactive preview,
- PDF/PNG/PPTX snapshot export,
- static site build.

Use the PowerPoint workflow when the user needs editable `.pptx` text, charts, native shapes, or speaker notes. Slidev PPTX export is for visual snapshots, not native editable PowerPoint authoring.

Keep route decisions explicit:

- Slidev route: `slides/slidev/<deck>.md` source, assets in `slides/assets/`, generated outputs in `slides/exports/`.
- PowerPoint route: design specs or approved editable `.pptx` files in `slides/powerpoint/`, authored with the PowerPoint workflow.
- Hybrid route: prototype the story and rich media treatment in Slidev, then rebuild approved slides as editable PowerPoint when the user needs native editability.

## Motion And Video Bridge

Use Slidev as the story/styleframe layer when a presentation may become video:

- Put slide-by-slide copy, visual intent, timing notes, and asset references in the deck or a nearby note.
- Move reusable timing, palette, text payloads, and aspect ratio choices into `segments/presets/` when Remotion will render the final video.
- Treat Slidev animations as preview/presentation behavior. For frame-accurate video output, rebuild the motion in Remotion or another deterministic render path.
- Keep deck assets local under `slides/assets/` or `assets/`; do not depend on hotlinked production media.

For exported snapshots, make the deck deterministic:

- Avoid `Date.now()`, live timers, unseeded random values, remote API calls, and autoplay-only state in slides that will be exported.
- Prefer fixed props, seeded randomness, static screenshots, and local media.
- If an interactive slide has a specific export state, encode it as slide content or split it into separate slides before export.

## Start

Inspect the deck workspace:

```bash
find slides -maxdepth 3 -type f | sort
pnpm run slidev:help
```

Default entry:

```bash
slides/slidev/rich-media-demo.md
```

## Build Flow

1. Gather inputs from `refs/screenshots/`, `copy/`, `design/`, and `assets/`.
2. Create or update a deck under `slides/slidev/`.
3. Use Slidev syntax and web-native layout for rich slides.
4. Preview with `pnpm run slidev:dev` when an interactive server is needed.
5. Export into `slides/exports/`.
6. If native PowerPoint editability is required, write or update a spec in `slides/powerpoint/` and use the PowerPoint workflow.
7. If the deck will feed video production, copy timing/text/design parameters into `segments/presets/`.
8. If the deck reveals reusable patterns, capture them with Darwin.

## Commands

```bash
pnpm run slidev:dev
pnpm run slidev:build
pnpm run slidev:export:pdf
pnpm run slidev:export:pptx
pnpm run slidev:export:png
pnpm run slidev:install-browser
```

Generated exports are ignored by git by default.

## Verification

At minimum:

```bash
pnpm run slidev:help
pnpm run slidev:build
```

For export work:

```bash
pnpm run slidev:export:pdf
pnpm run slidev:export:pptx
pnpm run slidev:export:png
```

If Chromium is missing:

```bash
pnpm run slidev:install-browser
```

## Handoff

Report:

- Slidev source changed,
- export commands run,
- generated export paths,
- any timing/design parameters handed off to `segments/presets/`,
- whether PPTX is Slidev snapshot output or editable PowerPoint output,
- any reusable lesson captured with Darwin.

Use `docs/slidev-rich-media-workflow.md` for the full project contract.
