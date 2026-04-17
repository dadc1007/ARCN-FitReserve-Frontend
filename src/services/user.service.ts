import { httpClient } from "@api/httpClient";
import type { CreateUserRequest } from "@contracts/request/user.request";
import type { ApiResponse } from "@contracts/response/api.response";
import type { UserResponse } from "@contracts/response/user.response";

const USERS_ROUTE = "/users";

export const userService = {
  async createUser(payload: CreateUserRequest): Promise<UserResponse> {
    const { data } = await httpClient.post<ApiResponse<UserResponse>>(
      USERS_ROUTE,
      payload,
    );
    return data.data;
  },

  async deactivateUser(id: string): Promise<string> {
    const { data } = await httpClient.delete<ApiResponse<string>>(
      `${USERS_ROUTE}/${id}`,
    );
    return data.data;
  },
};
