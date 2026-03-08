# K-007 Mobile QA Report — Expanded

**Site:** https://zerovector.design/open
**Date:** 2026-03-07
**Auditor:** K-007
**Viewports tested:**
- iPhone (375x812) — initial audit 2026-02-28
- Android Chrome (360x800) — expanded audit 2026-03-07

---

## Status Updates from Initial Audit

### Issue 2 (was Critical): Investiture link 404 — RESOLVED

The `/investiture` page now loads successfully. The Investiture link in the navigation menu works on both viewports. Dark-themed page renders legibly at 360px. This issue is closed.

### Issue 1 (was High): Nav bar overlaps/clips on mobile — PARTIALLY RESOLVED

At 360px, a hamburger menu is now present on the `/open` landing page (previous audit at 375px reported it missing). The nav text overlap issue from the initial audit may have been fixed by this hamburger menu implementation. Needs verification at 375px to confirm full resolution.

---

## Confirmed Issues (Still Present)

### Issue 3: Large blank scroll gaps — CONFIRMED on both viewports

**Pages:** /open/learn, /open (landing page)
**Severity:** High

On the `/open/learn` page, after the "Curriculum" and "Approach" section cards and "Browse resources" link, there is an enormous empty whitespace gap before the footer. At 360px, this gap spans multiple full viewport heights. On mobile, users will assume the page is broken or has ended. They will never reach the footer content (Ko-fi support, email signup) below the gap.

### Issue 4: Sidebar navigation does not cover full viewport — CONFIRMED on both viewports

**Pages:** /open/learn/curriculum/* (all lesson and level pages)
**Severity:** High (upgraded from Medium)

The sidebar navigation slides in from the left but does not cover the full viewport width. Lesson text bleeds through on the right side, making the menu difficult to read. At 360px, the content bleed-through is even more pronounced than at 375px. The sidebar should be full-width with a solid backdrop overlay on mobile. Upgrading to High severity because this is the primary navigation mechanism on mobile and it looks broken.

### Issue 5: Pages load at wrong scroll position — CONFIRMED, intermittent

**Pages:** /open/learn/curriculum, /open/learn/curriculum/00-orientation/terminal
**Severity:** High (upgraded from Medium)

Lesson pages and the curriculum index page frequently load mid-content. The Terminal lesson loaded with first visible text being a mid-sentence fragment. The curriculum page loaded showing "my own vision." — the end of the intro paragraph — with no context above. Users land disoriented. This is likely caused by scroll restoration or layout shift during page load. Upgrading to High because on mobile, losing the top of a lesson means losing context for the entire page.

---

## New Issues Found

### Issue 6: Floating PDF icon overlaps content throughout the site

**Pages:** All pages across the site
**Severity:** Medium

A persistent floating action button (appears to be an Adobe PDF icon) is fixed in the lower-right area of the viewport. It overlaps lesson text, code blocks, and interactive elements. On a 360px viewport, every pixel matters — this icon covers readable content. Most disruptive when overlapping code blocks.

### Issue 7: Code blocks require horizontal scrolling on mobile

**Pages:** /open/learn/curriculum/00-orientation/terminal (and likely all lesson pages with code)
**Severity:** Medium

Code blocks with comments or longer lines extend beyond the 360px viewport width. A horizontal scrollbar appears at the bottom of the code block, but it is easy to miss. Comment text on the right side of code examples is truncated. Users must know to scroll horizontally to read full code examples — not discoverable on touch devices.

### Issue 8: Exercise sections are dense walls of text on mobile

**Pages:** /open/learn/curriculum/00-orientation/terminal (and likely other lessons)
**Severity:** Medium

The "EXERCISE" card at the end of the Terminal lesson contains a long paragraph with multiple commands embedded in prose. On mobile, there is no visual separation between steps. Commands like `pwd`, `cd ~/Desktop`, `mkdir terminal-practice` are buried in flowing text. A mobile learner trying to follow along on a phone while working on a laptop would struggle to parse individual steps.

### Issue 9: Table of contents placed at bottom of lesson, not top

**Pages:** /open/learn/curriculum/00-orientation/terminal (and likely all lessons)
**Severity:** Low

The lesson TOC (section links like "Essential Commands", "Tab Completion and History", etc.) appears at the very bottom of the lesson page, after all content. On mobile, this makes it useless for within-lesson navigation — a user would have to scroll through the entire lesson to discover it exists. Should be at the top of the lesson or accessible from a sticky element.

### Issue 10: Commands in lesson prose lack inline code formatting

**Pages:** /open/learn/curriculum/00-orientation/terminal
**Severity:** Low

In the "Essential Commands" section, terminal commands (pwd, ls, cd, mkdir, touch, cat, clear) are written in the same font as surrounding prose text. They do not use inline code formatting (monospace/background highlight). On mobile where scanning is even more important than desktop, commands visually blend into paragraphs.

---

## Curriculum Lesson Walkthrough: Can You Learn on a Phone?

**Lesson tested:** 00 Orientation > The Terminal
**Verdict:** Partially — but with significant friction.

### What works:
- Lesson text is readable at 360px
- Breadcrumb navigation (Open Vector / Curriculum / 00 Orientation) works
- Previous/Next lesson navigation cards are clear and functional
- Level overview pages (lesson count, time estimates, progress) render well
- Hamburger menu shows all levels and lessons with current lesson highlighted

### Where it fails:
1. **Page loads mid-content.** User starts the lesson without seeing the title or introduction.
2. **Code blocks are truncated.** Horizontal scroll required but not obvious on touch.
3. **Exercise instructions are a wall of text.** No step-by-step formatting. Following along on a phone while working on a laptop is difficult.
4. **Sidebar navigation is broken.** Content bleeds through, making it hard to navigate between lessons.
5. **No sticky TOC or progress indicator.** In a 20-minute lesson, there is no way to know where you are in the content without scrolling to the very bottom.
6. **Floating icon covers content.** PDF button overlaps code and text throughout.

### Bottom line:
A motivated learner could read the lesson on mobile. But they could not effectively *follow along* with the exercises, and the navigation issues would make it frustrating to use as a regular learning tool on a phone. The content quality is high. The mobile experience does not match.

---

## Summary Table

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | Nav bar overlaps/clips on mobile | High | Partially resolved |
| 2 | Investiture link is a 404 | Critical | **Resolved** |
| 3 | Large blank scroll gaps | High | Confirmed |
| 4 | Sidebar doesn't cover full viewport | High ↑ | Confirmed |
| 5 | Pages load at wrong scroll position | High ↑ | Confirmed |
| 6 | Floating PDF icon overlaps content | Medium | **New** |
| 7 | Code blocks require horizontal scroll | Medium | **New** |
| 8 | Exercise text is dense wall on mobile | Medium | **New** |
| 9 | TOC at bottom of lesson, not top | Low | **New** |
| 10 | Commands lack inline code formatting | Low | **New** |

---

## Video Task: OpusClip Segment Identification

**Status:** Blocked

K-007 does not have access to the Friday livestream recording file or an OpusClip account. This task requires:
1. The livestream video file or URL
2. OpusClip access credentials or account

Awaiting operator input to proceed.

---

```
K-007 REPORT
Assignment: Mobile QA + Video Content — Open Vector
Status: in progress
Completed: Expanded mobile QA across two viewports (375x812, 360x800), full curriculum lesson walkthrough, 10 issues documented (1 resolved, 2 upgraded, 5 new)
Branch: kestrel/K-007/mobile-deep-qa
Blockers: Video task blocked — need livestream file and OpusClip access
```
