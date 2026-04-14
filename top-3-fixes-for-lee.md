# Top 3 Mobile Fixes — For Lee

**Priority:** These are the three changes that would have the highest impact on mobile learners. Recommended for immediate action.

---

## 1. Fix scroll position on page load

**Issue:** Lesson pages and the curriculum index frequently load mid-content. Users land on a sentence fragment with no title, no context, and no idea what they're reading.

**Why this is #1:** This is the first thing a mobile learner experiences. If the page loads wrong, they leave before reading a single word. Nothing else matters if the entry point is broken.

**Likely cause:** Scroll restoration or layout shift during page render. The browser restores a previous scroll position, or content above the fold loads late and pushes the viewport down.

**Suggested fix:** Force `window.scrollTo(0, 0)` on route change, or disable scroll restoration in React Router. Test with `history.scrollRestoration = 'manual'`.

---

## 2. Make sidebar navigation full-width on mobile

**Issue:** The sidebar slides in from the left but doesn't cover the full viewport. Lesson text bleeds through on the right, making the menu unreadable.

**Why this is #2:** This is the only way to navigate between lessons on mobile. If users can't switch lessons, they're stuck on whatever page they landed on. A broken nav turns a curriculum into a dead end.

**Suggested fix:** On viewports below 768px, set the sidebar to `width: 100vw` with a solid background and a backdrop overlay behind it. Ensure `z-index` is above all page content.

---

## 3. Eliminate blank scroll gaps on /open/learn

**Issue:** After the curriculum section cards, there are multiple viewport-heights of empty whitespace before the footer. Users think the page is broken.

**Why this is #3:** The /open/learn page is the curriculum entry point. If it looks broken, users won't explore further. The footer content (Ko-fi support, email signup) is completely buried.

**Suggested fix:** Inspect the layout between the last content section and the footer for excess margin, padding, or a flex/grid gap. Likely a container with `min-height` or `flex-grow` that creates empty space when content is short.
