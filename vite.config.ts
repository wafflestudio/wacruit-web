import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      timers: "rollup-plugin-node-polyfills/polyfills/timers",
    },
  },
  plugins: [react()],
});
