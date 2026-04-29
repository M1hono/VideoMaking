# Motion Workflow

This repository is organized around a simple loop: collect inputs, build reusable motion pieces, render segments, polish outputs, then promote final deliverables.

## Directory Map

- `assets/raw/`: unprocessed imports and one-off source drops.
- `assets/images/`, `assets/video/`, `assets/audio/`, `assets/fonts/`, `assets/svg/`, `assets/lottie/`, `assets/rive/`, `assets/3d/`, `assets/data/`, `assets/brand/`: curated reusable assets.
- `refs/images/`, `refs/videos/`, `refs/notes/`, `refs/facts/`, `refs/brand/`: visual references, links, screenshots, product facts, brand specs, design notes, and inspiration.
- `copy/briefs/`, `copy/messaging/`, `copy/scripts/`, `copy/storyboards/`, `copy/captions/`, `copy/voiceover/`, `copy/prompts/`, `copy/revisions/`: copywriting, scripts, captions, VO, and story structure.
- `design/briefs/`, `design/boards/`, `design/styleframes/`, `design/layouts/`, `design/prototypes/`, `design/tokens/`, `design/reviews/`: design direction, visual proofs, layout rules, tokens, and reviews.
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

1. Put raw inputs in `assets/raw/` or curated source assets in the right `assets/*` folder.
2. Save visual references or links in `refs/`.
3. Draft message, script, storyboard, captions, or VO notes in `copy/` when the piece depends on language.
4. Establish visual direction, styleframes, layouts, prototypes, or tokens in `design/` when the piece depends on look and feel.
5. For brand or product videos, use Huashu Design's asset-first workflow: verify facts, collect logo/product/UI assets, and write facts/spec notes under `refs/facts/` and `refs/brand/`.
6. Convert approved copy/design inputs into `segments/presets/` or feature config.
7. Prototype reusable motion logic in `snippets/` or directly as a Vibe Motion feature under `vibe-motion-app/shared/features/`.
8. Render short shots into `segments/drafts/`.
9. Promote good shots into `segments/approved/`.
10. Render full drafts into `renders/drafts/`.
11. Use `tools/polish-media.mjs` to trim, transcode, make GIFs, extract frames, and generate thumbnail sheets.
12. Put final deliverables in `renders/final/`.
13. When a reusable pattern emerges, run a Darwin round: score the target, improve one weak dimension, verify, and log the result.

Use `docs/copy-design-workflow.md` for the detailed copy/design block contract.

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

## Evolution Commands

```bash
pnpm run darwin:init
pnpm run darwin:score -- AGENTS.md
pnpm run darwin:log -- --target AGENTS.md --old 72 --new 84 --status keep --dimension workflow --note "Improved media workflow"
pnpm run darwin:report
```

Use these commands for project-scoped learning. Keep broad lessons in `evolution/patterns/`.
