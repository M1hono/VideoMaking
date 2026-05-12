# Stripe Style Template

## Use When

SaaS marketing heroes, product capability explainers, payment/data flows, and layered dashboard scenes.

## Borrow

- Soft dimensional cards and elegant light UI.
- Purple/blue accent gradients used sparingly.
- Layered product surfaces with diagonal movement.

## Avoid

- Copying Stripe logo, exact hero composition, or excessive rainbow gradients.
- Making every element glow.

## Tokens

```js
export const stripeStyle = {
  palette: {
    background: "#f6f9fc",
    surface: "#ffffff",
    surfaceRaised: "#ffffff",
    text: "#0a2540",
    muted: "#425466",
    border: "#d6e2ea",
    accent: "#635bff",
    accent2: "#00d4ff",
  },
  typography: {
    sans: "Source Sans 3, Inter, ui-sans-serif, system-ui, sans-serif",
    mono: "JetBrains Mono, ui-monospace, monospace",
  },
  radius: { card: 18, pill: 999 },
  shadow: "0 24px 80px rgba(50, 50, 93, 0.18)",
  motion: {
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    staggerFrames: 5,
    revealY: 18,
  },
};
```

## Motion Translation

Use diagonal layer slides, card parallax, soft fade-up, and data/product surfaces settling into a clean final stack.
