import InfoIcon from "../../assets/info.svg?react";

// Yellow info card. Small icon + body text.
// Used for explanations, warnings, and other side notes.
// Pass a custom icon component via `icon={SomeIcon}` if you need
// something other than the default info icon.
function Alert({ children, icon: Icon = InfoIcon }) {
    return (
        <div className="flex items-start gap-3 rounded-lg bg-accent-pale p-4 text-sm text-gray-700">
      <Icon className="w-5 h-5 flex-shrink-0 text-primary" aria-hidden="true" />
            <div>{children}</div>
        </div>
    );
}

export default Alert;
