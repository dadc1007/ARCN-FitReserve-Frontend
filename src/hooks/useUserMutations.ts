import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { userService } from "@services/user.service";
import type { CreateUserRequest } from "@contracts/request/user.request";
import type { UserResponse } from "@contracts/response/user.response";

export const userQueryKeys = {
  byId: (id: string) => ["users", "id", id] as const,
};

export const useCreateUserMutation = () => {
  return useMutation<UserResponse, AxiosError, CreateUserRequest>({
    mutationFn: userService.createUser,
  });
};

export const useDeactivateUserMutation = () => {
  return useMutation<string, AxiosError, string>({
    mutationFn: userService.deactivateUser,
  });
};

export const useUserByIdQuery = (id: string) => {
  return useQuery<UserResponse, AxiosError>({
    queryKey: userQueryKeys.byId(id),
    queryFn: () => userService.getUserById(id),
    enabled: Boolean(id),
  });
};
