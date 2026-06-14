import { useState } from "react";
import { Button } from "../button";
import Input from "./Input";
import EyeIcon from "../../assets/eye.svg?react";
import EyeOffIcon from "../../assets/eye-off.svg?react";

// Password input with an eye toggle to show/hide the text.
// Used in login, register, and the security settings tab.
function PasswordInput({ value, onChange, name, id, variant = "default" }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        name={name}
        id={id}
        value={value}
        variant={variant}
        onChange={onChange}
        className="w-full pr-10"
      />
      <Button
        variant="none"
        size="icon"
        onClick={() => setShow((prev) => !prev)}
        aria-label={show ? "Dölj lösenord" : "Visa lösenord"}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {show ? (
          <EyeOffIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}

export default PasswordInput;
