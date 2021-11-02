import axios, {AxiosResponse} from "axios";


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
        const promise = instance.put< {title: string}, AxiosResponse<ResponseType> >(`todo-lists/${todolistId}`, {title})
        return promise
    },





    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, taskTitle: string) {
        const promise = instance.post< {title: string}, AxiosResponse< ResponseType<{item: TaskType}> > >(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
        return promise
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const promise = instance.put< UpdateTaskModelType,  AxiosResponse< ResponseType<{item: TaskType}> > >(`todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export const authAPI = {
    login(data: LoginParamsType) {
        return  instance.post<{data: LoginParamsType},AxiosResponse< ResponseType <{userId?: number}>>>("auth/login", {data})
    },
    logout() {
       return instance.delete<ResponseType<{userId?: number}>>('/auth/login') 
    },
    me() {
        return instance.get<ResponseType<LoginParamsType>>('auth/me')
    }
 }
 


// types 
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
   Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
