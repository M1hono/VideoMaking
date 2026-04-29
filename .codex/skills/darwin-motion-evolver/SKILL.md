---
name: darwin-motion-evolver
description: Evolve motion/video development skills, snippets, workflow docs, templates, and render pipelines using a Darwin-style ratchet loop inspired by alchaincyf/darwin-skill. Use when the user asks to improve, evolve, score, review, optimize, benchmark, or continuously refine a motion skill, AGENTS workflow, Remotion feature, animation snippet, media-polish process, video helper tooling, or any reusable video-development asset. Keeps only measurable improvements and documents regressions.
---

# Darwin Motion Evolver

## Purpose

Apply a Darwin-style improvement loop to this video-making workspace: evaluate one reusable asset, improve one weak dimension, verify the result, and keep the change only when it is measurably better. The source concept is `https://github.com/alchaincyf/darwin-skill`: evaluate, improve, test, human confirm, keep or revert.

## Scope

Use this for:

- `.codex/skills/*/SKILL.md`
- `AGENTS.md`
- `docs/*`
- `snippets/*`
- `segments/presets/*`
- `tools/*`
- `vibe-motion-app/shared/features/*`
- `evolution/skill-candidates/*`
- reusable media-polish or render workflow assets

Do not use this for one-off creative output unless the output is being turned into a reusable pattern.

## Workflow

1. Pick one target asset.
   - Do not optimize multiple unrelated files in the same Darwin round.
   - If the user asks for broad evolution, score the whole ecosystem first, then choose the weakest target.
2. Establish a baseline.
   - Run `pnpm run darwin:init` if `evolution/results.tsv` is missing.
   - Run `pnpm run darwin:score -- <target-path>`.
   - Read `references/video-rubric.md` for the scoring dimensions.
3. Choose one weak dimension.
   - Make one concrete improvement tied to that dimension.
   - Prefer small, attributable changes over broad rewrites.
4. Verify.
   - For skills/docs/tools: run relevant validators and command smoke tests.
   - For Remotion features: run `pnpm run verify`; render or inspect frames when feasible.
   - For media tooling: run a command against a small `/tmp` fixture.
5. Decide.
   - If the score or evidence improves, keep the change and log it.
   - If it regresses, revert only the change from this round. Do not use destructive git commands.
6. Record the result.
   - Run `pnpm run darwin:log -- --target <path> --old <score> --new <score> --status keep|revert --dimension <name> --note "..."`
   - Update docs or snippets only when a reusable pattern was learned.

## Development-Time Candidate Capture

For `create-vibe-motion` style work, capture reusable lessons during implementation instead of waiting for a large retrospective:

```bash
pnpm run darwin:capture -- --target .codex/skills/create-vibe-motion/SKILL.md --domain motion --trigger "When this pattern appears" --lesson "What future agents should do" --evidence "Command, render, bug fix, or user feedback"
pnpm run darwin:queue
```

Capture creates a candidate in `evolution/skill-candidates/` and logs a `candidate` row in `evolution/results.tsv`. It does not rewrite the skill. Promote candidates through the normal score-improve-verify-log loop.

## Rules

- Keep a single editable asset per round unless dependency wiring is required for verification.
- Never claim improvement without evidence: score, command output, rendered frame, diff, or user feedback.
- Prefer project-scoped learning. Patterns learned here belong in `evolution/` or this project's skills before becoming global.
- Accumulate candidates automatically, but promote them only with evidence.
- Use dry-run scoring when live tests are too expensive, and label it clearly.
- Human confirmation is required before major rewrites, dependency additions, or deleting old patterns.

## Video Evolution Axes

Evaluate improvements across multiple directions, not just code style:

- Motion quality: timing, staging, loop seams, readability, rhythm.
- Render reliability: deterministic frames, no live-time drift, stable assets.
- Reuse: clear parameters, presets, snippets, templates, and feature boundaries.
- Media pipeline: trim/transcode/frame/GIF/thumb workflows are documented and smoke-tested.
- Asset hygiene: assets live in the right folder and generated files stay ignored by default.
- Coverage: supports explainer, social clip, UI demo, product shot, 3D, kinetic type, data viz, caption, music-reactive, and brand motion workflows.

## References

- `references/video-rubric.md`: scoring rubric adapted from darwin-skill.
- `references/evolution-loop.md`: project-specific loop and logs.
- `docs/darwin-motion-loop.md`: user-facing workflow.
