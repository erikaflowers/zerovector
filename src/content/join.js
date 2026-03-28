const join = {
  eyebrow: 'Zero Vector Design \u2014 Open Positions',
  title: 'Join the Endurance',
  subtitle: 'We are looking for crew, not employees.',

  quote: {
    text: '\u201C [People] wanted for hazardous journey. Low wages, bitter cold, long hours of complete darkness. Safe return doubtful. Honour and recognition in event of success.\u201D',
    attribution: '\u2014 Ernest Shackleton, 1914 (apocryphal)',
  },

  bookNote: {
    text: 'If the name Shackleton means nothing to you yet, consider picking up',
    linkText: 'Endurance: Shackleton\u2019s Incredible Voyage',
    linkUrl: 'https://www.amazon.com/Endurance-Shackletons-Incredible-Alfred-Lansing/dp/B000BZ9A7S',
    suffix: 'by Alfred Lansing. It will help you understand the spirit of this application.',
  },

  intro: [
    'Zero Vector is building a discipline, not a company. Open source. Open methodology. Built in public. We are looking for crew, not employees.',
    'These are volunteer positions with a real mission, real standards, and real autonomy. You work directly with the founder. The pay is zero and the hours are yours to define. What we offer: authorship, influence, and a seat at the table of something new.',
  ],

  compensation: {
    title: 'What we offer',
    subtitle: 'The honest version.',
    paragraphs: [
      { label: 'Right now:', text: 'Nothing financial. Zero Vector Design LLC is real, newly formed, and pre-revenue. Anyone who joins is joining because the work matters.' },
      { label: 'When the work pays off:', text: 'Founding crew share in paid engagements, licensing revenue, and any partnership or investment events. Not as an afterthought. As named contributors with documented history. We will formalize revenue-sharing in writing before any money changes hands.' },
      { label: 'What this is not:', text: 'Not equity. No shares, no vesting, no cap tables. What we offer is a seat in the room, documented contribution, and a commitment that the people who tilled the soil eat first.' },
      { label: 'The honest version:', text: 'We cannot promise this will pay off. We believe it will. But belief is not a paycheck. If you need certainty, wait. If you can tolerate ambiguity in exchange for being part of something from the beginning, read on.' },
    ],
  },

  roles: [
    {
      id: 'framework',
      title: 'Framework Engineer',
      description: 'Evolve Investiture into a robust, adoptable scaffold. Quickstarts, boilerplates, documentation, refinement.',
      fullDescription: 'You help build the kernel. Investiture is the open scaffold that makes Zero Vector actually work, and right now it needs to evolve from \u201Cone person\u2019s build system\u201D to \u201Ca framework anyone can adopt.\u201D You should be comfortable reading and writing code (not necessarily expert-level, but fluent), opinionated about developer experience, and genuinely excited about making tools that make other people faster. Think: early Rails contributor energy.',
      bullets: [
        'Develop quickstart templates for common project types (React, Node, Python, etc.)',
        'Refine framework conventions, file structure standards, and documentation',
        'Build boilerplate generators so new practitioners go from zero to structured repo in minutes',
        'Stress-test Investiture by using it on real projects and filing what breaks',
        'Collaborate directly with the founder on architecture decisions',
      ],
    },
    {
      id: 'curriculum',
      title: 'Curriculum Steward',
      description: 'Own the Open Vector learning center. Edit, expand, improve. Make it a living resource, not a static wiki.',
      fullDescription: 'You are the editor-in-chief of the learning center. Open Vector is the free curriculum that teaches Zero Vector principles, and it needs someone who treats it like a living product, not a static wiki. You should have a background in education, content strategy, or instructional design. You care about whether people actually learn, not just whether the page exists.',
      bullets: [
        'Edit and refine existing Open Vector content for clarity and pedagogical flow',
        'Identify gaps in the learning path and commission or write new material',
        'Improve information architecture and navigation across the learning center',
        'Monitor engagement to understand what\u2019s landing and what needs rework',
        'Keep curriculum current as the methodology evolves',
      ],
    },
    {
      id: 'evangelist',
      title: 'ZV Evangelist',
      description: 'Get Zero Vector in front of the world. Articles, podcasts, case studies, conference submissions, partnerships.',
      fullDescription: 'Your job is making Zero Vector so visible and so well-articulated that the right people cannot ignore it. You pitch editors, book guest appearances, coordinate case study production with practitioners, and help shape the public narrative. The north star: ZV becomes a recognized discipline, not a niche blog. You should have experience in PR, developer relations, content marketing, or community building. You know how to get ideas into rooms where decisions get made.',
      bullets: [
        'Pitch editors, podcast hosts, and conference organizers',
        'Book guest appearances and coordinate speaking opportunities',
        'Produce case studies with real practitioners using the methodology',
        'Shape the public narrative around design-led engineering with AI',
        'Build relationships with publications, communities, and industry voices',
      ],
    },
    {
      id: 'funding',
      title: 'Funding Scout',
      description: 'Find grants, partnerships, and funding that sustain the mission without surrendering control of it.',
      fullDescription: 'You help us find money that does not cost us the mission. Grants, no-strings partnerships, innovation funds, accelerator programs that trade visibility for involvement rather than control. We will take less money to maintain ownership. We will share credit generously. But we will not hand over strategic direction to someone who does not understand what we are building. You should know the landscape of grants (NEA, NSF, Mozilla, indie fund programs), understand term sheets well enough to spot poison pills, and believe that open source and sustainability are not mutually exclusive.',
      bullets: [
        'Research and identify grants, innovation funds, and non-dilutive funding programs',
        'Evaluate opportunities for mission alignment and control implications',
        'Draft proposals and applications for qualified funding sources',
        'Vet term sheets and partnership structures for poison pills',
        'Build a pipeline of sustainable funding that preserves independence',
      ],
    },
    {
      id: 'visual_architect',
      title: 'Visual Architect',
      subtitle: 'a.k.a. \u201CDesign Alchemist\u201D',
      description: 'Bridge the gap between AI-generated interfaces and genuinely beautiful design. Track the evolving landscape of visual AI tools, bring taste and craft to everything Zero Vector ships.',
      fullDescription: 'You are the eye. Zero Vector has engineers, strategists, and evangelists \u2014 but we need someone whose first instinct is visual. Someone who looks at a page and immediately sees what is wrong with the spacing, the type hierarchy, the color relationships. You track the rapidly evolving landscape of AI design tools (Figma + Claude, Magic Patterns, Subframe, Pencil, v0) and know which ones produce real craft versus which ones produce clip art. You bring taste to everything we ship.',
      bullets: [
        'Evaluate and recommend AI design tools as they emerge \u2014 separate signal from noise',
        'Establish visual standards and design language across Zero Vector properties',
        'Review and refine AI-generated interfaces before they ship \u2014 the human quality gate',
        'Create design assets, mockups, and visual prototypes for new features',
        'Collaborate with the founder on the visual identity of the brand and methodology',
      ],
    },
    {
      id: 'intern',
      title: 'Kestrel Intern',
      badge: 'NEW',
      description: 'Learn Zero Vector by doing it. Operate an AI agent, follow real workflows, ship real contributions. Mentored by the founder.',
      fullDescription: 'This is the entry point. You do not need experience \u2014 you need willingness. As a Kestrel Intern, you will be assigned a numbered AI agent (your \u201CKestrel\u201D) and given real tasks on real Zero Vector projects. You will learn Git, learn how to operate AI coding assistants, learn how to follow structured workflows, and ship actual contributions that go into production. The founder mentors you directly. The goal: in 90 days, you are no longer an intern.',
      bullets: [
        'Operate a numbered Kestrel agent on assigned tasks \u2014 QA, content fixes, small features',
        'Learn Git, GitHub, and pull request workflows by doing them',
        'Follow Investiture scaffolding patterns on real codebases',
        'Document what you learn so the next intern has a better path',
        'Graduate from intern to crew when you can operate independently',
      ],
    },
  ],

  authPrompt: {
    heading: 'Ready to apply?',
    text: 'Sign in with Google to begin your application. Your name and email will be pulled from your Google account \u2014 no anonymous submissions.',
    buttonText: 'Sign in with Google',
  },

  whoYouAre: {
    title: 'Who you are',
    subtitle: 'The basics.',
    fields: [
      { name: 'pronouns', label: 'Pronouns', type: 'text', required: true, placeholder: 'e.g. she/her, they/them', inline: 'left' },
      { name: 'location', label: 'Location', type: 'text', required: true, hintBelow: 'City, country. Remote is fine. Time zone matters.', inline: 'right' },
      { name: 'portfolio', label: 'Link to your work', type: 'url', required: true, hint: 'Portfolio, GitHub, LinkedIn, personal site, published writing. Whatever shows us who you are.' },
      { name: 'portfolio2', label: 'Second link', type: 'url', required: true },
    ],
  },

  enduranceTest: {
    title: 'The Endurance test',
    subtitle: 'These questions have no right answers. They have revealing ones.',
    fields: [
      { name: 'why_this', label: 'Why this?', type: 'textarea', size: 'long', required: true, hint: 'Not \u201Cwhy Zero Vector is cool.\u201D Why you. Why now. What is driving you toward this specific mission at this specific moment in your life?' },
      { name: 'built_unpaid', label: 'What have you built that nobody asked you to build?', type: 'textarea', required: true, hint: 'A side project, an open source contribution, a community, a curriculum, a zine. Something you made because you had to, not because someone paid you to.' },
      { name: 'endurance_story', label: 'Describe a time you stuck with something long after it stopped being fun.', type: 'textarea', required: true, hint: 'Endurance is not about the exciting parts. It is about Tuesday at 11pm when nothing works and nobody is watching.' },
      { name: 'ai_relationship', label: 'What is your relationship with AI tools right now?', type: 'textarea', size: 'short', required: true, hint: 'Be honest. \u201CI barely use them\u201D is a valid answer. \u201CI use Claude 14 hours a day\u201D is also valid. We want to know where you actually are, not where you think we want you to be.' },
      { name: 'hours', label: 'Hours per week you can realistically commit', type: 'select', required: true, hint: 'Be honest. 3 hours of consistent weekly work beats 20 hours for two weeks then silence.', options: [
        { value: '1-3', label: '1\u20133 hours' },
        { value: '4-8', label: '4\u20138 hours' },
        { value: '8-15', label: '8\u201315 hours' },
        { value: '15+', label: '15+ hours' },
      ]},
      { name: 'runway', label: 'How long are you willing to work for free before deciding this is not worth it?', type: 'select', required: true, hint: 'There is no wrong answer. There is an honest one.', options: [
        { value: '1month', label: 'About a month' },
        { value: '3months', label: '3 months' },
        { value: '6months', label: '6 months' },
        { value: 'indefinite', label: 'As long as the work matters' },
        { value: 'depends', label: 'It depends (explain in the box below)' },
      ]},
    ],
  },

  roleQuestions: {
    framework: {
      title: 'Framework Engineer \u2014 specifics',
      subtitle: 'We need to know you can work in the medium.',
      fields: [
        { name: 'fw_stack', label: 'What is your primary tech stack?', type: 'textarea', size: 'short', required: true, hint: 'Languages, frameworks, tools you reach for first.' },
        { name: 'fw_oss', label: 'Have you contributed to an open source project?', type: 'textarea', required: true, hint: 'Link to a PR, issue, or repo. If not, describe the closest equivalent (internal tooling, shared libraries, etc).' },
        { name: 'fw_investiture', label: 'Investiture is a scaffold for AI-assisted development. What does that mean to you?', type: 'textarea', size: 'long', required: true, hint: 'If you have looked at the framework, tell us what you think it gets right and wrong. If you have not, tell us what you would expect it to contain.' },
        { name: 'fw_dx', label: 'Describe the best developer experience you have ever encountered and what made it good.', type: 'textarea', size: 'short', required: true },
      ],
    },
    curriculum: {
      title: 'Curriculum Steward \u2014 specifics',
      subtitle: 'Content without craft is noise. We need a gardener, not a content farm.',
      fields: [
        { name: 'cur_sample', label: 'Link to something you have written, edited, or curated that you are proud of.', type: 'url', required: true, hint: 'An article, a course, a documentation site, a resource collection. Something that shows how you think about teaching.' },
        { name: 'cur_scenario', label: 'You inherit a learning site with 30 pages of content, inconsistent formatting, and no clear learning path. What do you do first?', type: 'textarea', size: 'long', required: true, hint: 'Walk us through your first 48 hours.' },
        { name: 'cur_philosophy', label: 'What is the difference between content that exists and content that teaches?', type: 'textarea', size: 'short', required: true },
        { name: 'cur_technical', label: 'Are you comfortable working in markdown, Git, and static site generators?', type: 'select', required: true, options: [
          { value: 'fluent', label: 'Yes, fluent' },
          { value: 'learning', label: 'Learning, but can manage' },
          { value: 'no', label: 'No, but willing to learn' },
        ]},
      ],
    },
    evangelist: {
      title: 'ZV Evangelist \u2014 specifics',
      subtitle: 'Getting ideas into rooms where decisions get made.',
      fields: [
        { name: 'ev_win', label: 'Have you ever gotten someone else\u2019s work featured, published, or covered?', type: 'textarea', required: true, hint: 'PR, DevRel, community management, content marketing, podcast booking. Tell us about a win.' },
        { name: 'ev_pitch', label: 'You have 30 seconds to explain Zero Vector to a design director who has never heard of it. Go.', type: 'textarea', required: true, hint: 'Write it out. This is an audition.' },
        { name: 'ev_targets', label: 'Name 3 podcasts, publications, or conferences where ZV should appear and why each one specifically.', type: 'textarea', size: 'long', required: true },
        { name: 'ev_network', label: 'What is your existing audience or network?', type: 'textarea', size: 'short', required: true, hint: 'LinkedIn followers, newsletter subscribers, community memberships, conference speaking history. Be specific with numbers.' },
      ],
    },
    funding: {
      title: 'Funding Scout \u2014 specifics',
      subtitle: 'Find money that does not cost us the mission.',
      fields: [
        { name: 'fund_experience', label: 'Have you ever secured a grant, investment, or non-dilutive funding for a project?', type: 'textarea', required: true, hint: 'Describe the project, the amount, and the source. If not, describe the closest equivalent experience.' },
        { name: 'fund_sources', label: 'Name 3 specific funding sources (grants, programs, foundations) that could apply to an open-source design methodology project and explain why each fits.', type: 'textarea', size: 'long', required: true, hint: 'This tests whether you actually know the landscape or are guessing.' },
        { name: 'fund_scenario', label: 'A funder offers $100K but wants a board seat and approval rights over the open source license. What do you advise?', type: 'textarea', required: true },
        { name: 'fund_philosophy', label: 'What does \u201Ctake less to maintain control\u201D mean to you in practice?', type: 'textarea', size: 'short', required: true },
      ],
    },
    visual_architect: {
      title: 'Visual Architect \u2014 specifics',
      subtitle: 'Heavy can implement a design. We need someone who can envision one.',
      fields: [
        { name: 'va_portfolio', label: 'Show us something beautiful you made.', type: 'url', required: true, hint: 'A site, an app, a component, a Figma file, a Dribbble shot. Something where the visual craft speaks for itself.' },
        { name: 'va_tools', label: 'What AI design tools are you currently using or evaluating?', type: 'textarea', required: true, hint: 'Figma + Claude, Magic Patterns, Subframe, Pencil, v0, something else? Tell us what you have actually tried, not what you have read about.' },
        { name: 'va_gap', label: 'What can a human designer do today that AI visual tools cannot?', type: 'textarea', size: 'long', required: true, hint: 'This is the core question. If you think AI can already do everything, this role is not for you. If you can articulate the gap precisely, we want to talk.' },
        { name: 'va_example', label: 'Show us a website or interface you think represents genuinely excellent visual design and explain what makes it work.', type: 'textarea', required: true, hint: 'Not \u201Cit looks clean.\u201D What specifically about the typography, color, spacing, motion, or composition makes it exceptional?' },
        { name: 'va_code', label: 'Are you comfortable working in React, HTML/CSS, or frontend code?', type: 'select', required: false, options: [
          { value: 'codes', label: 'Yes, I code my designs' },
          { value: 'tweaks', label: 'I can read and tweak code' },
          { value: 'tools_only', label: 'I work in design tools only' },
          { value: 'learning', label: 'I am learning' },
        ]},
      ],
    },
    intern: {
      title: 'Kestrel Intern \u2014 specifics',
      subtitle: 'No experience required. Willingness to learn is required.',
      fields: [
        { name: 'int_git', label: 'What is your comfort level with Git and GitHub?', type: 'select', required: true, options: [
          { value: 'never', label: 'Never used it' },
          { value: 'barely', label: 'I have a GitHub account but barely use it' },
          { value: 'comfortable', label: 'I can clone, branch, and commit' },
          { value: 'daily', label: 'I use Git daily' },
        ]},
        { name: 'int_ai', label: 'Have you used an AI coding assistant (Claude, Copilot, Cursor, etc)?', type: 'select', required: true, options: [
          { value: 'never', label: 'Never' },
          { value: 'few_times', label: 'A few times' },
          { value: 'regularly', label: 'Regularly' },
          { value: 'daily', label: 'It is part of my daily workflow' },
        ]},
        { name: 'int_task', label: 'Describe a small task you could imagine doing on a website you have never seen before.', type: 'textarea', required: true, hint: 'We are not looking for ambition. We are looking for pragmatism. \u201CCheck every page on mobile and screenshot what is broken\u201D is a great answer.' },
        { name: 'int_learn', label: 'What do you want to learn from this?', type: 'textarea', size: 'short', required: true, hint: 'Be specific. \u201CAI stuff\u201D is too vague. \u201CHow to use AI agents to do QA on a real codebase\u201D is specific.' },
      ],
    },
  },

  final: {
    title: 'Last thing',
    fields: [
      { name: 'anything_else', label: 'Anything else you want us to know?', type: 'textarea', size: 'short', required: true, hint: 'Use this however you want. A sentence is fine. A manifesto is fine. Show us how you think.' },
      { name: 'source', label: 'How did you find us?', type: 'select', required: true, options: [
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'substack', label: 'Substack' },
        { value: 'referral', label: 'Someone told me' },
        { value: 'github', label: 'GitHub / Open Vector site' },
        { value: 'podcast', label: 'Podcast' },
        { value: 'other', label: 'Other' },
      ]},
    ],
  },

  submit: {
    note: 'Applications are reviewed by the founder personally. You will hear back within two weeks. If we do not respond, assume we were not the right fit for each other. No ghosting \u2014 we will tell you either way.',
    buttonText: 'Submit Application',
  },

  success: {
    title: 'Application received.',
    body: 'We will review your application and respond within two weeks.\n\nIn the meantime, the work continues.',
  },

  epigraph: {
    text: '\u201CIf you want to build a ship, don\u2019t drum up people to collect wood and don\u2019t assign them tasks and work, but rather teach them to long for the endless immensity of the sea.\u201D',
    attribution: 'Antoine de Saint-Exup\u00E9ry',
  },
};

export default join;
