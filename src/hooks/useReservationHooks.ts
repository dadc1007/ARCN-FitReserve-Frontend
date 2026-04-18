import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { queryClient } from "@api/queryClient";
import { reservationService } from "@services/reservation.service";
import type { CreateReservationRequest } from "@contracts/request/reservation.request";
import type { ReservationResponse } from "@contracts/response/reservation.response";
import { gymClassQueryKeys } from "./useGymClassMutations";

export const reservationQueryKeys = {
  byUser: (userId: string) => ["reservations", "user", userId] as const,
};

interface CancelReservationVariables {
  reservationId: string;
  userId: string;
}

export const useCreateReservationMutation = () => {
  return useMutation<ReservationResponse, AxiosError, CreateReservationRequest>(
    {
      mutationFn: reservationService.createReservation,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: gymClassQueryKeys.availableByUser(variables.userId),
        });
        queryClient.invalidateQueries({
          queryKey: reservationQueryKeys.byUser(variables.userId),
        });
      },
    },
  );
};

export const useCancelReservationMutation = () => {
  return useMutation<string, AxiosError, CancelReservationVariables>({
    mutationFn: ({ reservationId }) =>
      reservationService.cancelReservation(reservationId),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: gymClassQueryKeys.availableByUser(variables.userId),
      });
      await queryClient.invalidateQueries({
        queryKey: reservationQueryKeys.byUser(variables.userId),
      });
    },
  });
};

export const useReservationsByUserQuery = (userId: string) => {
  return useQuery<ReservationResponse[], AxiosError>({
    queryKey: reservationQueryKeys.byUser(userId),
    queryFn: () => reservationService.getReservationsByUser(userId),
    enabled: Boolean(userId),
  });
};
