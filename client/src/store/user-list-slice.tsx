import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../types/interface";

interface IUserId {
  userId: string;
}

interface IUpdateUserUsernameDataAction extends IUserId {
  username: string;
}

interface IUserListIniitalState {
  usersData: IUser[] | null;
}

const initialState: IUserListIniitalState = {
  usersData: null,
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    // Save users list data

    updateUsersData(state, action: PayloadAction<IUser[]>) {
      state.usersData = action.payload;
    },

    // Clear users list data

    clearUsersData(state) {
      state.usersData = null;
    },

    // Update user's username

    updateUserUsernameData(
      state,
      action: PayloadAction<IUpdateUserUsernameDataAction>
    ) {
      if (state.usersData) {
        const foundUserIndex = state.usersData.findIndex(
          (user) => user._id === action.payload.userId
        );
        state.usersData[foundUserIndex].username = action.payload.username;
      }
    },

    // Update user's role

    updateUserRoleData(state, action) {
      if (state.usersData) {
        const foundUserIndex = state.usersData.findIndex(
          (user) => user._id === action.payload.userId
        );
        state.usersData[foundUserIndex].role = action.payload.role;
      }
    },
  },
});

export const {
  updateUsersData,
  clearUsersData,
  updateUserUsernameData,
  updateUserRoleData,
} = userListSlice.actions;

export default userListSlice.reducer;
