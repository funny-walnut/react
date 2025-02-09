import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.tsx',
    '!**/node_modules/**',
    '!**/*.test.tsx',
    '!**/*.spec.tsx',
    'src/__tests__/setup.ts',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

export default config;
