# Facilitator Use Cases — VECTOR.md in Practice

**Kestrel:** K-004
**Date:** 2026-03-17
**Scope:** Realistic scenarios where a facilitator uses VECTOR.md and what they'd need the tool to do

---

## Use Case 1 — Greenfield: New Product, Starting from Scratch

**Trigger:** A team has an idea for a new digital product. They've had anecdotal conversations, they think they see a gap in the market, maybe they've talked to a few potential users informally. Nothing structured yet. They want to use agents from the start and need a VECTOR.md to orient them.

**What the facilitator is doing:** The facilitator's first move is to read the empty VECTOR.md template and reverse-engineer a workshop agenda from it. The sections tell them what they need to come out of the day with: Target User means they need a persona session. Competitive Position means they need a positioning exercise. Design Doctrine means they need a "what do we believe and how do we make decisions" conversation. Product is the framing they'll establish first to scope everything else. The template becomes the brief for the workshop, not just the destination for the outputs.

They run a one-day discovery workshop. By the end, they're holding concrete outputs: an elevator pitch, empathy maps or personas, and a value proposition canvas. They want to seed the VECTOR.md so agents can start working while the team validates what they've captured.

The elevator pitch maps to Product and Competitive Position. The personas map to Target User. The value proposition canvas feeds Design Doctrine. But none of it has been validated yet — every section they populate is assumptive until follow-up research confirms it. The manifest will have a handful of entries at best — the outputs from a single day. It won't tell the facilitator what's missing, because the VECTOR.md isn't opinionated about what research artifacts should exist. But a sparse manifest is still a signal: the evidence base is thin, and the facilitator's job is to look at each section and judge whether what's backing it is enough or whether it needs deeper validation.

**Key questions the facilitator faces:**
- What's the minimum viable VECTOR.md that's useful to an agent? Not every section will have research behind it on day one.
- Which sections can I populate from today's workshop outputs, and which ones need their own dedicated sessions?
- How do I signal that a section is assumptive — populated from instinct or a single workshop — versus backed by validated research? And how does that signal change as follow-up research comes in?
- What other workshop formats would feed sections that today's activities didn't cover? (e.g., a JTBD session for deeper user motivation, a competitive landscape mapping exercise, stakeholder interviews for design principles that the team holds implicitly but hasn't articulated)

**What the tool needs to support:**
- A way to connect manifest entries to the sections they inform, so the facilitator can see at a glance which sections have research behind them and which are running on instinct. The manifest won't tell you what's missing — that's the facilitator's judgment — but the presence or absence of a link is a meaningful signal.
- A path from "workshop output" to "manifest entry" — the facilitator needs to know how to take what they produced in the room and register it as a research artifact that feeds a specific section.
- Enough guidance on minimum viable content per section that the facilitator can judge "this is good enough to start with" versus "this needs more work before an agent can use it."

---

## Use Case 2 — Existing Product: Introducing Agents to an Established Team

**Trigger:** An established digital product with an existing development team. The team has a signal from their user research that an existing feature needs improvement, and they want to use this as a trial for agentic-assisted development — bring in an agent or two to work alongside the dev team on the feature. To do that, they need to share enough knowledge and context with the agents so they can make informed decisions about how to improve the feature.

The knowledge exists, but it's institutional. It's in people's heads, in old slide decks, spread across Confluence pages, in product and user research tools, in PDFs. The artifacts have lived various lives: raw data became user research findings became a report became a slide deck for a lunch-and-learn session. Each transformation is a step further from the source, and each artifact lives in a different place, potentially owned by different teams or roles. Thi context llives in different places and has never been brought together cohesively. There's no single place where a new person joining the team (which is essentially what an agent is doing) can go to get the full picture.

**What the facilitator is doing:** The facilitator starts with the VECTOR.md template and works backwards: given these sections, what do we already have that maps to them? They're auditing existing knowledge against the vector document structure — finding what's already validated by real research, what's institutional assumption that nobody's questioned, and what's genuinely missing because humans were filling the gaps implicitly.

Practically, they decide to download everything into one directory the agent can access — Confluence pages, slide decks, PDFs, research reports — rather than linking to live sources, because access is a problem. Confluence needs a login. The agent won't have one. Downloading is the simplest path to getting everything in one place without worrying about authentication or API hooks. This creates a snapshot of the context, unlinked from the sources that populate it.

Once the artifacts are gathered, the facilitator maps them to VECTOR.md sections and registers them in the manifest. But not all artifacts are created equal. Some research is over 12 months old but still valid — the team is still using those learnings to inform decisions. Other artifacts are stale but they're all that exists for a given section. The facilitator needs to signal that difference: how fresh or stale an artifact is, and whether staleness means "outdated" or just "old but still load-bearing."

**Key questions the facilitator faces:**
- Which existing artifacts map to which sections of the VECTOR.md? Some will map cleanly, others will partially feed multiple sections, and some sections may have nothing.
- What have we assumed we know but never actually validated with research? Institutional knowledge feels like fact until you try to write it down and realize there's no evidence behind it.
- What's genuinely missing — gaps nobody noticed because humans were filling them implicitly?
- How do I signal artifact freshness? "12 months old but still valid" and "12 months old and probably stale" are different situations that look the same in a manifest entry without additional context.

**What the tool needs to support:**
- A way to ingest and reference existing artifacts in their current form — decks, docs, PDFs, interview notes — without requiring them to be restructured first. The facilitator is gathering, not rewriting.
- The provenance link working in reverse: given this pile of artifacts, which section does each one feed? The facilitator is mapping from evidence to sections, not from sections to evidence.
- A way to signal artifact freshness and confidence — not just "this artifact exists" but "this artifact is current and validated" versus "this is the best we have but it needs refreshing." The manifest needs more than a filename and a date.

---

## Use Case 3 — Maintaining Over Time: New Research Arrives

**Trigger:** A team has been using the VECTOR.md and agents for a while — regardless of whether they started greenfield or from an existing product. The manifest has built up. Agents are making decisions informed by the doctrine and research. Now, new user research comes in: a fresh round of interviews has produced updated personas, and a follow-up workshop has generated updated JTBD artifacts using those findings as input. Both relate to sections and manifest entries that already exist.

There's a plumbing problem underneath this. The research lives in a tool like Dovetail, and agents can't reach into it. The team has rigged up a workflow to bridge the gap — maybe a Zapier integration that pushes findings to a shared file, maybe periodic downloads into the research directory, maybe a Slack channel the agent can read as a guest. The specifics of the integration matter less than the fact that the team has had to solve this with sticky tape, and that solution is now the path new research travels to reach the agents.

**What the facilitator is doing:** Quality control and decision-making. The new research has arrived in the directory. The facilitator now needs to answer a series of questions about how it relates to what's already there.

The updated personas are a refinement — the team's understanding of their users has deepened, not reversed. The existing persona artifact in the manifest isn't wrong, it's just thinner than what they now know. The Target User section of the VECTOR.md was informed by the old personas and may need updating to reflect the new nuance.

The updated JTBD artifacts are more disruptive. The workshop surfaced jobs that reframe how the team thinks about user motivation. The previous JTBD artifact isn't just thinner — some of its framing is now outdated. The Design Doctrine section, which drew on the old JTBD work, needs reviewing against the new findings.

For each artifact, the facilitator decides: does the old entry get archived, removed, or kept alongside the new? The new research just IS the current research — the flag isn't "supersedes" on the new artifact, it's "archived" or "replaced" on the old one. But whether the old one should stay in the manifest as historical context depends on whether the agent benefits from understanding the evolution or whether the old entry is just noise.

**Where this could go:** This workflow — new research arrives, facilitator decides how it relates to existing artifacts, updates the manifest and sections accordingly — feels like it could be partially handled by a dedicated curator agent. An agent that watches for new artifacts, flags how they relate to existing manifest entries, and prompts the facilitator with specific decisions rather than leaving them to discover the conflicts themselves. The facilitator still makes the calls, but the legwork of identifying what's affected is automated. This is a future capability, not something the framework supports today, but it's worth flagging as a direction.

**Key questions the facilitator faces:**
- Does this new research replace an existing artifact, or refine it? Updated personas that deepen understanding are different from updated JTBD that reframe motivation entirely.
- Does the agent benefit from seeing both old and new (understanding the evolution), or is the old artifact now noise that muddies decisions?
- Which VECTOR.md sections were informed by the artifacts being superseded? The provenance links should tell the facilitator exactly which sections to review — if those links exist.
- How do I flag the old manifest entry? "Archived," "replaced," "historical" — what's the right signal, and does the answer depend on the type of research?

**What the tool needs to support:**
- A status or lifecycle field in the manifest — not just filename and date, but whether an entry is active, archived, or replaced, and what replaced it. The new artifact just gets added. The decision is about what happens to the old one.
- Provenance links that work as change propagation: if a manifest entry is archived, the facilitator should be able to trace which VECTOR.md sections it informed and review whether those sections still hold against the new research.
- Guidance on when to keep history versus clean replace. User research that evolved over time may benefit from both versions being accessible — the agent can see the trajectory. A competitive analysis overtaken by a market shift is just outdated and should be removed. The framework needs to help the facilitator make that judgment rather than leaving it entirely to instinct.
