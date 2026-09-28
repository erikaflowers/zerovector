import Nav from '../components/Nav';
import PreRegister from '../components/PreRegister';
import en from '../content/en';

const copy = en.accounts.devCheckoutTest;

// DEV ONLY — mounted in App.jsx behind import.meta.env.DEV, so production
// builds drop it. Exercises the full register → Stripe Checkout → webhook
// loop against the `checkout-test` offering with sandbox keys.
// Run with `netlify dev` (functions) + `stripe listen` (webhooks).
function CheckoutTestPage() {
  return (
    <div className="zv-page zv-info-page">
      <Nav />
      <section className="zv-my-header">
        <div className="zv-container">
          <div className="zv-chip zv-chip--pink">{copy.chip}</div>
          <h1 className="zv-my-title">{copy.title}</h1>
        </div>
      </section>
      <section className="zv-section">
        <div className="zv-container zv-checkout-test">
          <p className="zv-body-text">{copy.body}</p>
          <PreRegister slug="checkout-test" />
        </div>
      </section>
    </div>
  );
}

export default CheckoutTestPage;
