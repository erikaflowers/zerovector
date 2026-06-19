# A Facilitator's Guide to the Vector Document

An orientation for facilitators — what the vector document is, how it works, how it connects to the workshops and discovery sessions you already run, and why it matters for working with AI agents.

---

## What the Vector Document Is (and Isn't)

A vector document is a single file that captures the strategic doctrine for a product. It lives in a code repository and it's the first thing an AI agent reads before making any product decision. Think of it as the briefing document that gives an agent the same context a senior team member carries in their head — who the product is for, what principles guide decisions about how it gets built, where it sits in the market, and what research supports those positions.

Its purpose is to frame the scope that an agent needs in order to make better decisions — whether that's designing features, choosing architecture, or prioritising work. It is not a project brief, not a PRD, and not a strategy deck. Those artifacts are written for humans to read and discuss. A vector document is written for agents to consume and act on. This distinction matters: it needs to be concise enough that an agent can parse it quickly, specific enough that it constrains decisions rather than leaving them open, and structured consistently so agents know where to find what they need.

For a facilitator, the vector document is the destination your discovery work points toward. The workshops you run, the interviews you synthesize, the canvases you fill in — all of that thinking eventually distills into this document. You don't need to write one from scratch (that's not the intended workflow), but you do need to understand what it contains and why, because the quality of a vector document depends directly on the quality of the upstream work that feeds it.

---

## How Does This Fit Into Your Process?

The vector document is a destination, not a starting point. The starting point is the same as it's always been: you're kicking off a product and you need to understand a bunch of things and answer a bunch of questions. So you run workshops — user research, competitive analysis, JTBD sessions, value proposition exercises, persona development.

Your workshop outputs feed this document directly. They give it its shape and its detail. Each section of the vector document corresponds to the kind of thinking a facilitator already produces: the persona work populates Target User, the positioning exercises distill into Competitive Position, the principles that emerge from discovery become the Design Doctrine. The raw artifacts themselves get registered in the Research Manifest so that agents can go deeper when they need to.

In practical terms, it's almost a checklist: what workshops do I need to run in order to capture the detail needed to populate a vector document? If you can answer that, you already know how this fits into your process.

---

## The Sections and How They Relate

A vector document has five main sections. They're ordered deliberately — each one builds context for the next, and an agent reading top-to-bottom arrives at decisions with the full picture.

### Product

The simplest section. Name, domain, URL, plus aditional sections that help with framing the scope of the product (e.g. business model or product surface). This is the "what are we even talking about" section. It grounds everything that follows.

For example, when a vector document was written for an open-access scientific publisher platform, adding a business model line made it clear that authors pay to publish and readers access content for free. That single detail reframes every product decision: the submission pipeline is the revenue engine, the reading platform is the dissemination side. Without it, an agent making design decisions has no way to know which side of the product is commercially load-bearing.

The same exercise also brought up a product surface question. The platform has both a reading experience and an editorial submission pipeline: different users, different workflows, different teams. Trying to write one vector document for both muddied every section that followed. Adding a product surface line ("this document covers the reading/dissemination side only") drew the boundary up front and kept every subsequent section focused on one audience and one set of decisions.

### Target User

Three tiers: primary user, secondary user, and anti-user. The anti-user is the one that does the most work — it tells agents who *not* to design for, which is often harder to articulate than who you're serving.

Below those tiers sits the user archetype: a short narrative portrait of the person you're building for, specific enough to be a real human but general enough to represent the pattern. This is where a facilitator adds the most value — turning abstract user segments into a concrete person with a workflow, a frustration, and a reason to care.

If the product serves multiple distinct user types, you can add multiple archetypes in order of priority.

### Design Doctrine

The principles that govern every product decision. Each one follows a pattern: the principle as a memorable phrase, then a short paragraph explaining what it means in practice. These principles are not aspirational values. They're decision-making rules. An agent encountering a design choice should be able to point to a doctrine entry and say "this is why I chose X over Y."

When facilitating the sessions that produce these, the test is: does this principle actually constrain a decision, or is it true of every product? "Build trust with users" constrains nothing. "The article page is the front door — researchers arrive via Google, not the homepage" constrains everything about how you prioritise design effort.

### Competitive Position

This section defines what the product is, what it isn't, and the gap it fills for users. The "is not" statement is particularly important — it tells agents which adjacent categories to actively avoid designing toward.

This section draws on the same competitive analysis and positioning work a facilitator would produce using methods like a value proposition canvas or an elevator pitch, just summarised and distilled. The raw artifacts get registered in the research manifest section (below) for agents to read as needed.

### Research Manifest

A table at the bottom of the document that registers every structured research artifact in the repository — persona files, JTBD analyses, interview syntheses, competitive analyses etc. Each entry records what the file contains, what method produced it, and when it was last updated.

The manifest connects the conclusions in the sections above to the evidence that produced them. The design doctrine didn't appear from nowhere — it was informed by user interviews, by competitive analysis, by workshop outputs. The manifest is where that provenance lives. Without it, a person reviewing the document (or an agent reasoning about whether a principle still holds) has no way to trace a section back to its source.

For facilitators, this is the section that most directly represents your work. The workshops you run produce artifacts. Those artifacts get synthesized into structured data. That data gets registered here. The manifest is the bridge between your workshop outputs and the agent-facing doctrine above. Making that connection explicit — which research informed which section — is where the document becomes auditable rather than just authoritative.

---

## What Good Looks Like

The most important quality in a vector document is specificity. Specific enough to constrain real decisions, not just describe the product in general terms. This shows up differently in each section:

- **Product** — the document should be scoped clearly: one document, one product surface, with clear boundaries.
- **Target User** — the archetype should be a concrete person with a workflow, a frustration, and a reason to care — not a marketing segment.
- **Design Doctrine** — the principles should rule things out. If a principle is true of every product, it isn't doing work. "Build trust with users" doesn't help an agent make a decision. "The article page is the front door" means you're not spending design effort on the homepage, and that's immediately actionable.
- **Competitive Position** — the "is not" statement draws a boundary that tells agents which directions to actively reject.

A good vector document is also traceable. You should be able to follow a section back to the manifest entry that informed it. If there's a Target User section but no user research or persona work registered in the manifest, something is missing — either the research hasn't been done, or it hasn't been captured. That connection between sections and their source material is what makes the document trustworthy rather than just authoritative.

Finally, a vector document should be stable over time. It changes when the product strategy changes, not with every feature cycle. The doctrine and positioning represent durable decisions. If they're shifting constantly, either the strategy isn't settled or the document is capturing the wrong level of detail.

*Open questions — not yet answered, need more practical experience to resolve:*

- *What's the threshold for "good enough to hand to agents" versus "needs more work"?*
- *How do you evaluate whether agents are actually using the document well — what does misuse look like?*
