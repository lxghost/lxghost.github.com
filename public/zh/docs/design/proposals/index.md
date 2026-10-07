# 设计提案与 PRD

> 仍在评估中的 OINK PRD 与设计草案的唯一双语归档位置。

---

LLMS 索引： [llms.txt](/zh/llms.txt)

---

> [!WARNING] 非规范性材料
> 提案描述的行为可能尚不存在。当前行为由契约、已接受决策、实现与归属检查器定义。不能把提案
> 当作配置参考。

本栏目是 OINK 产品需求文档、RFC 风格设计与未决维护者提案的唯一正本位置。不要在主题仓库或
文档仓库中另建本地 `plan/`、`plans/`、`proposal/` 或其它并行设计树。

## 当前提案 {#active-proposals}

| 提案                                                             | 当前边界                                                               |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [反向链接与知识图谱](/zh/docs/design/proposals/knowledge-graph/) | G1（静态反向链接）已接受，已在主题 main 分支实现，随 OINK 0.8.0 发布；局部与全站图谱（G2/G3）保持草案 |
| [媒体收敛](/zh/docs/design/proposals/media-convergence/)         | 部分已实现；media-result 契约与 Landing 资源元数据已交付，M3 决议为原生图片处理，退役（M4）保持开放 |
| [OINK CLI 与下一阶段产品路线](/zh/docs/design/proposals/oink-cli-roadmap/) | 独立 Go 仓库与首期边界已接受，本地 CLI 候选已实现、尚未公开发布；后续主题、迁移、采用、版本管理、OpenAPI 与平台阶段保持提案 |
| [视觉预设与外观切换](/zh/docs/design/proposals/visual-presets/) | Paper/Slate 已在本地实现；Ink/Terminal 继续研究；当前行为与证据见已接受决策和带日期验收记录 |

Agent 批量索引提案已在输出交付后退役。稳定行为现在归属
[架构](/zh/docs/design/architecture/#outputs-and-runtime)，用户步骤归属
[Agent 就绪输出](/zh/docs/customize/agents/)。Book 出版提案也在 `BookManifest` 与 EPUB/PDF
工具交付后退役。稳定行为归属[架构](/zh/docs/design/architecture/#outputs-and-runtime)与
[创作书籍](/zh/docs/write/book/#print)，带日期的下游采纳证据归属
[消费站证据](/zh/docs/design/research/consumer-evidence/#publication-adoption)。剩余的消费站采纳工作
不会让上游设计提案继续保持活动状态。两份提案草案均由 Git 历史保存。

生成式配置 Schema 提案已按生命周期退役：行为的规范位置是[配置总览](/zh/docs/customize/config/#editor-schema)，
长期理由进入[生成式配置 Schema 决策](/zh/docs/design/decisions/config-schema/)，草案原文由 Git 历史保存。

## CLI 工作区与适配器 {#cli-maintenance-candidate}

显式 workspace 与可选适配器保留在当前收缩后的 CLI 中。
[当前契约](/zh/docs/design/decisions/cli/#workspace-registry)与
[使用指南](/zh/docs/start/cli/#workspace-registry)定义命令边界。
带日期 R1–R8/A18 记录是绑定历史源码/二进制的证据，不能证明后续命令或输出修改。
有限维护路线继续退出活动导航，尚未建立公开 CLI 发布或部署。

## 新 PRD 放在哪里 {#where-a-new-prd-goes}

创建一份英文主页面及其简体中文对页：

```text
content/docs/design/proposals/<slug>.md
content/docs/design/proposals/<slug>.zh.md
```

两份文件都使用显式、稳定的英文标题 ID。中文页面中的代码、键、路径、版本与 API 名称保持原样。
提案开头要有可见的草案状态，并包含：

1. 状态、负责人、日期和受影响契约面；
2. 背景与证据；
3. 目标与明确非目标；
4. 提议行为，以及输出、无障碍、安全边界；
5. 兼容与迁移影响；
6. 实现与归属检查器计划；
7. 验收标准与待决问题；
8. 记录提案自身变化的决策日志。

大型实验可以在 [`../research/`](/zh/docs/design/research/) 下增加带日期的页面；临时日志与生成
产物不进入 Hugo 内容，也不进入 Git。

## 生命周期 {#lifecycle}

```text
草案提案
    ├── 拒绝或被替代 → 从活动树移除，由 Git 历史保存
    └── 接受
          ├── 实现与归属检查器
          ├── 受影响的中英文契约
          ├── 理由具有长期价值时新增已接受 Design 决策
          └── 相关受众需要时更新变更记录、迁移与用户文档
```

提案被接受后不会自动成为第二份契约。稳定行为进入归属契约，稳定理由进入 Decisions，用户步骤进入
相关指南，然后把提案退出活动导航。本地构建、提交、tag、公开模块、消费站 pin 与部署仍是相互独立
的完成状态。

## 评审门禁 {#review-gate}

实施前，评审者确认提案没有重复已有外壳、resolver、组件族或数据权威。实施期间，如果设计改变，
先更新这份双语提案，不能让代码悄悄漂移。验收至少覆盖主题的最窄归属检查、真实文档站、渲染后的
中英文、相关输出、无障碍与响应式检查。

## 只读 Studio 候选 {#cli-studio-candidate}

2026-10-04 当前 CLI 移除 Studio。使用 `oink dev`、普通编辑器与
`inspect`/`check` 结构化报告。[R7 记录](/zh/docs/design/research/2026-10-03-cli-maintenance-acceptance/#r7)
保留此前浏览器实现的历史验收。

## 受审阅编辑 {#cli-editing-candidate}

当前 CLI 移除通用源码编辑，保留受保护的 `new`、`move`、审阅记录与基线计划。
旧编辑计划会被拒绝。[R8 记录](/zh/docs/design/research/2026-10-03-cli-maintenance-acceptance/#r8)
继续作为历史证据，不是当前命令 API。

---

本节页面：

- [反向链接与知识图谱](/zh/docs/design/proposals/knowledge-graph/): 从普通 Hugo 链接推导反向链接、局部与全站图谱的三阶段设计草案。
- [媒体收敛](/zh/docs/design/proposals/media-convergence/): 正文图片、编号图、Landing 媒体与代表图片选择之间剩余收敛工作的设计草案。
- [Agent 批量索引](/zh/docs/design/proposals/agent-indexes/): 基于 OINK 既有 Markdown 输出与导航权威，可选生成按 section 分包的全文包和稳定导航 JSON。
- [OINK CLI 与下一阶段产品路线](/zh/docs/design/proposals/oink-cli-roadmap/): 已接受的独立 CLI 边界与首期本地候选，并明确保留后续采用、主题、迁移及内容模型提案。
- [OINK CLI 文档维护路线图](/zh/docs/design/proposals/oink-cli-maintenance-roadmap/): 文档维护与 Oink Studio 的 R1–R8 历史需求记录，保留对应验收证据并指向当前精简 CLI 契约。
- [Book 出版链路](/zh/docs/design/proposals/book-publication/): 把 Book 语义降级与通用 EPUB/PDF 打包收回 OINK，同时让出版事实继续属于消费站。
- [视觉预设与外观切换](/zh/docs/design/proposals/visual-presets/): Paper 与 Slate 已在本地实现；Ink 与 Terminal 提供显式开启的实验，等待视觉定稿。

---

反链：

- [设计](/zh/docs/design/)
- [决策](/zh/docs/design/decisions/)
- [研究](/zh/docs/design/research/)
- [CLI 功能概览](/zh/docs/start/cli-overview/)
