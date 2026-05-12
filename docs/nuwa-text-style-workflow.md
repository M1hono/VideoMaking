# Nuwa Text Style Workflow

Use this workflow when copy needs style transfer, polishing, humanization, tone control, voice profiles, or channel-specific optimization for scripts, captions, decks, CTAs, landing pages, or narration.

This project adapts the concept from `https://github.com/alchaincyf/nuwa-skill`: extract reusable expression DNA from examples, then apply it to a concrete task with facts and boundaries intact.

## Folder Contract

- `refs/style/`: style source notes, source URLs, sample inventory, observations, and permission/licensing notes.
- `copy/styles/`: reusable voice DNA profiles and style guides.
- `copy/revisions/`: before/after rewrites, rationale, rejected variants, and approval notes.
- `copy/prompts/`: reusable rewrite prompts and transformation recipes.
- `copy/messaging/`, `copy/scripts/`, `copy/captions/`, and `copy/voiceover/`: final channel-specific copy.

## Use When

- The user asks for text stylization, polishing, rewrite, compression, humanization, localization, or tone adjustment.
- A script, deck, caption, CTA, or landing page feels generic.
- A brand/founder/public-source style should inform copy without pretending authorship.
- A video or Slidev deck needs stronger hooks, rhythm, or spoken cadence.

## Voice DNA Profile

Create `copy/styles/<slug>.md` when style should be reused. Capture:

- target audience and context,
- intent and emotional temperature,
- sentence rhythm and density,
- vocabulary/register,
- rhetorical moves and narrative structure,
- clarity and compression rules,
- useful signature devices,
- anti-patterns,
- factual boundaries,
- best-fit channels.

## Production Loop

1. Collect source examples or user-provided drafts.
2. Save source observations under `refs/style/` when the style source should be traceable.
3. Build or update a reusable voice profile in `copy/styles/`.
4. Rewrite in passes: meaning preservation, clarity, style, channel fit, then final polish.
5. Save before/after variants in `copy/revisions/` when iteration matters.
6. Hand final text to `copy-design-planner`, `slidev-rich-media`, PowerPoint, or `create-vibe-motion`.
7. Capture reusable lessons with Darwin when the style workflow improves.

## Deterministic Rewrite Contract

For repeatable text optimization, record the inputs:

- source draft path,
- voice profile path,
- target channel and length,
- locked facts and approved claims,
- prohibited language,
- requested variant set,
- final chosen version.

Do not rewrite from memory when a profile exists. Update the profile or revision note first, then produce the new text. If multiple agents touch the same copy, keep the latest approved version in `copy/revisions/` with a short rationale.

## Boundaries

- Preserve claims and facts. Do not invent metrics, dates, specs, endorsements, or product status.
- Avoid long verbatim reuse from copyrighted sources; summarize style traits instead.
- For living people or recognizable public figures, describe the output as inspired by public style traits or a voice profile. Do not impersonate or claim the person wrote it.
- Compress aggressively for on-screen text; optimize for cadence and breath points for voiceover.
- For motion or deck output, keep text payloads stable after timing/layout approval unless a revision note explains why the timing changed.

## Verification

```bash
rg -n "voice|tone|style|source|claim|before|after|CTA|caption|script|headline|deck|slide" copy refs/style slides 2>/dev/null
pnpm run darwin:score -- docs/nuwa-text-style-workflow.md
```

## Source

- Nuwa Skill: https://github.com/alchaincyf/nuwa-skill
