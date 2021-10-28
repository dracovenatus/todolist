import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from "@material-ui/icons";
import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import { TaskPriorities, TaskStatuses, TaskType } from '../../api/todolists-api';
import { addTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from '../../features/TodolistsList/tasks-reducer';
import { TodoList } from '../../features/TodolistsList/Todolist/TodoList';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC, todolistsReducer } from '../../features/TodolistsList/todolists-reducer';


type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {


    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(), title: 'React', status: TaskStatuses.New, todoListId: todolistId1, description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'RestAPI', status: TaskStatuses.New, todoListId: todolistId1, description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            }
        ],
        [todolistId2]: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.New, todoListId: todolistId2, description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "Rest book", status: TaskStatuses.New, todoListId: todolistId2, description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            }
        ]
    })

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
        { id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0,entityStatus: 'idle' }
    ])


    const changeFilter = (todoListId: string, value: FilterValuesType) => {

        const action = changeTodolistFilterAC(todoListId, value)

        dispatchToTodolistsReducer(action)

    }


    const removeTask = (todolistId: string, taskId: string) => {

        dispatchToTasksReducer(removeTaskAC(todolistId, taskId))

    }


    const addTask = (todolistId: string, newTaskTitle: string) => {

        dispatchToTasksReducer(addTaskAC({
            id: v1(),
            title: newTaskTitle,
            status: TaskStatuses.New,
            todoListId: todolistId,
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        }))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {

        dispatchToTasksReducer(updateTaskAC(todolistId, taskId, {title: newTitle}))

    }

    const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {

        dispatchToTasksReducer(updateTaskAC(todolistId, taskId, {status}))

    }

    function removeTodolist(todolistId: string) {

        dispatchToTodolistsReducer(removeTodolistAC(todolistId))

        dispatchToTasksReducer(removeTodolistAC(todolistId))

    }

    function addTodoList(title: string) {

        const action = addTodolistAC({
            id: v1(),
            title: title,
            addedDate: '',
            order: 0
        })

        dispatchToTodolistsReducer(action)

        dispatchToTasksReducer(action)

    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {

        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newTitle))

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
                            let tasksForTodolist = allTodolistTasks

                            if (td.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(task => task.status === TaskStatuses.New)
                            }
                            if (td.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(task => task.status === TaskStatuses.Completed)
                            }
                            return <Grid item>
                                <Paper style={{ padding: "10px" }}>
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
