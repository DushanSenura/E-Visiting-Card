import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { digitalCardPlugin } from "./vite-plugins/digital-card";

// BASE_PATH lets the card live in a sub-folder, e.g. BASE_PATH=/card/ for leescents.lk/card
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react(), digitalCardPlugin()],
  build: {
    target: "es2020",
    cssCodeSplit: false,
  },
});
