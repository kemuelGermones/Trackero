import { useState } from "react";

function useValidation<T>(
  validation: ((str: T) => boolean) | null,
  defaultValue: T
) {
  const [value, setValue] = useState(defaultValue);
  const [valueError, setValueError] = useState(false);

  const onChangeValueHandler = (data: T) => {
    setValue(data);
    setValueError(false);
  };

  const onResetValueHandler = (data: T) => {
    setValue(data);
    setValueError(false);
  };

  const validateValue = () => {
    if (validation) {
      const valueIsValid = validation(value);
      if (!valueIsValid) setValueError(true);
      return valueIsValid;
    }
    return false;
  };

  return {
    value,
    valueError,
    onChangeValueHandler,
    onResetValueHandler,
    validateValue,
  };
}

export default useValidation;
