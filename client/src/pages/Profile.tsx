import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../store";

import { ProfilePageLayout } from "../components/styles/layout/ProfilePageLayout";
import Instruction from "../components/instruction/Instruction";
import UserInfo from "../components/user/UserInfo";

import { IUser } from "../types/interface";

type TUserState = IUser | null;

function Profile() {
  const [user, setUser] = useState<TUserState>(null);
  const userList = useAppSelector((state) => state.userList.usersData);
  const { userId } = useParams();
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
          <UserInfo userData={user} />
        </>
      ) : null}
    </ProfilePageLayout>
  );
}

export default Profile;
