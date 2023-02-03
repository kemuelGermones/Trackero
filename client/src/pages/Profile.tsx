import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../store";
import { updateUserUsername, updateUserPassword } from "../store/user-action";

import { ProfilePageLayout } from "../components/styles/layout/ProfilePageLayout";
import { Card, CardDivider } from "../components/styles/UI/Card";
import Instruction from "../components/instruction/Instruction";
import UserInfo from "../components/user/UserInfo";
import UserInputUpdateForm from "../components/user/UserInputUpdateForm";

import { IUser } from "../types/interface";

type TUserState = IUser | null;

function Profile() {
  const [user, setUser] = useState<TUserState>(null);
  const userList = useAppSelector((state) => state.userList.usersData);
  const userId = useAppSelector((state) => state.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (userList) {
      const foundUser = userList.find((user) => user._id === userId);
      if (foundUser) {
        setUser(foundUser);
      } else {
        navigate("/error");
      }
    }
  }, [userList]);

  return (
    <ProfilePageLayout>
      {user ? (
        <>
          <Instruction>
            Before updating the user credentials, please make sure that you are
            entering the correct information. Incorrect user information can
            result in permanent loss of access to your account. To avoid this,
            please double check that the information you are entering is
            accurate and up-to-date. Thank you for your attention to this
            important matter.
          </Instruction>
          <Card $width="100%">
            <UserInfo userData={user} />
            <CardDivider />
            <UserInputUpdateForm
              inputType="text"
              name="username"
              userId={user._id}
              submitFunction={updateUserUsername}
            />
            <CardDivider />
            <UserInputUpdateForm
              inputType="password"
              name="password"
              userId={user._id}
              submitFunction={updateUserPassword}
            />
          </Card>
        </>
      ) : null}
    </ProfilePageLayout>
  );
}

export default Profile;
