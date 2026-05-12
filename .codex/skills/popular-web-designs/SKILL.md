---
name: popular-web-designs
description: Project-local web/product design style anchors for VideoMaking. Use when the user asks for web/UI polish, landing pages, dashboards, mature product aesthetics, anti-AI-slop refinement, or named styles like Linear, Vercel, Stripe, Apple, Notion, Claude, Cursor, Airbnb, Spotify, BMW, or SpaceX.
version: 1.0.0
license: MIT
---

# Popular Web Designs

Project-local, multi-agent style anchor skill for VideoMaking. This keeps mature web/product visual languages available inside the repository instead of depending on a global Hermes install.

Use this with `docs/web-design-style-workflow.md`.

## Core Rule

Do not copy a brand or imply affiliation. Borrow the design language: palette logic, typography rhythm, spacing, material, component grammar, layout hierarchy, and motion restraint.

## Workflow

1. Choose one primary style anchor and, at most, one secondary accent.
2. Record the choice in `design/boards/<slug>.md`.
3. Convert reusable decisions into `design/tokens/<slug>.md` or feature config.
4. For motion/video, translate interaction style into deterministic frame math: easing, stagger, reveal, focus, hold, depth, and safe areas.
5. Before implementation, write anti-slop rules: what not to add.

## Recommended Pairings

- Developer tool / docs / platform: Vercel, Linear, Cursor, Raycast, Mintlify, Supabase, Warp.
- AI product / model launch: Claude, RunwayML, ElevenLabs, Mistral, Together.ai, xAI, VoltAgent.
- Premium cinematic product: Apple, BMW, SpaceX, Superhuman, Revolut.
- Marketing SaaS hero: Stripe, Framer, Webflow, Clay, Airbnb.
- Data-dense dashboard: Sentry, Cohere, Kraken, ClickHouse, IBM Carbon.
- Friendly consumer/productivity: Notion, Figma, Miro, Zapier, Intercom, Spotify.
- Editorial/knowledge: Notion, Sanity, Claude, Apple, IBM.

## Anchor Catalog

### AI and Machine Learning

- Claude: warm editorial, terracotta accent, spacious reading hierarchy, restrained surfaces.
- Cohere: vibrant data-rich gradients, dashboard energy, technical but colorful.
- ElevenLabs: dark cinematic audio UI, waveform language, glossy black surfaces.
- Mistral: engineered minimalism, purple tones, crisp European technical feel.
- Ollama: terminal-first monochrome simplicity.
- RunwayML: cinematic dark media layout, creator-tool polish.
- Together.ai: technical blueprint style, infrastructure confidence.
- xAI: stark monochrome, futuristic minimalism, monospace edge.
- VoltAgent: void-black canvas, emerald terminal-native accent.

### Developer Tools and Platforms

- Vercel: black/white precision, Geist-like type, sharp minimal hierarchy.
- Linear: ultra-minimal dark mode, thin borders, precise spacing, purple accent.
- Cursor: sleek dark IDE surface, subtle gradients, code-forward composition.
- Raycast: dark chrome, command-palette feel, vibrant gradient highlights.
- Supabase: dark emerald developer tooling, code/database UI grammar.
- Sentry: dark dashboard, data dense, pink-purple accent.
- Mintlify: clean docs, green accent, reading-optimized structure.
- Warp: dark terminal blocks, command UI, keyboard productivity.
- Resend: minimal dark, monospace accents, email/dev platform confidence.
- Expo: dark code-centric product docs, tight type.

### SaaS, Design, and Productivity

- Stripe: purple gradients, soft dimensional cards, elegant light typography.
- Framer: bold black/blue, motion-first, design-forward marketing.
- Webflow: polished blue-accent marketing, visual-builder energy.
- Notion: warm minimalism, serif/editorial headings, soft paper surfaces.
- Figma: vibrant multi-color, collaborative and playful but professional.
- Miro: yellow infinite-canvas energy, workshop/collaboration feel.
- Airtable: colorful structured data, friendly database UI.
- Clay: organic shapes, soft gradients, art-directed layout.
- Intercom: friendly blue conversational product UI.
- Zapier: warm orange automation/connector language.

### Fintech and Data

- Coinbase: clean institutional blue, trust, simple financial hierarchy.
- Kraken: purple dark data dashboards, exchange density.
- Revolut: sleek fintech dark cards, gradient surfaces, precision.
- Wise: bright green, friendly clarity, accessible finance.
- ClickHouse: yellow technical docs/dashboard, high-performance data tone.

### Premium, Consumer, and Enterprise

- Apple: premium whitespace, cinematic product focus, quiet type, polished restraint.
- BMW: dark premium engineering surfaces, precision, contrast, metallic feel.
- SpaceX: stark black/white full-bleed imagery, aerospace futurism.
- Airbnb: warm coral, photography-driven, rounded friendly UI.
- Spotify: vibrant green on black, bold type, album-art-driven rhythm.
- Uber: black/white urban energy, tight typography.
- IBM: Carbon-like structure, blue enterprise palette, disciplined grids.
- NVIDIA: green/black technical power, GPU/AI performance tone.

## Token Capture Template

```markdown
# <Project> Style Tokens

## Style Anchors
|- Anchor | Borrow | Avoid |
|- --- | --- | --- |
|- Linear | dark precision, thin dividers, restrained purple focus | copying product UI or logo |

## Palette

## Typography

## Layout and Grid

## Surfaces and Materials

## Components

## Motion Translation

## Anti-Slop Rules
```

## Anti-Slop Defaults

- No random purple gradient unless the selected anchor actually uses it.
- No emoji-as-icon filler in premium/developer contexts.
- No fake analytics numbers unless the storyboard needs them.
- No excessive glow, glassmorphism, or floating blobs by default.
- No mixing more than two mature styles.


## Project Verification

For this repository, run these after changing this skill or using it for a reusable style handoff:

```bash
pnpm run skills:design:check
pnpm run workflow:doctor
pnpm run verify
```

If the style becomes a motion/video implementation, also inspect rendered frames or thumbnails and report the selected anchors in the final handoff.

## Darwin Learning

When a web/product style pattern proves reusable, capture it project-locally instead of relying on global memory:

```bash
pnpm run darwin:capture -- --target .codex/skills/popular-web-designs/SKILL.md --domain design --trigger "When this style pattern appears" --lesson "Reusable style/motion rule" --evidence "Design board, tokens, render, or user feedback"
```
