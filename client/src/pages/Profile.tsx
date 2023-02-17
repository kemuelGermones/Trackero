import { useMemo } from "react";

import Instruction from "../components/instruction/Instruction";
import { ProfilePageLayout } from "../components/styles/layout/ProfilePageLayout";
import UserInfo from "../components/user/UserInfo";
import { useAppSelector } from "../store";

function Profile() {
  const userList = useAppSelector((state) => state.userList.usersData);
  const userId = useAppSelector((state) => state.user.userId);

  const user = useMemo(() => {
    if (userList) {
      return userList.find((user) => user._id === userId)!;
    }
    return null;
  }, [userList]);

  return (
    <ProfilePageLayout>
      <Instruction>
        Before updating the user credentials, please make sure that you are
        entering the correct information. Incorrect user information can result
        in permanent loss of access to your account. To avoid this, please
        double check that the information you are entering is accurate and
        up-to-date. Thank you for your attention to this important matter.
      </Instruction>
      {user ? <UserInfo userData={user} /> : null}
    </ProfilePageLayout>
  );
}

export default Profile;
