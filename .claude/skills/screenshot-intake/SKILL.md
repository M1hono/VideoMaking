---
name: screenshot-intake
description: Use when the user mentions screenshots, attached images, UI captures, visual bugs, mockups, image references, OCR, or asks the agent to look at an image for copy, design, motion, or implementation decisions.
---

# Screenshot Intake

Use this skill in Claude Code to make screenshots visible to the model and traceable in the project workflow.

## Core Rule

Terminal access is not visual access. The terminal can list files and metadata, but it cannot understand a screenshot. Inspect screenshots only through a model visual input path or an explicit image viewing tool.

## Intake

1. Ask for one of these inputs:
   - attach the screenshot in chat,
   - place it directly under `refs/screenshots/`,
   - or provide an exact local path that the model can open through a visual tool.
2. If the image is local, record the path.
3. Open the actual image visually. Do not infer content from filename, dimensions, or EXIF.
4. Write observations in markdown when useful, for example `refs/screenshots/<slug>.notes.md`.
5. Link the note from any affected `copy/`, `design/`, `segments/presets/`, or implementation files.

## Folder Contract

- `refs/screenshots/`: flat rough storage for screenshots the AI should inspect.
- Image files in `refs/screenshots/` are ignored by git by default.
- Keep only `refs/screenshots/.gitkeep`, `refs/screenshots/README.md`, and optional markdown notes committed unless the user explicitly approves a small non-sensitive screenshot.

Use `docs/screenshot-intake-workflow.md` for the full protocol.

## Observation Notes

Capture:

- source path or attachment label,
- user goal,
- visible UI/content summary,
- text/OCR observations,
- layout and hierarchy observations,
- color/type/spacing observations,
- accessibility or readability issues,
- motion/design implications,
- unresolved questions.

## Do Not

- Do not claim visual inspection when only terminal commands were used.
- Do not rely on OCR unless the image was actually passed to a vision-capable model or OCR tool.
- Do not create screenshot subfolders unless the user explicitly asks for organization later.
- Do not commit screenshot image files from `refs/screenshots/` unless the user explicitly approves a small, non-sensitive reference.
- Do not move screenshots into `assets/images/` unless they become production render assets.

## Verification

When editing this workflow, verify the flat folder and ignore behavior:

```bash
find refs/screenshots -maxdepth 2 -print
git check-ignore refs/screenshots/example.png
git check-ignore refs/screenshots/example.PNG
git check-ignore refs/screenshots/example.jpg
git check-ignore refs/screenshots/example.svg
pnpm run darwin:score -- docs/screenshot-intake-workflow.md
```

Expected evidence: screenshot image paths are ignored, `.gitkeep` and `README.md` remain trackable, and markdown notes remain available for copy/design/motion handoff.

If the workflow improves, log it:

```bash
pnpm run darwin:log -- --target docs/screenshot-intake-workflow.md --old <score> --new <score> --status keep --dimension <dimension> --note "What improved"
```

## Finish

Report:

- screenshots inspected,
- note files created or updated,
- copy/design/motion files affected,
- open questions or missing visual inputs.
