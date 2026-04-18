import type { ClassType } from "@contracts/class-type";

export interface CreateGymClassRequest {
  name: string;
  type: ClassType;
  startTime: string;
  endTime: string;
  capacity: number;
}
