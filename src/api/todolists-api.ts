import axios from "axios";
import {DeleteTask} from "../stories/todolists-api.stories";


const settings = {
    withCredentials: true,
    headers: {
        "api-key": "bcdd4faf-f5b8-4f33-8a06-1a47aa179469"
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

type CreateUpdateTaskResponse = {
    item: TaskType
    resultCode: number
    messages: Array<string>
}


type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskModel = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>("todo-lists")
        return promise
    },
    createTodolist(title: string) {
        return  instance.post< {title: string}, {data: ResponseType <{item: TodolistType}> } >("todo-lists", {title})

    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolistTitle(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },





    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, taskTitle: string) {
        const promise = instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
        return promise
    },
    updateTaskTitle(todolistId: string, taskId: string, model: UpdateTaskModel) {
        const promise = instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {model})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}