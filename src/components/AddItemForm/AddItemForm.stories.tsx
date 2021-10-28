import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'callback'
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const AddItemFormTemplate: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = AddItemFormTemplate.bind({});
AddItemFormStory.args = {
    addItem: action('Button clicked')
};

const AddItemFormDisabledExample: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const  AddItemFormDisabledStory = AddItemFormDisabledExample.bind({});
AddItemFormDisabledStory.args = {
    disabled: true,
    addItem: action('Button clicked')
};
