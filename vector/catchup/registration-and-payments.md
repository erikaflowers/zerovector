# Catchup: Registration, My ZV and Stripe

**As of:** 2026-10-06 · **Written by:** Lee · **Status:** parked, stable. All work is merged and live, and nothing is in flight.

Read this first when picking Zero Vector registration or payments back up. Day-to-day procedures live in the [launch playbook](../playbooks/launch-an-offering.md). The reasoning is in [ADR-002](../decisions/ADR-002-registration-platform.md). The schema and access rules are in `ARCHITECTURE.md` → Registration data model.

---

## At a glance

| | State |
|---|---|
| `/zero-camp` | Live but unlisted: not in the nav or the sitemap. Bespoke launch hero; pre-registration is open. |
| `/my` (My ZV) | Live. Shows Open Vector progress, registrations and charges. Hidden from search engines. |
| Zero Camp offering | `status = interest`, $999, `kind = cohort`. People can pre-register; nobody can pay yet. |
| Pre-registrations | 2: one prefers cohort, one prefers 1:1. Both are internal tests. |
| Charges | 0, live or test. |
| Profiles (shared with Open Vector) | 710 |
| Open Vector catalog (`ov_lessons`) | 50 active rows (40 lessons + 10 Approach guides), re-synced on every Open Vector production deploy. |
| Stripe in production | **Not configured.** No `STRIPE_*` env vars, so checkout returns 503. Nothing can charge anyone. |
| Migrations | 4. Local and remote are in sync (`supabase migration list`). |

---

## What changed in registration

**Before (Sep 25):** Google sign-in on zerovector.design was decorative: an avatar in the nav, nothing gated. The only signup was an email waitlist (Kestris → Buttondown).

**After:**

1. **Google sign-in is the account.** Every Google login creates a `profiles` row. This is the same table and trigger Open Vector uses, so one person has one identity across the ecosystem.
2. **Things you can sign up for are rows, not pages.** `offerings` holds the catalog. Each offering has a `kind` (cohort, one_on_one, workshop, course) and a lifecycle `status`: `draft → interest → presale/open → closed`. A new product is a migration plus a content file.
3. **Pre-registering is one step.** A logged-out visitor picks a preference (Group cohort / 1:1 / Either) and clicks *Pre-register with Google*. The choice is saved in the browser tab, Google signs them in, and they come back already registered. Earlier this took two clicks and a second visit. Fixed Sep 27.
4. **Registration states:** `interested → reserved → paid`, or `cancelled` / `refunded`. Students can do only three things themselves: pre-register as `interested`, change their preference, and withdraw while still `interested`. Every other state change happens on the server.
5. **"What happens next" view.** After registering, students see a personal headline, three next steps, their preference echoed back with a *Change* link, and an optional prep link. Once paid, the card switches to a *Paid · you're booked* view. The copy belongs to the offering: there are defaults in `src/content/accounts.js`, and Zero Camp overrides them in `src/content/zero-camp.js`.
6. **My ZV (`/my`) is the account home.**
   - **Open Vector progress:** an overall count, a progress bar per level, and an *Up next* card that links into the lesson.
   - **Registrations:** each with change and withdraw.
   - **Charges:** the ledger, with a TEST tag on sandbox charges.
   - **After a payment:** a confirmation banner.
7. **Open Vector progress lives in the database too.** `progress` (written by open.zerovector.design) is joined to `ov_lessons`, which openvector's build syncs automatically. Learning progress and purchases sit side by side in one database.

## The Stripe system

**One Stripe account for the ecosystem:** *Helloerikaflowers* (`acct_1T0BucLw4IgSJuRJ`), shared with Open Vector. A second live account, *Erika Flowers*, exists with the same statement descriptor. **Don't use it.** Development uses the sandbox `zv-dev`.

**How a payment flows:**

1. **Reserve & pay.** A registered user clicks it. The button only appears when the offering is `presale` or `open`.
2. **`create-checkout` (Netlify function) checks five things:**
   - the user's Supabase login
   - that they own the registration
   - that the offering is payable
   - that it isn't already paid
   - that seats remain, if the offering has a capacity

   It then finds or creates their Stripe customer, creates a Checkout Session **priced from `offerings.price_cents`** (no Stripe products to maintain), writes a `pending` charge, and returns Stripe's hosted URL.
3. **The customer pays on Stripe's page.** Card, Apple Pay, Link, Klarna, Cash App and bank are all offered.
4. **`stripe-webhook` (Netlify function) handles Stripe's signed events:**
   - `completed` and `async_payment_succeeded`: the charge becomes `completed` and the registration `paid`.
   - `expired` and `async_payment_failed`: the pending charge is deleted.
   - A full `charge.refunded`: the charge and registration both become `refunded`.
   - Checkout sessions without `metadata.site = 'zv'` (Open Vector's) are ignored.
5. **Back to My ZV.** It polls until the charge confirms, then shows *Payment confirmed. You're in.*

**Safety features:**
- **Money is written only on the server.** Browsers can't write `charges` or promote a registration's status. This is enforced by RLS and column grants, and covered by the E2E suite.
- **No double counting.** Completion is an upsert keyed on the checkout session, so retried or out-of-order webhooks never double-count or drop a sale. That's the bug Open Vector's original had.
- **Test and live stay apart.** `charges.livemode` tags every charge with its mode. Sandbox customers live in `profiles.stripe_test_customer_id` and live ones in `stripe_customer_id`, so testing never breaks someone's real checkout.
- **No Stripe key ever reaches the browser.** There are no `VITE_STRIPE_*` variables. Checkout is a redirect, so no publishable key is needed.
- **Missing config degrades gracefully.** Without keys, checkout returns 503 *Payments are not configured*.

**Tested (Sep 28):** `scripts/e2e/stripe-e2e.mjs` passes 19/19 against the real sandbox, the real database and Stripe's real hosted page:
- guard rails
- an expired session
- a declined card
- a successful card
- a repeat purchase blocked
- RLS write protection
- a refund

`scripts/e2e/stripe-ui-e2e.mjs` runs our own pages end to end. Both suites create and delete their own $1 test offering and temporary user. Zero residue was left in production.

## Where things live

| Piece | Path |
|---|---|
| Schema + RLS | `supabase/migrations/20260926000000_zv_registration.sql`, `…010000_registration_preference_update.sql`, `20260927000000_ov_lessons_catalog.sql`, `20260928000000_stripe_checkout.sql` |
| Data layer | `src/lib/registration.js` (offerings, registrations, charges, `startCheckout`), `src/lib/learning.js` (Open Vector progress) |
| Components | `src/components/PreRegister.jsx`, `PreferenceOptions.jsx`, `LearningSummary.jsx` |
| Pages | `src/pages/ZeroCampPage.jsx`, `MyZvPage.jsx`, `CheckoutTestPage.jsx` (dev only, stripped from production builds) |
| Copy | `src/content/accounts.js` (defaults), `src/content/zero-camp.js` (Zero Camp) |
| Functions | `netlify/functions/create-checkout.js`, `stripe-webhook.js`, `lib/auth.js` |
| Tests | `scripts/e2e/stripe-e2e.mjs`, `stripe-ui-e2e.mjs` |
| Catalog sync | openvector `scripts/sync-catalog.mjs` (runs after each Open Vector production build) |
| How-to | `vector/playbooks/launch-an-offering.md` |

## Operating it

- **Read demand:** in Supabase, the view `offering_interest` (admins see real counts). The playbook (step 5) has the SQL to list names, emails and preferences.
- **Add a product:** playbook steps 1–4: offering migration, content file, page with `<PreRegister slug=…>`, then flip the status.
- **Change the schema:** write a migration, run `supabase db push --dry-run`, then `yes | supabase db push`. The repo is linked to `gjljhpccogxozkpmxzer`, and agents run this themselves.
- **Test payments locally:** the playbook's *Testing payments* recipe (`stripe listen` + `netlify dev` on :3006, then the e2e scripts).

## To take real money (one time, ~15 min)

Playbook step 8 has the details:
1. A **live restricted key** (Checkout Sessions + Customers only) set as `STRIPE_SECRET_KEY`, production context only.
2. A **live webhook endpoint**, created with the Stripe CLI (`--live`). Its secret goes in `STRIPE_WEBHOOK_SECRET`, production only.
3. **Receipt emails** switched on in Stripe. The paid view promises a receipt.
4. A **refund policy and terms of sale** published.
5. Flip the offering to `presale` or `open`.

## Open items

- **Zero Camp content.**
  - The TBDs: required services and their monthly cost, machine requirements (Mac only?), cohort size and dates, "Destination: Unwritten", and the paid-view steps.
  - The page loadout omits OrbStack, gcloud, Playwright, the Stripe CLI and VS Code.
  - Waiting on Erika's plan. Input: the [Zero Camp Flight Manual](https://claude.ai/artifact/PcYpFazRfZskNPNSfTNHLo) (private). It recommends 4 × 4-hour sessions instead of 2.
- **Email isn't wired.** The pages promise "we'll email you." Until registrations sync to Buttondown, someone has to email the list by hand.
- **Before launch:** add `/zero-camp` to the sitemap and nav. Invite the 710 existing profiles with a one-time opt-in, never a bulk add.
- **Deploy previews** have no Stripe keys, and Supabase may not yet allow `https://*--zerovector.netlify.app/**` as a redirect, so sign-in on previews can bounce to production. Test payments locally instead.
- **openvector `feature/workflow-lms`:** if that branch's migration ever runs, it drops `is_admin()`, which our policies depend on. Fix the migration first.
- **`offerings.stripe_price_id`** is unused. It's reserved in case Stripe-side coupons or prices are ever wanted.

## History

| PR | What |
|---|---|
| zerovector #21 | Zero Camp page + registration platform (Google pre-register, offerings, registrations, charges, My ZV) |
| zerovector #22 | Open Vector learning progress in My ZV (`ov_lessons` catalog) |
| openvector #48 | Catalog sync on every Open Vector production build |
| zerovector #23 | Stripe checkout: functions, livemode separation, paid view, E2E suites, docs |
| matilda #12, #13 | Stack doctrine: Supabase/Netlify links on the Mini, Stripe CLI |
