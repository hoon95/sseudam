import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const getAliasPath = (dir: string) => path.resolve(__dirname, dir);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": getAliasPath("./src"),
      "@assets": getAliasPath("./src/assets"),
      "@components": getAliasPath("./src/components"),
      "@pages": getAliasPath("./src/pages"),
      "@store": getAliasPath("./src/store"),
      "@apis": getAliasPath("./src/apis"),
    },
  },
});
