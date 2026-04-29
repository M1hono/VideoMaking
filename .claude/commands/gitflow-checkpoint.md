---
description: Create a local checkpoint commit on a wip or exp branch
argument-hint: <checkpoint message>
---

Use `.claude/skills/git-delivery-workflow/SKILL.md` and create a local checkpoint only after inspecting the diff.

Run:

```bash
git status --short
git diff --stat
```

If the changes are intended for a local checkpoint, run:

```bash
pnpm run gitflow:checkpoint -- --all "$ARGUMENTS"
```

Do not checkpoint on `main` or push checkpoint commits.
