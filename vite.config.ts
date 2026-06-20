import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  base: process.env.VITE_BASE_PATH || "/resume-xpert",
  resolve: {
    tsconfigPaths: true,
  },
});
