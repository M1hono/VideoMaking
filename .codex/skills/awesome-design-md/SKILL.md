---
name: awesome-design-md
description: Project-local DESIGN.md style-system reference workflow for VideoMaking. Use when choosing or adapting a formal design-system source of truth, creating project DESIGN.md files, turning mature brand aesthetics into tokens, or asking agents across Codex/Claude/Hermes to generate brand-consistent UI, decks, prototypes, or motion styleframes.
license: MIT
---

# Awesome DESIGN.md

Project-local workflow for using DESIGN.md-style references as a cross-agent visual source of truth.

This is intentionally repository-scoped so Codex, Claude Code, Hermes, and other agents can share the same design-system handoff without relying on a user's global skill installation.

Use this with:

- `docs/web-design-style-workflow.md`
- `.codex/skills/popular-web-designs/SKILL.md`
- `.claude/skills/popular-web-designs/SKILL.md`
- `design/tokens/<slug>.md`
- project root `DESIGN.md` when a single source-of-truth is needed

## When To Use

Use when:

- The user asks for a mature style system or named product aesthetic.
- The project needs a reusable `DESIGN.md` agents can read before coding.
- A visual direction must survive across Codex, Claude Code, Hermes, Slidev, Remotion, and future worktrees.
- You need to turn a style anchor into formal tokens, components, layout rules, and do/don'ts.

## Workflow

1. Choose one or two style anchors with `popular-web-designs`.
2. Decide whether the deliverable needs a full project `DESIGN.md` or just `design/tokens/<slug>.md`.
3. Write the selected design language as explicit rules:
   - identity and mood,
   - palette,
   - typography,
   - spacing/grid,
   - surfaces/materials,
   - components,
   - imagery/illustration,
   - motion behavior,
   - accessibility,
   - do/don'ts.
4. Keep project/user brand constraints higher priority than borrowed references.
5. For motion/video, include deterministic timing and composition tokens rather than web-only hover/scroll behavior.
6. Verify downstream output against the DESIGN.md or tokens before final render.

## DESIGN.md Template

```markdown
# DESIGN.md

## Purpose

## Brand or Project Context

## Style Anchors
|- Anchor | Borrow | Avoid |
|- --- | --- | --- |
|- Vercel | monochrome precision, Geist-like type, calm whitespace | implying Vercel affiliation |

## Visual Principles

## Color System

## Typography

## Layout and Spacing

## Components

## Surfaces, Shadows, and Materials

## Imagery and Icons

## Motion Language

## Accessibility

## Do

## Don't

## Implementation Notes
```

## Common Reference Choices

- Developer tools: Vercel, Linear, Cursor, Raycast, Expo, Warp, Mintlify.
- AI products: Claude, Cohere, ElevenLabs, Mistral, Ollama, RunwayML, VoltAgent.
- Consumer polish: Apple, Airbnb, Spotify, Notion, Pinterest, Shopify-like commerce systems.
- Enterprise/docs: IBM Carbon-like systems, HashiCorp, MongoDB, ClickHouse, Supabase.
- Luxury/editorial: BMW, Ferrari/Bugatti-like premium restraint, SpaceX.

## Multi-Agent Contract

For this repository:

- Put reusable project-wide source of truth at `DESIGN.md` only when it applies broadly.
- Put task-specific systems in `design/tokens/<slug>.md`.
- Put exploration rationale in `design/boards/<slug>.md`.
- Mention selected anchors in motion handoffs and final reports.
- Do not rely on global `~/.hermes` or user-local skill installs for project-critical design choices.

## Pitfalls

- Do not paste giant reference documents into every prompt. Distill the applicable tokens.
- Do not copy brand logos/assets or exact pages without rights.
- Do not mix too many references. A clear single anchor beats a confused collage.
- Do not let DESIGN.md drift from implementation; update it when the approved visual language changes.


## Project Verification

For this repository, run these after changing this skill or creating/updating a project DESIGN.md/token source:

```bash
pnpm run skills:design:check
pnpm run workflow:doctor
pnpm run verify
```

If the DESIGN.md drives motion/video, verify that the selected tokens are represented in `design/tokens/`, `design/boards/`, or feature config before rendering.

## Darwin Learning

When a DESIGN.md pattern becomes reusable across projects or agents, capture it project-locally:

```bash
pnpm run darwin:capture -- --target .codex/skills/awesome-design-md/SKILL.md --domain design --trigger "When this design-system pattern appears" --lesson "Reusable DESIGN.md/token rule" --evidence "Token file, implementation, render, or user feedback"
```
