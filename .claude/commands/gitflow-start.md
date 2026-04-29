---
description: Start an isolated local worktree branch for this project
argument-hint: <area> <slug>
---

Use `.claude/skills/git-delivery-workflow/SKILL.md`, then start an ignored worktree from the requested area and slug.

First run:

```bash
pnpm run gitflow:doctor
```

Then run:

```bash
pnpm run gitflow:start -- $ARGUMENTS
```

After the worktree is created, report the branch name, path, and next verification command.
