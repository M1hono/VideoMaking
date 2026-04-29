# Slides Workspace

This folder is for rich-media presentations and PowerPoint-oriented deliverables.

## Folders

- `slidev/`: Slidev markdown decks, Vue/HTML-friendly rich media slides, and interactive presentation sources.
- `assets/`: deck-specific media assets that are safe to commit.
- `powerpoint/`: notes, specs, and intentionally committed editable `.pptx` deliverables.
- `exports/`: generated Slidev PDF, PNG, PPTX, and static site output. Ignored by git by default.

## Default Deck

The default demo deck is:

```bash
slides/slidev/rich-media-demo.md
```

Preview:

```bash
pnpm run slidev:dev
```

Export:

```bash
pnpm run slidev:export:pdf
pnpm run slidev:export:pptx
pnpm run slidev:export:png
pnpm run slidev:build
```

If export cannot find Chromium:

```bash
pnpm run slidev:install-browser
```

## PowerPoint Route

Slidev's PPTX export is useful for sharing visual slide snapshots, but the exported slide content is image-based. For editable PowerPoint design and final `.pptx` authoring, use the PowerPoint workflow and keep specs or final approved decks under `slides/powerpoint/`.
