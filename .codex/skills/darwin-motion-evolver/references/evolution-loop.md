# Project Evolution Loop

This project adapts `darwin-skill` to video-assisted development.

## Source Concept

`darwin-skill` describes a ratchet loop for skills:

- Evaluate.
- Improve.
- Test.
- Ask for human confirmation.
- Keep or revert.

It also emphasizes one editable asset per experiment, dual structure/effectiveness evaluation, independent scoring, and results logging.

## Project Adaptation

For this repository, the editable asset can be a skill, doc, snippet, tool, feature plugin, render preset, or media workflow. The evaluation must include video-specific concerns:

- final render reliability,
- motion quality,
- reusable scene architecture,
- asset and output hygiene,
- post-render polish,
- support for many video genres and production directions.

## Files

- `evolution/results.tsv`: Darwin round log.
- `evolution/experiments/`: optional notes for a specific experiment.
- `evolution/skill-candidates/`: reusable lessons captured during development.
- `evolution/patterns/`: promoted reusable patterns.
- `evolution/reports/`: summaries and scorecards.
- `evolution/test-prompts/`: prompts or tasks used to test skills and reusable workflows.

## Standard Round

1. Baseline score the target:
   `pnpm run darwin:score -- <target-path>`
2. Pick the weakest dimension from the rubric.
3. Make one small improvement.
4. Verify with commands or rendered evidence.
5. Re-score.
6. Log:
   `pnpm run darwin:log -- --target <path> --old <old> --new <new> --status keep --dimension <dimension> --note "..."`
7. If the improvement produced a reusable lesson, add a short note to `evolution/patterns/`.

## Candidate Capture

During `create-vibe-motion` development, capture reusable lessons immediately:

```bash
pnpm run darwin:capture -- --target .codex/skills/create-vibe-motion/SKILL.md --domain motion --lesson "Reusable lesson" --evidence "Why this lesson is valid"
```

This adds a candidate under `evolution/skill-candidates/` and logs `status=candidate`. Promote candidates only after a normal score-improve-verify-log round.

## When To Stop

Stop after one or two focused improvements unless the user explicitly asks for a longer optimization pass. Large refactors require human confirmation.
