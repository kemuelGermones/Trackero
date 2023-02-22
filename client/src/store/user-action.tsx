import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import {
  IResponseData,
  IUserCredentials,
  IUserFormData,
} from "../types/interface";
import { RootState, ThunkAction } from "./index";
import { clearProjects, updateProjectsUsername } from "./project-slice";
import { clearUsers, updateRole, updateUsername } from "./user-list-slice";
import { login, logout, updateYourUsername } from "./user-slice";

const URL = "http://localhost:5000";

// Registers the User

export const registerRequest = (
  data: IUserFormData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const postResponse = await axios.post<IUserCredentials>(
        `${URL}/users/register`,
        data
      );
      dispatch(login({ ...postResponse.data }));
      toast.dismiss(loadingToast);
      toast.success("Successfully created an account", {
        containerId: "notification",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};

// logins the User

export const loginRequest = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const postResponse = await axios.post<IUserCredentials>(
        `${URL}/users/login`,
        {
          email,
          password,
        }
      );
      dispatch(login({ ...postResponse.data }));
      toast.dismiss(loadingToast);
      toast.success("Welcome back", { containerId: "notification" });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
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

// Update User's Username

export const updateUsernameRequest = (
  username: string,
  userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const patchResponse = await axios<IResponseData>({
        method: "patch",
        url: `${URL}/users/${userId}/username`,
        data: { username },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      if (userId === state.user.userId) {
        dispatch(updateYourUsername(username));
      }
      if (
        state.user.userRole === "Administrator" &&
        userId !== state.user.userId
      ) {
        dispatch(updateUsername({ userId, username }));
      }
      dispatch(updateProjectsUsername({ userId, username }));
      toast.dismiss(loadingToast);
      toast.success(patchResponse.data.message, {
        containerId: "notification",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};

// Update User's Password

export const updatePasswordRequest = (
  password: string,
  userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
    try {
      const patchResponse = await axios<IResponseData>({
        method: "patch",
        url: `${URL}/users/${userId}/password`,
        data: { password },
        headers: {
          Authorization: state.user.accessToken,
        },
      });
      toast.dismiss(loadingToast);
      toast.success(patchResponse.data.message, {
        containerId: "notification",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};

//  Update User's Role

export const updateRoleRequest = (
  role: string,
  userId: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const state = getState();
    const loadingToast = toast.loading("Loading...", {
      containerId: "loading",
    });
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
      toast.dismiss(loadingToast);
      toast.success(patchResponse.data.message, {
        containerId: "notification",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.dismiss(loadingToast);
        toast.error(error.response?.data.message || error.message, {
          containerId: "notification",
        });
      }
    }
  };
};
