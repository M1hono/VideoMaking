# Screenshot Intake Workflow

Use this workflow whenever screenshots, UI captures, visual references, mockups, visual bugs, or image-based feedback should inform copy, design, or motion work.

The important rule: the terminal can list image files and inspect metadata, but it cannot understand image content. The model must receive the screenshot through a visual channel, or the agent must ask the user to attach/provide the image in a way the model can see.

## Purpose

This is the screenshot intake layer for the video and motion workflow. Use it when a screenshot should affect messaging, design review, styleframes, UI demo motion, render fixes, visual QA, or implementation decisions.

## Folder

- `refs/screenshots/`: rough local drop zone for screenshots the AI should read.

Keep this folder flat. Do not create `inbox/`, `sets/`, `notes/`, or other subfolders unless the user explicitly asks for organization later.

Image files in `refs/screenshots/` are ignored by git by default. The committed folder exists through `refs/screenshots/.gitkeep` and `refs/screenshots/README.md`.

Use `assets/images/` only when an image becomes a production asset used in the render.

## Intake Protocol

1. Ask the user to attach the screenshot in chat, or place it directly under `refs/screenshots/` and mention the exact path.
2. If the image is already in the repository, list paths with terminal commands, but do not infer visual content from filenames.
3. Open the image through the model's visual input path:
   - attached image in the conversation,
   - a local image viewing tool when available,
   - or a platform-specific image attachment workflow.
4. Write observations in markdown when useful, for example `refs/screenshots/<slug>.notes.md`.
5. Link the observations from `copy/`, `design/`, `segments/presets/`, or implementation files that depend on the screenshot.

## What To Record

For each screenshot, capture:

- source path or attachment label,
- date received,
- user goal,
- visible UI/content summary,
- text/OCR observations,
- layout and hierarchy observations,
- color/type/spacing observations,
- accessibility or readability issues,
- motion/design implications,
- unresolved questions.

## Agent Rules

- Do not say you inspected a screenshot if only terminal metadata was available.
- Do not rely on OCR unless the image was actually passed to a vision-capable model or OCR tool.
- Avoid adding subfolders under `refs/screenshots/`; this folder is intentionally rough and flat.
- Do not commit screenshot image files from `refs/screenshots/` unless the user explicitly approves a small, non-sensitive reference.
- Keep screenshot notes in markdown even when the image itself stays local and ignored.

## Handoff

When screenshots affect motion work, the handoff should include:

- screenshot note path if one exists,
- relevant screenshot path or attachment label,
- copy/design files affected,
- visual issues to preserve or fix,
- render or preview verification needed.

For design-heavy work, connect screenshot observations to `design/boards/`, `design/styleframes/`, `design/layouts/`, or `design/reviews/`.

## Verification

Use these checks after changing the screenshot workflow:

```bash
find refs/screenshots -maxdepth 2 -print
git check-ignore refs/screenshots/example.png
git check-ignore refs/screenshots/example.PNG
git check-ignore refs/screenshots/example.jpg
git check-ignore refs/screenshots/example.svg
git status --short --ignored
pnpm run darwin:score -- docs/screenshot-intake-workflow.md
```

Expected evidence:

- `refs/screenshots/` contains no required subfolders.
- screenshot image paths are ignored by git.
- `refs/screenshots/.gitkeep` and `refs/screenshots/README.md` remain trackable.
- markdown notes such as `refs/screenshots/example.notes.md` remain trackable.

For reusable improvements, log the result:

```bash
pnpm run darwin:log -- --target docs/screenshot-intake-workflow.md --old <score> --new <score> --status keep --dimension <dimension> --note "What improved"
```
