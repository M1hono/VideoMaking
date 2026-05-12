# Persona Skill Workflow

Use persona/perspective skills as optional advisory lenses for writing, product thinking, AI education, content strategy, risk review, and decision critique.

## Storage Policy

Do not commit distilled full persona skills by default.

- External persona skills installed by `npx skills add` live under `.agents/skills/` and are ignored by git.
- Claude Code symlinks for external perspective skills live under `.claude/skills/*-perspective` and are ignored by git.
- Commit only `skills-lock.json`, install scripts, docs, and project-specific lightweight profiles under `copy/styles/` or `refs/style/`.
- Commit a full distilled persona skill only when it is project-owned, license/permission is clear, and the skill is intended to be maintained as part of this repository.
- External Nuwa/persona/perspective skills must be universal `.agents/skills` installs that include Codex. Do not leave them as Claude-only symlinks.

Project-maintained workflow skills are different: every Claude Code skill must have a matching Codex skill. Run:

```bash
pnpm run skills:check-sync
```

This check also verifies that every skill in `skills-lock.json`, including `huashu-nuwa` and the installed perspective pack, appears in `skills:list` with `Codex` support.

## Installed Perspective Pack

Default install command:

```bash
pnpm run skills:add:personas
```

Included:

- Paul Graham: startup, writing, product, life philosophy.
- Zhang Yiming: product, organization, globalization, talent.
- Andrej Karpathy: AI, engineering, education, open source.
- Ilya Sutskever: AI safety, scaling, research taste.
- MrBeast: content creation and YouTube retention methods.
- Trump: negotiation, power, communication analysis, public behavior prediction.
- Steve Jobs: product, design, strategy.
- Elon Musk: engineering, cost, first principles.
- Charlie Munger: investment, mental models, inversion.
- Richard Feynman: learning, teaching, scientific thinking.
- Naval Ravikant: wealth, leverage, life philosophy.
- Nassim Taleb: risk, antifragility, uncertainty.

Excluded by default:

- Zhang Xuefeng style career-planning personas and similar narrow education/admissions voices, because they are usually less useful for science/tutorial copy, product videos, and rich media generation.

Optional install:

```bash
node tools/install-skill-pack.mjs personas --include-optional
```

## Darwin Global Install

Install the upstream Darwin skill globally:

```bash
pnpm run skills:add:darwin:global
```

This complements the project-local Darwin workflow in `tools/darwin-motion.mjs` and `.codex/skills/darwin-motion-evolver/`.

## Usage Rules

- Treat personas as perspective lenses, not identity claims.
- Do not claim a living person wrote, reviewed, endorsed, or would certainly say the generated text.
- For public figures, phrase outputs as "using this perspective" or "inspired by this decision framework".
- For political/public behavior personas, use them for analysis, negotiation pattern review, or behavior prediction. Do not use them for targeted political persuasion, deception, or impersonation.
- For final scripts, decks, captions, and voiceover, route text through `nuwa-text-refiner` when style needs to be adapted into a stable project voice.

## Verification

```bash
pnpm run skills:list
rg -n "perspective|persona|skills:add:personas|skills:add:darwin:global|copy/styles|refs/style" AGENTS.md CLAUDE.md docs package.json skills-lock.json
```
