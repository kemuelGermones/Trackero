import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUser } from "../types/interface";

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
    // Save Users list Data

    updateUsersData(state, action: PayloadAction<IUser[]>) {
      state.usersData = action.payload;
    },

    // Clear users list data

    clearUsersData(state) {
      state.usersData = null;
    },
  },
});

export const { updateUsersData, clearUsersData } = userListSlice.actions;

export default userListSlice.reducer;
