import useValidation from "../../hooks/useValidation";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateUserPassword } from "../../store/user-action";

import Button from "../styles/UI/Button";
import Label from "../styles/UI/Label";
import Input from "../styles/UI/Input";
import Form from "../styles/UI/Form";

interface IUserChangePasswordForm {
  userId: string;
}

function UserChangePasswordForm({ userId }: IUserChangePasswordForm) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const {
    value: password,
    valueError: passwordError,
    onChangeValueHandler: passwordChange,
    validateValue: validatePassword,
    onResetValueHandler: resetPassword,
  } = useValidation((str) => str.trim().length > 0, "");

  const onChangePasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    passwordChange(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isPasswordValid = validatePassword();
    if (isPasswordValid && accessToken) {
      dispatch(updateUserPassword({ password }, userId, accessToken));
      resetPassword();
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Label htmlFor="password">Change password</Label>
      <Input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={onChangePasswordHandler}
        $isInvalid={passwordError}
      />
      <Button>Change</Button>
    </Form>
  );
}

export default UserChangePasswordForm;
