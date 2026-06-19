# Friction Report — Investiture: Non-Developer Practitioner Stress Test

**Kestrel:** K-004
**Date:** 2026-03-16
**Version:** Investiture v1.3.0
**Scope:** Top friction points where a non-developer practitioner gets stuck with Investiture

---

## Friction Point 1 — Terminal is never introduced

**Area:** Investiture README — Prerequisites / Setup

**Type:** better explanation

**What happened:**
The README assumes the reader knows what a terminal is, where to find it, and how to navigate it. The prerequisites list VS Code, a GitHub account, and platform-specific notes — but Terminal itself is never introduced as a concept. The first code block is `npx investiture init` with no indication of where to type it. A non-developer practitioner hits a wall at the first command with no way to execute it.

**What would have helped:**
A single prerequisite bullet point for Terminal, matching the format already used for VS Code and GitHub. One line: what it is, where to find it on your OS, and why you need it. Additionally, a bridging sentence before the first code block — "open your terminal, navigate to where you want the project folder, then run:" — would close the gap between "I have a terminal" and "I know what to do with it."

---

## Friction Point 2 — Opening line assumes a developer audience

**Area:** Investiture README — Opening line

**Type:** better explanation

**What happened:**
The opening line — "A project scaffold with clean architecture, structured doctrine, and a skill chain that enforces it" — assumes the reader knows what a scaffold is. For a facilitator, designer, or non-technical practitioner, "scaffold" and "skill chain" are unfamiliar terms that signal this tool may not be for them.

The README is a potential entry point. Someone discovering Investiture through GitHub — not through the Zero Vector site — encounters this line before any of the practitioner-friendly framing that exists elsewhere. The risk isn't just confusion; it's self-selection out. A non-developer reads "project scaffold" and "skill chain that enforces it" and decides this isn't their thing before scrolling further.

**What would have helped:**
Rewrite the opening line to lead with what Investiture gives you, not how it works. The technical language can appear further down for readers who care about it. The first sentence should answer "what is this and why would I use it" in language that doesn't require a technical background.

---

## Friction Point 3 — make-it-mine treats design decisions as configuration

**Area:** `make-it-mine.sh` — Agent Identity section (lines 38–135)

**Type:** wrong tool for the job

**What happened:**
The make-it-mine script collects agent name, pronouns, role, and Claude model via terminal prompts, then does string replacement into CLAUDE.md placeholders. The mechanical parts of this work fine — project name in package.json, git history reset, GitHub repo creation. But the agent identity section treats personality, role, and voice as form fields when they're actually design decisions that require iteration, examples, and verbosity.

The role prompt asks for a job title ("frontend engineer, full-stack developer") when what you actually need is a working relationship description. Someone building their first project might need an agent that's part coder, part explainer, part architect. A job title doesn't capture that. The personality and voice sections aren't even attempted by the script — it fills in name and pronouns, then tells you to "open CLAUDE.md to fill in the remaining sections" with a bullet list and no guidance on what good looks like or how much detail is enough.

The model selection question ("Claude model for commit co-authorship") stacks three pieces of developer jargon. If this is just for attribution on changes, the language should say that. If it's setting which Claude model runs in the directory, that's a bigger decision with cost and capability tradeoffs that a numbered menu can't communicate.

Getting agent personality right takes iteration — you write something, test it, realize it's too stiff or too casual, adjust. People will under-specify because they assume Claude will "get it." It won't. That's hard-won knowledge the scaffold doesn't communicate. The script treats a design process as a configuration step.

**What would have helped:**
The agent identity work should be a guided conversation with Claude, not a bash script. The mechanical setup (project name, git reset, GitHub repo) can stay as a script. But everything about agent identity should be handled differently:

- A "start here" guide that sets expectations: this takes time, you'll have a conversation with Claude, here's roughly what you're working toward.
- An annotated reference CLAUDE.md — a real one, filled out for a real project, with inline comments explaining why each section has the depth it has. "This role section works because it describes how the agent makes decisions, not just what it's called." "This voice section is three sentences because one sentence isn't enough for Claude to differentiate tone."
- The onboarding guidance becomes: open Claude, have the conversation, use the reference as a benchmark. That's the methodology teaching you to use the tool the way the tool is meant to be used.
- A note that CLAUDE.md changes require restarting Claude Code to take effect — important for the iteration loop.

This reframes agent setup from "fill in five fields" to "design your working relationship with your AI collaborator," which is what it actually is.

---

## Friction Point 4 — No linked example of VECTOR.md

**Area:** Investiture README + zerovector.design/investiture

**Type:** example

**What happened:**
The README describes VECTOR.md in the Doctrine section and includes a reading order that names all three doctrine files. But it doesn't link to the actual VECTOR.md file in the repo, and neither the README nor the site shows what a filled-out VECTOR.md looks like. For someone who's never seen a markdown file, knowing that it exists and knowing what it looks like are two different things.

**What would have helped:**
The Investiture repo already contains a VECTOR.md file — link to it directly from the README so readers can click through and see what the file looks like in practice. A live link to the actual file is more maintainable than a screenshot and stays current as the template evolves. On the site (zerovector.design/investiture), an annotated walkthrough of the file's sections — what goes where and what a filled-out version looks like versus a blank template — would make the concept concrete immediately.

---

## Hands-On Friction — Installation Experience

The friction points above were identified through a systematic documentation review of the Investiture README and site. The points below come from firsthand experience attempting the Investiture setup as a non-developer practitioner.

**Note on scope:** By the time this friction report was written, the local environment already had the Investiture prerequisites installed. A full cold-start reproduction wasn't possible without uninstalling dependencies, so this section captures what was observed during the original installation from memory. It is not exhaustive. A complete picture of installation friction would require a genuinely cold-start walkthrough by someone who has never configured a development environment.

---

## Friction Point 5 — Setup prompts assume developer knowledge throughout

**Area:** `install.sh` (Homebrew/dependencies) and `make-it-mine.sh` (project name, git reset, GitHub repo)

**Type:** better explanation

**What happened:**
Across both setup scripts, every prompt assumes the reader already understands what's being asked and why. The pattern repeats at multiple points:

- **Homebrew installation** asks the user to approve installing additional dependencies — packages they didn't ask for and can't evaluate. The README said "install Homebrew and Node.js." The terminal is now listing unfamiliar software and asking for permission. For a non-developer, this is a trust moment. The gap between what was promised and what's happening creates anxiety. People could bail here before they've even finished installing.

- **"Reset git history? This gives you a clean start."** asks a yes/no question about a destructive, irreversible action with one clause of explanation. A non-developer doesn't know what git history is, why the Investiture repo's history is baggage, or what "clean start" means in practical terms. They have to make a decision about something they can't evaluate.

- **Project name** is straightforward but still fires without context about where the name gets used or whether it matters later.

- **GitHub repo creation** asks about public vs. private visibility without explaining what that means or why they'd choose one over the other.

In every case, the question arrives without enough context to answer it confidently. None of these are blocking — a technically literate user reads past them in seconds. But for anyone else, each unexplained prompt is a moment where they either guess, freeze, or bail. The cumulative effect is a setup process that feels like it's testing you rather than guiding you.

**What would have helped:**
One or two sentences before each prompt: what this is, why you're being asked, and what the sensible default is. That's the entire fix. Adding explanation doesn't slow down people who already get it — they skip past two sentences in a second. But it saves everyone else from guessing or stopping.

Examples of what "tell me what and why" looks like:

- Before Homebrew dependencies: "This will install [package] and the additional software it needs to work. Your terminal will ask you to approve these — say yes to all of them so the installation can complete."
- Before git reset: "The project you cloned has its own change history from when Investiture was built. Resetting gives you a fresh history that starts with your project, not ours. This is recommended — say yes unless you have a reason to keep the original history."
- Before GitHub visibility: "Public means anyone can see your code. Private means only you and people you invite. If you're not sure, choose private — you can change it later."

For anything that's genuinely a deep topic, a link to further reading keeps the in-script explanation short while giving curious users somewhere to go.

---

## Cosmetic — Install Script Output

The observations below are not friction points — they don't block or confuse anyone. They're experience quality notes. The install script works well and the information it provides is correct and well-sequenced. These are suggestions for whoever picks this up; take or leave as appropriate.

---

## Observation 1 — Install script output lacks visual hierarchy

**Area:** `install.sh` — terminal output

**Type:** cosmetic

**What was observed:**
The install script output is clear, well-structured, and gives the reader everything they need: platform detection, dependency checks, architecture overview, and next steps. But it's all rendered as plain monochrome text at the same visual weight. Section headers ("Setup complete!", "Next steps:", "Version control") look the same as the detail lines beneath them. Nothing guides the eye to what's important.

For a developer, this is fine — they're used to reading terminal output and know to scan for the actionable parts. For a non-developer running a terminal script for potentially the first time, everything looks equally important, which means nothing stands out. The next steps — the two commands they actually need to run — sit at the same visual level as the architecture folder descriptions above them.

**What would help:**
ANSI color and simple formatting to create visual layers in the output. Section headers in bold or color, green checkmarks for completed steps, and the next-steps commands highlighted so they're unmissable. This is the difference between "the information is there" and "the information is obvious." For a non-developer watching terminal output scroll by, obvious matters.
