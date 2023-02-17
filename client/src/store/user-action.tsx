import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import {
  IResponseData,
  IUser,
  IUserCredentials,
  IUserFormData,
} from "../types/interface";
import { IGetDataResponse } from "./data-action";
import { RootState, ThunkAction } from "./index";
import { clearProjectsData, updateProjectsData } from "./project-slice";
import { clearUsersData, updateUsersData } from "./user-list-slice";
import { login, logout } from "./user-slice";

interface IUserResponseData extends IResponseData {
  payload: IUser[];
}

// Registers the User

export const registerUser = (
  data: IUserFormData
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const postResponse = await axios.post<IUserCredentials>(
        "http://localhost:5000/users/register",
        data
      );
      dispatch(
        login({
          id: postResponse.data.id,
          role: postResponse.data.role,
          token: postResponse.data.token,
          expiresIn: postResponse.data.expiresIn,
        })
      );
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
        "http://localhost:5000/users/login",
        {
          email,
          password,
        }
      );
      dispatch(
        login({
          id: postResponse.data.id,
          role: postResponse.data.role,
          token: postResponse.data.token,
          expiresIn: postResponse.data.expiresIn,
        })
      );
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
  userId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const patchResponse = await axios<IGetDataResponse>({
        method: "patch",
        url: `http://localhost:5000/users/${userId}/username`,
        data: { username: value },
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateProjectsData(patchResponse.data.payload.projects));
      dispatch(updateUsersData(patchResponse.data.payload.users));
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
  userId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const patchResponse = await axios<IResponseData>({
        method: "patch",
        url: `http://localhost:5000/users/${userId}/password`,
        data: { password: value },
        headers: {
          Authorization: token,
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
  userId: string,
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const patchResponse = await axios<IUserResponseData>({
        method: "patch",
        url: `http://localhost:5000/users/${userId}/role`,
        data: { role: value },
        headers: {
          Authorization: token,
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
