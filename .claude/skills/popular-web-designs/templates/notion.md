# Notion Style Template

## Use When

Knowledge products, productivity explainers, docs, editorial dashboards, calm workflow or note-taking scenes.

## Borrow

- Warm paper surfaces, soft structure, editorial calm.
- Serif or humanist headings paired with simple UI text.
- Gentle list hierarchy and readable blocks.

## Avoid

- Copying Notion icons, product UI, workspace chrome, or exact templates.
- Overly dark cyber styling or noisy gradients.

## Tokens

```js
export const notionStyle = {
  palette: {
    background: "#fbfaf8",
    surface: "#ffffff",
    surfaceRaised: "#f7f6f3",
    text: "#37352f",
    muted: "#787774",
    border: "#e9e5df",
    accent: "#2f80ed",
  },
  typography: {
    sans: "Inter, ui-sans-serif, system-ui, sans-serif",
    serif: "Georgia, Charter, ui-serif, serif",
    mono: "ui-monospace, SFMono-Regular, monospace",
  },
  radius: { card: 10, pill: 999 },
  shadow: "0 18px 50px rgba(55, 53, 47, 0.08)",
  motion: {
    ease: "cubic-bezier(0.25, 1, 0.5, 1)",
    staggerFrames: 5,
    revealY: 10,
  },
};
```

## Motion Translation

Use page-like reveals, list item stagger, soft scroll-free transitions, and calm reading rhythm.
