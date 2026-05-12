# Minecraft 开发者周报来源地图

状态：事实来源索引。这里不写正片文案。

## 时间窗口

默认使用滚动 7 天窗口。

如果在周一发布，则默认覆盖上一个自然周。例如当前日期是 2026-05-04，第一期可覆盖 2026-04-27 到 2026-05-03。

## 一手来源

### Modrinth

- API 概览：https://docs.modrinth.com/api/
- 搜索项目：https://docs.modrinth.com/api/operations/searchprojects/
- 项目版本列表：https://docs.modrinth.com/api/operations/getprojectversions

可用字段：

- `project_type`：区分 mod、modpack 等项目类型。
- `date_modified` / `modified_timestamp`：搜索层面的最近变更。
- `date_published`：具体版本发布时间。
- `game_versions`：支持的 Minecraft 版本。
- `loaders`：Fabric、Forge、NeoForge、Quilt 等。
- `changelog`：版本变更说明。

### CurseForge

- Core API：https://docs.curseforge.com/rest-api/
- Minecraft 页面：https://www.curseforge.com/minecraft

可用字段：

- `mods/search`：按游戏、分类、版本等搜索项目。
- `mods/{modId}/files`：读取项目文件列表。
- `fileDate`：文件发布时间。
- `gameVersions`：支持的 Minecraft 版本和加载器信息。
- `mods/{modId}/files/{fileId}/changelog`：读取文件更新日志。

## 二手补充来源

- GitHub Releases：用于验证开源项目真实 changelog。
- 项目 Discord / Wiki / 文档：只用于补充背景，不作为未经核对的事实主来源。
- Modpack 官方页面：用于确认整合包定位、核心玩法和版本适配。

## 事实规则

- 只介绍确实在窗口内发布新版本的项目。
- 模组和整合包分开评分，不直接比较下载量。
- 依赖库更新可以入选，但必须说明“为什么它对整合包作者有意义”。
- 不把自动生成 changelog 当成确定事实，必要时回到 GitHub release 或项目说明核对。
- 每个入选项目至少保留：来源链接、版本号、发布日期、支持 MC 版本、加载器、项目类型、入选理由。
