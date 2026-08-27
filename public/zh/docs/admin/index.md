# 维护管理

> 站点从本机到线上的运维事项：本地预览、发布上线、评论、分析与 SEO、版本升级与排错。

---

LLMS 索引： [llms.txt](/zh/llms.txt)

---

本栏目覆盖内容写完之后的运维事项：在本机预览、构建并部署产物、接入评论与分析、跟随主题版本升级、故障定位。前面五个栏目决定站点的外观与内容，这一栏决定站点能否构建、部署在哪、出问题如何排查。

## 按任务导航 {#where-to-go}
| 你要做的事 | 去哪 |
| --- | --- |
| 在本机看到改动 | [本地预览](/zh/docs/admin/preview/) |
| 构建出能部署的 `public/` | [本地预览](/zh/docs/admin/preview/#production-build) |
| 部署到 GitHub Pages / Cloudflare / Netlify | [发布上线](/zh/docs/admin/deploy/) |
| 部署到 `example.com/docs/` 这样的子路径 | [发布上线](/zh/docs/admin/deploy/#baseurl) |
| 让读者在页面底部留言 | [启用评论](/zh/docs/admin/comments/) |
| 接 Google Analytics 或自建统计 | [分析与 SEO](/zh/docs/admin/analytics/) |
| 让搜索引擎正确收录 | [分析与 SEO](/zh/docs/admin/analytics/#indexing) |
| 升到新版主题 / 从 Docsy 或 0.4 迁移 | [版本升级](/zh/docs/admin/upgrade/) |
| 构建报错、搜不到、页面 404 | [排错与检查](/zh/docs/admin/troubleshooting/) |

---

本节页面：

- [本地预览](/zh/docs/admin/preview/): 用 hugo server 在本机预览改动，用 hugo --panicOnWarning 构建可部署的 public/，不需要 Node 与 CDN。
- [发布上线](/zh/docs/admin/deploy/): 把 public/ 部署到 GitHub Pages、Cloudflare Pages 或任何静态托管：baseURL 配对、内容安全策略、验收清单与回滚。
- [启用评论](/zh/docs/admin/comments/): 用 giscus 把 GitHub Discussions 接成页面底部的评论区，全站开、按页关、跟随深浅色。
- [分析与 SEO](/zh/docs/admin/analytics/): 接入一个分析服务（或者不接），并把主题已经生成的 canonical、hreflang、社交卡片、站点地图与 robots 配对。
- [版本升级](/zh/docs/admin/upgrade/): 升到新版主题、用迁移工具把 0.4 的 shortcode 改成 v5 语法、从 Docsy 迁过来，以及出问题怎么退回去。
- [排错与检查](/zh/docs/admin/troubleshooting/): 构建、语言、搜索、平台四类故障的症状 → 原因 → 修法，以及站点可以自己跑的那几项检查。

---

反链：

- [定制站点](/zh/docs/customize/)
