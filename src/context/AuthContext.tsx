import { useMemo, useState, type PropsWithChildren } from "react";

import { userService } from "@services/user.service";
import { AuthContext, type AuthContextValue } from "@context/auth-context";
import {
  clearStoredUser,
  getStoredUser,
  persistUser,
} from "@context/auth-storage";
import type {
  CreateUserRequest,
  LoginRequest,
} from "@contracts/request/user.request";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(getStoredUser);

  const login = async (payload: LoginRequest) => {
    const foundUser = await userService.login(payload);
    setUser(foundUser);
    persistUser(foundUser);
    return foundUser;
  };

  const signup = async (payload: CreateUserRequest) => {
    const createdUser = await userService.createUser(payload);
    setUser(createdUser);
    persistUser(createdUser);
    return createdUser;
  };

  const logout = () => {
    setUser(null);
    clearStoredUser();
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing: false,
      login,
      signup,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
