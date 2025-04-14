// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",           // Diretório de saída para o build
    chunkSizeWarningLimit: 1000, // Evita warning de tamanho de chunk
  },
});
