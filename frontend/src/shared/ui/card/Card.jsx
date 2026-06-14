/*
  Generic card container, wraps the childrren in a rounded box with
  either a subtle border or a soft shadow.
  Everything pas the styling props is forwarded to the 
  underlying div
*/
function Card({ children, shadow = false, className = "", ...rest }) {
    const base = shadow
        ? "rounded-xl bg-bg shadow-md p-6"
        : "rounded-xl border border-gray-300 bg-bg p-6";

    return (
        <div className={`${base} ${className}`} {...rest}>
            {children}
        </div>
    );
}

export default Card;