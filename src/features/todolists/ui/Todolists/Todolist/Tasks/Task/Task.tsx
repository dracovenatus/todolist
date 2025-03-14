import { EditableSpan } from "common/components";
import { TaskStatus } from "common/enums";
import { useAppDispatch } from "common/hooks";
import { DomainTask, UpdateTaskModel } from "../../../../../api/tasksApi.types";
import { DomainTodolist } from "../../../../../model/todolistsSlice";
import { getListItemSx } from "./Task.styles";
import { ChangeEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "features/todolists/api/tasksApi";

type Props = {
  task: DomainTask;
  todolist: DomainTodolist;
};

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const createUpdateModel = (
    updates: Partial<UpdateTaskModel>
  ): UpdateTaskModel => ({
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    status: task.status,
    ...updates,
  });

  const removeTaskHandler = () => {
    deleteTask({ taskId: task.id, todolistId: todolist.id });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked
      ? TaskStatus.Completed
      : TaskStatus.New;

    updateTask({
      taskId: task.id,
      todolistId: todolist.id,
      model: createUpdateModel({ status }),
    });
  };

  const changeTaskTitleHandler = (title: string) => {
    updateTask({
      taskId: task.id,
      todolistId: todolist.id,
      model: createUpdateModel({ title }),
    });
  };

  const disabled = todolist.entityStatus === "loading";

  return (
    <ListItem
      key={task.id}
      sx={getListItemSx(task.status === TaskStatus.Completed)}
    >
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={disabled}
        />
        <EditableSpan
          value={task.title}
          onChange={changeTaskTitleHandler}
          disabled={disabled}
        />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
