// Home Page (The Manifesto) — Content
// Part of the Zero-Vector content layer. See en.js for the combined export.

const home = {
  hero: {
    pre: 'A New Discipline',
    title: 'ZERO VECTOR',
    subtitle: 'No intermediary. No translation layer. No friction. From intent to artifact, directly.',
    coordinates: '44.8024 N / 68.7853 W',
  },

  explainer: {
    headline: 'What Is Zero Vector?',
    body: [
      'Zero Vector Design is a methodology, an open-source ecosystem, and a growing movement redefining how products get built in the age of AI.',
      'The core principle: the distance between human intent and working product should be zero. No handoff. No translation layer. No research that dies in a slide deck. No design that gets lost between Figma and code. The people who understand the customer should be able to build the product, and the tools, frameworks, and doctrine to make that real should be free and open to everyone.',
    ],
    audience: 'For designers who build. For leaders who ship. For anyone tired of the handoff.',
    paths: [
      { label: 'Learn the philosophy', link: '/philosophy' },
      { label: 'Start building', link: '/for-builders' },
      { label: 'Transform your org', link: '/for-leaders' },
    ],
  },

  missions: {
    headline: 'Zero Vector is not just a philosophy. It is an active frontier.',
    body: 'Part production studio, part invention lab, part thought leadership, Zero Vector builds the tools, frameworks, and proof points that turn the manifesto into practice.',
    items: [
      {
        name: 'Open Vector',
        desc: 'The free learning platform. 60+ lessons teaching design-led engineering from first principles — no prerequisites, no gatekeeping.',
        image: '/og/open-vector.png',
        href: 'https://open.zerovector.design',
      },
      {
        name: 'Investiture',
        desc: 'The deep framework. A Stormlight Archive-inspired system for understanding design mastery as a progression of invested power.',
        to: '/investiture',
        image: '/og/investiture.png',
      },
      {
        name: 'Labrador',
        desc: 'Open-source persistent memory and knowledge retrieval for any LLM. The infrastructure layer that makes AI agents actually remember.',
        href: 'https://herelabrador.ai',
        image: '/og/learn.png',
      },
      {
        name: 'Arroyo Labs',
        desc: 'The production arm. One designer, an AI crew, and the full pipeline — from discovery to shipped product in weeks, not quarters.',
        href: 'https://arroyo.zerovector.design',
        image: '/images/arroyo-og.png',
      },
    ],
  },

  declaration: {
    number: '002',
    title: 'The Declaration',
    paragraphs: [
      'For thirty years, design has been an act of translation. We draw pictures of things and hand them to other people who build fifty percent of the vision. We call this a process. We call this collaboration. We call this the way it has always been done.',
      'It does not have to be this way.',
      'Zero-Vector Design is a new discipline. Not a tool. Not a framework. A fundamental shift in what it means to go from concept to customer. The entire pipeline, from research to shipping, reimagined for a world where AI agents are not assistants. They are crew.',
      'The friction was never the point. The handoffs were never inevitable. The translation layer between what you imagine and what gets built? That was a limitation of the tools, not a feature of the process.',
      'We are done accepting it.',
    ],
    callout1: 'The friction was never the point.',
    callout2: 'Collapse the translation to zero.',
  },

  timeline: {
    number: '006',
    title: 'The Lineage',
    subtitle: 'The tools changed every decade. The process never did. Until now.',
    narrative: [
      'In 1968, Douglas Engelbart sat in front of a camera in San Francisco and showed the world what a computer could be. A mouse. Hypertext. Collaborative editing. Real-time video conferencing. He called it the Mother of All Demos. It was not a product launch. It was a declaration of intent: the computer is an instrument for augmenting human thought.',
      'Five years later, at Xerox PARC, Alan Kay and his team built the Alto, the machine that became the blueprint for every personal computer that followed. Windows. Icons. Menus. The graphical interface. Kay understood something profound: the tool shapes the thinking. Change the medium, change the mind.',
      'Every generation since has tried to close the gap between what a person envisions and what actually gets built. Desktop publishing, the web, agile, design thinking, lean, each one shortened the distance. None of them eliminated it. The translation layer survived every revolution. Until now.',
    ],
    entries: [
      { year: '1968', milestone: 'The Mother of All Demos', description: 'Engelbart shows the world what computers could be. The mouse. Hypertext. Real-time collaboration. A vision decades ahead of the tools to realize it.' },
      { year: '1973', milestone: 'Xerox PARC & the Alto', description: 'Alan Kay and team build the personal computer. Windows, icons, direct manipulation. The tool shapes the thinking. A new medium is born.' },
      { year: '1985', milestone: 'Desktop Publishing', description: 'The Macintosh and LaserWriter collapse the print pipeline. Designers go from layout to output directly. WYSIWYG becomes a promise, and a partial lie.' },
      { year: '1995', milestone: 'The Web Goes Public', description: 'Anyone can publish. The distance between idea and audience collapses overnight. But building for the web means learning a new language the tools cannot yet speak.' },
      { year: '2001', milestone: 'The Agile Manifesto', description: 'Seventeen developers reject waterfall. Shorter cycles. Working software over documentation. The process gets faster, but the handoff between design and engineering remains.' },
      { year: '2008', milestone: 'Design Thinking Goes Mainstream', description: 'IDEO, Stanford d.school, and the double diamond. Empathize, define, ideate, prototype, test. A rigorous process, but still: the designer draws, someone else builds.' },
      { year: '2013', milestone: 'Lean UX & Build-Measure-Learn', description: 'Ship fast. Validate with real users. Kill your darlings. The cycle shortens again, but the translation layer between design intent and engineering output survives.' },
      { year: '2016', milestone: 'Design Systems at Scale', description: 'Component libraries, tokens, shared languages between design and engineering. The handoff gets more structured. But it is still a handoff.' },
      { year: '2024', milestone: 'AI-Assisted Creation', description: 'Large language models write code from natural language. The gap collapses. But without design thinking, without systems architecture, without craft, it is just vibe coding. Fast, but fragile.' },
      { year: '2026', milestone: 'Zero-Vector Design', description: 'The designer builds the artifact directly, with AI agents as crew, across every phase of concept to customer. No intermediary. No translation layer. The gap is zero.' },
    ],
  },

  pipeline: {
    number: '003',
    title: 'The Pipeline, Reimagined',
    header: 'Every phase from concept to customer. Transformed.',
    intro: [
      'Zero-Vector Design is not about coding. It is an entire approach to going from concept to customer, closer to a business model than a methodology. You call it lean. You call it agile. You call it the double diamond. At the end of the day, it is all the same loosely defined process: shorten the distance between what people actually need to solve their problems and fix their pain, and what they want to enhance their lives and deliver outcomes. That is jobs-to-be-done theory at its core.',
      'Zero-Vector applies that thinking across every phase of the pipeline. Not just the build. The research. The synthesis. The validation. The shipping. Every handoff is a place where intent degrades. We eliminate the handoffs.',
    ],
    phases: [
      { id: 'research-market', name: 'Market Research', old: 'Weeks of desk research, PDF reports nobody reads, insights buried in slide decks.', new: 'AI agents continuously scanning, synthesizing, and surfacing market signals in real-time.' },
      { id: 'research-customer', name: 'Customer Research', old: 'Six-week interview cycles, manual transcription, insight synthesis by committee.', new: 'Your entire research corpus indexed and queried in natural language. Every insight at your fingertips.' },
      { id: 'jtbd', name: 'Jobs to Be Done', old: 'Workshops, sticky notes, frameworks that take longer to explain than to apply.', new: 'AI agents extract jobs-to-be-done directly from research data. Pattern recognition at scale.' },
      { id: 'ideation', name: 'Ideation', old: 'Brainstorming sessions that favor the loudest voice. Diverge, converge, repeat.', new: 'Structured ideation with AI agents that challenge assumptions and expand the solution space.' },
      { id: 'prototyping', name: 'Prototyping', old: 'High-fidelity mockups in Figma. Clickable prototypes that look real but are not.', new: 'Build the real thing. Working code. Real data. Ship-ready from the start.' },
      { id: 'validation', name: 'Validation', old: 'Usability testing on prototypes. Testing the picture, not the product.', new: 'Test the actual product. Real interactions. Real performance. Real feedback.' },
      { id: 'build-ship', name: 'Build + Ship', old: 'Hand off to engineering. Redline specs. "Can you make it pixel-perfect?" No. They cannot.', new: 'There is no handoff. The designer built it. The agents built it. It ships.' },
    ],
  },

  principles: {
    number: '004',
    title: 'The Seven Principles',
    principle_zero: 'Take from all that which is around you and make of it something more.',
    intro: 'These principles are intentionally opinionated. They exist to help you make decisions in times of indecision or crisis, not to be generic or all-purpose. Opinionated on approach, agnostic on tool.',
    items: [
      { numeral: 'I', title: 'Work in the Medium.', body: 'Build in the real material, not a representation of it. Hands on the rock. No gloves.' },
      { numeral: 'II', title: 'Boundaryless by Nature.', body: 'No lanes. No disciplines. No artificial walls between thinking and making.' },
      { numeral: 'III', title: 'The Medium is the Message.', body: 'The tool shapes the thinking. Change the medium, change the mind.' },
      { numeral: 'IV', title: 'The Purpose of a System is What It Does.', body: 'Do not look at what a process claims to produce. Look at what it actually produces.' },
      { numeral: 'V', title: 'Design and Build are the Same Act.', body: 'The design is the build. The build is the design. There is no handoff because there is no separation.' },
      { numeral: 'VI', title: 'Dissolve the Hyperspecialization.', body: 'Specialization is for insects. Your role is not designer or developer. Your role is auteur.' },
      { numeral: 'VII', title: 'Venture Past the Possible.', body: 'The only way to discover the limits of the possible is to venture past them into the impossible.' },
    ],
  },

  contrasts: {
    number: '005',
    title: 'What This Is Not. What This Is.',
    pairs: [
      {
        isNot: {
          title: 'Vibe coding.',
          body: 'Pointing an AI at a screenshot and saying \'make this.\' No architecture. No systems thinking. No intention beyond \'it looks right.\' Vibe coding produces trinkets. Pretty, fragile, disposable things that break the moment you need them to scale, adapt, or survive contact with real users.',
        },
        is: {
          title: 'Intentional creation at full velocity.',
          body: 'You bring the systems thinking, the architecture, the years of knowing what good looks like. The AI extends your reach, not your judgment. Speed without intention is just faster failure. Speed with intention is leverage.',
        },
      },
      {
        isNot: {
          title: 'AI replaces designers.',
          body: 'That narrative serves two groups: executives who want to cut headcount, and pundits who want engagement. Neither of them are building anything. The replacement framing assumes designers were only valuable for pixel output. If that is all you did, then yes, you have a problem. But that was never the job.',
        },
        is: {
          title: 'The designer embedded deeper than ever.',
          body: 'The person with the vision ships the vision. No translation. No telephone game. No \'that is not what I meant\' in sprint review. You are not removed from the process. You are finally, fully in it. The friction that kept you at arm\'s length from your own work is gone.',
        },
      },
      {
        isNot: {
          title: 'Tool worship.',
          body: 'It is not \'use Claude.\' It is not \'learn Cursor.\' It is not \'drop Figma.\' Tools are vectors, not destinations. The moment you define yourself by a tool, you have built your own cage.',
        },
        is: {
          title: 'Tool fluency.',
          body: 'Use whatever shortens the distance between intent and artifact. Today that might be Claude Code. Tomorrow it might be something that does not exist yet. The principle survives the tool. If your methodology dies when the tool changes, it was never a methodology. It was a dependency.',
        },
      },
      {
        isNot: {
          title: 'Moving fast and breaking things.',
          body: 'That phrase was an excuse to ship garbage and call it iteration. Speed without standards is just chaos with a deployment pipeline.',
        },
        is: {
          title: 'Moving fast and building things that hold.',
          body: 'Craft and velocity are not opposites. They never were. The old constraint was that quality took time because translation took time. Remove the translation, and quality and speed stop being tradeoffs. You can have both. You should demand both.',
        },
      },
      {
        isNot: {
          title: 'The death of craft.',
          body: 'If anything, it is the opposite. When you are no longer spending 80% of your energy on translation and handoff logistics, you can spend that energy on the 1% that actually matters. The details. The moment in the interface that makes someone feel seen.',
        },
        is: {
          title: 'Craft, finally unshackled.',
          body: 'You spent years developing taste, judgment, and the ability to see what others miss. Those skills were always the point. The tools just kept getting in the way. Now they do not.',
        },
      },
    ],
  },

  closing: {
    number: '007',
    headline: 'Set Coordinates',
    permission: 'You do not have to accept the old way. You have permission to build what comes next.',
    body: 'The tools exist. The agents are ready. The only question is whether you are willing to stop drawing pictures of what you want and start building it.',
    paths: {
      builders: {
        eyebrow: 'For Practitioners',
        title: 'I want to build',
        description: 'You are a designer, engineer, or maker ready to adopt Zero-Vector Design in your own practice.',
        cta: 'Start building',
        link: '/for-builders',
      },
      leaders: {
        eyebrow: 'For Organizations',
        title: 'I want to transform',
        description: 'You lead a team, a department, or a company and want to bring Zero-Vector thinking to your organization.',
        cta: 'Start transforming',
        link: '/for-leaders',
      },
    },
    openVector: {
      badge: 'Now Live',
      title: 'The Open Vector',
      description: 'The full Zero-Vector curriculum. Free. Always free. Six levels, 60+ lessons, approach guides, and AI-powered learning tools.',
      cta: 'Start Learning',
      link: 'https://open.zerovector.design',
    },
    arroyo: {
      badge: 'Commercial',
      title: 'Arroyo Labs',
      description: 'Want Zero Vector applied to your product? Arroyo Labs delivers strategy, design, and engineering in a single engagement.',
      cta: 'Learn more',
      link: 'https://arroyo.zerovector.design',
    },
    substack: {
      text: 'Stay informed. New writing on design, AI, and building things that matter.',
      cta: 'Subscribe on Substack',
      url: 'https://erikaflowers.substack.com',
    },
  },

};

export default home;
