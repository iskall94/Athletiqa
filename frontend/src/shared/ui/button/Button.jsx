// Maps each variant to the Tailwind classes for its idle/hover/active states.
// Add a new variant by adding a new key here.
const VARIANTS = {
  // Button hovers
  primary:
    "bg-primary text-white border border-primary hover:bg-accent hover:text-primary hover:border-accent active:bg-primary active:text-white active:border-primary",
  outline:
    "border border-primary text-primary hover:bg-primary-light hover:border-primary-light hover:text-white",
  accent: "bg-accent text-primary border border-accent",
  danger:
    "border border-red-600 text-red-600 hover:bg-red-50 active:bg-red-600 active:text-white",
  ghost: "text-primary hover:underline",
  dashed:
    "border border-gray-300 border-dashed bg-surface text-gray-700 hover:border-primary transition-colors",
  menuItem: "!block w-full text-left !rounded-none !px-4 hover:bg-gray-100",
  none: "",

  // Text hovers
  textOutline: "text-primary hover:text-primary-light transition-colors",
  textPrimary: "text-white hover:text-primary transition-colors",
};

// Padding presets. `icon` is for small icon-only buttons (eye toggles, etc).
const SIZES = {
  default: "px-4 py-2",
  icon: "p-1",
  tab: "px-0 py-0 text-lg leading-5 rounded-none"
};

// Shared by every button regardless of variant/size.
const BASE =
  "rounded-lg text-sm cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const Button = (props) => {
  const {
    className = "",
    type = "button",
    variant = "primary",
    size = "default",
    children,
    disabled,
    onClick,
    ...rest
  } = props;

  return (
    <button
      className={`${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
