# Curriculum Content — Mobile Redesign Flags

**For:** Erika
**From:** K-007
**Date:** 2026-03-27
**Context:** Content that is fundamentally hard to learn on a phone, not just poorly rendered. These lessons may need desktop-first versions, content restructuring, or mobile-specific alternatives.

---

## Severity Levels

- **DESKTOP-FIRST** — This lesson requires a desktop or laptop to follow along meaningfully. A mobile version should acknowledge this and either defer the hands-on work or offer a read-only summary.
- **RESTRUCTURE** — The content works conceptually on mobile but the format makes it hard to follow. Needs structural changes (not just CSS).
- **CSS-ONLY** — Fixable with styling changes. No content rewrite needed.

---

## DESKTOP-FIRST — Needs a mobile-aware redirect or read-only mode

### Approach: Scaffold Project (`approach/scaffold-project.js`)
- **7 code blocks**, no exercises
- Walks through creating an entire project from terminal. Every step requires typing commands and seeing file output.
- A mobile learner cannot follow along. They cannot have a terminal open on a phone.
- **Recommendation:** Add a mobile banner: "This guide is designed for hands-on work at a computer. Bookmark it and come back when you're at your desk." Provide a read-only summary of what the lesson covers.

### Approach: Scaffold Feature (`approach/scaffold-feature.js`)
- **5 code blocks**, 1 exercise
- Same pattern as scaffold-project. Step-by-step terminal work that requires a split screen (terminal + browser).
- **Recommendation:** Same mobile banner approach.

### Approach: Revision History (`approach/revision-history.js`)
- **7 code blocks**, 1 exercise
- Git workflow lesson with long multi-line terminal commands. The code blocks alone would require constant horizontal scrolling on mobile.
- **Recommendation:** Mobile banner + consider breaking the longest code blocks into individual command-by-command explanations for mobile.

### Approach: Debugging with AI (`approach/debugging-with-ai.js`)
- **4 code blocks**, 1 exercise
- Requires running commands, reading error output, and iterating. Cannot be done on a phone.
- **Recommendation:** Mobile banner.

### Approach: First Session (`approach/first-session.js`)
- **3 code blocks**, no exercise
- Walks through a Claude Code session. Requires a terminal.
- **Recommendation:** Mobile banner.

---

## RESTRUCTURE — Content works on mobile but format doesn't

### Level 02: React Basics (`02-the-medium/react-basics.js`)
- **3 code blocks** with JSX/component examples
- The code is educational (read and understand), not hands-on (type and run). A mobile learner *can* learn from this, but the code blocks are wide (JSX with nested indentation).
- **Recommendation:** Break long code examples into smaller annotated snippets. Add line-by-line explanations below each block instead of relying on inline comments that get truncated.

### Level 00: DNS (`00-orientation/dns.js`)
- **2 code blocks**, 1 exercise
- DNS lookup commands with long output lines.
- **Recommendation:** Wrap or abbreviate terminal output in code blocks. Mobile learners won't run these commands, so show the key output lines, not the full dump.

### Level 00: Git Basics (`00-orientation/git-basics.js`)
- **2 code blocks**, 1 exercise
- Terminal commands with comments. Comments push lines past 60 characters, triggering horizontal scroll.
- **Recommendation:** Move comments above the command line, not inline. This is a content-layer change in the JS file.

### Level 01: Data Modeling (`01-foundation/data-modeling.js`)
- **2 code blocks**, 1 exercise
- JSON-style data structures with nested indentation.
- **Recommendation:** Reduce nesting in examples or show a simplified mobile version.

### All exercises across the curriculum
- **Every lesson** has at least one exercise formatted as a single prose paragraph with multiple commands embedded.
- On mobile, these are walls of text. Users following along on a laptop cannot scan for the next step.
- **Recommendation:** Convert all exercises from prose to numbered step lists. This is the single highest-impact content change for mobile learners.

---

## CSS-ONLY — Fixable with styling

### Code blocks globally
- Font size is too large for 360px screens
- No `overflow-x: auto` on some blocks
- **Fix:** Reduce code font-size to ~13px on mobile, ensure all `.ovl-code-block` elements have `overflow-x: auto`

### Inline code in prose
- Commands like `pwd`, `ls`, `cd` are not wrapped in `<code>` tags
- They blend into paragraph text, making them harder to identify on small screens
- **Fix:** Content-layer change. Wrap terminal commands in backticks in the content JS files. The renderer should already handle `<code>` styling.

---

## Summary

| Category | Lessons Affected | Action |
|----------|-----------------|--------|
| Desktop-first | 5 approach guides | Add mobile banner, defer hands-on work |
| Restructure | 4 lessons + all exercises | Break code blocks, convert exercises to step lists |
| CSS-only | All lessons with code | Font size, overflow, inline code |

The approach guides (Level 06 equivalent) are the most code-heavy and should be explicitly marked as desktop-first. The core curriculum (Levels 00–05) can work on mobile with structural changes to exercises and code formatting.

---

*K-007. Assignment: curriculum mobile redesign flags. Status: delivered.*
