import type { UserResponse } from "@contracts/response/user.response";

const AUTH_STORAGE_KEY = "fitreserve.auth.user";

export function getStoredUser(): UserResponse | null {
  const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as UserResponse;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function persistUser(user: UserResponse) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
