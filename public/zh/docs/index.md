# OINK 文档

> 为文档、博客、书籍与 API 参考建立统一的技术内容站点，共用导航、多语言与搜索。

---

LLMS 索引： [llms.txt](/zh/llms.txt)

---

第一次使用 OINK，请从 [Starter](/zh/docs/start/) 预览一个可运行的站点，再替换成
自己的内容。正文用 Markdown 编写，Hugo Extended 负责构建；采用 Hugo Modules
时还需要 Go 解析主题模块。主题内置资源无需 CDN，也不需要 npm 构建流程。

当前发布版本为 v0.8.0。已有站点可查看
[1.2 发布说明](/zh/blog/release/1.2.0/)与[升级指南](/zh/docs/admin/upgrade/#preparing-1-2)。

## 五条入口 {#five-entries}

- [快速上手](/zh/docs/start/) — 创建 OINK Starter 仓库，建立本地基线，分层定制并部署。
- [组件总览](/zh/docs/components/) — 每个组件一页，先给源码再给渲染效果。
- [使用 OINK 创作优美的内容](/zh/book/) — 正在完善的实战教程；前三章覆盖预览、内容结构与页面创作。
- [案例](/zh/case/) — 把生产站点拆解成可复用的设计与迁移模式。
- [设计与开发](/zh/docs/design/) — 面向 OINK 维护者的契约、已接受决策、研究证据与候选提案。
  {.cards}

## 按任务导航 {#where-to-go}

| 你要做的事                   | 去哪                                   |
| ---------------------------- | -------------------------------------- |
| 判断是否适用                 | [OINK 是什么](/zh/docs/about/)         |
| 安装并预览                   | [快速上手](/zh/docs/start/)            |
| 写一页文档                   | [编写页面](/zh/docs/write/pages/)      |
| 把目录树变成侧栏             | [组织内容](/zh/docs/write/organize/)   |
| 查组件写法                   | [组件总览](/zh/docs/components/)       |
| 改站名、Logo、配色与字体     | [品牌外观](/zh/docs/customize/brand/)  |
| 查某个配置键的默认值         | [配置总览](/zh/docs/customize/config/) |
| 做双语或多语言站             | [多语言](/zh/docs/customize/i18n/)     |
| 跟随练习建站与写作            | [使用 OINK 创作优美的内容](/zh/book/)  |
| 研究生产环境实现             | [案例](/zh/case/)                      |
| 部署到线上                   | [发布上线](/zh/docs/admin/deploy/)     |
| 升级版本或从 Docsy 迁移      | [版本升级](/zh/docs/admin/upgrade/)    |
| 维护主题、审查契约或编写 PRD | [设计与开发](/zh/docs/design/)         |

Docs 的七个栏目按阅读顺序排列：了解、上手、写内容、查组件、改站点、管发布，最后理解并维护其背后的契约与设计记录。

---

本节页面：

- [OINK 是什么](/zh/docs/about/): 一套从 Docsy 演化而来的本地优先 Hugo 文档框架：组件在 Markdown 中仍然可读，资源随主题分发，十五个生产站点持续验证它。
- [快速上手](/zh/docs/start/): 从官方 OINK Starter 建立可运行的本地基线，再依次定制内容、语言、品牌、集成与部署。
- [创作内容](/zh/docs/write/): 写文档页、博客、书籍、发布页与 API 文档：一页文档长什么样，内容怎么组织。
- [组件总览](/zh/docs/components/): 写文档时可用的全部组件，一个组件一页，例子由浅入深，参数表在页尾。
- [定制站点](/zh/docs/customize/): 站点级配置：品牌、导航、布局、搜索、多语言、多版本、打印与 Agent 输出。
- [维护管理](/zh/docs/admin/): 站点从本机到线上的运维事项：本地预览、发布上线、评论、分析与 SEO、版本升级与排错。
- [设计与开发](/zh/docs/design/): 在唯一的双语专栏中管理 OINK 维护者契约、已接受决策、带日期的研究记录与候选提案。
- [OINK CLI](/zh/docs/cli/): 面向 Hugo 站点的可选 OINK 命令行工具草案介绍。
