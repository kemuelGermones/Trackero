import { useCallback, useEffect, useState } from "react";

import Instruction from "../components/instruction/Instruction";
import { PageDashboardLayout } from "../components/styles/layout/PageDashboardLayout";
import UserInfo from "../components/user/UserInfo";
import UserTable from "../components/user/UserTable";
import { useAppSelector } from "../store";
import { IUser } from "../types/interface";

type TCurrentUserState = IUser | null;

function Users() {
  const [currentUser, setCurrentUser] = useState<TCurrentUserState>(null);
  const userList = useAppSelector((state) => state.userList.usersData);

  useEffect(() => {
    if (userList && currentUser) {
      setCurrentUser((state) => {
        const user = userList.find((user) => user._id === state!._id);
        return user ? user : null;
      });
    }
  }, [userList]);

  const setCurrentUserHandler = useCallback((user: IUser) => {
    setCurrentUser(user);
  }, []);

  return (
    <PageDashboardLayout $templateColumns="1.5fr 1fr">
      <div>
        <Instruction>
          To view the user details in the table, locate the row containing it
          and click on the corresponding cell with your mouse cursor.
        </Instruction>
        {userList ? (
          <UserTable
            usersData={userList}
            setCurrentUser={setCurrentUserHandler}
          />
        ) : null}
      </div>
      <div>
        {currentUser ? (
          <UserInfo userData={currentUser} key={currentUser._id} />
        ) : null}
      </div>
    </PageDashboardLayout>
  );
}

export default Users;
