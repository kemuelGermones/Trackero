import useValidation from "../../hooks/useValidation";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateUserUsername } from "../../store/user-action";

import Button from "../styles/UI/Button";
import Label from "../styles/UI/Label";
import Input from "../styles/UI/Input";
import Form from "../styles/UI/Form";

interface IUserChangeUsernameForm {
  userId: string;
}

function UserChangeUsernameForm({ userId }: IUserChangeUsernameForm) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const {
    value: username,
    valueError: usernameError,
    onChangeValueHandler: usernameChange,
    validateValue: validateUsername,
    onResetValueHandler: resetUsername,
  } = useValidation((str) => str.trim().length > 0, "");

  const onChangeUsernameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    usernameChange(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isUsernameValid = validateUsername();
    if (isUsernameValid && accessToken) {
      dispatch(updateUserUsername({ username }, userId, accessToken));
      resetUsername();
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Label htmlFor="username">Change username</Label>
      <Input
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={onChangeUsernameHandler}
        $isInvalid={usernameError}
      />
      <Button>Change</Button>
    </Form>
  );
}

export default UserChangeUsernameForm;
