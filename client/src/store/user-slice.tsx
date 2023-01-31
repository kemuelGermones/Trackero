import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRecievedUserDataAction {
  userId: string;
  userRole: "Administrator" | "Developer";
  token: string;
  expiresIn: number;
}

interface IInitialStateUserSlice {
  login: boolean;
  userId: string | null;
  userRole: "Administrator" | "Developer" | null;
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
    // Save user credentials

    login(state, action: PayloadAction<IRecievedUserDataAction>) {
      state.login = true;
      state.userId = action.payload.userId;
      state.userRole = action.payload.userRole;
      state.accessToken = action.payload.token;
      state.expiration = action.payload.expiresIn * 1000 + new Date().getTime();
    },

    // Clear user credentials

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
