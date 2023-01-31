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
} from "../styles/UI/Card";
import TextLight from "../styles/utils/TextLight";
import UserUpdateForm from "./UserUpdateForm";

import { IUser } from "../../types/interface";

interface IUserInfo {
  userData: IUser;
}

function UserInfo({ userData }: IUserInfo) {
  return (
    <Card $width="45rem">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardDescription $hasLimit={false}>
        <TextLight>Email: </TextLight>
        {userData.email}
      </CardDescription>
      <CardDescription $hasLimit={false}>
        <TextLight>Username: </TextLight>
        {userData.username}
      </CardDescription>
      <CardDescription $hasLimit={false}>
        <TextLight>Role: </TextLight>
        {userData.role}
      </CardDescription>
      <CardDivider />
      <CardDescription $hasLimit={false}>
        Before updating the user credentials, please make sure that you are
        entering the correct information. Incorrect user information can result
        in permanent loss of access to your account. To avoid this, please
        double check that the information you are entering is accurate and
        up-to-date. Thank you for your attention to this important matter.
      </CardDescription>
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
