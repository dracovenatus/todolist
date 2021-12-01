import { SetAppErrorActionType } from "./../../app/app-reducer";
import { TodolistType, todolistsAPI } from "./../../api/todolists-api";
import { Dispatch } from "redux";
import {
  RequestStatusType,
  setAppStatusAC,
  SetAppStatusActionType,
} from "../../app/app-reducer";
import { handleServerNetworkError } from "../../utils/error-utils";
import { fetchTasksThunkCreator } from "./tasks-reducer";

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;
export type ChangeTodolistEntityStatusActionType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;
export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | SetAppStatusActionType
  | SetAppErrorActionType
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | ClearTodosDataActionType;

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);

    case "ADD-TODOLIST":
      let newTodoList: TodolistDomainType = {
        ...action.todolist,
        filter: "all",
        entityStatus: "idle",
      };
      return [newTodoList, ...state];

    case "CHANGE-TODOLIST-TITLE":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );

    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );

    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, entityStatus: action.status } : tl
      );

    case "SET-TODOLISTS":
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    case "CLEAR-DATA":
      return [];

    default:
      return state;
  }
};

// actions
export const removeTodolistAC = (todolistId: string) =>
  ({ type: "REMOVE-TODOLIST", id: todolistId } as const);

export const addTodolistAC = (todolist: TodolistType) =>
  ({ type: "ADD-TODOLIST", todolist } as const);

export const changeTodolistTitleAC = (id: string, title: string) =>
  ({ type: "CHANGE-TODOLIST-TITLE", id, title } as const);

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({ type: "CHANGE-TODOLIST-FILTER", id, filter } as const);

export const changeTodolistEntityStatusAC = (
  id: string,
  status: RequestStatusType
) => ({ type: "CHANGE-TODOLIST-ENTITY-STATUS", id, status } as const);

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: "SET-TODOLISTS", todolists } as const);

export const clearTodosDataAC = () => ({ type: "CLEAR-DATA" } as const);

// thunks
export const fetchTodolistsThunkCreator = () => {
  //Dispatch<ActionsType>
  return (dispatch: any) => {
    dispatch(setAppStatusAC("loading"));

    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data));
        dispatch(setAppStatusAC("succeeded"));
        return res.data;
      })
      .then((todos) => {
        todos.forEach((td) => dispatch(fetchTasksThunkCreator(td.id)));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const removeTodolistThunkCreator = (todolistId: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};

export const addTodolistThunkCreator = (title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(addTodolistAC(res.data.data.item));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};

export const changeTodolistTitleThunkCreator = (
  todolistId: string,
  newTitle: string
) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.updateTodolistTitle(todolistId, newTitle).then((res) => {
      dispatch(changeTodolistTitleAC(todolistId, newTitle));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};
