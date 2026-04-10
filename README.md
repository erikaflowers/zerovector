# Zero-Vector Design

A design philosophy and open methodology for the age of AI. No intermediary. No translation layer. No friction. From intent to artifact, directly.

This repo is the source for **[zerovector.design](https://zerovector.design)** — the manifesto site, the Investiture premium deep dive, and the Zero Hack hackathon landing pages.

---

## What Is Zero-Vector Design?

Zero-Vector is a discipline for going from concept to customer without the translation layers that have defined product development for decades. The person with the vision builds the artifact directly, using AI agents as crew. No handoff. No specs to interpret. One person, full pipeline, real product.

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

Full treatment at [zerovector.design/philosophy](https://zerovector.design/philosophy).

---

## What's in This Repo

Five things:

1. **The manifesto site** — Home, Philosophy, Approach, For Builders, For Leaders, For Enterprise, Media, Origin, Start, Name.
2. **[Investiture](https://zerovector.design/investiture)** — A premium deep dive on the AI-native project scaffold and its skill chain. Includes a full skills reference and a changelog.
3. **[Zero Hack](https://zerovector.design/zerohack)** — Landing page for the first Zero Vector hackathon (May 9–10, 2026), plus the background article ("The Janky Demo That Won").
4. **Privacy and Terms** — Standard legal pages.
5. **A 404 page** with personality.

Application forms and AI chat features that previously lived here have been retired. The Open Vector learning platform, Arroyo Labs, Labrador, and Terminus now live on their own subdomains and are linked from the manifesto.

---

## Tech Stack

- **React 19** + **Vite 7** SPA
- **React Router 7** for client-side routing
- **Plain CSS** with custom properties — one file (`src/styles/site.css`), domain-scoped class prefixes (`zv-` / `inv-` / `zh-`)
- **Supabase** Google OAuth — used only for the optional sign-in avatar in the nav; nothing is gated
- **Netlify** hosting with auto-deploy on push to `main`

No TypeScript, no test framework, no linter, no CSS framework, no state management library, no serverless functions. Deliberate constraints.

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
├── components/          # 11 presentational components
├── content/             # Content-as-data: 13 modules + en.js barrel
├── contexts/
│   └── UserContext.jsx  # Supabase auth wrapper
├── hooks/               # useBodyTheme, useFonts, useInView, useMousePosition, useSEO
├── layouts/
│   └── SiteLayout.jsx
├── lib/
│   └── supabase.js
├── pages/               # 17 page components
└── styles/
    └── site.css         # ~7,900 lines, one file
```

---

## Contributing

Issues and pull requests welcome.

- **Content fixes** are the easiest contribution: edit a file in `src/content/`, send a PR.
- **Code contributions:** read `CLAUDE.md`, then `ARCHITECTURE.md`, then file an issue describing the change before writing code.

---

## Related Projects

- **[Open Vector](https://open.zerovector.design)** — Free learning platform: 6 levels, 60+ lessons.
- **[Arroyo Labs](https://arroyo.zerovector.design)** — Commercial Zero Vector engagements.
- **[Labrador](https://herelabrador.ai)** — Persistent memory layer for any LLM.
- **Terminus** — WaveTerm fork with crew-aware features.
- **[Investiture](https://github.com/erikaflowers/investiture)** — The AI-native project scaffold.

---

## Connect

- Substack: [erikaflowers.substack.com](https://eflowers.substack.com)
- LinkedIn: [helloeflowers](https://www.linkedin.com/in/helloeflowers/)
- Personal: [helloerikaflowers.com](https://helloerikaflowers.com)
- Support: [ko-fi.com/erikaflowers](https://ko-fi.com/erikaflowers)

---

## License

MIT for the code. The Zero Vector philosophy and Seven Principles are CC BY-SA 4.0 — share, remix, attribute.
