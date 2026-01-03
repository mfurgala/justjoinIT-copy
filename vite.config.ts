import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import { patchCssModules } from "vite-css-modules";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    patchCssModules({ exportMode: "default", generateSourceTypes: true }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
