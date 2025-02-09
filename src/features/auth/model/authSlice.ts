import { createSlice } from "@reduxjs/toolkit";
import { setAppStatus } from "app/appSlice";
import { ResultCode } from "common/enums";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { clearTodolists } from "features/todolists/model/todolistsSlice";
import { Dispatch } from "redux";
import { authApi } from "../api/authApi";
import { LoginArgs } from "../api/authApi.types";
import { clearTasks } from "features/todolists/model/tasksSlice";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>(
      (state, action) => {
        state.isInitialized = action.payload.isInitialized;
      }
    ),
  }),
  selectors: {
    selectIsInitialized: (state) => state.isInitialized,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
});

export const { setIsLoggedIn, setIsInitialized } = authSlice.actions;
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors;
export const authReducer = authSlice.reducer;

export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
        localStorage.setItem("sn-token", res.data.data.token);
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        localStorage.removeItem("sn-token");
        dispatch(clearTodolists());
        dispatch(clearTasks());
        dispatch(setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(
        setIsInitialized({
          isInitialized: true,
        })
      );
    });
};
