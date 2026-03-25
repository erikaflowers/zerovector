import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import '../styles/site.css';
import en from '../content/en';

const { zerohack: zh } = en;

function ZerohackBackgroundPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useSEO({
    title: 'The Janky Demo That Won — Zero Hack Background',
    description: 'We had the worst demo at a 2019 VR hackathon. We also had the only real problem. The story behind Zero Hack.',
    path: '/zerohack/background',
  });

  useEffect(() => {
    document.body.style.background = '#1A0808';
    document.body.style.color = '#FFF5EB';
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';
    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
      document.body.style.minHeight = '';
    };
  }, []);

  return (
    <div className="zh-page">
      {/* Nav */}
      <nav className="zh-nav zh-nav--solid">
        <div className="zh-nav-inner">
          <div className="zh-nav-left">
            <Link to="/" className="zh-nav-back">&larr; Zero Vector</Link>
            <span className="zh-nav-sep" />
            <Link to="/zerohack" className="zh-nav-brand-link">Zero Hack</Link>
            <span className="zh-nav-sep" />
            <span className="zh-nav-brand">Background</span>
          </div>
          <Link to="/zerohack/apply" className="zh-nav-cta">
            {zh.nav.cta} &rarr;
          </Link>
        </div>
      </nav>

      <main>
      {/* Article */}
      <article className="zh-bg-article">
        <div className="zh-bg-container">
          <h1 className="zh-bg-title">The Janky Demo That Won</h1>
          <p className="zh-bg-subtitle">We had the worst demo at a 2019 VR hackathon. We also had the only real problem.</p>

          <p className="zh-bg-body">I almost did not go.</p>

          <p className="zh-bg-body">
            It was 2019. I was living in Mountain View, deep in the Oculus ecosystem, spending most of my free time building VR prototypes and not much of anything else. A VR hackathon was happening in Palo Alto that weekend. Speakers from Google, from James Cameron&rsquo;s Lightstorm labs, from Stanford&rsquo;s HCI program. The kind of event I would normally sprint toward.
          </p>

          <p className="zh-bg-body">
            But I was in a bad stretch. Uncomfortable in my own skin in ways I could not yet name, not sleeping well, not feeling social. The couch was winning. I almost stayed home.
          </p>

          <p className="zh-bg-body">I went. And we won the whole thing.</p>

          <h3 className="zh-bg-h3">Five Strangers and a Whiteboard</h3>

          <p className="zh-bg-body">
            The hackathon assigned teams randomly. Five strangers who had never met, given eight hours to build something in VR and present it to a panel of judges.
          </p>

          <p className="zh-bg-body">
            My team was not the team you would cast for a hackathon montage. An older Unity developer who had been building 3D environments since before most of the room had touched a headset. A young Muslim woman in a hijab who was quiet at first and turned out to be the sharpest systems thinker on the team. Three others who brought curiosity, mixed skills, and no clear direction.
          </p>

          <p className="zh-bg-body">
            Around us, the other teams were already sprinting. AR poker, VR art galleries, spatial audio toys. Slick, polished, impressive demos that would look great on a conference stage. Everyone was starting with the technology and working backward to something that justified using it.
          </p>

          <p className="zh-bg-body">And we had nothing.</p>

          <p className="zh-bg-body">
            I watched the clock burn through the first hour with a growing frustration I recognized from years of design work. We had tools. We had talent. We had no <em>problem</em>.
          </p>

          <p className="zh-bg-body">
            So I did the thing I knew how to do. I pulled out a variation of the Intuit design-for-delight framework (something I had been adapting in my practice for years) and asked the team a question that changed everything.
          </p>

          <p className="zh-bg-emphasis">&ldquo;What if we build something for Patton?&rdquo;</p>

          <h3 className="zh-bg-h3">Patton</h3>

          <p className="zh-bg-body">
            Patton is a person I care about deeply. He has a disability that includes limited cognitive abilities, and VR is something I had been quietly experimenting with as a tool to help him navigate the world.
          </p>

          <p className="zh-bg-body">
            Here is what you need to understand about Patton and VR: he experiences it at face value. There is no layer of abstraction, no ironic distance, no &ldquo;I know this is a simulation.&rdquo; When Patton puts on a headset and sees a room, he is <em>in</em> that room. When a character speaks to him, that character is real. The suspension of disbelief that the rest of us have to work toward? He starts there.
          </p>

          <p className="zh-bg-body">
            This makes VR both extraordinary and dangerous for him. The right experience can teach him things that years of traditional instruction cannot. The wrong experience can terrify him. He has no filter that says &ldquo;this is not real.&rdquo;
          </p>

          <p className="zh-bg-body">
            I had been building small prototypes to test this. Nothing formal, nothing funded. Just a person I loved and a technology I believed could help him.
          </p>

          <p className="zh-bg-body">
            When I said his name to five strangers in a hackathon room, the energy shifted. We had a person. We had a problem. Now we had eight hours.
          </p>

          <h3 className="zh-bg-h3">The 2035 Vision</h3>

          <p className="zh-bg-body">
            We did not design for 2019 technology. We designed for 2035.
          </p>

          <p className="zh-bg-body">
            The concept: AR glasses that overlay step-by-step instructions onto Patton&rsquo;s real environment. A LiDAR scan of the physical space creates a 3D map. A custom avatar character (friendly, patient, unambiguously helpful) appears in his field of vision and guides him through tasks.
          </p>

          <p className="zh-bg-body">
            Brush your teeth. The avatar highlights the toothbrush, the toothpaste, the sink. It walks through the sequence. It waits. It does not rush.
          </p>

          <p className="zh-bg-body">
            Navigate a train station. The avatar leads him through the crowd, highlighting exits, flagging hazards, pointing to the ticket counter. It turns an overwhelming, unsafe space into one he can move through with confidence.
          </p>

          <p className="zh-bg-body">
            The gap between what we were designing and what we could actually build in the remaining hours was enormous. But the gap did not matter. The <em>person</em> mattered. And for the first time that day, every member of the team knew exactly who they were building for and exactly why.
          </p>

          <h3 className="zh-bg-h3">Clip-Art and a Train Station</h3>

          <p className="zh-bg-body">
            The demo was, to put it charitably, not good.
          </p>

          <p className="zh-bg-body">
            We managed to import a pre-built train station scene into Unity. We found a robot character asset that could stand in for the avatar guide. We created a clip-art prototype of the AR overlay interface and scripted a walkthrough showing how Patton could navigate the station with the avatar guiding him through each step.
          </p>

          <p className="zh-bg-body">
            By every technical metric, it was the worst demo in the room. The polygon count was laughable. The character animation was stiff. The &ldquo;AR overlay&rdquo; was a flat texture floating in midspace. Compared to teams running fluid spatial audio experiences and multiplayer VR environments, we looked like we had wandered in from a high school science fair.
          </p>

          <p className="zh-bg-body">
            Hackathons often reward the same failure mode over and over: start with a cool capability, wrap a thin story around it, and call that vision. You can feel the incentives pushing everyone toward polish instead of purpose. It makes for great stage moments and terrible products.
          </p>

          <p className="zh-bg-body">
            Hackathons have a habit of rewarding the most impressive technology and forgetting to ask who it serves.
          </p>

          <p className="zh-bg-body">
            But we could explain, in specific and human terms, who this was for, what problem it solved, and why it mattered. We had a person with a name. We had a need that was real. And we had a vision for how the technology &mdash; not today&rsquo;s technology, but the trajectory of where it was heading &mdash; could change that person&rsquo;s life.
          </p>

          <h3 className="zh-bg-h3">The Only Team That Solved a Real Problem</h3>

          <p className="zh-bg-body">
            The judges included representatives from Google, Stanford&rsquo;s HCI lab, and (if memory serves) DreamWorks Animation. People who had seen thousands of demos. People who were not easily impressed by polygon counts.
          </p>

          <p className="zh-bg-emphasis">&ldquo;This is the only team that started with a person.&rdquo;</p>

          <p className="zh-bg-body">
            That was the verdict. Not &ldquo;best demo.&rdquo; Not &ldquo;most technically impressive.&rdquo; The only team that used human-centered design. The only team that connected the what with the why. The only team that could answer the question every demo should be able to answer and almost none can: <em>who is this for, and why do they need it?</em>
          </p>

          <p className="zh-bg-body">
            We won. The prize was a Magic Leap Creator device (worth roughly three thousand dollars at the time), a main-stage presentation slot at AWE in San Jose, and a potential invitation to CES.
          </p>

          <p className="zh-bg-body">
            At AWE, we upgraded the demo, polished the prototype, and brought Patton on stage.
          </p>

          <p className="zh-bg-body">
            I will not pretend I remember the exact sequence. But I remember the crowd. I remember Patton standing next to me in front of hundreds of people, completely unfazed, because to him there was nothing unusual about being there. He was just being himself. The room understood, in a way that no slide deck could have conveyed, exactly who this technology was for and why it mattered.
          </p>

          <p className="zh-bg-body">
            We never made it to CES. Life took us in other directions. But the experience crystallized something I had been circling for years without being able to name it.
          </p>

          <p className="zh-bg-body">
            I would love to tell you I had always been principled about this, but that would not be true. I had my own little graveyard of clever prototypes built around what the tech could do rather than what a person needed. They were interesting for about five minutes, which is another way of saying they were not built on anything solid.
          </p>

          <hr className="zh-bg-rule" />

          <h3 className="zh-bg-h3">The Principle Before It Had a Name</h3>

          <p className="zh-bg-body">
            Every other team at that hackathon started with the technology and worked backward to a use case. They asked: &ldquo;What can VR do?&rdquo; and then invented a reason for it to exist.
          </p>

          <p className="zh-bg-body">
            We asked: &ldquo;What does Patton need?&rdquo; and figured out which tools could help. The technology was irrelevant. The clip-art was irrelevant. The janky Unity build was irrelevant. The <em>intent</em> was everything.
          </p>

          <p className="zh-bg-body">
            Remember Google Daydream? Oculus Rooms? Facebook Spaces? Entire platforms that once arrived with the usual fanfare about the future and then quietly vanished. That is the thing about anchoring your idea to the tool: the tool has an expiration date.
          </p>

          <p className="zh-bg-body">
            I did not have a name for this in 2019. I just knew it worked. I knew it because the judges said so, and I knew it because I had been practicing it for two decades without formalizing it. Start with a person. Define a real problem. Build toward intent.
          </p>

          <p className="zh-bg-body">
            The &ldquo;cool demo&rdquo; method is really just backward design with better lighting. Start with the trick, search for a narrative, and mistake audience excitement for evidence of value. It can win applause. It rarely earns durability.
          </p>

          <p className="zh-bg-emphasis">The janky demo won because it was the only demo that knew who it was for.</p>

          <p className="zh-bg-body">
            In 2019, the tools were clip-art and a barely functional Unity scene. In 2026, the tools are AI agents that can generate working prototypes in minutes. The tools have changed completely. The principle has not changed at all: the distance between what a person needs and what gets built should be zero. No translation layers. No fidelity loss. No substituting <em>impressive</em> for <em>meaningful</em>.
          </p>

          <p className="zh-bg-body">
            You can replace clip-art with AI agents, Unity hacks with generated software, whiteboards with orchestration layers. None of that alters the core equation. A better tool only matters if it shortens the distance between need and execution.
          </p>

          <p className="zh-bg-body">
            I have been calling this Zero Vector. The offset between human intent and execution should be zero. It took six years to name what I already knew in that hackathon room with five strangers and a whiteboard.
          </p>

          <hr className="zh-bg-rule" />

          <h3 className="zh-bg-h3">We Are Doing This Again</h3>

          <p className="zh-bg-body">
            That hackathon was six years ago. The tools have changed. The principle has not.
          </p>

          <p className="zh-bg-body">And now we are doing it again.</p>

          <p className="zh-bg-body">
            Zero Hack is a hackathon built on a single rule: start with a person. Not a platform. Not a feature. Not an impressive demo. A person with a name and a problem worth solving. The tools are different now. The bar for what you can build in a day has moved from clip-art to production-grade. But the bar for what <em>matters</em> has not moved at all.
          </p>

          <p className="zh-bg-body">
            I almost did not go to that hackathon in 2019. I was living in someone else&rsquo;s life, uncomfortable in my own skin, not sure I belonged in a room full of VR developers and Stanford researchers and Google engineers.
          </p>

          <p className="zh-bg-body">
            What it cost to show up that day is hard to explain without also explaining how estranged I was from myself back then. I was moving through the world with a constant background drag, spending energy on survival that other people got to spend on presence. Showing up at all felt heavier than it should have, which is maybe why the memory stayed with me.
          </p>

          <p className="zh-bg-body">
            But I went. And the thing I built for someone else turned out to be the thing that taught me what I was capable of.
          </p>

          <p className="zh-bg-body">
            It did not take a perfect team or a perfect demo. It took five strangers, a problem that mattered, and the willingness to build something real in public.
          </p>

          <p className="zh-bg-body">
            Zero Hack is May 9th and 10th. Applications open April 3rd.
          </p>

          <p className="zh-bg-body">
            You do not need a perfect demo. You do not need the best tools or the most polished technology. You need a person. You need a problem. And you need the willingness to build something janky and real instead of something polished and empty.
          </p>

          <p className="zh-bg-emphasis">Bring a person. Bring a problem. We will bring the tools.</p>

          <div className="zh-bg-cta-block">
            <p>Ready?</p>
            <Link to="/zerohack/apply" className="zh-btn zh-btn--primary zh-btn--lg">
              Apply Now &rarr;
            </Link>
          </div>
        </div>
      </article>
      </main>

      {/* Footer */}
      <footer className="zh-footer">
        <div className="zh-footer-inner">
          <div className="zh-footer-brand">
            <a href={zh.footer.url} className="zh-footer-link">{zh.footer.brand}</a>
          </div>
          <div className="zh-footer-tagline">{zh.footer.tagline}</div>
        </div>
      </footer>
    </div>
  );
}

export default ZerohackBackgroundPage;
