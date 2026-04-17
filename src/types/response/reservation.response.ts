import type { ReservationStatus } from "@/types/reservationStatus";

export interface ReservationResponse {
  id: string;
  userId: string;
  classId: string;
  status: ReservationStatus;
}
