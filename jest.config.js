/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.+)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "/src/context",
    "/src/services",
    "/src/mocks"
],
};
