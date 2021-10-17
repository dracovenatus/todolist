import { TaskPriorities } from './../api/todolists-api';
import { TasksStateType } from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import { TaskStatuses } from '../api/todolists-api';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK" : {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id != action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy;
        }
        case "ADD-TASK" : {
            const stateCopy = {...state};
            const newTask = {id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, description: '', startDate: '', deadline: '', addedDate: '',
            order: 0, priority: TaskPriorities.Low};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = [newTask, ...tasks];
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS" : {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, status: action.status } : t);

            return stateCopy;
        }
        case "CHANGE-TASK-TITLE": {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.title } : t)

            return ({...state});
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todolistID] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete  stateCopy[action.id];
            return stateCopy;
        }

        default: return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses, ): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}

