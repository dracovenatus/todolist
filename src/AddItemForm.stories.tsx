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
