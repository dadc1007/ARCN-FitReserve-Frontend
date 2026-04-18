import { createContext } from "react";

import type {
  CreateUserRequest,
  LoginRequest,
} from "@contracts/request/user.request";
import type { UserResponse } from "@contracts/response/user.response";

export interface AuthContextValue {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (payload: LoginRequest) => Promise<UserResponse>;
  signup: (payload: CreateUserRequest) => Promise<UserResponse>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
