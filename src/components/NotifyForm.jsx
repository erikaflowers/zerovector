import { useState } from 'react';

/**
 * NotifyForm — Email signup via Kestris subscribe proxy.
 * Supports multiple tags (zerovector, enterprise, founding-contributor, etc.)
 *
 * @param {string} variant - 'dark' (white text on dark/blue bg) or 'light' (dark text on light bg)
 * @param {string} tag - Buttondown tag to apply (default: 'zerovector')
 */
function NotifyForm({ variant = 'dark', tag = 'zerovector' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://kestris.netlify.app/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setEmail('');
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const cls = `zv-notify zv-notify--${variant}`;

  if (status === 'success') {
    return (
      <div className={`${cls} zv-notify--success`}>
        <span className="zv-notify-check">&#10003;</span>
        <span className="zv-notify-success-text">You're in. We'll let you know when it's live.</span>
      </div>
    );
  }

  return (
    <div className={cls}>
      <form className="zv-notify-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="zv-notify-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className="zv-notify-btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Get Notified'}
        </button>
      </form>
      {status === 'error' && (
        <p className="zv-notify-error">{errorMessage}</p>
      )}
    </div>
  );
}

export default NotifyForm;
