const CheckBox = (props) => {
  const { label, required, checked, onChange, className, name, id } = props;

  return (
    <label className={`group flex items-center gap-2 ${className}`}>
      <span
        className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors duration-300 ${checked ? "border-primary bg-primary " : "border-gray-300 bg-bg group-hover:border-primary"}`}
      />
      <input
        type="checkbox"
        id={id}
        name={name}
        required={required}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  );
};

export default CheckBox;
