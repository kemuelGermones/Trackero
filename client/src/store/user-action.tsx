import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import {
  IResponseData,
  IUser,
  IUserCredentials,
  IUserFormData,
} from "../types/interface";
import { RootState, ThunkAction } from "./index";
import { IProjectResponseData } from "./project-action";
import { clearProjectsData, updateProjectsData } from "./project-slice";
import {
  clearUsersData,
  updateUserUsernameData,
  updateUsersData,
} from "./user-list-slice";
import { login, logout, updateUsername } from "./user-slice";

interface IUserResponseData extends IResponseData {
  payload: IUser[];
}

const URL = "http://localhost:5000";

// Get Users

export const getUsers = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const getResponse = await axios<IUserResponseData>({
        method: "get",
        url: `${URL}/users`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateUsersData(getResponse.data.payload));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

// Registers the User

export const registerUser = (
  data: IUserFormData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const postResponse = await axios.post<IUserCredentials>(
        `${URL}/users/register`,
        data
      );
      dispatch(login({ ...postResponse.data }));
      toast.success("Successfully created an account");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

// logins the User

export const loginUser = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const postResponse = await axios.post<IUserCredentials>(
        `${URL}/users/login`,
        {
          email,
          password,
        }
      );
      dispatch(login({ ...postResponse.data }));
      toast.success("Welcome back");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

// Logouts the User

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

// Update User's Username

export const updateUserUsername = (
  value: string,
  userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const patchResponse = await axios<IProjectResponseData>({
        method: "patch",
        url: `${URL}/users/${userId}/username`,
        data: { username: value },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      if (userId === state.user.userId) {
        dispatch(updateUsername(value));
      }
      if (
        state.user.userRole === "Administrator" &&
        userId !== state.user.userId
      ) {
        dispatch(updateUserUsernameData({ userId, username: value }));
      }
      dispatch(updateProjectsData(patchResponse.data.payload));
      toast.success(patchResponse.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

// Update User's Password

export const updateUserPassword = (
  value: string,
  userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const patchResponse = await axios<IResponseData>({
        method: "patch",
        url: `${URL}/users/${userId}/password`,
        data: { password: value },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      toast.success(patchResponse.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};

//  Update User's Role

export const updateUserRole = (
  value: string,
  userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const patchResponse = await axios<IUserResponseData>({
        method: "patch",
        url: `${URL}/users/${userId}/role`,
        data: { role: value },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateUsersData(patchResponse.data.payload));
      toast.success(patchResponse.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      }
    }
  };
};
