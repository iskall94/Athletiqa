// Pill-shape label for tags, categories, sport names, etc.
// Passive (not clickable) — use Button if you need a clickable variant.
function Chip({ children, className = "" }) {
    return (
        <span
            className={`px-4 py-2 rounded-lg border border-gray-300 bg-surface text-sm text-gray-700 ${className}`}
        >
            {children}
        </span>
    );
}

export default Chip;