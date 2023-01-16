import axios, { AxiosError } from "axios";
import { AnyAction } from "@reduxjs/toolkit";
import showNotification from "./notification-action";
import { showLoading, hideLoading } from "./loading-slice";
import { login } from "./user-slice";
import { RootState, ThunkAction } from "./index";
import { IUserData } from "../types/interface";

export const registerUser = (
  data: IUserData
): ThunkAction<Promise<number>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios.post(
        "http://localhost:5000/register",
        data
      );
      dispatch(
        login({
          id: postResponse.data.id,
          token: postResponse.data.token,
          expiresIn: postResponse.data.expiresIn,
        })
      );
      dispatch(hideLoading());
      dispatch(showNotification("success", postResponse.data.message));
      return postResponse.data.status;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
      return 400;
    }
  };
};

export const loginUser = (
  email: string,
  password: string
): ThunkAction<Promise<number>, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const postResponse = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      dispatch(
        login({
          id: postResponse.data.id,
          token: postResponse.data.token,
          expiresIn: postResponse.data.expiresIn,
        })
      );
      dispatch(hideLoading());
      dispatch(showNotification("success", postResponse.data.message));
      return postResponse.data.status;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(hideLoading());
        dispatch(showNotification("error", error.response?.data.message));
      }
      return 400;
    }
  };
};
