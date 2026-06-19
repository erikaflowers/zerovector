# Todd's First Impressions — VECTOR.md + jtbd.json

---

## What Makes Sense

VECTOR.md is immediately recognisable — it's providing high-level strategic context. Here's the product, here's what it's not, here's what we believe, here's the research. That lands.

The jtbd.json is the summation of what you'd walk away from a JTBD workshop with. When I'm running workshops, I'm thinking about outcomes, goals, and making sure people understand what we're doing and how the steps we're taking turn into the thing we're going to use. Knowing the destination — seeing it this clearly in a JSON file — makes it easier to work backwards. Where are we starting from? What does the workshop need to look like to get here? That's really clear.

---

## What's Confusing

The work that produced the JSON is invisible in the output. That matters because understanding how you got to an artifact affects how much you trust it. If you know something about the conditions in which it was made, (the exercises, the iterations, who signed off), you're more likely to accept it. Does that information need to live in the repo? Maybe not. But a lightweight way to capture it alongside the output could help the human in the loop understand where things came from, and give agents something to reference when a human asks.

To be fair, analog outputs from workshops have the same problem. As a facilitator I tend to capture things as I go (take photos of the activities) so that when I'm telling the story of how we got there, people can see it. But the Zero Vector approach could actually do better than analog — you can maintain provenance in a way sticky notes and slide decks never could. The question is: what's worth capturing, and for whom? "Sarah" means something to a human but not to an agent without a lot more context around it.

---

## Open Questions

The manifest can have dozens or hundreds of files over time. What happens when findings conflict? Does fresher always win? This methodology tells you how to capture and store research but doesn't address how an agent should weight or arbitrate between findings.

Which connects to a bigger point: agents can scale and consume research faster than any human, and use that to make decisions. So we need to build more trust into how they're making those decisions: the information they have, and the rules for what they should and shouldn't use. That's gonna matter more and more as this scales up, as the amount of research grows, and as more people are relying on it. What does better decision-making actually look like for an agent? I don't have a clear answer, I think this is a deep well that would need more focused exploration. But if it's something worth pursuing, I'd be interested in going there.

The provenance question feels thorny. The core observation is that provenance metadata probably serves humans and agents differently, and those might need different solutions. But at a minimum, something lightweight alongside the output could help. Not a full set of attendees and job titles but more like: date of the workshop, the teams involved, the trigger (what prompted the research? Q4 planning, an upcoming product launch, some other organisational rhythm?). Enough to trace back if you need to, without overcomplicating it. Whether that's useful to an agent or just to humans - I'm not sure yet.