import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: true,
    environment: "jsdom",
    globals: true,
    setupFiles: "tests/setup.ts",
    deps: {
      inline: ["@faker-js/faker"],
    },
  },
  mode: "test",
});
