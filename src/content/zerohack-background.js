// Zero Hack Background Article — Content Layer
// The narrative behind Zero Hack: "The Janky Demo That Won".

const zerohackBackground = {
  title: 'The Janky Demo That Won',
  subtitle: 'We had the worst demo at a 2019 VR hackathon. We also had the only real problem.',
  body: [
    { type: 'p', text: 'I almost did not go.' },
    {
      type: 'p',
      text: 'It was 2019. I was living in Mountain View, deep in the Oculus ecosystem, spending most of my free time building VR prototypes and not much of anything else. A VR hackathon was happening in Palo Alto that weekend. Speakers from Google, from James Cameron\u2019s Lightstorm labs, from Stanford\u2019s HCI program. The kind of event I would normally sprint toward.',
    },
    {
      type: 'p',
      text: 'But I was in a bad stretch. Uncomfortable in my own skin in ways I could not yet name, not sleeping well, not feeling social. The couch was winning. I almost stayed home.',
    },
    { type: 'p', text: 'I went. And we won the whole thing.' },

    { type: 'h3', text: 'Five Strangers and a Whiteboard' },

    {
      type: 'p',
      text: 'The hackathon assigned teams randomly. Five strangers who had never met, given eight hours to build something in VR and present it to a panel of judges.',
    },
    {
      type: 'p',
      text: 'My team was not the team you would cast for a hackathon montage. An older Unity developer who had been building 3D environments since before most of the room had touched a headset. A young Muslim woman in a hijab who was quiet at first and turned out to be the sharpest systems thinker on the team. Three others who brought curiosity, mixed skills, and no clear direction.',
    },
    {
      type: 'p',
      text: 'Around us, the other teams were already sprinting. AR poker, VR art galleries, spatial audio toys. Slick, polished, impressive demos that would look great on a conference stage. Everyone was starting with the technology and working backward to something that justified using it.',
    },
    { type: 'p', text: 'And we had nothing.' },
    {
      type: 'p',
      segments: [
        { text: 'I watched the clock burn through the first hour with a growing frustration I recognized from years of design work. We had tools. We had talent. We had no ' },
        { text: 'problem', em: true },
        { text: '.' },
      ],
    },
    {
      type: 'p',
      text: 'So I did the thing I knew how to do. I pulled out a variation of the Intuit design-for-delight framework (something I had been adapting in my practice for years) and asked the team a question that changed everything.',
    },
    {
      type: 'p',
      emphasis: true,
      text: '\u201CWhat if we build something for Patton?\u201D',
    },

    { type: 'h3', text: 'Patton' },

    {
      type: 'p',
      text: 'Patton is a person I care about deeply. He has a disability that includes limited cognitive abilities, and VR is something I had been quietly experimenting with as a tool to help him navigate the world.',
    },
    {
      type: 'p',
      segments: [
        { text: 'Here is what you need to understand about Patton and VR: he experiences it at face value. There is no layer of abstraction, no ironic distance, no \u201CI know this is a simulation.\u201D When Patton puts on a headset and sees a room, he is ' },
        { text: 'in', em: true },
        { text: ' that room. When a character speaks to him, that character is real. The suspension of disbelief that the rest of us have to work toward? He starts there.' },
      ],
    },
    {
      type: 'p',
      text: 'This makes VR both extraordinary and dangerous for him. The right experience can teach him things that years of traditional instruction cannot. The wrong experience can terrify him. He has no filter that says \u201Cthis is not real.\u201D',
    },
    {
      type: 'p',
      text: 'I had been building small prototypes to test this. Nothing formal, nothing funded. Just a person I loved and a technology I believed could help him.',
    },
    {
      type: 'p',
      text: 'When I said his name to five strangers in a hackathon room, the energy shifted. We had a person. We had a problem. Now we had eight hours.',
    },

    { type: 'h3', text: 'The 2035 Vision' },

    { type: 'p', text: 'We did not design for 2019 technology. We designed for 2035.' },
    {
      type: 'p',
      text: 'The concept: AR glasses that overlay step-by-step instructions onto Patton\u2019s real environment. A LiDAR scan of the physical space creates a 3D map. A custom avatar character (friendly, patient, unambiguously helpful) appears in his field of vision and guides him through tasks.',
    },
    {
      type: 'p',
      text: 'Brush your teeth. The avatar highlights the toothbrush, the toothpaste, the sink. It walks through the sequence. It waits. It does not rush.',
    },
    {
      type: 'p',
      text: 'Navigate a train station. The avatar leads him through the crowd, highlighting exits, flagging hazards, pointing to the ticket counter. It turns an overwhelming, unsafe space into one he can move through with confidence.',
    },
    {
      type: 'p',
      segments: [
        { text: 'The gap between what we were designing and what we could actually build in the remaining hours was enormous. But the gap did not matter. The ' },
        { text: 'person', em: true },
        { text: ' mattered. And for the first time that day, every member of the team knew exactly who they were building for and exactly why.' },
      ],
    },

    { type: 'h3', text: 'Clip-Art and a Train Station' },

    { type: 'p', text: 'The demo was, to put it charitably, not good.' },
    {
      type: 'p',
      text: 'We managed to import a pre-built train station scene into Unity. We found a robot character asset that could stand in for the avatar guide. We created a clip-art prototype of the AR overlay interface and scripted a walkthrough showing how Patton could navigate the station with the avatar guiding him through each step.',
    },
    {
      type: 'p',
      text: 'By every technical metric, it was the worst demo in the room. The polygon count was laughable. The character animation was stiff. The \u201CAR overlay\u201D was a flat texture floating in midspace. Compared to teams running fluid spatial audio experiences and multiplayer VR environments, we looked like we had wandered in from a high school science fair.',
    },
    {
      type: 'p',
      text: 'Hackathons often reward the same failure mode over and over: start with a cool capability, wrap a thin story around it, and call that vision. You can feel the incentives pushing everyone toward polish instead of purpose. It makes for great stage moments and terrible products.',
    },
    {
      type: 'p',
      text: 'Hackathons have a habit of rewarding the most impressive technology and forgetting to ask who it serves.',
    },
    {
      type: 'p',
      text: 'But we could explain, in specific and human terms, who this was for, what problem it solved, and why it mattered. We had a person with a name. We had a need that was real. And we had a vision for how the technology \u2014 not today\u2019s technology, but the trajectory of where it was heading \u2014 could change that person\u2019s life.',
    },

    { type: 'h3', text: 'The Only Team That Solved a Real Problem' },

    {
      type: 'p',
      text: 'The judges included representatives from Google, Stanford\u2019s HCI lab, and (if memory serves) DreamWorks Animation. People who had seen thousands of demos. People who were not easily impressed by polygon counts.',
    },
    {
      type: 'p',
      emphasis: true,
      text: '\u201CThis is the only team that started with a person.\u201D',
    },
    {
      type: 'p',
      segments: [
        { text: 'That was the verdict. Not \u201Cbest demo.\u201D Not \u201Cmost technically impressive.\u201D The only team that used human-centered design. The only team that connected the what with the why. The only team that could answer the question every demo should be able to answer and almost none can: ' },
        { text: 'who is this for, and why do they need it?', em: true },
      ],
    },
    {
      type: 'p',
      text: 'We won. The prize was a Magic Leap Creator device (worth roughly three thousand dollars at the time), a main-stage presentation slot at AWE in San Jose, and a potential invitation to CES.',
    },
    {
      type: 'p',
      text: 'At AWE, we upgraded the demo, polished the prototype, and brought Patton on stage.',
    },
    {
      type: 'p',
      text: 'I will not pretend I remember the exact sequence. But I remember the crowd. I remember Patton standing next to me in front of hundreds of people, completely unfazed, because to him there was nothing unusual about being there. He was just being himself. The room understood, in a way that no slide deck could have conveyed, exactly who this technology was for and why it mattered.',
    },
    {
      type: 'p',
      text: 'We never made it to CES. Life took us in other directions. But the experience crystallized something I had been circling for years without being able to name it.',
    },
    {
      type: 'p',
      text: 'I would love to tell you I had always been principled about this, but that would not be true. I had my own little graveyard of clever prototypes built around what the tech could do rather than what a person needed. They were interesting for about five minutes, which is another way of saying they were not built on anything solid.',
    },

    { type: 'rule' },

    { type: 'h3', text: 'The Principle Before It Had a Name' },

    {
      type: 'p',
      text: 'Every other team at that hackathon started with the technology and worked backward to a use case. They asked: \u201CWhat can VR do?\u201D and then invented a reason for it to exist.',
    },
    {
      type: 'p',
      segments: [
        { text: 'We asked: \u201CWhat does Patton need?\u201D and figured out which tools could help. The technology was irrelevant. The clip-art was irrelevant. The janky Unity build was irrelevant. The ' },
        { text: 'intent', em: true },
        { text: ' was everything.' },
      ],
    },
    {
      type: 'p',
      text: 'Remember Google Daydream? Oculus Rooms? Facebook Spaces? Entire platforms that once arrived with the usual fanfare about the future and then quietly vanished. That is the thing about anchoring your idea to the tool: the tool has an expiration date.',
    },
    {
      type: 'p',
      text: 'I did not have a name for this in 2019. I just knew it worked. I knew it because the judges said so, and I knew it because I had been practicing it for two decades without formalizing it. Start with a person. Define a real problem. Build toward intent.',
    },
    {
      type: 'p',
      text: 'The \u201Ccool demo\u201D method is really just backward design with better lighting. Start with the trick, search for a narrative, and mistake audience excitement for evidence of value. It can win applause. It rarely earns durability.',
    },
    {
      type: 'p',
      emphasis: true,
      text: 'The janky demo won because it was the only demo that knew who it was for.',
    },
    {
      type: 'p',
      segments: [
        { text: 'In 2019, the tools were clip-art and a barely functional Unity scene. In 2026, the tools are AI agents that can generate working prototypes in minutes. The tools have changed completely. The principle has not changed at all: the distance between what a person needs and what gets built should be zero. No translation layers. No fidelity loss. No substituting ' },
        { text: 'impressive', em: true },
        { text: ' for ' },
        { text: 'meaningful', em: true },
        { text: '.' },
      ],
    },
    {
      type: 'p',
      text: 'You can replace clip-art with AI agents, Unity hacks with generated software, whiteboards with orchestration layers. None of that alters the core equation. A better tool only matters if it shortens the distance between need and execution.',
    },
    {
      type: 'p',
      text: 'I have been calling this Zero Vector. The offset between human intent and execution should be zero. It took six years to name what I already knew in that hackathon room with five strangers and a whiteboard.',
    },

    { type: 'rule' },

    { type: 'h3', text: 'We Are Doing This Again' },

    {
      type: 'p',
      text: 'That hackathon was six years ago. The tools have changed. The principle has not.',
    },
    { type: 'p', text: 'And now we are doing it again.' },
    {
      type: 'p',
      segments: [
        { text: 'Zero Hack is a hackathon built on a single rule: start with a person. Not a platform. Not a feature. Not an impressive demo. A person with a name and a problem worth solving. The tools are different now. The bar for what you can build in a day has moved from clip-art to production-grade. But the bar for what ' },
        { text: 'matters', em: true },
        { text: ' has not moved at all.' },
      ],
    },
    {
      type: 'p',
      text: 'I almost did not go to that hackathon in 2019. I was living in someone else\u2019s life, uncomfortable in my own skin, not sure I belonged in a room full of VR developers and Stanford researchers and Google engineers.',
    },
    {
      type: 'p',
      text: 'What it cost to show up that day is hard to explain without also explaining how estranged I was from myself back then. I was moving through the world with a constant background drag, spending energy on survival that other people got to spend on presence. Showing up at all felt heavier than it should have, which is maybe why the memory stayed with me.',
    },
    {
      type: 'p',
      text: 'But I went. And the thing I built for someone else turned out to be the thing that taught me what I was capable of.',
    },
    {
      type: 'p',
      text: 'It did not take a perfect team or a perfect demo. It took five strangers, a problem that mattered, and the willingness to build something real in public.',
    },
    {
      type: 'p',
      text: 'Zero Hack is May 9th and 10th. Applications open April 3rd.',
    },
    {
      type: 'p',
      text: 'You do not need a perfect demo. You do not need the best tools or the most polished technology. You need a person. You need a problem. And you need the willingness to build something janky and real instead of something polished and empty.',
    },
    {
      type: 'p',
      emphasis: true,
      text: 'Bring a person. Bring a problem. We will bring the tools.',
    },
  ],
};

export default zerohackBackground;
