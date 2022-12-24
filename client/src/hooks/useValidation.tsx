import { useState } from "react";

type TValidation = (str: string) => boolean;

function useValidation(validation: TValidation | null, defaultValue: string) {
  const [value, setValue] = useState(defaultValue);
  const [valueError, setValueError] = useState(false);

  const onChangeValueHandler = (text: string) => {
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
