# Video Workflow Evolution Rubric

Score each target from 0 to 100. Use dry-run evidence when live testing is not practical.

| Dimension | Weight | What Good Looks Like |
|---|---:|---|
| Trigger and purpose clarity | 10 | The target clearly says when to use it and what problem it solves. |
| Workflow specificity | 15 | Steps are executable, ordered, and include inputs/outputs. |
| Motion/video domain coverage | 15 | Covers relevant video directions: motion design, render, assets, polish, snippets, or feature integration. |
| Determinism and safety | 15 | Avoids live-time drift, unseeded randomness, destructive edits, and untracked generated files. |
| Reuse and parameterization | 15 | Promotes presets, reusable snippets, configurable props, templates, or scripts. |
| Verification strength | 15 | Defines concrete commands, visual checks, smoke tests, or scoring evidence. |
| Project fit | 10 | Fits the Vibe Motion scaffold, root workspace layout, and pnpm workflow. |
| Learning capture | 5 | Captures reusable lessons in `evolution/`, docs, snippets, or skills. |

Minimum bar:

- 80+: good reusable asset.
- 70-79: usable, but has an obvious weak dimension.
- 60-69: needs targeted improvement before relying on it.
- below 60: redesign or split the target.

Ratchet rule:

- Keep a change only when the weighted score increases or strong user evidence justifies the change.
- If scoring is equal, prefer the smaller and clearer version.
- If the change adds complexity without improving evidence, revert that round.
