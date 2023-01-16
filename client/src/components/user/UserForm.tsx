import { useState } from "react";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardDivider,
  CardFooterText,
} from "../styles/UI/Card";
import Label from "../styles/UI/Label";
import Button from "../styles/UI/Button";
import Input from "../styles/UI/Input";
import Select from "../styles/UI/Select";
import Form from "../styles/UI/Form";
import useValidation from "../../hooks/useValidation";
import { registerUser, loginUser } from "../../store/user-action";

function UserForm() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    value: email,
    valueError: emailError,
    onChangeValueHandler: emailChange,
    validateValue: validateEmail,
    onResetValueHandler: resetEmail,
  } = useValidation((str) => str.trim().length > 0, "");

  const {
    value: password,
    valueError: passwordError,
    onChangeValueHandler: passwordChange,
    validateValue: validatePassword,
    onResetValueHandler: resetPassword,
  } = useValidation((str) => str.trim().length > 0, "");

  const {
    value: username,
    valueError: usernameError,
    onChangeValueHandler: usernameChange,
    validateValue: validateUsername,
    onResetValueHandler: resetUsername,
  } = useValidation((str) => str.trim().length > 0, "");

  const {
    value: role,
    onChangeValueHandler: roleChange,
    onResetValueHandler: resetRole,
  } = useValidation(null, "Administrator");

  const onChangeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    emailChange(event.target.value);
  };

  const onChangePasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    passwordChange(event.target.value);
  };

  const onChangeUsernameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    usernameChange(event.target.value);
  };

  const onChangeRoleHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    roleChange(event.target.value);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isUsernameValid = validateUsername();
    if (!isLogin && isEmailValid && isPasswordValid && isUsernameValid) {
      const registerStatus = await dispatch(registerUser({ email, username, password, role }));
      if (registerStatus === 200) navigate("/projects");
    } else if (isLogin && isEmailValid && isPasswordValid) {
      const loginStatus = await dispatch(loginUser(email, password));
      if (loginStatus === 200) navigate("/projects");
    }
  };

  const isLoginToggler = () => {
    setIsLogin((state) => !state);
    resetEmail();
    resetPassword();
    resetUsername();
  };

  return (
    <Card $width="30rem">
      <CardTitle>{!!isLogin ? "Login" : "Sign Up"}</CardTitle>
      <CardDivider />
      <Form onSubmit={onSubmitHandler}>
        <Label htmlFor="email">Your email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChangeEmailHandler}
          $isInvalid={emailError}
        />
        <Label htmlFor="password">Your password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePasswordHandler}
          $isInvalid={passwordError}
        />
        {!isLogin ? (
          <>
            <Label htmlFor="username">Your username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={onChangeUsernameHandler}
              $isInvalid={usernameError}
            />
            <Label htmlFor="role">Your role</Label>
            <Select onChange={onChangeRoleHandler} value={role}>
              <option value="Administrator">Administrator</option>
              <option value="Developer">Developer</option>
            </Select>
          </>
        ) : null}
        <Button>{!!isLogin ? "Login" : "Sign Up"}</Button>
      </Form>
      <CardFooterText onClick={isLoginToggler}>
        {!!isLogin ? "Don't have an account?" : "Have an account?"}
      </CardFooterText>
    </Card>
  );
}

export default UserForm;
