import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        residential: resolve(import.meta.dirname, "residential.html"),
        commercial: resolve(import.meta.dirname, "commercial.html"),
        quote: resolve(import.meta.dirname, "quote.html"),
        work: resolve(import.meta.dirname, "work.html"),
        dashboard: resolve(import.meta.dirname, "dashboard.html"),
      },
    },
  },
});
