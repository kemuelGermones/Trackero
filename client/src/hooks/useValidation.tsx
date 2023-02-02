import { useState, useEffect } from "react";

function useValidation<T>(
  validation: ((str: T) => boolean) | null,
  defaultValue: T
) {
  const [value, setValue] = useState(defaultValue);
  const [valueError, setValueError] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onChangeValueHandler = (text: T) => {
    setValue(text);
    setValueError(false);
  };

  const onResetValueHandler = () => {
    setValue(defaultValue);
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
