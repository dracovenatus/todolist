import { instance } from "common/instance";
import { BaseResponse } from "common/types";
import { Todolist } from "./todolistsApi.types";
import { DomainTodolist } from "../model/todolistsSlice";
import { baseApi } from "app/baseApi";

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists");
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { title, id } = payload;
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title });
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", {
      title,
    });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`);
  },
};

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" })),
      providesTags: ["Todolist"],
    }),
    addTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => {
        return {
          url: "todo-lists",
          method: "POST",
          body: { title },
        };
      },
      invalidatesTags: ["Todolist"],
    }),
    removeTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `todo-lists/${id}`,
        };
      },
      invalidatesTags: ["Todolist"],
    }),

    updateTodolist: builder.mutation<
      BaseResponse,
      { id: string; title: string }
    >({
      query: ({ id, title }) => {
        return {
          method: "PUT",
          url: `todo-lists/${id}`,
          body: {
            title,
          },
        };
      },
      invalidatesTags: ["Todolist"],
    }),
  }),
});

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistMutation,
} = todolistsApi;
