import type { ClassType } from "@contracts/class-type";

export interface GymClassResponse {
  id: string;
  name: string;
  type: ClassType;
  startTime: string;
  endTime: string;
  capacity: number;
  reserved: number;
}
