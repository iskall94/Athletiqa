import { useState } from "react";

export default function useFormState(initialValues) {
  const [values, setValues] = useState(initialValues);

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
  };

  const reset = () => {
    setValues(initialValues);
  };

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  return { values, setValues, handleChange, setField, reset, isDirty };
}
