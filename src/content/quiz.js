// Quiz Page — Content
// Part of the Zero-Vector content layer. See en.js for the combined export.

const quiz = {
  eyebrow: 'Assessment',
  title: 'Am I Vibe Coding?',
  subtitle: 'Answer five questions about your workflow. The manifesto will tell you where you stand.',
  questions: [
    { id: 'q1', label: '01', question: 'How do you go from idea to shipped product?', placeholder: 'Describe your typical workflow from concept to launch...' },
    { id: 'q2', label: '02', question: 'What happens between design and implementation?', placeholder: 'Is there a handoff? A spec? A conversation? Nothing?' },
    { id: 'q3', label: '03', question: 'How do you use AI in your workflow?', placeholder: 'Do you use AI agents? For what? How much direction do you give them?' },
    { id: 'q4', label: '04', question: 'How many people or roles touch a feature before it ships?', placeholder: 'Designer, engineer, PM, QA... who is in the chain?' },
    { id: 'q5', label: '05', question: 'What is your biggest frustration with your current process?', placeholder: 'Where does signal get lost? What makes you want to scream?' },
  ],
  // Personality archetypes based on score ranges
  archetypes: [
    {
      min: 0, max: 19,
      name: 'The Clipboard Whisperer',
      tagline: 'You are pasting prompts into ChatGPT and calling it a workflow.',
      description: 'You are at the beginning of the journey. AI is a novelty in your process, not a collaborator. The good news: the gap between where you are and where you could be is massive, and the path is clear.',
      color: '#ff6464',
      cta: { label: 'Start from the beginning', link: 'https://open.zerovector.design/learn' },
    },
    {
      min: 20, max: 39,
      name: 'The Vibe Coder',
      tagline: 'Speed without intention is just faster failure.',
      description: 'You are using AI tools, and you are getting results, but without architecture, without systems thinking, without the craft that makes things last. You are building fast. You need to build with intention.',
      color: '#ff9b64',
      cta: { label: 'Learn the difference', link: '/philosophy' },
    },
    {
      min: 40, max: 59,
      name: 'The Handoff Survivor',
      tagline: 'You know the pipeline is broken. You just have not burned it down yet.',
      description: 'You understand the problem. You feel the friction of handoffs, the signal loss, the gap between vision and artifact. You might even be using AI in meaningful ways. But you are still working within a structure that was not designed for this. Time to break out.',
      color: '#ffd364',
      cta: { label: 'See what is possible', link: '/for-builders' },
    },
    {
      min: 60, max: 79,
      name: 'The Pipeline Collapser',
      tagline: 'You are already building the future. Now make it systematic.',
      description: 'You are doing real work with AI agents. You are collapsing handoffs. You are shipping at a velocity that surprises people. The next step is making it repeatable, principled, and scalable. Not just for you, but for your team.',
      color: '#64d3ff',
      cta: { label: 'Go deeper', link: 'https://open.zerovector.design/learn' },
    },
    {
      min: 80, max: 100,
      name: 'The Auteur',
      tagline: 'You hold the vision. You ship the vision. No intermediary.',
      description: 'You are already practicing Zero-Vector Design, whether you called it that or not. You direct AI agents as crew. You build in the medium. The distance between your intent and your artifact is approaching zero. Welcome home.',
      color: '#00ff88',
      cta: { label: 'Join the crew', link: '/join' },
    },
  ],
};

export default quiz;
