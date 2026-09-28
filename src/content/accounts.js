// Accounts — Content Layer
// Copy for the reusable PreRegister component and the My ZV page.
// Offering-specific copy (titles, prices) comes from the database.

const accounts = {
  preferences: [
    { value: 'cohort', label: 'Group cohort' },
    { value: 'one_on_one', label: '1:1' },
    { value: 'either', label: 'Either' },
  ],

  statusLabels: {
    interested: 'Pre-registered',
    reserved: 'Reserved',
    paid: 'Paid',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  },

  chargeStatusLabels: {
    pending: 'Pending',
    completed: 'Paid',
    refunded: 'Refunded',
  },

  preRegister: {
    signInCta: 'Pre-register with Google',
    signInNote: 'Your Google account becomes your ZV account. No charge to pre-register.',
    preferencePrompt: 'How would you rather learn?',
    submitCta: 'Pre-register',
    submitting: 'Saving…',
    registeredChip: 'You’re on the list',
    paidChip: 'Paid · you’re booked',
    preferenceEcho: 'You told us you’d prefer',
    changeCta: 'Change',
    keepCta: 'Keep it',
    payCta: 'Reserve & pay',
    redirecting: 'Opening secure checkout…',
    cancelledMessage: 'Checkout cancelled. Nothing was charged; your spot is still saved.',
    myZvLink: 'View in My ZV',
    withdrawCta: 'Withdraw',
    withdrawConfirm: 'Withdraw your pre-registration?',
    unavailable: 'Registration opens soon. Check back shortly.',
    error: 'Something went wrong. Please try again.',
  },

  // Default "what's next" view after registering. Pages override any
  // key by passing `nextSteps` to <PreRegister>. Tokens: {firstName},
  // {email}. Set `prep` to null to hide the prep line. `paid` replaces
  // headline/steps once the registration is paid.
  registered: {
    headline: 'You’re in, {firstName}.',
    stepsTitle: 'What happens next',
    steps: [
      { title: 'Your spot is saved', body: 'It lives in your ZV account. You can check it any time in My ZV.' },
      { title: 'Watch your inbox', body: 'We’ll email {email} before registration opens to anyone else.' },
      { title: 'Details are coming', body: 'Dates and format are announced as soon as they’re set.' },
    ],
    prep: null,
    // Shown instead once the registration is paid. Same override rules.
    paid: {
      headline: 'You’re booked, {firstName}.',
      steps: [
        { title: 'Payment received', body: 'Stripe emails your receipt to {email}. Your charge is in My ZV.' },
        { title: 'Your seat is confirmed', body: 'Nothing else to do right now.' },
        { title: 'Details are coming', body: 'We’ll email {email} with dates, links, and how to prepare.' },
      ],
    },
  },

  // Dev-only harness (pages/CheckoutTestPage.jsx); never in production builds.
  devCheckoutTest: {
    chip: 'DEV ONLY',
    title: 'Checkout test',
    body: 'Sandbox checkout against the checkout-test offering. Card 4242 4242 4242 4242, any future date, any CVC. Decline: 4000 0000 0000 0002.',
  },

  myZv: {
    seo: {
      title: 'My ZV',
      description: 'Your Zero Vector account: registrations, charges, and what’s next.',
    },
    eyebrow: 'Account',
    title: 'My ZV',
    signedOut: {
      headline: 'Your Zero Vector account',
      body: 'Sign in with Google to see your registrations and charges.',
      cta: 'Sign in with Google',
    },
    learning: {
      title: 'Open Vector',
      subtitle: 'Your progress through the free Zero Vector curriculum.',
      lessonsLabel: 'lessons',
      continueLabel: 'Up next',
      continueCta: 'Continue',
      completeLabel: 'Curriculum complete. Auteur status: earned.',
      lastActivity: 'Last lesson completed',
      levelLabel: 'Level',
      approachLabel: 'Approach guides',
      empty: 'You haven’t started the Open Vector curriculum yet. It’s free, and your progress shows up here.',
      emptyCta: { label: 'Start learning', href: 'https://open.zerovector.design/learn/curriculum' },
      openCta: { label: 'Open the curriculum', href: 'https://open.zerovector.design/learn/curriculum' },
    },
    registrations: {
      title: 'Registrations',
      empty: 'Nothing yet. When you register for a class, it shows up here.',
      emptyCta: { label: 'See Zero Camp', to: '/zero-camp' },
    },
    charges: {
      title: 'Charges',
      empty: 'No charges yet.',
      testChip: 'TEST',
    },
    checkout: {
      confirming: 'Payment received. Confirming with Stripe…',
      confirmed: 'Payment confirmed. You’re in.',
      slow: 'Stripe is still confirming. Refresh in a minute; your payment is safe.',
    },
    signOut: 'Sign out',
    unavailable: 'Accounts are not available right now.',
  },
};

export default accounts;
