import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import { TaskStatuses, TaskType } from './api/todolists-api';
import { FilterValuesType } from './state/todolists-reducer';
import { useDispatch } from 'react-redux';
import { fetchTasksThunkCreator } from './state/tasks-reducer';

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (todoListID: string, title: string) => void
    removeTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListID: string) => void
}

export const TodoList = React.memo(function (props: TodoListPropsType) {
console.log("TodoList")

const dispatch = useDispatch()

useEffect( () => {
    dispatch(fetchTasksThunkCreator(props.id))
}, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'all')
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'active')
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'completed')
    }, [props.changeFilter, props.id])


    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={
                useCallback((newValue) => {
                    props.changeTodolistTitle(props.id, newValue)
                }, [ props.changeTodolistTitle,props.id ])
            }/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
            />

            <div>
                {
                    tasksForTodolist.map(t => <Task key={t.id}
                                                    taskId={t.id}
                                                    title={t.title}
                                                    status={t.status}
                                                    todolistId={props.id}
                                                    changeTaskStatus={props.changeTaskStatus}
                                                    changeTaskTitle={props.changeTaskTitle}
                                                    removeTask={props.removeTask}
                    />)
                }

            </div>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    color={'default'}
                >All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                >Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                >Completed</Button>
            </div>
        </div>
    )
})

