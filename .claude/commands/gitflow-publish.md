---
description: Publish a verified delivery branch to origin
argument-hint: "[--base main] --yes"
---

Use `.claude/skills/git-delivery-workflow/SKILL.md` and publish only if the branch is clean, verified, and not `main`, `wip/*`, or `exp/*`.

Run:

```bash
pnpm run gitflow:publish -- $ARGUMENTS
```

If the command refuses to publish, explain the exact gate that failed and do not bypass it.
