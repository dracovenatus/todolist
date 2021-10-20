import React, { useCallback, useEffect } from 'react';
import './App.css';
import { AddItemForm } from "./AddItemForm";

import { Menu } from "@material-ui/icons";
import { addTaskThunkCreator, removeTaskThunkCreator, updateTaskThunkCreator } from "./state/tasks-reducer";
import {
    addTodolistAC, addTodolistThunkCreator, changeTodolistFilterAC, changeTodolistTitleAC,
    changeTodolistTitleThunkCreator,
    fetchTodolistsThunkCreator,
    FilterValuesType,
    removeTodolistAC,
    removeTodolistThunkCreator,
    TodolistDomainType
} from "./state/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { TodoList } from "./TodoList";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { AppRootStateType } from "./state/store";
import { TaskStatuses, TaskType, todolistsAPI } from './api/todolists-api';




export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


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

        dispatch(updateTaskThunkCreator(todolistId, taskId, {title: newTitle}))

    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {

        dispatch(updateTaskThunkCreator(todolistId, taskId, {status}))

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

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container spacing={3} style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(td => {
                            let allTodolistTasks = tasks[td.id]
                            /*     let tasksForTodolist = allTodolistTasks*/

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

            </Container>
        </div>
    )
}

export default AppWithRedux;
