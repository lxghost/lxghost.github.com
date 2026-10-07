# PostgreSQL ecosystem library

> A Hugo operations library for PostgreSQL components, with shared search and navigation across upstream manuals and partially translated language trees.

---

LLMS index: [llms.txt](/llms.txt)

---

[The PostgreSQL ecosystem library](https://github.com/pgsty/pgsql.cc) brings the operating manuals for Patroni, HAProxy,
etcd, PgBouncer, pgBackRest, and pgBadger into one PostgreSQL-focused library.
The case snapshot counted 217 English pages and 80 Chinese pages.

This case describes the Hugo component library. The [PGSQL.CC](https://pgsql.cc/) public portal is a separate Django application.

## What it demonstrates {#what-it-demonstrates}

- Giving several upstream products a consistent local information architecture.
- Publishing English first while Chinese coverage grows over time.
- Keeping partial translation useful instead of blocking publication on parity.
- Using subtrees to preserve clear product boundaries inside an aggregate site.

Choose this pattern for a curated technical library where sources and
translation maturity vary, but readers benefit from one search and one visual
system.

→ [Multilingual configuration](/docs/customize/i18n/) · [All OINK cases](/case/)

---

Backlinks:

- [Cases](/docs/about/showcase/)
