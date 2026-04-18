import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import "@styles/global.css";

import { queryClient } from "@api/queryClient.ts";
import { AuthProvider } from "@context/AuthContext";
import App from "./App.tsx";
import { Toaster } from "sileo";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-center" theme="dark" />
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
