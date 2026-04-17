import type { UserRole } from "@/types/userRole";

export interface UserResponse {
  id: string;
  email: string;
  role: UserRole;
  active: boolean;
}
