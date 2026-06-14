import { Input } from "../input";

/* 
    Radio group that builds on the Input component.
    Pass the options as [{ value ,label }, ...] and share the same name
    across all radios so only one can be selected at a time.
    HTML5 requires `required` on one radio in the group to mark
    the whole group as required, so we put it on the first option.
*/
function RadioGroup({ name, value, onChange, options, legend, required }) {
  return (
    <fieldset className="flex flex-col gap-2 mt-[1rem] text-sm">
      {legend && <legend className="text-gray-700 mb-1">{legend}</legend>}
      <div className="flex flex-wrap items-center gap-6">
        {options.map((option, index) => {
          const isChecked = value === option.value;

          return (
            <label
              key={option.value}
              className="group flex items-center gap-2 cursor-pointer"
            >
              <span
                className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors duration-300 ${isChecked ? "border-primary " : "border-gray-300 bg-bg group-hover:border-primary"}`}
              >
                <span className={`w-3 h-3 rounded-full  transition-colors duration-300   ${isChecked ? "bg-accent" : "bg-transparent"} `} />
              </span>

              <Input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={onChange}
                required={required && index === 0}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default RadioGroup;
