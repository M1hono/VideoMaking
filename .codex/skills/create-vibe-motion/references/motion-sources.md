# Motion Sources

Use this reference when selecting libraries, finding inspiration, or translating an existing motion pattern into reusable code.

## Source Priority

1. Local project code and scaffold contract.
2. Official docs and official examples for the selected engine.
3. `vibe-motion` repositories and installed Vibe Motion skills.
4. High-quality public demos only after checking license and adapting the idea rather than copying wholesale.

## Vibe Motion Sources

- `https://github.com/vibe-motion/create-vibe-motion`: Remotion scaffold for procedural animation and programmatic video.
- `https://github.com/vibe-motion/skills`: agent skills for reusable motion effects. Notable directories include `light-spotlight-render`, `procedural-fish-render`, `remotion-3d-ticker`, `remotion-vinyl-player`, `ruler-progress-render`, `svg-assembly-animator`, and `wechat-2d-render`.
- `https://github.com/vibe-motion/procedural-fish`: example app structure with preview, Remotion, shared feature code, and single-file procedural output.

Useful GitHub API probes:

```bash
curl -sS https://api.github.com/orgs/vibe-motion/repos
curl -sS https://api.github.com/repos/vibe-motion/skills/contents/
curl -sS https://api.github.com/repos/vibe-motion/create-vibe-motion/contents/
```

## Official Engine Sources

- Remotion: `https://www.remotion.dev/docs/`
  - Search: `site:remotion.dev/docs useCurrentFrame interpolate spring Sequence`
  - Use for frame-driven React video, composition registration, transparent export, audio/video sequencing.
- GSAP: `https://gsap.com/docs/v3/`
  - Search: `site:gsap.com/docs/v3 gsap.timeline stagger ease svg`
  - Use for browser timelines, SVG choreography, ScrollTrigger, morphing, draggable/interactive motion.
- Three.js: `https://threejs.org/docs/` and `https://threejs.org/examples/`
  - Search: `site:threejs.org/examples webgl particles shader camera instanced`
  - Use for 3D scenes, cameras, lights, particles, materials, postprocessing, geometry transforms.
- Manim Community: `https://docs.manim.community/`
  - Search: `site:docs.manim.community examples gallery transform graph geometry`
  - Use for mathematical explainers, graph/geometry construction, proof-like sequencing.
- Motion for React: `https://motion.dev/docs/react`
  - Search: `site:motion.dev/docs react variants gestures layout animation`
  - Use for React UI animation, gestures, layout transitions, variants.
- Anime.js: `https://animejs.com/documentation/`
  - Search: `animejs documentation timeline stagger svg morph`
  - Use for lightweight timelines, staggering, path and SVG effects.
- Lottie / dotLottie: `https://developers.lottiefiles.com/docs/`
  - Search: `LottieFiles dotLottie web player docs segment frame control`
  - Use for imported vector animation assets and frame-controlled playback.
- Rive: `https://rive.app/docs/runtimes/web/`
  - Search: `Rive web runtime state machine animation docs`
  - Use for state-machine animation and designer-authored interactive vector motion.
- D3 transitions: `https://d3js.org/d3-transition`
  - Search: `D3 transition interpolate path morph docs`
  - Use for data-driven chart movement and interpolation strategies.
- PixiJS: `https://pixijs.com/8.x/guides`
  - Search: `PixiJS v8 particles filters render texture docs`
  - Use for many sprites, filters, particle systems, and canvas/WebGL 2D scenes.
- Theatre.js: `https://www.theatrejs.com/docs/`
  - Search: `Theatre.js docs sequence keyframes studio`
  - Use for hand-authored cinematic timelines when deterministic keyframes are more useful than procedural math.
- p5.js: `https://p5js.org/reference/`
  - Search: `p5.js reference noise particles flow field`
  - Use for generative sketches that can be ported to Canvas/Remotion.

## Research Query Patterns

Use queries like:

- `<effect name> Remotion useCurrentFrame interpolate spring example`
- `<effect name> GSAP timeline svg stagger example`
- `<effect name> Three.js particles camera shader example`
- `<effect name> Manim transform graph scene example`
- `<visual style> motion design animation reference`
- `site:github.com/vibe-motion/skills <effect keyword>`

When a source uses live time or mutable timelines, extract the timing curve, staging, and state model. Rebuild the final implementation in the target runtime's native deterministic style.
