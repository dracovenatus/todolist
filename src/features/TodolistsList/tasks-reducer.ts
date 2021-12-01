import {
  setAppErrorAC,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from "./../../app/app-reducer";

import {
  TaskPriorities,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "../../api/todolists-api";
import {
  AddTodolistActionType,
  ClearTodosDataActionType,
  RemoveTodolistActionType,
  setTodolistsAC,
  SetTodolistsActionType,
} from "./todolists-reducer";
import { TaskStatuses } from "../../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../../app/store";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";

// types

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType
  | SetAppErrorActionType
  | SetAppStatusActionType
  | ClearTodosDataActionType;

export type UpdateDomainTaskModelType = {
  description?: string;
  title?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id != action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const newTask = action.task;
      const tasks = stateCopy[newTask.todoListId];
      const newTasks = [newTask, ...tasks];
      stateCopy[newTask.todoListId] = newTasks;
      return stateCopy;
    }
    case "UPDATE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.map((t) =>
        t.id === action.taskId ? { ...t, ...action.model } : t
      );

      return stateCopy;
    }

    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolist.id]: [],
      };

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    case "SET-TODOLISTS": {
      const stateCopy = { ...state };

      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });

      return stateCopy;
    }
    case "SET-TASKS":
      return {
        ...state,
        [action.todolistId]: action.tasks,
      };
    case "CLEAR-DATA":
      return {};

    default:
      return state;
  }
};

//actions
export const removeTaskAC = (todolistId: string, taskId: string) =>
  ({ type: "REMOVE-TASK", todolistId, taskId } as const);
export const addTaskAC = (task: TaskType) =>
  ({ type: "ADD-TASK", task } as const);
export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
) => ({ type: "UPDATE-TASK", taskId, todolistId, model } as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
  ({ type: "SET-TASKS", tasks, todolistId } as const);

//thunks
export const fetchTasksThunkCreator = (todolistId: string) => (
  dispatch: Dispatch<ActionsType>
) => {
  dispatch(setAppStatusAC("loading"));
  todolistsAPI.getTasks(todolistId).then((res) => {
    dispatch(setTasksAC(res.data.items, todolistId));
    dispatch(setAppStatusAC("succeeded"));
  });
};

export const removeTaskThunkCreator = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      dispatch(removeTaskAC(todolistId, taskId));
    });
  };
};

export const addTaskThunkCreator = (
  todolistId: string,
  newTaskTitle: string
) => {
  return (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI
      .createTask(todolistId, newTaskTitle)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const updateTaskThunkCreator = (
  todolistId: string,
  taskId: string,
  domainModel: UpdateDomainTaskModelType
) => {
  return (
    dispatch: Dispatch<ActionsType>,
    getState: () => AppRootStateType
  ) => {
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);

    if (!task) {
      //throw new Error("task not found in the state")
      console.warn("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      description: task.description,
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel,
    };

    dispatch(setAppStatusAC("loading"));
    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC(todolistId, taskId, domainModel));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
