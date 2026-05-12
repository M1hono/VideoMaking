#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const STYLE_ANCHORS = {
  linear: {
    name: "Linear",
    category: "developer tool / dark precision",
    borrow: "dark precision, thin borders, restrained purple accent, calm hierarchy, compact cards",
    avoid: "copying Linear product UI, logo, exact gradients, or issue-tracker layouts",
    palette: {
      background: "#08090c",
      surface: "#111217",
      surfaceRaised: "#191b22",
      text: "#f7f8f8",
      muted: "#a1a1aa",
      border: "#2a2d36",
      accent: "#8b5cf6",
    },
    typography: "Inter or Geist-like geometric sans; tight headings; neutral body text",
    motion: "precise fades, small y-shifts, restrained stagger, no bounce",
  },
  vercel: {
    name: "Vercel",
    category: "developer platform / monochrome precision",
    borrow: "black/white clarity, sharp hierarchy, Geist-like type, quiet whitespace, minimal chrome",
    avoid: "using Vercel logos, exact product UI, or overdone grid backgrounds",
    palette: {
      background: "#000000",
      surface: "#0a0a0a",
      surfaceRaised: "#111111",
      text: "#fafafa",
      muted: "#a1a1a1",
      border: "#2a2a2a",
      accent: "#ffffff",
    },
    typography: "Geist or Inter; crisp headings; monospace for code labels",
    motion: "instant-feeling reveals, subtle scale, high contrast cuts, crisp holds",
  },
  stripe: {
    name: "Stripe",
    category: "SaaS marketing / dimensional gradients",
    borrow: "soft dimensional cards, purple-blue gradients, elegant light typography, layered product surfaces",
    avoid: "copying Stripe logo, exact hero, or excessive rainbow gradients",
    palette: {
      background: "#f6f9fc",
      surface: "#ffffff",
      surfaceRaised: "#ffffff",
      text: "#0a2540",
      muted: "#425466",
      border: "#d6e2ea",
      accent: "#635bff",
    },
    typography: "Source Sans 3 or Inter; light large headings; clear product UI labels",
    motion: "smooth diagonal slides, layered parallax, soft easing, product cards settling",
  },
  apple: {
    name: "Apple",
    category: "premium product / cinematic restraint",
    borrow: "premium whitespace, product focus, quiet type, polished materials, cinematic pacing",
    avoid: "copying Apple assets, SF-only assumptions, or unsupported product claims",
    palette: {
      background: "#f5f5f7",
      surface: "#ffffff",
      surfaceRaised: "#fbfbfd",
      text: "#1d1d1f",
      muted: "#6e6e73",
      border: "#d2d2d7",
      accent: "#0071e3",
    },
    typography: "system-ui / SF-like; large confident headings; very restrained labels",
    motion: "slow hero reveal, cinematic holds, subtle depth, no busy ornamentation",
  },
  notion: {
    name: "Notion",
    category: "productivity / warm editorial minimalism",
    borrow: "warm paper surfaces, serif/editorial headings, soft structure, calm productivity",
    avoid: "copying Notion icons, product UI, or fake workspace content",
    palette: {
      background: "#fbfaf8",
      surface: "#ffffff",
      surfaceRaised: "#f7f6f3",
      text: "#37352f",
      muted: "#787774",
      border: "#e9e5df",
      accent: "#2f80ed",
    },
    typography: "Inter/system body with optional editorial serif headings",
    motion: "paper-like reveals, gentle list stagger, calm page transitions",
  },
  claude: {
    name: "Claude",
    category: "AI product / warm editorial intelligence",
    borrow: "warm terracotta accent, editorial spacing, calm intelligence, readable long-form surfaces",
    avoid: "copying Anthropic/Claude branding or exact chat UI",
    palette: {
      background: "#f8f3ed",
      surface: "#fffaf3",
      surfaceRaised: "#ffffff",
      text: "#2b2118",
      muted: "#76685c",
      border: "#e7d8c8",
      accent: "#c15f3c",
    },
    typography: "warm serif or humanist sans for editorial tone; generous line height",
    motion: "quiet text-first reveals, soft focus changes, steady reading rhythm",
  },
  cursor: {
    name: "Cursor",
    category: "AI developer tool / sleek IDE dark",
    borrow: "dark IDE surfaces, code-forward panels, subtle gradients, AI command focus",
    avoid: "copying Cursor logo, exact editor UI, or implying affiliation",
    palette: {
      background: "#0c0d10",
      surface: "#14161b",
      surfaceRaised: "#1c1f26",
      text: "#f5f5f5",
      muted: "#9ca3af",
      border: "#2d3038",
      accent: "#7c3aed",
    },
    typography: "Inter/Geist with JetBrains Mono for code fragments",
    motion: "command palette pop, cursor-like focus sweep, code panel stagger, restrained glow",
  },
};

const args = process.argv.slice(2);
const slug = args.find((arg) => !arg.startsWith("--"));

function valueFor(flag, fallback = null) {
  const prefix = `${flag}=`;
  const inline = args.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = args.indexOf(flag);
  if (index >= 0 && args[index + 1] && !args[index + 1].startsWith("--")) {
    return args[index + 1];
  }
  return fallback;
}

if (!slug) {
  console.error("Usage: pnpm run design:new -- <slug> --style linear --secondary vercel --format video --aspect 16:9 --duration 6");
  process.exit(1);
}

const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "");
const styleKey = valueFor("--style", "linear").toLowerCase();
const secondaryKey = valueFor("--secondary", "");
const format = valueFor("--format", "video");
const aspect = valueFor("--aspect", "16:9");
const duration = valueFor("--duration", "6");
const force = args.includes("--force");

const primary = STYLE_ANCHORS[styleKey] ?? STYLE_ANCHORS.linear;
const secondary = secondaryKey ? STYLE_ANCHORS[secondaryKey.toLowerCase()] : null;

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeNew(path, content) {
  if (existsSync(path) && !force) {
    return { path, written: false, reason: "exists" };
  }
  writeFileSync(path, content);
  return { path, written: true };
}

function paletteTable(palette) {
  return Object.entries(palette).map(([name, value]) => `| ${name} | \`${value}\` | |`).join("\n");
}

const selectedAnchors = [primary, secondary].filter(Boolean);
const anchorRows = selectedAnchors
  .map((anchor) => `| ${anchor.name} | ${anchor.category} | ${anchor.borrow} | ${anchor.avoid} |`)
  .join("\n");

const board = `# ${cleanSlug} Style Board

## Goal

Define a mature, reusable visual direction for \`${cleanSlug}\` before implementation.

## Format

- Target format: ${format}
- Aspect ratio: ${aspect}
- Target duration: ${duration}s
- Primary style anchor: ${primary.name}
${secondary ? `- Secondary style anchor: ${secondary.name}\n` : ""}
## Selected Style Anchors

| Anchor | Category | Borrow | Avoid |
| --- | --- | --- | --- |
${anchorRows}

## Visual Territory

Use ${primary.name} as the dominant style language. Borrow its hierarchy, palette logic, spacing, surface treatment, and motion restraint without copying protected brand assets or implying affiliation.

## Anti-Slop Rules

- Do not add decorative gradients, glow, emoji, fake metrics, or floating cards unless they support the selected style anchor.
- Do not mix more than two mature product styles.
- Do not copy logos, exact product screens, or protected assets.
- Prefer readable hierarchy, strong first frame, and consistent material logic.

## Motion Translation

- Primary motion language: ${primary.motion}.
${secondary ? `- Secondary accent: borrow only small details from ${secondary.name}; do not split the visual identity.\n` : ""}- Translate web interactions into deterministic frame math: reveal, stagger, focus, hold, settle.
- Keep tokens reusable in \`design/tokens/${cleanSlug}.md\` and \`segments/presets/${cleanSlug}.md\`.

## Open Assumptions

- Replace draft copy, product facts, and assets before final render.
- Confirm usage rights for any real brand or product assets.
`;

const tokens = `# ${cleanSlug} Design Tokens

## Style Anchors

| Anchor | Borrow | Avoid |
| --- | --- | --- |
${selectedAnchors.map((anchor) => `| ${anchor.name} | ${anchor.borrow} | ${anchor.avoid} |`).join("\n")}

## Palette

| Token | Value | Usage |
| --- | --- | --- |
${paletteTable(primary.palette)}

## Typography

- Primary direction: ${primary.typography}.
- Use 2-3 type levels for motion readability.
- Keep captions and labels large enough for ${aspect} output.

## Layout And Grid

- Use strong safe areas and a clear visual center.
- Prefer one dominant focal object per scene.
- Use consistent spacing increments: 8, 12, 16, 24, 32, 48, 64.

## Surfaces And Materials

- Background: ${primary.palette.background}
- Base surface: ${primary.palette.surface}
- Raised surface: ${primary.palette.surfaceRaised}
- Border: ${primary.palette.border}
- Accent: ${primary.palette.accent}

## Components

- Hero headline block.
- Product/card surface.
- Small metadata pill or label.
- Optional code/data/media panel when relevant.

## Motion Tokens

- Reveal: ${primary.motion}
- Default easing: cubic-bezier(0.22, 1, 0.36, 1)
- Stagger: 3-6 frames for dense UI, 8-12 frames for hero elements.
- Hold: keep final readable composition on screen for at least 20% of scene duration.

## Remotion-Safe Token Object

\`\`\`js
export const ${cleanSlug.replace(/-([a-z])/g, (_, char) => char.toUpperCase())}Style = ${JSON.stringify({
  anchors: selectedAnchors.map((anchor) => anchor.name),
  palette: primary.palette,
  typography: primary.typography,
  motion: primary.motion,
  aspect,
  durationSeconds: Number(duration),
}, null, 2)};
\`\`\`
`;

const styleframe = `# ${cleanSlug} Styleframes

## First Frame

- Establish the ${primary.name} visual language immediately.
- One clear headline or focal object.
- No decorative filler.

## Hero Frame

- Use the accent color ${primary.palette.accent} sparingly for attention.
- Use surface contrast between ${primary.palette.background} and ${primary.palette.surfaceRaised}.
- Ensure text hierarchy reads at thumbnail size.

## Final Hold

- Resolve to a clean, stable composition.
- Leave enough hold time for reading and CTA recognition.

## Review Notes

- Compare against \`design/boards/${cleanSlug}.md\`.
- Verify tokens from \`design/tokens/${cleanSlug}.md\` appear in implementation.
`;

const preset = `# ${cleanSlug} Motion Preset

## Inputs

- Style board: design/boards/${cleanSlug}.md
- Tokens: design/tokens/${cleanSlug}.md
- Styleframes: design/styleframes/${cleanSlug}.md
- Format: ${format}
- Aspect ratio: ${aspect}
- Duration: ${duration}s

## Scene Beats

| Beat | Duration | Visual Intent | Motion |
| --- | ---: | --- | --- |
| Setup | 20% | Establish ${primary.name} visual language | ${primary.motion} |
| Main | 55% | Present the core idea or product surface | deterministic stagger and focus |
| Settle | 25% | Resolve to readable final hold | subtle settle, no live-time drift |

## Implementation Notes

- Convert tokens into feature defaults before writing scene code.
- Keep runtime files generic.
- Avoid Date.now(), unseeded Math.random(), requestAnimationFrame, or DOM-mutating timelines in Remotion render paths.
- Report selected anchors in the final handoff.

## Verification

- pnpm run skills:design:check
- pnpm run workflow:doctor -- --verify
- Render or inspect representative frames when this preset becomes a motion output.
`;

for (const dir of ["design/boards", "design/tokens", "design/styleframes", "segments/presets"]) {
  ensureDir(dir);
}

const results = [
  writeNew(join("design/boards", `${cleanSlug}.md`), board),
  writeNew(join("design/tokens", `${cleanSlug}.md`), tokens),
  writeNew(join("design/styleframes", `${cleanSlug}.md`), styleframe),
  writeNew(join("segments/presets", `${cleanSlug}.md`), preset),
];

console.log(JSON.stringify({
  ok: true,
  slug: cleanSlug,
  style: primary.name,
  secondary: secondary?.name ?? null,
  format,
  aspect,
  duration_seconds: Number(duration),
  files: results,
}, null, 2));
