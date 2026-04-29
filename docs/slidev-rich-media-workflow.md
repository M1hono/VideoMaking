# Slidev Rich Media Workflow

Use Slidev when a presentation should behave like a rich media artifact: Markdown-authored, web-previewable, component-friendly, and exportable to PDF, PNG, PPTX snapshots, or a static site.

Slidev complements the existing video and PowerPoint workflow:

- Slidev is best for fast rich-media decks, interactive demos, web-native slides, and exportable presentation snapshots.
- Remotion is best for deterministic frame-accurate video.
- The PowerPoint workflow is best for editable `.pptx` decks with native PowerPoint text, charts, shapes, and speaker notes.

## Use When

- The user asks for Slidev, Markdown slides, a rich media deck, presentation website, lecture/demo deck, or HTML/CSS/Vue-powered slides.
- The user asks for presentation exports to PDF, PNG, or PPTX snapshots.
- A video project needs a story/styleframe deck before Remotion implementation.
- A PowerPoint project needs a visual prototype before native editable `.pptx` authoring.

## Folder Contract

- `slides/slidev/`: Slidev markdown deck sources.
- `slides/assets/`: deck-specific assets that are safe to commit.
- `slides/powerpoint/`: editable PowerPoint specs or intentionally committed final `.pptx` files.
- `slides/exports/`: generated Slidev exports. Ignored by git by default.

The default Slidev entry is `slides/slidev/rich-media-demo.md`.

## Commands

Preview:

```bash
pnpm run slidev:dev
```

Build a static web deck:

```bash
pnpm run slidev:build
```

Export:

```bash
pnpm run slidev:export:pdf
pnpm run slidev:export:pptx
pnpm run slidev:export:png
```

Install or refresh Chromium for export:

```bash
pnpm run slidev:install-browser
```

## PowerPoint Positioning

Slidev can export `.pptx`, but this route is for visual slide snapshots. Do not treat Slidev PPTX exports as editable PowerPoint source.

Use the PowerPoint skill when the requested deliverable needs:

- editable text boxes,
- native charts,
- native PowerPoint shapes,
- speaker notes,
- client-editable `.pptx`,
- strict PowerPoint design fidelity.

Use Slidev when the requested deliverable needs:

- web-native interaction,
- component demos,
- rich HTML/CSS/Vue slides,
- fast markdown iteration,
- PDF/PNG/PPTX snapshot exports,
- static hosting.

## Production Loop

1. Gather screenshot, copy, design, and asset inputs:
   - `refs/screenshots/`
   - `copy/`
   - `design/`
   - `assets/`
2. Create or update a Slidev source in `slides/slidev/`.
3. Preview with `pnpm run slidev:dev`.
4. Export PDF/PPTX/PNG/static site into `slides/exports/`.
5. If the deck needs editable PowerPoint, convert the approved design into the PowerPoint workflow instead of relying on Slidev's PPTX export.
6. If the deck becomes video, copy reusable timing, palette, type, copy, and aspect ratio parameters into `segments/presets/`.
7. Capture reusable lessons with `pnpm run darwin:capture` when the deck reveals a new pattern.

## Determinism Rules

For exportable decks:

- Avoid live timers, current dates, unseeded random values, remote API calls, and hotlinked production media.
- Use fixed slide props, local assets, seeded randomness, and explicit export states.
- Split interactive states into separate slides when those states must appear in PDF/PNG/PPTX output.

## Verification

Run:

```bash
pnpm run slidev:help
pnpm run slidev:build
pnpm run slidev:export:pdf
pnpm run slidev:export:pptx
pnpm run slidev:export:png
pnpm run darwin:score -- docs/slidev-rich-media-workflow.md
```

Report whether export worked and whether generated files stayed under `slides/exports/`.

## Sources

- Slidev guide: https://sli.dev/guide/
- Slidev export docs: https://sli.dev/guide/exporting
