import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
      "@api": path.resolve(rootDir, "src/api"),
      "@app": path.resolve(rootDir, "src/app"),
      "@assets": path.resolve(rootDir, "src/assets"),
      "@components": path.resolve(rootDir, "src/components"),
      "@context": path.resolve(rootDir, "src/context"),
      "@hooks": path.resolve(rootDir, "src/hooks"),
      "@pages": path.resolve(rootDir, "src/pag es"),
      "@services": path.resolve(rootDir, "src/services"),
      "@utils": path.resolve(rootDir, "src/utils"),
      "@styles": path.resolve(rootDir, "src/styles"),
    },
  },
});
