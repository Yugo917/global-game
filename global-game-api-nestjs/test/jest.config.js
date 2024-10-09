module.exports = {
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  },
  rootDir: "../",
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",  // Include all TypeScript files under src/ for coverage
    "!src/main.ts",  // Exclude specific files (like main.ts)
    "!src/**/*.module.ts"  // Exclude specific patterns (like module files)
  ],
  coverageDirectory: "./coverage",  // Optional: where to output the coverage report
  coverageReporters: ["html", "text"]  // Specify the format of coverage reports
}