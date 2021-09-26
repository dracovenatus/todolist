import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import React, {useCallback} from "react";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    taskId: string
    todolistId: string
    title: string
    isDone: boolean
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    removeTask: (todoListID: string, id: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const onTitleChangeHandler =  useCallback((newValue) => props.changeTaskTitle(props.todolistId, props.taskId, newValue),
        [props.changeTaskTitle, props.todolistId, props.taskId])

    return (<div className={props.isDone ? 'is-done' : ''}>
            <Checkbox
                color={'secondary'}
                checked={props.isDone}
                onChange={(e) =>
                    props.changeTaskStatus(props.todolistId, props.taskId, e.currentTarget.checked)}
            />
            <EditableSpan title={props.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={() => props.removeTask(props.todolistId, props.taskId)}>
             {/*   <Delete/>*/} x
            </IconButton>
        </div>
    )
})