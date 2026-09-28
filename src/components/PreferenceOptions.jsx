import en from '../content/en';

const { accounts } = en;

/**
 * PreferenceOptions — the one-tap Group cohort / 1:1 / Either picker.
 * Shared by PreRegister (sign-up + change) and My ZV (change).
 *
 * @param {string} id - unique id for the prompt label
 * @param {string|null} value - selected preference
 * @param {(value: string) => void} onSelect
 * @param {boolean} disabled
 */
function PreferenceOptions({ id, value, onSelect, disabled = false }) {
  return (
    <>
      <p className="zv-prereg-prompt" id={id}>{accounts.preRegister.preferencePrompt}</p>
      <div className="zv-prereg-options" role="group" aria-labelledby={id}>
        {accounts.preferences.map((p) => (
          <button
            key={p.value}
            type="button"
            className={`zv-prereg-option ${value === p.value ? 'zv-prereg-option--on' : ''}`}
            aria-pressed={value === p.value}
            onClick={() => onSelect(p.value)}
            disabled={disabled}
          >
            {p.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default PreferenceOptions;
