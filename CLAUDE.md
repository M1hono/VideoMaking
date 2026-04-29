# VideoMaking

Project-scoped workspace for assisted motion design, reusable Remotion scenes, high-fidelity visual prototypes, media polishing, and evolving agent workflows.

## Purpose

Use this file when Claude Code opens this repository, especially for video, animation, visual design direction, render tooling, reusable snippets, media polish, workflow evolution, or Git delivery decisions.

## Quick Reference

- Package manager: `pnpm`; do not use Yarn.
- App workspace: `vibe-motion-app`.
- Verify: `pnpm run verify`.
- Preview: `pnpm run dev` or `pnpm run studio`.
- Motion stack check: `pnpm run motion:stack`.
- Git workflow check: `pnpm run gitflow:doctor`.

## Reusable Folders

- Assets and references: `assets/`, `refs/`.
- Copy and design inputs: `copy/`, `design/`.
- Reusable code and presets: `snippets/`, `segments/presets/`, `vibe-motion-app/shared/features/`.
- Local and final outputs: `segments/`, `renders/`.
- Workflow learning: `evolution/`, `.codex/skills/`, `.claude/skills/`.

## Required Project Context

Read these project instructions before implementation work:

- Full agent rules: @AGENTS.md
- Copy and design workflow: @docs/copy-design-workflow.md
- Git delivery workflow: @docs/git-development-workflow.md
- Claude Code copy/design skill: @.claude/skills/copy-design-planner/SKILL.md
- Claude Code Git skill: @.claude/skills/git-delivery-workflow/SKILL.md

## Claude Code Workflow

- Use project memory from this file and keep it concise; move detailed rules into linked docs.
- For branch, worktree, checkpoint, promotion, and publish decisions, follow `.claude/skills/git-delivery-workflow/SKILL.md`.
- Use `.claude/commands/gitflow-*.md` slash commands when working interactively in Claude Code.
- Do not push `wip/*` or `exp/*`; publish only clean delivery branches after verification.
- Preserve user changes. Do not use destructive Git cleanup unless explicitly requested.

## Motion Work

- For copywriting, scripts, storyboards, captions, voiceover, design briefs, or styleframes, follow `.claude/skills/copy-design-planner/SKILL.md`.
- For animation/video work, follow `.codex/skills/create-vibe-motion/SKILL.md`.
- For visual direction or HTML prototype work, use the local Huashu skill at `.agents/skills/huashu-design/SKILL.md` when available.
- For reusable workflow improvements, use `.codex/skills/darwin-motion-evolver/SKILL.md`.
