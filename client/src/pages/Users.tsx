import { useState, useEffect } from "react";
import { useAppSelector } from "../store";

import {
  PageDashboardLayout,
  FirstSection,
  SecondSection,
} from "../components/styles/layout/PageDashboardLayout";
import Instruction from "../components/instruction/Instruction";
import UserTable from "../components/user/UserTable";
import UserInfo from "../components/user/UserInfo";

import { IUser } from "../types/interface";

type TAllUsersState = IUser[] | null;
type TCurrentUserState = IUser | null;

function Users() {
  const [allUsers, setAllUsers] = useState<TAllUsersState>(null);
  const [currentUser, setCurrentUser] = useState<TCurrentUserState>(null);
  const userList = useAppSelector((state) => state.userList.usersData);
  const userId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    if (userList) {
      setAllUsers(userList.filter((user) => user._id !== userId));
    }
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
    <PageDashboardLayout $templateColumns="1fr 1fr">
      <FirstSection>
        <Instruction>
          To view the user details in the table, locate the row containing it
          and click on the corresponding cell with your mouse cursor.
        </Instruction>
        {allUsers ? (
          <UserTable usersData={allUsers} setCurrentUser={setCurrentUser} />
        ) : null}
      </FirstSection>
      <SecondSection>
        {currentUser ? <UserInfo userData={currentUser} /> : null}
      </SecondSection>
    </PageDashboardLayout>
  );
}

export default Users;
