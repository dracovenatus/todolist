

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = {
    status: RequestStatusType,
    error: null | string
}

const initialState: AppInitialStateType = {
    status: 'idle',
    error: null
}



export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
}

export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type SetErrorActionType = ReturnType<typeof setErrorAC> 
export type SetStatusActionType = ReturnType<typeof setStatusAC> 


type ActionsType = SetErrorActionType | SetStatusActionType