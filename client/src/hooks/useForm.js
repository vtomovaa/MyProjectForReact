import { useState } from "react";

export const useForm = (onSubmitHandler, initialValues) => {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
        setValues({
        ...values,
        file: files[0],
      });
    } else {
        setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(1)

    onSubmitHandler(values);
  };

  return {
    values,
    onChange,
    onSubmit,
  };
};
