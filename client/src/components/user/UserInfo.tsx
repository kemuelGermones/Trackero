import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
} from "../styles/UI/Card";
import TextLight from "../styles/utils/TextLight";

import { IUser } from "../../types/interface";

interface IUserInfo {
  userData: IUser;
}

function UserInfo({ userData }: IUserInfo) {
  return (
    <>
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
    </>
  );
}

export default UserInfo;
