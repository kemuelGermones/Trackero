import axios, { AxiosError } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import showNotification from "./notification-action";
import { updateUsersData } from "./user-list-slice";
import { updateProjectsData } from "./project-slice";
import { showLoading, hideLoading } from "./loading-slice";

import { RootState, ThunkAction } from "./index";

// Get Projects Data and Users Data

export const getData = (
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const getResponse = await axios({
        method: "get",
        url: "http://localhost:5000/data",
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(getResponse.data.projects));
      dispatch(updateUsersData(getResponse.data.users));
      dispatch(hideLoading());
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};
