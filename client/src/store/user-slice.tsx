import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUserCredentials } from "../types/interface";

interface IInitialStateUserSlice {
  login: boolean;
  userId: string | null;
  userRole: string | null;
  accessToken: string | null;
  expiration: number | null;
}

const initialState: IInitialStateUserSlice = {
  login: false,
  userId: null,
  userRole: null,
  accessToken: null,
  expiration: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Save User Credentials

    login(state, action: PayloadAction<IUserCredentials>) {
      state.login = true;
      state.userId = action.payload.id;
      state.userRole = action.payload.role;
      state.accessToken = action.payload.token;
      state.expiration = action.payload.expiresIn * 1000 + new Date().getTime();
    },

    // Clear User Credentials

    logout(state) {
      state.login = false;
      state.userId = null;
      state.userRole = null;
      state.accessToken = null;
      state.expiration = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
