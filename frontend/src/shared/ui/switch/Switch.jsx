// On/off toggle, parent owns the value via `checked`,
// and gets the new value through `onChange(newValue)` on click.
const Switch = ({ checked, onChange, disabled, id, name }) => {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      name={name}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full border-2 border-primary
        cursor-pointer transition-colors
        disabled:cursor-not-allowed disabled:opacity-50
        ${checked ? "bg-primary" : "bg-surface"}
        `}
    >
      {/* Thumb */}
      <span
        className={`
          inline-block h-4 w-4 rounded-full bg-accent transition-transform
          ${checked ? "translate-x-5" : "translate-x-0.5"}
        `}
      />
    </button>
  );
};

export default Switch;
