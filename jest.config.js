/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  
};
