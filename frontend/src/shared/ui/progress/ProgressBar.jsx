/* 
    Horizontal progress bar, light track + accent fill driven by percentage (0-100).
    Outer styling like height/colors can be overriden via className.
*/
function ProgressBar({ percent = 0, className = "" }) {
    // Clamp to 0-100 so weird inputs don't blow out the bar
    const fill = Math.min(Math.max(percent, 0), 100);

    return (
        <div
            className={`w-full h-2 rounded-full bg-accent-light overflow-hidden ${className}`}
        >
            <div
                className="h-full bg-accent rounded-full"
                style={{ width: `${fill}%` }}
            />
        </div>
    );
}

export default ProgressBar;