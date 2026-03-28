// Investiture Page — Content
// Part of the Zero-Vector content layer. See en.js for the combined export.

const investiture = {
  nav: {
    brand: 'Investiture',
    back: 'Zero Vector',
    github: 'GitHub',
    changelog: 'Changelog',
  },

  hero: {
    label: 'A Zero-Vector Scaffold',
    epigraph: ['Before the architecture, the intent.', 'Before the code, the conviction.'],
    title: 'Investiture',
    subtitle: 'Intent before implementation.',
    badge: 'Free & Open Source',
  },

  whatItIs: {
    label: 'The Scaffold',
    headline: 'Start with intent. Build with structure.',
    body: 'Investiture is a project scaffold that does more than set up your stack. It sets up your thinking. Every Investiture project starts with VECTOR.md, a doctrine file that captures who your project serves, what problem it solves, what you know, and what you still need to learn. Your AI agents read it before they write a line of code. Your team reads it before they make a decision. The result: every project starts aligned. Not with a blank canvas and good intentions. With structured intent and a clear reading order.',
    callout: {
      title: 'What This Is Not',
      body: 'Not Tailwind. Not Bootstrap. Not a UI kit. Investiture is unopinionated about your design. It only cares about where your code lives, how your agents onboard, and what your project knows about itself. Bring your own design system, or ask Claude to build one.',
    },
  },

  skills: {
    label: 'The Skill Chain',
    headline: 'Doctrine that enforces itself.',
    body: 'Most scaffolds give you files and hope for the best. Investiture gives you files and eleven skills that audit, extend, and act on them. Each skill reads your doctrine at runtime: your rules, your conventions, your architecture. It holds your project to the standard you declared.',
    groups: [
      {
        name: 'Foundation',
        skills: [
          { cmd: '/invest-backfill', desc: 'Survey a codebase and generate starter doctrine' },
          { cmd: '/invest-doctrine', desc: 'Validate doctrine for completeness, consistency, and drift' },
          { cmd: '/invest-architecture', desc: 'Audit code against declared layers, imports, naming, and tokens' },
        ],
      },
      {
        name: 'Research',
        skills: [
          { cmd: '/invest-validate', desc: 'Prioritize assumptions by risk and plan validation sprints' },
          { cmd: '/invest-interview', desc: 'Generate structured discussion guides for user research' },
          { cmd: '/invest-synthesize', desc: 'Extract insights from raw research and propose doctrine patches' },
        ],
      },
      {
        name: 'Design & Decisions',
        skills: [
          { cmd: '/invest-brief', desc: 'Generate design briefs from personas, JTBD, and doctrine' },
          { cmd: '/invest-adr', desc: 'Capture architecture decisions as numbered, cross-referenced records' },
        ],
      },
      {
        name: 'Fleet & Release',
        skills: [
          { cmd: '/invest-crew', desc: 'Decompose features into scoped agent tasks with boundaries' },
          { cmd: '/invest-handoff', desc: 'Generate role-specific onboarding docs for any collaborator' },
          { cmd: '/invest-changelog', desc: 'Write user-facing release notes from git log and doctrine' },
        ],
      },
    ],
    flow: 'backfill \u2192 doctrine \u2192 architecture  |  validate \u2192 interview \u2192 synthesize  |  brief \u00b7 adr \u00b7 crew \u00b7 handoff \u00b7 changelog',
    flowCaption: 'Foundation enforces. Research learns. The rest acts.',
    skillsPageCta: 'Full skill reference \u2192',
    skillsPageUrl: '/investiture/skills',
  },

  skillsPage: {
    title: 'Skill Reference',
    subtitle: 'Every skill Investiture ships. What it does, when to run it, what it reads, what it writes.',
    groups: [
      {
        name: 'Foundation',
        desc: 'The core chain. Backfill creates doctrine from your codebase. Doctrine validates it. Architecture enforces it.',
        skills: [
          {
            cmd: '/invest-backfill',
            name: 'Backfill Doctrine',
            desc: 'Surveys an existing codebase. README, package manifest, git history, directory structure, config files, inline prompts, and generates VECTOR.md, CLAUDE.md, and ARCHITECTURE.md. Combines Investiture defaults with inferred content. Marks what it could not infer with operator prompts.',
            args: '[--dry-run] [--only vector|claude|architecture]',
            reads: 'Your entire codebase (sampled)',
            writes: 'VECTOR.md, CLAUDE.md, ARCHITECTURE.md, /vector/ directory structure',
            when: 'Once, on existing projects that don\'t have doctrine yet.',
          },
          {
            cmd: '/invest-doctrine',
            name: 'Doctrine Audit',
            desc: 'Audits the doctrine files themselves for completeness, internal consistency, cross-document contradictions, and drift from the actual codebase on disk. Checks VECTOR.md, CLAUDE.md, and ARCHITECTURE.md against each other and against reality.',
            args: '[path/to/specific-doctrine-file]',
            reads: 'VECTOR.md, CLAUDE.md, ARCHITECTURE.md, filesystem',
            writes: '/vector/audits/invest-doctrine.md',
            when: 'Before invest-architecture. After editing any doctrine file.',
          },
          {
            cmd: '/invest-architecture',
            name: 'Architecture Audit',
            desc: 'Reads ARCHITECTURE.md at runtime and checks every source file against what you declared. Layers, naming conventions, import direction, design tokens, state management patterns, file size limits.',
            args: '[--fix] [path/to/scope]',
            reads: 'ARCHITECTURE.md, VECTOR.md, CLAUDE.md, all source files',
            writes: '/vector/audits/invest-architecture.md',
            when: 'Before shipping. After refactoring. As a structural quality gate.',
          },
        ],
      },
      {
        name: 'Research',
        desc: 'A closed loop: validate plans what to test, interview generates the guide, synthesize records what you learned. Feeds back into validate.',
        skills: [
          {
            cmd: '/invest-validate',
            name: 'Validate Assumptions',
            desc: 'Reads every assumption in /vector/research/assumptions/, classifies each by risk (Impact \u00d7 Confidence), and generates a stage-appropriate validation sprint plan. Recommends specific methods. interviews, surveys, analytics, usability tests. matched to your project stage.',
            args: '[--assumption id] [--stage discovery|alpha|beta|launched] [--dry-run]',
            reads: 'VECTOR.md, /vector/research/assumptions/',
            writes: '/vector/research/assumptions/validation-plan-[date].md',
            when: 'Start of sprint. Before major feature investment. After a pivot.',
          },
          {
            cmd: '/invest-interview',
            name: 'Interview Guide',
            desc: 'Generates a structured user research discussion guide from unvalidated assumptions. Each assumption gets entry questions (open-ended, non-leading), probing techniques, targeted follow-ups, and explicit validation/invalidation signals defined before the session.',
            args: '[--assumption id] [--theme topic] [--format script|guide] [--dry-run]',
            reads: 'VECTOR.md, /vector/research/assumptions/, /vector/research/personas/, /vector/research/jtbd/',
            writes: '/vector/research/interviews/guide-[slug]-[date].md',
            when: 'Before any user research session. After invest-validate identifies what to test.',
          },
          {
            cmd: '/invest-synthesize',
            name: 'Synthesize Research',
            desc: 'Takes raw research input. interview notes, beta feedback, validation results. extracts structured insights, and proposes specific patches to VECTOR.md and /vector/ schema files. Shows a full diff before writing anything. You approve every change.',
            args: '[--source file] [--dry-run]',
            reads: 'VECTOR.md, /vector/research/*, raw input',
            writes: 'VECTOR.md (patches), /vector/research/* (updates), /vector/audits/invest-synthesize.md',
            when: 'After user interviews. After beta feedback rounds. After validation experiments.',
          },
        ],
      },
      {
        name: 'Design & Decisions',
        desc: 'On-demand skills for design preparation and decision capture. Both read doctrine independently.',
        skills: [
          {
            cmd: '/invest-brief',
            name: 'Design Brief',
            desc: 'Generates a design brief for a specific feature or flow. Reads personas, JTBD, assumptions, VECTOR.md principles, and quality gates to give a designer actionable direction grounded in real evidence. Not opinions.',
            args: '[feature description] [--dry-run]',
            reads: 'VECTOR.md, ARCHITECTURE.md, /vector/research/personas/, /vector/research/jtbd/, /vector/research/assumptions/, /vector/decisions/',
            writes: '/vector/briefs/[feature-slug]-[date].md',
            when: 'Before starting design work. When onboarding a designer. After research updates.',
          },
          {
            cmd: '/invest-adr',
            name: 'Decision Record',
            desc: 'Generates a numbered Architecture Decision Record from a decision description. Reads VECTOR.md constraints, ARCHITECTURE.md stack context, and existing ADRs to avoid contradictions. Each ADR documents options considered, the decision, and consequences.',
            args: '[decision description] [--status proposed|accepted|deprecated|superseded] [--dry-run]',
            reads: 'VECTOR.md, ARCHITECTURE.md, /vector/decisions/',
            writes: '/vector/decisions/ADR-[NNN]-[slug].md',
            when: 'Before committing to a new dependency. Before adopting a new pattern. When the same decision keeps being relitigated.',
          },
        ],
      },
      {
        name: 'Fleet & Release',
        desc: 'Pre-flight decomposition, role-specific onboarding, and user-facing release notes.',
        skills: [
          {
            cmd: '/invest-crew',
            name: 'Crew Manifest',
            desc: 'Decomposes a feature into atomic agent tasks. Reads ARCHITECTURE.md layer ownership and CLAUDE.md agent model to assign tasks with branch names, commit prefixes, explicit scope boundaries, and a dependency graph showing what can run in parallel.',
            args: '[feature description] [--dry-run] [--format flat]',
            reads: 'ARCHITECTURE.md, CLAUDE.md, VECTOR.md',
            writes: '/vector/missions/[feature-slug].md',
            when: 'Before starting a multi-agent sprint. When a feature spans multiple layers.',
          },
          {
            cmd: '/invest-handoff',
            name: 'Generate Handoff',
            desc: 'Generates a condensed onboarding document tailored to a specific role. Engineers get layer maps and conventions. Designers get principles and token systems. Agents get a full operational brief. Clients get a plain-language project summary.',
            args: '[--role engineer|designer|agent|client] [--dry-run]',
            reads: 'VECTOR.md, CLAUDE.md, ARCHITECTURE.md, /vector/audits/, /vector/decisions/, /vector/missions/',
            writes: '/vector/handoffs/[role]-[date].md',
            when: 'Onboarding a collaborator. Starting a cold agent session. Before a client check-in.',
          },
          {
            cmd: '/invest-changelog',
            name: 'Write Changelog',
            desc: 'Reads git log since the last tag and VECTOR.md value prop, filters internal noise, groups commits by user-facing theme, and writes plain-language release notes that describe outcomes, not implementation.',
            args: '[--since tag|commit] [--version x.y.z] [--dry-run]',
            reads: 'git log, VECTOR.md',
            writes: '/vector/changelog/[version].md, CHANGELOG.md',
            when: 'At release time. After a sprint. Before tagging a release.',
          },
        ],
      },
    ],
  },

  whatYouGet: {
    label: 'What You Get',
    intro: 'One command. Doctrine, architecture, and research schemas injected into any project.',
    fileTree: `investiture/
\u251C\u2500\u2500 VECTOR.md              \u2190 Project doctrine (read first)
\u251C\u2500\u2500 CLAUDE.md              \u2190 Contributor onboarding (read second)
\u251C\u2500\u2500 ARCHITECTURE.md        \u2190 Technical guide (read third)
\u251C\u2500\u2500 .claude/skills/        \u2190 11 skills (foundation, research, design, fleet)
\u251C\u2500\u2500 /src                   \u2190 React 19 + Vite starter
\u251C\u2500\u2500 /core                  \u2190 Pure logic, state, utilities
\u251C\u2500\u2500 /services              \u2190 API layer
\u251C\u2500\u2500 /design-system         \u2190 CSS variable tokens
\u251C\u2500\u2500 /vector
\u2502   \u251C\u2500\u2500 /schemas           \u2190 6 research schemas
\u2502   \u251C\u2500\u2500 /research          \u2190 Your structured findings
\u2502   \u251C\u2500\u2500 /decisions         \u2190 Architecture Decision Records
\u2502   \u251C\u2500\u2500 /missions          \u2190 Crew task manifests
\u2502   \u251C\u2500\u2500 /handoffs          \u2190 Role-specific onboarding snapshots
\u2502   \u251C\u2500\u2500 /briefs            \u2190 Design briefs
\u2502   \u2514\u2500\u2500 /changelog         \u2190 Versioned release notes
\u251C\u2500\u2500 install.sh             \u2190 Cross-platform setup
\u2514\u2500\u2500 preflight.sh           \u2190 Environment check`,
    readingOrder: [
      { step: '01', file: 'VECTOR.md', desc: 'Why this project exists' },
      { step: '02', file: 'CLAUDE.md', desc: 'How your AI agent behaves' },
      { step: '03', file: 'ARCHITECTURE.md', desc: 'Where things go and why' },
      { step: '04', file: '.claude/skills/', desc: 'Skills that audit your doctrine' },
    ],
    readingOrderCaption: 'This is onboarding for both humans and agents.',
  },

  connection: {
    label: 'The Convention',
    headline: 'Built on the Zero Vector methodology',
    body: 'VECTOR.md is not just a file. It is a convention. Like README.md tells people what your project is, VECTOR.md tells agents and teammates why your project exists and what you know about your users. The /vector directory holds structured research artifacts (interviews, jobs to be done, personas, competitive analysis, blue ocean strategy, assumptions) in machine-readable schemas that any AI tool can consume. Investiture brings this convention into every new project automatically. You do not have to remember to add it. You do not have to set up the directory structure. It is there from the first commit.',
  },

  quickstart: {
    label: 'Quick Start',
    existing: {
      headline: 'Add to an existing project',
      intro: 'Already have a codebase? One command injects the skill chain and research schemas without touching your code.',
      commands: [
        'npx investiture init',
      ],
      after: 'Then open Claude Code and run /invest-backfill. It surveys your codebase and generates VECTOR.md, CLAUDE.md, and ARCHITECTURE.md.',
      alt: 'bash <(curl -fsSL https://raw.githubusercontent.com/erikaflowers/investiture/main/inject.sh)',
      altLabel: 'No npm? Use curl:',
    },
    fresh: {
      headline: 'Start a new project',
      intro: 'Use the full scaffold with React, Vite, and the doctrine system built in.',
      commands: [
        'git clone https://github.com/erikaflowers/investiture.git my-project',
        'cd my-project && bash install.sh',
      ],
      after: 'Fill in VECTOR.md with your project identity. Open Claude Code. Start building.',
    },
  },

  roadmap: {
    label: 'On the Horizon',
    versions: [
      {
        version: 'v1.4',
        title: 'Research, Design & Fleet Skills',
        body: 'Eight new skills for assumption validation, user research, design briefs, decision records, multi-agent task decomposition, role-specific onboarding, and release notes. The doctrine now does more than enforce. it learns, acts, and ships.',
        shipped: true,
      },
      {
        version: 'v1.5',
        title: 'Alignment & Provenance',
        body: 'Trace features to user needs in VECTOR.md. Link design decisions to research artifacts in /vector. Close the gap between what you built and why you built it.',
      },
      {
        version: 'v2.0',
        title: 'Seeded Init',
        body: 'Tell Investiture what you are building and who it is for. Choose your stack, activate the right skills, and seed your research with first hypotheses. all from a single command.',
      },
    ],
  },

  changelog: {
    title: 'Changelog',
    subtitle: 'What shipped, when.',
    versions: [
      {
        version: 'v1.4',
        date: 'Mar 19, 2026',
        title: 'Research, Design & Fleet Skills',
        items: [
          'Eight new skills: validate, interview, synthesize, brief, adr, crew, handoff, changelog',
          'Research loop: prioritize assumptions by risk, generate interview guides, synthesize findings back into doctrine',
          'Design briefs generated from personas, JTBD, and doctrine. Not opinions',
          'Architecture Decision Records with automatic numbering and cross-referencing',
          'Multi-agent task decomposition with branch names, scope boundaries, and dependency graphs',
          'Role-specific onboarding docs for engineers, designers, agents, and clients',
          'User-facing release notes generated from git log, filtered through VECTOR.md value prop',
          '/vector/ directory expanded: missions, handoffs, briefs, changelog',
          'invest-backfill updated to scaffold all v1.4 directories',
          'inject.sh and npx investiture init now install all eleven skills',
        ],
      },
      {
        version: 'v1.3',
        date: 'Mar 11, 2026',
        title: 'Skill Chain MVP',
        items: [
          'Three executable skills: /invest-backfill, /invest-doctrine, /invest-architecture',
          'Backfill surveys existing codebases and generates starter doctrine',
          'Doctrine audit checks completeness, consistency, contradictions, and disk drift',
          'Architecture audit checks layers, imports, naming, tokens, state, file size',
          'CLAUDE.md reframed as contributor onboarding (not agent persona)',
          'Development Principles section added to ARCHITECTURE.md template',
          '/vector/audits/ directory for persistent audit reports',
        ],
      },
      {
        version: 'v1.2',
        date: 'Mar 4, 2026',
        title: 'Doctrine System + Zero Vector Integration',
        items: [
          'VECTOR.md, CLAUDE.md, ARCHITECTURE.md doctrine templates',
          '/vector directory with six research schemas (persona, JTBD, assumption, interview, competitive, blue ocean)',
          'ADR template at /vector/decisions/',
          'start.sh launcher: backgrounds Vite, opens Claude Code, auto-cleans on exit',
          'make-it-mine.sh interactive agent setup (name, pronouns, role, operator)',
          'Investiture page live on zerovector.design/investiture',
        ],
      },
      {
        version: 'v1.1',
        date: 'Feb 11, 2026',
        title: 'Scaffold Audit + Onboarding Overhaul',
        items: [
          'Fixed 20 audit findings from critical analysis',
          'Cross-platform install.sh rewrite (Mac, Linux, WSL, Windows Git Bash)',
          'Wired content/en.json into App.jsx, no more hardcoded strings',
          'Added React Router, ErrorBoundary, Vitest with 9 tests',
          'Context + useReducer state management in core/store.jsx',
          'preflight.sh environment verification',
        ],
      },
      {
        version: 'v1.0',
        date: 'Feb 5, 2026',
        title: 'Architecture Scaffold Launch',
        items: [
          'Four-layer React architecture: UI, design system, core logic, services',
          'CSS variable token system with light/dark theme support',
          'Content layer for externalized strings',
          'install.sh cross-platform setup script',
          'CLAUDE.md auto-generation for Claude Code onboarding',
        ],
      },
    ],
  },

  quote: {
    text: 'The most important step a person can take is always the next one.',
    cite: 'Dalinar Kholin, The Stormlight Archive',
    context: 'Named for Investiture, the fundamental magical energy of Brandon Sanderson\'s Cosmere universe. Like its namesake, this scaffold is a foundation that can manifest as many different things.',
  },

  cta: {
    primaryCta: 'Get Investiture',
    primaryUrl: 'https://github.com/erikaflowers/investiture',
    secondaryCta: 'Read the Docs',
    secondaryUrl: 'https://github.com/erikaflowers/investiture#readme',
  },
};

export default investiture;
