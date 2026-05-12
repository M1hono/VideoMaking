# Minecraft 开发者周报 Remotion 数据契约

状态：初版草案。

## Episode Manifest

```json
{
  "episode": "2026-W18",
  "dateRange": {
    "from": "2026-04-27",
    "to": "2026-05-03"
  },
  "title": "Minecraft 开发者周报",
  "items": []
}
```

## Item

```json
{
  "id": "project-slug",
  "name": "Project Name",
  "type": "mod",
  "source": "modrinth",
  "sourceUrl": "",
  "version": "",
  "publishedAt": "",
  "minecraftVersions": [],
  "loaders": [],
  "summary": "",
  "modpackAuthorNote": "",
  "changelogBullets": [],
  "assets": {
    "icon": "",
    "gallery": []
  },
  "voiceover": {
    "segmentId": "",
    "audio": "",
    "duration": 0
  },
  "rank": 0,
  "segmentType": "feature"
}
```

## Segment Types

- `intro`
- `overview`
- `feature`
- `quick`
- `outro`

## 评分字段

```json
{
  "freshness": 0,
  "modpackAuthorImpact": 0,
  "modpackImpact": 0,
  "novelty": 0,
  "visualExplainability": 0,
  "stabilitySignal": 0
}
```

总分只用于排序，最终入选由用户判断。
