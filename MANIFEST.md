# Zero Vector — Product Manifest

> Generated 2026-04-10. A complete inventory of what exists in this repo: files, routes, functions, components, content, configuration, and features. Documents existence, not quality. No recommendations.

---

## Section 1 — File Tree

### Root

```
.env                               — Local secrets (gitignored)
.env.example                       — Env var reference: ANTHROPIC_API_KEY, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
.gitignore                         — Standard: node_modules, dist, .env*, .DS_Store, .netlify, deno.lock, *.log
ARCHITECTURE.md                    — 375-line technical authority: six-layer model, stack, routing, conventions, ADRs
CLAUDE.md                          — 95-line contributor onboarding guide (reading order, stack, commit format, standup)
CONTENT-TASKS.md                   — 273-line Open Vector content backlog (6 task entries + resequencing)
README.md                          — 149-line public README: pitch, Seven Principles, contribution guide, local dev
VECTOR.md                          — 199-line project doctrine: problem statement, audience, Seven Principles, quality gates
deno.lock                          — Deno lockfile (unused by Vite build; legacy artifact)
index.html                         — HTML entry: SEO meta, 6 Google Font families preloaded, GA + Plausible analytics, JSON-LD schema, Ko-fi overlay widget
netlify.toml                       — Netlify config: build command, dev port 3006, functions dir, 301 redirects (/open/* → open.zerovector.design, /arroyo → arroyo.zerovector.design), SPA fallback
package.json                       — React 19.2 + Vite 7.3 + react-router 7.12 + Supabase + Anthropic SDK + fuse.js + sharp (devDep)
package-lock.json                  — npm lockfile
vite.config.js                     — Vite config: @/src alias, dev port 5174, dist output
tmux-client-6629.log               — Stray tmux log (likely should be gitignored)
tmux-client-6647.log               — Stray tmux log (likely should be gitignored)
```

### .claude/skills/

```
invest-architecture/SKILL.md       — Investiture architecture audit skill definition
invest-backfill/SKILL.md           — Investiture backfill skill definition
invest-doctrine/SKILL.md           — Investiture doctrine audit skill definition
```

### netlify/functions/

```
chat.js                            — 127 lines. POST /api/chat. Anthropic-powered "Ask" endpoint with Seven Principles voice persona, rate-limited 20/10min
join.js                            — 77 lines. POST /api/join. Auth-verified proxy that forwards applications to Kestris with injected identity
quiz.js                            — 139 lines. POST /api/quiz. Anthropic-powered "Am I Vibe Coding?" scorer, rate-limited 10/10min
lib/rate-limit.js                  — 46 lines. Shared rate-limit helper calling Supabase RPC check_rate_limit (fails open)
```

### public/

```
apple-touch-icon.png               — iOS home-screen icon
favicon.svg                        — SVG favicon
llms.txt                           — LLM crawl policy
og-card.png                        — Default Open Graph card (1200×630)
robots.txt                         — Crawler policy
site.webmanifest                   — PWA manifest
sitemap.xml                        — XML sitemap
images/beach-scene.gif             — Zero Hack ambient background GIF
images/city-scene.gif              — Zero Hack ambient background GIF
images/street-scene.gif            — Zero Hack ambient background GIF
images/origin-building.png         — Origin page photo
images/origin-headshot.png         — Origin page photo
images/origin-speaking.png         — Origin page photo
og/approach.png                    — Page-specific OG card
og/builders.png                    — Page-specific OG card
og/enterprise.png                  — Page-specific OG card
og/investiture.png                 — Page-specific OG card (Kholin gold theme)
og/leaders.png                     — Page-specific OG card
og/learn.png                       — Page-specific OG card (Open Vector, white)
og/manifesto.png                   — Page-specific OG card
og/media.png                       — Page-specific OG card
og/name.png                        — Page-specific OG card
og/open-vector.png                 — Page-specific OG card
og/origin.png                      — Page-specific OG card
og/philosophy.png                  — Page-specific OG card
og/quiz.png                        — Page-specific OG card
og/start.png                       — Page-specific OG card
```

### scripts/

```
generate-og.js                     — 99-line manual one-shot that renders 13 SVG → PNG OG cards via sharp. NOT wired into npm run build
```

### src/

```
App.jsx                            — 62-line router: defines 19 routes + 6 redirects; SiteLayout wraps most pages; Investiture and Zerohack pages bypass SiteLayout
main.jsx                           — 16-line entry: ReactDOM + BrowserRouter + UserProvider + StrictMode
```

### src/components/ (13 files)

```
Animate.jsx                        — 13 lines. Viewport-reveal wrapper around useInView hook
BootSequence.jsx                   — 65 lines. One-shot terminal boot animation (8 lines, sessionStorage-gated)
DecryptText.jsx                    — 122 lines. Text decrypt effect: blink → scramble → resolve char-by-char
ErrorBoundary.jsx                  — 52 lines. Class error boundary with styled fallback and recovery buttons
Footer.jsx                         — 26 lines. Site-wide footer with mixed internal/external links
Nav.jsx                            — 281 lines. Top nav with 3 dropdown groups, Supabase auth avatar, mobile hamburger drawer
NotifyForm.jsx                     — 85 lines. Email signup POSTing to Kestris proxy with Buttondown tag
PageClosing.jsx                    — 80 lines. Shared orange CTA band: headline, body, 2 CTAs, optional newsletter, site nav
PageHero.jsx                       — 29 lines. Page header: numbered eyebrow + DecryptText title + fade subtitle
SectionHeader.jsx                  — 11 lines. Minimal numbered section header
VectorField.jsx                    — 157 lines. Full-viewport fixed canvas: animated vector grid attracted to mouse, scanline sweep
ZeroVectorAnimation.jsx            — 190 lines. Scroll-triggered SVG: 5-stage explainer of "zero vector" disciplines
icons.jsx                          — 31 lines. Named SVG icons: ArrowIcon, ExternalLinkIcon, SubstackIcon, LinkedInIcon
```

### src/content/ (16 files)

```
approach.js                        — 105 lines, ~800 words. 8-phase pipeline, each with agnostic vs ZV voice
builders.js                        — 109 lines, ~950 words. For Builders: intro, getting_started, reading_list, coaching, resources, community
en.js                              — 48 lines. Barrel/aggregator re-exporting all 15 content modules as unified `en` object
enterprise.js                      — 134 lines, ~1200 words. Enterprise pitch, CZVO role, 3 engagement models
home.js                            — 189 lines, ~2000 words. Homepage: hero, declaration, 10-entry timeline, pipeline, principles, contrasts, closing
investiture.js                     — 375 lines, ~2150 words. Hero, whatItIs, 11 skills (twice — summary and reference), skills page, whatYouGet, connection, quickstart, roadmap, 5-version changelog, quote, CTA, ASCII file tree
join.js                            — 272 lines, ~2900 words. 6 open roles, endurance test, role-specific questions, full form schema
leaders.js                         — 113 lines, ~1300 words. For Leaders: whatChanges, czvo definition, forYou, 3 engagement models, practitioner bio
media.js                           — 63 lines, ~500 words. Featured, articles, books, talks, 5 voices to follow
name.js                            — 43 lines, ~250 words. 5 disciplinary stages of "zero vector" + conclusion + teaser
origin.js                          — 68 lines, ~800 words. Personal origin, 3 photos, 11 crew members
philosophy.js                      — 153 lines, ~1900 words. 7 principles with why/detail/links, what it is / is not, arc
quiz.js                            — 60 lines, ~500 words. 5 quiz questions + 5 score-banded archetypes with colors
recommended-reading.js             — 42 lines, ~180 words. 5 Substack articles (shared across homepage + Learn Hub)
start.js                           — 57 lines, ~260 words. Start page: announcement, connect, Investiture + Open Vector actions
zerohack.js                        — 169 lines, ~750 words. Zero Hack event: hero, structure, judging, hosts, prizes, registration
```

### src/contexts/

```
UserContext.jsx                    — 81 lines. Supabase Google OAuth context: {user, isLoggedIn, loading, signIn, signOut}. Embedded-browser detection (FB/IG/LinkedIn/Slack/Twitter/WeChat/Line) falls back to window.prompt with URL copy
```

### src/hooks/

```
useInView.js                       — 26 lines. IntersectionObserver [ref, isVisible], one-shot (unobserves after first intersection)
useMousePosition.js                — 40 lines. Mouse/touch position via useRef (not state) so canvas loops read without re-renders
useSEO.js                          — 79 lines. Per-page document.title, meta description, OG, Twitter Card, canonical. Reverts to site defaults on unmount
```

### src/layouts/

```
SiteLayout.jsx                     — 48 lines. Top layout: ErrorBoundary + Outlet, scroll-to-top on route change, page-transition class swap, GA page_view events, hardcoded body bg #181818
```

### src/lib/

```
supabase.js                        — 9 lines. Supabase client singleton via createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) or null if env missing
```

### src/pages/ (22 files)

```
AskPage.jsx                        — 207 lines. Terminal chat interface (POST /api/chat). NOTE: route redirects to /start in App.jsx — page exists but unreachable
BuildersPage.jsx                   — 162 lines. Guide for individual practitioners
EnterprisePage.jsx                 — 128 lines. Organizational pitch, CZVO, engagement models
InvestitureChangelogPage.jsx       — 77 lines. Version history for Investiture scaffold. Body-style mutation for dark blue theme
InvestiturePage.jsx                — 378 lines. Stormlight-themed Investiture landing: hero with interactive input, file tree, quickstart, roadmap, click-to-copy commands. Console easter egg. 24 spren particles
InvestitureSkillsPage.jsx          — 127 lines. 11-skill reference grouped by category
JoinPage.jsx                       — 505 lines. Application form with 6 role cards, conditional questions, Supabase-auth gate, POST /api/join
LeadersPage.jsx                    — 147 lines. Executive pitch: before/after, forYou, engagement models
ManifestoPage.jsx                  — 344 lines. Homepage: boot sequence → hero → pipeline → 7 principles → contrasts → name teaser → closing with NotifyForm
NamePage.jsx                       — 136 lines. 5-stage origin of the name. Inline ZeroVectorDiagram SVG component
NotFoundPage.jsx                   — 40 lines. 404 styled as "signal lost" terminal
OriginPage.jsx                     — 128 lines. Personal story, 3 photos, crew grid
PhilosophyPage.jsx                 — 148 lines. Canonical 7 principles with why/detail/links, arc, lineage
PipelinePage.jsx                   — 85 lines. "Approach" page: 8 phases, agnostic vs ZV columns. (Filename legacy; route is /approach)
PrivacyPage.jsx                    — 120 lines. Privacy policy, ~100 lines of hardcoded legal copy
QuizPage.jsx                       — 280 lines. "Am I Vibe Coding?" quiz (POST /api/quiz). NOTE: route redirects to /start — page exists but unreachable. Share-card + URL-param result display
ReadingPage.jsx                    — 142 lines. Media page: featured, articles, books, talks, voices. (Filename legacy; route is /media)
StartPage.jsx                      — 90 lines. Landing with Investiture + Open Vector CTAs + announcement
TermsPage.jsx                      — 112 lines. Terms of service, ~90 lines of hardcoded legal copy
ZerohackApplyPage.jsx              — 328 lines. Hackathon application, Supabase-auth gate, direct insert to zerohack_applications table. Dark red theme via body-style mutation
ZerohackBackgroundPage.jsx         — 300 lines. "The Janky Demo That Won" — full narrative article hardcoded inline
ZerohackPage.jsx                   — 368 lines. Hackathon landing: hero, schedule, rubric, hosts, prizes, registration. Parallax scroll, 18 ember particles, CountUp animations, dark red theme
```

### src/styles/

```
site.css                           — 10,262 lines. THE ONLY stylesheet. Three coexisting design systems (global zv-, inv-, zh-), 42 :root tokens, 43 @keyframes, 37 max-width media queries, 35 !important occurrences, self-admitted dead-code markers
```

### vector/

```
README.md                          — 23 lines. Directory guide for research/schemas/decisions/audits subfolders
audits/invest-architecture.md      — ~73 lines. Architecture audit 2026-03-11: 17 high / 2 med / 2 low / 22 info violations
audits/invest-doctrine.md          — ~33 lines. Doctrine audit 2026-03-11: 0 high, 3 low gaps, 6 operator placeholders
decisions/.gitkeep                 — Empty ADR directory
research/assumptions/.gitkeep      — Empty
research/competitive/.gitkeep      — Empty
research/interviews/.gitkeep       — Empty
research/jtbd/.gitkeep             — Empty
research/personas/.gitkeep         — Empty
schemas/.gitkeep                   — Empty
```

---

## Section 2 — Architecture Overview

**Zero Vector** is a single-page React marketing + manifesto site at `zerovector.design`. It is the public front door for Erika Flowers' design philosophy "Zero Vector Design" and a recruitment/community hub for the Zero Vector Crew. It hosts three distinct sub-properties on one React bundle: the main manifesto site (21 routes), the Stormlight-themed **Investiture** premium deep dive (3 routes, `/investiture/*`), and the **Zero Hack** hackathon landing + application (3 routes, `/zerohack/*`). A fourth property (Open Vector at `/open/*`) is 301-redirected to a separate subdomain at the CDN layer.

**Stack:** React 19 + Vite 7 SPA, react-router 7 client-side routing, plain CSS (one 10k-line file), Supabase (Google OAuth + `zerohack_applications` direct insert + rate-limit RPC), Anthropic SDK (Claude Sonnet 4.5 for Ask chat and Quiz scoring), Netlify hosting + Netlify Functions for serverless endpoints, Kestris proxy for join applications and newsletter subscribe, Buttondown for email list, Google Analytics + Plausible dual-tracking, Ko-fi widget for donations.

**Architectural patterns:** Content-as-data layer (`src/content/*.js`) with a barrel export (`en.js`) — most pages import their copy from this layer, though several hardcode significant content inline (legal pages, `ZerohackBackgroundPage`, portions of `ManifestoPage`). Components are presentational with minimal local state. Cross-cutting state is limited to a single `UserContext` for auth. CSS follows a prefix convention for domain isolation (`zv-` global, `inv-` Investiture, `zh-` Zero Hack). No test infrastructure, no linter, no TypeScript, no state management library.

**Entry points:** `index.html` loads `/src/main.jsx` → React root renders `<StrictMode><BrowserRouter><UserProvider><App/></UserProvider></BrowserRouter></StrictMode>`. `App.jsx` declares routes; `SiteLayout` wraps the manifesto routes and handles global chrome; Investiture and Zerohack routes bypass `SiteLayout` and render standalone with their own inline navs.

---

## Section 3 — Pages & Routes

| Path | Component | Purpose | Auth | Layout |
|------|-----------|---------|------|--------|
| `/` | ManifestoPage | Homepage / manifesto | Public | SiteLayout |
| `/philosophy` | PhilosophyPage | Canonical 7 principles, arc, lineage | Public | SiteLayout |
| `/approach` | PipelinePage | 8-phase pipeline (agnostic vs ZV) | Public | SiteLayout |
| `/for-builders` | BuildersPage | Practitioner onboarding | Public | SiteLayout |
| `/for-leaders` | LeadersPage | Executive pitch, CZVO, engagement models | Public | SiteLayout |
| `/for-enterprise` | EnterprisePage | Organizational pitch | Public | SiteLayout |
| `/media` | ReadingPage | Featured articles, books, talks, voices | Public | SiteLayout |
| `/origin` | OriginPage | Personal story, crew | Public | SiteLayout |
| `/start` | StartPage | Landing with Investiture + Open Vector CTAs | Public | SiteLayout |
| `/name` | NamePage | 5-stage origin of the name | Public | SiteLayout |
| `/join` | JoinPage | Crew application form | Supabase auth-gated | SiteLayout |
| `/privacy` | PrivacyPage | Privacy policy | Public | SiteLayout |
| `/terms` | TermsPage | Terms of service | Public | SiteLayout |
| `*` | NotFoundPage | 404 | Public | SiteLayout |
| `/investiture` | InvestiturePage | Stormlight-themed scaffold landing | Public | Standalone |
| `/investiture/skills` | InvestitureSkillsPage | 11-skill reference | Public | Standalone |
| `/investiture/changelog` | InvestitureChangelogPage | Version history | Public | Standalone |
| `/zerohack` | ZerohackPage | Hackathon landing page | Public | Standalone |
| `/zerohack/background` | ZerohackBackgroundPage | "The Janky Demo That Won" narrative | Public | Standalone |
| `/zerohack/apply` | ZerohackApplyPage | Hackathon application form | Supabase auth-gated | Standalone |

**Redirects (client-side via react-router):**

| From | To |
|------|-----|
| `/ask` | `/start` |
| `/quiz` | `/start` |
| `/about` | `/philosophy` |
| `/pipeline` | `/approach` |
| `/reading` | `/media` |
| `/resources` | `/media` |

**Redirects (Netlify, CDN-level, 301):**

| From | To |
|------|-----|
| `/open/learn/*` | `https://open.zerovector.design/learn/:splat` |
| `/open` | `https://open.zerovector.design/` |
| `/arroyo` | `https://arroyo.zerovector.design/` |

**Orphaned page files** (exist in `src/pages/` but no route points to them):
- `AskPage.jsx` — route `/ask` now redirects to `/start`, component no longer mounted
- `QuizPage.jsx` — route `/quiz` now redirects to `/start`, component no longer mounted

---

## Section 4 — API Endpoints

All endpoints are Netlify Functions hosted at `/.netlify/functions/<name>`.

| Method | Path | Purpose | Auth | Rate Limit | Request Shape | Response Shape |
|--------|------|---------|------|------------|---------------|----------------|
| POST | `/.netlify/functions/chat` | Answer in the voice of the Zero-Vector manifesto (Seven Principles persona) | None | 20 / 10 min per IP (Supabase RPC) | `{messages: [{role, content}]}` — max 50KB body, 4000 chars/msg, last 10 kept | `{reply: string}` or `{error: string}` |
| POST | `/.netlify/functions/quiz` | Score "Am I Vibe Coding?" quiz on 0–100 spectrum | None | 10 / 10 min per IP | `{answers: {q1..q5: string}}` — max 50KB body, 4000 chars/answer | `{score, title, summary, strengths[], friction[], nextStep}` extracted via regex of first `{...}` block |
| POST | `/.netlify/functions/join` | Auth-verified proxy forwarding crew applications to Kestris with injected identity | Bearer token (Supabase `supabase.auth.getUser`) | None | Arbitrary JSON body; server overwrites `name`, `email`, `user_id` from verified session before forwarding | Passthrough of Kestris JSON + status |

**Rate-limit helper (`lib/rate-limit.js`):**
- Calls Supabase RPC `check_rate_limit(p_ip, p_endpoint, p_limit, p_window_ms)` for atomic check-and-increment
- Fails open if SUPABASE_URL/KEY missing, RPC non-200, or exception
- Known endpoint keys: `chat`, `quiz`, `learn-chat`

**External API consumers:**
- `chat.js` → Anthropic SDK (`claude-sonnet-4-5-20250929`, max_tokens 512)
- `quiz.js` → Anthropic SDK (same model, 512 tokens)
- `join.js` → Supabase auth + Kestris `POST ${KESTRIS_API_URL}/api/applications` (default `https://kestris.netlify.app`) with `x-api-key` header
- `rate-limit.js` → Supabase REST `/rest/v1/rpc/check_rate_limit`

**Frontend-direct external calls (not via Netlify functions):**
- `ZerohackApplyPage` → direct Supabase insert into `zerohack_applications` table
- `NotifyForm` → direct POST to `https://kestris.netlify.app/api/subscribe` with `{email, tag}`
- `UserContext` → Supabase Auth (`signInWithOAuth`, `getSession`, `onAuthStateChange`)

---

## Section 5 — Database Schema

Supabase (PostgreSQL). Schema is not defined in this repo — it lives in the Supabase dashboard. What this codebase **references**:

**Tables consumed:**
- `zerohack_applications` — written directly from `ZerohackApplyPage.jsx`. Fields inferred from the form: `user_id`, `email`, `name`, `role`, problem/vision text fields, background text fields, `prework_committed` (boolean), timestamps.

**RPC functions consumed:**
- `check_rate_limit(p_ip text, p_endpoint text, p_limit int, p_window_ms int) → boolean` — called by `netlify/functions/lib/rate-limit.js` for atomic rate limiting. Implementation is server-side in Supabase.

**Auth:**
- Supabase Auth with Google OAuth provider
- JWT verified server-side in `netlify/functions/join.js` via `supabase.auth.getUser(bearerToken)` using `SUPABASE_SERVICE_ROLE_KEY`
- Client reads session via `supabase.auth.getSession()` and subscribes via `onAuthStateChange`

No migration files, no schema SQL, no ORM models, no seed data present in the repo.

---

## Section 6 — Components

| Component | Lines | Purpose | Key Props | State |
|-----------|-------|---------|-----------|-------|
| Animate | 13 | Viewport-reveal fade wrapper | `children`, `className`, `delay` | Via `useInView` |
| BootSequence | 65 | One-shot terminal boot animation on first visit | `onComplete` | `lines[]`, `fading`, `done` (sessionStorage-gated) |
| DecryptText | 122 | Blink → scramble → resolve text animation | `text`, `delay`, `speed`, `blinks`, `blinkSpeed`, `ready`, `onComplete` | `phase`, `blinkOn`, `display`, `cursorIndex`, `fading` + refs |
| ErrorBoundary | 52 | Class-based error boundary with fallback | `children` | `hasError` |
| Footer | 26 | Site-wide footer | none | none |
| Nav | 281 | Top nav: 3 dropdown groups, auth avatar, mobile drawer | none (consumes UserContext) | `menuOpen`, `userDropdownOpen`, `mobileExpanded` |
| NotifyForm | 85 | Email signup → Kestris proxy → Buttondown | `variant` ('dark'/'light'/'orange'), `tag` | `email`, `status`, `errorMessage` |
| PageClosing | 80 | Orange CTA band with 2 CTAs and optional newsletter | `headline`, `body`, `primaryCta`, `secondaryCta`, `showNewsletter`, `newsletterTag` | none |
| PageHero | 29 | Numbered eyebrow + DecryptText title + fade subtitle | `eyebrow`, `title`, `subtitle` | `titleDone` |
| SectionHeader | 11 | Minimal numbered section header | `number`, `title`, `subtitle` | none |
| VectorField | 157 | Fixed-position canvas vector grid attracted to mouse | none | Refs: `canvasRef`, `anglesRef` (Float32Array), `driftRef` |
| ZeroVectorAnimation | 190 | 5-stage SVG scroll-triggered explainer | `compact`, `stages` | `activeStage`, `isVisible` |
| icons | 31 | SVG icon library | `size` per icon | none (exports ArrowIcon, ExternalLinkIcon, SubstackIcon, LinkedInIcon) |

**Inline components defined within pages (not in components/):**
- `JoinField`, `RoleCard`, `RoleDetail`, `FormSection` — inside `JoinPage.jsx`
- `ShareCard`, `SharedResult` — inside `QuizPage.jsx`
- `CountUp` — inside `ZerohackPage.jsx`
- `ZeroVectorDiagram` (SVG helper) — inside `NamePage.jsx`
- `ChevronIcon` — inside `ManifestoPage.jsx` (duplicates icon pattern from `icons.jsx`)
- `NavDropdown` — inside `Nav.jsx`

**Unused imports observed across pages:** `LeadersPage` (`ArrowIcon`, `Link`), `OriginPage` (`ExternalLinkIcon`, `ArrowIcon`, `Link`), `NamePage` (`ArrowIcon`, `Link`), `PhilosophyPage` (`Link`), `ReadingPage` (`Link`, `ArrowIcon`), `ManifestoPage` (`recommendedReading`).

---

## Section 7 — Hooks / Services / Utilities

### Hooks (`src/hooks/`)

| Hook | Lines | Returns | Purpose | Consumed By |
|------|-------|---------|---------|-------------|
| `useInView(options)` | 26 | `[ref, isVisible]` | One-shot IntersectionObserver (unobserves after first intersection). Default threshold 0.1, rootMargin `0px 0px -40px 0px` | `Animate.jsx`, `ZerohackPage.jsx` (via CountUp) |
| `useMousePosition()` | 40 | `ref.current: {x, y, hasMouseMoved}` | Mouse/touch position via useRef (not state) so render loops read without triggering re-renders | `VectorField.jsx` |
| `useSEO({title, description, path, ogImage})` | 79 | void | Sets document.title, meta description, OG, Twitter Card, canonical. Reverts on unmount. Homepage title is `Zero-Vector Design`; other pages append ` — Zero-Vector Design` | Per-page (not traced exhaustively) |

### Contexts (`src/contexts/`)

| Context | Lines | Exports | Purpose |
|---------|-------|---------|---------|
| `UserContext` | 81 | `UserProvider`, `useUser()` | Supabase Google OAuth wrapper. Exposes `{user, isLoggedIn, loading, signIn, signOut}`. `mapUser()` helper normalizes Supabase user → `{id, name, email, avatar}`. Embedded-browser detection (FBAN/FBAV/Instagram/LinkedInApp/Slack/Twitter/MicroMessenger/Line) falls back to `window.prompt` with URL copy because Google blocks OAuth in in-app browsers. Cleans orphaned `ovl-user` localStorage key from a prior mock stub. Null-safe if supabase client is null. |

### Libraries (`src/lib/`)

| File | Lines | Exports | Purpose |
|------|-------|---------|---------|
| `supabase.js` | 9 | `supabase` (client or null) | `createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)` singleton with graceful null fallback when env missing |

### Layouts (`src/layouts/`)

| File | Lines | Purpose |
|------|-------|---------|
| `SiteLayout.jsx` | 48 | Top layout wrapper: `<div class="zv-site"><ErrorBoundary><Outlet/></ErrorBoundary></div>`. Imports `site.css`. Scroll-to-top on route change. 20ms `zv-page-enter` → `zv-page-active` class swap for page transitions. Hardcodes `body.style.backgroundColor = '#181818'` and `color = '#ffffff'`. Fires `window.gtag('event', 'page_view', ...)` if gtag defined. |

---

## Section 8 — Configuration & Environment

### Environment Variables

Listed in `.env.example` (required for full functionality):

| Variable | Scope | Required | Purpose |
|----------|-------|----------|---------|
| `ANTHROPIC_API_KEY` | Server (Netlify Functions) | Yes (for chat/quiz) | Anthropic SDK API key |
| `VITE_SUPABASE_URL` | Client (exposed to browser) | Yes (for auth) | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Client (exposed) | Yes (for auth) | Supabase anon public key |

**NOT documented in `.env.example` but consumed by code** (live only in Netlify dashboard):

| Variable | Scope | Required | Purpose |
|----------|-------|----------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Yes (for join.js + rate-limit) | Server-side Supabase admin calls |
| `KESTRIS_API_URL` | Server | Optional (defaults to `https://kestris.netlify.app`) | Kestris base URL |
| `KESTRIS_API_KEY` | Server | Yes (for join.js) | Kestris `x-api-key` header |

### Config Files

| File | Purpose |
|------|---------|
| `vite.config.js` | React plugin, `@` → `src` alias, dev port 5174, dist output |
| `netlify.toml` | Build command, dev port 3006, functions dir, 301 redirects, SPA fallback |
| `package.json` | Scripts: `dev`, `dev:standalone` (port 3006), `build`, `preview`. No lint/test/generate-og script. |
| `index.html` | SEO meta, 6 Google Fonts preloaded, GA + Plausible, JSON-LD schema, Ko-fi widget |
| `.gitignore` | `node_modules`, `dist`, `.env*`, `.DS_Store`, `.netlify`, `/deno.lock`, `*.log` |

### External Services Used

- **Supabase** — auth, `zerohack_applications` table, `check_rate_limit` RPC
- **Anthropic** — Claude Sonnet 4.5 via `@anthropic-ai/sdk` for chat and quiz
- **Kestris** — external proxy service for join applications and newsletter subscribe
- **Buttondown** — email list (tagged by source: `zerovector`, `enterprise`, etc.)
- **Google Analytics** — `G-X52T2864Z1` via gtag.js in index.html
- **Plausible** — `pa-eLrAVL1V0zJGsPaeLKFGY` analytics script in index.html
- **Ko-fi** — donation overlay widget embedded in index.html
- **Google Fonts** — Source Serif 4, Space Grotesk, Inter, JetBrains Mono, Fraunces, Outfit (six families preloaded)

### Scripts (npm + standalone)

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run dev` | `vite` | Dev server on port 5174 |
| `npm run dev:standalone` | `vite --port 3006` | Dev server on 3006 (matches netlify.toml dev) |
| `npm run build` | `vite build` | Production build to `dist/` |
| `npm run preview` | `vite preview` | Preview production build |
| `node scripts/generate-og.js` | standalone | Regenerate 13 OG cards to `public/og/`. NOT in build pipeline. |

---

## Section 9 — Feature Inventory

### Navigation & Chrome

- **Top nav with 3 dropdown groups** — Mindset, Application, Resources, plus links to Labrador, Terminus, Arroyo subdomains, Open Vector. ✅ Working
- **Auth avatar dropdown** — Shows Google profile photo when signed in, sign-in button otherwise. ✅ Working
- **Mobile hamburger drawer with accordion groups** — ✅ Working
- **Outside-click close + route-change close** — ✅ Working
- **Hover-intent delay (150ms)** on dropdown close — ✅ Working
- **Site footer with mixed internal/external links** — ✅ Working

### Homepage (Manifesto)

- **Boot sequence intro** — 8-line terminal animation, sessionStorage-gated (skipped on return visits). ✅ Working
- **Crossfade from boot → declaration** — timed fade. ✅ Working
- **Combined hero** (explainer + declaration columns) — ✅ Working
- **Pipeline preview with expand/collapse** — shows 3 of N phases initially. ✅ Working
- **Seven Principles summary cards** — ✅ Working
- **Contrast pairs (IS NOT / IS)** — ✅ Working
- **Name teaser section** — ✅ Working
- **Closing paths (Builders / Leaders)** — ✅ Working
- **Open Vector card** — links to open.zerovector.design. ✅ Working
- **Arroyo Labs card** — hardcoded inline in JSX (not content-sourced). ✅ Working
- **Newsletter signup (NotifyForm)** — via Kestris → Buttondown, tagged `zerovector`. ✅ Working

### Philosophy Page

- **What it is / what it is not** (two-column split with sticky sidebar) — ✅ Working
- **Principle Zero callout** — ✅ Working
- **Seven Principles with why + detail + links** — ✅ Working
- **Arc + lineage timeline** — ✅ Working

### Approach Page (`/approach`)

- **8 phases in two-column comparison** (agnostic vs Zero Vector voice) — ✅ Working

### For Builders / Leaders / Enterprise

- **Builders:** intro, 5-step getting started, reading list, coaching, resources, community — ✅ Working
- **Leaders:** 4 what-changes before/after, CZVO definition, forYou cards, 3 engagement models, practitioner bio — ✅ Working
- **Enterprise:** challenge cards, capabilities, 3 engagement models, honesty block, contact — ✅ Working

### Media Page (`/media`)

- **Featured cards** — ✅ Working
- **Articles list** — ✅ Working
- **Books list** — ✅ Working
- **Talks list** — ✅ Working
- **Voices to follow** (conditional render if > 0) — ✅ Working

### Origin Page

- **Personal story narrative** — ✅ Working
- **3 photos grid** — ✅ Working
- **Crew grid (11 members)** — ✅ Working

### Name Page

- **5-stage diagram** cycling design → physics → aerospace → quantum → meaning — ✅ Working
- **Inline SVG ZeroVectorDiagram** with computed ghost vectors — ✅ Working
- **Conclusion paragraphs + teaser** — ✅ Working

### Start Page

- **Announcement card** — ✅ Working
- **Investiture CTA card** — ✅ Working
- **Open Vector CTA card** — ✅ Working

### Join Page (Crew Application)

- **Auth gate** — requires Supabase Google login before form appears. ✅ Working
- **6 role cards** (framework, curriculum, evangelist, funding, visual_architect, intern) — ✅ Working
- **Role detail panel** on selection — ✅ Working
- **Endurance test fields** (6 standard questions) — ✅ Working
- **Role-specific conditional questions** per role ID — ✅ Working
- **Client validation + scroll-to-first-error** — ✅ Working
- **Submission via POST /api/join** (Kestris proxy with auth) — ✅ Working
- **Confirmation state** with different render tree — ✅ Working
- **Kestrel Intern NEW badge** — ✅ Working

### Legal Pages

- **Privacy policy** (all copy hardcoded in JSX) — ✅ Working
- **Terms of service** (all copy hardcoded in JSX) — ✅ Working

### 404

- **"Signal lost" terminal-styled 404 with return-to-origin link** — ✅ Working

### Investiture (Premium Deep Dive, `/investiture/*`)

- **Interactive hero prompt input** — placeholder-swaps "Investiture" with user text. ✅ Working
- **Stormlight theme** (deep blue + Kholin gold, Source Serif 4) — applied via body-style mutation. ✅ Working
- **24 spren particles** (decorative floating elements) — ✅ Working
- **What It Is section** — ✅ Working
- **11 Skills list with flow diagram** — ✅ Working
- **Skills page** with full reference (grouped by foundation/research/design/fleet/release) — ✅ Working
- **What You Get** — ASCII file tree + reading order — ✅ Working
- **ZV Connection** section — ✅ Working
- **Quickstart** — existing vs fresh project — ✅ Working
- **Roadmap** — 3 versions with shipped badges — ✅ Working
- **Click-to-copy terminal commands** — ✅ Working
- **Changelog page** — 5 versions (Feb 5 → Mar 19, 2026) — ✅ Working
- **Console.log easter egg** with Dalinar Kholin quote — ✅ Working
- **Inverted CTA** block — ✅ Working
- **Custom inline nav** (bypasses shared Nav component) — ✅ Working

### Zero Hack (Hackathon, `/zerohack/*`)

- **Dark red nightclub/ember theme** (#1A0808 bg) applied via body-style mutation — ✅ Working
- **Parallax scroll hero** (bg translate + scale, nav solidify on scroll) — ✅ Working
- **Respects `prefers-reduced-motion`** — ✅ Working
- **18 ember particles** — ✅ Working
- **CountUp scroll-triggered number animation** — ✅ Working
- **What It Is editorial split** — ✅ Working
- **Schedule/Structure timeline** (4 sessions) — ✅ Working
- **Judging rubric** (4 categories with weights) — ✅ Working
- **Hosts section** (4 slots, 3 TBD, velvet rope styling with paparazzi flash) — ✅ Working
- **Prizes** (Mac mini M4 1st place) — ✅ Working
- **Registration** ($50) — ✅ Working
- **Background article** — "The Janky Demo That Won" narrative (entire article hardcoded in JSX) — ✅ Working
- **Application form** with auth gate, 8 fields, direct Supabase insert into `zerohack_applications` — ✅ Working
- **Commitment checkbox required** before submit — ✅ Working
- **Console.log easter egg** with gradient styling — ✅ Working
- **"Delight layer"** — 17 ambient animations: neon flicker, shimmer sweeps, price breathing, tagline flicker — ✅ Working

### Newsletter & Email

- **NotifyForm component** with 3 variants (dark/light/orange) — ✅ Working
- **Kestris subscribe proxy** → Buttondown with per-page tag — ✅ Working
- **Client-side email validation** (basic `.includes('@')`) — ✅ Working

### Auth

- **Supabase Google OAuth** via UserContext — ✅ Working
- **Session persistence** across routes — ✅ Working
- **Embedded-browser detection** (FB/IG/LinkedIn/Slack/Twitter/WeChat/Line) with window.prompt URL-copy fallback — ✅ Working
- **Avatar in nav dropdown** — referrerPolicy="no-referrer" for Google OAuth fix — ✅ Working

### Analytics

- **Google Analytics** (gtag.js, `G-X52T2864Z1`) with manual page_view from SiteLayout on route change — ✅ Working
- **Plausible Analytics** (`pa-eLrAVL1V0zJGsPaeLKFGY`) — ✅ Working

### SEO

- **useSEO hook** — per-page document.title, meta description, OG tags, Twitter Card, canonical — ✅ Working
- **13 static OG cards** generated via `scripts/generate-og.js` (manual, not in build pipeline) — ✅ Working
- **JSON-LD structured data** in index.html (WebSite, Person, Organization) — ✅ Working
- **sitemap.xml, robots.txt, llms.txt, site.webmanifest** — ✅ Working

### Retired / Orphaned Features

- **Ask page** (terminal chat interface with Claude Sonnet 4.5) — ⚠️ Code still in `src/pages/AskPage.jsx` (207 lines) and backend `netlify/functions/chat.js` (127 lines + full system prompt) still deployed. Route `/ask` now redirects to `/start`. Unreachable from UI.
- **Quiz page** ("Am I Vibe Coding?") — ⚠️ Code still in `src/pages/QuizPage.jsx` (280 lines) and backend `netlify/functions/quiz.js` (139 lines) still deployed. Route `/quiz` now redirects to `/start`. Unreachable from UI.

### Scroll Reveal / Animation

- **VectorField global background** — canvas vector grid attracted to mouse with periodic scanline sweep — ✅ Working
- **DecryptText** — char-by-char decrypt animation for page titles — ✅ Working
- **Animate wrapper** — viewport-reveal fade for child elements — ✅ Working
- **ZeroVectorAnimation** — 5-stage SVG scroll-triggered explainer — ✅ Working
- **BootSequence** — one-time terminal boot intro on homepage — ✅ Working

### Developer / Contributor Tooling

- **VECTOR.md + ARCHITECTURE.md + CLAUDE.md** — doctrine triad — ✅ Present
- **Invest skills** (.claude/skills/invest-architecture, invest-backfill, invest-doctrine) — Investiture-framework skill definitions — ✅ Present
- **vector/ research scaffold** — empty directories for interviews/jtbd/personas/competitive/assumptions/schemas/decisions; 2 audit reports present — ✅ Scaffold ready, mostly empty
- **CONTENT-TASKS.md** — 6-task backlog for Open Vector content — ✅ Present
- **No tests, no linter, no TypeScript, no pre-commit hooks, no CI** — ⚠️ Absent by design

---

**Files inventoried: 148**
**Generated: 2026-04-10**
