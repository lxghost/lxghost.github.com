# Operations

> Running the site from a laptop to production — local preview, deployment, comments, analytics and SEO, upgrades and troubleshooting.

---

LLMS index: [llms.txt](/llms.txt)

---

This section covers what happens after the content is written: previewing
locally, building and deploying the output, wiring up comments and analytics,
following theme versions, and locating faults. The previous five sections decide
how the site looks and what it says; this one decides whether it builds, where
it is deployed, and how a problem is diagnosed.

## Find it by task {#where-to-go}
| What you want to do | Where to go |
| --- | --- |
| See a change on your own machine | [Local preview](/docs/admin/preview/) |
| Build a deployable `public/` | [Local preview](/docs/admin/preview/#production-build) |
| Deploy to GitHub Pages / Cloudflare / Netlify | [Deploy](/docs/admin/deploy/) |
| Deploy to a subpath such as `example.com/docs/` | [Deploy](/docs/admin/deploy/#baseurl) |
| Let readers comment at the bottom of a page | [Comments](/docs/admin/comments/) |
| Connect Google Analytics or a self-hosted alternative | [Analytics and SEO](/docs/admin/analytics/) |
| Get indexed correctly by search engines | [Analytics and SEO](/docs/admin/analytics/#indexing) |
| Upgrade the theme, or migrate from Docsy or 0.4 | [Upgrade](/docs/admin/upgrade/) |
| A build error, no search results, a 404 | [Troubleshooting](/docs/admin/troubleshooting/) |

---

Section pages:

- [Local preview](/docs/admin/preview/): Preview changes with hugo server, build a deployable public/ with hugo --panicOnWarning, and need neither Node nor a CDN.
- [Deploy](/docs/admin/deploy/): Publish public/ to GitHub Pages, Cloudflare Pages or any static host — matching baseURL, Content Security Policy, the acceptance checklist and rollback.
- [Comments](/docs/admin/comments/): Wire GitHub Discussions into a comment section at the bottom of a page with giscus — on site-wide, off per page, following light and dark.
- [Analytics and SEO](/docs/admin/analytics/): Connect an analytics service (or none), and pair up the canonical, hreflang, social cards, sitemap and robots the theme already generates.
- [Upgrade](/docs/admin/upgrade/): Move to a new theme version, convert 0.4 shortcodes to v5 syntax with the migration toolkit, migrate from Docsy, and roll back when something goes wrong.
- [Troubleshooting](/docs/admin/troubleshooting/): Symptom → cause → fix for the four fault classes — build, language, search, platform — plus the checks a site can run for itself.

---

Backlinks:

- [Customization](/docs/customize/)
