import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskType, TodoList} from "./TodoList";
import {FilterValuesType} from "./App";

export type TasksFilterType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: TasksFilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)



    const changeFilter = useCallback( (todoListId: string, value: FilterValuesType) => {

        const action = changeTodolistFilterAC(todoListId, value)

        dispatch(action)

    }, [dispatch] )


    const removeTask = useCallback( (todolistId: string, taskId: string) => {

        dispatch(removeTaskAC(todolistId,taskId))

    }, [dispatch] )


    const addTask = useCallback ( (todolistId: string, newTaskTitle: string) => {

        dispatch(addTaskAC(todolistId, newTaskTitle))
    }, [dispatch] )

    const changeTaskTitle = useCallback( (todolistId: string, taskId: string, newTitle: string) => {

        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))

    }, [dispatch] )

    const changeTaskStatus = useCallback( (todolistId: string, taskId: string, isDone: boolean) => {

        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))

    }, [dispatch] )

    const removeTodolist = useCallback( (todolistId: string) => {

        dispatch(removeTodolistAC(todolistId))

    }, [dispatch] )

    const addTodoList = useCallback( (title: string) => {

        const action = addTodolistAC(title)

        dispatch(action)

    }, [dispatch] )

    const changeTodolistTitle = useCallback( (todolistId: string, newTitle: string) => {

        dispatch(changeTodolistTitleAC(todolistId,newTitle))

    }, [dispatch] )

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container spacing={3} style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(td => {
                            let allTodolistTasks = tasks[td.id]
                       /*     let tasksForTodolist = allTodolistTasks*/

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
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
