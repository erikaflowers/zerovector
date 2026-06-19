# Investiture Notes — Extracted from K-004 Week 1 Reading Notes

**Source:** `kestrel/K-004/march-sprint-week1-tasks` — `K-004/2026/03-march/reading-notes.md`
**Extracted:** 2026-03-16

---

## zerovector.design/investiture (full page review)

### Hero section

- The subheading — "Start every project with doctrine, not just dependencies. VECTOR.md tells agents and teammates why this project exists before a line of code is written." — introduces vector.md before the reader knows what it is or what its relationship to Investiture is. For someone following along from the main Zero Vector site, those two things (Investiture and vector.md) haven't been connected yet. The connection is assumed knowledge — probably fine for people who've been following the project's development, but a cold reader has no frame for it.
- That said, the page doesn't take long to explain what vector.md is — the scaffold section gets there quickly. So maybe naming it in the hero is okay. But there's an argument for not naming it at all in the hero — just describe what it does ("start with doctrine, not just dependencies") and introduce the name vector.md once you've set up what it actually is. That sequencing would feel more natural for someone coming in completely fresh.

### Start Building CTA (hero)

- "Clone Investiture" and "Read the Docs" as the two CTAs work well for readers who already have enough context to act. That's probably the intended audience for this CTA — if you're ready, go build; if you're not, go learn.
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
