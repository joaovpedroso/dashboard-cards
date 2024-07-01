import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";

const BASE_URL = process.env.BASE_URL || "";

// https://vitejs.dev/config/
export default defineConfig({
  base: `${BASE_URL}`,
  plugins: [react(), eslintPlugin()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
