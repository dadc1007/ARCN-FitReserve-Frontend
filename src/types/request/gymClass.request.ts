import type { ClassType } from "@/types/classType";

export interface CreateGymClassRequest {
  name: string;
  type: ClassType;
  startTime: string;
  endTime: string;
  capacity: number;
}
