# Final Stress Test Report — Investiture: Non-Developer Practitioner

**Kestrel:** K-004
**Date:** 2026-03-17
**Scope:** Can a non-developer practitioner (facilitator) use Investiture and the Zero Vector methodology to do real work?
**Version tested:** Investiture v1.3.0

---

## What Works

What a facilitator encounters that already lands — the parts of the framework and tooling that translate without modification.

- The VECTOR.md's section structure acts as its own prompt — Target User, Design Doctrine, Competitive Position all guided the thinking without needing external instructions [1][2][3]
- The is/is-not/gap framing in Competitive Position — immediately usable for anyone who's done positioning work [4]
- The Investiture README's "What just happened" pattern — explaining what a script did after running it builds trust [5]
- The three-file doctrine concept (VECTOR.md / CLAUDE.md / ARCHITECTURE.md) — the reading order and separation of concerns is clearly explained [5][6]

---

## What Doesn't Work

The friction points — where a non-developer practitioner gets stuck, confused, or self-selects out.

- Terminal is never introduced — the first command appears with no indication of where to type it [7][8]
- Opening line and README language assumes a developer audience — "scaffold," "skill chain," "React scaffold" signal this isn't for you [9][10]
- make-it-mine treats agent identity as configuration when it's actually a design conversation — bash prompts for job title and model selection can't capture working relationship, voice, or iteration [11]
- Setup prompts throughout assume developer knowledge — Homebrew dependencies, git history reset, repo visibility all ask yes/no questions without enough context to answer [12][8]
- The VECTOR.md template is structured for output, not input — it shows what the finished document looks like but not how to get thinking into it. A facilitator needs a process, not just a container [13][14][15]
- Provenance gap — sections present conclusions without connecting them to the research that produced them. The manifest exists but sits disconnected from the sections it should feed [16][17]

---

## What's Missing

Gaps in the current framework — things that don't exist yet but would need to for non-developer practitioners to succeed.

- No linked or annotated example of a completed VECTOR.md — the template alone isn't enough, the Fictioneer example does heavy lifting that isn't acknowledged [18][15]
- No guidance on scope boundaries — "what is one product?" seems obvious until a facilitator is looking at a platform with multiple surfaces and needs to decide whether to split or combine [19]
- No bridge from the Investiture page to Open Vector Learn for readers who aren't ready for the quick start — they hit a dead end instead of a path forward [20]
- No guidance on how agents should weight or arbitrate between conflicting research findings as the manifest grows [21]
- No "facilitator entry point" anywhere in the current materials — the facilitator's guide produced by this stress test is the first document that speaks to this audience directly [22]

---

## Top 3 Recommended Changes

If Investiture ships three changes before non-developer practitioners try it again, these move the needle most. Ordered by effort (cheapest first), not by importance — changes 2 and 3 are arguably deeper shifts for facilitator adoption, but change 1 is the gate that determines whether anyone gets far enough to benefit from them.

### 1. Rewrite the entry experience to not assume a developer

**Impact:** High — addresses the single biggest barrier. A non-developer reads the first paragraph and decides this isn't for them before they get to anything useful.

**Effort:** Low — documentation and language changes only. No architecture, no code.

**What it is:** Combines friction points 1, 2, and 5 — the README opening line, terminal introduction, and setup prompt explanations. Lead with what Investiture gives you, introduce terminal as a prerequisite, add context sentences before every prompt. The fix is language, not architecture. [7][8][9][12]

### 2. Replace make-it-mine.sh agent identity prompts with a guided conversation model

**Impact:** High — changes how practitioners understand the tool. Reframes agent setup from "fill in five fields" to "design your working relationship with your AI collaborator," which is what it actually is.

**Effort:** Medium-high — requires rethinking the onboarding flow, not just rewriting prompts.

**What it is:** Split the setup into two distinct activities. The mechanical setup (project name, git reset, GitHub repo) can stay as a script — those are genuinely configuration. But everything about agent identity should be pulled out and reframed as a guided design activity:

- A "start here" guide that sets expectations: this takes time, you'll have a conversation with Claude, here's roughly what you're working toward.
- An annotated reference CLAUDE.md — a real one, filled out for a real project, with inline comments explaining why each section has the depth it has.
- The expectation that practitioners open Claude, have the conversation, and use the reference as a benchmark — not that they answer five terminal prompts and move on. [11]

### 3. Make the VECTOR.md traceable — connect sections to the research that produced them

**Impact:** High — this is the change that matters most for facilitators, who are trained to show their working. The VECTOR.md currently presents conclusions without connecting them to the work that produced them. A facilitator can't trace a section back to its source, and neither can an agent reviewing the document later. Solving provenance makes the framework trustworthy and auditable rather than just authoritative. [16][17]

**Effort:** Medium-high — the core change is architectural (how the manifest relates to sections above it), but there are two concrete sub-points that make it shippable:

- **Ship an annotated example** that shows what provenance looks like in a completed VECTOR.md — a real one, with inline comments explaining why each section has the depth it does and what upstream work produced it. The template alone isn't enough; the Fictioneer example is already doing heavy lifting that isn't acknowledged. [15][18]
- **Make the template's relationship to upstream work explicit** — which workshops feed which sections, so the template guides input, not just output. Right now the template is structured for output: it shows what the finished document looks like but not how to get thinking into it. If the provenance connections existed, the template would implicitly guide the creation process because you'd see what kind of upstream work each section requires. [13][14]

---

## Deliverables Produced

Work products from the three-week stress test, available as appendices in this directory.

| Document | Description |
|----------|-------------|
| `week1/Todds-first-impressions.md` | Raw first reactions to VECTOR.md and jtbd.json — provenance, trust, research arbitration |
| `week1/reading-notes.md` | Line-by-line review of Investiture site page and GitHub README |
| `week1/friction-journal.md` | 12 timestamped entries creating a VECTOR.md from scratch as a facilitator |
| `week1/VECTOR.md` | The VECTOR.md produced during the exercise (ACME Scientific Publishing) |
| `week2/friction-report.md` | Structured top 5 friction points with specific recommendations |
| `week2/investiture-notes.md` | Investiture site and README feedback extracted from reading notes |
| `week2/facilitators-guide-to-the-vector-document.md` | Plain-language guide to the VECTOR.md for facilitators — first document that speaks directly to this audience |

---

## Open Questions

Unresolved questions surfaced during the stress test that are outside K-004's scope but worth tracking.

- What's the threshold for "good enough to hand to agents" versus "needs more work"? [23]
- How do you evaluate whether agents are actually using the VECTOR.md well — what does misuse look like? [23]
- What does better decision-making look like for an agent as the research manifest scales? [21]

---

## References

- [1]: week1/friction-journal.md — Entry 2 (Target User clicked immediately)
- [2]: week1/friction-journal.md — Entry 7 (Design Doctrine format did the work)
- [3]: week1/friction-journal.md — Entry 9 (Competitive Position is/is-not/gap was clean)
- [4]: week1/friction-journal.md — Entry 9
- [5]: week1/reading-notes.md — Investiture README review
- [6]: week2/investiture-notes.md — What You Get / Project Structure
- [7]: week2/friction-report.md — Friction Point 1
- [8]: week1/reading-notes.md — README review (terminal never introduced)
- [9]: week2/friction-report.md — Friction Point 2
- [10]: week2/investiture-notes.md — Hero section
- [11]: week2/friction-report.md — Friction Point 3
- [12]: week2/friction-report.md — Friction Point 5
- [13]: week1/friction-journal.md — Entry 1 (no process, only output structure)
- [14]: week1/friction-journal.md — Entry 5 (hand-crafting vs machine-generating)
- [15]: week1/friction-journal.md — Entry 11 (example doing heavy lifting)
- [16]: week1/friction-journal.md — Entry 10 (provenance is the most important facilitator friction)
- [17]: week1/Todds-first-impressions.md — What's Confusing (work that produced the JSON is invisible)
- [18]: week2/friction-report.md — Friction Point 4
- [19]: week1/friction-journal.md — Entry 6 (scope boundaries — when to split vs combine)
- [20]: week2/investiture-notes.md — Quick Start section
- [21]: week1/Todds-first-impressions.md — Open Questions (conflicting findings, agent arbitration)
- [22]: week2/facilitators-guide-to-the-vector-document.md — entire document
- [23]: week2/facilitators-guide-to-the-vector-document.md — Open Questions
