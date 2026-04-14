# Mobile-First Onboarding Flow — Draft

**Context:** If someone lands on Open Vector on their phone for the first time, what should the first 60 seconds look like?

---

## Current Experience (What Happens Now)

1. User taps a link, lands on /open
2. Page may load mid-scroll — no title visible
3. Large hero section with text about Open Vector's mission
4. Scroll through content sections, hit blank gaps
5. No clear "start here" prompt
6. If they find /open/learn, they see curriculum cards but no guided path
7. If they tap a lesson, sidebar nav is broken and they're on their own

**Result:** The user has to figure out what this is, where to start, and how to navigate — all on a 360px screen with broken nav. Most will leave.

---

## Proposed Flow (First 60 Seconds)

### Second 0–5: Instant Clarity

**What they see:** A clean, mobile-optimized hero that answers three questions immediately:
- **What is this?** "Open Vector: free, open-source curriculum for learning to build with code and AI."
- **Who is it for?** "For beginners. No experience needed."
- **What do I do?** A single, prominent button: **Start Learning**

No scroll required. No mission statement. No manifesto. Just the answer to "should I stay?"

### Second 5–15: One Choice

**What happens when they tap "Start Learning":**
- They land on a streamlined mobile view of the first lesson (The Terminal, or a dedicated "Welcome" micro-lesson)
- The page loads at the top (scroll position fixed)
- A brief welcome message: "This lesson takes about 10 minutes. You can do it right here on your phone."

No curriculum index. No level picker. No sidebar. Just the content.

### Second 15–45: The Hook

**The first lesson content should:**
- Be readable without horizontal scrolling
- Break exercises into numbered steps (not prose paragraphs)
- Use inline code formatting so commands stand out
- Have a progress indicator ("Step 2 of 5" or a simple progress bar)
- Feel completable — the learner should believe they can finish this on their phone

### Second 45–60: The Conversion

**When they finish (or scroll to the end):**
- "You just completed your first lesson." (Acknowledgment)
- "Ready for the next one?" with a clear **Next Lesson** button
- Secondary option: "Bookmark Open Vector" or "Get the full curriculum" (links to /open/learn)
- No signup wall. No email capture. Just momentum.

---

## What This Requires

### Content Changes
- A mobile-friendly welcome micro-lesson or a mobile-adapted version of The Terminal lesson
- Exercise sections reformatted as numbered steps

### Code Changes
- Fix scroll position on page load (already in top 3 fixes for Lee)
- Create a mobile-specific entry point or route (e.g., /open/start)
- Add a progress indicator component for lessons
- Hide sidebar nav on the first visit — use bottom "Next Lesson" navigation instead

### Design Changes
- Mobile hero for /open that prioritizes the CTA over the mission statement
- Simplified mobile lesson view with larger touch targets
- Progress bar or step counter

---

## What This Does NOT Require

- A redesign of the desktop experience
- A new curriculum structure
- User accounts or authentication
- Any backend changes

This is a mobile CSS and routing layer on top of existing content. The content is already good. The onboarding flow just needs to get out of the way and let the learner reach it.

---

## Success Metric

A mobile visitor who taps "Start Learning" finishes the first lesson (or at least reaches the halfway point) without:
- Encountering broken navigation
- Seeing blank scroll gaps
- Landing mid-content
- Leaving because they couldn't figure out where to start

---

*K-007 observation: The best onboarding is the one the learner doesn't notice. They tap, they read, they learn, they come back. Everything else is friction.*
