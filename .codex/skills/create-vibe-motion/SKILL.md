---
name: create-vibe-motion
description: Create reusable code-driven motion graphics, animation systems, and video scenes for Vibe Motion / Remotion projects or standalone web animation. Use this whenever the user asks for an animation, motion graphic, procedural video, reusable effect, kinetic typography, SVG/Canvas/WebGL/Three.js/GSAP/Manim/Lottie/Rive/Motion animation, or wants inspiration from existing motion libraries and examples. This skill should actively research relevant animation sources and adapt them into deterministic, reusable simple or complex motion code.
---

# Create Vibe Motion

## Mission

Turn a motion request into reusable animation code. Prefer project-native integration for Vibe Motion / Remotion, but choose the engine that best fits the effect: Remotion, React/CSS/SVG, Canvas, GSAP, Three.js, Manim, Motion, Lottie, Rive, D3, PixiJS, shaders, or a hybrid.

## Fast Workflow

1. Inspect the target.
   - Run `node .codex/skills/create-vibe-motion/scripts/detect_motion_stack.mjs` from the repository root when working in a codebase.
   - Read the detected package scripts, dependency stack, and Vibe Motion scaffold files before editing.
2. Research before inventing.
   - If the request names a style, library, or complex effect, search official docs, example galleries, and `vibe-motion` repositories for patterns to adapt.
   - Read `references/motion-sources.md` for preferred sources and search queries.
3. Pick the rendering path.
   - For video export or this scaffold, default to Remotion-compatible deterministic frame math.
   - For browser-only interaction, GSAP, Motion, Rive, Lottie, or CSS can be primary.
   - For 3D, particles, cameras, shaders, or spatial scenes, include Three.js/WebGL as a first-class option, not an afterthought.
   - For mathematical explainers and geometry construction, consider Manim directly or port Manim-style construction into SVG/Canvas/Remotion.
4. Convert inspiration into a reusable system.
   - Extract parameters, timing, easing, camera/state, layout, and assets.
   - Make the animation configurable with clear defaults.
   - Keep frame output pure and deterministic when rendering video.
5. Implement with the local contract.
   - If this is a Vibe Motion scaffold, follow `references/vibe-motion-scaffold.md`.
   - If not, create a self-contained component, scene, HTML file, script, or package-local module that matches the project style.
6. Verify motion and export behavior.
   - Run project checks such as `pnpm run verify`, `pnpm run lint`, `pnpm run remotion:compositions`, or the closest available equivalent.
   - For visual work, render/preview at least one representative frame or run the app when feasible.

## Selection Rules

- Use Remotion when output must be video, frame-accurate, reusable in compositions, transparent-background capable, or integrated with `create-vibe-motion`.
- Use React/CSS/SVG when the effect is typographic, layout-based, icon/logo-based, or a clean 2D vector animation.
- Use GSAP when the target is a standalone browser animation, timeline authoring, rich SVG choreography, scroll/mouse interaction, or exportable HTML. For Remotion, translate GSAP timing ideas into frame math instead of relying on live mutation.
- Use Three.js when there is true 3D geometry, camera movement, materials/lights, particles, depth, WebGL postprocessing, or spatial data. In Remotion, drive transforms from the frame rather than `requestAnimationFrame`.
- Use Manim when the request is a math/education explainer, graph construction, proof animation, or precise geometric transformation. If the target is React/Remotion, port the construction logic or render Manim as an asset only when that is the better product.
- Use Lottie or Rive when the source is a vector animation asset, state machine, designer-authored motion, or reusable brand animation.
- Use D3, Canvas, PixiJS, or shaders when data density, particles, simulation, image processing, or large numbers of marks would be awkward in DOM/SVG.

## Motion Quality Bar

- Design the movement as phases: setup, anticipation, main action, settle, and hold.
- Choose one dominant idea per effect; use secondary motion to support it, not compete with it.
- Prefer named timing constants and helper functions over scattered magic numbers.
- Make loops seamless with modulo math, duplicated domains, ping-pong mapping, periodic noise, or crossfades.
- Avoid DOM time, random values without seeds, live physics drift, and `requestAnimationFrame` in render-to-video paths.
- Expose meaningful controls: duration, size, palette, density, speed, easing, camera, text/data, loop, and output dimensions.
- Keep assets local or well-referenced. Do not hotlink production visuals unless the user asked for that.

## Project Notes

- This repository currently contains a `vibe-motion-app` Remotion scaffold. Its scaffold contract says feature logic belongs under `shared/features/*`, while preview/remotion runtime stays generic.
- Use `references/vibe-motion-scaffold.md` before changing scaffold files.
- Use `references/motion-recipes.md` when choosing an effect recipe or converting inspiration from GSAP/Manim/Three.js into reusable code.

## Deliverable Checklist

When finishing a motion task, report:

- The files changed or generated.
- Which sources or examples informed the motion.
- How to preview or render it.
- Which verification commands ran and whether they passed.
