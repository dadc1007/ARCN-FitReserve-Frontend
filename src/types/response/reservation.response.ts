import type { ReservationStatus } from "@contracts/reservation-status";

export interface ReservationResponse {
  id: string;
  userId: string;
  classId: string;
  className: string | null;
  startTime: string | null;
  endTime: string | null;
  status: ReservationStatus;
}
