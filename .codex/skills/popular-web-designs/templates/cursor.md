# Cursor Style Template

## Use When

AI coding tools, IDE scenes, agent workflows, command palettes, and developer productivity demos.

## Borrow

- Dark IDE surface, code-forward panels, AI command focus.
- Subtle purple/blue gradients, precise editor-like structure.
- Monospace accents and command palette rhythm.

## Avoid

- Copying Cursor logo, exact editor UI, or app chrome.
- Excessive glow, random code, or illegible tiny text.

## Tokens

```js
export const cursorStyle = {
  palette: {
    background: "#0c0d10",
    surface: "#14161b",
    surfaceRaised: "#1c1f26",
    text: "#f5f5f5",
    muted: "#9ca3af",
    border: "#2d3038",
    accent: "#7c3aed",
    accent2: "#38bdf8",
  },
  typography: {
    sans: "Inter, Geist, ui-sans-serif, system-ui, sans-serif",
    mono: "JetBrains Mono, Geist Mono, ui-monospace, monospace",
  },
  radius: { card: 14, pill: 999 },
  shadow: "0 24px 80px rgba(0, 0, 0, 0.4)",
  motion: {
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    staggerFrames: 4,
    revealY: 12,
  },
};
```

## Motion Translation

Use command palette pop, cursor/focus sweep, code panel stagger, and restrained glow only around the active element.
