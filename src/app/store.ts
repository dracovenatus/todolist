import { authReducer } from './../features/Login/auth-reducer';
import { appReducer } from './app-reducer';
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import { todolistsReducer } from "../features/TodolistsList/todolists-reducer";

//корневой reducer который получает все action-ы и раскидывает дальше по всем редьюсерам
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

//создаёт тип на основе анализа того что rootReducer возвращает
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))




// @ts-ignore
window.store = store;