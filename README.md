# TikTok Trend Insight

基于 PRD 的可运行单页应用 Demo，实现趋势分析、AI 选题、告警、账号监控、收藏和会员分层能力，并提供中英双语切换。

## 快速运行

```bash
python3 -m http.server 4173
```

浏览器访问：`http://localhost:4173`

## 已实现能力（对应 PRD）

- Dashboard：首页概览、Top hashtags/music/videos、AI 摘要、爆发告警、更新时间
- Trends：趋势卡片 + 增长/互动关键指标
- 趋势详情：热度/增长/可持续性 + AI 解释
- 视频列表：排序口径展示、收藏、跳转原始 TikTok（新标签页）
- AI 趋势榜：Top/机会/爆发/风险四榜
- AI 周期分析：1/7/14/30 天
- 爆款拆解：内容结构 + AI 可借鉴建议
- 账号监控：添加账号 + 会员额度限制
- 告警中心：爆发/衰退/异常告警（按会员限制）
- 收藏夹：视频收藏回看（localStorage）
- 会员体系：Free / Pro / Team 权益差异
- 多语言：中文 / English（原始 desc/hashtag/music/author 保持不翻译）

## 指标语义层

实现了以下计算：

- `heat_score`
- `engagement_rate`
- `trend_score`
- `burst_score`
- `sustainability_score`

并包含曝光等级（S/A/B/C）与作者等级（Mega/Mid/Micro/Nano）映射。
