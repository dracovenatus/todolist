import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../../app/appSlice";
import { Todolist } from "../api/todolistsApi.types";

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
