import type { ClassType } from "@/types/classType";

export interface GymClassResponse {
  id: string;
  name: string;
  type: ClassType;
  startTime: string;
  endTime: string;
  capacity: number;
  reserved: number;
}
