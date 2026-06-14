// Text-style inputs get a baseline look so consumers don't
// have to repeat the same border/padding everywhere.
// Radios and checkboxes skip the baseline since the padding
// would mess up their layout.
const TEXT_LIKE_TYPES = ["text", "email", "password", "search", "tel", "url", "number"];
const BASE = "rounded-lg border px-3 py-2 outline-none transition-colors duration-300";
const inputVariants= {
    default: " border-gray-300 bg-bg text-gray-700 hover:border-primary",
    active: "border-accent bg-bg text-gray-700 ",
    success: "border-success bg-bg text-gray-700",
    disabled: "border-gray-300 bg-gray-300  ",
    error: "border-error bg-bg "

}
const Input = (props) => {
    const {
        className = "",
        type = "text",
        placeholder = "",
        value,
        onChange,
        disabled,
        variant="default",
        id = "",
        name = "",
        required,
        ...rest
    } = props;

    const baseline = TEXT_LIKE_TYPES.includes(type) ? BASE : "";
    const variantClass=disabled? inputVariants.disabled: inputVariants[variant] || inputVariants.default;
    return (
        <input
            className={`${baseline} ${variantClass} ${className} `}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            id={id}
            name={name}
            required={required}
            {...rest}
        />
    );
};

export default Input;
