import { configureStore } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "features/auth/model/authSlice";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  tasksReducer,
  tasksSlice,
} from "../features/todolists/model/tasksSlice";
import {
  todolistsReducer,
  todolistsSlice,
} from "../features/todolists/model/todolistsSlice";
import { appReducer, appSlice } from "./appSlice";

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// @ts-ignore
window.store = store;
