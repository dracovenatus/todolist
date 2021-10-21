import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function EditableSpan(props: EditableSpanPropsType) {
    console.log("EditableSpan")

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField variant={"standard"}
                     value={title}
                     onBlur={activateViewMode}
                     autoFocus
                     onChange={onChangeTitleHandler}
        />
        : <span onDoubleClick={activateEditMode}>{title}</span>

})