# 定制站点

> 站点级配置：品牌、导航、布局、搜索、多语言、多版本、打印与 Agent 输出。

---

LLMS 索引： [llms.txt](/zh/llms.txt)

---

本栏目覆盖站点级配置：`hugo.yml` 里的参数、`data/` 下的数据文件、`assets/` 下的样式入口。单个页面的写法与 front matter 见[创作内容](/zh/docs/write/)。

## 按改动目标查找 {#what-to-change}

| 改动目标 | 对应页面 |
| --- | --- |
| 站名、Logo、favicon | [品牌外观](/zh/docs/customize/brand/#logo) |
| 配色、深浅色模式、字体 | [品牌外观](/zh/docs/customize/brand/#colors) |
| 顶栏菜单与下拉 | [导航与菜单](/zh/docs/customize/navigation/#main-menu) |
| 侧栏宽度、图标密度、目录深度 | [布局与页面类型](/zh/docs/customize/layout/#sidebar) |
| 首页与落地页 | [首页与落地页](/zh/docs/customize/home/) |
| 全文检索与索引范围 | [全文检索](/zh/docs/customize/search/) |
| 命令面板里的条目 | [命令面板](/zh/docs/customize/panel/) |
| 快捷键 | [键盘导航](/zh/docs/customize/keyboard/) |
| 新增一门语言 | [多语言](/zh/docs/customize/i18n/) |
| 多版本站点与归档横幅 | [多版本](/zh/docs/customize/versions/) |
| 标签与分类 | [分类体系](/zh/docs/customize/taxonomy/) |
| 编辑本页、最后修改、贡献者 | [仓库与页面信息](/zh/docs/customize/repository/) |
| 打印与整章导出 | [打印支持](/zh/docs/customize/print/) |
| `llms.txt` 与每页 `.md` 输出 | [Agent 支持](/zh/docs/customize/agents/) |
| 某个参数的类型与默认值 | [配置总览](/zh/docs/customize/config/) |

评论、分析与部署需要接入外部服务，见[维护管理](/zh/docs/admin/)。

---

本节页面：

- [配置总览](/zh/docs/customize/config/): 主题真正会读的每一个站点参数：类型、默认值、去哪一页改。查参数从这里开始。
- [品牌外观](/zh/docs/customize/brand/): 替换站名、Logo、favicon、主色、深浅色与字体，只需改配置与两个 SCSS 入口文件。
- [首页与落地页](/zh/docs/customize/home/): 用一份本地 YAML 组合首页：Hero、卡片、能力面板、时间线、定价、案例、下载。任意页面也能用同一套分区做成落地页。
- [导航与菜单](/zh/docs/customize/navigation/): 配置顶栏菜单与下拉、栏目切换器、面包屑、页面操作、翻页器和页脚链接。
- [布局与页面类型](/zh/docs/customize/layout/): 用 type 决定一页用哪种外壳，再调侧栏宽度与图标、目录深度、栏目首页样式和页宽。
- [全文检索](/zh/docs/customize/search/): 打开本地搜索，控制索引体积与结果排序，让中文查询也能命中。
- [命令面板](/zh/docs/customize/panel/): 一个对话框同时承担页面搜索、页面动作与站点命令：如何打开、包含哪些分组、如何添加自定义命令。
- [键盘导航](/zh/docs/customize/keyboard/): 全部单键快捷键、它们何时让行给输入，以及按站点或按页面关闭的方法。
- [多语言](/zh/docs/customize/i18n/): 增加一种语言、并排放置译文、按语言配置菜单与界面文案，并对齐中英标题锚点。
- [多版本](/zh/docs/customize/versions/): 配置版本切换菜单与归档横幅，并选择多个版本在域名上的部署布局。
- [分类体系](/zh/docs/customize/taxonomy/): 用 tags / categories 给页面加一条横跨目录的索引：术语页、筛选芯片、右栏分类云与顶栏分类面板都是自动的。
- [仓库与页面信息](/zh/docs/customize/repository/): 把「编辑当前页面」「提交文档议题」「查阅编辑历史」接到你的仓库，并在页尾显示最后修改时间、贡献者与反馈组件。
- [打印支持](/zh/docs/customize/print/): 单页交给浏览器的 Cmd/Ctrl+P，整个栏目用 print 输出格式合成一份连续文档。
- [Agent 支持](/zh/docs/customize/agents/): 每一页多产出一份 .md，站点根目录多一份 llms.txt，读者可以把当前页交给 ChatGPT 或 Claude。

---

反链：

- [卡片](/zh/docs/components/cards/)
- [Agent 支持](/zh/docs/customize/agents/)
