import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRecievedUserDataAction {
  userId: string;
  token: string;
  expiresIn: number;
}

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
  name: "user",
  initialState,
  reducers: {
    // Save user credentials

    login(state, action: PayloadAction<IRecievedUserDataAction>) {
      state.login = true;
      state.userId = action.payload.userId;
      state.accessToken = action.payload.token;
      state.expiration = action.payload.expiresIn * 1000 + new Date().getTime();
    },
    
    // Clear user credentials 

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
