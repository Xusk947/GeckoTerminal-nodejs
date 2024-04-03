import { resolve } from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['tonweb'],
    },
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "gecko-sdk",
      fileName: 'index',
    },
    minify: true,
    sourcemap: true,
  },
  plugins: [dts()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
