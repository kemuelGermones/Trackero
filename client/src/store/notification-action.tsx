import { AnyAction } from "@reduxjs/toolkit";
import { showNotif, hideNotif } from "./notification-slice";
import { RootState, ThunkAction } from "./index";

// Show notification

const showNotification = (
  title: "loading" | "success" | "error",
  message: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const { notification } = getState();
    if (notification.show) {
      dispatch(hideNotif());
      setTimeout(() => {
        dispatch(showNotif({ title, message }));
      }, 600);
    } else {
      dispatch(showNotif({ title, message }));
    }
  };
};

export default showNotification;
