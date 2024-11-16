import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://placement-cell-website-mwgj.onrender.com",
        changeOrigin: true, // Ensures the Host header matches the target
        secure: true, // Ensures HTTPS is used
        // No rewrite because backend expects `/api/v1/...`
      },
    },
  },
});
