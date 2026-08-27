# Design and development

> OINK maintainer contracts, accepted decisions, dated research, and proposals in one canonical bilingual section.

---

LLMS index: [llms.txt](/llms.txt)

---

> [!IMPORTANT] OINK 0.8.0 contract
> This section publishes the maintainer contracts released with OINK 0.8.0,
> with Hugo Extended 0.160.1 as the compatibility floor. The canonical
> bilingual sources live in this repository under `content/docs/design/`.

This section is the durable design record for OINK. It complements the
task-oriented guides elsewhere on the site: use those guides to build a site,
and use this section to understand current invariants, the reasons behind them,
the evidence used to evaluate alternatives, and work that is still only a
proposal.

## Reading this section {#reading-this-section}

| Layer     | Meaning                                                              |
| --------- | -------------------------------------------------------------------- |
| Contracts | Normative behavior that compatible implementations must preserve     |
| Decisions | Accepted rationale and boundaries that explain current behavior      |
| Research  | Dated, non-normative evidence that may need to be refreshed          |
| Proposals | Draft PRDs and RFCs; publication here is not proof of implementation |

## Contract map {#contract-map}

| Contract                                      | Authority                                                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Architecture](/docs/design/architecture/)    | Build, configuration, diagnostics, featured images, output, security, accessibility, and performance |
| [Components](/docs/design/components/)        | Component API, Book and release primitives, validation, and output degradation                       |
| [Shell and navigation](/docs/design/shell/)   | Navigation, search, blog presentation, actions, taxonomies, and page-end composition                 |
| [Landing pages](/docs/design/landing/)        | Landing data, the 22-section registry, runtime, accessibility, and outputs                           |
| [Migration boundary](/docs/design/migration/) | Supported 0.4-to-current content and configuration migrations                                        |

## Design records {#design-records}

| Collection                           | Contents                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| [Decisions](/docs/design/decisions/) | Accepted diagnostic, configuration, and authoring rationale                       |
| [Research](/docs/design/research/)   | Goldmark probes and evidence from real OINK consumers                             |
| [Proposals](/docs/design/proposals/) | Active PRDs for knowledge graphs, media convergence, and machine-readable indexes |

Create every new OINK PRD or RFC as an English and Chinese page pair under
`content/docs/design/proposals/`. Do not create another repository-local
`plan/`, `plans/`, or `proposal/` tree. Once a proposal is accepted, update the
implementation, owning checker, and relevant contract; preserve the stable
rationale under Decisions and retire the draft through Git history and the
changelog.

## Authority and maintenance {#authority-and-maintenance}

This directory owns the maintainer design prose in English and Chinese. The theme
repository owns executable facts: `hugo.yaml` owns published defaults; owning
resolvers and checkers define optional shapes; `layouts/` and `assets/` own
rendered behavior; check scripts and `tests/goldens/` own validation; and
`VENDOR.json` owns bundled versions, licenses, files, and checksums.

Whenever public behavior changes, update the implementation, its owning
checker, and both language versions of the relevant contract in the same
delivery. Tests should exercise behavior and output rather than pinning prose.

---

Section pages:

- [Architecture contract](/docs/design/architecture/): Repository assembly, configuration, diagnostics, output, performance, security, CSS, accessibility, and release-state boundaries.
- [Component contract](/docs/design/components/): The maintainer contract for OINK authoring primitives, validation, Book and release behavior, and output degradation.
- [Shell and navigation contract](/docs/design/shell/): Navigation authorities, immersive blog presentation, search, actions, taxonomies, indexes, and page-end composition.
- [Landing contract](/docs/design/landing/): The maintainer contract for landing data, the built-in section registry, language resolution, runtime, accessibility, and outputs.
- [OINK migration boundary](/docs/design/migration/): The supported source, configuration, and validation boundaries for migration from OINK 0.4 through OINK 0.8.0.
- [Design decisions](/docs/design/decisions/): Accepted choices that explain why OINK's public contracts and implementation have their present shape.
- [Design research](/docs/design/research/): Dated experiments and consumer evidence used to make OINK design decisions, without normative force.
- [Design proposals and PRDs](/docs/design/proposals/): The canonical bilingual home for OINK PRDs and designs that are still being evaluated.

---

Backlinks:

- [OINK Docs](/case/oink/)
- [Docs](/docs/)
- [Decisions](/docs/design/decisions/)
