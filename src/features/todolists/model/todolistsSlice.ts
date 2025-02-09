import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { ResultCode } from "common/enums";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { Dispatch } from "redux";
import { RequestStatus, setAppStatus } from "../../../app/appSlice";
import { todolistsApi } from "../api/todolistsApi";
import { Todolist } from "../api/todolistsApi.types";
import { fetchTasksTC } from "./tasksSlice";

export type FilterValuesType = "all" | "active" | "completed";

export type DomainTodolist = Todolist & {
  filter: FilterValuesType;
  entityStatus: RequestStatus;
};

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>(
      (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      }
    ),
    changeTodolistFilter: create.reducer<{
      id: string;
      filter: FilterValuesType;
    }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    }),
    changeTodolistEntityStatus: create.reducer<{
      id: string;
      entityStatus: RequestStatus;
    }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id);
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus;
      }
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: "all", entityStatus: "idle" });
      });
    }),
    clearTodolists: create.reducer(() => {
      return [];
    }),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
});

export const {
  addTodolist,
  changeTodolistTitle,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  removeTodolist,
  setTodolists,
  clearTodolists,
} = todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors;

export const todolistsReducer = todolistsSlice.reducer;

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }));
      dispatch(setTodolists({ todolists: res.data }));
      return res.data;
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id));
      });
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(addTodolist({ todolist: res.data.data.item }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }));
  todolistsApi
    .deleteTodolist(id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(removeTodolist({ id }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      dispatch(changeTodolistEntityStatus({ id, entityStatus: "failed" }));
      handleServerNetworkError(error, dispatch);
    });
};

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    todolistsApi
      .updateTodolist(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(changeTodolistTitle({ ...arg }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
