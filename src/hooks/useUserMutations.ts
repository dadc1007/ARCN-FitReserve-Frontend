import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { userService } from "@services/user.service";
import type { CreateUserRequest } from "@contracts/request/user.request";
import type { UserResponse } from "@contracts/response/user.response";

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
