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
    body: 'Most scaffolds give you files and hope for the best. Investiture gives you files and eight skills that audit, enforce, and act on them. Two chains: the doctrine chain establishes and enforces your project intent, the audit chain assesses and remediates your codebase. Each skill reads your declarations at runtime. Your rules. Your conventions. Your architecture.',
    groups: [
      {
        name: 'Doctrine Chain',
        skills: [
          { cmd: '/invest-backfill', desc: 'Survey a codebase and generate starter doctrine' },
          { cmd: '/invest-doctrine', desc: 'Validate doctrine for completeness, consistency, and drift' },
          { cmd: '/invest-architecture', desc: 'Audit code against declared layers, imports, naming, and tokens' },
        ],
      },
      {
        name: 'Audit Chain',
        skills: [
          { cmd: '/invest-preflight', desc: 'Quick reconnaissance — project type, tech stack, scale, hazards' },
          { cmd: '/invest-manifest', desc: 'Complete codebase inventory — every file, route, endpoint, component' },
          { cmd: '/invest-repo-audit', desc: 'Quality assessment across 8 vectors with severity classification' },
          { cmd: '/invest-remediate', desc: 'Generate phased remediation plan from audit findings' },
          { cmd: '/invest-verify-remediation', desc: 'Verify fixes, update audit status, confirm ready to resume' },
        ],
      },
    ],
    flow: 'backfill \u2192 doctrine \u2192 architecture  |  preflight \u2192 manifest \u2192 repo-audit \u2192 remediate \u2192 verify',
    flowCaption: 'Doctrine enforces. Audit assesses. Both chains read your declarations.',
    skillsPageCta: 'Full skill reference \u2192',
    skillsPageUrl: '/investiture/skills',
  },

  skillsPage: {
    title: 'Skill Reference',
    subtitle: 'Every skill Investiture ships. Two chains, eight skills. What each does, when to run it, what it reads, what it writes.',
    groups: [
      {
        name: 'Doctrine Chain',
        desc: 'Establish, validate, and enforce your project intent. Backfill creates doctrine from your codebase. Doctrine validates it. Architecture enforces it.',
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
        name: 'Audit Chain',
        desc: 'Assess, remediate, and verify codebase quality. Preflight scans. Manifest inventories. Repo-audit judges. Remediate plans. Verify confirms.',
        skills: [
          {
            cmd: '/invest-preflight',
            name: 'Preflight Scan',
            desc: 'Fast reconnaissance pass on any codebase. Identifies project type, tech stack, framework, database, auth approach, hosting, scale, and hazards in under 2 minutes. Outputs directly to conversation. No files written.',
            args: '[path-to-repo]',
            reads: 'Package manifests, config files, README, directory structure, git log',
            writes: 'Nothing (conversation output only)',
            when: 'First contact with an unfamiliar codebase. Before deciding whether to run the full chain.',
          },
          {
            cmd: '/invest-manifest',
            name: 'Codebase Manifest',
            desc: 'Reads every source file in the codebase and produces a structured inventory. Every file, route, endpoint, database table, component, hook, and feature documented with precise descriptions. Sections adapt to project type.',
            args: '[path-to-repo]',
            reads: 'Every source file in the codebase',
            writes: 'MANIFEST.md at repo root',
            when: 'Before auditing. When onboarding to a project long-term. When you need full scope before planning.',
          },
          {
            cmd: '/invest-repo-audit',
            name: 'Code Quality Audit',
            desc: 'Scans the codebase across 8 vectors: dead code, spaghetti and complexity, error handling, security, consistency, feature completeness, performance, and documentation gaps. Classifies every finding by severity. Always includes commendations.',
            args: '[path-to-repo]',
            reads: 'All source files, MANIFEST.md (if present)',
            writes: 'AUDIT.md at repo root',
            when: 'After shipping a milestone. Before a major refactor. Periodic health checks.',
          },
          {
            cmd: '/invest-remediate',
            name: 'Remediation Plan',
            desc: 'Reads AUDIT.md and generates a phased remediation plan. Each phase is a self-contained prompt an agent can execute without reading the original audit. Ordered lowest-risk to highest-risk with rollback guidance.',
            args: '[path-to-audit-md]',
            reads: 'AUDIT.md',
            writes: 'REMEDIATION.md at repo root',
            when: 'After repo-audit when you intend to fix findings. When handing off fixes to other agents.',
          },
          {
            cmd: '/invest-verify-remediation',
            name: 'Verify Fixes',
            desc: 'After remediation phases are executed, verifies findings were resolved without introducing regressions. Updates AUDIT.md with resolution status (RESOLVED, DEFERRED, OPEN), deletes REMEDIATION.md, and patches MANIFEST.md.',
            args: '[path-to-repo]',
            reads: 'AUDIT.md, REMEDIATION.md, git history, modified files',
            writes: 'Updated AUDIT.md, patched MANIFEST.md, deletes REMEDIATION.md',
            when: 'After completing remediation phases. Before resuming feature work.',
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
\u251C\u2500\u2500 .claude/skills/        \u2190 8 skills (doctrine chain + audit chain)
\u251C\u2500\u2500 /src                   \u2190 React 19 + Vite starter
\u251C\u2500\u2500 /core                  \u2190 Pure logic, state, utilities
\u251C\u2500\u2500 /services              \u2190 API layer
\u251C\u2500\u2500 /design-system         \u2190 CSS variable tokens
\u251C\u2500\u2500 /vector
\u2502   \u251C\u2500\u2500 /schemas           \u2190 6 research schemas
\u2502   \u251C\u2500\u2500 /research          \u2190 Your structured findings
\u2502   \u251C\u2500\u2500 /decisions         \u2190 Architecture Decision Records
\u2502   \u2514\u2500\u2500 /audits            \u2190 Skill chain audit reports
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
        version: 'v1.5',
        title: 'Audit Chain',
        body: 'Five new skills for codebase quality: preflight scans in 2 minutes, manifest inventories everything, repo-audit classifies findings across 8 vectors, remediate generates phased fix plans, verify confirms the fixes landed. Doctrine establishes intent. Audit assesses reality.',
        shipped: true,
      },
      {
        version: 'v2.0',
        title: 'VECTOR Control Panel',
        body: 'A visual GUI for Investiture. Edit DESIGN.md tokens, preview your doctrine, browse audit results, and manage your skill chain from a framework-aware control panel. Your project, visible at a glance.',
      },
    ],
  },

  changelog: {
    title: 'Changelog',
    subtitle: 'What shipped, when.',
    versions: [
      {
        version: 'v1.5',
        date: 'Apr 12, 2026',
        title: 'Audit Chain',
        items: [
          'Five new audit skills: preflight, manifest, repo-audit, remediate, verify-remediation',
          'Preflight scans any codebase in under 2 minutes — project type, tech stack, scale, hazards',
          'Manifest reads every source file and produces a complete structured inventory',
          'Repo-audit assesses quality across 8 vectors with severity classification and commendations',
          'Remediate generates phased fix plans ordered lowest-risk to highest-risk',
          'Verify-remediation confirms fixes landed, updates AUDIT.md with resolution status',
          'Core skill set refocused: 3 doctrine + 5 audit = 8 core skills',
          'Research, design, fleet, and release skills moved to optional (.claude/skills-optional/)',
          'inject.sh and npx investiture init now install all eight core skills',
          'Version bump to 1.5.0',
        ],
      },
      {
        version: 'v1.4',
        date: 'Mar 19, 2026',
        title: 'Research, Design & Fleet Skills',
        items: [
          'Eight skills for assumption validation, user research, design briefs, decision records, multi-agent decomposition, onboarding, and release notes',
          'Now available as optional skills in .claude/skills-optional/',
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
