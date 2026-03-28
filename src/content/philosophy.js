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
    },
    {
      numeral: 'II',
      title: 'Boundaryless by Nature.',
      body: 'No lanes. No disciplines. No artificial walls between thinking and making.',
      why: 'This principle exists because organizational structure created artificial boundaries between research, design, and engineering. Those boundaries served management charts, not the work. When one person with AI agents can traverse the entire pipeline, the boundaries dissolve. Not because the skills stop mattering, but because they stop being separate activities.',
    },
    {
      numeral: 'III',
      title: 'The Medium is the Message.',
      body: 'The tool shapes the thinking. Change the medium, change the mind.',
      why: 'This principle exists because Marshall McLuhan was right: the medium through which we work shapes how we think. Figma taught us to think in frames and layers. When your medium becomes working code with real interactions and real data, you stop asking "what does this look like?" and start asking "what does this do? How does it feel?" The questions change. The answers get dramatically better.',
    },
    {
      numeral: 'IV',
      title: 'The Purpose of a System is What It Does.',
      body: 'Do not look at what a process claims to produce. Look at what it actually produces.',
      why: 'This principle exists because Stafford Beer\'s POSIWID razor cuts through organizational self-deception. The traditional design-to-engineering pipeline claims to produce faithful implementations. What it actually produces is compromise. Redline specs that get "interpreted." Sprint reviews where the designer thinks "that is not what I meant." The old system\'s purpose was translation. Translation always loses signal.',
    },
    {
      numeral: 'V',
      title: 'Design and Build are the Same Act.',
      body: 'Not measure twice, cut once. Measure and cut simultaneously. The design is the build.',
      why: 'This principle exists because the handoff is the original sin of modern product development. A designer creates a picture of the thing and passes it to an engineer who interprets that picture into code. Information is lost at every step. Intent gets diluted. The designer\'s taste, the thing that separates adequate from extraordinary, cannot survive translation. When you eliminate the handoff, the taste is embedded directly in the artifact.',
    },
    {
      numeral: 'VI',
      title: 'Dissolve the Hyperspecialization.',
      body: 'Specialization is for insects. Your role is not designer or developer. Your role is auteur.',
      why: 'This principle exists because the modern product team is a colony of insects, each specialist touching one facet of the same gem. Zero-Vector does not eliminate expertise. It eliminates the walls between experts. One person with deep knowledge and AI agents can traverse the entire pipeline. Not because they know everything, but because the agents fill the gaps while you hold the vision.',
    },
    {
      numeral: 'VII',
      title: 'Venture Past the Possible.',
      body: 'The only way to discover the limits of the possible is to venture past them into the impossible.',
      why: 'This principle exists because Arthur C. Clarke was right, and because the impossible keeps getting redefined. When someone says "a designer cannot build a production application," the answer is: watch. When someone says "you cannot replace a team of ten with one person and AI agents," the answer is: we already did. This is not arrogance. It is evidence. Accept the old definition of possible and you get left behind.',
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
