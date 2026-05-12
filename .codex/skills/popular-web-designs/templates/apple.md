# Apple Style Template

## Use When

Premium product reveals, cinematic launch frames, hardware/software hero scenes, and minimal high-end typography.

## Borrow

- Whitespace, product focus, quiet type, cinematic pacing.
- Smooth material transitions and restrained accent color.
- Strong first frame and long readable holds.

## Avoid

- Copying Apple assets, UI, product claims, or launch page structure.
- Busy gradients, fake glass, and unnecessary labels.

## Tokens

```js
export const appleStyle = {
  palette: {
    background: "#f5f5f7",
    surface: "#ffffff",
    surfaceRaised: "#fbfbfd",
    text: "#1d1d1f",
    muted: "#6e6e73",
    border: "#d2d2d7",
    accent: "#0071e3",
  },
  typography: {
    sans: "-apple-system, BlinkMacSystemFont, SF Pro Display, Inter, system-ui, sans-serif",
    mono: "SFMono-Regular, ui-monospace, monospace",
  },
  radius: { card: 28, pill: 999 },
  shadow: "0 30px 100px rgba(0, 0, 0, 0.12)",
  motion: {
    ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    staggerFrames: 8,
    revealY: 24,
  },
};
```

## Motion Translation

Use slow hero reveals, scale/depth restraint, cinematic hold time, and minimal text. One focal object per scene.
