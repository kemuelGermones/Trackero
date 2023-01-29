import axios, { AxiosError } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import showNotification from "./notification-action";
import { showLoading, hideLoading } from "./loading-slice";
import { login, logout } from "./user-slice";
import { clearProjectsData } from "./project-slice";
import { clearUsersData } from "./user-list-slice";

import { RootState, ThunkAction } from "./index";
import { IUserData } from "../types/interface";

// Registers the user

export const registerUser = (
  data: IUserData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios.post(
        "http://localhost:5000/register",
        data
      );
      dispatch(
        login({
          userId: postResponse.data.id,
          userRole: postResponse.data.role,
          token: postResponse.data.token,
          expiresIn: postResponse.data.expiresIn,
        })
      );
      dispatch(hideLoading());
      dispatch(showNotification("success", "Successfully created an account"));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

// logins the user

export const loginUser = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      dispatch(
        login({
          userId: postResponse.data.id,
          userRole: postResponse.data.role,
          token: postResponse.data.token,
          expiresIn: postResponse.data.expiresIn,
        })
      );
      dispatch(hideLoading());
      dispatch(showNotification("success", "Welcome back"));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

// Logouts the user

export const logoutUser = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(clearProjectsData());
    dispatch(clearUsersData());
  };
};
