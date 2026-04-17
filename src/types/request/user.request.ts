import type { UserRole } from "@/types/userRole";

export interface CreateUserRequest {
  email: string;
  password: string;
  role: UserRole;
}
