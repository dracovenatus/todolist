
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';

//корневой reducer который получает все action-ы и раскидывает дальше по всем редьюсерам
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

//создаёт тип на основе анализа того что rootReducer возвращает
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))




// @ts-ignore
window.store = store;