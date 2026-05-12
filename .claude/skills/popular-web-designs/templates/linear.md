# Linear Style Template

## Use When

Developer tools, AI workflow dashboards, changelog/productivity scenes, command centers, and precise dark UI motion.

## Borrow

- Dark precision and calm hierarchy.
- Thin dividers, compact cards, restrained purple accent.
- Small typography shifts and quiet status labels.
- Strong grid with subtle depth.

## Avoid

- Copying Linear product UI, logo, issue tracker layout, or exact screenshots.
- Heavy glow, bouncy easing, colorful icon clutter.

## Tokens

```js
export const linearStyle = {
  palette: {
    background: "#08090c",
    surface: "#111217",
    surfaceRaised: "#191b22",
    text: "#f7f8f8",
    muted: "#a1a1aa",
    border: "#2a2d36",
    accent: "#8b5cf6",
  },
  typography: {
    sans: "Inter, Geist, ui-sans-serif, system-ui, sans-serif",
    mono: "JetBrains Mono, Geist Mono, ui-monospace, monospace",
  },
  radius: { card: 16, pill: 999 },
  shadow: "0 18px 60px rgba(0, 0, 0, 0.35)",
  motion: {
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    staggerFrames: 4,
    revealY: 12,
  },
};
```

## Motion Translation

Use precise opacity/y reveals, small scale changes, card focus sweeps, and subtle stagger. Avoid elastic movement. End with a clean hold.
