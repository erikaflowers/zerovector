# Playbook: Launch an Offering

How to take a new class, cohort, 1:1 program, or workshop from idea to paid seats on zerovector.design. Zero Camp is the reference implementation. Background: [ADR-002](../decisions/ADR-002-registration-platform.md) and ARCHITECTURE.md → Registration data model.

**Short version:** one migration (the offering row), one content file, one page with one `<PreRegister>` line.

---

## 1. Add the offering (database)

Create a migration. Never insert rows by hand; the migration keeps local and remote in sync.

```bash
cd ~/claude\ projects/zerovector
# new file: supabase/migrations/<YYYYMMDDHHMMSS>_offering_<slug>.sql
```

```sql
insert into public.offerings (slug, title, kind, status, price_cents)
values ('my-offering', 'My Offering: Tagline', 'workshop', 'draft', 49900)
on conflict (slug) do nothing;
```

- **`slug`** doubles as the page route (`/my-offering`). My ZV links registrations there.
- **`kind`** is one of `cohort`, `one_on_one`, `workshop`, `course`.
- **Start in `draft`.** The offering stays invisible to the public until you flip it.

Push it (the repo is linked to Supabase project `gjljhpccogxozkpmxzer`):

```bash
supabase db push --dry-run   # confirm only your file is listed
yes | supabase db push
```

## 2. Write the content file

Copy `src/content/zero-camp.js` to `src/content/<slug>.js` and register it in `src/content/en.js`. All copy lives here, never in JSX. The block that matters for registration is `registered`, the "what's next" view shown after someone pre-registers:

```js
registered: {
  headline: 'You’re in, {firstName}.',        // optional, falls back to accounts.js
  steps: [{ title: '…', body: '… {email} …' }], // three steps reads best
  prep: { text: '…', link: { label: '…', to: '/…' } }, // or null to hide
},
```

Tokens: `{firstName}` and `{email}`. Anything you leave out falls back to the generic defaults in `src/content/accounts.js`.

## 3. Build the page

Copy `src/pages/ZeroCampPage.jsx` and add a route in `src/App.jsx` inside `SiteLayout`. The only registration wiring is:

```jsx
<PreRegister slug="my-offering" nextSteps={content.registered} />
```

Give the section holding it `id="waitlist"` so `#waitlist` calls to action scroll to it. Page CSS goes in `src/styles/zv/pages/<slug>.css`, registered in `zv/index.css`. Reuse the shared partials `components/chip.css`, `ledger.css` and `pre-register.css`.

Rules the Zero Camp build learned the hard way:

- **No neon text on white.** Neon green and orange are unreadable there. Use `.zv-chip` for neon labels.
- **Never put `#anchor` into an OAuth redirect.** The site uses implicit-flow OAuth, which returns the session in the URL hash. `UserContext.signIn` already strips it.

## 4. Open it up

| Status | What visitors can do | How |
|--------|---------------------|-----|
| `draft` | Nothing; the page shows "Registration opens soon" | Default |
| `interest` | Pre-register with a preference | Migration: `update offerings set status='interest' where slug=…` |
| `presale` / `open` | Pre-register, plus "Reserve & pay" → Stripe Checkout (**only once production has live Stripe keys; see step 8**) | Same, with the new status |
| `closed` | Registration hidden | Same |

Then add the page to `public/sitemap.xml` and link it from wherever it should be discovered (nav, homepage, Start).

## 5. Read demand

In the Supabase table editor, open the view **`offering_interest`**. As an admin you see real counts per offering: total, preferred cohort, preferred 1:1, either, and paid. Non-admins only ever see their own rows.

For names and emails, join `registrations` to `profiles` in the SQL Editor:

```sql
select p.name, p.email, r.preference, r.status, r.created_at
from registrations r
join profiles p on p.id = r.user_id
join offerings o on o.id = r.offering_id
where o.slug = 'zero-camp'
order by r.created_at;
```

## 6. Pivot (e.g. cohort → 1:1)

Don't edit the existing offering's kind. Add a new offering row (for example `zero-camp-1on1`, kind `one_on_one`), close the old one, and email the interested list. Everyone's preference is on record, so you know exactly who wanted 1:1.

## 7. Email the list

**Nothing sends email automatically yet.** The query in step 5 gives you the list. The page copy promises "we'll email you", so someone has to.

The cleaner future path is to sync registrations into Buttondown, tagged per offering slug, via the existing Kestris subscribe proxy.

The 700+ existing `profiles` signed in, but they never opted into marketing. Invite them with a one-time opt-in; don't bulk-add them to a list.

## 8. Take payments (Stripe)

Built and tested (sandbox). Checkout is priced from `offerings.price_cents`, so there's nothing to create in Stripe per offering. What an offering charges is what its row says: full price, or a deposit if you set a deposit amount.

**Before the first real charge (one time):**
1. **Live key.** In Stripe (Helloerikaflowers, live), create a **restricted key** with write access to *Checkout Sessions* and *Customers* only. Set it as `STRIPE_SECRET_KEY` in Netlify, **production context only**.
2. **Live webhook.** `stripe webhook_endpoints create --live --url https://zerovector.design/.netlify/functions/stripe-webhook -d "enabled_events[]=checkout.session.completed" -d "enabled_events[]=checkout.session.async_payment_succeeded" -d "enabled_events[]=checkout.session.async_payment_failed" -d "enabled_events[]=checkout.session.expired" -d "enabled_events[]=charge.refunded"`. Put the returned signing secret in `STRIPE_WEBHOOK_SECRET` (production only). Redirect its output to `/dev/null` and read the secret into a variable; never print it.
3. **Receipts.** Stripe → Settings → Customer emails → turn on *Successful payments*. The paid view promises a receipt.
4. **Policies.** Refund policy + terms of sale published and linked from the offering page.
5. Then flip the offering to `presale` or `open` (step 4).

**Refunds:** issue them in the Stripe dashboard. The webhook marks the charge and registration `refunded`; My ZV shows it.

### Testing payments

Local only, Stripe sandbox `zv-dev`, `STRIPE_SECRET_KEY=sk_test_…` in `.env`:

```bash
# terminal 1: forwards sandbox webhooks; prints the whsec_ for this listener
stripe listen --api-key "$STRIPE_SECRET_KEY" --forward-to localhost:3006/.netlify/functions/stripe-webhook \
  --events checkout.session.completed,checkout.session.async_payment_succeeded,checkout.session.async_payment_failed,checkout.session.expired,charge.refunded
# terminal 2: functions + Vite (5175, so Renner's :5174 is untouched)
STRIPE_WEBHOOK_SECRET=whsec_… netlify dev --port 3006 --target-port 5175 --command "npx vite --port 5175 --strictPort"
# terminal 3: the suites (self-cleaning: create + delete their own $1 offering and temp user)
node scripts/e2e/stripe-e2e.mjs      # 19 checks: guard rails, decline, pay, repeat, RLS, refund
node scripts/e2e/stripe-ui-e2e.mjs   # our own pages end to end, screenshots to $SHOTS
```

The dev-only page `/checkout-test` (absent from production builds) renders `<PreRegister slug="checkout-test">`; it needs the fixture row, which the scripts create. Test cards: `4242 4242 4242 4242` succeeds, `4000 0000 0000 0002` declines.

## Checklist before sharing a launch link

- [ ] Offering row pushed, status `interest` or later
- [ ] No `TBD` left in the content file (`grep -n TBD src/content/<slug>.js`)
- [ ] Full round trip in a private window with a new Google account: pre-register → My ZV → change preference → withdraw
- [ ] Supabase Auth → Redirect URLs include `https://zerovector.design/**` and `https://*--zerovector.netlify.app/**` (deploy previews)
- [ ] Page added to `public/sitemap.xml`
- [ ] You're ready to email the list the page promises to email
- [ ] If taking payments: step 8's one-time setup is done, and the Stripe suites pass
