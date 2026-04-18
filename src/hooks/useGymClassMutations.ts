import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { gymClassService } from "@services/gymClass.service";
import type { CreateGymClassRequest } from "@contracts/request/gym-class.request";
import type { GymClassResponse } from "@contracts/response/gym-class.response";

export const useCreateGymClassMutation = () => {
  return useMutation<GymClassResponse, AxiosError, CreateGymClassRequest>({
    mutationFn: gymClassService.createGymClass,
  });
};

export const useDeleteGymClassMutation = () => {
  return useMutation<string, AxiosError, string>({
    mutationFn: gymClassService.deleteGymClass,
  });
};
