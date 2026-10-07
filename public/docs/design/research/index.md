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
| [Community issue and PR review, 2026-09-19](/docs/design/research/2026-09-19-upstream-review/) | Reproductions, PR acceptance advice, and remedies for sidebar, focus, and search feedback |
| [OINK 1.1 release review, 2026-09-20](/docs/design/research/2026-09-20-release-review/) | Five runtime repairs, documentation readiness, validation evidence and publication boundaries |
| [CLI acceptance snapshot, 2026-09-29](/docs/design/research/2026-09-29-cli-acceptance/) | Executed Starter, real-site, offline, upgrade, and reproducible-archive checks; final local acceptance and public release remain separate |
| [Visual preset acceptance, 2026-10-05](/docs/design/research/2026-10-05-visual-presets-acceptance/) | Paper/Slate local implementation, actual output and bounded browser evidence |
| [Ink and Terminal experiment, 2026-10-05](/docs/design/research/2026-10-05-ink-terminal-experiment/) | Explicit experimental presets, design tradeoffs and real-site verification |
| [OINK 1.2 pre-release review, 2026-10-05](/docs/design/research/2026-10-05-v1-2-release-review/) | Final local candidate checks, cleanup, local resources, compatibility and publication boundaries |

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
- [Ink and Terminal experiment, 2026-10-05](/docs/design/research/2026-10-05-ink-terminal-experiment/): Explicit experimental presets in real theme output, their design tradeoffs, checks and remaining work.
- [OINK 1.2 pre-release review, 2026-10-05](/docs/design/research/2026-10-05-v1-2-release-review/): Local 1.2.0 candidate review, cleanup, compatibility, resource provenance and publication checks, with release boundaries.
- [Visual preset acceptance, 2026-10-05](/docs/design/research/2026-10-05-visual-presets-acceptance/): Local Paper and Slate verification, real theme output, and bounded browser evidence.
- [Consumer and migration evidence](/docs/design/research/consumer-evidence/): A dated corpus snapshot that shaped OINK's shells, authoring primitives, and deterministic Book migration policy.
- [OINK comprehensive review, 2026-08-26](/docs/design/research/2026-08-26-comprehensive-review/): An evidence-based review of OINK's post-v0.7.0 implementation, configuration, outputs, security, tests, performance, bilingual contracts, and real integration site.
- [Community issue and PR review, 2026-09-19](/docs/design/research/2026-09-19-upstream-review/): Evidence, acceptance advice, and focused remedies for community issues 40, 41, 42, 44 and pull request 43.
- [OINK 1.1 release review, 2026-09-20](/docs/design/research/2026-09-20-release-review/): Five reproduced runtime defects, documentation corrections, validation evidence, and the OINK 1.1 publication follow-up.
- [CLI maintenance acceptance on 2026-10-03](/docs/design/research/2026-10-03-cli-maintenance-acceptance/): Dated source and binary evidence for the R1–R8/A18 local implementation program, preserving its initial audit, failed trials, and final supported acceptance scope.
- [CLI acceptance snapshot, 2026-09-29](/docs/design/research/2026-09-29-cli-acceptance/): Executed Starter, real-site, offline, upgrade, and reproducible-archive checks for the local CLI candidate, with final acceptance and publication kept separate.

---

Backlinks:

- [Design](/docs/design/)
- [Decisions](/docs/design/decisions/)
- [Proposals](/docs/design/proposals/)
