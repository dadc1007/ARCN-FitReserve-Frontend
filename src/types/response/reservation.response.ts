import type { ReservationStatus } from "@contracts/reservation-status";

export interface ReservationResponse {
  id: string;
  userId: string;
  classId: string;
  status: ReservationStatus;
}
