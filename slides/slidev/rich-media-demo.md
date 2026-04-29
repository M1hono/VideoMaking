---
theme: default
title: Rich Media Generator Demo
info: |
  A default Slidev deck for the VideoMaking workspace.
transition: slide-left
mdc: true
drawings:
  persist: false
---

# Rich Media Generator

Motion, copy, design, screenshots, decks, and exports in one workflow.

<div class="mt-10 grid grid-cols-3 gap-4 text-left">
  <div class="rounded-lg border border-sky-300/30 bg-sky-300/10 p-4">
    <div class="text-sm opacity-70">Input</div>
    <div class="text-xl font-bold">copy + screenshots + assets</div>
  </div>
  <div class="rounded-lg border border-emerald-300/30 bg-emerald-300/10 p-4">
    <div class="text-sm opacity-70">Build</div>
    <div class="text-xl font-bold">Slidev + Remotion + skills</div>
  </div>
  <div class="rounded-lg border border-fuchsia-300/30 bg-fuchsia-300/10 p-4">
    <div class="text-sm opacity-70">Output</div>
    <div class="text-xl font-bold">PDF + PPTX + PNG + web</div>
  </div>
</div>

---
layout: two-cols
---

# Why Slidev

- Markdown-first deck authoring
- Vue components and HTML/CSS for rich slides
- presenter mode and web-native preview
- export to PDF, PNG, PPTX, or static site
- good fit for fast iteration before or alongside video

::right::

<div class="h-full flex items-center justify-center">
  <div class="w-full max-w-sm border border-slate-300/30 p-5 text-left">
    <div class="mb-4 text-sm uppercase tracking-wide opacity-60">Deck Pipeline</div>
    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="h-2 w-16 bg-cyan-400"></div>
        <span>Markdown story</span>
      </div>
      <div class="flex items-center gap-3">
        <div class="h-2 w-24 bg-emerald-400"></div>
        <span>HTML/CSS rich media</span>
      </div>
      <div class="flex items-center gap-3">
        <div class="h-2 w-20 bg-amber-400"></div>
        <span>Snapshot exports</span>
      </div>
      <div class="flex items-center gap-3">
        <div class="h-2 w-28 bg-fuchsia-400"></div>
        <span>PowerPoint handoff</span>
      </div>
    </div>
  </div>
</div>

---
layout: center
class: text-center
---

# PowerPoint Positioning

Slidev PPTX export is for visual snapshots.

Editable PowerPoint authoring remains a separate PowerPoint workflow.

---

# Production Loop

1. Put screenshots in `refs/screenshots/`
2. Draft copy and story in `copy/`
3. Shape design in `design/`
4. Build rich slides in `slides/slidev/`
5. Render video in Remotion when motion output is needed
6. Capture reusable lessons with Darwin

---
layout: end
---

# Export Targets

```bash
pnpm run slidev:export:pdf
pnpm run slidev:export:pptx
pnpm run slidev:export:png
pnpm run slidev:build
```

Generated files land in `slides/exports/`.
