import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.json" }],
  },
  testMatch: ["**/src/tests/usecases/e2e/**/*.test.ts"],
  globalSetup: "<rootDir>/src/tests/setup/global-setup.ts",
  globalTeardown: "<rootDir>/src/tests/setup/global-teardown.ts",
  setupFiles: ["<rootDir>/src/tests/setup/load-env.ts"],
  testTimeout: 60000,
  maxWorkers: 1,
};

export default config;