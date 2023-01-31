import {
  Card,
  CardHeader,
  CardTitle,
  CardDivider,
  CardDescription,
} from "../styles/UI/Card";
import TextLight from "../styles/utils/TextLight";
import UserChangePasswordForm from "./UserChangePassword";
import UserChangeUsernameForm from "./UserChangeUsernameForm";

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
      <UserChangeUsernameForm userId={userData._id} />
      <CardDivider />
      <UserChangePasswordForm userId={userData._id} />
    </Card>
  );
}

export default UserInfo;
