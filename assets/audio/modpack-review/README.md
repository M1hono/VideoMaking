# 整合包测评语音样例

## 样例

| 文件 | 用途 | speed | 时长 | 文本 |
| --- | --- | --- | --- | --- |
| `sample-pace-s118.mp3` | 测评栏目速度样例 | `1.18` | `32.220s` | `copy/voiceover/modpack-review/sample-pace.tts.md` |
| `sample-v02-tight-s122.mp3` | 更快、更紧 | `1.22` | `30.276s` | `copy/voiceover/modpack-review/sample-v02-tight-s122.tts.md` |
| `sample-v03-warm-s116-happy.mp3` | 稍慢、温和情绪 | `1.16` | `31.068s` | `copy/voiceover/modpack-review/sample-v03-warm-s116-happy.tts.md` |
| `sample-v04-critical-s118.mp3` | 判断更明确 | `1.18` | `26.928s` | `copy/voiceover/modpack-review/sample-v04-critical-s118.tts.md` |
| `sample-v05-punchy-s120-surprised.mp3` | 轻微节目效果 | `1.20` | `32.112s` | `copy/voiceover/modpack-review/sample-v05-punchy-s120-surprised.tts.md` |
| `sample-v06-complex-release-s116.mp3` | 愤怒、无奈、释怀混合 | `1.16` | `20.196s` | `copy/voiceover/modpack-review/sample-v06-complex-release-s116.tts.md` |
| `sample-v07-emotion-splice-composite.mp3` | 分段情绪拼接 | 混合 | `19.029s` | `copy/voiceover/modpack-review/sample-v07-emotion-splice/` |
| `sample-v08-soft-emotion-splice-composite.mp3` | 收敛强情绪并增加过渡 | 混合 | `21.328s` | `copy/voiceover/modpack-review/sample-v08-soft-emotion-splice/` |

## 参数

- profile：`audio`
- key source：`MINIMAX_AUDIO_KEY`
- voice：`Chinese (Mandarin)_Laid_BackGirl`
- pitch：`0`
- mix：空
- model：`speech-2.8-hd`

## 听感判断维度

- 是否比周报明显更快。
- 是否仍然听得清楚。
- 判断感够不够。
- 是否有营销号感。
- 情绪是否自然。
- 情绪转折是否能从不满过渡到释怀。

## v07 分段情绪拼接

| Part | 文件 | emotion | speed | 时长 |
| --- | --- | --- | --- | --- |
| 01 | `sample-v07-emotion-splice/part-01-angry.mp3` | `angry` | `1.14` | `2.357s` |
| 02 | `sample-v07-emotion-splice/part-02-angry.mp3` | `angry` | `1.14` | `4.331s` |
| 03 | `sample-v07-emotion-splice/part-03-sad.mp3` | `sad` | `1.13` | `3.843s` |
| 04 | `sample-v07-emotion-splice/part-04-happy.mp3` | `happy` | `1.10` | `3.135s` |
| 05 | `sample-v07-emotion-splice/part-05-neutral.mp3` | 空 | `1.12` | `5.364s` |

合成文件：`sample-v07-emotion-splice-composite.mp3`

## v08 收敛情绪拼接

| Part | 文件 | emotion | speed | 时长 |
| --- | --- | --- | --- | --- |
| 01 | `sample-v08-soft-emotion-splice/part-01-frustrated.mp3` | 空 | `1.14` | `2.090s` |
| 02 | `sample-v08-soft-emotion-splice/part-02-angry-lite.mp3` | `angry` | `1.12` | `2.473s` |
| 03 | `sample-v08-soft-emotion-splice/part-03-disappointed.mp3` | `sad` | `1.12` | `3.762s` |
| 04 | `sample-v08-soft-emotion-splice/part-04-transition.mp3` | 空 | `1.10` | `3.913s` |
| 05 | `sample-v08-soft-emotion-splice/part-05-release.mp3` | 空 | `1.10` | `4.145s` |
| 06 | `sample-v08-soft-emotion-splice/part-06-conclusion.mp3` | 空 | `1.12` | `4.946s` |

合成文件：`sample-v08-soft-emotion-splice-composite.mp3`
