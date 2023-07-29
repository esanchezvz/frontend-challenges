const path = require('path')

const projectRoot = path.resolve(__dirname, '..')

/** @type {import('jest').Config} */
module.exports = {
  roots: [projectRoot],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Handle ts path aliases
    '^@/(.*)$': `${projectRoot}/src/$1`,
  },
  transform: {
    // Handle image imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/fileTransformer.js',
    // Use babel-jest to transpile tests with the babel presets
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotResolver: './snapshotResolver.js',
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary', 'cobertura'],
  collectCoverageFrom: ['../src/**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
}
