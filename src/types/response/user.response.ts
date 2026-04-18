import type { UserRole } from "@contracts/user-role";

export interface UserResponse {
  id: string;
  email: string;
  role: UserRole;
  active: boolean;
}
