# Skill Evolution Workflow

Use this workflow during motion/video development to continuously improve project skills, snippets, docs, tools, and feature templates.

The goal is not to rewrite skills after every task. The goal is to automatically capture reusable lessons while developing, then promote only evidence-backed improvements through Darwin.

## Purpose

This is the project learning layer for `create-vibe-motion` and related video skills. Use it when animation, render, media, screenshot, copy/design, asset, or workflow development reveals a reusable pattern that should make future motion work better.

## What Gets Captured

Capture a candidate when development reveals a reusable lesson:

- a better Remotion scene boundary,
- a reliable timing/easing pattern,
- a new Three.js, GSAP, Manim, Lottie, Rive, Canvas, D3, Pixi, or shader recipe,
- a render reliability fix,
- a screenshot/design/copy handoff rule,
- a media polish command pattern,
- a project workflow correction,
- a failure mode that should not happen again.

Do not capture one-off creative choices unless they generalize into a reusable pattern.

## Folders

- `evolution/skill-candidates/`: raw candidate lessons captured during development.
- `evolution/experiments/`: detailed Darwin rounds and trial notes.
- `evolution/patterns/`: promoted reusable patterns.
- `evolution/results.tsv`: append-only Darwin log.
- `.codex/skills/`: project skills for Codex.
- `.claude/skills/`: project skills for Claude Code.

## Development-Time Capture

At the end of a motion task, ask: "Did this teach the project something reusable?"

If yes, capture it:

```bash
pnpm run darwin:capture -- --target .codex/skills/create-vibe-motion/SKILL.md --domain motion --trigger "When building <kind of effect>" --lesson "Reusable lesson" --evidence "Command, rendered frame, user feedback, or bug fixed"
```

The capture command:

- writes a markdown candidate under `evolution/skill-candidates/`,
- appends a `candidate` row to `evolution/results.tsv`,
- does not edit the target skill automatically.

List candidates:

```bash
pnpm run darwin:queue
```

## Promotion Round

Promote candidates with the normal Darwin loop:

```bash
pnpm run darwin:score -- .codex/skills/create-vibe-motion/SKILL.md
```

Then improve one weak dimension only. Promotion targets can be:

- `.codex/skills/create-vibe-motion/SKILL.md`
- `.codex/skills/darwin-motion-evolver/SKILL.md`
- `.claude/skills/*/SKILL.md`
- `docs/*`
- `snippets/*`
- `segments/presets/*`
- `tools/*`
- `vibe-motion-app/shared/features/*`

After editing, verify and re-score:

```bash
pnpm run verify
pnpm run darwin:score -- <target-path>
pnpm run darwin:log -- --target <target-path> --old <score> --new <score> --status keep --dimension <dimension> --note "Promoted candidate <file>"
```

If the candidate does not improve evidence, keep it as a candidate or mark a revert/regression in `evolution/results.tsv`.

## Automatic Does Not Mean Unchecked

This project should automatically accumulate candidates, but promotion stays evidence-gated:

- no silent skill rewrites,
- no broad skill edits without score or verification,
- no deleting older patterns without human confirmation,
- no claiming improvement without a command, rendered artifact, score change, or user feedback.

## Create Vibe Motion Contract

Every substantial `create-vibe-motion` task should finish with one of these:

- a captured candidate in `evolution/skill-candidates/`, or
- an explicit note that no reusable lesson was found.

This keeps the motion system learning without forcing every creative output to become permanent doctrine.
