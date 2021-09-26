import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox, ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function(props: AddItemFormPropsType) {
    console.log("AddItemForm")
    let [title, setTitle] = useState('')
    //let [error, setError] = useState('')

    const [error, setError] = useState<null | string>(null)

    const trimmedTitle = title.trim()

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const addItem = () => {
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
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
            addItem()
        }
    };


    return (
        <div>
            <TextField
                variant={"outlined"}
                label={'Введите название задачи'}
                value={title}
                onChange={inputChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                color={'primary'}
                onClick={addItem}
            >
               {/* <AddBox />*/}
                <ControlPoint />
            </IconButton>
        {/*    {error && <div className={'error-message'}>{error}</div>}*/}
        </div>
    )
} )