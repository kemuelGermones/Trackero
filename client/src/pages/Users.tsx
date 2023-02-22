import { useCallback, useEffect, useState } from "react";

import Info from "../components/info/Info";
import { PageDashboardLayout } from "../components/styles/layout/PageDashboardLayout";
import UserInfo from "../components/user/UserInfo";
import UserTable from "../components/user/UserTable";
import { useAppSelector } from "../store";
import { IUser } from "../types/interface";

type TCurrentUserState = IUser | null;

function Users() {
  const [currentUser, setCurrentUser] = useState<TCurrentUserState>(null);
  const userId = useAppSelector((state) => state.user.userId);
  const userList = useAppSelector((state) => state.userList.usersData)?.filter(
    (user) => user._id !== userId
  );

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

  return userList ? (
    <PageDashboardLayout $templateColumns="1.5fr 1fr">
      <div>
        <Info>
          To view the user details in the table, locate the row containing it
          and click on the corresponding cell with your mouse cursor.
        </Info>
        <UserTable
          usersData={userList}
          setCurrentUser={setCurrentUserHandler}
        />
      </div>
      <div>
        {currentUser ? (
          <UserInfo userData={currentUser} key={currentUser._id} />
        ) : null}
      </div>
    </PageDashboardLayout>
  ) : null;
}

export default Users;
