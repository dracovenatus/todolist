import {Checkbox, IconButton} from "@material-ui/core";
import React, {ChangeEvent, useCallback} from "react";
import { TaskStatuses } from "../../../../api/todolists-api";
import { EditableSpan } from "../../../../components/EditableSpan/EditableSpan";



type TaskPropsType = {
    taskId: string
    todolistId: string
    title: string
    status: TaskStatuses
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    removeTask: (todoListID: string, id: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback( () => props.removeTask(props.todolistId, props.taskId), [props.todolistId, props.taskId] )

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>{
        let newIsDoneValue = e.currentTarget.checked;
    props.changeTaskStatus(props.todolistId, props.taskId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)}, [props.todolistId, props.taskId])

    const onTitleChangeHandler =  useCallback((newValue: string) => props.changeTaskTitle(props.todolistId, props.taskId, newValue),
        [props.changeTaskTitle, props.todolistId, props.taskId])

    return (<div className={props.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                color={'secondary'}
                checked={props.status === TaskStatuses.Completed }
                onChange={onChangeHandler}
            />
            <EditableSpan title={props.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
             {/*   <Delete/>*/} x
            </IconButton>
        </div>
    )
})