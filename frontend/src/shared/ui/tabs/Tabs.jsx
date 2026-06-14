import { Button } from "../button";

/* 
    Underline styled tab bar, active tab gets a navy bottom border and text,
    inactive tabs are gray with a transparent border. 
    Can be overriden using className.
*/
function Tabs({ active, onChange, items, className = "", itemClassName = "" }) {
    return (
        <div className={`flex border-b border-gray-300 ${className}`}>
            {items.map((tab) => {
                const isActive = tab.id === active;
                return (
                    <Button
                        key={tab.id}
                        variant="none"
                        onClick={() => onChange(tab.id)}
                        className={`pb-3 px-4 font-semibold border-b-2 rounded-none ${itemClassName} ${
                            isActive
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:text-primary"
                        }`}
                    >
                        {tab.label}
                    </Button>
                );
            })}
        </div>
    );
}

export default Tabs;