# KubeJS 中文教程视频工作流

这个工作流用于制作依赖 CrychicDoc / KubeJS 1.20.1 文档的中文 Minecraft 魔改教程。目标不是做通用技术课，而是做“文档陪读 + 实例验证 + 排查方法”的系列视频。

## 项目接入

本工作流已经接入项目技能路由：

- Codex Skill：`.codex/skills/kubejs-video-tutorial/SKILL.md`
- Claude Skill：`.claude/skills/kubejs-video-tutorial/SKILL.md`
- MiniMax TTS 工具：`tools/minimax-tts.mjs`
- 运行入口：`pnpm run tts:minimax`
- 口吻档案：`copy/styles/kubejs-gettingstart-tutorial-voice.md`

如果改动本工作流或对应 Skill，运行：

```bash
pnpm run skills:check-sync
pnpm run darwin:score -- docs/kubejs-video-tutorial-workflow.md
```

如果改动 MiniMax 工具，至少生成一段 10 秒以内短样确认接口仍可用：

```bash
pnpm run tts:minimax -- --text="脚本有没有被加载。事件有没有被触发。" --out=kubejs-tts-smoke.mp3
```

## 核心风格

- 基调：平和、具体、耐心，有中文 MC 教程语境。
- 叙事：先说明边界，再给最小例子，最后给排查顺序。
- 吸引力：来自“观众终于知道该看哪里”，不是来自营销式强钩子。
- 节目效果：可以集中放在开头 15-25 秒，正文回到稳定讲解。
- 事实边界：KubeJS API、版本行为、限制与命令必须来自 CrychicDoc、官方文档、MCP 源码索引或实际测试。

## 前期资料

每集先固定四类资料：

- 文档来源：保存 CrychicDoc 页面链接与本集使用范围到 `refs/facts/<slug>.md`。
- 风格依据：使用 `copy/styles/kubejs-gettingstart-tutorial-voice.md`。
- 口播稿：正文稿放 `copy/scripts/<slug>.md`，TTS 专用稿放 `copy/voiceover/<slug>.tts.md`。
- 分镜：录屏与剪辑节奏放 `copy/storyboards/<slug>.md`。

如果写到具体 API、事件、脚本目录或版本限制，先查证再写。不要凭记忆补 KubeJS 行为。

## 单集结构

推荐结构：

1. 开头 15-25 秒：高密度剪辑，快速展示本集痛点与最终能解决的问题。
2. 进入正题：一句话说明本集只解决哪一个小问题。
3. 文档陪读：引用 CrychicDoc 的概念，但不要照念文档。
4. 最小示例：用 VS Code 和 Minecraft 实测跑通。
5. 排查顺序：文件加载、事件触发、对象取得、逻辑异常。
6. 收束：明确下一集会复用哪一个判断方法。

开头可以多剪，但口播不要变成广告腔。例如：

```text
脚本放进去了，没反应。
重载也执行了，还是没反应。
日志里好像也没有报错。

这时候先别急着改代码。
我们先确认，KubeJS 到底有没有读到这份脚本。
```

## TTS 稿规则

正文稿和 TTS 稿必须分开。正文稿可以像文档，TTS 稿必须像人说话。

### 停顿

- 不要把一个长句交给 TTS。拆成 8-18 个汉字的小句。
- 少用冒号、分号、顿号和括号。它们容易产生机械停顿。
- 解释代码时，用短句接短句，不用“第一、第二、第三”连续压缩。
- 需要轻停顿时用逗号；需要换气时用句号；不要用省略号制造情绪。
- 每个 TTS 段落控制在 1-3 句，避免模型自行找奇怪的断点。

### 代码和术语

- 代码块不要直接喂给 TTS。
- 路径写成口语版本，例如“server scripts 目录”，不要让模型读反引号。
- 第一次出现英文名时可以慢一点，后面保持自然。
- `KubeJS`、`ProbeJS`、`Rhino`、`server_scripts`、`client_scripts`、`startup_scripts` 在字幕里保留原写法，TTS 稿可写成更容易读的形式。

不推荐：

```text
所以第一期我们先不做复杂魔改，只写一个很小的 server_scripts 示例，然后用日志确认它真的被加载、事件真的被触发。
```

推荐：

```text
所以第一期先不做复杂魔改。
我们只写一个很小的 server scripts 示例。
然后用日志确认两件事。
脚本有没有被加载。
事件有没有被触发。
```

## MiniMax 语音

真实 token 只能放 `.env` 或 `.env.local`，不要写进命令、脚本或文档。

推荐默认值：

```env
MINIMAX_TTS_MODEL=speech-2.8-hd
MINIMAX_TTS_VOICE_ID=Chinese (Mandarin)_Laid_BackGirl
MINIMAX_TTS_MIX=
MINIMAX_TTS_SPEED=1.12
```

默认先不用混音，让 `Chinese (Mandarin)_Laid_BackGirl` 保持更自然的连接感。需要更成熟时，先试 `female-chengshu-jingpin:20,Chinese (Mandarin)_Laid_BackGirl:80`；成熟 40 / Laid_Back 60 只作为开头强调段或偏正式段落的备选，不再作为正文默认值。

生成短样：

```bash
node tools/minimax-tts.mjs --text-file=copy/voiceover/kubejs-ep01.tts.md --out=kubejs-ep01-sample.mp3
```

调音顺序：

1. 先改 TTS 稿断句。
2. 再调 `--speed=1.12` 到 `--speed=1.15`。
3. 再调混音比例，例如 `--mix='female-chengshu-jingpin:20,Chinese (Mandarin)_Laid_BackGirl:80'`。
4. 再少量使用 emotion，例如 `--emotion=happy` 或 `--emotion=surprised`。只用于开头或强调段，正文不要一直带情绪。
5. 最后再换音色。

如果停顿不自然，优先删冒号、括号、顿号、停顿标签和过长并列句。不要先加 `<#...#>`，先用自然标点和语序解决。

如果听起来“短停顿很多，但没有正常长停顿”，说明 TTS 稿被切得太碎。先把短句合并成 1-2 个自然长句，把停顿集中到段落边界；段落切换可以少量使用 `0.32` 到 `0.45` 秒的结构停顿。不要同时堆很多 `0.06` 到 `0.14` 秒短停顿。

如果听起来赶，优先把正文速度降到 `1.08` 到 `1.10`，而不是继续拆句。

如果听起来像捧读，删掉发布会式短句和抬高语气，改回平实说明。

如果语调起伏不足，优先重写 TTS 句子，而不是只调 pitch。例如：

```text
KubeJS作为一个老牌魔改模组，已经活跃了很久。
到现在，它在很多热门整合包里仍然有很重要的作用。
```

`<#0.08#>` 这类显式停顿只适合极少数强调点。正文基线不要使用密集显式停顿；确实要做段落呼吸时，用少量结构停顿，不要用一串短停顿代替长停顿。

### 连接节奏

- `kubejs-line-16-laidback-connected-s112-p0.mp3`、`17`、`18`、`19` 是当前效果最好的四个节奏/音色泳道。
- `kubejs-line-16-laidback-connected-s112-p0.mp3` 作为正文默认基线：单音色、`speed=1.12`、`pitch=0`、无显式停顿。
- 优先让修饰语和谓语连起来读。像“作为老牌魔改模组，已活跃许久”这种关系，不要在中间插停顿标签。
- 如果句子内部已经有自然推进关系，宁愿减少逗号，也不要加句号拆开。
- 如果听起来太赶，先把速度从 `1.15` 回到 `1.12`，再考虑补一个逗号；不要直接加长停顿。
- 如果听起来太轻，再试成熟 20 / Laid_Back 80；不要直接回到成熟 40 / Laid_Back 60。
- 如果 `1.12` 仍然赶，测试 `speed=1.08` 或 `speed=1.10`。

当前偏好的样本方向：

- `kubejs-line-07-laidback-s112-p0.mp3`：正文基线，连接感更自然。
- `kubejs-line-16-laidback-connected-s112-p0.mp3`：当前最佳之一，正文默认第一版。
- `kubejs-line-17-laidback-connected-s115-p0.mp3`：当前最佳之一，更快一点的连接感测试。
- `kubejs-line-18-mature20-laidback80-connected-s112-p0.mp3`：当前最佳之一，轻微成熟混音测试。
- `kubejs-line-19-laidback-tightpunct-s112-p0.mp3`：当前最佳之一，减少句中逗号的紧连接测试。
- `kubejs-line-14-laidback-emphasis-s110.mp3`：开头强调段备选，不作为正文默认。
- `kubejs-line-11-laidback-pauses-s112.mp3` / `kubejs-line-12-laidback-spoken-s112.mp3`：保留为早期参考，但显式停顿策略需要收敛。

## 录制素材

第一类：文档素材

- CrychicDoc 页面滚动。
- GettingStart 目录。
- 与本集直接相关的概念段落。

第二类：代码素材

- VS Code 打开实例根目录。
- `kubejs/server_scripts` 或本集对应目录。
- ProbeJS 补全或类型跳转。

第三类：游戏素材

- Minecraft 实测结果。
- 命令执行，例如 `/kubejs reload server_scripts`。
- 成功和失败各录一份，方便剪排查段。

第四类：日志素材

- `logs/kubejs/server.log`
- `logs/kubejs/startup.log`
- `logs/kubejs/client.log`
- `logs/latest.log`

## 剪辑原则

- 开头可以用快切、缩放、错误提示、鼠标点击、文档高亮制造节奏。
- 正文每 20-40 秒给一次可见变化：文档、代码、游戏、日志之间切换。
- 不要让字幕、代码和 UI 标注同时抢视线。
- 代码解释时，画面只强调当前一行。
- 节目效果要服务理解，例如“重载不是触发事件”这种字幕可以保留。

## 交付检查

发布前至少检查：

- 本集所有 KubeJS 行为都有来源或录屏实测。
- TTS 稿不是 Markdown 原稿直接生成。
- 女声音色不过度广告腔、客服腔、新闻腔。
- 开头剪辑更密，但正文不焦躁。
- 视频简介或片尾标明 AI 语音辅助生成。

## 迭代记录

当用户反馈“停顿不自然”“太像 AI”“不像中文 MC 教程”这类可复用问题时，不只改当前稿件：

1. 把具体问题记录到 `copy/revisions/<slug>.md`。
2. 如果是稳定规律，更新 `copy/styles/kubejs-gettingstart-tutorial-voice.md`。
3. 如果影响制作流程，更新本工作流或 `kubejs-video-tutorial` Skill。
4. 用 10-20 秒短样验证，不直接整集生成。
5. 运行 Darwin 评分，记录新旧分数和改动理由。

推荐日志命令：

```bash
pnpm run darwin:log -- --target docs/kubejs-video-tutorial-workflow.md --old <old-score> --new <new-score> --status keep --dimension project_fit --note "接入 KubeJS 视频 Skill、MiniMax TTS 工具和迭代记录"
```
