import { httpClient } from "@api/httpClient";
import type { CreateReservationRequest } from "@contracts/request/reservation.request";
import type { ApiResponse } from "@contracts/response/api.response";
import type { ReservationResponse } from "@contracts/response/reservation.response";

const RESERVATIONS_ROUTE = "/reservations";

export const reservationService = {
  async createReservation(
    payload: CreateReservationRequest,
  ): Promise<ReservationResponse> {
    const { data } = await httpClient.post<ApiResponse<ReservationResponse>>(
      RESERVATIONS_ROUTE,
      payload,
    );
    return data.data;
  },

  async cancelReservation(id: string): Promise<string> {
    const { data } = await httpClient.delete<ApiResponse<string>>(
      `${RESERVATIONS_ROUTE}/${id}`,
    );
    return data.data;
  },

  async getReservationsByUser(userId: string): Promise<ReservationResponse[]> {
    const { data } = await httpClient.get<ApiResponse<ReservationResponse[]>>(
      `${RESERVATIONS_ROUTE}/user/${userId}`,
    );
    return data.data;
  },
};
