import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";



export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;

const AppWithReduxTemplate: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux /> ;

export const AppWithReduxStory = AppWithReduxTemplate.bind({});
AppWithReduxStory.args = {};
