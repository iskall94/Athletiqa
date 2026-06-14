/*
    Multi-line text input which utilizes the same baseline look as input
    with resize off by default. Pass `rows` to change innerHeight, or override it via className
*/
function TextArea({ className = "", rows = 4, ...rest }) {
    return (
        <textarea
            className={`rounded-lg border border-gray-300 px-3 py-2 resize-none ${className}`}
            rows={rows}
            {...rest}
        />
    );
}

export default TextArea;