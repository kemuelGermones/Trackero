import { useLocation } from "react-router-dom";

import useValidation from "../../hooks/useValidation";
import { useAppDispatch } from "../../store";
import {
  updatePasswordRequest,
  updateRoleRequest,
  updateUserUsernameRequest,
  updateYourUsernameRequest,
} from "../../store/user-action";
import { IUser } from "../../types/interface";
import { Button } from "../styles/UI/Button";
import {
  Card,
  CardBody,
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
    if (isUsernameValid && location.pathname === "/profile") {
      dispatch(updateYourUsernameRequest(username, userData._id));
    }
    if (isUsernameValid && location.pathname === "/users") {
      dispatch(updateUserUsernameRequest(username, userData._id));
    }
  };

  const onSubmitPasswordHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isPasswordValid = validatePassword();
    if (isPasswordValid) {
      dispatch(updatePasswordRequest(password, userData._id));
      resetPassword("");
    }
  };

  const onSubmitRoleHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateRoleRequest(role, userData._id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardBody>
        <TextLight>Email: </TextLight>
        {userData.email}
      </CardBody>
      <CardBody>
        <TextLight>Username: </TextLight>
        {userData.username}
      </CardBody>
      <CardBody>
        <TextLight>Role: </TextLight>
        {userData.role}
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
