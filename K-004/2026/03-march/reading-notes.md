# Reading Notes — Investiture Docs & Zero Vector Methodology

**Operator:** Todd Carter (K-004)
**Date started:** 2026-03-06
**Task:** Read the Investiture documentation and Zero Vector methodology overview — take notes on anything confusing, unexplained, or assumed

---

## Overall First Impressions

The central idea is real and it's important. One practitioner with AI agents traversing a pipeline that used to require a team of specialists — that's not futurism, it's a testable proposition. Zero Vector is making a specific, arguable claim about how work changes when you remove the handoff. I believe the claim. The challenge isn't the idea; it's how the idea is currently being communicated.

**The site is doing too much at once.** The homepage hosts the full principles, the full "Is Not/Is" cards, the full pipeline comparison, and the full philosophy — all of it. Every sub-page then feels like a repeat of something you've already seen, which makes the site feel padded and the sub-pages feel low-value. The better structure is already there; it just needs to be committed to. Homepage as short, compelling overview that earns the click. Sub-pages as the full-depth version. /philosophy is where the principles live. /approach is where the pipeline lives. The homepage should tease those things and send you there, not try to replace them.

**The principles are the clearest version of this problem.** Seven principles, but II, V, and VI are all circling the same idea — one person, no handoff, no role walls — just with different framing each time. By Principle VI the repetition is undeniable. Either collapse those three into one tighter principle, or write an upfront architecture map that tells the reader how they connect and differentiate before they read them. Right now the reader does that work themselves, and they're likely to conclude the list is padding. The "Is Not / Is" cards on Section 005 do a better job of creating clear, distinct contrasts using the same before/after format — there's something to learn from that. The format forces distinction; the principles don't have the same constraint working for them.

**The emotional work is partially there but not deliberately designed.** The movement is asking practitioners to let go of a professional identity they've spent years building. Some moments on the site handle that really well — the "Is Not / Is" card that says designers are embedded deeper than ever, Section 007's "You do not have to accept the old way." But Principle VII's "people who accept the old definition get left behind" cuts the opposite direction — it provokes rather than supports. As a facilitator, I know that kind of statement lands differently depending on where someone is in the process. If they're still in grief, it's alienating. If they've already crossed over, it's energizing. The movement doesn't seem to have consciously designed for the difference. That's worth addressing — not by softening the principles, but by building more deliberate on-ramps for people who are still processing the transition.

**The practitioner-audience gap shows up most clearly in the README.** The methodology is explicitly pitched at designers, facilitators, and non-developers. But the first line of the Investiture README says "A React scaffold with clean architecture" and the Setup section starts with `git clone` commands without telling anyone to open a terminal first. Those two things are in tension. If the goal is genuinely to lower the floor, the entry documentation needs to meet people where they actually are — not assume they'll figure it out because they got this far.

**From a facilitator's perspective specifically:** the vector.md and jtbd.json make immediate sense. They look like the outputs of a well-run workshop — clear artefacts, unambiguous structure, easy to hand off. What's invisible is the work that produced them: who was in the room, what exercises generated this, what was contested. That provenance gap matters for trust. Analog workshop outputs have the same problem (sticky notes don't explain themselves), but Zero Vector actually has the infrastructure to do better — maintaining provenance in a way a photograph of a whiteboard never could. The question of what to capture and for whom seems unresolved, and it's worth pursuing. This connects to the bigger open question about how agents should weight conflicting or superseded research findings as the manifest grows — there's a lot of potential here that hasn't been fully worked through yet.

**Overall:** the methodology is coherent and the core claim is worth making. The site is fighting itself architecturally in ways that obscure the quality of the ideas. The highest-value intervention isn't more content — it's simplifying the homepage, tightening the principles, and deciding who the entry experience is actually designed for. Those three things would do more work than adding any new pages.

---

## zerovector.design (Homepage)

### Hero + Sections 001–003

#### What makes sense

- Hero section is strong. "A new discipline" — big, bold statement of intent. "No intermediary, no translation layer, no friction from intent to artifact directly." Clear and punchy.
- "What Is Zero Vector?" (section 001) is a good high-level explanation. Movement, approach, network of practitioners — covers it.
- "For designers who build. For leaders who ship. For anyone tired of the handoff." — makes it feel inclusive and broad, not locked to one role. Good.
- The three CTAs (Learn the philosophy, Start building, Transform your org) give you options: jump in or keep reading. Smart.

#### What's confusing

- The Declaration (section 002): the summary on the homepage is too thin. It says "it does not have to be this way" — but what way? The full article (Substack piece) explains it, but the homepage summary doesn't pull enough of that through. You get "They are not assistants. They are crew" as the big callout, but without the setup of *what's wrong with the current way*, that line doesn't land as hard as it should. Needs one more sentence between "it does not have to be this way" and the crew callout — something that names the problem before offering the reframe.
- The ambiguity is probably intentional (build intrigue, draw people in) and it partially works. But right now it's doing intrigue without enough substance to make the reader feel like they *get* it enough to click through.
- Section numbering (001, 002, 003...) is working well — makes the navigation order clear.

**Section 003 — The Pipeline Re-imagined:**
- Opening paragraphs are really clear. Name-checks Lean, Agile, Double Diamond — big recognizable ideas in software dev and design — then connects them all to Jobs to Be Done theory as the underlying framework. Good move: it grounds Zero Vector in something established rather than presenting it as invented from nothing.
- "Zero Vector applies that thinking across every phase of the pipeline" — clear, no ambiguity.
- The before/after pipeline panels are great — really effective way to show the contrast.
- For a total newcomer: what *is* Lean? Agile? Double Diamond? Could use tooltips or inline definitions for these terms — hover/tap to get a one-liner. Doesn't need to be full links to external sources (though that's an option too). Adds some noise, but if the goal is truly supporting people with no background, it would help. Low-cost addition.

**Pipeline before/after panels:**
- Market Research: makes sense. But "RAG-indexed research corpus" — RAG (Retrieval-Augmented Generation) is AI jargon that won't land with non-technical readers. Could be more plain English. The second part ("every insight at your fingertips") is great though — as a UX researcher, being able to just *talk* to your findings and embed them into what you're building is the dream.
- Customer Research: fine, same RAG note applies.
- Jobs to Be Done: the labelling feels off — the card describes framing work, and Jobs to Be Done is a methodology, not a pipeline step in itself. Note: the /approach page has a fuller 8-step pipeline that both names this correctly and includes a separate Problem Framing step entirely absent from the homepage. These two pipeline diagrams need to be reconciled. See clarification note in /approach section.
- Ideation: good. The "Before" card calls out diverge/converge/repeat — nice nod to the Double Diamond for those who know it. No issues.
- Prototyping: the "Before" cards are *incredibly* validating as a UX designer. "High-fidelity mockups in Figma. Clickable prototypes." — feeling very seen. Love it.
- Prototyping → Validation → Build & Ship: these three are effectively **collapsed** in the Zero Vector paradigm. From prototyping onwards, you're building the real thing — working code, no handoff, the designer built it with agents, it's shippable, you can test the actual product. If you read all three panels it becomes clear, but the *insight* that these steps merge together could be called out more explicitly. The seven-step comparison works — keep it, because it meets people where they are using the existing mental model. But *after* the comparison, add the punchline: in Zero Vector, seven steps become four or five because prototyping, validation, and shipping collapse into one continuous flow. Show the familiar model remapped, *then* state explicitly what just happened. The comparison earns the insight — then you name it. That's one of the most powerful ideas here and it's currently left for the reader to figure out on their own.

#### What's unexplained or assumed

#### Questions I have

---

### Section 004 — The Seven Principles

**Structural finding:** The homepage is hosting full expanded content for all seven principles — verbose accordion summaries plus expanded "why it exists" paragraphs plus article links. The /philosophy page already has a tighter version of each principle (title + single punchy tagline + contextual paragraph). The homepage summaries in their collapsed state are actually *more* verbose than the /philosophy taglines, and the expanded content is largely duplicated across both pages.

**Suggested fix:** Switch the principles content between the homepage and /philosophy. The homepage section shows the /philosophy version of the principles, then links to /philosophy as source of truth. And the /philosophy page shows the homepage version of the principles with/without the accordion.

**Intro paragraph** — the copy preceding the accordion:

*"These principles are intentionally opinionated and polarizing. They exist to help you make decisions in times of indecision or crisis, not to be generic or all-purpose. They are opinionated on approach, agnostic on tool. That is the difference. These are the principles Zero-Vector Design lives by."*

- Points are all present but don't hang together — short sentences stacked rather than a coherent intro.
- "Not to be generic or all-purpose" is redundant.
- Lead with "opinionated on approach, agnostic on tool" — that's the sharpest, most distinct claim. Let that be the hook.
- "These are the principles Zero-Vector Design lives by" — ambiguous subject, could be cut.

### The Seven Principles — per-principle notes

These notes are kept here as the principles currently live on the homepage. If the suggested fix is implemented, they apply wherever the full content ends up.

**TL;DR**
- Principles II, V, and VI are all circling the same idea — one person, no handoff, no role walls — with different framing each time. By Principle VI the repetition is undeniable. Either consolidate the three into one, or add an upfront architecture map that shows how they connect and differentiate before you read them.
- Principle IV is doing connective synthesis work but reads like a repeat. It needs to own its role explicitly: I → II → III → therefore IV.
- The "Is Not / Is" cards (Section 005 on the homepage) create clearer distinctions than the principles do, using overlapping content. The before/after format constraint forces distinction. Worth examining why the principles feel murkier by comparison.
- Principle VII is the only one that feels genuinely new after the II/V/VI repetition. Strong closer.
- Cross-cutting emotional gap: Principle VII's "people who accept the old definition get left behind" and Section 007's "you have permission to build the next thing" are pulling in opposite directions. The movement needs a more deliberate posture toward the emotional transition it's asking of its audience.

**Principle Zero** — Clear, no issues. Calling it "zero" signals foundational — above the numbered principles, not one of them.

**Principle I — Work in the Medium** — Core idea lands. Two actionable notes: (1) "Hands on the rock. No gloves." is unclear — if it's a reference to something, it's not signposted; if not, cut it. (2) Best line is buried in the expanded section: *"Work in the medium means: touch the real thing. Every day. From the beginning."* — that should be in the summary, not at the end of the accordion.

**Principle II — Boundaryless by Nature** — Closing line (Principle Zero callback) doesn't earn its place as the button line. *"It is the process of having an idea and making it real"* is stronger as a closer. The real insight — that boundaries dissolve not because skills stop mattering but because they stop being separate activities — is buried in the expanded content.

**Principle III — The Medium is the Message** — Strongest of all seven. Does exactly what it needs to. No issues.

**Principle IV — The Purpose of a System is What It Does** — Reads as repetition of earlier principles without surfacing what's new. It's actually doing connective synthesis — I (where you work) → II (who does it) → III (how the medium shapes thinking) → therefore IV (what the system actually produces). But that chain is never made explicit. Also: cites Stafford Beer's POSIWID concept throughout but links to *Thinking in Systems* by Donella Meadows. Those are different thinkers. Needs a direct link to something on Stafford Beer — even a Wikipedia entry.

**Principle V — Design and Build are the Same Act** — Nearly identical language to Principle II. "No handoff because there is no separation" vs II's "they stop being separate activities." If the distinction is simultaneity vs sequentiality, the writing doesn't surface it. Pattern flagged: each summary should be able to stand alone and answer — *what does this principle say that none of the others do?* Most can't pass that test in their current form.

**Principle VI — Dissolve the Hyperspecialization** — Repetition fully confirmed. II, V, and VI are all circling the same idea. The Heinlein quote is fun but doesn't make the principle feel distinct. Two options: collapse II/V/VI into one tighter principle, or write an intro architecture map that explicitly shows how they connect and differentiate before the reader encounters them.

**Principle VII — Venture Past the Possible** — Feels genuinely new. Clarke reference is a strong choice. Expanded section doesn't go much further than the summary. Closing line — *"the people who accept the old definition are the ones who get left behind"* — is intentionally polarizing, by design. Note: this is the sharpest version of the emotional transition question. The movement is asking people to let go of a professional identity. This line speaks to people who've already crossed over; it may alienate people still in the process of getting there. Worth a conscious decision about whether that's intentional and whether it's calibrated correctly.

---

### Section 005 — What This Is Not. What This Is.

- The card animation on load is a nice touch — communicates that there's more to see without making you wonder if you're scrolling past duplicates.
- **Not vibe coding / Intentional creation at full velocity:** Covers similar ground to the principles (collapsing the gap between intention and execution) but calling out vibe coding specifically is necessary and distinct. Has to be said. Fine.
- **Not AI replaces designers / The designer embedded deeper than ever:** This directly addresses the identity and grief point flagged in Principle VII — are we as a movement helping people work through this realization? This card is doing that work. It's the most emotionally intelligent moment on the page so far.
- **Not tool worship / Tool fluency:** First time this point has been made anywhere on the page. It's new, it's clear, it lands. Good.
- **Not moving fast and breaking things / Moving fast and building things that hold:** Strong. Love it.
- **Not solo heroism / Leverage at every scale:** Good reframe — it's not "one person does everything," it's that the leverage ratio changes at every scale: individual contributor, small team, organization. That's an important distinction. But right now we've only seen the individual contributor story demonstrated. No examples of a small team or org adopting this approach yet. That would add significant credibility to this card. Early days, but worth flagging.
- **Not no process:** Clear and necessary. The Double Diamond isn't dead. Good.
- **Not the death of craft / Craft finally unshackled:** Strong closer for the card sequence.
- **Not a job title / A way of working:** Clean ending. Works well.
- **Overall observation on repetition:** The page spends a lot of real estate on the dissolving-of-boundaries / old-designer-to-developer-handoff theme — in the pipeline section, across multiple principles, and again here. The question is whether that's intentional. If it is — if the goal is to really knock designers over the head until the realization lands — that might actually be the right call for the audience. But it risks diluting the clarity of the more distinct points. Worth a conscious decision either way: is the repetition strategic, and if so, is it calibrated correctly?
- **Format brings clarity:** These cards are working better than the principles do, even where they cover overlapping themes. Same before/after card format as Section 003 (the pipeline) — that's why they're landing. The format forces distinction: you can't blur two cards together. It raises a question for the principles: is there a way to make them feel as distinct and sharp as these? Right now the principles feel murky by comparison.
- **Note:** These same cards appear verbatim on /philosophy — see /philosophy notes on verbatim content reuse across the site.

---

### Section 006 — Why "Zero Vector"? (links to zerovector.design/name)

- The framing — *"a name that means something different in every discipline and the same thing in all of them"* — is a strong hook. Intriguing immediately.
- The four discipline sections (The Design, The Physics, The Aerospace, The Quantum) all work well. Each one earns its place and the progression feels considered.
- The visual at the top: a coordinate axis with a green dot and orange square — confirmed in later review as an animation that plays once and doesn't loop. See Bugs section.
- **Duplication issue:** "The Meaning" section at the end covers the same ground as the four discipline sections — especially The Aerospace entry, which already says "zero relative motion... no drift... intent and position are identical." By the time you reach The Meaning, you've already absorbed the point. The closing statement (*"Zero distance between intent and artifact. No drift. No translation loss. No signal degradation. The gap is zero. That is what the name means."*) also appears to repeat itself within The Meaning section — the same idea is stated twice in slightly different words.
- Suggestion: either fold The Meaning into the four sections as a synthesis line, or drop the sub-label "The Meaning" from those four sections and let The Meaning stand alone as the clean closer. Right now it's both and it creates redundancy.

---

### Section 007 — Set Coordinates

- *"You do not have to accept the old way. You have permission to build the next thing."* — This is doing exactly what was flagged in the Principle VII aside: it's speaking to people who may be grieving their old identity. It's the movement taking a posture of support, not just provocation. Good.
- The two CTAs (For Practitioners / For Organizations) are well split — gives individual makers and org leaders a clear path without either feeling like an afterthought.
- Open Vector curriculum section is prominent — six levels, 60+ lessons, free. That's a strong credibility signal and worth the real estate.
- Recommended Reading section: appears here as well as on /for-builders, /media, and linked from the principles. See /media notes for the consolidated observation on recommended reading fragmentation across the site.
- Page ends cleanly. Good place to close.

---

## zerovector.design/philosophy (Mindset → Philosophy)

### What makes sense

- **The Seven Principles:** The /philosophy taglines are sharper and punchier than the homepage accordion summaries. "No lanes. No disciplines. No artificial walls between thinking and making." "Do not look at what a process claims to produce. Look at what it actually produces." These are doing more work in fewer words. This page is the source of truth for the principles.
- **Lineage section:** Good. Connects Zero Vector to its intellectual predecessors and shows it as part of an ongoing movement rather than something invented from nothing. Lends credibility. Worth keeping.

### What's confusing

- **"What Zero Vector Is" section:** How is this different from Section 001 on the homepage? Almost the same language. Duplication without added depth.
- **Verbatim "Is Not / Is" cards:** Appear on both the homepage and here. If it's everywhere it doesn't feel like it belongs anywhere. The homepage is trying to do the job of every sub-page simultaneously — none of the sub-pages feel like they have distinct value as a result.
- **The Arc:** New — not covered on the homepage. Good. But four paragraphs of text describing a visual/conceptual thing. Needs a reference image or diagram. Without it, "the Arc" stays abstract in a way no amount of prose can fix.
- **Overall structural insight:** This page — not the homepage — should be the source of truth for what Zero Vector is and what it stands for. Simplify the homepage. Send people here.

### Bugs (see Bugs section)

- **"Why Zero Vector" link / /name animation:** See Bugs section. (Animation plays once and stops — should loop.)
- **"See It in Practice" section:** See Bugs section. (CSS alignment issue — should be center-aligned, isn't.)

---

## zerovector.design/approach (Mindset → How It Works)

### What makes sense

- This is the expanded, full-depth version of the Section 003 pipeline on the homepage. Done well — the full 8-step sequence is substantially more informative than the 7-step homepage version.

### What's confusing

- **Step count discrepancy — significant finding:** The approach page has 8 pipeline steps. The homepage has 7. The missing step is **Problem Framing**, which sits at position 1 on the approach page, before Market Research. This is the foundational step — before any research or building, you frame the problem — and it's absent from the homepage pipeline entirely. This also recontextualises an earlier note: on the homepage, "Jobs to Be Done" was flagged as a heading that felt wrong because JTBD is a methodology, not a pipeline step. On the approach page, that's resolved — Problem Framing is its own step (step 1), and JTBD sits separately at step 4. The homepage is presenting an incomplete and slightly misleading version of the pipeline.
- **Clarification note — two separate pipeline issues to reconcile:**
  1. Homepage step 3 is labelled "Jobs to Be Done" — the labelling is wrong because JTBD is a methodology, not a step, and the card actually describes framing work.
  2. Separately, the /approach page has a completely distinct step 1 called "Problem Framing" — this is the foundational framing step that precedes all research, and it's entirely absent from the homepage pipeline.
  These are two different problems. The first is a labelling issue on the homepage. The second is a missing step. They're related but not the same fix.
- **Homepage pipeline cards should link here:** Same structural note as /philosophy on homepage-as-firehose. The homepage pipeline cards should link explicitly to this page — if they don't, a lot of depth is invisible to most readers.
- **Page feels truncated:** Compared to other sub-pages, /approach appears to be missing the bottom-of-page elements that appear elsewhere — newsletter signup, community CTAs, "Join the Movement" section. Either they're there and not visible, or the page is inconsistent with the rest of the site. Worth checking.

---

## zerovector.design/origin (Mindset → The Origin)

- **Three image boxes are broken:** See Bugs section. (Boxes for Erika Flowers, NN/g speaking photo, and AI agents photo all rendering empty.)
- **Content about Erika and how Zero Vector was created:** Good. Contextualises the movement as coming from three decades of lived experience, not a sudden pivot. Helps with credibility. The NASA and federal agency background adds weight.
- **Repetition between Author and Crew sections:** The intro copy of both sections covers similar ground before branching into their respective content. Could tighten the Author intro so it doesn't anticipate what the Crew section then also says.
- **The cards in the Crew section:** First time this layout has appeared. Good — it's a new format and it's showing something that hasn't been laid out clearly elsewhere on the site.

---

## zerovector.design/ask

- An AI chat interface for the site. No issues.

---

## zerovector.design/quiz — Am I Vibe Coding?

- Questions include: go from idea to shipped product, what happens between design and implementation, how do you use AI, how many roles touch a feature, what's your biggest frustration. Personal observation: deeply relatable and slightly triggering for anyone who's lived the old process. That's by design and it works.

---

## zerovector.design/for-builders

### What makes sense

- The five-step Getting Started sequence is good. Clear, practical, well-written. The content is there — it's the page architecture that needs work, not the content itself.
- Coaching (mailto to Erika) is fine — low friction, honest about what it is.
- Reading list is strong. These are genuinely good books.

### What's confusing

- **Duplicate CTA problem:** The homepage button says "Start Building." The page title is "Start Building." Then there's a third "Start Building" CTA button mid-page. That's the same label doing three different jobs. Confusing — which one is the actual start? At minimum one of these needs a different label.
- **Page structure is backwards:** The five-step Getting Started sequence (pick a project, assemble your crew, start with research, etc.) appears *below* the "Start Building" CTA. Anyone who clicks the CTA without scrolling will miss all of that context. Either the CTA should come *after* the Getting Started section, or it needs to be repeated below it. Right now the expectation-setting comes after the point of no return.
- **Unclear navigation intent:** It's not obvious whether you're supposed to read this page top to bottom and then choose a path, or scan and pick what resonates. The page mixes philosophy ("fall in love with the problem") with practical steps (5-step Getting Started) with a reading list with a coaching offer with resources. If this is a starting point for builders, it needs to be clearer which things are prerequisites and which are parallel options.
- **The video is buried:** "Build Your First App with AI Agents (Live)" is sitting at the bottom of the Resources section. That should be near the top — it's the single most reassuring piece of content on the page for someone who's skeptical. Seeing it done before being asked to do it is exactly the right sequence. Pull it up to the hero or just below Getting Started, framed as "see it in action."
- **The quiz is also buried:** "Am I Vibe Coding?" appears as a throwaway line near the footer. That's actually a meaningful entry point — it helps someone self-identify before they start. It should be much more prominent.
- **The real structure of this page should be three options at the top:**
  1. Start building (for people who are ready to go)
  2. Watch the video (for people who want to see it first)
  3. Take the quiz (for people who aren't sure where they stand)

  Then the Getting Started steps, reading list, coaching, and community can follow as supporting content. Right now all three of those entry points are scattered across the page at different levels of prominence.

---

## zerovector.design/for-leaders

### What makes sense

- **Intro and opening paragraphs:** Clear, well-written, describes a real org-level problem. Practitioners inside organizations will feel seen — the gap between leadership vision and what actually ships is a lived experience for a lot of people. Good.
- **"What changes when you adopt Zero Vector?" cards:** The before/after card format continues to work well here. These cards are doing the job of translating the individual practitioner story into an org-level picture — showing how a team of Zero Vector practitioners compares to a team of specialized roles. Clear and effective.
- **Engagement models:** Strongest section on the page. Clear breakdown of what each engagement looks like, and — critically — which type of organization each is best suited for. That last detail makes it actionable rather than a menu. Really good.
- **"Start the Conversation" CTA:** Clear. The mention of enterprise transformation as a pathway is well-placed here — gives large-org readers an obvious next step without feeling like they've hit a dead end.

### What's confusing

- **Chief Zero Vector Officer (CZVO):** Feels like a soft sell. Discipline-level C-suite roles take a long time to gain organizational legitimacy — there's usually a decade or more of ground-level adoption before "Chief X Officer" becomes a real title that boards take seriously. The question worth asking is: why is this here, and what's Erika's rationale for it? The "What This Means For You" section below actually does a better job of contextualising the C-suite angle (via the C-suite executive card) than the CZVO section itself does. These two sections may need to be swapped — lead with "what this means for you," then introduce the CZVO concept once the reader already understands the organisational impact.
- **Erika's credibility section:** Works well right now. Longer-term question: as the community grows, other practitioners will presumably also be capable of offering coaching, advisory, and transformation work. The section can be updated when more people are available to do that.
- **Navigation accessibility note:** The Application dropdown in the header nav didn't respond to browser automation — had to navigate directly by URL. See Bugs section for the technical detail. The broader observation: if Zero Vector is building for the future of AI-assisted work, the site itself should be navigable by AI agents, not just humans. Inclusive design extends to non-human actors.

---

## zerovector.design/for-enterprise

### What makes sense

- **"What Zero Vector Delivers at Scale":** Strong section. Outcomes are present, implied in the closing sentences of each item. Clear.
- **"What We Will Tell You":** Good differentiator. Feels honest and distinct from typical agency/consultancy sales language. Worth keeping prominent.
- **"How We Work" and Fractional CZVO:** Clear, practical, no issues.
- **Governance card:** Particularly timely. The compliance/security/IP/audit trails framing is relevant given the ongoing GitHub/open source copyright lawsuit in the US — open source contributors arguing that AI trained on their repos makes AI-generated code subject to the same licenses. The governance angle here is more loaded than it might appear on the surface; worth making sure the copy holds up under scrutiny.

### What's confusing

- **Intro paragraphs:** Functional but not as strong as /for-leaders. The /for-leaders intro was visceral — it described the lived experience of watching a vision degrade through layers of translation. This one is broader strokes, more abstract. Possibly because it's aimed at C-level rather than senior leaders, so the language has to scale up — but that abstraction costs it some of the punch. Worth checking whether the intro can be sharpened without losing the wider scope.
- **"The Enterprise Challenge" cards:** Different visual design from the established card pattern elsewhere on the site. No clear reason for the variation — it just looks inconsistent. The card format has been well-established at this point; breaking from it here creates friction without adding anything. Should probably align to the existing pattern.
- **Intro paragraphs may be redundant:** The Enterprise Challenge cards (Vibe Coding Epidemic, Governance Gap, Talent Arbitrage, Competitive Landscape) are specific enough that the intro paragraphs covering the same ground may not be needed. Could lead directly with the cards and let them do the framing work.
- **for-leaders vs for-enterprise overlap:** These two pages cover substantially the same ground, just pitched at slightly different audiences. The implied distinction seems to be: /for-leaders = senior leaders at smaller or mid-size orgs who want to drive change from within; /for-enterprise = C-suite at large orgs commissioning full transformation. That logic makes sense on paper, but it's not explicitly stated anywhere — a reader navigating both pages would see the overlap and might wonder which one is for them. Worth validating: do people actually self-select between these pages correctly, or do they land on one and miss the other? Could potentially be a single page with two clear paths, rather than two pages with significant content duplication.

---

## zerovector.design/media

- Good structure overall: Substack, podcast, articles, recommended reading, videos and talks, people to follow.
- **Recommended reading appears here again** — this is at least the third place on the site where a recommended reading list appears (also on /for-builders and linked from principles). There should be one canonical source of truth for the reading list, with other pages linking to it rather than each maintaining their own version. As the list grows or changes, keeping multiple copies in sync will become a problem.
- Erika's own content is referenced throughout the site, but the recommended reading here introduces some genuinely new additions beyond what's appeared elsewhere. That's good.
- **People to Follow section is a standout.** First time community has been surfaced this way — amplifies the movement beyond just Erika and adds credibility by showing other people thinking in this space.
- Overall: happy with this section. No major issues.

---

## zerovector.design/investiture

### Hero section

- The subheading — "Start every project with doctrine, not just dependencies. VECTOR.md tells agents and teammates why this project exists before a line of code is written." — introduces vector.md before the reader knows what it is or what its relationship to Investiture is. For someone following along from the main Zero Vector site, those two things (Investiture and vector.md) haven't been connected yet. The connection is assumed knowledge — probably fine for people who've been following the project's development, but a cold reader has no frame for it.
- That said, the page doesn't take long to explain what vector.md is — the scaffold section gets there quickly. So maybe naming it in the hero is okay. But there's an argument for not naming it at all in the hero — just describe what it does ("start with doctrine, not just dependencies") and introduce the name vector.md once you've set up what it actually is. That sequencing would feel more natural for someone coming in completely fresh.

### Start Building CTA (hero)

- "Clone Investiture" and "Read the Docs" as the two CTAs work well for readers who already have enough context to act. That's probably the intended audience for this CTA — if you're ready to go, here's how.
- Worth noting: those CTAs don't stop anyone from scrolling. But it's worth asking whether there's also something for the reader who wants to understand more before jumping in. Could be as simple as an implicit "read on" — or this CTA could be intentionally gating for the more confident reader, which is a valid choice. Not necessarily a problem, just worth being intentional about it.

### The Scaffold — "Start with intent, build with structure"

- This section explains what vector.md is and why it exists. Given that it's referenced in the hero, this is where the payoff happens — and it comes quickly, which is good.
- Still: for a reader with absolutely no code background, calling it a "vector.md file" in the hero and then explaining it here might be one step too many. The alternative — don't name it in the hero, just describe what it does, then introduce the name here with "that thing I mentioned is called a vector.md file" — would create a cleaner reveal for the uninitiated reader.
- "What This Is Not" section name-checks Tailwind and Bootstrap as well as "a UI kit." The UI kit reference is the useful catch-all — if you don't know Tailwind or Bootstrap, "not a UI kit" is probably enough. Bootstrap has enough mainstream recognition that it won't lose many readers. No issue here.
- **Missing: an image or visual of an actual vector.md file.** If you're coming to this completely fresh and someone says "it's a doctrine document," you still don't really know what that means in practice. A screenshot or annotated example of a vector.md file — even a simplified one — would make the concept concrete immediately. The README on GitHub has a similar gap. This page is a good opportunity to show what it actually looks like.

### What You Get / Project Structure

- The project structure visual is good — same feedback as the GitHub README, it maps to what you'd see in VS Code.
- The three-item list (vector.md → why this project exists / CLAUDE.md → how your AI agent behaves / architecture.md → what the technical implementation looks like) is really clear and useful. That's a strong explainer.
- "This is onboarding for both humans and agents." — good line, but it's currently sitting as a standalone sentence with no visual weight. It would land harder as a subheading for the three-item list above. Something like "Onboarding for Humans and Agents".

### Convention — "Built on the Zero Vector Methodology"

- By this point, vector.md has been mentioned in: the hero, the scaffold section, and now the convention section. There's some repetition across these three sections. The convention section feels like the fullest explanation — which raises the question of whether the earlier mentions are doing enough work to justify being there, or whether they're creating noise before the real explanation arrives.
- The convention section is doing the heavy lifting conceptually. It just comes late. The sequencing could be worth revisiting — or alternatively, trim the earlier mentions down so this section feels like a satisfying deeper dive rather than a third pass at the same thing.

### Quick Start

- Same observation as the GitHub README: assumes terminal knowledge, Git knowledge, and comfort navigating the command line. Those assumptions are probably fine for the target audience.
- What's missing: a bridge for people who don't have that baseline. A line like "Not sure what this means? The Open Vector curriculum has you covered — learn the foundations, then come back here" with a link to the Learn section would serve readers who want to build toward this but aren't ready yet. It gives them a path forward rather than a dead end.

### On the Horizon

- Good section. Shows forward momentum, signals active development. No issues.

### Footer / Why It's Called Investiture

- The Stormlight Archive / Dalinar Kholin quote and the explanation of the name are fine. Low-friction, a bit of personality. No issues.
- The final CTAs (Clone Investiture / Read the Docs) repeat the hero CTAs, which is standard practice for long-ish pages. Works fine.

---

## zerovector.design/join

One of the tightest, most intentional pages on the site. The Shackleton filter is working by design and the Saint-Exupéry closer earns its place — together they bracket the page with the right spirit. One note:

- **Saint-Exupéry quote (footer):** Buried — small and quiet where it should be large and prominent. Deserves the same visual treatment as the Shackleton quote at the top. Doesn't have to move, just needs more weight.

---

## zerovector.design/start

### General

- Short page. Doesn't overstay its welcome. Gets straight to the point, which is the right call for a page that's primarily a routing decision.

### Naming consistency — "Zero Vector" vs "Zero-Vector Design"

- Across the site, the name is inconsistently styled: sometimes "Zero Vector Design," sometimes "Zero Vector," sometimes "Zero-Vector Design" (with hyphen). The footer on this page uses "ZERO-VECTOR DESIGN" with a hyphen. The header nav uses "ZERO VECTOR" without one.
- It's unclear whether the hyphen follows a grammatical rule (i.e. hyphenated when used as a compound modifier — "Zero-Vector practitioner" — but not when used as a standalone noun — "Zero Vector") or whether it's just inconsistent.
- If there is a rule, it's not being applied consistently across the site. If there isn't a rule, there should be. This isn't a high-priority issue but it creates a low-level friction for readers who notice it and start wondering which is correct.
- Worth flagging to Erika: is there a house style decision here, and is it documented?

### Intro copy

- The two short sentences at the top work well. Clear, doesn't over-explain. Good.

### Two-card structure (Build / Learn)

- The two-card split (Investiture → Build / Open Vector → Learn) is the right structure for this page. It gives people a clear binary: if you're ready, go build; if you're not, go learn. Clean and efficient.
- The Investiture card strengthens the framing on the Investiture page itself — "Clone Investiture" now has some upstream context ("if you're ready to build, start here"). The progression from /start → /investiture makes the CTA feel more earned.
- This also reinforces the earlier observation: the /investiture page needs a pointer back to Open Vector for people who land there and realise they need more foundation. /start is setting up a two-way relationship between Build and Learn, but /investiture currently only goes one direction.

### Featured article

- The featured piece is the "magnum opus" — the foundational article that lays out the full manifesto and philosophy. Right call to feature it prominently here.
- A second foundational article has been released recently. As soon as it's available, it should probably appear here alongside the first one — this page is the logical home for "the definitive reading" on what Zero Vector is.

### Connect section

- LinkedIn and Substack cards at the bottom. Fine. No issues.

---

## Bugs & Broken Things (consolidated)

- **`/builders` — 404.** Listed in sitemap.xml but returns "Signal Lost." The actual page lives at `/for-builders`. Either the sitemap needs updating or the route needs a redirect.
- **`/leaders` — 404.** Same issue. The actual page is at `/for-leaders`. Sitemap is pointing to dead URLs for both builder and leader pages.
- **`/enterprise` — 404.** Not in the sitemap but confirmed broken when navigated to directly. The actual page is `/for-enterprise`. No redirect in place.
- **`/origin` — three broken images.** Boxes for Erika Flowers (headshot), speaking at NN/g, and building with AI agents are rendering empty. `<img>` tags with broken src paths.
- **`/philosophy` — "See It in Practice" section misaligned.** Looks like a CSS alignment bug — should be center-aligned, isn't. Persists on resize.
- **`/name` — animation doesn't loop.** Plays once and stops. Should loop.
- **Header nav dropdowns unresponsive to browser automation.** Mindset and Application dropdowns don't open on hover or click via automated browser tools. Could be a JS event listener issue that only works with real mouse events. Worth checking for accessibility compliance (keyboard navigation, screen readers) — if it doesn't work for automation, it may also fail for some assistive technologies. Note: if Zero Vector is building for the future of AI-assisted work, the site itself should be navigable by AI agents, not just humans. Inclusive design extends to non-human actors.
- **README — "Investiture documentation site" link is dead (404).** Pointing to an old URL. The site has moved to https://zerovector.design/investiture — needs updating. Also: bilateral links between the site and repo make sense; this is the repo-to-site link that needs fixing.

---

## Investiture README (github.com/erikaflowers/investiture)

### What makes sense

- Prerequisites section is clear. Good plain-language explanations (e.g. VS Code gets a one-liner about what it is and why you need it, GitHub gets framed as "unlimited undo" which is accessible).
- The "What just happened" section after Run is great — tells you what the install script actually did. Good pattern.
- Counterpoint to the "assumed knowledge" concern: if you're interested in trying Investiture at all, there probably *is* some baseline assumed knowledge. Terminal usage might be fair to assume. Linux users especially are going to be more advanced.
- "Why Git and GitHub matter" section is reassuring — "You don't need to be a Git expert" is the right tone.
- By this point in the doc, readers might be starting to recognise terminal commands as commands, even without being told explicitly. If you've gotten this far, pattern recognition is probably kicking in.
- Architecture section: the folder structure visual is great — it'll map directly to what you see in VS Code, which is helpful. The inline explainers for each folder/file are clear.

### What's confusing

- **Terminal never introduced.** Not in prerequisites, not in setup — the first mention of "open a terminal" appears in "What to do next," by which point the reader has already needed it twice. A single line in prerequisites (like the VS Code and GitHub bullets) would fix this. Also missing: where does the cloned folder end up? A line before the code block — "open your terminal, navigate to where you want the project folder, then run:" — would bridge the gap. The opening line ("A React scaffold with clean architecture") raises the same assumed-knowledge question: who is the assumed reader here? Developer? Non-developer practitioner? The prerequisites section may answer this, but the very first line already makes an assumption.
- **Formatting inconsistency:** `npm run examples` appears as inline code but the setup commands use a code block. All terminal commands should use code blocks consistently.
- **"Why Git and GitHub matter" section is backwards.** Currently: here are Git commands → don't worry, Claude Code handles them. Better: lead with "Claude Code handles Git for you" → show paired examples (what you'd say to Claude / what Git command runs underneath). Current structure makes readers think they need to memorise commands, then pulls the rug.
- **Architecture section: "four layers" but six things listed.** Never names which four are the layers. "Claude knows how to use them" doesn't explain why the structure exists or what it gives you — one sentence on separation of concerns would fix both. "What to do next" references the layers, but since Architecture doesn't name or explain them, the connection falls flat. Suggested fix: merge Architecture and Project Structure into one section — use the fuller project structure diagram, explain why the four layers matter, then flow into "What to do next."
- **Install script: no heads-up before Run.** The script installs things and requires user approval. "What just happened" explains it after the fact — a brief note before Run would set the expectation correctly.
- **CLAUDE.md introduced with no external context.** Add a link to the Anthropic docs inline (not just in the Links footer) so readers can learn what a CLAUDE.md file is before reading how Investiture uses it. Also gives "customize it as you learn" more grounding — right now that advice won't register until the reader has been in the workflow a while.
- **License section:** "MIT" with no explanation or link — meaningless for a non-developer. Add a one-liner or link to the license text. Also: the GitHub repo About section doesn't show the license — worth configuring.
- **Dead link and bilateral links:** "Investiture documentation site" link is dead — see Bugs section. The principle of bilateral links (site → repo, repo → site) makes sense and is worth preserving once the link is fixed.

