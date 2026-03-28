import { useState, useRef } from 'react';
import VectorField from '../components/VectorField';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Animate from '../components/Animate';
import useSEO from '../hooks/useSEO';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../lib/supabase';
import en from '../content/en';

const { join } = en;

/* ── Helpers ── */

function renderMarkdown(text) {
  // Simple bold markdown: **text** → <strong>text</strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/* ── Sub-components ── */

function JoinField({ field, value, onChange, error }) {
  const id = `join-${field.name}`;

  const commonProps = {
    id,
    name: field.name,
    value: value || '',
    onChange: (e) => onChange(field.name, e.target.value),
    'aria-required': field.required || undefined,
  };

  let input;
  if (field.type === 'textarea') {
    const sizeClass = field.size === 'short' ? 'zv-join-textarea--short'
      : field.size === 'long' ? 'zv-join-textarea--long' : '';
    input = (
      <textarea
        {...commonProps}
        className={`zv-join-textarea ${sizeClass}`}
        placeholder={field.placeholder}
      />
    );
  } else if (field.type === 'select') {
    input = (
      <select {...commonProps} className="zv-join-select">
        <option value="" disabled>Select</option>
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  } else {
    input = (
      <input
        {...commonProps}
        type={field.type}
        className="zv-join-input"
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <div className={`zv-join-field ${error ? 'zv-join-field--error' : ''}`}>
      <label htmlFor={id} className="zv-join-label">
        {field.label}
        {field.required && <span className="zv-join-required"> *</span>}
      </label>
      {field.hint && <span className="zv-join-hint">{field.hint}</span>}
      {input}
      {field.hintBelow && <span className="zv-join-hint">{field.hintBelow}</span>}
      {error && <span className="zv-join-error-text">{error}</span>}
    </div>
  );
}

function RoleCard({ role, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`zv-join-role-card ${selected ? 'zv-join-role-card--selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      {role.badge && <span className="zv-join-role-badge">{role.badge}</span>}
      <h3>{role.title}</h3>
      {role.subtitle && <div className="zv-join-role-subtitle">{role.subtitle}</div>}
      <p>{role.description}</p>
    </button>
  );
}

function RoleDetail({ role }) {
  if (!role) return null;
  return (
    <div className="zv-join-role-detail">
      <div className="zv-join-role-detail-inner">
        <p className="zv-join-role-detail-desc">{role.fullDescription}</p>
        {role.bullets && (
          <ul className="zv-join-role-detail-bullets">
            {role.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

function FormSection({ section, formData, onChange, errors }) {
  // Group inline fields
  const fields = section.fields;
  const elements = [];
  let i = 0;

  while (i < fields.length) {
    const field = fields[i];
    if (field.inline === 'left' && fields[i + 1]?.inline === 'right') {
      elements.push(
        <div key={field.name} className="zv-join-inline-fields">
          <JoinField field={field} value={formData[field.name]} onChange={onChange} error={errors[field.name]} />
          <JoinField field={fields[i + 1]} value={formData[fields[i + 1].name]} onChange={onChange} error={errors[fields[i + 1].name]} />
        </div>
      );
      i += 2;
    } else {
      elements.push(
        <JoinField key={field.name} field={field} value={formData[field.name]} onChange={onChange} error={errors[field.name]} />
      );
      i++;
    }
  }

  return (
    <div className="zv-join-form-section">
      <Animate>
        <h2 className="zv-join-form-title">{section.title}</h2>
        {section.subtitle && <p className="zv-join-section-desc">{section.subtitle}</p>}
      </Animate>
      {elements.map((el, idx) => (
        <Animate key={idx} delay={Math.min(idx, 3)}>{el}</Animate>
      ))}
    </div>
  );
}

/* ── Main Page ── */

function JoinPage() {
  const { user, isLoggedIn, loading: authLoading, signIn } = useUser();
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const firstErrorRef = useRef(null);

  useSEO({
    title: 'Join the Crew \u2014 Zero-Vector Design',
    description: 'Zero Vector is looking for crew. Framework engineers, curriculum stewards, evangelists, and funding scouts. Volunteer positions with real mission and real autonomy.',
    path: '/join',
  });

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};

    if (!selectedRole) errs._role = 'Please select a role.';

    // Common required
    const allSections = [join.whoYouAre, join.enduranceTest, join.final];
    for (const section of allSections) {
      for (const field of section.fields) {
        if (field.required && (!formData[field.name] || !String(formData[field.name]).trim())) {
          errs[field.name] = 'This field is required.';
        }
      }
    }

    // Email format
    if (formData.email && (!formData.email.includes('@') || !formData.email.includes('.'))) {
      errs.email = 'Please enter a valid email address.';
    }

    // Role-specific required
    if (selectedRole && join.roleQuestions[selectedRole]) {
      for (const field of join.roleQuestions[selectedRole].fields) {
        if (field.required && (!formData[field.name] || !String(formData[field.name]).trim())) {
          errs[field.name] = 'This field is required.';
        }
      }
    }

    setErrors(errs);

    // Scroll to first error
    if (Object.keys(errs).length > 0) {
      requestAnimationFrame(() => {
        const firstKey = Object.keys(errs).find((k) => k !== '_role') || '_role';
        const el = firstKey === '_role'
          ? document.querySelector('.zv-join-role-cards')
          : document.getElementById(`join-${firstKey}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const headers = { 'Content-Type': 'application/json' };

      // Attach JWT for server-side identity verification
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) headers.Authorization = `Bearer ${session.access_token}`;
      }

      const res = await fetch('/.netlify/functions/join', {
        method: 'POST',
        headers,
        body: JSON.stringify({ role: selectedRole, ...formData }),
      });

      if (res.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrors({ _submit: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setErrors({ _submit: 'Network error. Please check your connection and try again.' });
    }
    setSubmitting(false);
  };

  /* ── Confirmation state ── */
  if (submitted) {
    return (
      <div className="zv-page zv-info-page">
        <VectorField />
        <Nav />
        <PageHero eyebrow={join.eyebrow} title={join.success.title} subtitle="" />
        <section className="zv-section">
          <div className="zv-container">
            <Animate>
              <div className="zv-join-confirmation">
                {join.success.body.split('\n\n').map((p, i) => (
                  <p key={i} className="zv-body-text">{p}</p>
                ))}
              </div>
            </Animate>
          </div>
        </section>
        <section className="zv-section">
          <div className="zv-container">
            <Animate>
              <div className="zv-join-epigraph">
                <p>{join.epigraph.text}</p>
                <cite>{join.epigraph.attribution}</cite>
              </div>
            </Animate>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  /* ── Application form ── */
  return (
    <div className="zv-page zv-info-page">
      <VectorField />
      <Nav />

      <PageHero eyebrow={join.eyebrow} title={join.title} subtitle={join.subtitle} />

      {/* Shackleton Quote */}
      <section className="zv-section" style={{ paddingTop: 0 }}>
        <div className="zv-container">
          <Animate>
            <blockquote className="zv-join-quote">
              <p>{join.quote.text}</p>
              <cite>{join.quote.attribution}</cite>
            </blockquote>
          </Animate>
          <Animate delay={1}>
            <p className="zv-join-book-note">
              {join.bookNote.text}{' '}
              <a href={join.bookNote.linkUrl} target="_blank" rel="noopener noreferrer">
                {join.bookNote.linkText}
              </a>{' '}
              {join.bookNote.suffix}
            </p>
          </Animate>
        </div>
      </section>

      {/* Intro */}
      <section className="zv-section">
        <div className="zv-container">
          {join.intro.map((p, i) => (
            <Animate key={i} delay={Math.min(i, 2)}>
              <p className="zv-body-text">{renderMarkdown(p)}</p>
            </Animate>
          ))}
        </div>
      </section>

      {/* Compensation Model */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{join.compensation.title}</h2>
            <p className="zv-join-section-desc">{join.compensation.subtitle}</p>
          </Animate>
          {join.compensation.paragraphs.map((p, i) => (
            <Animate key={i}>
              <p className="zv-body-text">
                {p.label && <strong>{p.label}</strong>}{p.label && ' '}{p.text}
              </p>
            </Animate>
          ))}
        </div>
      </section>

      {/* Role Selection */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <div className="zv-join-section-label">
              Select a role <span className="zv-join-required">*</span>
            </div>
          </Animate>
          <div className="zv-join-role-cards">
            {join.roles.map((role, i) => (
              <Animate key={role.id} delay={Math.min(i, 2)}>
                <RoleCard
                  role={role}
                  selected={selectedRole === role.id}
                  onSelect={() => {
                    setSelectedRole(role.id);
                    if (errors._role) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next._role;
                        return next;
                      });
                    }
                  }}
                />
              </Animate>
            ))}
          </div>
          <div className={`zv-join-role-detail-wrapper ${selectedRole ? 'zv-join-role-detail-wrapper--open' : ''}`}>
            <RoleDetail role={join.roles.find(r => r.id === selectedRole)} />
          </div>
          {errors._role && <p className="zv-join-error">{errors._role}</p>}
        </div>
      </section>

      {/* Auth gate */}
      {!authLoading && !isLoggedIn && (
        <section className="zv-section">
          <div className="zv-container">
            <Animate>
              <div className="zv-join-auth-gate">
                <h2 className="zv-join-form-title">{join.authPrompt.heading}</h2>
                <p className="zv-join-auth-gate-text">{join.authPrompt.text}</p>
                <button type="button" className="zv-join-submit-btn" onClick={signIn}>
                  {join.authPrompt.buttonText}
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* Application Form — only when signed in */}
      {isLoggedIn && (
      <form onSubmit={handleSubmit} noValidate>

        {/* Identity bar */}
        <section className="zv-section">
          <div className="zv-container">
            <Animate>
              <div className="zv-join-identity">
                {user.avatar && <img src={user.avatar} alt="" className="zv-join-identity-avatar" referrerPolicy="no-referrer" />}
                <div>
                  <div className="zv-join-identity-name">Applying as <strong>{user.name}</strong></div>
                  <div className="zv-join-identity-email">{user.email}</div>
                </div>
              </div>
            </Animate>
          </div>
        </section>

        {/* Who You Are */}
        <section className="zv-section">
          <div className="zv-container">
            <FormSection section={join.whoYouAre} formData={formData} onChange={updateField} errors={errors} />
          </div>
        </section>

        {/* Endurance Test */}
        <section className="zv-section">
          <div className="zv-container">
            <FormSection section={join.enduranceTest} formData={formData} onChange={updateField} errors={errors} />
          </div>
        </section>

        {/* Role-Specific Questions (conditional) */}
        {Object.entries(join.roleQuestions).map(([roleId, section]) => (
          <div
            key={roleId}
            className={`zv-join-role-questions ${selectedRole === roleId ? 'zv-join-role-questions--visible' : ''}`}
            aria-hidden={selectedRole !== roleId}
          >
            <section className="zv-section">
              <div className="zv-container">
                <FormSection section={section} formData={formData} onChange={updateField} errors={errors} />
              </div>
            </section>
          </div>
        ))}

        {/* Final Section */}
        <section className="zv-section">
          <div className="zv-container">
            <FormSection section={join.final} formData={formData} onChange={updateField} errors={errors} />
          </div>
        </section>

        {/* Submit */}
        <section className="zv-section">
          <div className="zv-container">
            <Animate>
              <div className="zv-join-submit">
                <p className="zv-join-submit-note">{join.submit.note}</p>
                {errors._submit && <p className="zv-join-error">{errors._submit}</p>}
                <button
                  type="submit"
                  className="zv-join-submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : join.submit.buttonText}
                </button>
              </div>
            </Animate>
          </div>
        </section>
      </form>
      )}

      {/* Epigraph */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <div className="zv-join-epigraph">
              <p>{join.epigraph.text}</p>
              <cite>{join.epigraph.attribution}</cite>
            </div>
          </Animate>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default JoinPage;
