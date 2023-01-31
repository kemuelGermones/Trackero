import useValidation from "../../hooks/useValidation";
import { useAppDispatch, useAppSelector } from "../../store";

import { Button } from "../styles/UI/Button";
import { Form, Label, Input } from "../styles/UI/Form";

import { RootState, ThunkAction } from "../../store/index";
import { AnyAction } from "@reduxjs/toolkit";

interface IUserChangeUsernameForm {
  userId: string;
  name: string;
  inputType: string;
  submitFunction: (
    value: string,
    userId: string,
    token: string
  ) => ThunkAction<void, RootState, unknown, AnyAction>;
}

function UserUpdateForm({
  userId,
  name,
  inputType,
  submitFunction,
}: IUserChangeUsernameForm) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const {
    value,
    valueError,
    onChangeValueHandler,
    validateValue,
    onResetValueHandler,
  } = useValidation((str) => str.trim().length > 0, "");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValueHandler(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValueValid = validateValue();
    if (isValueValid && accessToken) {
      dispatch(submitFunction(value, userId, accessToken));
      onResetValueHandler();
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Label htmlFor={name}>
        Change {name[0].toUpperCase().concat(name.slice(1))}
      </Label>
      <Input
        id={name}
        type={inputType}
        placeholder={name[0].toUpperCase().concat(name.slice(1))}
        value={value}
        onChange={onChangeHandler}
        $isInvalid={valueError}
      />
      <Button>Change</Button>
    </Form>
  );
}

export default UserUpdateForm;
