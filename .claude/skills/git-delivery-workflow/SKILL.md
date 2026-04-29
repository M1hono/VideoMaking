---
name: git-delivery-workflow
description: Use when work in this repository involves Git branches, worktrees, checkpoints, commits, publishing, delivery readiness, local experiments, or deciding whether changes should be pushed.
---

# Git Delivery Workflow

Use this skill in Claude Code to keep local development flexible while publishing only reviewable work.

## Core Rule

Local trace is cheap; remote history is a delivery artifact. Use `wip/*` and `exp/*` for messy progress, then promote to a clean delivery branch only after verification.

## Start

Inspect the current state first:

```bash
git status --short
pnpm run gitflow:doctor
```

For non-trivial work, create an ignored project worktree:

```bash
pnpm run gitflow:start -- <area> <slug>
```

The tool creates `.worktrees/<branch-slug>` and a local branch like `wip/<area>/<slug>`.

Use direct edits on `main` only for small accepted maintenance tasks or when the user explicitly wants the current checkout changed.

## Branch Meaning

- `wip/<area>/<slug>`: local implementation trace. Do not push.
- `exp/<slug>` or `exp/<area>/<slug>`: local exploration. Do not push.
- `feature/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`, `motion/<slug>`, `media/<slug>`, `skill/<slug>`: delivery branches. Push only when ready.
- `main`: accepted integration state.

## Reusable Defaults

- `area`: `feature`, `fix`, `docs`, `chore`, `motion`, `media`, `skill`, or `experiment`.
- `slug`: lowercase hyphenated topic, such as `git-delivery-workflow` or `kinetic-type-grid`.
- worktree directory: `.worktrees/<branch-with-slashes-replaced-by-hyphens>`.
- local trace branches: `wip/<area>/<slug>` and `exp/<slug>`.
- delivery branches: `<delivery-kind>/<slug>`.
- motion presets and configs: `segments/presets/` or `vibe-motion-app/shared/features/<feature>/config/`.
- reusable snippets and patterns: `snippets/`, `.codex/skills/`, `.claude/skills/`, and `evolution/patterns/`.
- source assets and references: `assets/`, `refs/`, `segments/`, and `renders/` according to `AGENTS.md`.

## Local Checkpoints

When a step is worth preserving, create a local checkpoint commit:

```bash
git status --short
git diff --stat
pnpm run gitflow:checkpoint -- --all "short concrete note"
```

Checkpoint commits belong on `wip/*` or `exp/*` branches and use `chore(checkpoint): ...`. Before publishing, squash, split, amend, or rebase them into delivery commits.

For motion/design experiments, also leave evidence in:

- `refs/notes/` for decisions and links.
- `evolution/experiments/` for experiment records.
- `evolution/results.tsv` for Darwin logs.
- `segments/drafts/` and `renders/drafts/` for local rendered evidence.

## Promotion

Before promotion:

```bash
pnpm run gitflow:ready -- --base main
```

Then rename the local branch into a delivery branch:

```bash
pnpm run gitflow:promote -- <delivery-kind> <slug>
```

Use delivery kinds: `feature`, `fix`, `docs`, `chore`, `motion`, `media`, or `skill`.

## Publish

Only publish after the branch is clean and verified:

```bash
pnpm run gitflow:publish -- --base main --yes
```

The publish command refuses `main`, `wip/*`, `exp/*`, and dirty branches. It runs the ready gate before pushing.

## Verification

Use the smallest meaningful check for the change, then run the repository gate when near delivery:

```bash
pnpm run verify
```

For motion, media, or skill changes, also run the specific touched command, such as:

```bash
pnpm run remotion:compositions
pnpm run media:help
pnpm run darwin:score -- AGENTS.md
```

## Do Not

- Do not push `wip/*` or `exp/*`.
- Do not make checkpoint commits on `main`.
- Do not leave generated media staged accidentally.
- Do not use destructive resets or checkout commands to remove user changes.
- Do not claim deliverability without a clean status and command evidence.

## Project Reference

Read `docs/git-development-workflow.md` for the full branch table, promotion flow, and references.
