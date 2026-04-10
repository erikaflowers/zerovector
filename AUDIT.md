# Code Quality Audit

**Date:** 2026-04-10
**Target:** `/Users/erikflowers/claude projects/zerovector`
**Overall Classification:** **SIGNIFICANT DEBT**

The codebase is functional and ships without incident, with real craft in the hot-path components (VectorField, JoinPage, content layer, rate-limited functions). But there are clear signs of drift: ~985 lines of orphaned JSX/JS, ~831 lines of removable CSS, ~109 dead class selectors, a confirmed mobile-nav bug affecting external links, substantial doctrine drift in ARCHITECTURE.md and README.md, a rate-limiter fail-open pattern with no alerting, and a `.env.example` missing four variables consumed by shipped Netlify functions. None of the findings rise to CRITICAL in isolation, but the accumulated debt is meaningful and the pre-refresh cleanup is the right moment to clear it.

---

## Summary Metrics

| Metric | Count |
|---|---|
| Files audited | 148 |
| CRITICAL findings | 0 confirmed (1 conditional on unverified RLS) |
| SIGNIFICANT findings | 13 |
| MINOR findings | 18 |
| Dead code files (fully orphaned) | 6 |
| Dead CSS classes | ~109 |
| Removable CSS lines (conservative) | ~831 (8% of site.css) |
| Monolith flags (>500 lines) | 2 (JoinPage 505, site.css 10,262) |
| Unused imports across pages | 14 across 6 files |
| TODO / FIXME / HACK markers | 0 |
| `!important` occurrences in CSS | 35 (~15 legitimate, ~20 specificity fights) |

---

## Critical Findings

**None confirmed.**

**One conditional CRITICAL requires verification in Supabase dashboard:**

### C1. ZerohackApplyPage writes directly to `zerohack_applications` with client-supplied identity

`src/pages/ZerohackApplyPage.jsx:68-82` performs `supabase.from('zerohack_applications').insert({user_id: user.id, email: user.email, name: user.user_metadata?.full_name, ...formData})` from the browser using the anon key. There is no Netlify function in the pipeline — the insert is direct. Security depends entirely on Row Level Security policies on this table, which live in the Supabase dashboard and cannot be verified from this repo.

**Verdict:** CRITICAL if RLS on `zerohack_applications` does not pin `user_id = auth.uid()` with column-level constraints. SIGNIFICANT otherwise. **This must be checked in the Supabase dashboard before ruling on severity.**

---

## Significant Findings

### S1. Mobile nav drawer renders `<Link to={undefined}>` for external hrefs — confirmed mobile bug

`src/components/Nav.jsx` mobile drawer iterates `navGroups` and renders every item as `<Link to={item.to}>`. But the Resources group contains items with `item.href` (external links to Labrador, Terminus, Arroyo, Open Vector). Mobile users tapping these items hit broken `<Link>` components with undefined destinations. Desktop works because `NavDropdown` handles both `to` and `href`. **This is a live production bug on a high-traffic surface.**

### S2. Rate-limiter fails open on every failure mode with no logging

`netlify/functions/lib/rate-limit.js:24,38,42` returns `true` (allowed) on three conditions: (a) missing `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY`, (b) non-2xx RPC response, (c) any thrown exception. All three failure modes are silent — no `console.error`, no metric, no alert. Combined with the no-CORS finding (S3), a Supabase outage silently removes all rate limiting on the Anthropic-backed endpoints. This is the primary cost-exposure vector for the Anthropic bill.

### S3. Netlify functions have no CORS origin restriction

None of `chat.js`, `quiz.js`, or `join.js` set `Access-Control-Allow-Origin` or check `request.headers.get('origin')`. Netlify functions accept POST from any origin. Combined with S2, any third-party site can POST to `/.netlify/functions/chat` and burn Anthropic tokens within the per-IP rate limit. The rate limit is the only cost cap, and it fails open. Origin-pinning to `zerovector.design` would close the biggest hole.

### S4. UserContext never handles Supabase auth errors — perpetual loading on outage

`src/contexts/UserContext.jsx:27-30` calls `supabase.auth.getSession().then(...)` with no `.catch`. If Supabase is unreachable on page load, the promise rejects and `loading` stays `true` forever. Every page gated on `authLoading` (JoinPage:391, ZerohackApplyPage:113) will show a permanent loading state with no recovery UI. `signIn`/`signOut` at L58/L66 also have no error handling.

### S5. ARCHITECTURE.md is substantially stale

375 lines of technical authority that describe a repo that no longer exists:
- **Phantom sections:** Open Vector Learn routes (13 routes), LearnLayout, ProgressContext, ThemeContext, Learn curriculum directories, Arroyo components, AnonWelcomeModal, WelcomeModal, DecryptTuner — none exist in this repo anymore.
- **Wrong route list:** Lists `/ask` and `/quiz` as live routes; both are redirects to `/start` as of commit `ed251fe`.
- **Wrong CSS line count:** Claims `styles/site.css (15,800+ lines)`. Actual: 10,262.
- **Wrong function list:** Lists `netlify/functions/learn-chat.js`; does not exist.
- **Wrong env var list:** Missing `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `KESTRIS_API_URL`, `KESTRIS_API_KEY`.
- **Missing sections:** Zero Hack (3 pages, ~2,300 lines of CSS), Investiture skills + changelog sub-pages, current three-design-system CSS reality.
- **Wrong CSS prefix table:** Lists `ovl-` (Open Vector Learn) and `arr-` (Arroyo); both gone. Missing `zh-` (2,300+ lines of Zero Hack CSS).

This doc is load-bearing for onboarding (CLAUDE.md points to it) and is currently misleading new contributors.

### S6. README.md promotes retired features

- Line 74 advertises "Claude — AI chat and quiz features via Netlify Functions" — both routes are redirects, pages are orphaned.
- Lines 101-131 project structure diagram lists `src/content/learn/` with 6 curriculum levels — none of this exists in this repo.
- Line 135 promotes Open Vector as an in-repo feature; it's been a separate subdomain for weeks.
- Current primary features (Investiture, Zero Hack, Join, Enterprise) are **not mentioned**.

### S7. `.env.example` missing four environment variables consumed by shipped functions

The file lists `ANTHROPIC_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Missing, despite being referenced in code:
- `SUPABASE_URL` (used server-side by `lib/rate-limit.js:1` and `join.js:4` — distinct from `VITE_SUPABASE_URL`)
- `SUPABASE_SERVICE_ROLE_KEY` (`rate-limit.js:2`, `join.js:4-5`)
- `KESTRIS_API_URL` (`join.js:9`, optional, defaults to `https://kestris.netlify.app`)
- `KESTRIS_API_KEY` (`join.js:10-26`, required)

A new contributor running `netlify dev` will see `/api/join` silently fail with 500s and rate limiting fail open without warning. Production is fine (values live in Netlify dashboard), but the local-dev and handoff story is broken.

### S8. ~985 lines of fully orphaned JSX/JS

Reachable from nothing, still imported and deployed:

| File | Lines | Why dead |
|---|---|---|
| `src/pages/AskPage.jsx` | 207 | `/ask` redirects to `/start` in `App.jsx:38`. Only consumer of `/api/chat`. |
| `src/pages/QuizPage.jsx` | 280 | `/quiz` redirects to `/start` in `App.jsx:39`. Only consumer of `/api/quiz`. |
| `netlify/functions/chat.js` | 127 | Only caller is AskPage. |
| `netlify/functions/quiz.js` | 139 | Only caller is QuizPage. |
| `src/components/ZeroVectorAnimation.jsx` | 190 | Zero importers anywhere in `src/`. |
| `src/content/recommended-reading.js` | 42 | Destructured from `en` in `ManifestoPage.jsx:29` but never referenced in JSX. "LearnHubPage" consumer is gone (Open Vector moved to subdomain). |

Also orphaned within a live file: `SubstackIcon` and `LinkedInIcon` exports in `src/components/icons.jsx:17-30` — zero importers.

### S9. ~831 lines of removable CSS (~109 dead class selectors)

Scanned with word-boundary matching against all 32 JSX/JS files. Categories of dead:
- Retired "Seven Principles" system (~12 classes, L4051-4258) — superseded by `zv-principle-summary-*`
- Retired Investiture "Layers" + "Chain" scaffolding (~21 classes) — pre-v1.2 remnants
- Retired pipeline list system (5 classes, L371-413) — tied to deleted `pipeline.js` content file
- Retired "Reading" list system (10 classes, L842-917) — `/reading` became `/media`
- Retired Name page nav cards, Start connect cards, Enterprise crosslinks, Misconceptions, Suits/Mark III, Philosophy closing, page-next-links, start-announcement-placeholder, explainer container, leaders-explore, coming-soon, boot-terminal, hero-proof, hero-entrance-delay
- Self-admitted dead-code comment at L515 and "Legacy hero" marker at L3254 with actual orphans nearby

Plus 19 duplicate bare-selector definitions (same class defined twice outside `@media`), concentrated in Zero Hack (12) and Investiture (6) blocks — indicates bolted-on additions rather than refactored changes.

### S10. ZerohackBackgroundPage hardcodes a 2,200-word narrative article in JSX

`src/pages/ZerohackBackgroundPage.jsx` is 300 lines of `<p className="zh-bg-body">` elements with HTML entity escapes (`&rsquo;`, `&mdash;`, `&ldquo;`) and zero React logic. It is pure content masquerading as a component. ARCHITECTURE.md explicitly endorses content-as-data; this is the single clearest violation in the repo. An editor has to touch JSX to fix a typo.

### S11. ZerohackApplyPage hardcodes form schema inline (inconsistent with JoinPage)

`src/pages/ZerohackApplyPage.jsx` (328 lines) embeds all form labels, placeholders, hints, and the pre-work commitment paragraph inline in JSX. JoinPage solved the same problem correctly — form schema lives in `src/content/join.js`, rendered generically via `FormSection`/`JoinField`. The two hackathon pages were built without adopting the JoinPage pattern. Reusing the pattern would drop ZerohackApplyPage from 328 to ~120 lines.

### S12. Six font families loaded globally at first paint (~400-600 KB)

`index.html:32-33` loads Source Serif 4, Space Grotesk, Inter, JetBrains Mono, Fraunces, Outfit across two stylesheet requests with 26+ total weight/italic variants. Fraunces and Source Serif 4 are only used by Investiture/Zerohack (verified in site.css). They should load via page-scoped `<link>` inserts in those pages' effects, not globally. Estimated savings: ~200-300 KB on first paint for manifesto routes.

### S13. Seven Principles content drift — three sources of truth

The Seven Principles exist in:
- `src/content/home.js` (short summary form)
- `src/content/philosophy.js` (canonical deep form)
- `netlify/functions/chat.js` SYSTEM_PROMPT (expanded form, 50 lines inline)

If the principles are updated in one place, the others silently drift. `chat.js`'s inline prompt is unreachable for the content editor and invisible to the content-as-data layer. If chat.js is kept alive, the prompt should move to `src/content/prompts/chat-system.js` or similar.

---

## Minor Findings

### M1. Unused imports in 6 pages (14 total)

Verified against the manifest (with one correction — `ArrowIcon` IS used in PhilosophyPage:90, only `Link` is unused there):

- `src/pages/LeadersPage.jsx` — `Link`, `ArrowIcon`
- `src/pages/OriginPage.jsx` — `Link`, `ExternalLinkIcon`, `ArrowIcon`
- `src/pages/NamePage.jsx` — `Link`, `ArrowIcon`
- `src/pages/PhilosophyPage.jsx` — `Link`
- `src/pages/ReadingPage.jsx` — `Link`, `ArrowIcon`
- `src/pages/ManifestoPage.jsx` — `recommendedReading` (destructured, never used)

### M2. BootSequence timeouts leak on early unmount

`src/components/BootSequence.jsx:29-33` schedules 8 `setTimeout` calls inside a `forEach` loop without tracking their IDs. The cleanup at L46-48 only clears `fadeTimer` and `doneTimer`. If the user navigates away during the 2.2-second boot sequence, 8 state-setters fire on an unmounted component. React 18+ silently suppresses the warning but the timers still run.

### M3. Nav hover-timeout not cleared on unmount

`src/components/Nav.jsx:59` (inside `NavDropdown.handleMouseLeave`) sets `timeout.current = setTimeout(() => setOpen(false), 150)` but the component has no `useEffect(() => () => clearTimeout(timeout.current), [])` cleanup. Rare window, but a user hovering a dropdown and immediately navigating triggers a setState on an unmounted component.

### M4. `prefers-reduced-motion` not respected by signature animations

- `VectorField.jsx` canvas loop runs every frame unconditionally
- `ZeroVectorAnimation.jsx` auto-advances stages regardless
- `DecryptText.jsx` scrambles text on every PageHero regardless

Investiture and Zerohack pages DO respect `prefers-reduced-motion` correctly. The shared components don't. Accessibility gap for motion-sensitive users across every page.

### M5. `fuse.js` is a dead dependency

`package.json:14` lists `fuse.js ^7.1.0`. Grep of `src/` finds zero imports (only incidental `infuse`/`inFuse` matches in CSS). Originally used by the Open Vector curriculum search, which has been moved to a separate subdomain. Remove the dep — ~12 KB gzipped saved.

### M6. `@/` Vite alias is defined but unused

`vite.config.js:18-20` defines `'@': path.resolve(__dirname, 'src')`. Grep of `from '@/'` in `src/` returns **zero results**. All 177 imports use relative paths. The alias is a no-op. Either start using it or remove it from config.

### M7. Plausible analytics loaded but never used for custom events

`index.html:22-26` loads and initializes Plausible, but no code in `src/` calls `window.plausible(...)` for custom events. Automatic pageviews still flow at the script level, but SPA page_view tracking in `SiteLayout.jsx:16-17` is GA-only. Either drop Plausible or mirror the page_view fire for it.

### M8. Inline `SYSTEM_PROMPT` in chat.js (50 lines) and quiz.js (35 lines)

Both functions embed large prompt strings inline with the handler code. These are content, not code — they should live in the content layer (e.g. `netlify/functions/prompts/`) for editorial consistency and to enable the content-as-data pattern that the rest of the repo follows.

### M9. Body-style theming effect duplicated across 5 standalone pages

`InvestiturePage`, `InvestitureSkillsPage`, `InvestitureChangelogPage`, `ZerohackPage`, `ZerohackBackgroundPage`, `ZerohackApplyPage` all duplicate the same `useEffect` that mutates `document.body.style` for theming and reverts on unmount. Natural extraction into a `useBodyTheme(bg, fg, margin)` hook. All current implementations also omit `margin` from cleanup — functional because every page sets `margin: '0'` anyway, but inconsistent with the other reverted properties.

### M10. Inline `ChevronIcon` in ManifestoPage duplicates the `icons.jsx` pattern

`src/pages/ManifestoPage.jsx` defines a `ChevronIcon` locally while `src/components/icons.jsx` is the designated home for SVG icons. One-line extraction.

### M11. Hardcoded Arroyo Labs card copy in ManifestoPage

`ManifestoPage.jsx` renders the Arroyo Labs closing card with copy hardcoded inline rather than sourced from `src/content/home.js`. Minor content-layer violation.

### M12. `deno.lock`, `tmux-client-*.log`, `vector/.DS_Store` committed to repo

Files that should be in `.gitignore`:
- `deno.lock` (repo uses Vite, not Deno — legacy artifact)
- `tmux-client-6629.log`, `tmux-client-6647.log` (stray tmux session logs)
- `vector/.DS_Store` (6148 bytes, macOS artifact)

### M13. `vector/` research scaffold is largely abandoned

`vector/research/{interviews,jtbd,personas,competitive,assumptions}`, `vector/schemas/`, `vector/decisions/` — all contain only `.gitkeep`. Only `vector/audits/` is actually used (two audit reports from 2026-03-11). The rest is scaffold for an ambition that never materialized in this repo.

### M14. Zero useMemo/useCallback in the codebase outside UserContext

Grep returns one match: `src/contexts/UserContext.jsx` uses `useCallback` for `signIn`/`signOut`. Zero `useMemo` anywhere. Most pages are content-rendering so memoization rarely matters, but JoinPage (505 lines with role filtering), ZerohackApplyPage (328 lines with conditional questions), and PhilosophyPage (7 principles with derived why/detail) likely recompute derived state on every render. Worth a measured pass, not speculative optimization.

### M15. Orphaned refs in ZerohackPage

`src/pages/ZerohackPage.jsx` declares `navRef` and `heroRef` that are never attached to any element. Dead state.

### M16. `firstErrorRef` in JoinPage declared but never assigned

`src/pages/JoinPage.jsx` declares a `firstErrorRef` intended for scroll-to-first-error, but the ref is never assigned to any input element. The scroll-on-error behavior still works via a different mechanism (`scrollIntoView` on a computed target), but the ref is dead.

### M17. `src/components/icons.jsx` lowercase filename violates PascalCase convention

Only non-PascalCase file in `src/components/`. Convention nit.

### M18. Third-party scripts without SRI hashes

`index.html:14-27` loads Google Analytics, Plausible, and (at L114-122) a Ko-fi overlay widget from `storage.ko-fi.com`, all without subresource integrity hashes. Industry-standard practice, not a unique Zero Vector risk, but a small supply-chain surface area.

---

## Dead Code Summary

**Fully orphaned files (safe to delete):**

| File | Lines |
|---|---|
| `src/pages/AskPage.jsx` | 207 |
| `src/pages/QuizPage.jsx` | 280 |
| `netlify/functions/chat.js` | 127 |
| `netlify/functions/quiz.js` | 139 |
| `src/components/ZeroVectorAnimation.jsx` | 190 |
| `src/content/recommended-reading.js` | 42 |
| **Subtotal** | **985** |

**Plus:**
- `netlify/functions/lib/rate-limit.js` (46 lines) — becomes dead if chat.js and quiz.js are removed
- ~109 dead CSS class selectors (~831 removable lines, ~8% of site.css)
- `SubstackIcon` and `LinkedInIcon` exports in `src/components/icons.jsx`
- 14 unused imports across 6 page files
- `deno.lock`, `tmux-client-*.log`, `vector/.DS_Store`
- `@/` Vite alias definition
- Orphaned refs: `firstErrorRef` in JoinPage, `navRef`/`heroRef` in ZerohackPage

**Grand total: ~1,862 lines of removable JSX/JS/CSS + assorted dead config and committed artifacts.**

---

## Commendations

### Genuinely well-built pieces

1. **`src/pages/JoinPage.jsx` is best-in-class for this repo.** 505 lines is justified by feature scope (6 roles, auth gate, conditional questions, validation, submit, confirmation). The page already extracts four in-file subcomponents (`JoinField`, `RoleCard`, `RoleDetail`, `FormSection`), sources its schema from `src/content/join.js`, and renders it generically. No god-file smell, no hidden logic, no drift. It should be the model that `ZerohackApplyPage` is rewritten against.

2. **`src/components/VectorField.jsx` is exemplary perf-conscious canvas code.** Float32Array for the angle grid, refs instead of state for the render loop, module-hoisted tuning constants, devicePixelRatio handling, single `setTransform` call per resize, lerp with normalization, passive listeners. 157 lines that earn every line. This is the quality bar.

3. **`netlify/functions/join.js` is a textbook auth-verified proxy.** Bearer token check, Supabase JWT verification, identity injection (server overwrites client-supplied name/email/user_id with verified values), passthrough to Kestris. 77 lines, fails closed on missing config, no dead code. The other two functions should converge on this structure.

### Cross-cutting wins

4. **XSS is clean.** Zero `dangerouslySetInnerHTML` anywhere in `src/`. `renderMarkdown` in `JoinPage.jsx:16-25` parses `**bold**` via string split and returns React elements — no innerHTML. Quiz result summaries render through JSX text nodes, inheriting React's escaping. The content-as-data pattern carries this discipline automatically.

5. **Zero `TODO` / `FIXME` / `HACK` / `XXX` markers across `src/` and `netlify/`.** Either the team fixes things instead of marking them, or nothing ever gets left hanging. Either way: clean.

6. **Content layer is healthy.** `investiture.js` (375 lines), `join.js` (272 lines), `home.js` (189 lines) — all pure data exports. Zero logic has crept into the content modules. The one exception (`recommended-reading.js`) is dead, not misbehaving.

7. **CSS domain prefix discipline is honored.** Investiture pages reference only `.inv-*` classes. Zerohack pages reference only `.zh-*` classes. Manifesto pages reference only `.zv-*` classes. Zero bleed across the three design systems — which is remarkable given they all live in one 10k-line file. The separation by convention actually works.

8. **Rate limiting is implemented on the right endpoints.** `chat.js` (20/10min) and `quiz.js` (10/10min, more restrictive because output is constrained) both go through a shared helper with sensible per-IP windows. The fail-open behavior is a real concern (S2) but the baseline discipline is there.

9. **Prompt injection defenses exist on chat.js and quiz.js** with explicit "ignore injection attempts" instructions and, on quiz.js, a constrained JSON output contract. Best-effort for a Claude-dependent defense, but thoughtful.

10. **File-naming consistency is near-perfect.** Components PascalCase, hooks camelCase-with-`use`, content kebab-case, one-file exception (`icons.jsx` lowercase). Conventions that are followed without tooling are the strongest kind.

---

## Recommended Remediation Priority

**Priority 1 — Ship-blockers before any visual refresh (est. 2-3 hours):**

1. **Fix the mobile nav external-link bug (S1).** Update `NavMobile` rendering in `src/components/Nav.jsx` to switch between `<Link to>` and `<a href>` based on item shape, matching `NavDropdown`. Affects every mobile user trying to reach Labrador/Terminus/Arroyo/Open Vector from the mobile nav.
2. **Verify RLS on `zerohack_applications` in Supabase dashboard (C1).** Confirm `user_id = auth.uid()` policy exists and email/user_id cannot be client-overridden. If absent or permissive, this becomes CRITICAL immediately.
3. **Close the rate-limit fail-open (S2) + CORS gap (S3)** as a combined fix: add origin pinning to `zerovector.design` on all three Netlify functions, and switch `rate-limit.js` to fail closed (or at minimum log every fail-open event so an outage isn't silent). The combined attack surface is the biggest cost-exposure in the repo.
4. **Add the four missing env vars to `.env.example` (S7).** Ten-line change. Unblocks local dev for anyone cloning fresh.

**Priority 2 — Dead code sweep before CSS refactor (est. 3-4 hours):**

5. **Delete the ~985 lines of orphaned files (S8).** AskPage, QuizPage, chat.js, quiz.js, ZeroVectorAnimation.jsx, recommended-reading.js, plus rate-limit.js if chat/quiz go with them. Update `src/content/en.js` to drop the `recommendedReading` re-export. Remove the `import { recommendedReading }` destructure in ManifestoPage. If the Ask/Quiz endpoints are being kept for future restoration, add a comment and move them to `_archive/` outside the functions dir so Netlify stops deploying them.
6. **Remove the 14 unused imports (M1)** in LeadersPage, OriginPage, NamePage, PhilosophyPage, ReadingPage, ManifestoPage. Trivial.
7. **Remove `fuse.js` from `package.json` (M5)** and run `npm install` to prune the lockfile.
8. **Delete or start using the `@/` Vite alias (M6).** Either way, resolve the dead config.
9. **Gitignore and remove `deno.lock`, `tmux-client-*.log`, `vector/.DS_Store` (M12).**

**Priority 3 — CSS teardown (est. 1-2 days, this is the big one):**

10. **Delete the ~109 dead class selectors and ~831 removable lines (S9).** Start with the highest-confidence clusters: retired Seven Principles system (L4051-4258), retired Investiture Layers/Chain (pre-v1.2), retired Reading list, retired Name nav cards, retired Enterprise crosslinks, retired Misconceptions/Suits/Philosophy closing. Leave the seven "maybe dynamic" `zv-animate-delay-*` and `zv-notify--*` variants until the JSX is re-checked for dynamic composition.
11. **Resolve the 19 duplicate bare-selector definitions** in the Zero Hack (12) and Investiture (6) blocks. Second definition silently overrides the first — pick one and delete the other.
12. **Tokenize.** The current `:root` has 42 vars covering color + fonts + 3 spacing values + 2 easings. No radius, shadow, breakpoint, transition-duration, or z-index tokens. Before the visual refresh, decide the full token set and refactor the Investiture and Zerohack blocks to consume it (both currently hardcode fonts and palettes, bypassing the tokens).
13. **Audit the 20 nav-related `!important`s at L2801-2828 and L5400-5411** — these are specificity fights that point to a structural issue in the nav cascade. A clean restructure removes them.

**Priority 4 — Content layer repair (est. 4-6 hours):**

14. **Migrate `ZerohackBackgroundPage` narrative to `src/content/zerohack-background.js` (S10).** ~2,200 words of hardcoded JSX become a data array rendered generically. Page drops from 300 to ~80 lines.
15. **Migrate `ZerohackApplyPage` form schema to content layer (S11)** following the JoinPage pattern. Extract or reuse `JoinField`. Page drops from 328 to ~120 lines.
16. **Move the `chat.js` and `quiz.js` SYSTEM_PROMPTs to the content layer (M8)** — or delete if P2 step 5 removes the functions entirely.
17. **Resolve the Seven Principles drift (S13).** Pick `src/content/philosophy.js` as canonical; make `home.js` import and derive the short form; update `chat.js` (or its replacement) to import rather than inline.
18. **Extract `useBodyTheme(bg, fg)` hook (M9)** and convert the 5 standalone pages to use it.

**Priority 5 — Doc rewrite (est. 2-3 hours):**

19. **Rewrite `ARCHITECTURE.md` (S5).** Remove Open Vector Learn / Arroyo / learn curriculum sections entirely. Add Zero Hack section. Add Investiture skills + changelog sub-pages. Fix CSS line count. Fix env var list. Fix CSS prefix table. Align with the MANIFEST.md generated today.
20. **Rewrite `README.md` (S6).** Remove Ask/Quiz/Learn Chat feature promises. Remove phantom `src/content/learn/` project structure. Add Investiture, Zero Hack, Join, Enterprise as current features.
21. **Add an API contracts doc** — one page describing chat/quiz/join request/response shapes (or whichever survive P2). Currently each function embeds its own contract and there's no shared source of truth.

**Priority 6 — Polish (est. 2-3 hours, can batch with refresh work):**

22. Fix timer leaks: BootSequence (M2), Nav hover timeout (M3).
23. Add `prefers-reduced-motion` gates to VectorField, ZeroVectorAnimation, DecryptText (M4).
24. Page-scope Fraunces/Source Serif 4/Outfit fonts out of `index.html` into Investiture/Zerohack page effects (S12). Estimated ~200-300 KB first-paint savings on manifesto routes.
25. Decide on Plausible (M7): wire it up in SiteLayout alongside gtag or remove it.
26. Extract `ChevronIcon` from ManifestoPage into `icons.jsx` (M10).
27. Source the Arroyo Labs card copy from `home.js` (M11).
28. Rename `icons.jsx` → `Icons.jsx` (M17).
29. Remove orphaned refs: `firstErrorRef` (M16), `navRef`/`heroRef` (M15).

---

## Per-File Classification

Representative sample — the 25 most load-bearing files by impact.

| File | Lines | Classification | Notes |
|---|---|---|---|
| `src/styles/site.css` | 10,262 | **SIGNIFICANT DEBT** | Three design systems in one file, ~831 dead lines, 19 duplicate selectors, 35 `!important`s, thin token system. Primary target for refresh teardown. |
| `src/pages/JoinPage.jsx` | 505 | **CLEAN** | Best-in-class. Content-as-data, generic rendering, in-file subcomponents, full loading/error/success states. Model for other forms. |
| `src/pages/InvestiturePage.jsx` | 378 | **CLEAN** | Content-dense but single concern. Minor duplication in the two quickstart terminals. Body theming works correctly. |
| `src/content/investiture.js` | 375 | **CLEAN** | Pure data. ASCII file tree stored correctly as template literal. Zero logic creep. |
| `src/pages/ZerohackPage.jsx` | 368 | **MINOR DEBT** | Content-dense single-concern page. Orphaned `navRef`/`heroRef`, parallax doesn't rAF-batch, CountUp should move to components. |
| `src/pages/ManifestoPage.jsx` | 344 | **MINOR DEBT** | Inline `ChevronIcon` duplicates icons.jsx pattern. Hardcoded Arroyo card copy bypasses content layer. Closing section conflates CTA with footer nav. Unused `recommendedReading` import. |
| `src/pages/ZerohackApplyPage.jsx` | 328 | **SIGNIFICANT DEBT** | Form schema hardcoded inline (should follow JoinPage pattern). Direct client-side Supabase insert (conditional CRITICAL pending RLS verification). Duplicates body-theming effect. |
| `src/pages/ZerohackBackgroundPage.jsx` | 300 | **SIGNIFICANT DEBT** | 2,200-word narrative hardcoded as JSX. Single clearest content-as-data violation. Duplicates body-theming effect. |
| `src/components/Nav.jsx` | 281 | **SIGNIFICANT DEBT** | Mobile drawer bug renders `<Link to={undefined}>` for external hrefs (S1). Hover timeout not cleaned. Desktop and mobile paths don't share rendering primitive. |
| `src/pages/QuizPage.jsx` | 280 | **DEAD** | Orphaned — `/quiz` route redirects to `/start`. Code quality is otherwise fine. Delete or restore. |
| `src/content/join.js` | 272 | **CLEAN** | Pure data. Textbook form schema — labels, types, conditional role keys, hints. The reason JoinPage stays readable. |
| `src/pages/AskPage.jsx` | 207 | **DEAD** | Orphaned — `/ask` route redirects to `/start`. Delete or restore. |
| `src/components/ZeroVectorAnimation.jsx` | 190 | **DEAD** | Zero importers anywhere in the codebase. Delete. |
| `src/content/home.js` | 189 | **MINOR DEBT** | Pure data, but contains a 10-entry `timeline` section possibly orphaned from ManifestoPage's current render. Seven Principles short-form drifts with philosophy.js and chat.js. |
| `src/components/VectorField.jsx` | 157 | **CLEAN** | Exemplary canvas perf code. Only nit: no `prefers-reduced-motion` gate. |
| `src/pages/PhilosophyPage.jsx` | 148 | **MINOR DEBT** | Clean content-driven rendering. Unused `Link` import. |
| `src/pages/LeadersPage.jsx` | 147 | **MINOR DEBT** | Clean content-driven rendering. Unused `ArrowIcon`, `Link` imports. |
| `src/pages/ReadingPage.jsx` | 142 | **MINOR DEBT** | Clean content-driven rendering. Unused `Link`, `ArrowIcon` imports. |
| `netlify/functions/quiz.js` | 139 | **DEAD** | Orphaned — only consumer was QuizPage (dead). Delete with quiz. |
| `src/pages/NamePage.jsx` | 136 | **MINOR DEBT** | Inline `ZeroVectorDiagram` SVG helper is fine (page-specific). Unused `Link`, `ArrowIcon` imports. |
| `src/pages/EnterprisePage.jsx` | 128 | **CLEAN** | Content-driven, no issues found. |
| `src/pages/OriginPage.jsx` | 128 | **MINOR DEBT** | Unused `ExternalLinkIcon`, `ArrowIcon`, `Link` imports. |
| `netlify/functions/chat.js` | 127 | **DEAD** | Orphaned — only consumer was AskPage (dead). If kept, move inline SYSTEM_PROMPT to content layer. |
| `src/components/DecryptText.jsx` | 122 | **MINOR DEBT** | Multi-phase state machine lacks explanatory header comment. No reduced-motion gate. Otherwise clean. |
| `src/pages/PrivacyPage.jsx` | 120 | **MINOR DEBT** | All legal copy hardcoded in JSX. Low priority; legal copy is naturally rare to change. |
| `netlify/functions/join.js` | 77 | **CLEAN** | Textbook auth-verified proxy. Would benefit from payload size guard for consistency with chat/quiz, but not required. |
| `src/contexts/UserContext.jsx` | 81 | **SIGNIFICANT DEBT** | No `.catch` on `getSession` — perpetual loading on Supabase outage. Embedded-browser detection works but lacks per-token annotations. |
| `netlify/functions/lib/rate-limit.js` | 46 | **SIGNIFICANT DEBT** | Fails open silently on three failure modes with no logging. Primary cost-exposure vector when combined with no-CORS. |
| `ARCHITECTURE.md` | 375 | **SIGNIFICANT DEBT** | Substantially stale — describes phantom Open Vector/Arroyo/Learn sections, wrong line counts, wrong env vars, missing Zero Hack. |
| `README.md` | 149 | **SIGNIFICANT DEBT** | Promotes retired Ask/Quiz features, describes moved-out Open Vector curriculum, omits current primary features. |
| `.env.example` | 3 | **SIGNIFICANT DEBT** | Missing four env vars consumed by shipped functions. Blocks local dev onboarding. |

---

**Audited: 2026-04-10**
