# Motion Library Recommendations

## Installed Core Stack

- Remotion: React video rendering, frame-accurate compositions, transparent exports, and scripted render flows. Official docs: `https://www.remotion.dev/docs/`
- `@remotion/transitions`: reusable transition timing and presentation helpers.
- `@remotion/shapes` and `@remotion/paths`: SVG geometry helpers for line draw, morph-like path effects, and vector reveals.
- `@remotion/captions`: caption parsing and text timing workflows.
- `@remotion/media-utils`: media metadata and preprocessing helpers.
- Motion for React: UI-style animation, gestures, layout animation, and spring primitives. Docs: `https://motion.dev/docs/react`
- GSAP: timeline authoring, SVG choreography, staggers, easing references, and standalone HTML animation. Docs: `https://gsap.com/docs/v3/`
- Three.js, `@react-three/fiber`, `@react-three/drei`, `maath`: 3D scenes, cameras, lights, materials, particles, shader-ish experiments, and React integration. Docs: `https://threejs.org/docs/`
- D3: data-driven interpolation, scales, axes, and chart motion. Docs: `https://d3js.org/`
- PixiJS: dense 2D sprite/canvas/WebGL effects. Docs: `https://pixijs.com/8.x/guides`
- dotLottie web and Rive React: designer-authored vector animation playback and state machines. Docs: `https://developers.lottiefiles.com/docs/` and `https://rive.app/docs/runtimes/web/`
- Slidev: Markdown-authored rich media decks, Vue/HTML/CSS presentation sites, interactive preview, static build, and PDF/PNG/PPTX snapshot exports. Docs: `https://sli.dev/guide/`
- animejs: lightweight timeline/stagger/path animation for browser prototypes. Docs: `https://animejs.com/documentation/`
- Matter.js: 2D physics references and precomputed simulation ideas.
- simplex-noise: seeded procedural texture, field, particle, and organic motion.
- culori: color conversion, OKLCH/LCH palettes, gradients, and contrast-aware color work.
- Huashu Design: installed project skill from `alchaincyf/huashu-design` for high-fidelity HTML prototypes, design direction, brand asset protocol, slide/prototype framing, motion demo taste, and expert critique. License is personal-use-only; confirm commercial authorization when needed.

## External Tools To Keep In The Workflow

- FFmpeg / ffprobe: inspection, trimming, transcoding, frame extraction, GIF palettes, thumbnails.
- ImageMagick: image batch conversion, resizing, compositing, and format cleanup.
- Manim: math explainers and geometry construction. Docs: `https://docs.manim.community/`
- Blender: 3D models, cameras, lighting, simulation previews, and asset renders for Remotion import.
- Rive editor and Lottie tools: designer-authored reusable vector assets.
- After Effects or Cavalry when designer timeline authoring is more productive than code.
- Darwin-style skill evolution: use `https://github.com/alchaincyf/darwin-skill` as the conceptual reference for scoring, improving, testing, and keeping only measurable workflow improvements.
- Huashu Design source: `https://github.com/alchaincyf/huashu-design`. Use it as a design-quality layer, not as a replacement for Remotion's deterministic render pipeline.
- Nuwa Skill source: `https://github.com/alchaincyf/nuwa-skill`. Use it as the conceptual reference for text style DNA, voice-profile extraction, prose polishing, and reusable rewrite heuristics.

## Selection Guidance

- Use Remotion for final video assembly and repeatable render output.
- Use Motion for small React interaction prototypes and UI-like gestures.
- Use GSAP to study timeline structure or produce standalone browser motion. Port timing to Remotion for final rendered scenes.
- Use Three.js/R3F for real 3D, depth, particles, cameras, materials, and spatial scenes.
- Use PixiJS for lots of 2D sprites or filter-heavy Canvas/WebGL visuals.
- Use D3 when the animation is data, charts, interpolation, or geometry derived from datasets.
- Use Lottie/Rive when the source is designer-authored and should remain editable outside code.
- Use Manim when a mathematical construction is the core of the piece.
- Use Slidev when the output is a rich media deck, web-presentable slideshow, PDF/PNG export, or PPTX snapshot. Use the PowerPoint workflow instead when the final `.pptx` must be natively editable.
- Use Nuwa-style refinement when copy needs a reusable voice profile, stronger cadence, clearer hooks, or style adaptation before entering slides, scripts, captions, or motion.
