import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC, todolistsReducer
} from "./state/todolists-reducer";
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

function AppWithReducers() {


    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Rest book", isDone: false}
        ]
    })

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])


    const changeFilter = (todoListId: string, value: FilterValuesType) => {

        const action = changeTodolistFilterAC(todoListId, value)

        dispatchToTodolistsReducer(action)

    }


    const removeTask = (todolistId: string, taskId: string) => {

        dispatchToTasksReducer(removeTaskAC(todolistId,taskId))

    }


    const addTask = (todolistId: string, newTaskTitle: string) => {

        dispatchToTasksReducer(addTaskAC(todolistId, newTaskTitle))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {

        dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskId, newTitle))

    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {

        dispatchToTasksReducer(changeTaskStatusAC(todolistId, taskId, isDone))

    }

    function removeTodolist(todolistId: string) {

        dispatchToTodolistsReducer(removeTodolistAC(todolistId))

        dispatchToTasksReducer(removeTodolistAC(todolistId))

    }

    function addTodoList(title: string) {

        const action = addTodolistAC(title)

        dispatchToTodolistsReducer(action)

        dispatchToTasksReducer(action)

    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {

        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId,newTitle))

    }

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
                            let tasksForTodolist = allTodolistTasks

                            if (td.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                            }
                            if (td.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList key={td.id}
                                              id={td.id}
                                              title={td.title}
                                              tasks={tasksForTodolist}
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

export default AppWithReducers;
