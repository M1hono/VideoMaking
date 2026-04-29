# Copy And Design Workflow

Use this workflow before motion implementation when the video depends on message, story, on-screen text, voiceover, brand expression, visual direction, layout, or styleframes.

The goal is to make copy and design explicit inputs to motion, not improvised inside animation code.

## Directory Map

### Copy Block

- `copy/briefs/`: creative briefs, audience notes, product promises, constraints, and approved claims.
- `copy/messaging/`: headlines, taglines, value props, CTAs, naming options, and tone explorations.
- `copy/scripts/`: voiceover scripts, narrated explainers, launch scripts, and shot-by-shot copy.
- `copy/storyboards/`: scene beats, timing tables, text placement notes, and rough boards.
- `copy/captions/`: subtitle text, caption timing notes, social captions, and accessibility text.
- `copy/voiceover/`: VO direction, pronunciation notes, recording takes, and edit notes.
- `copy/prompts/`: reusable copy prompts, style prompts, and prompt variants.
- `copy/revisions/`: rejected versions, client/user feedback, and before/after copy changes.

### Design Block

- `design/briefs/`: design objectives, audience, format, brand constraints, and success criteria.
- `design/boards/`: moodboards, reference boards, competitor scans, and visual territories.
- `design/styleframes/`: keyframes, first-frame designs, hero frames, and visual proofs.
- `design/layouts/`: grids, safe areas, typography layout, shot composition, and responsive framing.
- `design/prototypes/`: HTML prototypes, interaction demos, design variants, and Huashu outputs.
- `design/tokens/`: palettes, type scales, spacing, radii, shadows, materials, and motion tokens.
- `design/reviews/`: expert critiques, visual QA, anti-generic checks, and approval notes.

## Copy Handoff

Before building motion for a message-heavy piece, create or update a copy artifact with:

- audience and context,
- objective and single-sentence promise,
- required facts and source links,
- headline or hook,
- scene-by-scene message beats,
- on-screen text,
- voiceover or narration,
- captions or social description,
- CTA,
- tone and prohibited language,
- legal, brand, or factual constraints.

Use `refs/facts/` for factual claims and `refs/brand/` for brand rules. Do not invent claims, specs, dates, or product status from memory.

## Design Handoff

Before building motion for a visual-quality-sensitive piece, create or update a design artifact with:

- format and aspect ratio,
- reference links and screenshots,
- logo/product/UI asset list,
- palette and type direction,
- layout grid and safe areas,
- styleframe or prototype link/path,
- texture/material/lighting direction,
- motion language,
- accessibility/readability constraints,
- approval status and review notes.

Use `assets/brand/` for actual brand assets and `design/styleframes/` or `design/prototypes/` for visual proofs. Put rough screenshots for AI reading directly in `refs/screenshots/`; terminal file metadata is not enough to claim visual inspection.

## Production Loop

1. Gather facts, assets, and references into `refs/` and `assets/`.
   - Put screenshots directly in `refs/screenshots/` and inspect them through a model visual channel.
2. Draft the message in `copy/briefs/`, `copy/messaging/`, or `copy/scripts/`.
3. Turn the message into beats in `copy/storyboards/`.
4. Establish the visual direction in `design/boards/`, `design/styleframes/`, or `design/prototypes/`.
5. Convert approved copy and design into `segments/presets/` or feature config.
6. Implement reusable motion in `snippets/` or `vibe-motion-app/shared/features/`.
7. Render drafts into `segments/drafts/` or `renders/drafts/`.
8. Review copy, design, motion, and media polish before promoting outputs.

## Skill Routing

- Use `copy-design-planner` when the task needs messaging, scripts, storyboards, captions, voiceover, visual direction, design brief, styleframes, or concept-to-motion planning.
- Use `huashu-design` for high-fidelity visual direction, HTML prototypes, design variants, and expert visual review.
- Use `create-vibe-motion` after the message and design direction are clear enough to implement deterministic motion.
- Use `darwin-motion-evolver` when a copy/design pattern should become reusable.

## Review Checklist

- Is the main message understandable without reading project notes?
- Are claims backed by `refs/facts/` or user-provided material?
- Does every scene have a purpose, text payload, and approximate duration?
- Are typography, layout, safe areas, and contrast specified before render work?
- Does the design use real brand/product/UI assets when recognition matters?
- Are copy, design, and motion presets linked so future edits do not drift?

## Verification Gate

Before moving into detailed motion implementation, verify the handoff:

```bash
rg -n "hook|headline|scene|caption|voiceover|CTA|palette|type|layout|safe area|asset|duration" copy design segments/presets
pnpm run darwin:score -- docs/copy-design-workflow.md
```

For brand/product pieces, also confirm that `refs/facts/` and `assets/brand/` contain the evidence and assets needed by the copy and design.

For reusable improvements, log the result:

```bash
pnpm run darwin:log -- --target docs/copy-design-workflow.md --old <score> --new <score> --status keep --dimension <dimension> --note "What improved"
```

If the gate fails, revise `copy/` or `design/` before editing Remotion scenes.
