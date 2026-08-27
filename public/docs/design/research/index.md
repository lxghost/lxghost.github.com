# Design research

> Dated experiments and consumer evidence used to make OINK design decisions, without normative force.

---

LLMS index: [llms.txt](/llms.txt)

---

> [!NOTE] Evidence, not a contract
> Research records what was measured, with which inputs and tool versions.
> Results may explain a decision, but they do not override the current
> contracts or implementation.

Research belongs in the public Design tree when another maintainer can inspect
its method, understand its limits, and repeat the relevant check. Raw agent
transcripts, temporary build logs, and local absolute paths do not meet that
standard.

## Research map {#research-map}

| Record                                                                                       | Evidence                                                                           |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Goldmark block attributes](/docs/design/research/goldmark-attributes/)                      | Render-hook visibility and CommonMark container limits on the supported Hugo floor |
| [Consumer and migration evidence](/docs/design/research/consumer-evidence/)                  | A dated corpus survey plus deterministic Book migration results                    |
| [Comprehensive review, 2026-08-26](/docs/design/research/2026-08-26-comprehensive-review/)   | Implementation, configuration, output, security, test, performance, and doc audit  |

## Publication rules {#publication-rules}

A research record states its date, inputs, relevant versions, method, result,
and known limits. Volatile counts are labeled as snapshots. External framework
comparisons are refreshed from primary sources before publication and distilled
into OINK-relevant conclusions rather than copied as a competitor catalogue.

When a result becomes a stable product choice, link it from an accepted
[decision](/docs/design/decisions/). When it proposes behaviour that does not
exist, move the design question to [Proposals](/docs/design/proposals/).

---

Section pages:

- [Goldmark block-attribute evidence](/docs/design/research/goldmark-attributes/): Reproducible findings for lists, images, tables, passthrough blocks, fences, callouts, and nested containers on Hugo 0.160.1 and 0.164.0.
- [Consumer and migration evidence](/docs/design/research/consumer-evidence/): A dated corpus snapshot that shaped OINK's shells, authoring primitives, and deterministic Book migration policy.
- [OINK comprehensive review, 2026-08-26](/docs/design/research/2026-08-26-comprehensive-review/): An evidence-based review of OINK's post-v0.7.0 implementation, configuration, outputs, security, tests, performance, bilingual contracts, and real integration site.

---

Backlinks:

- [Design](/docs/design/)
- [Decisions](/docs/design/decisions/)
- [Proposals](/docs/design/proposals/)
