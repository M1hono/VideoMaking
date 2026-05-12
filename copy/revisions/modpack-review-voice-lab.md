# 整合包测评语音实验记录

状态：实验记录。样例文案均为占位，不代表真实整合包。

## 速度层级

- KubeJS 教程：`1.08`
- 整合包作者周报：`1.12`
- 整合包测评基线：`1.18`

## 本轮样例

| 编号 | 文本 | 音频 | speed | emotion | 目标 |
| --- | --- | --- | --- | --- | --- |
| v01 | `copy/voiceover/modpack-review/sample-pace.tts.md` | `assets/audio/modpack-review/sample-pace-s118.mp3` | `1.18` | 空 | 基线 |
| v02 | `copy/voiceover/modpack-review/sample-v02-tight-s122.tts.md` | `assets/audio/modpack-review/sample-v02-tight-s122.mp3` | `1.22` | 空 | 更快、更紧 |
| v03 | `copy/voiceover/modpack-review/sample-v03-warm-s116-happy.tts.md` | `assets/audio/modpack-review/sample-v03-warm-s116-happy.mp3` | `1.16` | `happy` | 温和一点 |
| v04 | `copy/voiceover/modpack-review/sample-v04-critical-s118.tts.md` | `assets/audio/modpack-review/sample-v04-critical-s118.mp3` | `1.18` | 空 | 判断更明确 |
| v05 | `copy/voiceover/modpack-review/sample-v05-punchy-s120-surprised.tts.md` | `assets/audio/modpack-review/sample-v05-punchy-s120-surprised.mp3` | `1.20` | `surprised` | 轻微节目效果 |
| v06 | `copy/voiceover/modpack-review/sample-v06-complex-release-s116.tts.md` | `assets/audio/modpack-review/sample-v06-complex-release-s116.mp3` | `1.16` | 空 | 愤怒、无奈、释怀混合 |
| v07 | `copy/voiceover/modpack-review/sample-v07-emotion-splice/` | `assets/audio/modpack-review/sample-v07-emotion-splice-composite.mp3` | 混合 | 分段 | 分段生成后拼接 |
| v08 | `copy/voiceover/modpack-review/sample-v08-soft-emotion-splice/` | `assets/audio/modpack-review/sample-v08-soft-emotion-splice-composite.mp3` | 混合 | 分段 | 收敛强情绪并增加过渡 |

## 生成结果

| 编号 | 时长 |
| --- | --- |
| v01 | `32.220s` |
| v02 | `30.276s` |
| v03 | `31.068s` |
| v04 | `26.928s` |
| v05 | `32.112s` |
| v06 | `20.196s` |
| v07 | `19.029s` |
| v08 | `21.328s` |

## v07 情绪拼接

用户指出复杂情绪需要在不同位置单独生成再组合，而不是整句靠文本和单一 emotion 表达。

处理：

- 01 angry：`我一开始是真的有点火大。`
- 02 angry：`不是因为它做得差，而是它明明有很好的底子。`
- 03 sad：`可它总在最关键的时候，替玩家把决定做完。`
- 04 happy：`但玩到最后，我反而慢慢释怀了。`
- 05 neutral：`它不是没把路做好，只是从一开始，就没打算把路交给我自己走。`

生成后用 ffmpeg concat 合成为：

- `assets/audio/modpack-review/sample-v07-emotion-splice-composite.mp3`

## 听感记录

- v07：用户反馈缺少过渡情绪，`angry` 和 `happy` 都有点用力过猛。

## v08 调整原则

- 减少强 emotion 占比。
- `angry` 只放在一个短句。
- 不再使用 `happy` 表达释怀。
- 增加“失望”和“开始理解”作为过渡情绪。
- 把规则同步进 `copy/styles/modpack-review-voice.md`。

生成后用 ffmpeg concat 合成为：

- `assets/audio/modpack-review/sample-v08-soft-emotion-splice-composite.mp3`

分段时长：

- 01 frustrated：`2.090s`
- 02 angry-lite：`2.473s`
- 03 disappointed：`3.762s`
- 04 transition：`3.913s`
- 05 release：`4.145s`
- 06 conclusion：`4.946s`
