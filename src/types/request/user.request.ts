import type { UserRole } from "@contracts/user-role";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: UserRole;
}
