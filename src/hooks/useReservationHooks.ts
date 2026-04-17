import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { reservationService } from "@services/reservation.service";
import type { CreateReservationRequest } from "@contracts/request/reservation.request";
import type { ReservationResponse } from "@contracts/response/reservation.response";

export const reservationQueryKeys = {
  byUser: (userId: string) => ["reservations", "user", userId] as const,
};

export const useCreateReservationMutation = () => {
  return useMutation<ReservationResponse, AxiosError, CreateReservationRequest>(
    {
      mutationFn: reservationService.createReservation,
    },
  );
};

export const useCancelReservationMutation = () => {
  return useMutation<string, AxiosError, string>({
    mutationFn: reservationService.cancelReservation,
  });
};

export const useReservationsByUserQuery = (userId: string) => {
  return useQuery<ReservationResponse[], AxiosError>({
    queryKey: reservationQueryKeys.byUser(userId),
    queryFn: () => reservationService.getReservationsByUser(userId),
    enabled: Boolean(userId),
  });
};
