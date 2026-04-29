# Git Development Workflow

This repository uses a delivery-first Git workflow: isolate experiments locally, leave traceable commits at every meaningful step, and push only when a branch is ready to review or ship.

## Purpose

Use this workflow when developing motion/video features, media tools, reusable skills, workflow docs, render presets, or visual experiments that may need several iterations before they are deliverable.

The goal is to preserve useful development history without turning the remote repository into a dump of unfinished experiments.

## Principles

- `main` is the integration line. Keep it clean, reproducible, and deployable.
- Use a separate worktree for non-trivial work so video experiments, generated outputs, and dependency installs do not disturb the main checkout.
- Leave local trace through small commits, experiment notes, rendered evidence, and Darwin logs.
- Push only delivery branches. Local `wip/*` and `exp/*` branches are private until promoted.
- Never hide uncertainty in a final branch. Rebase, squash, or split local checkpoint commits into reviewable commits before publishing.
- Do not commit generated media unless it is an intentional small deliverable.

## Branch Types

| Branch | Scope | Push? | Notes |
| --- | --- | --- | --- |
| `main` | accepted project state | yes | pull, verify, and merge only |
| `wip/<area>/<slug>` | local implementation trace | no | checkpoint commits are allowed |
| `exp/<area>/<slug>` | local exploration or design trials | no | keep useful evidence in `evolution/experiments/` |
| `feature/<slug>` | reviewable feature | yes, when ready | clean commits, verification passed |
| `fix/<slug>` | reviewable bug fix | yes, when ready | include reproduction and verification |
| `docs/<slug>` | reviewable docs/workflow change | yes, when ready | use for AGENTS, docs, skills |
| `chore/<slug>` | tooling, cleanup, maintenance | yes, when ready | avoid mixing behavior changes |
| `motion/<slug>` | reusable animation or render feature | yes, when ready | include preview/render instructions |
| `media/<slug>` | media pipeline/tooling work | yes, when ready | final media stays ignored unless intentional |
| `skill/<slug>` | project skill creation/evolution | yes, when ready | validate skill and update AGENTS routing |

Use lowercase slugs, hyphens, and concrete nouns: `docs/git-development-workflow`, `motion/kinetic-type-grid`, `skill/git-delivery-workflow`.

## Worktree Layout

Project-local worktrees live in `.worktrees/`, which is ignored by git.

```bash
pnpm run gitflow:start -- docs git-development-workflow
cd .worktrees/wip-docs-git-development-workflow
pnpm install
pnpm run verify
```

The start command creates a private branch named `wip/<area>/<slug>` by default. Use one worktree per meaningful effort. Remove completed worktrees after merge:

```bash
git worktree remove .worktrees/wip-docs-git-development-workflow
git branch -d docs/git-development-workflow
```

## Trace Without Premature Push

Use checkpoint commits locally whenever a step would be painful to reconstruct:

```bash
git status --short
git diff --stat
pnpm run gitflow:checkpoint -- --all "draft branch and worktree protocol"
```

Checkpoint commits use `chore(checkpoint): ...` and belong on `wip/*` or `exp/*` branches. Before publishing, convert them into coherent delivery commits:

```bash
git rebase -i main
git commit --amend
git reset --soft main
```

Choose the rewrite method that preserves the useful story. The delivery branch should explain what changed and why, not every false start.

For video and design experiments, also record evidence outside git history:

- `refs/notes/`: references, constraints, and decision notes.
- `evolution/experiments/`: experiment setup, observations, and verdicts.
- `evolution/results.tsv`: Darwin score/log records.
- `segments/drafts/` and `renders/drafts/`: local rendered evidence, ignored by default.

## Delivery Gate

A branch is deliverable only when all of these are true:

- The branch name is not `wip/*` or `exp/*`.
- `git status --short` is clean.
- The branch is based on the current `main` or `origin/main`.
- Commits are logical and reviewable.
- Relevant verification has passed.
- Preview, render, or media commands are documented for motion work.
- Generated output is either ignored or intentionally force-added with a reason.

Use the tool gate before pushing:

```bash
pnpm run gitflow:ready -- --base main
pnpm run gitflow:publish -- --base main --yes
```

`gitflow:publish` refuses to push `wip/*`, `exp/*`, `main`, or a dirty branch. It runs the ready checks first.

## Promotion Flow

1. Start local work:

```bash
pnpm run gitflow:start -- motion product-orbit-loop
```

2. Commit trace locally:

```bash
pnpm run gitflow:checkpoint -- --all "prototype orbit timing"
pnpm run gitflow:checkpoint -- --all "add render preset"
```

3. Verify and promote:

```bash
pnpm run gitflow:ready -- --base main
pnpm run gitflow:promote -- motion product-orbit-loop
```

4. Clean commits if needed:

```bash
git rebase -i main
pnpm run verify
```

5. Publish only when ready:

```bash
pnpm run gitflow:publish -- --base main --yes
```

## Commit Style

Use Conventional Commits for delivery branches:

- `feat: add reusable kinetic type scene`
- `fix: stabilize media thumbnail generation`
- `docs: define git delivery workflow`
- `chore: keep installed skills out of repo`
- `refactor: isolate remotion feature registry`
- `test: add render preset validation`

Local checkpoints should stay plainly marked:

```text
chore(checkpoint): test type reveal timing
chore(checkpoint): compare gsap stagger references
```

## Agent Rules

Future agents should:

1. Use `.codex/skills/git-delivery-workflow/SKILL.md` for branch, worktree, checkpoint, promotion, and push decisions.
2. Start non-trivial implementation in a worktree unless the user asks for a tiny direct edit.
3. Keep `main` for integration, quick docs fixes, and final accepted state.
4. Never push `wip/*` or `exp/*`.
5. Run `pnpm run gitflow:doctor` before changing Git topology.
6. Run `pnpm run gitflow:ready` before claiming a branch is deliverable.

## Claude Code Entry Points

Claude Code should start from `CLAUDE.md`. The Claude-specific Git workflow skill is mirrored at `.claude/skills/git-delivery-workflow/SKILL.md`, and interactive project commands live under `.claude/commands/`:

- `/gitflow-doctor`
- `/gitflow-start`
- `/gitflow-checkpoint`
- `/gitflow-ready`
- `/gitflow-promote`
- `/gitflow-publish`

## References

- Git worktree documentation: https://git-scm.com/docs/git-worktree
- Git branch documentation: https://git-scm.com/docs/git-branch
- Gitignore documentation: https://git-scm.com/docs/gitignore
- GitHub flow guide: https://docs.github.com/en/get-started/using-github/github-flow
- GitHub protected branch and status check concepts: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches
