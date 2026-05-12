---
name: kubejs-video-tutorial
description: Use when creating Chinese Minecraft/KubeJS tutorial videos, especially CrychicDoc or KubeJS 1.20.1 GettingStart based lessons, MC modpack scripting explainers, Chinese female AI voiceover, MiniMax TTS pacing, VS Code/Minecraft/log recording plans, subtitles, opening edits, or reusable KubeJS video workflow assets.
---

# KubeJS Video Tutorial

Use this skill for Chinese KubeJS / Minecraft modpack tutorial videos.

## Core Rule

Make it feel like Chinese MC documentation陪读 plus实测排查, not an English-style productivity tutorial. Keep the tone calm, specific, and source-backed.

## Start

Inspect project context:

```bash
rg -n "KubeJS|GettingStart|Crychic|MiniMax|TTS|配音|口播|魔改|教程|server_scripts|ProbeJS" copy docs refs design AGENTS.md CLAUDE.md 2>/dev/null
```

If the script mentions KubeJS APIs, events, commands, version limits, or mod behavior, verify from CrychicDoc, official docs, MCP source/docs tools, or recorded evidence before writing claims.

## Artifacts

Create the smallest useful set:

- `refs/facts/<slug>.md`: source pages, dates, links, and checked claims.
- `copy/styles/kubejs-gettingstart-tutorial-voice.md`: reusable voice profile.
- `copy/scripts/<slug>.md`: editorial script.
- `copy/voiceover/<slug>.tts.md`: TTS-specific script.
- `copy/storyboards/<slug>.md`: recording/editing beats.
- `copy/captions/<slug>.md`: subtitles or caption plan.
- `design/boards/<slug>.md`: visual direction when needed.

Use `docs/kubejs-video-tutorial-workflow.md` for the full workflow.

## Style

Prefer:

- "先别急着..."
- "这里真正要确认的是..."
- "没反应不一定是代码错了。"
- "重载不是触发事件。"
- "我们先把变量控制得少一点。"

Avoid:

- "三分钟学会"
- "保姆级"
- "直接起飞"
- "全网最细"
- over-polished marketing hooks

Opening edits may be denser for 15-25 seconds, but the body should return to calm documentation walkthrough.

## TTS Pass

Never feed the editorial Markdown script directly to TTS. Create a separate `.tts.md`:

- Split long sentences into 8-18 Chinese characters when possible.
- Remove markdown, backticks, bullets, tables, and code blocks.
- Avoid colon, semicolon, parentheses, excessive commas, and enumeration chains.
- Use periods for real breath points.
- Write paths in speakable form, e.g. "server scripts 目录".
- Use MiniMax pause tags such as `<#0.12#>` for short emphasis pauses when punctuation is not enough.
- Baseline TTS should not use explicit pause tags. First try natural punctuation, sentence order, and speed.
- If a pause tag is unavoidable, start with `<#0.06#>` to `<#0.08#>` and avoid tags over `<#0.14#>` in body narration.
- If the read has too many micro-pauses but no natural long pause, merge short sentences and place a few structural pauses at paragraph boundaries, around `<#0.32#>` to `<#0.45#>`.
- If the read feels rushed, test `speed=1.08` to `1.10` before splitting the script further.
- If the read feels like a staged presentation, remove launch-keynote-style short sentences and return to plain Chinese MC tutorial explanation.
- Use `--emotion=happy` or `--emotion=surprised` sparingly; prefer rewriting the TTS sentence before adding stronger emotion.

For MiniMax:

```bash
node tools/minimax-tts.mjs --text-file=copy/voiceover/<slug>.tts.md --out=<slug>-sample.mp3
```

Default direction: Chinese female voice, natural and stable, not customer-service, not news. Current preferred MiniMax body baseline is `Chinese (Mandarin)_Laid_BackGirl`, `speed=1.12`, `pitch=0`, no explicit pause tags, and no mix by default. Treat `kubejs-line-16-laidback-connected-s112-p0.mp3`, `kubejs-line-17-laidback-connected-s115-p0.mp3`, `kubejs-line-18-mature20-laidback80-connected-s112-p0.mp3`, and `kubejs-line-19-laidback-tightpunct-s112-p0.mp3` as the current best four rhythm/voice lanes. Use 16 as the first body sample, 17 when the line drags, 18 when the voice feels too light, and 19 when pauses feel unnatural. Keep mature 40 / Laid_Back 60 for emphasis or intro segments only.

Do not fill episode script, storyboard, captions, or facts content unless the user asks for content. It is okay to create empty folders and reusable workflow/style files.

## Recording Plan

Capture:

- CrychicDoc page scrolls and highlighted sections.
- VS Code instance root, script folder, code writing, ProbeJS hints.
- Minecraft success/failure tests.
- KubeJS logs and `latest.log` when relevant.

Keep failure footage. It is useful for explaining debugging.

## Verification

Before calling a plan ready:

```bash
rg -n "source|claim|voice|TTS|scene|caption|KubeJS|ProbeJS|server_scripts|debug|日志" copy refs docs design
pnpm run skills:check-sync
```

For TTS, generate a short sample and report file path, voice id, speed, and any remaining pause issue.
