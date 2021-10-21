import { v1 } from 'uuid';
import { TaskPriorities, TaskStatuses } from '../../api/todolists-api';
import { addTaskAC, removeTaskAC, tasksReducer, setTasksAC, updateTaskAC, TasksStateType } from './tasks-reducer';
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from "./todolists-reducer";


let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("todolistId2", "2",);

    const endState = tasksReducer(startState, action)


    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        id: "id exists",
        title: "juice",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);

})



test('status of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "2", {status: TaskStatuses.New});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);

});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "2", {title: "MilkyWay"});

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].title).toBe("MilkyWay");
    expect(endState["todolistId1"][1].title).toBe("JS");

});

test('new property with new array should be added when new todolist is added', () => {

    const todolist = {
        id: v1(),
        title: "What to learn",
        addedDate: '',
        order: 0
    }
    const action = addTodolistAC(todolist);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});


test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
        { id: "1", title: "title1", order: 0, addedDate: "" },
        { id: "2", title: "title2", order: 0, addedDate: "" }
    ]);

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);


    //toStrictEqual = к строгому равенству
});


test('tasks must be added for todolist', () => {

    const action = setTasksAC(startState["todolistId1"], "todolistId1")

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)


    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
    expect(endState["todolistId1"][0].title).toBe("CSS");

});
