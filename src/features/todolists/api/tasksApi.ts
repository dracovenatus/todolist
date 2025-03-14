import { instance } from "common/instance";
import { BaseResponse } from "common/types";
import {
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel,
} from "./tasksApi.types";
import { baseApi } from "app/baseApi";

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload;
    return instance.post<BaseResponse<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { taskId, todolistId } = payload;
    return instance.delete<BaseResponse>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(payload: {
    todolistId: string;
    taskId: string;
    model: UpdateTaskModel;
  }) {
    const { taskId, todolistId, model } = payload;
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      { title: string; todolistId: string }
    >({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks`,
        method: "POST",
        body: { title: payload.title },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<
      BaseResponse,
      { todolistId: string; taskId: string }
    >({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      {
        todolistId: string;
        taskId: string;
        model: UpdateTaskModel;
      }
    >({
      query: ({ todolistId, model, taskId }) => ({
        method: "PUT",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
