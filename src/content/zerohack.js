// Zero Hack — Content Layer
// The first Zero Vector Design hackathon.

const zerohack = {
  nav: {
    brand: 'Zero Hack',
    back: 'Zero Vector',
    backUrl: '/',
    cta: 'Apply Now',
  },

  hero: {
    headlineTop: 'ZERO',
    headlineBottom: 'HACK',
    subline: 'Build for a person. Not a demo.',
    date: 'April 26\u201327, 2026',
    format: 'Two days. Four sessions. Virtual.',
    cta: 'Apply Now',
    ctaUrl: '/zerohack/apply',
  },

  whatIs: {
    label: '\u201CWhat am I signing up for?\u201D',
    headline: 'This is not your startup weekend.',
    body: [
      'Zero Hack is a two-day virtual hackathon where teams build real products for real users. No toy demos. No pitch decks. You start with a person and their problem. You scaffold with the Zero Vector methodology. You build, you test with actual humans, and you present a working product.',
      'Methodology matters as much as code.',
    ],
  },

  structure: {
    label: '\u201CWhat does the weekend look like?\u201D',
    headline: 'Four sessions. One through-line.',
    sessions: [
      {
        day: 'Day 1',
        num: '01',
        title: 'Problem & People',
        time: 'Morning \u2014 4 hours',
        desc: 'Define your user. Frame their problem. Populate your VECTOR.md with real research. No code yet \u2014 you\u2019re earning the right to build.',
      },
      {
        day: 'Day 1',
        num: '02',
        title: 'Stack & Scaffold',
        time: 'Evening \u2014 4 hours',
        desc: 'Pick your stack. Wire your environment. Lay the architecture. By the end of tonight, you have a repo with intent behind it.',
      },
      {
        day: 'Day 2',
        num: '03',
        title: 'Build & Validate',
        time: 'Morning \u2014 4 hours',
        desc: 'Code. Ship. Then recruit 3\u20135 real users and put it in their hands. Their feedback is your compass for the final session.',
      },
      {
        day: 'Day 2',
        num: '04',
        title: 'Polish & Present',
        time: 'Evening \u2014 4 hours',
        desc: 'Sharpen what the users told you matters. Then demo it \u2014 not as a pitch, but as proof that you listened.',
      },
    ],
  },

  judging: {
    label: '\u201CHow do I win?\u201D',
    headline: 'The rubric is the curriculum.',
    note: 'Published before the event starts. No secrets, no surprises. You know exactly how to win before you write a line of code.',
    categories: [
      {
        weight: '25%',
        name: 'Problem Definition',
        question: 'Is the user real?',
        desc: 'Can you name them? Describe their day? Explain what\u2019s broken in their workflow without hand-waving? Start there or don\u2019t start.',
      },
      {
        weight: '25%',
        name: 'Methodology',
        question: 'Did you follow the process?',
        desc: 'VECTOR.md populated. Research documented. Architecture decisions recorded. The discipline is the differentiator.',
      },
      {
        weight: '25%',
        name: 'Technical Execution',
        question: 'Does it actually work?',
        desc: 'Running code. Real architecture. Something a user can touch. Not a mockup. Not a pitch deck.',
      },
      {
        weight: '25%',
        name: 'Customer Validation',
        question: 'Did real humans use it?',
        desc: 'You put it in front of 3\u20135 actual people. They gave you feedback. You changed something because of it. That\u2019s the whole game.',
      },
    ],
  },

  hosts: {
    label: '\u201CWho\u2019s running this?\u201D',
    headline: 'Your Hackathon Hosts',
    people: [
      {
        name: 'Erika Flowers',
        role: 'HOST \u00B7 FOUNDER',
        bio: '30 years of design leadership. Ex-NASA. Systems Auteur. The person who built Zero Vector and won a VR hackathon with clip-art.',
        photo: null,
      },
      {
        name: 'TBD',
        role: 'JUDGE',
        bio: 'Announcement coming soon.',
        photo: null,
      },
      {
        name: 'TBD',
        role: 'JUDGE',
        bio: 'Announcement coming soon.',
        photo: null,
      },
      {
        name: 'TBD',
        role: 'JUDGE',
        bio: 'Announcement coming soon.',
        photo: null,
      },
    ],
  },

  prizes: {
    label: '\u201CWhat do I take home?\u201D',
    headline: 'We\u2019re not giving away gift cards.',
    subline: 'We\u2019re giving away capability.',
    tiers: [
      { place: '1st', prize: 'Mac mini M4 home-lab kit', includes: '1 hour of dedicated setup time' },
      { place: '2nd', prize: 'Mac mini M4 home-lab kit', includes: '1 hour of dedicated setup time' },
      { place: '3rd', prize: 'Mac mini M4 home-lab kit', includes: '1 hour of dedicated setup time' },
    ],
    whyMacMini: {
      headline: 'Why a Mac mini?',
      body: 'Because agents don\u2019t sleep when you do. A Mac mini is an always-on home lab \u2014 your agents keep running when you close your laptop. Part of the prize is the setup: Tailscale for remote access from anywhere, tmux for persistent sessions, and the configuration to talk to your agents from your phone, your tablet, or a beach. Close the lid on your MacBook and your agents go dark. The mini stays awake.',
    },
    allParticipants: {
      label: 'EVERY PARTICIPANT WALKS AWAY WITH',
      items: [
        'Full Zero Vector methodology docs',
        'Lifetime community access',
        'Completion credential',
      ],
    },
  },

  register: {
    label: '\u201CI\u2019m in. How do I join?\u201D',
    headline: 'Your seat.',
    price: '$50',
    priceNote: 'Every dollar goes to prizes and the event. Zero Vector takes nothing.',
    applicationNote: 'The application itself is a design exercise. Describe a real person, a real problem, and your 2026 vision for solving it.',
    cta: 'Apply Now',
    ctaUrl: '/zerohack/apply',
  },

  footer: {
    brand: 'Zero Vector Design LLC',
    url: 'https://zerovector.design',
    tagline: 'Start with a person. End with a product.',
  },
};

export default zerohack;
