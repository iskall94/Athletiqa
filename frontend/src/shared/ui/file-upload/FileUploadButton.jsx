// Can accept multiple files by switching multiple to true, by default only accepts one file.
export default function FileUploadButton({
  accept,
  disabled = false,
  multiple = false,
  onChange,
  children,
  className = "",
}) {
  return (
    <label
      className={`inline-flex w-fit cursor-pointer items-center gap-2 text-primary hover:underline ${
        disabled ? "pointer-events-none opacity-50" : ""
      } ${className}`}
    >
      {children}

      <input
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}