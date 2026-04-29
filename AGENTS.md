# Project Instructions

## Purpose

This repository is a project-scoped video-making workspace for assisted motion design, reusable Remotion scenes, high-fidelity visual prototypes, media polishing, and continuously improving agent workflows.

Use these instructions whenever the task involves video, animation, visual design direction, brand/product assets, prototype-to-motion handoff, render tooling, reusable snippets, or improving the workflow itself.

## Default Motion Skill

For animation, motion graphic, procedural video, reusable Remotion scene, GSAP, Manim, Three.js, SVG, Canvas, Lottie, Rive, Motion, D3, PixiJS, shader, or Vibe Motion work in this repository, use the project-local skill at `.codex/skills/create-vibe-motion/SKILL.md`.

For visual direction, high-fidelity HTML prototypes, slide decks, interactive demos, app mockups, design variants, brand asset discovery, anti-AI-slop checks, or expert visual review, use `.agents/skills/huashu-design/SKILL.md`.

For copywriting, messaging, scripts, storyboards, captions, voiceover, CTAs, design briefs, styleframes, or concept-to-motion handoff work, use `.codex/skills/copy-design-planner/SKILL.md`.

For improving, scoring, reviewing, or evolving a reusable skill, snippet, doc, tool, render preset, media workflow, or feature template, use `.codex/skills/darwin-motion-evolver/SKILL.md`.

For Git branch, worktree, local checkpoint, promotion, or publish decisions, use `.codex/skills/git-delivery-workflow/SKILL.md`.

Start by running:

```bash
pnpm run motion:stack
```

## Package Manager

Use pnpm. Do not use Yarn in this repository.

Common commands from the repository root:

```bash
pnpm run dev
pnpm run studio
pnpm run verify
pnpm run remotion:render:demo
pnpm run media:help
pnpm run darwin:help
pnpm run gitflow:doctor
pnpm run skills:list
```

## Git Development Protocol

This repository uses the delivery-first workflow in `docs/git-development-workflow.md`.

- Keep `main` as the accepted integration state.
- Use `.worktrees/` for non-trivial implementation, motion experiments, skill work, and workflow changes. The directory is ignored.
- Use local `wip/<area>/<slug>` or `exp/<area>/<slug>` branches for traceable progress. Local checkpoint commits are allowed there.
- Do not push `wip/*` or `exp/*`.
- Promote only clean, verified work to `feature/*`, `fix/*`, `docs/*`, `chore/*`, `motion/*`, `media/*`, or `skill/*`.
- Push only after `pnpm run gitflow:ready -- --base main` passes. Use `pnpm run gitflow:publish -- --base main --yes` when publishing is explicitly appropriate.
- Use Conventional Commits for delivery history. Checkpoint commits should stay local and be marked `chore(checkpoint): ...`.
- Never use destructive git cleanup to remove user work. Revert with targeted patches or normal `git revert`.

## Workspace Layout

Use the root folders deliberately:

- `assets/`: source material. Put raw imports in `assets/raw/`, then move reusable media into `assets/images/`, `assets/video/`, `assets/audio/`, `assets/fonts/`, `assets/svg/`, `assets/lottie/`, `assets/rive/`, `assets/3d/`, or `assets/data/`.
- `assets/brand/`: curated brand and product assets by client or project.
- `refs/`: visual references and notes. Keep screenshots, links, product facts, brand specs, and style observations here.
- `copy/`: message planning. Use `copy/briefs/`, `copy/messaging/`, `copy/scripts/`, `copy/storyboards/`, `copy/captions/`, `copy/voiceover/`, `copy/prompts/`, and `copy/revisions/`.
- `design/`: design planning. Use `design/briefs/`, `design/boards/`, `design/styleframes/`, `design/layouts/`, `design/prototypes/`, `design/tokens/`, and `design/reviews/`.
- `snippets/`: reusable motion fragments by engine: Remotion, React, GSAP, Three.js, Manim, shaders, Canvas, Lottie, Rive, D3, and PixiJS.
- `segments/`: rendered clips. Use `segments/drafts/` for iterations and `segments/approved/` for clips ready to assemble.
- `renders/`: full-scene outputs. Use `renders/drafts/`, `renders/final/`, `renders/frames/`, `renders/gifs/`, and `renders/thumbs/`.
- `tools/`: media inspection and polish scripts.
- `docs/`: workflow and library notes.
- `evolution/`: Darwin-style experiment logs, reusable lessons, score reports, and test prompts.

Generated media is ignored by default. Force-add only intentional small deliverables.

## Skill Routing

Use skills in this order when the work spans design and video:

1. `copy-design-planner`: define the message, script, storyboard, captions, design brief, styleframe plan, and concept-to-motion handoff.
2. `huashu-design`: verify product/brand facts, gather logo/product/UI assets, choose visual direction, create design variants, or review visual quality.
3. `create-vibe-motion`: convert the selected copy and direction into deterministic Remotion/video code, reusable snippets, render presets, and media outputs.
4. `darwin-motion-evolver`: evaluate and improve the reusable workflow asset after a pattern emerges.

For concrete brands or products, do not invent facts from memory. Search current sources first, then save the result in `refs/facts/` or the relevant project notes. Put brand specs in `refs/brand/` and actual logo/product/UI files in `assets/brand/`.

Huashu Design is installed from `alchaincyf/huashu-design` as a project skill. Its bundled license is personal-use-only; confirm authorization before using it as a company, studio, agency, paid client delivery method, paid course/workshop, or commercial product component.

Use `docs/copy-design-workflow.md` when a project needs explicit copy or design artifacts before motion implementation. Store approved or draft copy/design handoff inputs in `copy/`, `design/`, and `segments/presets/` rather than scattering them through code comments.

## Vibe Motion Feature Contract

The current app is `vibe-motion-app`.

Keep generic runtime files generic:

- `vibe-motion-app/preview/*`
- `vibe-motion-app/remotion/*`
- `vibe-motion-app/shared/scaffold/*`

Put new animation logic under:

```text
vibe-motion-app/shared/features/<feature-name>/
  config/<feature-name>Defaults.js
  plugins/<feature-name>Plugin.js
  scenes/<FeatureName>Scene.jsx
  scenes/<feature-name>SceneBuilder.js
```

Register features in `vibe-motion-app/shared/project/projectRegistry.js` and set the active composition in `vibe-motion-app/shared/project/projectConfig.js`.

Frame rendering must be deterministic. Avoid `Date.now()`, unseeded `Math.random()`, `requestAnimationFrame`, global mutable animation state, and DOM-mutating timelines in final Remotion render paths.

## Library Selection

Prefer the installed stack before adding more dependencies:

- Remotion and official Remotion packages for final video output.
- Motion for React UI movement and gesture-like prototypes.
- GSAP for standalone browser timelines and as an inspiration source for timing/staggering.
- Three.js, React Three Fiber, Drei, and maath for real 3D, particles, cameras, and materials.
- D3 for data-driven interpolation and chart motion.
- PixiJS for dense 2D sprites and Canvas/WebGL effects.
- dotLottie and Rive for designer-authored vector assets.
- animejs for lightweight browser animation prototypes.
- Matter.js for physics references and precomputed 2D simulation.
- simplex-noise for procedural fields and organic movement.
- culori for color systems, interpolation, and OKLCH/LCH palettes.
- Huashu Design for design direction, high-fidelity HTML demos, brand asset protocol, slide/prototype framing, and expert critique.

Use Manim, Blender, After Effects, Cavalry, or Rive/Lottie editors as external production tools when they fit the task better than code-only authoring.

## Darwin Evolution Loop

This project adapts `darwin-skill` from `https://github.com/alchaincyf/darwin-skill`.

Use the loop when a reusable asset should improve over time:

1. Pick one target: a skill, doc, snippet, tool, render preset, or feature template.
2. Baseline it:

```bash
pnpm run darwin:init
pnpm run darwin:score -- <target-path>
```

3. Improve one weak dimension only.
4. Verify with commands, rendered evidence, score output, or user feedback.
5. Keep the change only if evidence improves. Revert the current round if it regresses.
6. Log the result:

```bash
pnpm run darwin:log -- --target <target-path> --old <score> --new <score> --status keep --dimension <dimension> --note "What improved"
```

7. Promote reusable lessons into `evolution/patterns/`.

For broad requests like "make this workflow better", score the ecosystem first, then optimize the lowest-scoring target. Do not rewrite everything in one pass.

## Media Polish

Use the root media scripts for finishing clips and outputs:

```bash
pnpm run media:inspect -- <input>
pnpm run media:trim -- <input> <output> --start 00:00:01 --end 00:00:04
pnpm run media:mp4 -- <input> <output.mp4> --crf 18
pnpm run media:gif -- <input> <output.gif> --fps 18 --width 720
pnpm run media:frames -- <input> <output-dir> --fps 2
pnpm run media:still -- <input> <output.png> --time 00:00:01
pnpm run media:thumbs -- <input> <output.png> --cols 4 --rows 3 --width 1280
```

FFmpeg and ffprobe are expected for these commands. ImageMagick is useful for manual image polish.

## Verification

Before calling a motion implementation done, run:

```bash
pnpm run verify
```

For render or media-tool changes, also run the specific command you touched, such as `pnpm run media:help`, `pnpm run media:thumbs -- ...`, or `pnpm run remotion:compositions`.

Report any warning that remains, even if the command exits successfully.
