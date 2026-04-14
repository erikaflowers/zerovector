# Mobile QA Findings — Consolidated Priority List

**Site:** https://zerovector.design/open
**Viewports tested:** iPhone Safari (375x812), Android Chrome (360x800)
**Date:** 2026-03-15

---

## CRITICAL — Blocks Learning

These issues prevent a mobile user from completing a lesson or navigating the curriculum.

| # | Issue | Pages Affected | Impact |
|---|-------|---------------|--------|
| 5 | Pages load at wrong scroll position | Curriculum index, lesson pages | User lands mid-content with no title or context. On mobile, this means starting a lesson disoriented with no way to know what they're reading. |
| 4 | Sidebar navigation doesn't cover full viewport | All lesson and level pages | Primary mobile nav is broken. Lesson text bleeds through the sidebar, making it unreadable. Users cannot reliably switch between lessons. |
| 3 | Large blank scroll gaps | /open/learn, /open landing | Multiple viewport-heights of empty whitespace. Users assume the page is broken or has ended. Footer content (Ko-fi, email signup) is unreachable. |

---

## MEDIUM — Degrades Experience

These issues make the mobile experience frustrating but don't completely block learning.

| # | Issue | Pages Affected | Impact |
|---|-------|---------------|--------|
| 6 | Floating PDF icon overlaps content | All pages sitewide | Persistent button covers lesson text and code blocks. On 360px screens, every pixel counts. |
| 7 | Code blocks require horizontal scrolling | All lessons with code | Comments and longer lines are truncated. Horizontal scrollbar is easy to miss on touch devices. Users may not see full code examples. |
| 8 | Exercise sections are dense walls of text | Lesson pages with exercises | Multiple commands buried in flowing prose with no step separation. Impossible to follow along on a phone while working on a laptop. |
| 1 | Nav bar overlap/clipping (partially resolved) | /open landing | Hamburger menu now present at 360px. Needs verification at 375px to confirm full fix. |

---

## COSMETIC — Minor Polish

These issues don't block functionality but reduce perceived quality.

| # | Issue | Pages Affected | Impact |
|---|-------|---------------|--------|
| 9 | Table of contents at bottom of lesson, not top | All lesson pages | TOC is useless for within-lesson navigation. User must scroll through entire lesson to discover it exists. |
| 10 | Commands lack inline code formatting | Lesson prose sections | Terminal commands (pwd, ls, cd) visually blend into paragraph text. Harder to scan on mobile. |

---

## Resolved

| # | Issue | Status |
|---|-------|--------|
| 2 | Investiture link 404 | Fixed. Page loads on both viewports. |
