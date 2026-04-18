import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@context/useAuth";

export default function AppHeader() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white">
            FR
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">FitReserve</span>
            <span className="text-xs text-slate-500">
              {user?.email ?? "Member area"}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onPress={() => navigate("/classes")} variant="tertiary">
            Classes
          </Button>
          <Button onPress={() => navigate("/reservations")} variant="tertiary">
            Reservations
          </Button>
          <Button onPress={handleLogout} variant="danger">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
