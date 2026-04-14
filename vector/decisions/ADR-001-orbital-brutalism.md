# ADR-001: Orbital Brutalism as Visual Identity

**Date:** 2026-02-22
**Status:** Accepted
**Decision maker:** Erika Flowers

## Context

The zerovector.design site needed a visual identity that embodies the philosophy it advocates: intentional, artifact-like, anti-template. The previous dark-mode-first design (ship console aesthetic) felt generic — it could have been any developer tool. The redesign needed to signal that Zero Vector is a methodology, not a product, and that every design decision is deliberate.

## Decision

Adopt Orbital Brutalism: pure black and white, zero border-radius, hard-edge offset shadows, neon accents as punctuation only, Proxima Nova for display type, and binary hover states (flip, don't fade). The aesthetic draws from MoMA's typographic austerity and the Stendig Calendar's unapologetic scale.

## Rationale

1. **Black and white enforces clarity.** No gray areas, no "almost-white" backgrounds. Binary surfaces force every element to declare whether it's figure or ground.
2. **Zero border-radius signals conviction.** Rounded corners are comforting. Hard edges are intentional. A site about eliminating softness between intent and artifact shouldn't have soft edges.
3. **Neon accents as punctuation, not decoration.** Three neon colors (pink, green, orange) that each have a semantic role — action, positive state, system voice. They earn their presence.
4. **The site should feel like an artifact.** Not a template, not a theme — something that could not have been produced by dragging blocks around a visual editor.

## Consequences

- High contrast may create accessibility concerns for some users — needs testing
- Self-hosted Proxima Nova adds font weight to page load (~200KB OTF, should convert to woff2)
- The aesthetic is polarizing by design — some visitors will find it harsh. That's acceptable; the target audience should find it compelling.
- The Start pill (40px border-radius) is the only exception to the no-radius rule — it needs to stand out as THE primary CTA across the entire nav.

## Alternatives Considered

- **Dark-mode-first with neon** (the previous design): Too generic. Every dev tool looks like this.
- **Swiss/Helvetica minimalism**: Clean but personality-free. Doesn't convey the manifesto's conviction.
- **Magazine editorial**: Would work for the content but too conventional for a site about breaking conventions.
