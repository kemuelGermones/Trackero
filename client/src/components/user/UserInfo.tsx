import {
  updateUserUsername,
  updateUserPassword,
} from "../../store/user-action";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDivider,
  CardDescription,
  CardBody,
} from "../styles/UI/Card";
import TextLight from "../styles/utils/TextLight";
import UserUpdateForm from "./UserUpdateForm";

import { IUser } from "../../types/interface";

interface IUserInfo {
  userData: IUser;
}

function UserInfo({ userData }: IUserInfo) {
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
      <UserUpdateForm
        inputType="text"
        name="username"
        userId={userData._id}
        submitFunction={updateUserUsername}
      />
      <CardDivider />
      <UserUpdateForm
        inputType="password"
        name="password"
        userId={userData._id}
        submitFunction={updateUserPassword}
      />
    </Card>
  );
}

export default UserInfo;
