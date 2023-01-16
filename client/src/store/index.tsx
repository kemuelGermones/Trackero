import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import projectReducer from "./project-slice";
import notificationReducer from "./notification-slice";
import loadingReducer from "./loading-slice";
import userReducer from "./user-slice";

const persistConfig = {
  key: "root",
  blacklist: ["project", "notification", "loading"],
  version: 1,
  storage
}

const reducer = combineReducers({
  project: projectReducer,
  notification: notificationReducer,
  loading: loadingReducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer
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
