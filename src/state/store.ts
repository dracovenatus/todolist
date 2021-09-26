import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

//корневой reducer который получает все action-ы и раскидывает дальше по всем редьюсерам
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

//создаёт тип на основе анализа того что rootReducer возвращает
export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)




// @ts-ignore
window.store = store;