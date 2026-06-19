# vector.md — Fictioneer

> This file is the doctrine and manifest for upstream research in this repository.
> Agents read this file FIRST to understand the product, the user, and the principles.
> Structured research data lives in the `vector/` directory as JSON files.
> This file tells you what exists and where to find it.

---

## Product

**Name:** Fictioneer
**Domain:** AI-powered story development platform for fiction authors
**URL:** https://getfictioneer.com

---

## Target User

**Primary:** Fiction authors managing complex, multi-book narratives (50K–500K+ words)
**Secondary:** Worldbuilders, game writers, screenwriters with extensive lore systems
**Anti-user:** Casual journalers, poets, short-form writers who do not need lore management

### User Archetype

A fiction author 2–4 books into a series. They have built a world larger than they can hold in their head. They love writing but dread the bookkeeping. They have tried wikis, spreadsheets, Scrivener notes, and re-reading their own manuscripts. None of it scales. They are one continuity error away from losing reader trust.

---

## Design Doctrine

These principles govern every product decision. Agents should internalize them.

1. **"If it is canon, it is clickable."** Every entity reference in the system is a navigable link. No dead text.

2. **The author's knowledge, externalized.** Fictioneer knows what the author knows. RAG over their own books, not the internet.

3. **Context follows you.** The AI knows what you are working on. It does not ask "which book?" or "which character?" It already knows.

4. **Triage → Staging → Permanent.** All data has a lifecycle. Chat produces ideas. Workbench stages them. Canon and Studio are permanent homes. Nothing skips a step.

5. **The Prose IDE is sacred.** The writing space is minimal, focused, distraction-free. No toolbars, no chips, no suggestions unless invoked. The author writes. The tool watches silently.

6. **Craft over convenience.** Fictioneer helps authors write better, not faster. It surfaces structure, identifies patterns, flags inconsistencies. It does not generate prose unless asked.

7. **Built by a writer, for writers.** Every feature exists because the founder needed it for her own 414K-word series. If it does not serve the craft, it does not ship.

---

## Competitive Position

**Fictioneer is not:** A writing assistant, an AI ghostwriter, a grammar checker, or a project manager.

**Fictioneer is:** A story development platform with perfect recall of your own canon.

**The gap we fill:** Between "I wrote 400K words" and "I can actually find and use what I wrote."

---

## Research Manifest

The `vector/` directory contains structured upstream research as JSON files. Each file is the machine-readable output of a design thinking exercise, workshop, or research synthesis. Agents should reference these files when making product decisions.

| File | Contains | Method | Last Updated |
|------|----------|--------|-------------|
| `vector/jtbd.json` | Jobs to Be Done analysis | JTBD Canvas | 2026-02-20 |

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

This directory can contain dozens or hundreds of files. The manifest is the index. The JSON files are the data. Neither goes stale because both are code in the repository, version-controlled, and reviewed by humans before agents consume them.

---

*Last updated: 2026-02-20*
*Updated by: Samantha (Erika Flowers)*
*Status: Active — agents read this file first for all product decisions*