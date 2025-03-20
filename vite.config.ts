import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      mozjpeg: {
        quality: 75,
      },
      pngquant: {
        quality: [0.65, 0.8],
        speed: 4,
      },
      webp: {
        quality: 75,
      },
    }),
  ],
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
