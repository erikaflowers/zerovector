// Philosophy Page — Content
// Part of the Zero-Vector content layer. See en.js for the combined export.

const philosophy = {
  eyebrow: 'The Framework',
  title: 'Philosophy',
  subtitle: 'A set of principles, an approach, and a community. Here is what Zero-Vector actually is, and why it exists.',

  what_it_is: [
    'Zero-Vector Design is a discipline for going from concept to customer without the translation layers that have defined product development for decades. Seven principles. An eight-phase pipeline. An open curriculum. A growing community of practitioners who build real things with AI agents as crew.',
    'One person holds the vision across the entire arc: research, synthesis, design, build, ship. The tools are the multiplier. The intent is yours.',
    'Zero-Vector is opinionated about approach and agnostic about tools. It does not care whether you use Claude or Cursor or whatever ships next Tuesday. It cares that you work in the medium, that you understand the problem before you build the solution, and that craft survives the transformation.',
  ],

  what_it_is_not: [
    { claim: 'It is not vibe coding.', explanation: 'Vibe coding is asking AI to write code from a vague prompt. Zero-Vector is the full pipeline: research, strategy, design thinking, validation, and building. The code is the last mile, not the whole journey.' },
    { claim: 'It is not a tool.', explanation: 'There is no Zero-Vector app. It is a practice, a discipline, a way of working. You bring your own tools. The agents are the multiplier.' },
    { claim: 'It is not anti-collaboration.', explanation: 'Teams still matter. But the handoff is dead. Collaboration happens around a shared artifact, not a shared picture of one.' },
    { claim: 'It is not only for designers.', explanation: 'Anyone who builds things for people can practice Zero-Vector. Designers, engineers, product managers, founders. If you ship, this is for you.' },
  ],

  principle_zero: {
    numeral: 'PRINCIPLE ZERO',
    title: 'Take from all that which is around you and make of it something more.',
  },

  principles: [
    {
      numeral: 'I',
      title: 'Work in the Medium.',
      body: 'A chef does not draw a picture of a meal. Build in the real material, not a representation of it.',
      why: 'This principle exists because decades of design practice trained us to work in abstractions: wireframes, mockups, prototypes. Those were necessary when the tools required specialists to build the real thing. They are not necessary anymore. When you work in the actual medium, the feedback is immediate, the constraints are real, and your decisions are about the artifact itself, not a picture of it.',
      detail: {
        text: [
          'When you design in Figma, you are working in a representation, a picture of the thing, not the thing itself. When you design in the actual medium with AI agents, you are working in the real material. The feedback is immediate. The constraints are real, not simulated. The discoveries you make are about the actual artifact.',
          'This is the difference between a sculptor working in clay and a sculptor working from a blueprint. One learns from the material. The other learns from an abstraction of it. Work in the medium means: touch the real thing. Every day. From the beginning.',
        ],
        links: [
          { label: 'The 20 Rules for AI-First Design', url: 'https://eflowers.substack.com/p/the-20-rules-for-ai-first-design' },
          { label: 'A Good Craftsperson Never Blames Their Tools', url: 'https://eflowers.substack.com/p/a-good-craftsperson-never-blames-their-tools' },
        ],
      },
    },
    {
      numeral: 'II',
      title: 'Boundaryless by Nature.',
      body: 'No lanes. No disciplines. No artificial walls between thinking and making.',
      why: 'This principle exists because organizational structure created artificial boundaries between research, design, and engineering. Those boundaries served management charts, not the work. When one person with AI agents can traverse the entire pipeline, the boundaries dissolve. Not because the skills stop mattering, but because they stop being separate activities.',
      detail: {
        text: [
          'Zero-Vector does not live inside "design" or "engineering" or "research." It is the practice of collapsing all of these into a single intentional flow. The practitioner does not ask "am I designing or building?", the question is irrelevant. You are making.',
          'The boundaries between disciplines were always artificial, created by tool limitations and organizational charts. When one person with AI agents can research, ideate, design, build, test, and ship, the boundaries dissolve, not because the skills stop mattering, but because they stop being separate activities.',
        ],
        links: [
          { label: 'Across the Designer-Verse', url: 'https://eflowers.substack.com/p/across-the-designer-verse' },
        ],
      },
    },
    {
      numeral: 'III',
      title: 'The Medium is the Message.',
      body: 'The tool shapes the thinking. Change the medium, change the mind.',
      why: 'This principle exists because Marshall McLuhan was right: the medium through which we work shapes how we think. Figma taught us to think in frames and layers. When your medium becomes working code with real interactions and real data, you stop asking "what does this look like?" and start asking "what does this do? How does it feel?" The questions change. The answers get dramatically better.',
      detail: {
        text: [
          'Marshall McLuhan wrote that the medium through which we receive information shapes how we process it. Television didn\'t just deliver content. It changed how we think. The same is true for design tools. Figma taught us to think in frames, layers, and components. It was a thinking tool disguised as a drawing tool.',
          'When your medium becomes the artifact itself, working code, real interactions, real data, your thinking shifts. You stop asking "what does this look like?" and start asking "what does this do? How does it feel? What happens when?" The questions change. And when the questions change, the answers get dramatically better.',
        ],
        links: [
          { label: 'Understanding Media, Marshall McLuhan', url: 'https://www.amazon.com/Understanding-Media-Extensions-Marshall-McLuhan/dp/0262631598' },
        ],
      },
    },
    {
      numeral: 'IV',
      title: 'The Purpose of a System is What It Does.',
      body: 'Do not look at what a process claims to produce. Look at what it actually produces.',
      why: 'This principle exists because Stafford Beer\'s POSIWID razor cuts through organizational self-deception. The traditional design-to-engineering pipeline claims to produce faithful implementations. What it actually produces is compromise. Redline specs that get "interpreted." Sprint reviews where the designer thinks "that is not what I meant." The old system\'s purpose was translation. Translation always loses signal.',
      detail: {
        text: [
          'POSIWID, the Purpose Of a System Is What It Does, is Stafford Beer\'s razor for cutting through organizational self-deception. Don\'t look at what a system claims to do. Look at what it actually produces.',
          'The traditional design-to-engineering pipeline claims to produce faithful implementations of design intent. What it actually produces is compromise. Redline specs that get "interpreted." Sprint reviews where the designer thinks "that is not what I meant." The system\'s purpose was never fidelity. It was translation. And translation always loses signal. Zero-Vector eliminates the translation. The system\'s purpose becomes: make the thing.',
        ],
        links: [
          { label: 'Thinking in Systems, Donella Meadows', url: 'https://www.amazon.com/Thinking-Systems-Donella-H-Meadows/dp/1603580557' },
        ],
      },
    },
    {
      numeral: 'V',
      title: 'Design and Build are the Same Act.',
      body: 'Not measure twice, cut once. Measure and cut simultaneously. The design is the build.',
      why: 'This principle exists because the handoff is the original sin of modern product development. A designer creates a picture of the thing and passes it to an engineer who interprets that picture into code. Information is lost at every step. Intent gets diluted. The designer\'s taste, the thing that separates adequate from extraordinary, cannot survive translation. When you eliminate the handoff, the taste is embedded directly in the artifact.',
      detail: {
        text: [
          'The handoff is the original sin of modern product development. A designer creates a detailed specification, a picture of the thing, and passes it to an engineer who interprets that picture into code. Information is lost at every step. Intent gets diluted. The designer\'s taste and micro-decisions, the things that separate adequate from extraordinary, cannot survive translation.',
          'In Zero-Vector, there is no handoff because the designer is building. The taste is embedded directly in the artifact. Every decision, from the architecture to the 1px shadow, comes from the person who holds the vision. The build IS the design act.',
        ],
        links: [
          { label: 'The 20 Rules for AI-First Design', url: 'https://eflowers.substack.com/p/the-20-rules-for-ai-first-design' },
          { label: 'Out of the Crisis, W. Edwards Deming', url: 'https://www.amazon.com/Out-Crisis-W-Edwards-Deming/dp/0262541157' },
        ],
      },
    },
    {
      numeral: 'VI',
      title: 'Dissolve the Hyperspecialization.',
      body: 'Specialization is for insects. Your role is not designer or developer. Your role is auteur.',
      why: 'This principle exists because the modern product team is a colony of insects, each specialist touching one facet of the same gem. Zero-Vector does not eliminate expertise. It eliminates the walls between experts. One person with deep knowledge and AI agents can traverse the entire pipeline. Not because they know everything, but because the agents fill the gaps while you hold the vision.',
      detail: {
        text: [
          '"A human being should be able to change a diaper, plan an invasion, butcher a hog, conn a ship, design a building, write a sonnet, balance accounts, build a wall, set a bone, comfort the dying, take orders, give orders, cooperate, act alone, solve equations, analyze a new problem, pitch manure, program a computer, cook a tasty meal, fight efficiently, die gallantly. Specialization is for insects." -- Robert A. Heinlein',
          'The modern product team is a colony of insects: UX researcher, interaction designer, visual designer, frontend engineer, backend engineer, QA, DevOps. Each specialist touching one facet of the same gem. Zero-Vector doesn\'t eliminate expertise. It eliminates the walls between experts. One person with deep knowledge and AI agents can traverse the entire pipeline. Not because they know everything, but because the agents fill the gaps.',
        ],
        links: [
          { label: 'Across the Designer-Verse', url: 'https://eflowers.substack.com/p/across-the-designer-verse' },
          { label: 'Out of the Crisis: Convergent Evolution', url: 'https://eflowers.substack.com/p/out-of-the-crisis' },
        ],
      },
    },
    {
      numeral: 'VII',
      title: 'Venture Past the Possible.',
      body: 'The only way to discover the limits of the possible is to venture past them into the impossible.',
      why: 'This principle exists because Arthur C. Clarke was right, and because the impossible keeps getting redefined. When someone says "a designer cannot build a production application," the answer is: watch. When someone says "you cannot replace a team of ten with one person and AI agents," the answer is: we already did. This is not arrogance. It is evidence. Accept the old definition of possible and you get left behind.',
      detail: {
        text: [
          'Arthur C. Clarke\'s Second Law: "The only way of discovering the limits of the possible is to venture a little way past them into the impossible." Every Zero-Vector practitioner lives in that margin.',
          'When someone says "a designer can\'t build a production application," the answer is: watch. When someone says "you can\'t replace a team of ten with one person and AI agents," the answer is: we already did. This is not arrogance. It is evidence. The impossible keeps getting redefined, and the people who accept the old definition are the ones who get left behind.',
        ],
        links: [
          { label: 'Out of the Crisis: Convergent Evolution', url: 'https://eflowers.substack.com/p/out-of-the-crisis' },
        ],
      },
    },
  ],

  arc: {
    title: 'The Arc',
    intro: 'Every framework you have ever learned is describing the same shape.',
    paragraphs: [
      'The double diamond. Lean. Agile. Design thinking. Jobs to be done. They all describe the same fundamental arc: understand the problem, explore solutions, converge on an answer, build it, ship it, learn. The words change. The shape underneath is identical.',
      'Zero-Vector does not replace your double diamond or your agile sprints or your lean cycles. It operates underneath them. It prescribes why you make decisions, not how you execute them. Use whatever process fits your mental model. Zero-Vector is the foundation beneath it.',
    ],
  },

  name_origin: {
    title: 'Why "Zero Vector"',
    teaser: 'It started as a joke about vector art tools. It ended up describing a principle: zero distance between what you envision and what gets built. The name means something different in every discipline, and the same thing in all of them.',
  },
};

export default philosophy;
