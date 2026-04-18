import type { PropsWithChildren } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "@context/useAuth";
import AppLayout from "@components/AppLayout";
import Login from "@pages/Login";
import GymClasses from "@pages/GymClasses";
import Reservations from "@pages/Reservations";
import Signup from "@pages/Signup";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/classes" replace /> : children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/classes" replace />} />
          <Route path="classes" element={<GymClasses />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="*" element={<Navigate to="/classes" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
