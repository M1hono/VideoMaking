# Darwin Motion Loop

This repository uses a project-specific adaptation of `darwin-skill` from `https://github.com/alchaincyf/darwin-skill`.

The principle is simple: improve the video-making workflow like a model-training loop. Make one change, measure it, keep it only if it improves the objective.

## What Can Evolve

- Agent instructions: `AGENTS.md`
- Motion skills: `.codex/skills/*/SKILL.md`
- Motion snippets: `snippets/*`
- Render presets and segment configs: `segments/presets/*`
- Media polish tools: `tools/*`
- Vibe Motion features: `vibe-motion-app/shared/features/*`
- Workflow docs: `docs/*`

## Commands

```bash
pnpm run darwin:init
pnpm run darwin:score -- AGENTS.md
pnpm run darwin:score -- .codex/skills/create-vibe-motion/SKILL.md
pnpm run darwin:log -- --target AGENTS.md --old 72 --new 84 --status keep --dimension workflow --note "Added media polish loop"
pnpm run darwin:report
```

## Evolution Folders

- `evolution/results.tsv`: append-only experiment log.
- `evolution/experiments/`: detailed notes for specific experiments.
- `evolution/patterns/`: promoted reusable patterns that should influence future work.
- `evolution/reports/`: summaries and scorecards.
- `evolution/test-prompts/`: test prompts for skill and workflow validation.

## Ratchet Rules

- One primary target per round.
- One weak dimension per improvement.
- Keep only measurable improvements.
- Record dry-run evaluations when full tests are not practical.
- Revert regressions with normal git revert or targeted patching, never destructive reset.
- Ask before major rewrites, dependency changes, or deleting old workflow pieces.

## Video-Specific Objectives

Good changes should improve at least one of these:

- more reliable renders,
- better motion quality,
- clearer asset organization,
- easier snippet reuse,
- stronger media polish workflow,
- broader support for video genres,
- better project-scoped learning.
