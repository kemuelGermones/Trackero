import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

import { RootState, ThunkAction } from ".";
import {
  IPayloadResponseData,
  IResponseData,
  IUser,
  IUserCredentials,
  IUserFormData,
} from "../types/interface";
import { clearProjects, updateProjectsUsername } from "./project-slice";
import {
  clearUsers,
  updateRole,
  updateUsername,
  updateUsers,
} from "./user-list-slice";
import { login, logout, updateYourUsername } from "./user-slice";

const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Get Users

export const getUsersRequest = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const getProjectsResponse = await axios<IPayloadResponseData<IUser[]>>({
        method: "get",
        url: `${URL}/users`,
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateUsers(getProjectsResponse.data.payload));
    } catch (e) {}
  };
};

// Registers the User

export const registerRequest = (
  data: IUserFormData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const postResponse = await axios.post<
        IPayloadResponseData<IUserCredentials>
      >(`${URL}/users/register`, data);
      dispatch(login({ ...postResponse.data.payload }));
      toast.success(postResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

// logins the User

export const loginRequest = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const postResponse = await axios.post<
        IPayloadResponseData<IUserCredentials>
      >(`${URL}/users/login`, {
        email,
        password,
      });
      dispatch(login({ ...postResponse.data.payload }));
      toast.success(postResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

// Logouts the User

export const logoutRequest = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(clearProjects());
    dispatch(clearUsers());
  };
};

// Update Your Username

export const updateYourUsernameRequest = (
  username: string,
  userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const patchResponse = await axios<IResponseData>({
        method: "patch",
        url: `${URL}/users/${userId}/username`,
        data: { username },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateYourUsername(username));
      dispatch(updateProjectsUsername({ userId, username }));
      toast.success(patchResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

// Update User's Username

export const updateUserUsernameRequest = (
  username: string,
  userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const patchResponse = await axios<IResponseData>({
        method: "patch",
        url: `${URL}/users/${userId}/username`,
        data: { username },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateUsername({ userId, username }));
      dispatch(updateProjectsUsername({ userId, username }));
      toast.success(patchResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

// Update User's Password

export const updatePasswordRequest = (
  password: string,
  userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const patchResponse = await axios<IResponseData>({
        method: "patch",
        url: `${URL}/users/${userId}/password`,
        data: { password },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      toast.success(patchResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};

//  Update User's Role

export const updateRoleRequest = (
  role: string,
  userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const patchResponse = await axios<IResponseData>({
        method: "patch",
        url: `${URL}/users/${userId}/role`,
        data: { role },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      dispatch(updateRole({ role, userId }));
      toast.success(patchResponse.data.message, { containerId: "bottom" });
    } catch (e) {}
  };
};
