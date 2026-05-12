# Web Design Style Reference Workflow

Use this workflow when a design, deck, prototype, Remotion scene, or motion handoff should actively borrow from mature web/product design languages instead of defaulting to generic AI/Tailwind aesthetics.

## Purpose

The project has multiple style-reference layers:

- `.agents/skills/huashu-design/SKILL.md`: design direction, asset protocol, anti-AI-slop review, high-fidelity HTML/prototype craft.
- project-local `popular-web-designs` skill: 54 real web/product design systems as implementation-ready HTML/CSS style references, including Apple, Stripe, Linear, Vercel, Notion, Claude, Cursor, Airbnb, Spotify, BMW, and more.
- project-local `awesome-design-md` skill: DESIGN.md reference collection for broader brand/design-system source-of-truth documents.
- Project `design/tokens/`: durable project-level palette, typography, spacing, material, component, and motion tokens.
- Project `design/boards/`: chosen visual territories, rationale, references, and rejected directions.
- Project `design/styleframes/`: key frames or page states showing how the style becomes a concrete composition.

The goal is not to copy a brand. The goal is to use mature design systems as taste anchors, token sources, and anti-slop constraints.

## When To Trigger

Use this workflow when the user says or implies:

- "美化一下", "更高级", "更像成熟产品", "不要 AI 味", "网页设计", "landing page", "dashboard", "prototype", "UI mockup".
- A named style: "像 Linear / Vercel / Stripe / Apple / Notion / Claude / Cursor".
- A vague style request: "做几个好看的方向", "选个风格", "设计感强一点".
- A motion/deck/video needs a visual language before implementation.
- Existing output looks generic: purple gradient, rounded cards, emoji icons, random stats, decorative icon clutter, or low-brand-recognition assets.

Skip only for tiny text-only edits or purely mechanical render/tooling tasks.

## Style Source Decision Tree

1. If screenshots, mockups, UI captures, or visual bugs are provided:
   - Use `screenshot-intake` first.
   - Save observations near the image when useful.

2. If a real brand/product/company is named:
   - Use Huashu Design's fact + asset protocol first.
   - Verify current facts.
   - Save facts under `refs/facts/`.
   - Save brand notes under `refs/brand/`.
   - Save actual assets under `assets/brand/`.
   - Only then choose style references.

3. If the user names a style or mature product aesthetic:
   - Load the project-local `popular-web-designs` skill.
   - Pick one or two matching templates.
   - For a formal design-system spec, also load the project-local `awesome-design-md` skill and pick the matching DESIGN.md.

4. If the user wants exploration or the brief is vague:
   - Use Huashu Design's design-direction consultant mode.
   - Offer three clearly different territories.
   - Use `popular-web-designs` templates as concrete implementation anchors for each territory.

5. If the design will become motion/video:
   - Convert the chosen style into motion-safe tokens and a handoff for `create-vibe-motion`.
   - Avoid live DOM/time-based animation assumptions in final Remotion render paths.

## Recommended Style Pairings

Use these as starting points, not hard rules:

- Developer tool / docs / platform: Vercel, Linear, Cursor, Raycast, Mintlify, Supabase, Warp.
- AI product / model launch: Claude, RunwayML, ElevenLabs, Mistral, Together.ai, xAI, VoltAgent.
- Premium product / cinematic launch: Apple, BMW, SpaceX, Superhuman, Revolut.
- Marketing page / SaaS hero: Stripe, Framer, Webflow, Clay, Airbnb.
- Data-dense dashboard: Sentry, Cohere, Kraken, ClickHouse, IBM Carbon.
- Friendly consumer/productivity: Notion, Figma, Miro, Zapier, Intercom, Spotify.
- Editorial/knowledge: Notion, Sanity, Claude, Apple, IBM.

## Design Artifact Contract

When a style reference materially affects the work, record it in the smallest useful place:

- `design/boards/<slug>.md`: chosen style references, why they fit, what to borrow, what to avoid.
- `design/tokens/<slug>.md`: palette, typography, spacing, radius, shadows/materials, component rules, motion tokens.
- `design/styleframes/<slug>.md`: key frames/page states and notes.
- `segments/presets/<slug>.md` or feature config: reusable motion-safe style tokens.

A style board should include:

```markdown
# <Project> Style Board

## Goal

## Selected Style Anchors
|- Anchor | Source | Borrow | Avoid |
|- --- | --- | --- | --- |
|- Linear | popular-web-designs/templates/linear.app.md | dark precision, thin borders, calm hierarchy | copying logo or exact product UI |

## Tokens To Use

## Anti-Slop Rules

## Motion Translation

## Open Assumptions
```

## Motion Translation Rules

Before implementing a selected web style in Remotion or video:

- Convert CSS tokens into JS config/defaults rather than scattering magic values through scenes.
- Translate layout rhythm into frame composition: grid, safe areas, depth, whitespace, and reading order.
- Translate interaction style into frame-accurate motion: easing, delay, stagger, reveal, focus, hold.
- Preserve the brand/style's restraint. Do not add gradients, glow, emoji, icons, or fake stats unless the selected source actually depends on them.
- For named brand-inspired styles, state that the work is inspired by the design language, not affiliated with the brand.

## Verification Checklist

Before handoff or render:

- Did we load and cite the actual style source skill/template when the task requested a style?
- Are real brand/product assets used when recognition matters?
- Are style tokens captured in `design/tokens/`, `design/boards/`, or feature config?
- Is there a concrete anti-slop rule list?
- Is the style translated into deterministic motion-safe parameters?
- Did `pnpm run verify` pass for motion work?
- If HTML/prototype work was produced, was it visually inspected via browser or screenshot?

## Pitfalls

- Do not copy logos, protected UI, or exact brand pages unless the user has rights.
- Do not mix three famous styles at once. Pick one primary anchor and optionally one secondary accent.
- Do not use style references as a substitute for product facts or assets.
- Do not let a mature web style become a static screenshot in motion. Extract the rhythm, hierarchy, and material language into movement.
