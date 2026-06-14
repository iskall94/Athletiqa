import Input from "./Input";
import PasswordInput from "./PasswordInput";

function FormField({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  labelClassName = "",
  variant = "",
  error = "",
  touched = false,
  isValid = false,
  disabled = false,
  ...rest
}) {
  const hasValue = String(value || "").length > 0;
  const inputVariant = disabled
    ? "disabled"
    : error && touched
      ? "error"
      : isValid && hasValue
        ? "success"
        : hasValue
          ? "active"
          : "default";

  const showError = Boolean(error && touched);

  return (
    <label className="flex flex-col text-sm">
      <span className="flex items-center justify-between gap-4">
        <span className={`text-gray-700  ${labelClassName}`}>
          {label}
          {required && <span className="text-error text-lg ml-1">*</span>}
        </span>
        <span
          className={`
          min-h-[1.25rem] text-sm leading-5 text-error ${labelClassName}
          ${showError ? "visible" : "invisible"}
        `}
        >
          {showError ? error : "."}
        </span>
      </span>

      {type === "password" ? (
        <PasswordInput
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          variant={inputVariant}
          {...rest}
        />
      ) : (
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          variant={inputVariant}
          {...rest}
        />
      )}
    </label>
  );
}

export default FormField;
