import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUser } from "../types/interface";

interface IUserListIniitalState {
  usersData: IUser[] | null;
}

interface IUpdateUserUsernameDataAction {
  userId: string;
  username: string;
}

const initialState: IUserListIniitalState = {
  usersData: null,
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    // Save Users list Data

    updateUsersData(state, action: PayloadAction<IUser[]>) {
      state.usersData = action.payload;
    },

    // Clear users list data

    clearUsersData(state) {
      state.usersData = null;
    },

    // Update Users Username

    updateUserUsernameData(
      state,
      action: PayloadAction<IUpdateUserUsernameDataAction>
    ) {
      if (state.usersData) {
        const userIndex = state.usersData.findIndex(
          (user) => user._id === action.payload.userId
        );
        state.usersData[userIndex].username = action.payload.username;
      }
    },
  },
});

export const { updateUsersData, clearUsersData, updateUserUsernameData } =
  userListSlice.actions;

export default userListSlice.reducer;
