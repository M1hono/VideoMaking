# KubeJS EP01 反馈记录

本文件只记录制作反馈，不写正片正文。

## 2026-05-03 语音方向

用户确认这四个节奏/音色样音是目前效果最好的方向：

- `renders/drafts/kubejs-line-16-laidback-connected-s112-p0.mp3`
- `renders/drafts/kubejs-line-17-laidback-connected-s115-p0.mp3`
- `renders/drafts/kubejs-line-18-mature20-laidback80-connected-s112-p0.mp3`
- `renders/drafts/kubejs-line-19-laidback-tightpunct-s112-p0.mp3`

后续生成新句子时优先在这四个泳道内复测，不继续无目的扩散音色。

## 2026-05-03 乔布斯式修稿

来源稿：`copy/scripts/kubejs-ep01-getting-start/draft.md`

处理原则：

- 做减法，减少铺垫和松散解释。
- 先给一句话定义，再解释为什么需要这个系列。
- 保留中文 MC 教程语境，不做发布会腔。
- 不冒充乔布斯本人，只借用“聚焦、减法、一句话定义”的表达特征。

TTS 测试稿：`copy/voiceover/kubejs-ep01-getting-start/jobs-style-sample.tts.md`

生成样音：

- `renders/drafts/kubejs-ep01-jobs-16-laidback-s112-p0.mp3`
- `renders/drafts/kubejs-ep01-jobs-17-laidback-s115-p0.mp3`
- `renders/drafts/kubejs-ep01-jobs-18-mature20-laidback80-s112-p0.mp3`
- `renders/drafts/kubejs-ep01-jobs-19-laidback-tightpunct-s112-p0.mp3`

## 2026-05-03 停顿反馈

用户反馈上一版“停顿太多，又没有正常的长停顿，有点赶和捧读”。

调整方向：

- 合并过碎短句，减少连续句号造成的小停顿。
- 在段落边界放少量正常长停顿。
- 语速从 `1.12/1.15` 收回到 `1.08-1.10`。
- 删掉偏发布会式的“它不新，也不花哨”这类捧读感句子。

TTS 测试稿：`copy/voiceover/kubejs-ep01-getting-start/cadence-v2.tts.md`

生成样音：

- `renders/drafts/kubejs-ep01-cadence-v2-16-laidback-s108-p0.mp3`
- `renders/drafts/kubejs-ep01-cadence-v2-16-laidback-s110-p0.mp3`
- `renders/drafts/kubejs-ep01-cadence-v2-18-mature20-laidback80-s108-p0.mp3`

## 2026-05-03 轻量语病修正

用户选择 `kubejs-ep01-cadence-v2-16-laidback-s108-p0.mp3` 的生成方向。基于用户修改后的 `draft.md`，只修语病和标点，不改核心用词。

TTS 稿：`copy/voiceover/kubejs-ep01-getting-start/cadence-final.tts.md`

同步：`copy/scripts/kubejs-ep01-getting-start/draft.md` 的文案部分已同步为同一版净文本；TTS 稿只额外保留段落停顿标签。

2026-05-03 追加：继续修正 `draft.md` 里的搭配和重复问题，包括“对整合包的内容进行广度整理”“还不足以撑起来”“长期对整合包进行维护”“给了你能做更多事的权利”。同步更新 `cadence-final.tts.md`。

final 生成：

- `renders/drafts/kubejs-ep01-cadence-final-laidback-s108-p0-en.mp3`
- 参数：MiniMax EN profile，`Chinese (Mandarin)_Laid_BackGirl`，`speed=1.08`，`pitch=0`，无混音。

## 2026-05-03 正式四段语音

用户把正文切分成四段，每一段单独生成语音。

句子优化：

- 原句：`KubeJS 能够一定程度完成满足这种需求，又没有模组开发那样对于初学者而言的高门槛。`
- 优化：`KubeJS 能在一定程度上满足这些需求，同时又不像模组开发那样，对初学者有那么高的门槛。`

正式 TTS 文件：

- `copy/voiceover/kubejs-ep01-getting-start/final-segment-01.tts.md`
- `copy/voiceover/kubejs-ep01-getting-start/final-segment-02.tts.md`
- `copy/voiceover/kubejs-ep01-getting-start/final-segment-03.tts.md`
- `copy/voiceover/kubejs-ep01-getting-start/final-segment-04.tts.md`

正式音频素材：

- `assets/audio/kubejs-ep01-getting-start/kubejs-ep01-vo-01.mp3`，`9.787s`
- `assets/audio/kubejs-ep01-getting-start/kubejs-ep01-vo-02.mp3`，`19.980s`
- `assets/audio/kubejs-ep01-getting-start/kubejs-ep01-vo-03.mp3`，`11.413s`
- `assets/audio/kubejs-ep01-getting-start/kubejs-ep01-vo-04.mp3`，`25.884s`

素材清单：`assets/audio/kubejs-ep01-getting-start/README.md`

## 2026-05-03 第四段句子修正

用户反馈原句不顺：

- 原句：`但数据包和资源包，本来就不是为了把 Minecraft 当成一种游戏引擎，或者说整合包组件来设计的。`
- 修正：`但数据包和资源包的设计目标，并不是承载整合包里的复杂脚本逻辑。`

只重生成第 4 段正式语音。

二次修正：

- 用户稿：`但数据包和资源包并不为满足整合包里的复杂需求而设计。`
- 最终口播：`但数据包和资源包并不是为满足整合包里的复杂需求而设计的。`

重新生成第 4 段后时长：`25.884s`。

## 2026-05-03 文件结构段落

根据用户后续节奏，继续补完第一篇章的文件结构讲解。新增内容写入：

- `copy/scripts/kubejs-ep01-getting-start/draft.md`

覆盖点：

- `README.txt` 作为 kubejs 文件夹说明入口。
- `server_scripts`：逻辑服务端、热重载、配方与大部分事件。
- `client_scripts`：客户端表现、按键、客户端事件、渲染等需求。
- `startup_scripts`：启动阶段、注册与初始化、通常需要重启、报错可能阻断启动。

事实核对来源：

- `https://docs.variedmc.cc/zh/modpack/kubejs/1.20.1/GettingStart/Environment.md`

## 2026-05-03 VSCode / ProbeJS / 测试段落

根据用户要求，补充 VSCode 工作区说明，并顺着第 12 段继续完成 ProbeJS 和测试排查部分。新增内容写入：

- `copy/scripts/kubejs-ep01-getting-start/draft.md`

覆盖点：

- 推荐使用 VS Code，下载方式交给简介/评论区文档链接。
- 打开工作区时使用实例根目录，而不是只打开 `kubejs` 或单个脚本文件。
- ProbeJS 用于生成编辑器类型文件，让 VS Code 能补全事件、对象和方法。
- 1.20.1 文档当前默认参考 ProbeJS Legacy。
- 第一次使用先进入世界执行 `/probejs dump`。
- 最小测试使用 `kubejs/server_scripts/apple.js`，吃苹果触发爆炸。
- `/kubejs reload server_scripts` 只负责重新读取脚本，不等于触发事件。
- 使用 `console.info` 和 `logs/kubejs/server.log` 分层确认文件加载、事件触发和对象取得。

事实核对来源：

- `https://docs.variedmc.cc/zh/modpack/kubejs/1.20.1/GettingStart/Environment.md`
- `https://docs.variedmc.cc/zh/modpack/kubejs/1.20.1/GettingStart/ProbeJS.md`
- `https://docs.variedmc.cc/zh/modpack/kubejs/1.20.1/GettingStart/YourFirstScript.md`
- `https://docs.variedmc.cc/zh/modpack/kubejs/1.20.1/GettingStart/Debugging.md`

## 2026-05-03 全段正式语音生成

根据当前 `draft.md` 的 `1---` 到 `25---`，机械拆分并生成全部正式语音。

生成内容：

- TTS 段落：`copy/voiceover/kubejs-ep01-getting-start/final-segment-01.tts.md` 到 `final-segment-25.tts.md`
- 音频素材：`assets/audio/kubejs-ep01-getting-start/kubejs-ep01-vo-01.mp3` 到 `kubejs-ep01-vo-25.mp3`
- 素材清单：`assets/audio/kubejs-ep01-getting-start/README.md`

参数：

- MiniMax profile：`en`
- voice：`Chinese (Mandarin)_Laid_BackGirl`
- speed：`1.08`
- pitch：`0`
- mix：空

结果：

- 25 个 TTS 文件
- 25 个 MP3 文件
- 总时长：`559.906s`

## 2026-05-03 待重生成段落

用户要求重生成以下段落，但先不生成，等待第 25 段确认：

- 7, 8, 9, 10, 14, 15, 17, 21, 24, 25

第 25 段已按当前 `draft.md` 重新同步到：

- `copy/voiceover/kubejs-ep01-getting-start/final-segment-25.tts.md`

轻量语病修正：

- `这次的教程中没有涉及部分例如data/,assets/文件夹的介绍` 改为 `这次教程没有展开 data 和 assets 文件夹的介绍`
- `打下夯实的基础` 改为 `打下扎实的基础`

## 2026-05-03 部分重生成

用户确认可以重新生成音频后，按当前 TTS 文本尝试覆盖：

- 7, 8, 9, 10, 14, 15, 17, 21, 24, 25

参数沿用正式素材：

- MiniMax profile：`en`
- voice：`Chinese (Mandarin)_Laid_BackGirl`
- speed：`1.08`
- pitch：`0`
- mix：空
- model：`speech-2.8-hd`

结果：

- 已成功覆盖：7, 8, 9, 10
- 未覆盖：14, 15, 17, 21, 24, 25
- 失败原因：MiniMax EN 从第 14 段开始返回 `usage limit exceeded`

素材清单已更新：

- `assets/audio/kubejs-ep01-getting-start/README.md`

## 2026-05-03 token-plan profile 重生成

根据用户提供的 Audio API key，本地 TTS 工具新增 `audio` / `token-plan` profile，读取：

- `MINIMAX_AUDIO_KEY`

该 profile 继续使用 MiniMax `/v1/t2a_v2` 文本转语音接口，只切换 API key 来源，不改变声线和正文参数。

本轮成功覆盖：

- 7, 14, 15, 17, 21, 24, 25

参数：

- MiniMax profile：`audio`
- API key source：`MINIMAX_AUDIO_KEY`
- voice：`Chinese (Mandarin)_Laid_BackGirl`
- speed：`1.08`
- pitch：`0`
- mix：空
- model：`speech-2.8-hd`

新时长：

- 7：`20.736s`
- 14：`38.448s`
- 15：`26.532s`
- 17：`8.684s`
- 21：`27.072s`
- 24：`19.944s`
- 25：`54.180s`
- 全部正式语音总时长：`592.963s`

工具变更：

- `tools/minimax-tts.mjs`
- `.env.example`

### 第 7 段二次重生成

发现第 7 段 TTS 文件未同步 `draft.md` 中的新文案，仍残留旧句：

- `这个文件不用一字一句背，但它会告诉你每个文件夹大概负责什么。`

已同步为：

- `它会告诉你每个文件夹大概负责什么。`

并用 `MINIMAX_AUDIO_KEY` 重新覆盖第 7 段。

结果：

- 7：`17.964s`
- 全部正式语音总时长：`590.191s`

### 第 14 段二次重生成

发现第 14 段 TTS 文件未同步 `draft.md` 中的新文案，仍残留旧版实例环境说明。

已同步为：

- `ProbeJS 生成的类型文件依靠其生成的 jsconfig 实现实际效果。只打开 kubejs 文件夹，补全一定会失效。`

并用 `MINIMAX_AUDIO_KEY` 重新覆盖第 14 段。

结果：

- 14：`39.924s`
- 全部正式语音总时长：`591.667s`

### 第 7 段发音修正

用户指出第 7 段需要按 `KubeJS` 发音，而不是把 `kubejs` 读成不标准的英文。

处理：

- 正文 draft 保持 `kubejs 文件夹`，用于表达真实目录名。
- TTS 文件改为 `KubeJS 文件夹`，用于引导语音正确发音。

并用 `MINIMAX_AUDIO_KEY` 重新覆盖第 7 段。

结果：

- 7：`16.668s`
- 全部正式语音总时长：`590.371s`
