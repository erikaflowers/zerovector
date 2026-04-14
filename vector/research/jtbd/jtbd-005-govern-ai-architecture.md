# JTBD-005: Govern AI-Generated Architecture

**Priority:** High
**Personas:** persona-004 (Technical Leader)

## Job Statement

When my engineering team is generating code with AI at scale, I want architectural governance that AI agents respect automatically, so I can maintain codebase coherence without manual review becoming the bottleneck.

## Current Alternatives

- Linters and formatters — catch syntax, miss architecture
- Code review by humans — doesn't scale at AI generation speed
- Style guides and wikis — nobody reads them, AI ignores them
- Monorepo conventions — enforces structure but not intent

## Evidence

- Investiture skill chain: preflight → manifest → architecture audit → remediate → verify
- ARCHITECTURE.md doctrine: "Never silently break the architecture. Always do it the right way first."
- Investiture invest-architecture skill: "Reads YOUR doctrine at runtime and checks the codebase against what YOU declared"
- Technical Leader persona: "I need the system to enforce the rules"
