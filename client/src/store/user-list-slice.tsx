import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUser } from "../types/interface";

const initialState = {
  usersData: null,
} as { usersData: IUser[] | null };

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    // Save Users list Data

    updateUsers(state, action: PayloadAction<IUser[]>) {
      state.usersData = action.payload;
    },

    // Clear users list data

    clearUsers(state) {
      state.usersData = null;
    },

    // Update User's Username

    updateUsername(
      state,
      action: PayloadAction<{ userId: string; username: string }>
    ) {
      const userIndex = state.usersData!.findIndex(
        (user) => user._id === action.payload.userId
      );
      state.usersData![userIndex].username = action.payload.username;
    },

    // Update User's Role

    updateRole(state, action: PayloadAction<{ userId: string; role: string }>) {
      const userIndex = state.usersData!.findIndex(
        (user) => user._id === action.payload.userId
      );
      state.usersData![userIndex].role = action.payload.role;
    },
  },
});

export const { updateUsers, clearUsers, updateUsername, updateRole } =
  userListSlice.actions;

export default userListSlice.reducer;
