---
name: nuwa-text-refiner
description: Use when the user asks to stylize, polish, optimize, humanize, localize, rewrite, or adapt text; create a voice/style DNA profile; improve scripts, captions, deck copy, CTAs, landing-page copy, brand voice, founder-style writing, or public-source-inspired prose while preserving facts and avoiding impersonation claims.
---

# Nuwa Text Refiner

Use this skill in Claude Code as the text style and expression-optimization layer in the VideoMaking workflow. It adapts the Nuwa-style idea from `https://github.com/alchaincyf/nuwa-skill`: distill reusable expression DNA from source material, then apply it to concrete copy.

## Core Rule

Distill style, do not pretend authorship. Preserve factual meaning, legal/brand constraints, and user-approved claims. Do not claim that a brand, founder, creator, or public figure wrote or endorsed the output unless the user provided that fact.

## Start

Inspect existing copy and style context:

```bash
rg -n "style|voice|tone|rewrite|headline|hook|caption|script|CTA|brand|Nuwa|风格|润色|文风|话术" copy refs design slides docs AGENTS.md CLAUDE.md 2>/dev/null
```

If the style source is a concrete person, brand, product, current campaign, or public entity, verify current sources first and save notes under `refs/style/` or `refs/facts/`. Prefer user-provided text samples when available.

## Artifact Choice

Create the smallest useful artifact:

- `refs/style/<slug>.md`: source inventory, URLs, dates, sample types, observations, and licensing/permission notes.
- `copy/styles/<slug>.md`: reusable voice DNA profile.
- `copy/revisions/<slug>.md`: before/after rewrites, rationale, and rejected options.
- `copy/prompts/<slug>.md`: reusable prompt or transformation recipe.
- `copy/scripts/<slug>.md`, `copy/captions/<slug>.md`, or `copy/messaging/<slug>.md`: final user-facing text.

## Voice DNA Profile

Capture only reusable traits:

- audience and context,
- intent and emotional temperature,
- sentence rhythm and density,
- vocabulary/register,
- rhetorical moves and story structure,
- clarity/compression rules,
- signature devices worth reusing,
- anti-patterns and prohibited language,
- factual boundaries and source constraints,
- channel fit: video script, subtitles, Slidev deck, PowerPoint, landing page, social caption, or voiceover.

## Rewrite Flow

1. Preserve meaning: identify claims, facts, constraints, and non-negotiable phrases.
2. Diagnose the draft: unclear promise, weak hook, generic phrasing, rhythm issues, audience mismatch, or channel mismatch.
3. Apply the voice profile: rewrite structure, diction, rhythm, transitions, and emphasis.
4. Produce useful variants when helpful: clean, sharper, bolder, quieter, shorter, more spoken, more premium, or more direct.
5. Save before/after and rationale in `copy/revisions/` when the change should be traceable.
6. Hand approved text to `copy-design-planner`, `slidev-rich-media`, PowerPoint, or `create-vibe-motion`.

## Deterministic Rewrite Contract

For repeatable refinement, record:

- source draft path,
- voice profile path,
- target channel and length,
- locked facts and approved claims,
- prohibited language,
- requested variant set,
- final chosen version.

Do not rewrite from memory when a profile exists. Update the profile or revision note first, then produce the new text. For motion or deck output, keep approved text stable after timing/layout approval unless a revision note explains the change.

## Safety And Quality

- Do not invent claims, metrics, dates, specs, endorsements, awards, or product status.
- Avoid long verbatim reuse from copyrighted sources; summarize style traits instead.
- For living people or recognizable public figures, write "inspired by public style traits" or "following this voice profile"; do not impersonate or claim identity.
- Keep on-screen text shorter than prose. Deck headlines and video captions need compression.
- For voiceover, optimize for speech: cadence, breath points, pronunciation, and timing.

## Verification

Run:

```bash
rg -n "voice|tone|style|source|claim|before|after|CTA|caption|script|headline|deck|slide" copy refs/style slides 2>/dev/null
pnpm run darwin:score -- .claude/skills/nuwa-text-refiner/SKILL.md
```

When a reusable style or rewrite pattern emerges, capture it:

```bash
pnpm run darwin:capture -- --target .claude/skills/nuwa-text-refiner/SKILL.md --domain copy --lesson "Reusable style/refinement lesson" --evidence "What proved it"
```

## Finish

Report:

- style source or profile used,
- copy/style files created or updated,
- key rewrite decisions,
- factual assumptions or source gaps,
- next handoff path.
