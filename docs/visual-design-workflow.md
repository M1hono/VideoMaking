# Visual Design Workflow

This project installs Huashu Design from `https://github.com/alchaincyf/huashu-design` as a project skill at `.agents/skills/huashu-design`.

Use it as the visual direction and design-quality layer for video work. It complements the Vibe Motion pipeline:

- Copy Design Planner defines the message, script, storyboard, design brief, and handoff.
- Huashu Design decides what the piece should look and feel like.
- Create Vibe Motion turns that direction into deterministic reusable animation code.
- Darwin Motion Evolver improves the reusable assets over time.

## When To Use Huashu Design

- Brand or product launch motion.
- High-fidelity HTML animation demo.
- App or web prototype framing before video production.
- Slide deck or presentation video design.
- Visual direction exploration when the user says "make it good" but gives little direction.
- Design variants, style boards, or expert critique.
- Anti-AI-slop review before final render.

## Brand/Product Intake

For concrete products, companies, or public figures, verify facts before designing. Save notes under `refs/facts/`.

For brands, collect assets before styling:

- logo files,
- product photos or renders,
- UI screenshots for digital products,
- official colors and type,
- source URLs and licensing notes.

Put files under `assets/brand/<brand-or-project>/` and write the design notes/spec under `refs/brand/<brand-or-project>.md`.

For rough screenshots that the AI should read, use the flat `refs/screenshots/` drop zone. Image files there are ignored by git by default; inspect them through a visual model/tool and keep any useful observations in markdown.

Use `design/` for the design artifacts that should survive beyond raw references:

- `design/briefs/` for design objectives and constraints.
- `design/boards/` for visual territories and moodboards.
- `design/styleframes/` for keyframes and hero frames.
- `design/layouts/` for grids, safe areas, and composition.
- `design/prototypes/` for HTML prototypes and variants.
- `design/tokens/` for palette, typography, spacing, materials, and motion tokens.
- `design/reviews/` for critique and approval notes.

## Handoff To Motion

After visual direction is chosen, convert it into implementation inputs:

- copy or storyboard path,
- palette,
- typography,
- layout grid,
- visual references,
- asset list,
- motion language,
- duration and scene beats,
- render target and aspect ratio.

Store these as a preset or note in `segments/presets/` when they should be reused.

## Review Checklist

- Does the piece use real brand/product assets when the task depends on recognition?
- Is the style tied to a specific design direction rather than a generic tech gradient?
- Is the first frame readable and intentional?
- Are hierarchy, rhythm, contrast, and motion language consistent?
- Are assets and facts traceable?
- Can the direction be implemented deterministically in Remotion?

## License Note

The bundled Huashu Design license allows personal use and requires authorization for company/team/studio/toolchain integration, paid client delivery, commercial products, paid templates, paid courses/workshops, and commercial commissioned work. Confirm the intended use before relying on it for commercial delivery.
