import { AppRootStateType, store } from "../app/store";
import { Provider } from "react-redux";
import React from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import { tasksReducer } from "../features/TodolistsList/tasks-reducer";
import { TaskPriorities, TaskStatuses } from "../api/todolists-api";
import { todolistsReducer } from "../features/TodolistsList/todolists-reducer";
import { appReducer } from "../app/app-reducer";
import thunkMiddleware from 'redux-thunk';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})



const initialGlobalState: AppRootStateType = {
    todolists: [
        { id: "todolistId1", title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
        { id: "todolistId2", title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading' }
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
        ]
    },
    app: {
        status: 'idle',
        error: null

    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider store={storyBookStore} >{storyFn()}
    </Provider>)