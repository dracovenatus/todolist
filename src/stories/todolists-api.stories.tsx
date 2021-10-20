import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistsAPI.getTodolists()
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist("miumiu todolist")
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolist id"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolistTitle = () => {
        todolistsAPI.updateTodolistTitle(todolistId, title)
            .then((response) => {
                debugger
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolist id"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"new title"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolistTitle}>rename todolist</button>
        </div>
    </div>

}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolist id"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((response) => {
                debugger
                //изначально было response.data
                setState(response.data.data.item)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolist id"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"task title"} value={taskTitle}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const [description, setDescription] = useState<string>('')
    const [completed, setCompleted] = useState<boolean>(false)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')


    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: deadline,
            description: description,
            priority: priority,
            startDate: startDate,
            status: status,
            title: taskTitle
        })
            .then((response) => {
                setState(response.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolist id"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"task id"} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <input placeholder={"task title"} value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <input placeholder={"Description"} value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
           {/* <input placeholder={"is done?"} value={completed} onChange={(e) => setCompleted(e.currentTarget.value)}/>*/}
            <input placeholder={"status"} value={status} type={"number"} onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <input placeholder={"priority"} value={priority} type={"number"} onChange={(e) => setPriority(+e.currentTarget.value)}/>

            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = ''
        const taskId = ''
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

