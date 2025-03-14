import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { setAppStatus } from "../../../app/appSlice";
import { _tasksApi } from "../api/tasksApi";
import { DomainTask, UpdateTaskDomainModel } from "../api/tasksApi.types";
import { addTodolist, removeTodolist } from "./todolistsSlice";

export type TasksStateType = {
  [key: string]: DomainTask[];
};

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const tasksSlice = createSliceWithThunks({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    removeTask: create.reducer<{
      taskId: string;
      todolistId: string;
    }>((state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    }),
    updateTask: create.reducer<{
      taskId: string;
      todolistId: string;
      domainModel: UpdateTaskDomainModel;
    }>((state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.domainModel };
      }
    }),
    clearTasks: create.reducer(() => {
      return {};
    }),
    fetchTasks: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;

        try {
          dispatch(setAppStatus({ status: "loading" }));
          const res = await _tasksApi.getTasks(todolistId);
          dispatch(setAppStatus({ status: "succeeded" }));

          return { todolistId, tasks: res.data.items };
        } catch (error) {
          handleServerNetworkError(error, dispatch);

          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks;
        },
      }
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id];
      });
  },
  selectors: {
    selectTasks: (state) => state,
  },
});

export const { addTask, removeTask, updateTask, clearTasks, fetchTasks } =
  tasksSlice.actions;
export const { selectTasks } = tasksSlice.selectors;
export const tasksReducer = tasksSlice.reducer;
