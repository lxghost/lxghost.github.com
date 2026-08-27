# 创作内容

> 写文档页、博客、书籍、发布页与 API 文档：一页文档长什么样，内容怎么组织。

---

LLMS 索引： [llms.txt](/zh/llms.txt)

---

本栏覆盖 OINK 支持的几种内容类型：文档页、博客文章、书籍、发布下载页、OpenAPI 参考。它们共用同一套 Markdown 与 front matter，各自另有约定。

## 一页文档的构成 {#anatomy}

一页文档是一个 Markdown 文件。文件开头两行 `---` 之间是 front matter，即页面元数据：标题、侧栏短名、描述、排序。其余部分是正文，内容为普通 Markdown 加 OINK 的原生组件。下面是一个完整页面：

```markdown {title="content/docs/install.zh.md"}
---
title: 安装 Pigsty
linkTitle: 安装
description: 在一台干净的 EL 9 机器上装出可用的 PostgreSQL 集群。
weight: 20
---

## 前提条件 {#prerequisites}

一台能 SSH 登录的 Linux 机器，`sudo` 免密，Python 3.11 或更高版本。

> [!IMPORTANT]
> 安装脚本会改写 `/etc/yum.repos.d/`，先备份。
```

存为 `content/docs/install.zh.md`，运行 `hugo server` 后页面出现在 `/zh/docs/install/`，侧栏出现「安装」一行。

## 内容类型与对应页面 {#map}

| 你要写的 | 去哪页 |
| --- | --- |
| 一页文档：front matter、标题锚点、链接、图片、草稿 | [编写页面](/zh/docs/write/pages/) |
| 目录树与侧栏：`_index.md`、`weight`、图标、折叠、多根侧栏 | [组织内容](/zh/docs/write/organize/) |
| 查某个 front matter 键是什么意思 | [页面参数](/zh/docs/write/frontmatter/) |
| 一篇博客、发布公告、RSS | [博客与文章](/zh/docs/write/blog/) |
| 一本书：章节编号、图表式例、交叉引用、整本打印 | [书籍出版](/zh/docs/write/book/) |
| 一个发布下载页：版本卡片、资产表、校验和 | [发布与下载页](/zh/docs/write/releases/) |
| 一份 OpenAPI 参考页 | [API 文档](/zh/docs/write/openapi/) |
| 中英双语写作：对等文件、锚点对齐、缺译回退 | [多语言](/zh/docs/customize/i18n/) |
| 某个组件的语法与参数 | [组件总览](/zh/docs/components/) |

---

本节页面：

- [编写页面](/zh/docs/write/pages/): 新建一页文档：文件放在哪、front matter 写什么、标题锚点为什么要手写、链接与图片怎么写、页尾会自动出现什么。
- [组织内容](/zh/docs/write/organize/): 目录结构就是侧栏树：`_index.md` 与 weight、栏目首页样式、图标与折叠、隐藏页面、把文档放在任意路径。
- [页面参数](/zh/docs/write/frontmatter/): front matter 全表：主题真正读取的每一个页面键，按侧栏、外壳、搜索、输出、页尾、Book、Landing、发布页分组。
- [博客与文章](/zh/docs/write/blog/): 开一个博客栏目：目录约定、文章的 front matter、封面图、按年份分组的列表页与 RSS。
- [书籍出版](/zh/docs/write/book/): 用 `type: book` 把一棵目录树变成一本书：章节编号、图表式例编号、交叉引用、生成式索引与整本打印。
- [发布与下载页](/zh/docs/write/releases/): 把版本号、标签、归档链接、校验和与安装命令写成本地事实，再让发布卡片、资产表、下载区块和索引页从同一份记录推导出来。
- [API 文档](/zh/docs/write/openapi/): 把 OpenAPI 规范放进站点，用随主题分发的 Swagger UI 或 Redoc 渲染成可浏览的接口文档，不连 CDN。

---

反链：

- [卡片](/zh/docs/components/cards/)
- [定制站点](/zh/docs/customize/)
