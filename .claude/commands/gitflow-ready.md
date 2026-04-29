---
description: Run the delivery readiness gate for the current branch
argument-hint: "[--base main] [--no-verify]"
---

Use `.claude/skills/git-delivery-workflow/SKILL.md`, then run the delivery gate for the current branch.

```bash
pnpm run gitflow:ready -- $ARGUMENTS
```

Summarize whether the branch is clean, based on the requested base, verified, and ready to promote or publish.
