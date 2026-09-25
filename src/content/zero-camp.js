// Zero Camp — Content Layer
// "From Zero to Hero": the Zero to One bootcamp. Blank machine in,
// a clone of Erika's full dev stack (local + hosted) out.
//
// DRAFT: structure pass. Anything marked TBD is waiting on Erika.

const zeroCamp = {
  seo: {
    title: 'Zero Camp — From Zero to Hero',
    description: 'A live, small-cohort bootcamp. Start with a blank machine, leave with a working clone of a forward deployed engineer’s entire stack, local and hosted.',
  },

  hero: {
    kicker: 'Zero Camp \u00B7 Basic Training',
    titleTop: 'Zero',
    titleBottom: 'to Hero',
    lede: 'You get the same ship I fly, and basic training to fly it. After that, the galaxy is yours.',
    cta: { label: 'Claim a presale seat', href: '#waitlist' },
    ctaNote: '$999 presale \u00B7 Small live cohorts',
    manifest: {
      title: 'Flight Manifest',
      rows: [
        { key: 'Vessel', value: 'A machine just like mine' },
        { key: 'Crew', value: 'Claude Code agents, configured' },
        { key: 'Ground support', value: 'GitHub, Supabase, Netlify, and more' },
        { key: 'Training', value: 'Two live half-days + a capstone' },
        { key: 'Destination', value: 'Unwritten' },
      ],
    },
    trajectory: [
      { mark: '00', title: 'Zero Camp', note: 'You are here' },
      { mark: '01', title: 'Launching from Orbit', note: 'Next' },
      { mark: '\u221E', title: 'The galaxy', note: 'Yours to explore' },
    ],
  },

  promise: {
    title: 'Basic Training for Forward Deployed Engineers',
    body: [
      'A forward deployed engineer is one person who can take a real problem and ship a real product, end to end, with AI agents as crew. That takes a stack. Most people never get one assembled.',
      'Zero Camp is live, hands-on basic training. You bring a machine. I walk you through every install, every account, every hosted service, until your setup matches mine. The whole enchilada.',
    ],
    priceLabel: 'Presale',
    price: '$999',
    priceNote: 'Plus at least one month of the hosted services the stack runs on. Full breakdown below.',
    waitlistLabel: 'Presale seats open to the waitlist first.',
  },

  beforeAfter: {
    before: {
      label: 'Day zero',
      title: 'A blank machine',
      items: [
        'No terminal setup',
        'No accounts, no keys',
        'Tutorials that each cover one piece',
        'No idea how the pieces connect',
      ],
    },
    after: {
      label: 'Graduation',
      title: 'A machine just like mine',
      items: [
        'The same local toolchain I use every day',
        'Every hosted service signed up and wired in',
        'Claude Code running with a crew of agents',
        'A capstone project, live on the internet',
      ],
    },
  },

  loadout: {
    title: 'The Loadout',
    subtitle: 'What you walk away with. Two layers, both yours. (Draft list, final inventory TBD.)',
    columns: [
      {
        label: 'On your machine',
        items: [
          { name: 'Terminal + shell', desc: 'zsh, tmux, and the dotfiles that make them sing' },
          { name: 'Homebrew', desc: 'The package manager everything else installs through' },
          { name: 'Git + GitHub CLI', desc: 'Version control, the way the crew uses it' },
          { name: 'Node + Python', desc: 'The two runtimes the stack is built on' },
          { name: 'Claude Code', desc: 'Your agent crew, configured and ready' },
        ],
      },
      {
        label: 'In the cloud',
        items: [
          { name: 'GitHub', desc: 'Where your code lives' },
          { name: 'Claude', desc: 'The model behind the crew' },
          { name: 'Supabase', desc: 'Database and auth' },
          { name: 'Netlify', desc: 'Push to deploy, live on the web' },
          { name: 'Tailscale', desc: 'Your machines, on one private network' },
        ],
      },
    ],
  },

  format: {
    title: 'How It Runs',
    subtitle: 'Live. Small cohorts. Direct help, the moment you get stuck.',
    sessions: [
      {
        num: '01',
        title: 'Session One',
        time: 'Half day, live',
        desc: 'Blank machine to working local stack. Terminal, toolchain, accounts, keys. We follow along together on a fresh macOS machine, step by step.',
      },
      {
        num: '02',
        title: 'Session Two',
        time: 'Half day, live',
        desc: 'The hosted layer and the workflow on top. Database, deploys, private networking, and your agent crew doing real work.',
      },
      {
        num: '03',
        title: 'Capstone',
        time: 'Project',
        desc: 'Build one thing that uses everything. Ship it live. This is where the stack stops being a list and becomes yours.',
      },
    ],
  },

  cost: {
    title: 'What It Actually Costs',
    subtitle: 'No surprises at checkout. Here is the whole bill.',
    lines: [
      { item: 'Zero Camp tuition', amount: '$999', note: 'One time. Live instruction, capstone, and direct help.' },
      { item: 'Required services', amount: 'TBD / mo', note: 'At least one month. You keep the accounts and cancel whenever you want.' },
      { item: 'Your machine', amount: 'You bring it', note: 'A computer you are willing to dedicate to this. Requirements TBD.' },
    ],
  },

  fit: {
    title: 'Is This For You?',
    for: {
      label: 'Zero Camp is for',
      items: [
        'People who want to build, and have never had a real setup',
        'Designers, PMs, and career changers stepping into engineering',
        'Anyone tired of tutorials that stop at “hello world”',
      ],
    },
    notFor: {
      label: 'Zero Camp is not',
      items: [
        'A methodology course. That comes next.',
        'Self-paced video you will never finish',
        'A promise of a job. It is a promise of a stack.',
      ],
    },
  },

  next: {
    label: 'After Zero Camp',
    title: 'Launching from Orbit',
    body: 'Zero Camp gets you equipped. The follow-up takes you from equipped to shipping production grade products and services. Advanced execution, workflows, and methodology. Coming later.',
  },

  instructor: {
    title: 'Your Instructor',
    name: 'Erika Flowers',
    body: [
      'Thirty-one years in UX and service design. Now a forward deployed engineer who builds with a crew of AI agents every day. The stack you get in Zero Camp is the one I actually use. This page was built on it.',
    ],
  },

  faq: {
    title: 'Questions',
    items: [
      {
        q: 'Do I need to know how to code?',
        a: 'No. Zero Camp starts at zero. You need curiosity, a machine, and two half-days.',
      },
      {
        q: 'What computer do I need?',
        a: 'Any machine you are willing to dedicate to this. It does not need to be an always-on desktop. Exact requirements TBD.',
      },
      {
        q: 'How big are the classes?',
        a: 'Small, on purpose. Every student gets direct help in the moment. Cohort size TBD.',
      },
      {
        q: 'Why do I have to pay for services too?',
        a: 'Because you are leaving with the real stack, not a demo of it. The hosted services are part of the stack.',
      },
    ],
  },

  closing: {
    headline: 'Get on the Waitlist',
    body: 'Presale seats go to the waitlist first. Cohorts run through the end of the year.',
    notifyLabel: 'Join the Zero Camp waitlist.',
    tag: 'zero-camp',
  },
};

export default zeroCamp;
