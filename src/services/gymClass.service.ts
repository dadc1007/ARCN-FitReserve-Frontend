import { httpClient } from "@api/httpClient";
import type { CreateGymClassRequest } from "@contracts/request/gym-class.request";
import type { ApiResponse } from "@contracts/response/api.response";
import type { GymClassResponse } from "@contracts/response/gym-class.response";

const CLASSES_ROUTE = "/classes";

export const gymClassService = {
  async createGymClass(
    payload: CreateGymClassRequest,
  ): Promise<GymClassResponse> {
    const { data } = await httpClient.post<ApiResponse<GymClassResponse>>(
      CLASSES_ROUTE,
      payload,
    );
    return data.data;
  },

  async deleteGymClass(id: string): Promise<string> {
    const { data } = await httpClient.delete<ApiResponse<string>>(
      `${CLASSES_ROUTE}/${id}`,
    );
    return data.data;
  },
};
