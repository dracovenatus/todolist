import React, {useCallback, useEffect} from 'react';
import {Delete} from "@material-ui/icons";
import { TaskStatuses, TaskType } from '../../../api/todolists-api';
import { fetchTasksThunkCreator } from '../tasks-reducer';
import { FilterValuesType, TodolistDomainType } from '../todolists-reducer';
import { useDispatch } from 'react-redux';
import { Button, IconButton } from '@material-ui/core';
import { Task } from './Task/Task';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';



type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    addTask: (todoListID: string, title: string) => void
    removeTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todoListID: string, newTitle: string) => void
    removeTodolist: (todoListID: string) => void
    demo?: boolean
}

export const TodoList = React.memo(function ({demo = false, ...props}: TodoListPropsType) {
console.log("TodoList")

const dispatch = useDispatch()

useEffect( () => {
    if (demo) {return}
    dispatch(fetchTasksThunkCreator(props.todolist.id))
}, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])

    const removeTodoList = () => {
        props.removeTodolist(props.todolist.id)
    }

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, 'all')
    }, [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, 'active')
    }, [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, 'completed')
    }, [props.changeFilter, props.todolist.id])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={
                useCallback((newValue) => {
                    props.changeTodolistTitle(props.todolist.id, newValue)
                }, [ props.changeTodolistTitle,props.todolist.id ])
            }/>
                <IconButton onClick={removeTodoList} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
                disabled={props.todolist.entityStatus === 'loading'}
            />

            <div>
                {
                    tasksForTodolist.map(t => <Task key={t.id}
                                                    taskId={t.id}
                                                    title={t.title}
                                                    status={t.status}
                                                    todolistId={props.todolist.id}
                                                    changeTaskStatus={props.changeTaskStatus}
                                                    changeTaskTitle={props.changeTaskTitle}
                                                    removeTask={props.removeTask}
                    />)
                }

            </div>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    color={'default'}
                >All</Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                >Active</Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                >Completed</Button>
            </div>
        </div>
    )
})

