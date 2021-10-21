import React, { useCallback, useEffect } from 'react';
import {
    addTodolistThunkCreator, changeTodolistFilterAC,
    changeTodolistTitleThunkCreator,
    fetchTodolistsThunkCreator,
    FilterValuesType,
    removeTodolistThunkCreator,
    TodolistDomainType
} from "./todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper } from "@material-ui/core";
import { AppRootStateType } from "../../app/store";
import { addTaskThunkCreator, removeTaskThunkCreator, TasksStateType, updateTaskThunkCreator } from './tasks-reducer';
import { TaskStatuses } from '../../api/todolists-api';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { TodoList } from './Todolist/TodoList';




const TodolistsList: React.FC = () => {


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistsThunkCreator())
    }, [])

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {

        const action = changeTodolistFilterAC(todoListId, value)

        dispatch(action)

    }, [dispatch])


    const removeTask = useCallback((todolistId: string, taskId: string) => {

        dispatch(removeTaskThunkCreator(todolistId, taskId))

    }, [dispatch])


    const addTask = useCallback((todolistId: string, newTaskTitle: string) => {

        dispatch(addTaskThunkCreator(todolistId, newTaskTitle))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {

        dispatch(updateTaskThunkCreator(todolistId, taskId, { title: newTitle }))

    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {

        dispatch(updateTaskThunkCreator(todolistId, taskId, { status }))

    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {

        dispatch(removeTodolistThunkCreator(todolistId))

    }, [dispatch])

    const addTodoList = useCallback((title: string) => {

        const action = addTodolistThunkCreator(title)

        dispatch(action)

    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {

        dispatch(changeTodolistTitleThunkCreator(todolistId, newTitle))

    }, [dispatch])

    return <>
        <Grid container spacing={3} style={{ padding: "20px" }}>
            <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(td => {
                    let allTodolistTasks = tasks[td.id]


                    return <Grid item>
                        <Paper style={{ padding: "10px" }}>
                            <TodoList key={td.id}
                                id={td.id}
                                title={td.title}
                                tasks={allTodolistTasks}
                                filter={td.filter}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>


    </>
}

export default TodolistsList;