# Remediation Plan

**Source:** AUDIT.md
**Generated:** 2026-04-10
**Overall classification from audit:** SIGNIFICANT DEBT
**Total phases:** 6
**Estimated total scope:** ~35 files across 6 phases, ~6-9 hours of focused agent work

This plan clears the repo of dead weight, closes the production bugs flagged in the audit, repairs content-layer violations, and brings documentation back to truth — before any visual refresh work begins. The refresh should start from a clean base, not on top of drift.

**Non-negotiables preserved from the audit commendations — do NOT touch these:**
- `src/pages/JoinPage.jsx` is the best-in-class form pattern. Do not refactor, do not split. Other forms should converge on its shape.
- `src/components/VectorField.jsx` is exemplary canvas perf code. Only additive changes (reduced-motion gate in Phase 5).
- `netlify/functions/join.js` is a textbook auth-verified proxy. Additive changes only (CORS + size guard in Phase 2).
- The content-as-data pattern in `src/content/*.js` — it's healthy. Keep it that way.
- The CSS prefix discipline (`zv-` / `inv-` / `zh-`) — preserved cleanly despite everything living in one file.
- The rate-limited + prompt-injection-defended Anthropic endpoints, IF they survive Phase 1 (conditional on Samantha's call to delete or preserve Ask/Quiz).

---

## Phase 1: Dead Code Cleanup
**Risk:** Zero
**Estimated scope:** ~14 files deleted or modified, deletions only
**Prerequisite:** None

### Context

The audit identified ~985 lines of fully orphaned JSX/JS, ~14 unused imports, multiple orphaned refs, one dead dependency, one dead Vite config alias, and several tracked artifacts that belong in `.gitignore`. All of it is reachable from nothing. Removing it can't break production and dramatically reduces noise for every subsequent phase — especially the CSS teardown in Phase 3.

### Decision point before starting: preserve or delete Ask/Quiz?

The audit classified `AskPage.jsx` (207 lines), `QuizPage.jsx` (280 lines), `netlify/functions/chat.js` (127 lines), and `netlify/functions/quiz.js` (139 lines) as DEAD. The routes `/ask` and `/quiz` redirect to `/start` per `src/App.jsx:38-39`, and nothing else imports these files. **Samantha must make the call before this phase runs:**

- **Option A — Delete permanently.** Remove all four files. The code is in git history if it ever needs to come back. Simplest and cleanest.
- **Option B — Archive.** Move all four to an `_archive/` directory at the repo root (outside `src/` and `netlify/`) so Vite and Netlify stop seeing them but the code is preserved for future restoration. Add `_archive/` to `.gitignore` if desired.

The default in the task list below assumes **Option A (delete)**. If Samantha picks Option B, substitute `git mv` into `_archive/` for the deletions.

### Tasks

1. **Delete orphaned page and function files** (Option A assumed — see decision point above):
   - `src/pages/AskPage.jsx` (207 lines)
   - `src/pages/QuizPage.jsx` (280 lines)
   - `netlify/functions/chat.js` (127 lines)
   - `netlify/functions/quiz.js` (139 lines)
   - `netlify/functions/lib/rate-limit.js` (46 lines) — becomes dead once chat.js and quiz.js are gone. Verify no other caller with grep before deleting.

2. **Delete `src/components/ZeroVectorAnimation.jsx`** (190 lines). Zero importers confirmed by grep. Do NOT delete the related CSS block (`site.css:984+`) yet — that happens in Phase 3.

3. **Delete `src/content/recommended-reading.js`** (42 lines). The "LearnHubPage" consumer is gone (Open Vector moved to subdomain). Only reference in this repo is the destructure in `ManifestoPage.jsx:29` where it is imported and never used. Required follow-up edits:
   - Remove `import recommendedReading from './recommended-reading';` (or similar) from `src/content/en.js`
   - Remove `recommendedReading,` from the `en` object export in `src/content/en.js`
   - Remove the `recommendedReading` destructure on `src/pages/ManifestoPage.jsx` (the import line that destructures from `en`)

4. **Delete dead named exports from `src/components/icons.jsx`:**
   - `SubstackIcon` (around line 17)
   - `LinkedInIcon` (around line 25)
   - Keep `ArrowIcon` and `ExternalLinkIcon` — both are in active use.

5. **Remove unused imports** (14 total across 6 page files):
   - `src/pages/LeadersPage.jsx` — remove `Link` and `ArrowIcon`
   - `src/pages/OriginPage.jsx` — remove `Link`, `ExternalLinkIcon`, `ArrowIcon`
   - `src/pages/NamePage.jsx` — remove `Link` and `ArrowIcon`
   - `src/pages/PhilosophyPage.jsx` — remove `Link` (KEEP `ArrowIcon` — it is used at line 90)
   - `src/pages/ReadingPage.jsx` — remove `Link` and `ArrowIcon` (KEEP `ExternalLinkIcon` — it is used)
   - `src/pages/ManifestoPage.jsx` — remove the unused `recommendedReading` destructure (will already be handled in task 3)

6. **Remove orphaned refs:**
   - `src/pages/JoinPage.jsx` — delete `const firstErrorRef = useRef(null);` and any references. The scroll-to-error behavior uses a different mechanism (`scrollIntoView` on a computed target) and still works.
   - `src/pages/ZerohackPage.jsx` — delete `const navRef = useRef(null);` and `const heroRef = useRef(null);`. Neither is attached to any element.

7. **Remove the dead `fuse.js` dependency:**
   - Remove `"fuse.js": "^7.1.0"` from `package.json` dependencies
   - Run `npm install` to prune `package-lock.json`
   - Verify with grep: `from 'fuse` and `require('fuse` should both return zero results in `src/`

8. **Remove the unused `@/` Vite alias:**
   - Delete the `resolve.alias` block in `vite.config.js:17-21`
   - Verify with grep: `from '@/'` returns zero results across `src/`
   - Alternative if Samantha prefers to keep the alias: leave it in place and plan to adopt it gradually. Default to deletion.

9. **Add stray files to `.gitignore` and remove from tracking:**
   - Add these lines to `.gitignore`: `deno.lock`, `tmux-client-*.log`, `.DS_Store` (the last one should already be there — verify)
   - `git rm --cached deno.lock tmux-client-6629.log tmux-client-6647.log vector/.DS_Store`
   - Do NOT delete the working copies if they have any local significance — `--cached` only untracks them.

10. **Judgment call: `vector/` research scaffold.** The `vector/research/{interviews,jtbd,personas,competitive,assumptions}/`, `vector/schemas/`, and `vector/decisions/` directories contain only `.gitkeep` files. `vector/audits/` is actively used by the `invest-architecture` and `invest-doctrine` skills. Options:
    - **Keep the scaffold** — signals intent to populate, which was the original plan
    - **Delete the empty subdirs** — honest reflection of actual usage. Delete: `vector/research/`, `vector/schemas/`, `vector/decisions/`. Keep `vector/README.md` and `vector/audits/`.
    - Default to **keep** unless Samantha says otherwise. Document the decision in the commit message.

### Scope boundaries (DO NOT do in this phase)

- Do NOT touch any CSS in `src/styles/site.css`. CSS cleanup is Phase 3.
- Do NOT fix any bugs, even if you notice them. Phase 2.
- Do NOT rewrite any docs. Phase 6.
- Do NOT extract any components, hooks, or content. Phase 4.
- Do NOT change behavior. Every deletion should leave the running app identical.

### Verification

- [ ] `npm run build` passes with zero warnings
- [ ] `npm run dev` starts and the homepage renders
- [ ] Navigate to `/philosophy`, `/approach`, `/for-builders`, `/for-leaders`, `/for-enterprise`, `/media`, `/origin`, `/start`, `/name`, `/join`, `/investiture`, `/zerohack` — all render without console errors
- [ ] Navigate to `/ask` and `/quiz` — both should redirect to `/start` (still working because the `<Navigate>` components in App.jsx remain)
- [ ] Grep for `AskPage`, `QuizPage`, `ZeroVectorAnimation`, `SubstackIcon`, `LinkedInIcon`, `recommendedReading`, `fuse` — zero functional references in `src/` and `netlify/`
- [ ] `git status` shows the expected deletions and no unexpected modifications
- [ ] Lines removed: approximately 985 JSX/JS lines + dead exports + 14 unused imports + ~4 orphaned ref lines

### Rollback

This phase is low-risk because it's all deletions. If the build breaks:
- Most likely cause: a file you deleted is actually imported somewhere the grep missed (e.g. dynamic import)
- Fix: `git diff HEAD` will show what was deleted. Restore the file with `git checkout HEAD -- path/to/file` and grep again for consumers.
- Ask/Quiz restore: if Samantha changes her mind and wants Ask/Quiz back, `git revert` the phase commit. The routes in App.jsx still redirect, so the pages won't be reachable until App.jsx is also updated.

---

## Phase 2: Ship-Blocker Bugs and Security Fixes
**Risk:** Low
**Estimated scope:** 5 files modified, additive safety changes
**Prerequisite:** Phase 1 complete (affects scope of tasks 3 and 4)

### Context

The audit identified one confirmed mobile production bug (Nav external links rendering as `<Link to={undefined}>`), three error-handling gaps that silently fail under stress (UserContext, BootSequence, Nav hover), one security gap combining no CORS with a rate-limiter that fails open on every error mode, and one `.env.example` that's missing four environment variables consumed by shipped functions. None of these are code-structural changes — they're targeted, additive fixes.

### Manual prerequisite (Samantha must verify in Supabase dashboard before this phase is marked complete)

**C1: Verify RLS on `zerohack_applications` table.** `src/pages/ZerohackApplyPage.jsx:68-82` performs a direct `supabase.from('zerohack_applications').insert(...)` from the browser. The audit cannot verify the RLS policy from the codebase. Required check:

- Open Supabase dashboard → Authentication → Policies → `zerohack_applications`
- Confirm there is an `INSERT` policy that pins `user_id = auth.uid()` (not just `true` or `authenticated`)
- Confirm there is no way for a client to spoof `email`, `name`, or `user_id` via RLS bypass
- If the policy is absent or permissive, either (a) add the pinned-user policy, or (b) rewrite the page to go through a Netlify function that verifies identity like `join.js` does

Do not start this phase's code tasks until C1 is verified. If the RLS is wrong, adding a Netlify function proxy is a separate scope item.

### Tasks

1. **Fix the mobile nav external-link bug (S1, confirmed production bug).** In `src/components/Nav.jsx`, locate the mobile drawer rendering (the block that iterates `navGroups.items` for mobile display — approximately the lower half of the file). The current code renders `<Link to={item.to}>...</Link>` for every item. The Resources group contains items with `item.href` (Labrador, Terminus, Arroyo, Open Vector). Those items have `item.to === undefined` and render as broken links on mobile.

   Update the mobile drawer item rendering to match the pattern used by `NavDropdown` (the desktop dropdown component in the same file) — switch between `<Link to={item.to}>` for internal and `<a href={item.href} target="_blank" rel="noopener noreferrer">` for external items. Use a conditional like:

   ```jsx
   {item.to ? (
     <Link to={item.to} onClick={closeMobileMenu}>
       {item.label}
     </Link>
   ) : (
     <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
       {item.label}
     </a>
   )}
   ```

   Test on a narrow viewport (dev tools device emulation). Every item in the Mindset / Application / Resources groups should navigate correctly.

2. **Add missing environment variables to `.env.example` (S7).** Replace the current three-line file with:

   ```
   # Client (exposed to browser via Vite)
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=

   # Server (Netlify Functions only)
   ANTHROPIC_API_KEY=
   SUPABASE_URL=
   SUPABASE_SERVICE_ROLE_KEY=
   KESTRIS_API_URL=https://kestris.netlify.app
   KESTRIS_API_KEY=
   ```

   `SUPABASE_URL` is NOT the same as `VITE_SUPABASE_URL` — it's used server-side by `netlify/functions/join.js:4` and (if not deleted in Phase 1) `netlify/functions/lib/rate-limit.js:1`. If Phase 1 deleted chat.js/quiz.js/rate-limit.js, you can omit `SUPABASE_URL` from this file IF join.js doesn't reference it — verify with grep. The `ANTHROPIC_API_KEY` line can also be removed if chat.js and quiz.js are gone.

3. **Add CORS origin pinning to surviving Netlify functions (S3).** For each function still in `netlify/functions/` after Phase 1 (at minimum `join.js`; possibly also `chat.js` and `quiz.js` if kept), add origin checking at the top of the handler:

   ```js
   const ALLOWED_ORIGINS = [
     'https://zerovector.design',
     'https://www.zerovector.design',
     // Add localhost origins only in dev
     ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3006', 'http://localhost:5174'] : []),
   ];

   const origin = request.headers.get('origin') || '';
   if (!ALLOWED_ORIGINS.includes(origin)) {
     return new Response(JSON.stringify({ error: 'Forbidden' }), {
       status: 403,
       headers: { 'Content-Type': 'application/json' },
     });
   }
   ```

   Match the response shape and style already used in each function. Add `Access-Control-Allow-Origin: ${origin}` and `Vary: Origin` headers to successful responses so browser CORS preflights pass.

4. **Switch `rate-limit.js` to fail closed (S2).** ONLY if Phase 1 did not delete `rate-limit.js`. Currently `netlify/functions/lib/rate-limit.js:24, 38, 42` returns `true` (allowed) on missing env, non-2xx RPC, and thrown exceptions. Change all three to return `false` (denied), and add `console.error` logging at each failure point so the outage is visible in Netlify logs:

   ```js
   if (!supabaseUrl || !supabaseKey) {
     console.error('[rate-limit] Supabase env vars missing — denying request');
     return false;
   }
   // ... similar for RPC failure and catch block
   ```

   This is a policy change: under Supabase outage, Anthropic endpoints will deny all requests instead of letting them flow through. That's the safer default because a Supabase hiccup no longer exposes the Anthropic bill.

5. **Add error handling to UserContext (S4).** In `src/contexts/UserContext.jsx:27-30`, the `supabase.auth.getSession().then(...)` call has no `.catch`. If Supabase is unreachable, `loading` stays `true` forever and every auth-gated page hangs. Add:

   ```js
   supabase.auth.getSession()
     .then(({ data: { session } }) => {
       if (session?.user) setUser(mapUser(session.user));
       setLoading(false);
     })
     .catch((err) => {
       console.error('[UserContext] getSession failed:', err);
       setLoading(false);
       // Leave user as null — treat Supabase outage as "signed out"
     });
   ```

   Also wrap `signIn` and `signOut` (around lines 58 and 66) in try/catch that logs and surfaces failure to the caller rather than silently doing nothing.

6. **Fix BootSequence timer leak (M2).** In `src/components/BootSequence.jsx:29-33`, the `forEach` loop schedules 8 `setTimeout`s without tracking their IDs. If the user navigates away during the boot sequence, those timers fire on an unmounted component. Collect the IDs:

   ```js
   const timeoutIds = [];
   BOOT_LINES.forEach((line, i) => {
     const id = setTimeout(() => setLines((prev) => [...prev, line]), i * 250);
     timeoutIds.push(id);
   });
   ```

   Then in the cleanup (around line 46), clear them all:

   ```js
   return () => {
     timeoutIds.forEach(clearTimeout);
     clearTimeout(fadeTimer);
     clearTimeout(doneTimer);
   };
   ```

7. **Fix Nav hover timeout leak (M3).** In `src/components/Nav.jsx`, the `NavDropdown` subcomponent uses `timeout.current = setTimeout(...)` in `handleMouseLeave` (around line 59) but has no cleanup effect. Add:

   ```js
   useEffect(() => {
     return () => {
       if (timeout.current) clearTimeout(timeout.current);
     };
   }, []);
   ```

   Place this inside `NavDropdown` alongside the existing outside-click effect.

### Scope boundaries (DO NOT do in this phase)

- Do NOT touch any CSS.
- Do NOT extract shared utilities or refactor shared patterns. Fix the specific bugs; leave the structure for Phase 4.
- Do NOT change the functions' request/response shapes — only add safety.
- Do NOT add retries, backoff, or other resilience beyond what's specified.

### Verification

- [ ] `npm run build` passes
- [ ] On mobile viewport: open mobile nav, tap every item in Mindset, Application, Resources — each navigates correctly (internal items change route, external items open in new tab)
- [ ] `cat .env.example` shows all required variables
- [ ] POST to `/.netlify/functions/join` from an unauthorized origin (e.g. `curl -H 'origin: https://example.com'`) returns 403
- [ ] POST to `/.netlify/functions/join` from `zerovector.design` still works
- [ ] If rate-limit.js still exists: temporarily set wrong Supabase URL → the Anthropic endpoints return 503/429 instead of flowing through
- [ ] In UserContext: with Supabase URL set to an unreachable endpoint, the app still loads and pages don't hang
- [ ] BootSequence: navigate away during the boot sequence (hit a nav link within 2 seconds) — no React warnings in console
- [ ] Nav dropdown: hover-leave with dev tools open for React warnings — no "state update on unmounted component" warnings
- [ ] **Manual:** C1 Supabase RLS verification is confirmed and documented

### Rollback

- S1 mobile nav fix: single-file change in Nav.jsx. `git checkout HEAD~1 -- src/components/Nav.jsx` reverts.
- CORS fix: if it breaks production traffic (e.g. a domain was missed in `ALLOWED_ORIGINS`), temporarily remove the origin check while you audit. Better to ship slow than broken.
- Rate-limit fail-closed change: if Supabase hiccups in production and locks users out of chat/quiz for an hour, that's expected behavior — the alternative is silent cost exposure. If it's causing false positives under normal load, investigate the RPC before reverting the policy.

---

## Phase 3: CSS Dead Code Removal
**Risk:** Low
**Estimated scope:** 1 file modified (`src/styles/site.css`), deletions only
**Prerequisite:** Phase 1 complete (removes page files and components whose CSS becomes dead)

### Context

The audit identified ~109 dead class selectors in `src/styles/site.css` totaling approximately 831 removable lines (~8% of the file). These classes were confirmed dead via word-boundary grep against all 32 JSX/JS files in the repo. There are also 19 duplicate bare-selector definitions (same class defined twice outside `@media` — second silently overrides first). The CSS refresh happens in a separate future effort — this phase is deletion only, not tokenization or restructuring.

**Why now, not during the refresh?** Every design decision made on top of dead styles is a decision based on wrong information. Clearing the dead code first means the token pass and restructuring in the future refresh work with honest inputs. Also, some dead class blocks reference classes from files that were deleted in Phase 1 (`ZeroVectorAnimation`, AskPage/QuizPage if removed) — those blocks become trivially dead after Phase 1.

### Tasks

For each deletion, note the line range and the approximate selector pattern. Use the agent that characterized the CSS (see `vector/audits/` if the full scan is preserved there, or re-run the dead CSS scan) for exact line numbers. The high-confidence dead clusters identified by the scan:

1. **Retired Seven Principles system** (~12 classes, approximately lines 4051-4258):
   - `zv-seven-principle`, `zv-seven-principles`, `zv-seven-principle-numeral`, `zv-seven-principle-title`, `zv-seven-principle-body`, `zv-seven-principle-content`, `zv-principle`, `zv-principles`, `zv-principle-number`, `zv-principle-title`, `zv-principle-desc`, `zv-principle-content`
   - Superseded by the `zv-principle-summary-*` and `zv-philosophy-principle` classes which ARE in use.
   - Delete the entire rule block for each.

2. **Retired Investiture Layers + Chain scaffolding** (~21 classes, pre-v1.2 remnants):
   - `inv-layer`, `inv-layers`, `inv-layer-number`, `inv-layer-title`, `inv-layer-desc`, `inv-layer-content`, `inv-layer-path`, `inv-layer-connector`
   - `inv-chain`, `inv-chain-flow`, `inv-chain-entry`, `inv-chain-entry-header`, `inv-chain-entry-name`, `inv-chain-entry-role`, `inv-chain-entry-desc`, `inv-chain-entry-when`
   - `inv-two-col`, `inv-subtitle`, `inv-cta-title`, `inv-cta-body`, `inv-badge`

3. **Retired pipeline list system** (5 classes around lines 371-413):
   - `zv-pipeline-phases-item`, `zv-pipeline-phases-label`, `zv-pipeline-phases-num`, `zv-pipeline-phases-list`, `zv-pipeline-intro-layout`
   - These tied to the deleted `pipeline.js` content file mentioned in the sprint history.

4. **Retired homepage Featured Article block** (lines 785-833):
   - `zv-featured-article`, `zv-featured-article-badge`, `zv-featured-article-title`, `zv-featured-article-cta`

5. **Retired Reading list system** (10 classes, lines 842-917):
   - `zv-reading`, `zv-reading-list`, `zv-reading-headline`, `zv-reading-subtitle`, `zv-reading-item`, `zv-reading-item-title`, `zv-reading-item-subtitle`, `zv-reading-item-meta`, `zv-reading-item-date`, `zv-reading-item-cta`
   - `/reading` became `/media` and uses different classes.

6. **Retired Name page nav cards** (lines 1107-1158):
   - `zv-name-nav-cards`, `zv-name-nav-card`, `zv-name-nav-card-eyebrow`, `zv-name-nav-card-title`, `zv-name-nav-card-cta`

7. **Retired Start page connect cards** (lines 7827-7861, and 4991):
   - `zv-start-connect`, `zv-start-connect-card`, `zv-start-connect-card-cta`, `zv-start-connect-card-title`, `zv-start-connect-card-desc`, `zv-start-connect--spaced`

8. **Retired Enterprise crosslinks and notify** (lines 4901-4962, 4747):
   - `zv-enterprise-crosslinks`, `zv-enterprise-crosslink`, `zv-enterprise-crosslink-arrow`, `zv-enterprise-crosslink-eyebrow`, `zv-enterprise-crosslink-title`, `zv-enterprise-crosslink-desc`, `zv-enterprise-notify`, `zv-enterprise-notify-label`, `zv-enterprise-contact-desc`

9. **Retired Misconceptions + Old/New way contrasts** (lines 2210-2217, 4260-4279):
   - `zv-misconceptions`, `zv-misconception`, `zv-misconception-claim`, `zv-misconception-explanation`, `zv-old-way`, `zv-new-way`

10. **Retired Suits/Mark III motif** (lines 4182-4205):
    - `zv-suits`, `zv-suit`, `zv-suit-label`, `zv-suit-mark`, `zv-section--markiii`

11. **Retired nav bits** (lines 2629-2683, 5414):
    - `zv-nav-icon`, `zv-nav-divider`, `zv-nav-mobile-social`

12. **Retired Philosophy closing block** (lines 4547-4578):
    - `zv-philosophy-closing`, `zv-philosophy-closing-primary`, `zv-philosophy-closing-secondary`, `zv-philosophy-closing-actions`, `zv-philosophy-closing-block-text`

13. **Retired Explainer parent wrappers and timeline bits:**
    - `zv-section--explainer`, `zv-explainer`, `zv-explainer-audience`
    - `zv-timeline-layout`, `zv-timeline-narrative`, `zv-timeline-tool`
    - Note: descendant classes like `zv-explainer-headline`, `zv-explainer-body`, `zv-explainer-paths`, `zv-explainer-path` ARE in use — do NOT delete those.

14. **Retired Leaders/Coming-Soon/Boot/Start misc:**
    - `zv-leaders-explore`, `zv-coming-soon-card`, `zv-coming-soon-badge`, `zv-boot-terminal`, `zv-hero-proof`, `zv-hero-entrance-delay`, `zv-page-next-links`, `zv-page-next-steps`, `zv-closing-links`, `zv-start-announcement-placeholder`, `zv-start-announcement-cta-disabled`, `zv-section--declaration`

15. **CSS for the ZeroVectorAnimation component deleted in Phase 1:**
    - Find the block starting around line 984 (the `/* === ZERO VECTOR ANIMATION === */` comment region) and delete all rules in that section. The JSX consumer is gone.

16. **Resolve 19 duplicate bare-selector definitions.** These are classes defined twice outside any `@media` query — the second definition silently overrides the first. For each, decide which definition is canonical (usually the later one, since it's the one actually applying) and delete the earlier duplicate:
    - **Zero Hack (12):** `zh-btn--primary`, `zh-footer-tagline`, `zh-nav-back`, `zh-nav-brand`, `zh-prize-card`, `zh-prize-card--first`, `zh-prize-place`, `zh-register-price`, `zh-rubric-card`, `zh-rubric-weight`, `zh-session`, `zh-session-num`
    - **Investiture (6):** `inv-btn` (L7052, L7115), `inv-card` (L5886, L6523), `inv-cta-buttons` (L7024, L7045), `inv-hero` (L5846, L6365), `inv-layer-number` (L6049, L6602 — both become dead if task 2 removes `inv-layer-number`), `inv-nav-brand` (L6153, L7130)
    - **Core:** `zv-quiz-section` (L1959, L4992)

### Do NOT delete (despite looking dead)

The scanner flagged these as "maybe dynamic" — they're composed via template literals in JSX and the static scan missed them. Keep:

- `zv-animate-delay-1`, `zv-animate-delay-2`, `zv-animate-delay-3`, `zv-animate-delay-4` — composed as `` `zv-animate-delay-${n}` `` in `Animate.jsx`
- `zv-notify--dark`, `zv-notify--light`, `zv-notify--orange` — composed as `` `zv-notify--${variant}` `` in `NotifyForm.jsx`

### Scope boundaries (DO NOT do in this phase)

- Do NOT tokenize. The token pass is part of the future visual refresh, not this remediation.
- Do NOT restructure or reorder sections.
- Do NOT touch the 35 `!important` declarations. The nav specificity fights at L2801-2828 and L5400-5411 are a separate concern for the refresh.
- Do NOT consolidate parallel design systems (Investiture and Zerohack each having their own nav/card/button classes). That restructuring belongs to the refresh.
- Do NOT change any class that IS in use, even if you dislike the name.
- Do NOT rename classes.

### Verification

- [ ] `npm run build` passes
- [ ] Every route renders identically to before: `/`, `/philosophy`, `/approach`, `/for-builders`, `/for-leaders`, `/for-enterprise`, `/media`, `/origin`, `/start`, `/name`, `/join`, `/investiture`, `/investiture/skills`, `/investiture/changelog`, `/zerohack`, `/zerohack/background`, `/zerohack/apply`
- [ ] Visual spot-check at mobile and desktop breakpoints on the homepage and on /investiture and /zerohack (the three highest-traffic visual surfaces)
- [ ] `wc -l src/styles/site.css` shows roughly 9,400 lines (down from 10,262)
- [ ] `git diff --stat` shows only `src/styles/site.css` was modified

### Rollback

- If a visual regression appears on any page, the most likely cause is a compound selector that was anchored to a "dead" parent class but whose child class is still in use elsewhere. Example: deleting `.zv-section--explainer` also deletes `.zv-section--explainer .zv-hero-title { ... }` which was providing a unique style for the title in that context.
- Fix: `git diff HEAD -- src/styles/site.css` to find what was deleted. Restore the specific compound rule as a standalone rule scoped to its current parent, or revert the specific class deletion.
- This is why the phase is classified Low and not Zero risk — compound selectors create non-obvious dependencies.

---

## Phase 4: Content Layer Repair
**Risk:** Medium
**Estimated scope:** 8 files modified, 2 files created, structural extraction
**Prerequisite:** Phases 1-3 complete (fewer files to touch, no CSS conflicts)

### Context

The audit identified four content-layer violations where copy or schema is hardcoded in JSX instead of living in `src/content/*.js`: the Zerohack Background page is 2,200 words of inline JSX, the Zerohack Apply page has its entire form schema inline, the Seven Principles exist in three different sources that can drift, and several small pockets (Arroyo card, inline ChevronIcon) bypass established patterns. The audit also identified that the body-style theming effect is duplicated across five standalone pages and should become a shared hook. This phase brings the repo back into alignment with its own content-as-data doctrine.

### Tasks

1. **Extract `useBodyTheme` hook** (M9). Create `src/hooks/useBodyTheme.js`:

   ```js
   import { useEffect } from 'react';

   /**
    * Sets document.body styles for standalone-layout pages (Investiture, Zerohack).
    * Reverts to the caller-provided defaults on unmount.
    * Reason: these pages bypass SiteLayout and need their own dark theme.
    */
   export default function useBodyTheme({ background, color, margin = '0' }) {
     useEffect(() => {
       const prev = {
         background: document.body.style.background,
         color: document.body.style.color,
         margin: document.body.style.margin,
       };
       document.body.style.background = background;
       document.body.style.color = color;
       document.body.style.margin = margin;
       return () => {
         document.body.style.background = prev.background;
         document.body.style.color = prev.color;
         document.body.style.margin = prev.margin;
       };
     }, [background, color, margin]);
   }
   ```

   Then replace the inline `useEffect` body-style mutations in all five consumers with a single `useBodyTheme({ background: '...', color: '...' })` call:
   - `src/pages/InvestiturePage.jsx` (current inline effect)
   - `src/pages/InvestitureSkillsPage.jsx`
   - `src/pages/InvestitureChangelogPage.jsx`
   - `src/pages/ZerohackPage.jsx`
   - `src/pages/ZerohackBackgroundPage.jsx`
   - `src/pages/ZerohackApplyPage.jsx`

   Each page already defines its color palette; keep those values inline at the call site so each page remains self-documenting about its theme.

2. **Migrate ZerohackBackgroundPage narrative to content layer (S10).** Create `src/content/zerohack-background.js`:

   ```js
   const zerohackBackground = {
     title: "The Janky Demo That Won",
     subtitle: "...",
     body: [
       { type: 'p', text: "..." },
       { type: 'h3', text: "..." },
       { type: 'p', text: "...", emphasis: true },
       { type: 'rule' },
       // ... all paragraphs, headers, emphasis, rules from the current JSX
     ],
     cta: { label: "...", to: "..." },
   };

   export default zerohackBackground;
   ```

   Copy every paragraph from the current `ZerohackBackgroundPage.jsx` into the `body` array, preserving the HTML entity decoding (`&rdquo;` → `"`, `&mdash;` → `—`, `&rsquo;` → `'`, `&ldquo;` → `"`). Add to `src/content/en.js` as `zerohackBackground`.

   Then rewrite `src/pages/ZerohackBackgroundPage.jsx` to map over the body array:

   ```jsx
   {zerohackBackground.body.map((block, i) => {
     if (block.type === 'p') {
       return <p key={i} className={block.emphasis ? 'zh-bg-emphasis' : 'zh-bg-body'}>{block.text}</p>;
     }
     if (block.type === 'h3') {
       return <h3 key={i} className="zh-bg-h3">{block.text}</h3>;
     }
     if (block.type === 'rule') {
       return <hr key={i} className="zh-bg-rule" />;
     }
     return null;
   })}
   ```

   Expected result: page drops from 300 lines to ~80. Visual output identical.

3. **Migrate ZerohackApplyPage form schema to content layer (S11).** Extend `src/content/zerohack.js` to add an `applyForm` section describing the form:

   ```js
   applyForm: {
     title: "Apply to Zero Hack",
     subtitle: "...",
     authPrompt: { headline: "...", body: "...", button: "..." },
     sections: [
       {
         name: "Who You Are",
         fields: [
           { id: "person", type: "textarea", label: "...", placeholder: "...", hint: "..." },
           // ...
         ],
       },
       // ... all sections from the current hardcoded JSX
     ],
     commitment: {
       label: "...",
       text: "...", // the pre-work commitment paragraph
     },
     submit: { idle: "Submit application", submitting: "Submitting...", success: "..." },
     error: { network: "...", validation: "..." },
   }
   ```

   Adapt or reuse the `JoinField` and `FormSection` pattern from `JoinPage.jsx` — either import them directly (preferred) or duplicate the minimal field component locally for the Zerohack palette.

   Rewrite `src/pages/ZerohackApplyPage.jsx` to read from `zerohack.applyForm` and render generically. Target: page drops from 328 lines to ~120.

4. **Resolve Seven Principles drift (S13).** Canonical source is `src/content/philosophy.js`, which already has the full version with `why`, `detail.text`, and `detail.links`. Required changes:
   - In `src/content/home.js`, change the `principles` section to import from philosophy.js and derive the short form:
     ```js
     import philosophy from './philosophy';
     // ...
     const home = {
       // ...
       principles: {
         number: '004',
         title: 'The Seven Principles',
         principle_zero: philosophy.principle_zero,
         intro: "...",
         items: philosophy.principles.map((p) => ({
           numeral: p.numeral,
           title: p.title,
           body: p.body, // the short form
         })),
       },
       // ...
     };
     ```
   - If `netlify/functions/chat.js` still exists (not deleted in Phase 1), move its `SYSTEM_PROMPT` to `src/content/prompts/chat-system.js` (new file) and import it. Then derive the principles block of the prompt from `philosophy.principles` rather than hardcoding. This may require adapting the prompt template — preserve the voice rules and boundaries exactly.

5. **Extract ChevronIcon from ManifestoPage to icons.jsx (M10).** Locate the inline `ChevronIcon` component definition inside `src/pages/ManifestoPage.jsx`. Move it to `src/components/icons.jsx` as a named export (same style as the other icons). Update the import in ManifestoPage.

6. **Source the Arroyo Labs card copy from content (M11).** Locate the hardcoded Arroyo Labs card JSX in `src/pages/ManifestoPage.jsx` (part of the closing section). Move the copy into `src/content/home.js` under `closing.arroyo` with a shape like `{ label, title, body, cta: {label, href} }`. Update ManifestoPage to read from there.

### Scope boundaries (DO NOT do in this phase)

- Do NOT rewrite JoinPage — it's the model, keep it as-is.
- Do NOT change the visual output of any page. Every extraction should render identically.
- Do NOT touch CSS. Classes used by the migrated content stay the same.
- Do NOT fold `ZerohackBackgroundPage.jsx` or `ZerohackApplyPage.jsx` into other files. They remain as pages; only their content/schema moves.
- Do NOT collapse `InvestitureChangelogPage.jsx` or `InvestitureSkillsPage.jsx` into InvestiturePage — they're legitimately separate routes.

### Verification

- [ ] `npm run build` passes
- [ ] `/zerohack/background` renders with identical prose, headers, emphasis, and rules as before (spot-check 5 paragraphs against the previous version)
- [ ] `/zerohack/apply` renders identical form fields and labels, validation still works, auth gate still fires, submission still inserts into `zerohack_applications`
- [ ] `/investiture`, `/investiture/skills`, `/investiture/changelog`, `/zerohack`, `/zerohack/background`, `/zerohack/apply` all have correct body background after navigating to them and after navigating away
- [ ] Rapid navigation between Investiture and Zerohack pages: body theme transitions cleanly with no flash of wrong color (the useBodyTheme cleanup should handle this)
- [ ] Homepage manifesto: Arroyo Labs card renders with same copy
- [ ] Homepage manifesto: principles section renders with same numerals, titles, and short-form body text
- [ ] Line counts: ZerohackBackgroundPage.jsx ~80, ZerohackApplyPage.jsx ~120

### Rollback

Higher-risk phase because it's structural. Each task is independent — if one breaks, revert just that task's files:

- **useBodyTheme extraction:** If body theme doesn't apply correctly, check that each consumer is passing the right `background` / `color` values and that the hook's cleanup runs in the right order. Revert: `git checkout HEAD~1 -- src/hooks/useBodyTheme.js <consumer files>`.
- **ZerohackBackgroundPage content migration:** If a paragraph is garbled, the most likely issue is HTML entity decoding. Compare the new array to the old JSX line-by-line. Revert just this task: `git checkout HEAD~1 -- src/content/zerohack-background.js src/pages/ZerohackBackgroundPage.jsx src/content/en.js`.
- **ZerohackApplyPage form schema migration:** If submission breaks, the issue is likely that a field `id` or `required` flag was missed in the schema transcription. Revert if needed; re-verify field-by-field.
- **Principles derivation:** If the homepage principles render differently, check that the derivation preserves the short-form `body` rather than the long-form `why`/`detail`.

This is the phase most likely to introduce visual regressions. Test thoroughly before committing. Consider committing per-task rather than all-at-once so rollback is surgical.

---

## Phase 5: Performance and Accessibility Polish
**Risk:** Low-medium
**Estimated scope:** 3 files modified, 1 file modified (index.html), additive changes
**Prerequisite:** Phases 1-3 complete

### Context

The audit identified one significant first-paint cost (six font families loaded globally when three of them are only used by Investiture/Zerohack) and several missing `prefers-reduced-motion` gates on signature animations (VectorField, DecryptText). These are targeted, additive changes with clear verification.

### Tasks

1. **Page-scope fonts out of `index.html` (S12).** Currently `index.html:32-33` loads all six font families globally. Fraunces and Source Serif 4 are used only in Investiture/Zerohack CSS. Outfit is used only in Zerohack. Move these three to page-scoped loading:
   - Remove Fraunces, Source Serif 4, and Outfit from the `<link href="https://fonts.googleapis.com/...">` tags in `index.html`.
   - Keep Space Grotesk, Inter, JetBrains Mono globally — they're the core design system fonts.
   - In `src/pages/InvestiturePage.jsx`, `src/pages/InvestitureSkillsPage.jsx`, `src/pages/InvestitureChangelogPage.jsx`, add a `useEffect` that injects a `<link>` for Source Serif 4 (and Fraunces if Investiture uses it — verify in CSS). Remove the link on unmount.
   - In `src/pages/ZerohackPage.jsx`, `src/pages/ZerohackBackgroundPage.jsx`, `src/pages/ZerohackApplyPage.jsx`, do the same for Outfit + Fraunces.

   A clean pattern:

   ```js
   useEffect(() => {
     const link = document.createElement('link');
     link.rel = 'stylesheet';
     link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap';
     document.head.appendChild(link);
     return () => document.head.removeChild(link);
   }, []);
   ```

   Verify which pages actually use which font families against `site.css` before committing — the current `font-family` declarations in the CSS are the source of truth.

   Expected savings: ~200-300 KB on first paint for manifesto routes. On Investiture/Zerohack routes, fonts load on page mount (brief FOUT acceptable given `display=swap`).

2. **Add `prefers-reduced-motion` gate to VectorField (M4).** In `src/components/VectorField.jsx`, before starting the `requestAnimationFrame` loop, check:

   ```js
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   if (prefersReducedMotion) {
     // Render a single static frame and exit
     render();
     return;
   }
   // Otherwise start the animation loop
   ```

   Place this check inside the existing `useEffect`, after the canvas setup but before `requestAnimationFrame` is first called. The canvas should still render its grid once for motion-sensitive users — just not animate.

3. **Add `prefers-reduced-motion` gate to DecryptText (M4).** In `src/components/DecryptText.jsx`, before starting the decrypt animation, check reduced motion. If true, skip directly to the final phase (display the complete text immediately, fire `onComplete`). The PageHero title should still render — just without the scramble effect.

   ```js
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   if (prefersReducedMotion) {
     setDisplay(text);
     setPhase('done');
     if (onCompleteRef.current) onCompleteRef.current();
     return;
   }
   ```

### Scope boundaries (DO NOT do in this phase)

- Do NOT do a speculative `useMemo` pass. The audit flagged this as MINOR and noted it was speculative. Skip.
- Do NOT refactor VectorField's canvas code — it's exemplary. Only add the reduced-motion gate.
- Do NOT change any visual output outside of what reduced-motion users see.
- Do NOT add SRI hashes to third-party scripts. The audit flagged this as MINOR industry-standard practice, not a unique Zero Vector risk. Skip unless Samantha specifically requests it.

### Verification

- [ ] `npm run build` passes
- [ ] Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce" → homepage and PageHero titles render without scramble animation and VectorField renders as a static grid
- [ ] Investiture and Zerohack pages render with their correct fonts (Source Serif 4, Fraunces, Outfit) after page mount
- [ ] Manifesto routes: Network tab shows only the three core font requests (Space Grotesk, Inter, JetBrains Mono) on first paint
- [ ] Investiture/Zerohack routes: Network tab shows additional font requests AFTER the page mounts (not blocking first paint)

### Rollback

- Font scoping: if a font fails to load on Investiture/Zerohack and the pages look wrong, re-add the font to `index.html` temporarily while you debug the dynamic `<link>` injection.
- Reduced-motion gates: these are additive guards. If something breaks, remove the gate. No risk of permanent regression.

---

## Phase 6: Documentation Rewrite
**Risk:** Low
**Estimated scope:** 3 files rewritten, 1 file created
**Prerequisite:** Phases 1-5 complete (so the docs describe the remediated state, not the pre-remediation state)

### Context

The audit identified that both `ARCHITECTURE.md` (375 lines) and `README.md` (149 lines) are substantially stale. ARCHITECTURE.md describes phantom Open Vector Learn / Arroyo / learn curriculum sections that no longer exist in this repo, lists routes (`/ask`, `/quiz`) that are now redirects, and gives a wrong CSS line count. README.md promotes retired Ask/Quiz features and the moved-out Open Vector curriculum, and omits current primary features (Investiture, Zero Hack, Join, Enterprise). Both docs are load-bearing for contributor onboarding (human and AI) and currently mislead on first contact. This phase is documentation-only and ships independently of any code change.

### Tasks

1. **Rewrite `ARCHITECTURE.md`.** Use the current `MANIFEST.md` at the repo root as the source of truth. Required sections (adapt from the current structure but cut everything that isn't real):

   - **Stack Summary** — React 19 + Vite 7 SPA, react-router 7, Supabase, Anthropic SDK, Netlify Functions, Kestris proxy, Buttondown. Three core font families (Space Grotesk, Inter, JetBrains Mono). Page-scoped fonts (Fraunces, Source Serif 4, Outfit) loaded on Investiture/Zerohack mount.
   - **Routing architecture** — one layout (SiteLayout) for the manifesto routes, two standalone property clusters (Investiture, Zero Hack) that bypass SiteLayout and render their own chrome. Full route table matching `src/App.jsx`. CDN-level redirects for `/open/*` and `/arroyo`.
   - **Content-as-data pattern** — every page imports its copy from `src/content/*.js`, unified through `en.js` barrel. No logic in content modules. JoinPage is the canonical model for content-driven forms.
   - **Project structure** — actual directory tree matching the current state. Remove all references to `learn/`, `arroyo/`, `AnonWelcomeModal`, `WelcomeModal`, `DecryptTuner`, `ProgressContext`, `ThemeContext`, `LearnLayout`, `OpenVectorPage`, `ArroyoPage`.
   - **CSS domain prefixes** — `zv-` (global / manifesto), `inv-` (Investiture), `zh-` (Zero Hack). Remove `ovl-` and `arr-` references. Note that the three systems coexist in one `site.css` file (10,262 lines pre-remediation, ~9,400 post-Phase-3).
   - **Environment variables** — full list matching the Phase 2 `.env.example`: `ANTHROPIC_API_KEY` (if chat/quiz survived Phase 1), `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `KESTRIS_API_URL`, `KESTRIS_API_KEY`.
   - **External services** — Supabase (auth, zerohack_applications table, rate-limit RPC if kept), Anthropic (chat/quiz if kept), Kestris (join proxy + newsletter subscribe), Buttondown, GA, Plausible, Ko-fi.
   - **Conventions** — file naming, CSS prefix discipline, component pattern (presentational + small state), hooks in `src/hooks/`, single UserContext for cross-cutting auth state.
   - **Decisions** — preserve any ADRs that are still accurate. Drop any that referenced removed features.

   Keep the doc under ~250 lines. MANIFEST.md is the exhaustive inventory; ARCHITECTURE.md should describe the philosophy and patterns, not enumerate every file.

2. **Rewrite `README.md`.** Target audience is public GitHub visitors. Required sections:

   - **What is Zero Vector Design?** — one-paragraph pitch matching the current home.js manifesto.
   - **The Seven Principles** — names only, link to `/philosophy` for the full treatment.
   - **Current features** — Manifesto / Philosophy / Approach / For Builders / For Leaders / For Enterprise / Media / Origin / Start / Name / Join / Investiture (premium deep dive) / Zero Hack (hackathon event pages).
   - **What's NOT in this repo anymore** — Open Vector learning platform is now at `open.zerovector.design` (separate repo). Arroyo Labs is at `arroyo.zerovector.design`. Labrador is at `herelabrador.ai`. Terminus is at `terminus.zerovector.design`.
   - **Tech stack** — one-line summary matching package.json.
   - **Local dev** — `git clone`, `npm install`, `netlify dev` (port 3006, NOT `npm run dev` at 5174 because the functions won't work without the Netlify proxy). Reference `.env.example` for required env vars.
   - **Contributing** — how to file issues, content contributions, code contributions.
   - **Related projects** — Open Vector, Arroyo, Labrador, Terminus with their subdomains.
   - **License.**

   Remove every reference to Ask, Quiz, Learn Chat, Open Vector curriculum as in-repo, Arroyo as in-repo, `src/content/learn/` project structure.

3. **Create `docs/API.md`** (new file) — single source of truth for the Netlify function contracts that survive Phase 1. For each function, document: path, method, auth, rate limit, request shape (with example JSON), response shape (with example JSON), error responses, CORS policy. At minimum `/api/join` will exist; possibly also `/api/chat` and `/api/quiz`. This replaces the current pattern of each function embedding its own contract.

4. **Update `CLAUDE.md` if needed.** The current CLAUDE.md points contributors to read ARCHITECTURE.md and VECTOR.md. If those references are still accurate after the rewrite, no changes needed. Verify the reading order, stack summary, and "What Not to Do" sections are still accurate.

### Scope boundaries (DO NOT do in this phase)

- Do NOT touch `VECTOR.md` — it describes the movement and doctrine, which is timeless. The audit classified it as MINOR drift (one stale "Learn Chat" mention at line 166) — that single line can be updated but don't rewrite the file.
- Do NOT touch `CONTENT-TASKS.md` — it's an Open Vector backlog and may be archived or moved, but that's a separate decision from this documentation rewrite.
- Do NOT touch `.claude/skills/*.md` — those are Investiture skill definitions unrelated to repo docs.
- Do NOT add marketing copy that isn't already in the content layer.

### Verification

- [ ] A new contributor (or agent) reading `README.md` can identify every current feature and no retired features
- [ ] Reading `ARCHITECTURE.md`, every file path mentioned actually exists in the repo
- [ ] Every env var mentioned in `ARCHITECTURE.md` appears in `.env.example`
- [ ] Every route in the `ARCHITECTURE.md` table matches `src/App.jsx`
- [ ] Every CSS prefix mentioned in `ARCHITECTURE.md` appears in `site.css`
- [ ] `docs/API.md` matches the actual handler code in the surviving Netlify functions

### Rollback

Documentation-only phase, zero runtime risk. If something is factually wrong, fix it forward — no reason to revert.

---

## Cross-Phase Notes

### Execution Order

**Strictly sequential:**
- Phase 1 (Dead Code) → Phase 2 (Bugs/Security): Phase 2's scope depends on which files Phase 1 deleted (chat.js/quiz.js affect whether S2 applies).
- Phase 1 → Phase 3 (CSS): CSS cleanup touches some classes that become trivially dead after Phase 1 deletes their JSX consumers (e.g. ZeroVectorAnimation CSS block).
- Phase 3 → Phase 4 (Content Layer Repair): lower file noise and no selector drift.
- Phase 4 → Phase 6 (Docs): docs should describe the remediated state.

**Can run in parallel:**
- Phase 5 (Performance) can run in parallel with Phase 4 (Content Layer) — they touch different files.
- Phase 2 (Bugs) can run in parallel with Phase 3 (CSS) after Phase 1 is complete — they touch different files.

### Risk Checkpoints

Pause and verify before continuing at these points:

- **After Phase 1**: run `npm run build` and walk through every route. If anything breaks, the deletion scope was wrong. Do not proceed to Phase 2 until the site boots cleanly.
- **After Phase 2, task 4 (rate-limit fail-closed)**: if chat.js/quiz.js were preserved in Phase 1, confirm with Samantha that the fail-closed policy is acceptable before deploying to production. The policy change means a Supabase outage takes down Ask/Quiz — which is the correct safer default but is a user-facing behavior change.
- **Before Phase 3**: confirm the C1 Supabase RLS verification was completed in Phase 2's prerequisite. If it was skipped, the CSS teardown is fine to proceed but ZerohackApplyPage may need a Netlify-function rewrite that belongs before Phase 4's form schema extraction.
- **After Phase 3**: visual smoke test on every route. CSS deletions are the phase most likely to introduce subtle regressions via compound selectors.
- **After Phase 4**: visual smoke test Investiture + Zerohack routes specifically. The form schema migration and body-theme hook are the structural changes most likely to introduce behavioral regressions.

### Bail Points

It is safe to stop and ship what's done at any of these points:

- **After Phase 1** — You've cleared ~985 lines of dead code. The codebase is cleaner and easier to work with. Bail point acceptable.
- **After Phase 2** — You've fixed the confirmed mobile bug, closed the cost-exposure security gap, and added error handling. The repo is more robust than it was. Bail point strongly acceptable.
- **After Phase 3** — The CSS is ~831 lines lighter. Any future refresh starts from a cleaner base. Bail point acceptable.
- **After Phase 4** — The content layer is repaired. Editorial changes no longer require touching code. Bail point strongly acceptable.
- **After Phase 5** — Performance is tuned. First paint is faster on manifesto routes. Bail point acceptable.
- **After Phase 6** — Everything is done. Docs match reality. Future contributors land in a coherent repo.

The highest-value bail point is **after Phase 2** if you're under time pressure — Phases 1+2 together kill the dead code and close the production bugs. Everything after that is improvement, not debt reduction.

### What This Plan Does NOT Cover

Items from the audit that are intentionally excluded:

- **The visual refresh itself.** This plan clears the base. The new design direction, token pass, component restructuring, and CSS rewrite are a separate effort that should start from the post-Phase-3 state.
- **Tokenization of the CSS** (S9 elaboration). The audit noted the thin token system (42 vars, no radius/shadow/breakpoint/transition/z-index tokens). Establishing the full token set belongs to the refresh, not this remediation.
- **Consolidating the three design systems** into one. Currently `zv-`, `inv-`, `zh-` are three parallel systems. Unifying them is a refresh decision, not a debt-reduction task.
- **The 20 nav-specificity `!important` fights** at L2801-2828 and L5400-5411. These point to a structural nav cascade issue. Fix during the nav refresh, not now.
- **Speculative `useMemo`/`useCallback` optimization (M14)**. The audit flagged this as speculative and without measured impact. Skip unless a real perf regression appears.
- **SRI hashes on third-party scripts (M18)**. Industry-standard practice, not a unique Zero Vector risk. Skip unless Samantha specifically requests.
- **Renaming `icons.jsx` → `Icons.jsx` (M17)**. Minor convention nit requiring ~8 import path updates. Skip — the cost outweighs the benefit.
- **`vector/` research scaffold population.** The audit flagged the empty subdirs. Either fill them with real research or delete them (covered as a judgment call in Phase 1). This plan does not mandate either.
- **Feature restoration of Ask and Quiz.** If Samantha decides to keep these features, that's a future scope — not a debt remediation.
- **Changes to `VECTOR.md`** beyond the single stale "Learn Chat" mention at line 166. The doctrine content is timeless.
- **Migration to TypeScript**, adding tests, adding a linter, or setting up CI. These are architectural improvements outside the scope of audit-driven remediation.

### Recommended Execution Path

If you're running this plan as an agent over multiple sessions:

1. **Session 1** (Phases 1 + 2): Dead code cleanup and ship-blocker fixes. ~90-120 min. High value, low risk. Commit after each phase.
2. **Session 2** (Phase 3 + Phase 5): CSS dead code removal and performance polish. Can run in parallel with Phase 2 if you prefer. ~60-90 min.
3. **Session 3** (Phase 4): Content layer repair. This is the highest-risk phase. ~60-90 min. Commit per-task.
4. **Session 4** (Phase 6): Documentation rewrite. Can be handed to Adoni or done by Lee directly. ~90-120 min.

Total estimated agent work: 6-8 hours across 4 sessions. Every session is committable and reversible.

---

**Generated: 2026-04-10**
