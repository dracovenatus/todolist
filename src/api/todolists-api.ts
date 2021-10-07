import axios from "axios";
import {CreateTodolist, DeleteTodolist, UpdateTodolistTitle} from "../stories/todolists-api.stories";


const settings = {
    withCredentials: true,
    headers: {
        "api-key" : "bcdd4faf-f5b8-4f33-8a06-1a47aa179469"

    }
}

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    fieldsErrors: Array<string>
    data: D
}

export const todolistsAPI = {
    getTodolists () {
        const promise = axios.get<Array<TodolistType>>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        return promise
    },
    createTodolist (title: string) {
        const promise =  axios.post<ResponseType<{item: TodolistType}>>("https://social-network.samuraijs.com/api/1.1/todo-lists", {title}, settings)
        return promise
    },
    deleteTodolist (todolistId: string) {
        const promise =axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },
    updateTodolistTitle (todolistId: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
        return promise
    }

}