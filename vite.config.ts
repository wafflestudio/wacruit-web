import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "timers",
        replacement: "rollup-plugin-node-polyfills/polyfills/timers",
      },
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://wacruit-dev.wafflestudio.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
