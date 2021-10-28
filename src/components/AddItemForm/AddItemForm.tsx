import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox, ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void,
    disabled?: boolean 
}

export const AddItemForm = React.memo(function({addItem, disabled = false}: AddItemFormPropsType) {
    console.log("AddItemForm")
    let [title, setTitle] = useState('')


    const [error, setError] = useState<null | string>(null)

    const trimmedTitle = title.trim()

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const addItemHandler = () => {
        if (trimmedTitle) {
            addItem(trimmedTitle);
            setTitle('')
        } else {
            setError('Название не может быть пустым')
        }

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.charCode === 13) {
            addItemHandler()
        }
    };


    return (
        <div>
            <TextField
                variant={"outlined"}
                disabled={disabled}
                label={'Title'}
                value={title}
                onChange={inputChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                color={'primary'}
                onClick={addItemHandler}
                disabled={disabled}
            >
                <ControlPoint />
            </IconButton>
        </div>
    )
} )