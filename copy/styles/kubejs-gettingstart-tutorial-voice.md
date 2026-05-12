# KubeJS GettingStart 中文教程语音档案

状态：工作流辅助文件。不要在这里写正片文案、分镜或字幕内容。

## 当前方向

- 女声，中文 MC 教程语境，平和、自然、偏 warm，不要广告腔、客服腔、新闻腔。
- 正文基线：`Chinese (Mandarin)_Laid_BackGirl`，`speed=1.12`，`pitch=0`，不加显式停顿，不加混音。
- 需要更成熟时，先试 `female-chengshu-jingpin:20,Chinese (Mandarin)_Laid_BackGirl:80`。
- 成熟 40 / Laid_Back 60 只作为开头强调段或偏正式段落备选。
- 当前最佳四个节奏/音色泳道是 `16`、`17`、`18`、`19`，后续新句子优先围绕这四个方向复测。

## 节奏规则

- 正文先追求连接感，再追求重音。
- 优先用自然标点和语序控制停顿，不默认使用 `<#...#>`。
- 修饰语、主谓、动宾之间不要插停顿标签。
- 句内关系很顺时，可以减少逗号；不要为了“听起来有节奏”硬加句号。
- 如果太赶，先把 `speed=1.15` 降回 `1.12`。
- 如果太平，先改句子重心，再考虑轻混音或极短停顿。
- 显式停顿只用于少数强调点，从 `<#0.06#>` 到 `<#0.08#>` 开始，正文避免超过 `<#0.14#>`。
- 如果出现“短停顿太多、没有正常长停顿”的问题，说明句子被切太碎。优先合并短句，把停顿收敛到段落边界。
- 段落切换可以使用少量 `0.32` 到 `0.45` 秒的结构停顿；正文不要同时堆很多短停顿。
- 如果听起来像“捧读”，删掉过于发布会式的短句和抬高语气，改回平实解释。

## 参数泳道

| 用途 | voice | mix | speed | pitch | 说明 |
| --- | --- | --- | --- | --- | --- |
| 正文基线 | `Chinese (Mandarin)_Laid_BackGirl` | 空 | `1.12` | `0` | 当前优先方向 |
| 慢速正文 | `Chinese (Mandarin)_Laid_BackGirl` | 空 | `1.08`-`1.10` | `0` | 句子显得赶时使用 |
| 连接加速 | `Chinese (Mandarin)_Laid_BackGirl` | 空 | `1.15` | `0` | 测试是否更自然，不一定更好 |
| 轻成熟 | `Chinese (Mandarin)_Laid_BackGirl` | `female-chengshu-jingpin:20,Chinese (Mandarin)_Laid_BackGirl:80` | `1.12` | `0` | 正文偏轻时使用 |
| 开头强调 | `Chinese (Mandarin)_Laid_BackGirl` | `female-chengshu-jingpin:40,Chinese (Mandarin)_Laid_BackGirl:60` | `1.10` | `0` | 只用于开头或强调段 |

## 样音索引

- `renders/drafts/kubejs-line-07-laidback-s112-p0.mp3`：用户认可的连接感基线。
- `renders/drafts/kubejs-line-16-laidback-connected-s112-p0.mp3`：当前最佳之一。正文基线复测，同句自然标点。
- `renders/drafts/kubejs-line-17-laidback-connected-s115-p0.mp3`：当前最佳之一。速度 1.15 的连接测试。
- `renders/drafts/kubejs-line-18-mature20-laidback80-connected-s112-p0.mp3`：当前最佳之一。成熟 20 / Laid_Back 80 的轻混音测试。
- `renders/drafts/kubejs-line-19-laidback-tightpunct-s112-p0.mp3`：当前最佳之一。减少句中逗号的紧连接测试。
- `renders/drafts/kubejs-line-14-laidback-emphasis-s110.mp3`：开头强调段备选，不作为正文默认。
- `renders/drafts/kubejs-line-11-laidback-pauses-s112.mp3` 和 `renders/drafts/kubejs-line-12-laidback-spoken-s112.mp3`：早期参考，显式停顿策略需要收敛。

## 当前最佳四泳道

| 编号 | 文件 | 用途 | 后续用途 |
| --- | --- | --- | --- |
| 16 | `kubejs-line-16-laidback-connected-s112-p0.mp3` | 正文自然连接基线 | 默认第一版 |
| 17 | `kubejs-line-17-laidback-connected-s115-p0.mp3` | 稍快、更连贯 | 句子拖沓时测试 |
| 18 | `kubejs-line-18-mature20-laidback80-connected-s112-p0.mp3` | 轻成熟、仍保持 warm | 声音太轻时测试 |
| 19 | `kubejs-line-19-laidback-tightpunct-s112-p0.mp3` | 减少句中逗号的紧连接 | 停顿不自然时测试 |

## 测试流程

1. 每次只测 10 到 20 秒短句，不直接生成整集。
2. 先按 `16` 生成正文基线：单音色、`speed=1.12`、无显式停顿。
3. 再按需要在 `17`、`18`、`19` 中选 1-3 个方向复测。
4. 如果停顿不自然，优先做 `19` 的少逗号版本，不先加停顿标签。
5. 如果连接太拖，试 `17`；如果声音太轻，试 `18`。
6. 记录被用户认可的文件名和原因，再更新本文件。

## 当前结论

2026-05-03：`kubejs-line-07-laidback-s112-p0` 的方向也被用户认可。正文默认从“成熟混音 + 短停顿”改为“单音色 Laid_BackGirl + 自然连接 + 少显式停顿”。`11`、`12`、`14` 保留为参考，但不再定义正文默认节奏。

2026-05-03：用户确认 `16`、`17`、`18`、`19` 是目前效果最好的四种节奏/音色方向。后续 TTS 短样以这四个泳道为主，不继续无目的扩散音色。
