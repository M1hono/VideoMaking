# Screenshots For AI Review

Drop screenshots directly in this folder when the model needs to read visual content.

Image files in this folder are ignored by git by default, so it works as a rough local drop zone. Keep only this `README.md` and `.gitkeep` committed unless a small non-sensitive screenshot is intentionally force-added.

## Usage

1. Put images directly in `refs/screenshots/`, or attach them in chat.
2. Tell the agent the exact file path or attachment label.
3. The agent must inspect the actual image through a visual model/tool, not through terminal metadata.
4. Save observations in a nearby markdown note when useful, for example `refs/screenshots/<slug>.notes.md`.
5. Link those observations from relevant `copy/`, `design/`, `segments/presets/`, or implementation files.

## Note Template

```markdown
# Screenshot Notes: <slug>

- Source: refs/screenshots/<file>
- Date received:
- User goal:
- Related files:

## Visible Content

## Text/OCR

## Layout And Hierarchy

## Color, Type, And Spacing

## Issues Or Opportunities

## Motion/Design Handoff

## Open Questions
```
