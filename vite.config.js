import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        lawnMaintenance: resolve(import.meta.dirname, "lawn-maintenance.html"),
        exteriorCleaning: resolve(import.meta.dirname, "exterior-cleaning.html"),
        propertyCleanups: resolve(import.meta.dirname, "property-cleanups.html"),
        serviceAreas: resolve(import.meta.dirname, "service-areas.html"),
        residential: resolve(import.meta.dirname, "residential.html"),
        commercial: resolve(import.meta.dirname, "commercial.html"),
        quote: resolve(import.meta.dirname, "quote.html"),
        dashboard: resolve(import.meta.dirname, "dashboard.html"),
      },
    },
  },
});
