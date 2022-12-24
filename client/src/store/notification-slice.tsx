import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  show: boolean;
  title: "success" | "error" | "loading" | null;
  message: string | null;
}

interface IShowNotifAction {
  title: "success" | "error" | "loading";
  message: string;
}

const initialState: IInitialState = {
  show: false,
  title: null,
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // Show Notification

    showNotif(state, action: PayloadAction<IShowNotifAction>) {
      state.show = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },

    // Hide Notification

    hideNotif(state) {
      state.show = false;
    },
  },
});

export const { showNotif, hideNotif } = notificationSlice.actions;

export default notificationSlice.reducer;
