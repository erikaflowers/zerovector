# vector.md — ACME Scientific Publishing

> This file is the doctrine and manifest for upstream research in this repository.
> Agents read this file FIRST to understand the product, the user, and the principles.
> Structured research data lives in the `vector/` directory as JSON files.
> This file tells you what exists and where to find it.

---

## Product

**Name:** ACME Scientific Publishing
**Domain:** Open-access scientific journal publishing — reading and research dissemination platform
**Scope:** This VECTOR.md covers the reading/dissemination side only. The submission, peer review, and editorial pipeline is a separate product surface with its own users, workflows, and teams.
**Business model:** Open access — authors pay to publish (article processing charges), readers access content for free. The submission/publication pipeline is the revenue side. The reading platform is the dissemination side.
**URL:** https://acmescientificpublishing.com

---

## Target User

**Primary:** Academic scientists who need to stay current in their field, discover relevant research, and follow citation chains across the scientific literature
**Secondary:** Institutional librarians who help researchers find and access content, particularly older material behind traditional paywalls
**Anti-user:** Casual science readers — content is open-access and Google-indexable, but assumes domain expertise to read and interpret

### User Archetypes

**Early career researcher.** Building their knowledge base. Actively searching for relevant work in their niche, learning how to navigate the literature efficiently, and assembling a personal repository of PDFs and references. Less experienced at evaluating which articles matter and which to skip.

**Senior researcher.** Deep expertise in their field. Uses the platform to stay current, follow citation chains, and monitor new work by known peers. Knows exactly what they're looking for and moves fast — skim abstract, check references, download PDF, move on.

---

## Design Doctrine

These principles govern every product decision. Agents should internalize them.

1. **"Trust compounds, distrust is instant."** Every touchpoint either builds or breaks trust. Professional, clear, warm but never quirky. Guidance copy is neutral, slightly friendly, and always helpful.

2. **"The article page is the front door."** Researchers arrive via Google, not the homepage. The article page is the homepage. Design accordingly.

3. **"Support the real workflow, don't replace it."** Researchers skim abstracts, download PDFs, manage them in their own tools. Make the grab-and-go path frictionless while offering reasons to stay.

4. **"References are navigation."** Researchers follow citation chains. If an article is even slightly relevant, the references section is the next click. Surface it as a first-class shortcut.

5. **"Show impact the old metrics hide."** Traditional impact factor preserves incumbents. Alt-metrics demonstrate reach and influence beyond the journal — connected to the open-access argument that good science doesn't need a prestige gatekeeper.

6. **"Journal brand first, publisher brand second."** Each journal has its own community and identity. The publisher brand provides a seal of credibility, but the journal is what the researcher identifies with.

---

## Competitive Position

**ACME Scientific Publishing is not:** A prestige gatekeeper. We don't decide what's relevant. We are not a legacy incumbent selecting only high-profile research for high-impact-factor journals.

**ACME Scientific Publishing is:** An open-access reading platform across a broad stable of journals and fields. All content is freely accessible — no paywalls, no institutional logins. Science compounds; even small increments matter, and open access ensures nothing is hidden behind a gate.

**The gap we fill:** Researchers need to find, read, and follow scientific literature without access barriers. Traditional publishers lock content behind subscriptions and institutional agreements. We make the full text available to anyone, anywhere.

---

## Research Manifest

The `vector/` directory contains structured upstream research as JSON files. Each file is the machine-readable output of a design thinking exercise, workshop, or research synthesis. Agents should reference these files when making product decisions.

> **Note:** This manifest is reconstructed from memory for a stress-test exercise. The artifacts listed below existed during the original project but the JSON files have not been created for this repo.

| File | Contains | Method | Last Updated |
|------|----------|--------|-------------|
| `vector/elevator-pitch.json` | Two-sentence structured elevator pitch for ACME Scientific Publishing | Elevator Pitch framework | — |
| `vector/value-proposition-canvas.json` | Value proposition canvas — user profile (right), value map (left), product-market fit (centre) | Value Proposition Canvas | — |
| `vector/personas.json` | User personas: early career researcher, senior researcher, librarian, funder | Persona development | — |
| `vector/journal-identity-research.json` | Findings from interviews with senior researchers and journal editors on journal vs publisher brand, mental models of the relationship, and community trust | Stakeholder interviews | — |
| `vector/article-page-research.json` | Validation research on the article page as primary entry point — user behaviour, content hierarchy, and the "article as homepage" hypothesis | User research | — |

### How to use this manifest

1. Read this file (vector.md) for doctrine, principles, and product context.
2. Consult the manifest table above to find relevant structured research.
3. Read the specific JSON file(s) for detailed, structured data.
4. Apply both doctrine AND data when making decisions.

### Adding new research

When new upstream research is conducted (personas, competitive analysis, user interviews, usability findings, market research), the output is:

1. Synthesized into structured JSON
2. Placed in the `vector/` directory
3. Registered in the manifest table above with file name, contents, method, and date

---

*Last updated: 2026-03-09*
*Updated by: Todd Carter (K-004 stress test)*
*Status: Exercise — reconstructed from memory, not production*
