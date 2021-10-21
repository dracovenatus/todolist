import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import { TaskStatuses } from '../../../../api/todolists-api';

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        changeTaskStatus: changeTaskStatusCallback,
        changeTaskTitle: changeTaskTitleCallback,
        removeTask: removeTaskCallback
    }
} as ComponentMeta<typeof Task>;

const TaskTemplate: ComponentStory<typeof Task> = (args) => <Task {...args} />;


export const TaskIsDoneStory = TaskTemplate.bind({});
TaskIsDoneStory.args = {
    taskId: '1',
    todolistId: 'todolistId1',
    title: 'JS',
    status: TaskStatuses.New
};

export const TaskIsNotDoneStory = TaskTemplate.bind({});
TaskIsNotDoneStory.args = {
    taskId: '2',
    todolistId: 'todolistId1',
    title: 'HTML',
    status: TaskStatuses.Completed
};
