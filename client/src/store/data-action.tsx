import axios, { AxiosError } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import showNotification from "./notification-action";
import { updateUsersData } from "./user-list-slice";
import { updateProjectsData } from "./project-slice";
import { showLoading, hideLoading } from "./loading-slice";

import { RootState, ThunkAction } from "./index";
import { IUser, IProject } from "../types/interface";

// Get projects data and issues data

export const getData = (
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const projectResponse = await axios<IProject[]>({
        method: "get",
        url: "http://localhost:5000/projects",
        headers: {
          Authorization: token,
        },
      });
      const userResponse = await axios<IUser[]>({
        method: "get",
        url: "http://localhost:5000/users",
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(projectResponse.data));
      dispatch(updateUsersData(userResponse.data));
      dispatch(hideLoading());
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};
