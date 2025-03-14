import { configureStore } from "@reduxjs/toolkit";
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
import { todolistsApi } from "features/todolists/api/todolistsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todolistsApi.middleware),
});

setupListeners(store.dispatch);

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
