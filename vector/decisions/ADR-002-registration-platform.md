# ADR-002: Build Registration In-House on Google Login + Supabase

**Date:** 2026-09-26
**Status:** Accepted
**Decision maker:** Erika Flowers

## Context

Zero Camp (the Zero to One bootcamp) needs presales and a demand signal. Erika expects to sell many offerings over time: cohorts, 1:1, workshops, courses. The site already had Google sign-in through Supabase, but it was decorative. It shares a Supabase project with open.zerovector.design, and that project holds 700+ `profiles` rows. Erika already has a Stripe account.

## Decision

Build registration into zerovector.design instead of adopting a third-party registration or checkout service.

- **Identity:** Google sign-in is required to register. It creates or uses a `profiles` row, the table shared with Open Vector.
- **Catalog:** an `offerings` table. Every product is a row with a `kind` and a lifecycle `status`: draft → interest → presale/open → closed.
- **Registrations:** a `registrations` table, one per user per offering. It captures a delivery `preference` (cohort / one_on_one / either), so demand data comes for free.
- **Ledger:** a `charges` table. Repeat customers accrue rows on one account, and one Stripe customer maps to one profile.
- **Account page:** "My ZV" at `/my` shows it all.
- **Payments:** Stripe, stubbed until demand justifies it.
- **Access rules:** writes from the browser are limited to low-risk actions: pre-register as `interested`, change preference, withdraw. Anything involving money or status goes through the service role.

## Rationale

1. **Reusable.** A new product is a database row plus a content file. No new vendor setup per launch.
2. **Owns the relationship.** Customers, preferences, and purchase history live in our database, joined to the same profiles Open Vector uses.
3. **Demand before payments.** Pre-registration with a preference answers the cohort-versus-1:1 question before we spend time on checkout.
4. **Google login removes friction and fake signups,** and gives every registrant a real identity to contact.

## Consequences

- Auth is no longer decorative. ARCHITECTURE.md now says it gates registration and `/my` only.
- The Supabase project is shared with Open Vector, so schema changes must be additive. Open Vector's unmerged `feature/workflow-lms` migration drops `is_admin()`, which our policies depend on. Fix that migration before it ever runs.
- Email is not wired. The "we'll email you" promises on the page depend on Erika emailing the list manually, until registrations are connected to Buttondown.
- Stripe Phase 2 still has to be built: port Open Vector's checkout and webhook functions, and fix the bug in its fallback upsert.

## Update (2026-09-28): Stripe built

Checkout is live-capable and sandbox-tested (`scripts/e2e/`, 19 API checks plus a UI loop). What changed from the plan:

- **Pricing is inline** from `offerings.price_cents`. `offerings.stripe_price_id` stays unused, reserved in case Stripe-side coupons or prices are ever needed.
- **Test and live share one database.** `charges.livemode` marks which mode created each charge, and `profiles.stripe_test_customer_id` keeps sandbox customers apart from live ones.
- **Delayed payment methods** (Klarna, bank debits) are handled through `checkout.session.async_payment_*` events.
- **One shared Stripe account:** Helloerikaflowers, for Zero Vector and Open Vector. Zero Vector's checkout sessions carry `metadata.site = 'zv'`.

Production has no Stripe key yet, so no real charge is possible until the one-time setup in the playbook (step 8).
