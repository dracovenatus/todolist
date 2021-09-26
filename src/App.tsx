import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    // объект может иметь свойства-ключи, которые строковые
    // (а ключи вообще в объекте и не могут быть иными),
    // а вот значения этих св-в это массив объектов TaskPropsType
    [key: string]: Array<TaskType>
}

function App() {

    let todoList1 = v1()
    let todoList2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoList1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'RestAPI', isDone: false}
        ],
        [todoList2]: [
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'cheese', isDone: false},
        ]
    })

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoList1, title: 'What to learn', filter: 'all'},
        {id: todoList2, title: 'What to buy', filter: 'all'}
    ])

    function removeTask(id: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(task => id !== task.id)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeTaskStatus(todoListID: string, id: string, isDone: boolean) {
        let task = tasks[todoListID].find(t => t.id === id)

        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
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
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        let newTodoList: TodoListType = {id: v1(), title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let task = tasks[todoListID].find(t => t.id === taskID)

        if (task) {
            task.title = newTitle
            setTasks({...tasks})
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
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
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
                                    tasksForTodoList = allTodolistTasks.filter(task => task.isDone === false)
                                }
                                if (tl.filter === 'completed') {
                                    tasksForTodoList = allTodolistTasks.filter(task => task.isDone === true)
                                }
                                return (
                                    <Grid item>
                                        <Paper style={{padding: '10px'}}>
                                            <TodoList
                                                key={tl.id}
                                                id={tl.id}
                                                title={tl.title}
                                                tasks={tasksForTodoList}
                                                addTask={addTask}
                                                removeTask={removeTask}
                                                changeFilter={changeFilter}
                                                changeTaskStatus={changeTaskStatus}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTodolistTitle={changeTodoListTitle}
                                                removeTodolist={removeTodoList}
                                                filter={tl.filter}
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

export default App;
