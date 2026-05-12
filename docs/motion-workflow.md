# Motion Workflow

This repository is organized around a simple loop: collect inputs, build reusable motion pieces, render segments, polish outputs, then promote final deliverables.

## Directory Map

- `assets/raw/`: unprocessed imports and one-off source drops.
- `assets/images/`, `assets/video/`, `assets/audio/`, `assets/fonts/`, `assets/svg/`, `assets/lottie/`, `assets/rive/`, `assets/3d/`, `assets/data/`, `assets/brand/`: curated reusable assets.
- `refs/images/`, `refs/videos/`, `refs/notes/`, `refs/facts/`, `refs/brand/`: visual references, links, product facts, brand specs, design notes, and inspiration.
- `refs/style/`: source notes for text style, voice, tone, public writing references, and permission/licensing observations.
- `refs/screenshots/`: flat local screenshot drop zone for AI visual review. Image files here are ignored by git by default.
- `copy/briefs/`, `copy/messaging/`, `copy/scripts/`, `copy/storyboards/`, `copy/captions/`, `copy/voiceover/`, `copy/styles/`, `copy/prompts/`, `copy/revisions/`: copywriting, style profiles, scripts, captions, VO, and story structure.
- `design/briefs/`, `design/boards/`, `design/styleframes/`, `design/layouts/`, `design/prototypes/`, `design/tokens/`, `design/reviews/`: design direction, visual proofs, layout rules, tokens, and reviews.
- `slides/slidev/`, `slides/assets/`, `slides/powerpoint/`, `slides/exports/`: rich-media presentation sources, deck assets, editable PowerPoint specs/finals, and generated Slidev exports.
- `snippets/remotion/`, `snippets/react/`, `snippets/gsap/`, `snippets/three/`, `snippets/manim/`, `snippets/shaders/`, `snippets/canvas/`, `snippets/lottie/`, `snippets/rive/`, `snippets/d3/`, `snippets/pixi/`: reusable motion fragments and experiments.
- `segments/drafts/`: temporary rendered shots and iterations.
- `segments/approved/`: approved clips ready for final assembly.
- `segments/presets/`: render props, timing data, color palettes, and per-segment configuration.
- `renders/drafts/`: full-scene draft exports.
- `renders/final/`: final delivery files.
- `renders/frames/`: frame sequences for inspection or external polish.
- `renders/gifs/`: GIF previews.
- `renders/thumbs/`: thumbnails and contact sheets.
- `tools/`: local scripts for inspection, trimming, transcoding, thumbnails, GIFs, and frame extraction.
- `evolution/`: Darwin-style improvement logs, experiments, promoted patterns, reports, and test prompts.

Generated media can be large. Keep final assets locally by default; force-add only intentionally small deliverables.

## Recommended Loop

0. Initialize the local app workspace when needed:

```bash
pnpm run prepare
```

1. Put raw inputs in `assets/raw/` or curated source assets in the right `assets/*` folder.
2. Save visual references or links in `refs/`. Put screenshots that the AI should read directly in `refs/screenshots/`, then inspect them through a visual model/tool rather than terminal metadata.
3. Draft message, script, storyboard, captions, or VO notes in `copy/` when the piece depends on language.
4. Use Nuwa-style refinement when the text needs voice DNA, tone control, compression, humanization, or channel-specific rewrite.
5. Establish visual direction, styleframes, layouts, prototypes, or tokens in `design/` when the piece depends on look and feel.
6. For brand or product videos, use Huashu Design's asset-first workflow: verify facts, collect logo/product/UI assets, and write facts/spec notes under `refs/facts/` and `refs/brand/`.
7. When the deliverable is a deck, build the rich-media source in `slides/slidev/`, keep deck media in `slides/assets/`, and export generated PDF/PNG/PPTX/site files to `slides/exports/`.
8. When the deliverable must be an editable native PowerPoint file, keep the design spec or approved `.pptx` under `slides/powerpoint/` and use the PowerPoint workflow rather than treating Slidev PPTX snapshots as editable source.
9. Convert approved copy/design inputs into `segments/presets/` or feature config.
10. Prototype reusable motion logic in `snippets/` or directly as a Vibe Motion feature under `vibe-motion-app/shared/features/`.
11. Render short shots into `segments/drafts/`.
12. Promote good shots into `segments/approved/`.
13. Render full drafts into `renders/drafts/`.
14. Use `tools/polish-media.mjs` to trim, transcode, make GIFs, extract frames, and generate thumbnail sheets.
15. Put final deliverables in `renders/final/`.
16. When a reusable pattern emerges, capture it with `pnpm run darwin:capture`.
17. Promote evidence-backed candidates with a Darwin round: score the target, improve one weak dimension, verify, and log the result.

Use `docs/copy-design-workflow.md` for the detailed copy/design block contract.
Use `docs/nuwa-text-style-workflow.md` for text style DNA, tone control, copy polishing, rewrites, and channel-specific prose optimization.
Use `docs/slidev-rich-media-workflow.md` for rich-media deck, static presentation, PDF/PNG/PPTX snapshot export, and PowerPoint handoff decisions.
Use `docs/skill-evolution-workflow.md` for development-time skill candidate capture and promotion.

## Local Polish Commands

```bash
pnpm run media:inspect -- renders/final/output.mov
pnpm run media:trim -- input.mov segments/approved/intro.mov --start 00:00:00 --end 00:00:04
pnpm run media:mp4 -- input.mov renders/final/output.mp4 --crf 18
pnpm run media:gif -- input.mov renders/gifs/preview.gif --fps 18 --width 720
pnpm run media:frames -- input.mov renders/frames/intro --fps 2
pnpm run media:still -- input.mov renders/thumbs/intro.png --time 00:00:01
pnpm run media:thumbs -- input.mov renders/thumbs/contact.png --cols 4 --rows 3 --width 1280
```

These commands require `ffmpeg` and `ffprobe`. ImageMagick is useful for additional manual polish and is detected separately.

## Slidev Commands

```bash
pnpm run slidev:dev
pnpm run slidev:build
pnpm run slidev:export:pdf
pnpm run slidev:export:pptx
pnpm run slidev:export:png
```

Slidev exports are generated under `slides/exports/` and ignored by git by default.

## Evolution Commands

```bash
pnpm run darwin:init
pnpm run darwin:score -- AGENTS.md
pnpm run darwin:log -- --target AGENTS.md --old 72 --new 84 --status keep --dimension workflow --note "Improved media workflow"
pnpm run darwin:report
```

Use these commands for project-scoped learning. Keep broad lessons in `evolution/patterns/`.
