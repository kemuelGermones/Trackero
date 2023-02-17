import { useLocation } from "react-router-dom";

import useValidation from "../../hooks/useValidation";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  updateUserPassword,
  updateUserRole,
  updateUserUsername,
} from "../../store/user-action";
import { IUser } from "../../types/interface";
import { Button } from "../styles/UI/Button";
import {
  Card,
  CardBody,
  CardDescription,
  CardDivider,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../styles/UI/Card";
import { Form, Input, Label, Select } from "../styles/UI/Form";
import TextLight from "../styles/utils/TextLight";

interface IUserInfo {
  userData: IUser;
}

function UserInfo({ userData }: IUserInfo) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const location = useLocation();

  const {
    value: username,
    valueError: usernameError,
    onChangeValueHandler: usernameChange,
    validateValue: validateUsername,
  } = useValidation((str) => str.trim().length > 0, userData.username);

  const {
    value: password,
    valueError: passwordError,
    onChangeValueHandler: passwordChange,
    validateValue: validatePassword,
    onResetValueHandler: resetPassword,
  } = useValidation((str) => str.trim().length > 0, "");

  const { value: role, onChangeValueHandler: roleChange } = useValidation(
    null,
    userData.role
  );

  const onChangeUsernameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    usernameChange(event.target.value);
  };

  const onChangePasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    passwordChange(event.target.value);
  };

  const onChangeRoleHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    roleChange(event.target.value);
  };

  const onSubmitUsernameHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isUsernameValid = validateUsername();
    if (isUsernameValid && accessToken) {
      dispatch(updateUserUsername(username, userData._id, accessToken));
    }
  };

  const onSubmitPasswordHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isPasswordValid = validatePassword();
    if (isPasswordValid && accessToken) {
      console.log({ username, userId: userData._id, accessToken });
      dispatch(updateUserPassword(password, userData._id, accessToken));
      resetPassword("");
    }
  };

  const onSubmitRoleHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (accessToken) {
      dispatch(updateUserRole(role, userData._id, accessToken));
    }
  };

  return (
    <Card $width="100%">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardBody>
        <CardDescription $hasLimit={false}>
          <TextLight>Email: </TextLight>
          {userData.email}
        </CardDescription>
      </CardBody>
      <CardBody>
        <CardDescription $hasLimit={false}>
          <TextLight>Username: </TextLight>
          {userData.username}
        </CardDescription>
      </CardBody>
      <CardBody>
        <CardDescription $hasLimit={false}>
          <TextLight>Role: </TextLight>
          {userData.role}
        </CardDescription>
      </CardBody>
      <CardDivider />
      <Form onSubmit={onSubmitUsernameHandler}>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="Username"
          value={username}
          onChange={onChangeUsernameHandler}
          $isInvalid={usernameError}
        />
        <CardFooter $templateColumns="1fr">
          <Button>Change Username</Button>
        </CardFooter>
      </Form>
      <CardDivider />
      <Form onSubmit={onSubmitPasswordHandler}>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePasswordHandler}
          $isInvalid={passwordError}
        />
        <CardFooter $templateColumns="1fr">
          <Button>Change Password</Button>
        </CardFooter>
      </Form>
      {location.pathname === "/users" ? (
        <>
          <CardDivider />
          <Form onSubmit={onSubmitRoleHandler}>
            <Label htmlFor="role">Role</Label>
            <Select id="role" onChange={onChangeRoleHandler} value={role}>
              <option value="Developer">Developer</option>
              <option value="Administrator">Administrator</option>
            </Select>
            <CardFooter $templateColumns="1fr">
              <Button>Change Role</Button>
            </CardFooter>
          </Form>
        </>
      ) : null}
    </Card>
  );
}

export default UserInfo;
