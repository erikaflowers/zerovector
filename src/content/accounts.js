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
    registeredPreference: 'Preference',
    payCta: 'Reserve & pay',
    stubMessage: 'Payments open soon. Your spot is held, and we’ll email you first.',
    myZvLink: 'View in My ZV',
    withdrawCta: 'Withdraw',
    withdrawConfirm: 'Withdraw your pre-registration?',
    unavailable: 'Registration opens soon. Check back shortly.',
    error: 'Something went wrong. Please try again.',
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
    registrations: {
      title: 'Registrations',
      empty: 'Nothing yet. When you register for a class, it shows up here.',
      emptyCta: { label: 'See Zero Camp', to: '/zero-camp' },
    },
    charges: {
      title: 'Charges',
      empty: 'No charges yet.',
    },
    signOut: 'Sign out',
    unavailable: 'Accounts are not available right now.',
  },
};

export default accounts;
