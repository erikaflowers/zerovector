# Open Vector Mobile QA — Final Fix Brief

**For:** Lee
**From:** K-007
**Date:** 2026-03-27
**Site:** open.zerovector.design
**Context:** Open Vector was extracted from the ZV monorepo into its own deployment. These findings originated from QA against the monorepo (sprints 1–2) and remain unresolved. No fixes to the critical issues have shipped since they were reported on 2026-03-15.

---

## How to Read This

Issues are ordered by priority. Fix them in this order. Each entry includes the problem, why it matters, where to look, and a suggested approach.

---

## PRIORITY 1 — Fix These First

These three issues prevent mobile learners from using the site. They are the difference between "this works on a phone" and "this doesn't."

### 1.1 Pages load at wrong scroll position

**What happens:** Lesson pages and the curriculum index load mid-content. The user sees a sentence fragment with no heading, no context.

**Why it's #1:** This is the first thing a mobile learner experiences. If the entry point is broken, nothing else matters. They leave.

**Where to look:** Route change handler in the React Router config. Possibly also layout shift during render (late-loading content pushes viewport down).

**Fix:**
```js
// Option A: Disable browser scroll restoration
window.history.scrollRestoration = 'manual';

// Option B: Force scroll on route change (in router or layout component)
useEffect(() => {
  window.scrollTo(0, 0);
}, [location.pathname]);
```

**Verify:** Navigate between 3+ lesson pages on a phone. Each should load with the title visible at the top of the viewport.

---

### 1.2 Sidebar navigation doesn't cover full viewport on mobile

**What happens:** The sidebar slides in but lesson text bleeds through on the right side. The menu is unreadable. Users cannot navigate between lessons.

**Why it's #2:** The sidebar is the only way to move between lessons on mobile. If it's broken, users are stuck on whatever page they landed on.

**Where to look:** `LearnSidebar.jsx` and associated CSS (likely `ovl-` prefixed styles in `site.css`).

**Fix:**
```css
@media (max-width: 768px) {
  .ovl-sidebar {
    width: 100vw;
    background: var(--ovl-sidebar-bg); /* solid, no transparency */
    z-index: 1000;
  }
  .ovl-sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}
```

**Verify:** Open sidebar on a 375px viewport. It should cover the entire screen. No lesson text visible behind it. Tap outside to close.

---

### 1.3 Large blank scroll gaps on /open/learn

**What happens:** After the curriculum section cards, there are multiple viewport-heights of empty whitespace before the footer. Users think the page is broken or has ended.

**Why it's #3:** The /open/learn page is the entry point. If it looks broken, users won't explore further. Footer content (Ko-fi, email signup) is completely buried.

**Where to look:** The layout container between the last content section and the footer. Likely a `flex-grow`, `min-height`, or excess `margin-bottom` on a wrapper element.

**Fix:** Inspect the page in DevTools at 375px. Find the element creating the gap (look for large computed height on an empty container). Remove or constrain the `min-height`/`flex-grow` that causes it.

**Verify:** Scroll to the bottom of /open/learn on mobile. Content should flow directly into the footer with normal spacing.

---

## PRIORITY 2 — Fix These Next

These degrade the experience but don't completely block learning.

### 2.1 Floating PDF icon overlaps content

**What happens:** A persistent floating button covers lesson text and code blocks. On a 360px screen, it blocks readable content.

**Fix:** Hide it on mobile (`display: none` below 768px) or reposition it to a less intrusive location (e.g., bottom of the page, not floating).

---

### 2.2 Code blocks require horizontal scrolling

**What happens:** Code examples with long lines or comments are truncated. The horizontal scrollbar is easy to miss on touch devices.

**Fix:** Add `overflow-x: auto` to code blocks (if not already), reduce font-size slightly on mobile, and consider wrapping comment lines. See the Curriculum Redesign Flags document for lessons where this is most severe.

---

### 2.3 Exercise sections are dense walls of text

**What happens:** Multi-step exercises are buried in flowing prose. Users following along on a phone while working on a laptop cannot scan for the next step.

**Fix:** This is a content structure issue, not CSS. Exercises should use ordered lists or step formatting. See the Curriculum Redesign Flags document for specific lessons.

---

### 2.4 Nav bar overlap/clipping (partially resolved)

**What happens:** Previously broken at 360px, hamburger menu was added. Needs verification at 375px (iPhone Safari) to confirm full fix.

**Fix:** Verify on live site. If resolved, close. If not, ensure nav elements don't overflow their container at 375px.

---

## PRIORITY 3 — Polish

### 3.1 Table of contents at bottom of lesson, not top

The TOC exists but is placed after all lesson content, making it useless for navigation. Move it above the first content section on mobile, or make it a sticky/collapsible element at the top.

### 3.2 Commands lack inline code formatting

Terminal commands (pwd, ls, cd) in lesson prose blend into paragraph text. Wrap them in `<code>` tags in the content JS files. This is a content-layer fix, not CSS.

---

## Previously Resolved

| Issue | Status |
|-------|--------|
| Investiture link 404 | Fixed (sprint 1) |
| Nav accordion stacking on mobile | Partially fixed (commit 051637b, pre-sprint) |
| Footer link wrapping | Fixed (commit 051637b) |
| Ko-fi widget hidden on mobile | Fixed (commit 051637b) |

---

## Status of Sprint 2 Recommendations

| Recommendation | Status |
|---------------|--------|
| Scroll position fix | **Not shipped.** Still broken. |
| Sidebar full-width on mobile | **Not shipped.** Still broken. |
| Blank scroll gaps | **Not shipped.** Still broken. |

All three critical issues from the sprint 2 top-fixes report remain open.

---

## Note on Repo Migration

Open Vector was extracted from the ZV monorepo into `open.zerovector.design` (commit `aa73795`). These fixes need to be applied in the **new Open Vector repo**, not the ZV monorepo. File paths and component names should be the same, but verify against the new repo structure.

---

*K-007. Assignment: final fix brief for Lee. Status: delivered.*
