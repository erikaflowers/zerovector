// Approach Page — Content
// Part of the Zero-Vector content layer. See en.js for the combined export.

const approach = {
  eyebrow: 'The Approach',
  title: 'How It Works',
  subtitle: 'Eight phases from the seed of an idea to shipping it. Each one shown two ways: the timeless practice, and the Zero-Vector way.',

  intro: [
    'Each phase has two sides: what the activity actually is, and how Zero-Vector approaches it with AI agents as crew. You do not have to follow them in order. Understanding what each one is gives you the vocabulary to make intentional decisions about where to invest your time.',
  ],

  phases: [
    {
      id: 'problem-framing',
      name: 'Problem Framing',
      number: '01',
      agnostic: [
        'Before you research, sketch, or build, articulate what problem you are solving. What is the actual pain? Who feels it? How do they cope today? Most failed products solved the wrong problem, not the wrong solution.',
      ],
      zeroVector: [
        'Fall in love with the problem, not the solution. Use AI agents to explore the problem space: document your assumptions, challenge them, map existing solutions. Write a problem brief, not a product spec. The first thing you build is understanding.',
      ],
    },
    {
      id: 'research-market',
      name: 'Market Research',
      number: '02',
      agnostic: [
        'Understand what exists. Who are the competitors? What are they charging? Where are the gaps? Develop an honest picture of the landscape your product will enter. Blue ocean or red ocean, you need to know which one you are swimming in.',
      ],
      zeroVector: [
        'AI agents scan competitors, synthesize reviews, and identify gaps faster than any analyst. Market research is no longer a phase you complete and move on from. With agents, it becomes a continuous signal, queryable and connected to every decision downstream.',
      ],
    },
    {
      id: 'research-customer',
      name: 'Customer Research',
      number: '03',
      agnostic: [
        'Talk to the people who have the problem. Not surveys. Conversations. What do they do today? Where does it break? What do they wish existed? You cannot build for people if you have not listened to people. No AI replaces hearing someone describe their frustration in their own words.',
      ],
      zeroVector: [
        'Record interviews and have agents transcribe, tag, and index them into a queryable corpus. Every insight becomes searchable. Instead of waiting two weeks for synthesis, synthesis happens during the interview. The research stays live.',
      ],
    },
    {
      id: 'jtbd',
      name: 'Jobs to Be Done',
      number: '04',
      agnostic: [
        'People do not buy products. They hire them to do a job. JTBD connects customer research to product decisions: what outcome is this person trying to achieve, and what prevents them? The answers define what to build and what to leave out.',
      ],
      zeroVector: [
        'AI agents surface job statements from qualitative data that you might have missed. They find connections between seemingly unrelated frustrations. Let the agents extract the patterns, then you validate and refine. Your judgment decides which jobs matter. The agents make sure you do not miss the signal.',
      ],
    },
    {
      id: 'ideation',
      name: 'Ideation',
      number: '05',
      agnostic: [
        'Generate and explore possible solutions. Divergent thinking first, convergent later. Most brainstorming fails because people evaluate while generating. The loudest voice wins. The most creative idea dies in the first five minutes.',
      ],
      zeroVector: [
        'AI agents are ideation partners that never tire, never judge prematurely, and have no ego. They generate fifty variations in seconds, challenge your assumptions with evidence from your research, and push you into solution spaces you would not have explored alone.',
      ],
    },
    {
      id: 'prototyping',
      name: 'Prototyping',
      number: '06',
      agnostic: [
        'Make a version of the thing so you can test it. Traditional prototypes simulate the experience without being the product. The problem: they lie. A Figma prototype shows what something looks like, not what it does. You are testing a picture and calling it validation.',
      ],
      zeroVector: [
        'The prototype is the product. When AI agents help you build working code from the start, you skip the picture and go straight to the thing itself. Your first attempt is real. You iterate on actual software, not a simulation. The feedback is honest.',
      ],
    },
    {
      id: 'validation',
      name: 'Validation',
      number: '07',
      agnostic: [
        'Put your product in front of real people. Good validation is humble. It assumes you got things wrong and seeks to find out where. It is not a demo. It is watching people use the thing and seeing where they struggle, delight, and abandon.',
      ],
      zeroVector: [
        'Because you built the real thing, your validation is real. People test actual software, not a prototype. AI agents synthesize feedback at scale, connecting insights back to your problem framing and JTBD work, closing the loop across the entire arc.',
      ],
    },
    {
      id: 'build-ship',
      name: 'Build + Ship',
      number: '08',
      agnostic: [
        'Get the product into the hands of the people who need it. Shipping is not a single event. It is a continuous practice: deploy, learn, iterate, deploy again. Most products die here not because the product is bad, but because the ship was botched.',
      ],
      zeroVector: [
        'There is no handoff to engineering because you built it. There is no "dev complete" because design and development were the same act. You ship what you envisioned because you are the one who built it. The agents handle deployment. You focus on the experience. The gap is zero.',
      ],
    },
  ],
};

export default approach;
