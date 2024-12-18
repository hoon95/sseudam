import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@store", replacement: "/src/store" },
      { find: "@apis", replacement: "/src/apis" },
      { find: "@services", replacement: "/src/services" },
      { find: "@utils", replacement: "/src/utils" },
    ],
  },
});
