import axios, { AxiosError } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import showNotification from "./notification-action";
import { showLoading, hideLoading } from "./loading-slice";
import { login, logout } from "./user-slice";
import { clearProjectsData, updateProjectsData } from "./project-slice";
import { clearUsersData, updateUserUsernameData, updateUserRoleData } from "./user-list-slice";

import { RootState, ThunkAction } from "./index";
import { IUserData, IProject } from "../types/interface";

// Registers the user

export const registerUser = (
  data: IUserData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios.post(
        "http://localhost:5000/users/register",
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
      const postResponse = await axios.post("http://localhost:5000/users/login", {
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

// Update user's username

export const updateUserUsername = (
  value: string,
  userId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const patchResponse = await axios({
        method: "patch",
        url: `http://localhost:5000/users/${userId}/username`,
        data: { username: value },
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(patchResponse.data.payload));
      dispatch(updateUserUsernameData({ username: value, userId }));
      dispatch(hideLoading());
      dispatch(showNotification("success", patchResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

// Update user's password

export const updateUserPassword = (
  value: string,
  userId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const patchResponse = await axios({
        method: "patch",
        url: `http://localhost:5000/users/${userId}/password`,
        data: { password: value },
        headers: {
          Authorization: token,
        },
      });
      dispatch(hideLoading());
      dispatch(showNotification("success", patchResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};

//  Update user's role

export const updateUserRole = (
  value: string,
  userId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const patchResponse = await axios({
        method: "patch",
        url: `http://localhost:5000/users/${userId}/role`,
        data: { role: value },
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateUserRoleData({ role: value, userId }));
      dispatch(hideLoading());
      dispatch(showNotification("success", patchResponse.data.message));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
    }
  };
};
