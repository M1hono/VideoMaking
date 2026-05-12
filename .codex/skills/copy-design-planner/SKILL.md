---
name: copy-design-planner
description: Use when a video, rich media deck, or motion task needs copywriting, messaging, headlines, scripts, storyboards, captions, voiceover, CTAs, naming, text style profiles, design briefs, visual direction, styleframes, layouts, brand expression, PowerPoint specs, or a concept-to-motion handoff.
---

# Copy Design Planner

Use this skill to turn a vague video idea into clear copy and design inputs before motion code is written.

## Core Rule

Do not bury message and design decisions inside animation code. Make the copy, scene beats, design direction, and approval state visible in project files.

## Start

Inspect the existing project context:

```bash
rg -n "brief|script|storyboard|caption|styleframe|design|brand|copy|style|voice|tone|screenshot|文案|文风|润色|截图" copy design refs docs AGENTS.md CLAUDE.md 2>/dev/null
```

If the task names a concrete product, company, public figure, current event, version, release, or factual claim, verify current facts first and save notes under `refs/facts/`.

If the task depends on screenshots, UI captures, or image-based feedback, use `.codex/skills/screenshot-intake/SKILL.md`. Put rough screenshot files directly in `refs/screenshots/` and inspect them through a visual model/tool before drawing conclusions.

## Artifact Choice

Create or update the smallest useful artifact:

- `copy/briefs/<slug>.md`: goal, audience, message, facts, constraints.
- `copy/messaging/<slug>.md`: headline, tagline, value props, CTA, tone options.
- `copy/scripts/<slug>.md`: VO, on-screen text, narration, shot-by-shot script.
- `copy/storyboards/<slug>.md`: scene beats, durations, text payloads, visual intent.
- `copy/captions/<slug>.md`: subtitles, social captions, accessibility text.
- `copy/styles/<slug>.md`: reusable voice DNA profile, tone system, style guide, or rewrite heuristic.
- `refs/style/<slug>.md`: style source inventory, observations, URLs, and permission notes.
- `design/briefs/<slug>.md`: design objective, format, brand constraints, success criteria.
- `design/boards/<slug>.md`: references, territories, mood, rationale.
- `design/styleframes/<slug>.md`: keyframes, first frame, hero frame notes, image links.
- `design/layouts/<slug>.md`: grid, safe areas, typography, composition.
- `slides/slidev/<slug>.md`: Slidev implementation when the story should become a rich media deck, presentation website, PDF, PNG set, or PPTX snapshot.
- `slides/powerpoint/<slug>.md`: PowerPoint design spec when the final `.pptx` must be editable.
- `design/tokens/<slug>.md`: palette, type scale, spacing, materials, motion tokens.
- `design/reviews/<slug>.md`: critique, approval, revision notes.

Use `docs/copy-design-workflow.md` for the full folder contract.

## Copy Pass

Capture:

- audience and context,
- objective and one-sentence promise,
- hook,
- scene-by-scene beats,
- on-screen text,
- voiceover or narration,
- captions or social copy,
- CTA,
- tone,
- style or voice profile path when relevant,
- factual and legal constraints.

Keep claims traceable. If a claim is not sourced or user-approved, mark it as a draft claim.

## Design Pass

Capture:

- format and aspect ratio,
- brand/product/UI assets,
- references,
- palette and typography,
- layout grid and safe areas,
- styleframe or prototype plan,
- texture, lighting, and material direction,
- motion language,
- readability and accessibility constraints.

Use `.agents/skills/huashu-design/SKILL.md` when the task needs high-fidelity HTML prototypes, style variants, brand asset discovery, or expert design critique.
Use `.codex/skills/nuwa-text-refiner/SKILL.md` when the task needs text stylization, polishing, voice DNA extraction, tone optimization, humanization, compression, or style-specific rewriting.
Use `.codex/skills/slidev-rich-media/SKILL.md` when the task should become a rich media deck, presentation website, PDF/PNG export, or PPTX snapshot.
Use the PowerPoint skill when the requested final deck must contain editable native PowerPoint text, charts, shapes, or speaker notes.

## Handoff To Motion

Before calling motion implementation ready, produce a handoff that includes:

- approved or draft copy path,
- voice/style profile path when relevant,
- design artifact path,
- target duration,
- aspect ratio,
- scene list with approximate frame ranges,
- text payload per scene,
- asset list,
- palette/type tokens,
- motion language,
- deck route when relevant: Slidev web/snapshot export or editable PowerPoint,
- verification plan.

Store reusable timing, palette, or text config in `segments/presets/` or `vibe-motion-app/shared/features/<feature>/config/`.

## Verification

Before handing off to motion, run a lightweight content check:

```bash
rg -n "hook|headline|scene|caption|voiceover|CTA|palette|type|layout|asset|duration|slide|deck|PowerPoint|Slidev|style|voice|tone" copy refs/style design slides segments/presets
```

When the copy/design process itself becomes reusable, score and log the improved target:

```bash
pnpm run darwin:score -- docs/copy-design-workflow.md
pnpm run darwin:log -- --target <path> --old <score> --new <score> --status keep --dimension <dimension> --note "What improved"
```

## Do Not

- Do not start detailed Remotion code when the headline, scene beats, or visual direction are still undefined for a message-heavy piece.
- Do not invent product claims, dates, specs, or brand rules.
- Do not let copy and design drift apart; update both when scene structure changes.
- Do not commit large generated media just to document a design decision; store drafts locally and commit notes or small references.

## Finish

Report:

- copy files created or updated,
- style files created or updated,
- design files created or updated,
- slide or PowerPoint planning files created or updated,
- facts/assets used,
- open assumptions,
- next motion implementation path.
