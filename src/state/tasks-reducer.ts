import { TaskPriorities, TaskType, todolistsAPI, UpdateTaskModelType } from './../api/todolists-api';
import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType, setTodolistsAC, SetTodolistsActionType } from "./todolists-reducer";
import { TaskStatuses } from '../api/todolists-api';
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    model:UpdateDomainTaskModelType
    todolistId: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state };
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id != action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = { ...state };
            const newTask = action.task;
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy;
        }
        case "UPDATE-TASK": {
            const stateCopy = { ...state };
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? { ...t, ...action.model } : t);

            return stateCopy;
        }
        
        case "ADD-TODOLIST": {
            const stateCopy = { ...state };
            stateCopy[action.todolist.id] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = { ...state };
            delete stateCopy[action.id];
            return stateCopy;
        }
        case "SET-TODOLISTS": {
            const stateCopy = { ...state };

            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })

            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = { ...state };
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default: return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return { type: 'ADD-TASK', task }
}
export const updateTaskAC = (todolistId: string, taskId: string, model:UpdateDomainTaskModelType): UpdateTaskActionType => {
    return { type: 'UPDATE-TASK', taskId, todolistId, model }
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return { type: 'SET-TASKS', tasks, todolistId }
}

export const fetchTasksThunkCreator = (todolistId: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTaskThunkCreator = (todolistId: string, taskId: string) => {

    return (dispatch: Dispatch) => {

        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todolistId, taskId))
            })

    }
}

export const addTaskThunkCreator = (todolistId: string, newTaskTitle: string) => {

    return (dispatch: Dispatch) => {

        todolistsAPI.createTask(todolistId, newTaskTitle)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })

    }
}


export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskThunkCreator = (todolistId: string, taskId: string, domainModel:UpdateDomainTaskModelType) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if(!task) {
            //throw new Error("task not found in the state")
            console.warn("task not found in the state");
            return
            
        }

        const apiModel: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
            })

    }
}
