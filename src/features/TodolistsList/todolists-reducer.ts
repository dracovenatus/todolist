import { TodolistType, todolistsAPI } from './../../api/todolists-api';
import { Dispatch } from "redux";



// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>


type ActionsType =
      RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': 
            return state.filter(tl => tl.id !== action.id);
        
        case 'ADD-TODOLIST':
            let newTodoList: TodolistDomainType = {
                ...action.todolist,
                filter: 'all'
            }
            return [newTodoList, ...state];

        case 'CHANGE-TODOLIST-TITLE': 
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
    
        case 'CHANGE-TODOLIST-FILTER': 
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        
        case "SET-TODOLISTS": 
            return action.todolists.map( tl => ({ ...tl,filter: "all" }) )
        

        default:
            return state
    }
}


// actions
export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId }) as const

export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist }) as const

export const changeTodolistTitleAC = (id: string, title: string) => ({ type: 'CHANGE-TODOLIST-TITLE', id, title }) as const

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({ type: 'CHANGE-TODOLIST-FILTER', id, filter }) as const

export const setTodolistsAC = (todolists: Array<TodolistType>) => ({ type: "SET-TODOLISTS", todolists }) as const


// thunks
export const fetchTodolistsThunkCreator = () => {

    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}


export const removeTodolistThunkCreator = (todolistId: string) => {

    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodolistThunkCreator = (title: string) => {

    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleThunkCreator = (todolistId: string, newTitle: string) => {

    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolistTitle(todolistId, newTitle)
            .then((res) => {
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
            })
    }
}
