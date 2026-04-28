# Motion Recipes

Use these recipes as starting points after researching the target effect.

## Core Timing Primitives

- Normalize time: `t = clamp(frame / (durationInFrames - 1), 0, 1)`.
- Loop time: `phase = (frame % loopFrames) / loopFrames`.
- Ping-pong: `p = 1 - Math.abs(phase * 2 - 1)`.
- Stagger: `local = clamp((t - index * gap) / itemDuration, 0, 1)`.
- Seamless scroll: duplicate the domain, move by `-50%`, then reset on identical content.
- Periodic motion: use `sin`, `cos`, circular paths, or tileable noise so frame 0 and the final frame match.

## Reusable Effect Patterns

- Kinetic typography: split text into words or graphemes, assign per-token delay, animate opacity/translate/blur/scale, then settle into readable layout.
- SVG line draw: use path length, `strokeDasharray`, `strokeDashoffset`, secondary glow, and a final fill reveal.
- Logo assembly: scatter parts outward first, then reverse into place with stagger, overshoot, and rotational settle.
- Spotlight reveal: animate a mask/light cone across text, keep the beam and reveal mask driven by the same angle.
- Infinite ticker: duplicate content, move by half-domain, vary column duration/direction/scale for parallax.
- Data/chart reveal: compute final geometry first, then interpolate values, labels, and camera/viewport. Use D3 interpolation ideas even when rendering in React/SVG.
- Particle field: seed positions, update from frame math or closed-form functions. Avoid accumulating simulation state in render paths.
- 3D orbit/product shot: separate camera orbit, object rotation, light sweep, and material highlight. Use Three.js for real depth; use CSS 3D only for shallow card/photo walls.
- Mathematical explainer: structure as construct, transform, annotate, compare, conclusion. Use Manim-style groups and transforms even when implementing in SVG.

## Engine Translation Notes

### Remotion

- Prefer pure functions in `buildSceneProps`.
- Use frame, fps, duration, and props as the only animation inputs.
- Translate easing with Remotion `interpolate`, `spring`, or custom easing functions.
- Avoid runtime layout dependence; if unavoidable, use the scaffold's layout-ready mechanism.

### GSAP

- Use GSAP examples to learn timeline structure: labels, staggers, easing, transform origins, and sequencing.
- In Remotion, replace `gsap.to()` with computed props at a frame. Do not rely on DOM mutation for video render correctness.
- In standalone HTML, GSAP is appropriate and can remain the runtime.

### Three.js

- Drive object positions, rotations, material uniforms, and camera parameters from the current frame.
- Seed procedural geometry and particle attributes.
- For React projects, prefer `@react-three/fiber` when dependencies already exist or the user approves adding them.
- For Remotion screenshots/video, make the canvas deterministic and ready before frame capture.

### Manim

- Use Manim directly for Python-first math videos.
- For Remotion targets, port the construction graph: shapes, transforms, labels, camera movements, and timing phases.
- Render Manim to asset video only when the user wants a Manim artifact or the construction would be wasteful to port.

### Lottie and Rive

- Use for designer-authored assets, brand vectors, and state machines.
- Prefer frame/segment control when rendering to video.
- Keep source `.json`, `.lottie`, or `.riv` files local and document how they are generated or edited.

## Verification Ideas

- Preview the first, middle, final, and loop boundary frames.
- Check that text remains readable and fits the target aspect ratio.
- For loops, compare frame 0 and the seam frame visually or by canvas pixels when possible.
- For Three.js/WebGL, confirm the canvas is nonblank, assets/textures loaded, and the camera frames the subject.
