# Customization

> Site-level configuration — brand, navigation, layout, search, languages, versions, print and agent output.

---

LLMS index: [llms.txt](/llms.txt)

---

This section covers site-level configuration: the parameters in `hugo.yml`, the
data files under `data/`, and the style entry points under `assets/`. Writing an
individual page and its front matter is in [Authoring](/docs/write/).

## Find it by what you want to change {#what-to-change}

| What you want to change | Page |
| --- | --- |
| Site name, logo, favicon | [Brand and appearance](/docs/customize/brand/#logo) |
| Colours, light and dark mode, fonts | [Brand and appearance](/docs/customize/brand/#colors) |
| The navbar menu and its dropdowns | [Navigation and menus](/docs/customize/navigation/#main-menu) |
| Sidebar width, icon density, outline depth | [Layouts and page types](/docs/customize/layout/#sidebar) |
| The home page and landing pages | [Home and landing pages](/docs/customize/home/) |
| Full-text search and its index scope | [Search](/docs/customize/search/) |
| What appears in the command palette | [Command palette](/docs/customize/panel/) |
| Keyboard shortcuts | [Keyboard navigation](/docs/customize/keyboard/) |
| Adding a language | [Languages](/docs/customize/i18n/) |
| Multi-version sites and the archive banner | [Versions](/docs/customize/versions/) |
| Tags and categories | [Taxonomies](/docs/customize/taxonomy/) |
| Edit this page, last modified, contributors | [Repository links and page info](/docs/customize/repository/) |
| Print and whole-chapter export | [Print](/docs/customize/print/) |
| `llms.txt` and the per-page `.md` output | [AI-agent support](/docs/customize/agents/) |
| A parameter's type and default | [Configuration](/docs/customize/config/) |

Comments, analytics and deployment need an external service; they are in
[Operations](/docs/admin/).

---

Section pages:

- [Configuration](/docs/customize/config/): The one place site parameters are defined — every key the theme reads, with its type, default and the guide that covers it.
- [Brand and appearance](/docs/customize/brand/): Replace the site name, logo, favicon, accent colour, light and dark palettes and fonts, using configuration and two SCSS entry points.
- [Home and landing pages](/docs/customize/home/): Assemble a home page from one local YAML file — hero, cards, capability panels, timeline, pricing, case studies, downloads. Any page can become a landing page with the same sections.
- [Navigation and menus](/docs/customize/navigation/): Configure the navbar menu and its dropdowns, the section switcher, breadcrumbs, page actions, the pager and the footer links.
- [Layouts and page types](/docs/customize/layout/): Let `type` decide which shell a page uses, then adjust sidebar width and icons, outline depth, section index style and page width.
- [Search](/docs/customize/search/): Turn on local search, control index size and result ranking, and make CJK queries land.
- [Command palette](/docs/customize/panel/): One dialog carrying page search, page actions and site commands — how to open it, what it groups, and how to add commands of your own.
- [Keyboard navigation](/docs/customize/keyboard/): Every single-key shortcut, when each stands down for typing, and how to turn them off per site or per page.
- [Languages](/docs/customize/i18n/): Add a language, keep translations side by side, configure menus and interface strings per language, and align heading anchors across languages.
- [Versions](/docs/customize/versions/): Configure the version switcher and the archive banner, and choose how several versions are laid out across domains.
- [Taxonomies](/docs/customize/taxonomy/): Give pages a second index that cuts across the directory tree with tags and categories — term pages, filter chips, the rail cloud and the navbar panel are all automatic.
- [Repository links and page info](/docs/customize/repository/): Wire "edit this page", "open an issue" and "view history" to your repository, and show the last-modified line, contributors and the feedback widget at the page end.
- [Print](/docs/customize/print/): A single page goes to the browser's Cmd/Ctrl+P; a whole section becomes one continuous document through the print output format.
- [AI-agent support](/docs/customize/agents/): Give every page a `.md` twin, the site root an `llms.txt`, and the reader a way to hand the current page to ChatGPT or Claude.

---

Backlinks:

- [Cards](/docs/components/cards/)
- [AI-agent support](/docs/customize/agents/)
