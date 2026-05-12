# Vercel Style Template

## Use When

Developer platforms, deployment stories, minimal product launches, docs, and black/white precision scenes.

## Borrow

- Monochrome contrast and crisp hierarchy.
- Geist-like typography, sharp spacing, quiet chrome.
- Minimal cards and command/output surfaces.

## Avoid

- Copying Vercel logo, exact product UI, or implying affiliation.
- Overusing grid backgrounds or fake terminal noise.

## Tokens

```js
export const vercelStyle = {
  palette: {
    background: "#000000",
    surface: "#0a0a0a",
    surfaceRaised: "#111111",
    text: "#fafafa",
    muted: "#a1a1a1",
    border: "#2a2a2a",
    accent: "#ffffff",
  },
  typography: {
    sans: "Geist, Inter, ui-sans-serif, system-ui, sans-serif",
    mono: "Geist Mono, JetBrains Mono, ui-monospace, monospace",
  },
  radius: { card: 12, pill: 999 },
  shadow: "0 20px 70px rgba(255, 255, 255, 0.06)",
  motion: {
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    staggerFrames: 3,
    revealY: 8,
  },
};
```

## Motion Translation

Use crisp cuts, subtle fades, exact alignment, and short holds. Let contrast and spacing carry the premium feel.
