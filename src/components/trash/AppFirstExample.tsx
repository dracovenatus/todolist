import React, { useState } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { TaskPriorities, TaskStatuses, TaskType } from '../../api/todolists-api';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { TodoList } from '../../features/TodolistsList/Todolist/TodoList';
import { FilterValuesType, TodolistDomainType } from '../../features/TodolistsList/todolists-reducer';


type TasksStateType = {
    // объект может иметь свойства-ключи, которые строковые
    // (а ключи вообще в объекте и не могут быть иными),
    // а вот значения этих св-в это массив объектов TaskPropsType
    [key: string]: Array<TaskType>
}

export function AppFirstExample() {

    let todoList1 = v1()
    let todoList2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoList1]: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todoList1, description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todoList1, description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'React', status: TaskStatuses.New, todoListId: todoList1, description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'RestAPI', status: TaskStatuses.New, todoListId: todoList1, description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            }
        ],
        [todoList2]: [
            {
                id: v1(), title: 'milk', status: TaskStatuses.New, todoListId: todoList2, description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'cheese', status: TaskStatuses.New, todoListId: todoList2, description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
        ]
    })

    let [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        { id: todoList1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
        { id: todoList2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' }
    ])

    function removeTask(id: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(task => id !== task.id)
        setTasks({ ...tasks })
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {
            id: v1(), title: title, status: TaskStatuses.New, todoListId: todoListID, description: '', startDate: '', deadline: '', addedDate: '',
            order: 0, priority: TaskPriorities.Low
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({ ...tasks })
    }

    function changeTaskStatus(todoListID: string, id: string, status: TaskStatuses) {
        let task = tasks[todoListID].find(t => t.id === id)

        if (task) {
            task.status = status
            setTasks({ ...tasks })
        }
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        let changedTodoList = todoLists.find(tl => tl.id === todoListID);
        if (changedTodoList) {
            changedTodoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({ ...tasks })
    }

    function addTodoList(title: string) {
        let newTodoList: TodolistDomainType = { id: v1(), title: title, filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({ ...tasks, [newTodoList.id]: [] })
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let task = tasks[todoListID].find(t => t.id === taskID)

        if (task) {
            task.title = newTitle
            setTasks({ ...tasks })
        }
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        let todolist = todoLists.find(t => t.id === todoListID)

        if (todolist) {
            todolist.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm
                        addItem={addTodoList}
                    />
                </Grid>

                <Grid container spacing={10}>
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodoList = allTodolistTasks;

                            if (tl.filter === 'active') {
                                tasksForTodoList = allTodolistTasks.filter(task => task.status === TaskStatuses.New)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = allTodolistTasks.filter(task => task.status === TaskStatuses.Completed)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{ padding: '10px' }}>
                                        <TodoList
                                            key={tl.id}
                                            todolist={tl}
                                            tasks={tasksForTodoList}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodoListTitle}
                                            removeTodolist={removeTodoList}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        }
                        )
                    }
                </Grid>

            </Container>
        </div>
    );
}


