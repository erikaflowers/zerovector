# Zero-Vector Design

A methodology, an open-source ecosystem, and a growing movement redefining how products get built in the age of AI. No intermediary. No translation layer. No friction. From intent to artifact, directly.

This repo is the source for **[zerovector.design](https://zerovector.design)** — the manifesto site, Investiture deep framework, and Zero Hack hackathon pages.

---

## What Is Zero-Vector Design?

Zero-Vector is a discipline for going from concept to customer without the translation layers that have defined product development for decades. The core principle: the distance between human intent and working product should be zero. No handoff. No research that dies in a slide deck. No design that gets lost between Figma and code. The people who understand the customer should be able to build the product.

It is opinionated about approach and agnostic about tools. It does not care whether you use Claude or Cursor or whatever ships next Tuesday. It cares that you work in the medium, that you understand the problem before you build the solution, and that craft survives the transformation.

Read the full manifesto at [zerovector.design](https://zerovector.design).

---

## The Seven Principles

1. **Work in the Medium** — Build in the real material, not a representation of it.
2. **Boundaryless by Nature** — No lanes. No disciplines. No artificial walls between thinking and making.
3. **The Medium is the Message** — The tool shapes the thinking. Change the medium, change the mind.
4. **The Purpose of a System is What It Does** — Look at what it actually produces, not what it claims to.
5. **Design and Build are the Same Act** — There is no handoff because there is no separation.
6. **Dissolve the Hyperspecialization** — Specialization is for insects. Your role is auteur.
7. **Venture Past the Possible** — The only way to discover the limits is to venture past them into the impossible.

**Principle Zero:** Take from all that which is around you and make of it something more.

Full treatment at [zerovector.design/philosophy](https://zerovector.design/philosophy).

---

## The Missions

Zero Vector is not just a philosophy. It is an active frontier — part production studio, part invention lab, part thought leadership.

- **[Open Vector](https://open.zerovector.design)** — Free learning platform. 60+ lessons teaching design-led engineering from first principles.
- **[Investiture](https://zerovector.design/investiture)** — The deep framework. A Stormlight Archive-inspired system for understanding design mastery as a progression of invested power.
- **[Labrador](https://herelabrador.ai)** — Open-source persistent memory and knowledge retrieval for any LLM.
- **[Arroyo Labs](https://arroyo.zerovector.design)** — The production arm. One designer, an AI crew, and the full pipeline.

---

## What's in This Repo

1. **The manifesto site** — Home, Philosophy, Approach, For Builders, For Leaders, For Enterprise, For Hire (Arroyo Labs), Media, Origin, Start, Name.
2. **[Investiture](https://zerovector.design/investiture)** — A deep dive on the AI-native design mastery framework. Includes a skills reference and changelog.
3. **[Zero Hack](https://zerovector.design/zerohack)** — Landing page for the first Zero Vector hackathon (May 9–10, 2026), plus the background article.
4. **Privacy and Terms** — Standard legal pages.
5. **A 404 page** with personality.

---

## Tech Stack

- **React 19** + **Vite 7** SPA
- **React Router 7** for client-side routing
- **Modular CSS** with custom properties — three scoped design systems under `src/styles/{zv,inv,zh}/`, shared primitives in `src/styles/shared/`
- **Proxima Nova** self-hosted via `@font-face` for the Orbital Brutalism display type
- **Supabase** Google OAuth — decorative only; nothing is gated
- **Netlify** hosting with auto-deploy on push to `main`

No TypeScript, no test framework, no linter, no CSS framework, no state management library, no serverless functions. Deliberate constraints.

---

## Design Language: Orbital Brutalism

Inspired by MoMA and the Stendig Calendar. Pure black and white, neon accents for punctuation. No softness, no gradients, no rounded corners. Hard offset shadows, sharp borders, bold Proxima Nova type. The medium is the message — the site practices the design philosophy it preaches.

---

## Local Development

```bash
git clone https://github.com/erikaflowers/zerovector.git
cd zerovector
cp .env.example .env   # add your Supabase keys (optional, for sign-in)
npm install
npm run dev
```

Vite serves on `http://localhost:5174`. The site builds and runs without env vars — Supabase is null-safe and the sign-in button just won't work.

---

## Project Structure

```
src/
├── App.jsx              # Routes
├── main.jsx             # React entry
├── components/          # Presentational components (Nav, PageHero, Animate, etc.)
├── content/             # Content-as-data: 13 modules + en.js barrel
├── contexts/
│   └── UserContext.jsx  # Supabase auth wrapper
├── hooks/               # useBodyTheme, useFonts, useInView, useSEO
├── layouts/
│   └── SiteLayout.jsx
├── lib/
│   └── supabase.js
├── pages/               # 18 page components
└── styles/
    ├── shared/          # :root tokens, reset, scroll-reveal, fonts
    ├── zv/              # Manifesto design system (~30 partials)
    │   ├── index.css    # Cascade-order @import index
    │   ├── components/  # Nav, buttons, pipeline, page-closing, etc.
    │   └── pages/       # Per-page styles (hero-v2, philosophy, etc.)
    ├── inv/             # Investiture design system (~17 partials)
    └── zh/              # Zero Hack design system (~17 partials)
```

---

## Contributing

Issues and pull requests welcome.

- **Content fixes** are the easiest contribution: edit a file in `src/content/`, send a PR.
- **Code contributions:** read `CLAUDE.md`, then `ARCHITECTURE.md`, then file an issue describing the change before writing code.

---

## Connect

- Substack: [eflowers.substack.com](https://eflowers.substack.com)
- LinkedIn: [helloeflowers](https://www.linkedin.com/in/helloeflowers/)
- Personal: [helloerikaflowers.com](https://helloerikaflowers.com)
- Support: [ko-fi.com/erikaflowers](https://ko-fi.com/erikaflowers)

---

## License

MIT for the code. The Zero Vector philosophy and Seven Principles are CC BY-SA 4.0 — share, remix, attribute.
