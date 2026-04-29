---
description: Promote a local trace branch into a delivery branch
argument-hint: <feature|fix|docs|chore|motion|media|skill> <slug>
---

Use `.claude/skills/git-delivery-workflow/SKILL.md` and promote the current clean `wip/*` or `exp/*` branch into a delivery branch.

Run:

```bash
pnpm run gitflow:promote -- $ARGUMENTS
```

After promotion, run or recommend:

```bash
pnpm run gitflow:ready -- --base main
```
