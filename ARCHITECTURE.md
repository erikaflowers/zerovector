# Zero-Vector Design — Architecture

The single technical authority for this codebase. Read after VECTOR.md and CLAUDE.md. When in doubt about where a file goes or how to name it, this document decides.

---

## Project Type

Static React SPA. No backend, no serverless functions, no database beyond a Supabase auth client. Hosted on Netlify with auto-deploy from `main`.

The repo serves three distinct properties on one bundle:

1. **The Manifesto site** — 14 routes, all wrapped by `SiteLayout`. The flagship at `/`.
2. **Investiture** — 3 standalone routes (`/investiture`, `/investiture/skills`, `/investiture/changelog`). Stormlight-themed deep dive on the AI-native project scaffold. Bypasses `SiteLayout`.
3. **Zero Hack** — 2 standalone routes (`/zerohack`, `/zerohack/background`). Hackathon landing + background narrative. Bypasses `SiteLayout`.

Sister sites live on subdomains and are linked but not contained: `open.zerovector.design`, `arroyo.zerovector.design`, `herelabrador.ai`, `terminus.zerovector.design`.

---

## Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Frontend | React 19.2 | Function components, hooks-only |
| Build | Vite 7.3 | `npm run dev` (port 5174), `npm run build` |
| Routing | React Router DOM 7.12 | Client-side, BrowserRouter |
| Styling | Plain CSS | Single file, custom properties, domain-prefixed classes |
| State | React Context | Just `UserContext` for auth |
| Auth | Supabase Google OAuth | `@supabase/supabase-js`, optional, null-safe |
| Newsletter | Kestris proxy → Buttondown | Direct client POST, no API key required |
| Analytics | Google Analytics + Plausible | Both load from `index.html` |
| Hosting | Netlify | Auto-deploy on push to `main` |

**Not used:** TypeScript, tests, linters, CSS frameworks, state libraries, serverless functions, database, ORM.

**Fonts:** Three core families load globally from `index.html` — Space Grotesk (display), Inter (body), JetBrains Mono (code). Three additional families load per-page via `useFonts` hook — Source Serif 4 on Investiture, Fraunces + Outfit on Zero Hack.

---

## Routing

### Manifesto routes (wrapped by `SiteLayout`)

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `ManifestoPage` | Homepage / manifesto |
| `/philosophy` | `PhilosophyPage` | Seven principles, arc, lineage |
| `/approach` | `PipelinePage` | 8-phase pipeline (agnostic vs ZV) |
| `/for-builders` | `BuildersPage` | Practitioner onboarding |
| `/for-leaders` | `LeadersPage` | Executive pitch, CZVO |
| `/for-enterprise` | `EnterprisePage` | Organizational engagement |
| `/media` | `ReadingPage` | Articles, books, talks, voices |
| `/origin` | `OriginPage` | Personal story, crew |
| `/start` | `StartPage` | Investiture + Open Vector CTAs |
| `/name` | `NamePage` | Origin of "Zero Vector" |
| `/privacy` | `PrivacyPage` | Privacy policy |
| `/terms` | `TermsPage` | Terms of service |
| `*` | `NotFoundPage` | 404 |

### Standalone routes (bypass `SiteLayout`, use `useBodyTheme` + `useFonts`)

| Path | Component |
|------|-----------|
| `/investiture` | `InvestiturePage` |
| `/investiture/skills` | `InvestitureSkillsPage` |
| `/investiture/changelog` | `InvestitureChangelogPage` |
| `/zerohack` | `ZerohackPage` |
| `/zerohack/background` | `ZerohackBackgroundPage` |

### Redirects (client-side)

| From | To |
|------|-----|
| `/about` | `/philosophy` |
| `/ask` | `/start` |
| `/quiz` | `/start` |
| `/join` | `/start` |
| `/zerohack/apply` | `/zerohack` |
| `/pipeline` | `/approach` |
| `/reading` | `/media` |
| `/resources` | `/media` |

### Redirects (CDN-level via `netlify.toml`)

| From | To |
|------|-----|
| `/open/learn/*` | `https://open.zerovector.design/learn/:splat` |
| `/open` | `https://open.zerovector.design/` |
| `/arroyo` | `https://arroyo.zerovector.design/` |

---

## Project Structure

```
src/
├── App.jsx                 # Router declaration
├── main.jsx                # React + BrowserRouter + UserProvider entry
├── components/             # 11 presentational components
│   ├── Animate.jsx         # Viewport-reveal wrapper around useInView
│   ├── BootSequence.jsx    # Homepage terminal boot (one-shot, sessionStorage-gated)
│   ├── DecryptText.jsx     # Scramble-to-reveal text effect (respects reduced-motion)
│   ├── ErrorBoundary.jsx   # Class-based error boundary
│   ├── Footer.jsx          # Site-wide footer
│   ├── Nav.jsx             # Top nav with 3 dropdown groups + auth avatar + mobile drawer
│   ├── NotifyForm.jsx      # Newsletter signup → Kestris → Buttondown
│   ├── PageClosing.jsx     # Shared orange CTA band
│   ├── PageHero.jsx        # Numbered eyebrow + DecryptText title + subtitle
│   ├── SectionHeader.jsx   # Numbered section header
│   ├── VectorField.jsx     # Fixed canvas vector grid (respects reduced-motion)
│   └── icons.jsx           # ArrowIcon, ExternalLinkIcon, ChevronIcon (named exports)
├── content/                # Content-as-data: every page reads its copy from here
│   ├── en.js               # Barrel export combining all modules
│   ├── home.js             # Manifesto homepage
│   ├── philosophy.js       # Seven principles canonical source
│   ├── approach.js         # 8-phase pipeline
│   ├── builders.js         # For Builders page
│   ├── leaders.js          # For Leaders page
│   ├── enterprise.js       # For Enterprise page
│   ├── media.js            # Articles, books, talks, voices
│   ├── origin.js           # Personal story, crew
│   ├── start.js            # Get Started landing
│   ├── name.js             # Origin of the name
│   ├── investiture.js      # Investiture deep dive content
│   ├── zerohack.js         # Zero Hack hackathon content
│   └── zerohack-background.js  # "The Janky Demo That Won" narrative
├── contexts/
│   └── UserContext.jsx     # Supabase Google OAuth wrapper, null-safe
├── hooks/
│   ├── useBodyTheme.js     # document.body style mutation for standalone pages
│   ├── useFonts.js         # Page-scoped Google Fonts loader
│   ├── useInView.js        # One-shot IntersectionObserver
│   ├── useMousePosition.js # Mouse/touch position via ref (no re-renders)
│   └── useSEO.js           # Per-page document.title, meta, OG tags
├── layouts/
│   └── SiteLayout.jsx      # Manifesto layout: ErrorBoundary + Outlet + scroll-to-top
├── lib/
│   └── supabase.js         # createClient singleton, null-safe
├── pages/                  # 17 page components — one per route
└── styles/                 # ~8,300 lines across 71 files, scoped by design system
    ├── shared/             # Cross-system primitives imported by every system entry
    │   ├── tokens.css      # :root custom properties + responsive :root overrides
    │   ├── reset.css       # *, html, body, a base
    │   └── scroll-reveal.css  # .zv-animate / .zv-visible utility (cross-system because Animate.jsx hardcodes zv- classes)
    ├── zv/                 # Manifesto design system (components/ + pages/ split)
    │   ├── index.css       # ~60-line cascade-order @import index
    │   ├── base.css, typography.css, atmospheric.css, responsive.css
    │   ├── components/     # 13 shared components (nav, footer, notify-form, etc.)
    │   └── pages/          # 15 page-specific partials
    ├── inv/                # Investiture design system (flat)
    │   ├── index.css       # ~45-line cascade-order @import index
    │   └── (16 partials: base, atmospheric, nav, hero, terminal, skills, etc.)
    └── zh/                 # Zero Hack design system (flat)
        ├── index.css       # ~43-line cascade-order @import index
        └── (17 partials: base, hero, structure, rubric, hosts, prizes, delight, etc.)
```

Every partial is under 500 lines. Each system's `index.css` is a thin cascade-order
`@import` index — never write rules directly in it, only add `@import` statements.
Cascade order inside each system: shared → base → atmospheric/typography → components →
pages → delight (inv and zh only) → responsive (always last).

---

## Conventions

### File naming

- **Pages and components:** PascalCase, `.jsx` extension (e.g. `ManifestoPage.jsx`, `Nav.jsx`)
- **Hooks:** camelCase with `use` prefix, `.js` extension (e.g. `useBodyTheme.js`)
- **Content modules:** kebab-case, `.js` extension (e.g. `zerohack-background.js`)
- **One exception:** `src/components/icons.jsx` (lowercase) — historical, named-export bag of icons

### CSS domain prefixes

| Prefix | Domain |
|--------|--------|
| `zv-` | Manifesto, shared components, default design system |
| `inv-` | Investiture pages and components |
| `zh-` | Zero Hack pages and components |

The prefixes are isolation by convention. Investiture JSX references only `inv-*` classes; Zero Hack JSX references only `zh-*`. Manifesto JSX references only `zv-*`. Do not cross the streams.

### Content-as-data

The most important architectural rule: **page copy lives in `src/content/`, not in JSX.** Pages import their content module from the `en.js` barrel and render it generically. This is what lets the codebase scale without inviting copy-edit churn into JSX diffs.

The exceptions are limited and documented:
- `PrivacyPage.jsx` and `TermsPage.jsx` — legal copy, hardcoded by design
- `NotFoundPage.jsx` — 5-line stub

### State management

- **Local component state:** `useState` / `useRef` per component
- **Cross-cutting state:** A single `UserContext` for Supabase auth, exposing `{user, isLoggedIn, loading, signIn, signOut}`. Wrapped at the React root in `main.jsx`.
- **No global store** (no Redux, Zustand, Jotai, etc.)

### Styling

- **Scoped system entries:** `src/styles/{zv,inv,zh}/index.css`. Each is a thin cascade-order `@import` index. Add new rules to the matching partial, not to `index.css`.
- **Shared primitives:** `src/styles/shared/{tokens,reset,scroll-reveal}.css`. Consumed by all three system indexes.
- **Tokens in `shared/tokens.css`:** Colors, typography, spacing, easing custom properties in `:root`, plus responsive `:root` overrides for `--section-padding` / `--container-padding`. Zero Hack has its own additional scoped token block on `.zh-page` inside `zh/base.css`.
- **Three parallel design systems:** `zv-*`, `inv-*`, `zh-*`. Each rebuilds nav, cards, CTAs from scratch — this is intentional isolation, not duplication to refactor away.
- **File size target:** every partial under 500 lines. When a partial grows past 400, plan a split.
- **Add new styles in the matching prefix partial.** Find the existing file that owns the cluster. Only create a new partial when no existing one fits.
- **Cascade order per system:** shared → base → atmospheric/typography → components → pages → delight (inv and zh only) → responsive (always last).

### Auth

- Supabase Google OAuth via `UserContext`. Null-safe — if env vars are missing, the context returns no user and the sign-in button is hidden.
- **Nothing is gated.** The sign-in is purely cosmetic (avatar in nav). No protected routes, no auth-required forms.
- Embedded-browser detection (FB / Instagram / LinkedIn / Slack / Twitter / WeChat / Line) falls back to a `window.prompt` URL copy because Google blocks OAuth in in-app browsers.

### Backend

There is no backend. There are no Netlify functions in `netlify/functions/`. The directory exists but is empty. If you add a function, document it here.

The newsletter signup in `NotifyForm.jsx` POSTs directly to `https://kestris.netlify.app/api/subscribe` from the client. Kestris is the proxy.

---

## Configuration & Environment

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_SUPABASE_URL` | Optional | Supabase project URL — for the nav sign-in avatar |
| `VITE_SUPABASE_ANON_KEY` | Optional | Supabase anon public key |

Both are exposed to the browser via Vite's `VITE_` prefix. The site builds and runs without them — Supabase is null-safe and the sign-in button just won't work.

### Build configuration

- `vite.config.js` — React plugin, dev port 5174, dist output. No path aliases.
- `netlify.toml` — Build command, dev port 3006, functions dir (empty), 301 redirects, SPA fallback
- `package.json` scripts — `dev`, `dev:standalone` (port 3006), `build`, `preview`

### External services

- **Supabase** — auth only (one Google OAuth button)
- **Kestris** — proxy for newsletter signups → Buttondown
- **Buttondown** — email list, tagged per source
- **Google Analytics** (`G-X52T2864Z1`) — gtag with manual page_view from `SiteLayout`
- **Plausible** (`pa-eLrAVL1V0zJGsPaeLKFGY`) — auto pageviews from `index.html`
- **Ko-fi** — donation overlay widget embedded in `index.html`

---

## Development Principles

1. **Read CLAUDE.md, then this file, before touching code.**
2. **Content goes in `src/content/`. Components render, they don't contain copy.**
3. **CSS goes in `src/styles/site.css`. No new files. Use the prefix that matches your domain.**
4. **No new dependencies without a reason.** The constraint is the point.
5. **Three design systems coexist deliberately.** Do not unify Investiture and Zero Hack into shared components.
6. **Standalone pages manage their own theming via `useBodyTheme` and their own fonts via `useFonts`.** Do not pollute `index.html` with page-specific font loads.
7. **Auth is null-safe and decorative.** Never gate functionality on it without changing this document first.
8. **The redirect routes in `App.jsx` exist for bookmarked URLs.** Do not delete them when retiring features.
