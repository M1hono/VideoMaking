# Claude Style Template

## Use When

AI assistant/product explainers, thoughtful research interfaces, editorial AI narratives, and warm intelligence scenes.

## Borrow

- Warm terracotta accent and calm editorial layout.
- Readable long-form surfaces and humane spacing.
- Quiet confidence rather than neon AI hype.

## Avoid

- Copying Anthropic/Claude branding, exact chat UI, or implying affiliation.
- Generic purple AI gradients and robot icon filler.

## Tokens

```js
export const claudeStyle = {
  palette: {
    background: "#f8f3ed",
    surface: "#fffaf3",
    surfaceRaised: "#ffffff",
    text: "#2b2118",
    muted: "#76685c",
    border: "#e7d8c8",
    accent: "#c15f3c",
  },
  typography: {
    sans: "Inter, ui-sans-serif, system-ui, sans-serif",
    serif: "Georgia, Charter, ui-serif, serif",
    mono: "JetBrains Mono, ui-monospace, monospace",
  },
  radius: { card: 18, pill: 999 },
  shadow: "0 22px 70px rgba(43, 33, 24, 0.12)",
  motion: {
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    staggerFrames: 6,
    revealY: 14,
  },
};
```

## Motion Translation

Use text-first reveals, soft focus changes, warm surfaces, and steady pacing that preserves readability.
