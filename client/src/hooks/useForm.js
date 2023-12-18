import { useState } from "react";

export const useForm = (onSubmitHandler, initialValues) => {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) => {
    const { name, value } = e.target;
     // Validate and remove spaces for specific fields
     const sanitizedValue =
     (name === 'username' || name === 'password' || name === 'rePass' || name === 'email')
       ? value.replace(/\s/g, '')
       : value;

        setValues({
        ...values,
        [name]: sanitizedValue,
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitHandler(values);
  };

  return {
    values,
    onChange,
    onSubmit,
  };
};
