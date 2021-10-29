
import { Dispatch } from "redux"
import { ResponseType } from "../api/todolists-api"
import { setAppErrorAC, setAppStatusAC, SetAppErrorActionType, SetAppStatusActionType } from "../app/app-reducer"

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType> ) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("some error occured"))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'some error occurred'))
    dispatch(setAppStatusAC('failed'))
}