import { useState, useEffect, useMemo } from "react";
import { useAppSelector } from "../store";
import { updateUserUsername, updateUserPassword } from "../store/user-action";

import {
  PageDashboardLayout,
  FirstSection,
  SecondSection,
} from "../components/styles/layout/PageDashboardLayout";
import Instruction from "../components/instruction/Instruction";
import { Card, CardDivider } from "../components/styles/UI/Card";
import UserInputUpdateForm from "../components/user/UserInputUpdateForm";
import UserSelectUpdateForm from "../components/user/UserSelectUpdateForm";
import UserTable from "../components/user/UserTable";
import UserInfo from "../components/user/UserInfo";

import { IUser } from "../types/interface";

type TCurrentUserState = IUser | null;

function Users() {
  const [currentUser, setCurrentUser] = useState<TCurrentUserState>(null);
  const userList = useAppSelector((state) => state.userList.usersData);
  const userId = useAppSelector((state) => state.user.userId);

  const allUsers = useMemo(() => {
    if (userList) {
      return userList.filter((user) => user._id !== userId);
    }
    return null;
  }, [userList]);

  useEffect(() => {
    if (allUsers) {
      setCurrentUser((state) => {
        if (state) {
          const user = allUsers.find((user) => user._id === state._id);
          return user ? user : null;
        }
        return state;
      });
    }
  }, [allUsers]);

  return (
    <PageDashboardLayout $templateColumns="1.5fr 1fr">
      <FirstSection>
        {allUsers ? (
          <>
            <Instruction>
              To view the user details in the table, locate the row containing
              it and click on the corresponding cell with your mouse cursor.
            </Instruction>
            <UserTable usersData={allUsers} setCurrentUser={setCurrentUser} />
          </>
        ) : null}
      </FirstSection>
      <SecondSection>
        {currentUser ? (
          <Card $width="100%">
            <UserInfo userData={currentUser} />
            <CardDivider />
            <UserSelectUpdateForm userData={currentUser} />
            <CardDivider />
            <UserInputUpdateForm
              inputType="text"
              name="username"
              userId={currentUser._id}
              submitFunction={updateUserUsername}
            />
            <CardDivider />
            <UserInputUpdateForm
              inputType="password"
              name="password"
              userId={currentUser._id}
              submitFunction={updateUserPassword}
            />
          </Card>
        ) : null}
      </SecondSection>
    </PageDashboardLayout>
  );
}

export default Users;
