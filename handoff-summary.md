# Mobile QA Handoff — Priority Summary

**For:** Erika + Lee
**From:** K-007
**Date:** 2026-03-27

---

## What's in This Delivery

| Document | Audience | Purpose |
|----------|----------|---------|
| `mobile-qa-final-report.md` | Lee | Actionable fix brief, ordered by priority, with code suggestions |
| `curriculum-mobile-redesign-flags.md` | Erika | Content that needs redesign for mobile, not just CSS fixes |
| `video-task-status.md` | Erika | Blocker report on video deliverables |
| `mobile-qa-consolidated.md` | Reference | Sprint 2 raw findings (superseded by final report) |
| `top-3-fixes-for-lee.md` | Reference | Sprint 2 top fixes (superseded by final report) |
| `mobile-learner-brief.md` | Reference | "Who is the mobile learner?" brief from sprint 2 |
| `mobile-onboarding-draft.md` | Reference | Mobile-first onboarding flow draft from sprint 2 |

---

## Priority Order for Lee

**Fix in this order. Each one unlocks the next level of mobile usability.**

1. **Scroll position on page load** — Pages load mid-content. Users are disoriented immediately. Fix with `scrollTo(0,0)` on route change.
2. **Sidebar nav full-width on mobile** — Primary navigation is broken. Users can't switch lessons. Fix with `width: 100vw` + solid background below 768px.
3. **Blank scroll gaps on /open/learn** — Entry page looks broken. Footer is buried. Find and remove the excess height on the wrapper element.
4. Floating PDF icon — hide on mobile
5. Code block overflow — ensure `overflow-x: auto` + reduce font-size
6. Exercise formatting — convert from prose to numbered steps (content change)
7. Nav bar verification at 375px
8. TOC placement — move above content on mobile
9. Inline code formatting in content files

---

## Priority Order for Erika

1. **Review the curriculum redesign flags.** Five approach guides should be marked desktop-first with mobile banners. This is a content decision, not a code decision.
2. **Exercise formatting across all lessons.** Converting exercises from prose paragraphs to numbered step lists is the single highest-impact content change for mobile learners. This touches every lesson file.
3. **Video assets.** K-007 cannot produce clips without source recordings. If livestream recordings exist, provide them. If not, defer the video task.
4. **Repo migration note.** All fixes target the new Open Vector repo at `open.zerovector.design`, not the ZV monorepo. Confirm Lee is working in the correct repo.

---

## Status of All Sprint Issues

| # | Issue | Sprint 2 Status | Sprint 3 Status |
|---|-------|----------------|-----------------|
| 1 | Nav overlap/clipping | Partially fixed | Needs 375px verification |
| 2 | Investiture 404 | Fixed | Closed |
| 3 | Blank scroll gaps | Open | **Open — not shipped** |
| 4 | Sidebar nav broken | Open | **Open — not shipped** |
| 5 | Wrong scroll position | Open | **Open — not shipped** |
| 6 | Floating PDF icon | Open | Open |
| 7 | Code block truncation | Open | Open |
| 8 | Dense exercises | Open | Open (content change needed) |
| 9 | TOC at bottom | Open | Open |
| 10 | Inline code formatting | Open | Open (content change needed) |

**3 of 10 issues resolved. 3 critical issues remain unaddressed.**

---

## K-007 Sprint 3 Completion

| Task | Status |
|------|--------|
| Final mobile QA report | Delivered |
| Retest Lee's fixes | Complete — no fixes shipped |
| Curriculum redesign flags | Delivered |
| Video clips | Blocked — no source assets |
| Handoff summary | Delivered |
| Screen recording (stretch) | Not attempted — K-007 cannot operate a physical device |

---

*K-007. Sprint 3 handoff complete. Awaiting further orders.*
