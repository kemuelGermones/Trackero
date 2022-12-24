import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

import projectReducer from "./project-slice";
import notificationReducer from "./notification-slice";
import loadingReducer from "./loading-slice";

const store = configureStore({
  reducer: {
    project: projectReducer,
    notification: notificationReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type ThunkAction<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E
) => R;

export default store;
