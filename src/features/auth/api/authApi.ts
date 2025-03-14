import { instance } from "common/instance";
import { isInitializedDataResponse, LoginArgs } from "./authApi.types";
import { BaseResponse } from "common/types";
import { baseApi } from "app/baseApi";

export const _authApi = {
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(
      `auth/login`,
      payload
    );
  },
  logout() {
    return instance.delete<BaseResponse>(`auth/login`);
  },
  me() {
    return instance.get<BaseResponse<isInitializedDataResponse>>("auth/me");
  },
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      BaseResponse<{ userId: number; token: string }>,
      LoginArgs
    >({
      query: (body) => ({
        method: "POST",
        url: "auth/login",
        body,
      }),
    }),
    me: builder.query<
      BaseResponse<{ id: number; email: string; login: string }>,
      void
    >({
      query: () => "auth/me",
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => {
        return {
          method: "DELETE",
          url: "auth/login",
        };
      },
    }),
  }),
});

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi;
