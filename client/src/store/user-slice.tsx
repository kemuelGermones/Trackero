import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IRecievedUserData } from "../types/interface";

interface IInitialStateUserSlice {
  login: boolean;
  userId: string | null;
  accessToken: string | null;
  expiration: number | null;
}

const initialState: IInitialStateUserSlice = {
  login: false,
  userId: null,
  accessToken: null,
  expiration: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    login(state, action: PayloadAction<IRecievedUserData>) {
      state.login = true;
      state.userId = action.payload.id;
      state.accessToken = action.payload.token;
      state.expiration = action.payload.expiresIn * 1000 + new Date().getTime();
    },
    logout(state) {
      state.login = false;
      state.userId = null;
      state.accessToken = null;
      state.expiration = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
