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
- Development-time skill candidates: `evolution/skill-candidates/*`

## Commands

```bash
pnpm run darwin:init
pnpm run darwin:score -- AGENTS.md
pnpm run darwin:score -- .codex/skills/create-vibe-motion/SKILL.md
pnpm run darwin:capture -- --target .codex/skills/create-vibe-motion/SKILL.md --domain motion --lesson "Reusable lesson" --evidence "What proved it"
pnpm run darwin:queue
pnpm run darwin:log -- --target AGENTS.md --old 72 --new 84 --status keep --dimension workflow --note "Added media polish loop"
pnpm run darwin:report
```

## Evolution Folders

- `evolution/results.tsv`: append-only experiment log.
- `evolution/experiments/`: detailed notes for specific experiments.
- `evolution/skill-candidates/`: development-time reusable lessons waiting for Darwin promotion.
- `evolution/patterns/`: promoted reusable patterns that should influence future work.
- `evolution/reports/`: summaries and scorecards.
- `evolution/test-prompts/`: test prompts for skill and workflow validation.

## Ratchet Rules

- One primary target per round.
- One weak dimension per improvement.
- Capture reusable lessons during development, but promote them only after scoring and verification.
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

## Development-Time Capture

For `create-vibe-motion` style work, capture reusable lessons as soon as they appear:

```bash
pnpm run darwin:capture -- --target .codex/skills/create-vibe-motion/SKILL.md --domain motion --trigger "When building a reusable effect" --lesson "What should future agents do differently" --evidence "Verification, render, bug fix, or user feedback"
```

This creates a candidate note and logs it as `candidate`; it does not automatically rewrite the skill. Promote candidates with the normal score-improve-verify-log loop. See `docs/skill-evolution-workflow.md`.
