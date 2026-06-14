import { useState } from "react";
import { validateEmail } from "../../../shared/lib/validateEmail";

const useLoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (!value) {
      return "Detta fält är obligatorisk";
    }

    if (name === "email") {
      return validateEmail(value);
    }

    if (name === "password" && value.length < 8) {
      return "Lösenordet måste innehålla minst 8 tecken.";
    }

    return "";
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateField("email", user.email);
    const passwordError = validateField("password", user.password);
    setTouched({
      email: true,
      password: true,
    });

    setErrors({
        email:emailError,
        password:passwordError
    });

    if(emailError || passwordError)
    {
        return;
    }

  };

  return {
    user,
    touched,
    errors,
    handleSubmit,
    handleInput,
  };
};

export default useLoginForm;
