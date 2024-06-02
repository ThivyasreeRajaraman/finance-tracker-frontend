const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  testEnvironment: 'jsdom',
  preset: 'jest-expo',
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.js',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
  },
  testMatch: ['**/?(*.)+(spec|test).(tsx|jsx|ts)'],
  collectCoverageFrom: [
    '**/*.{ts,tsx,jsx}',
    '!src/**/*.d.ts',
    '!src/**/*.types.ts',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
    '!**/src/store.ts',
    '!**/src/testutils/**',
    '!**/src/hooks/**',
    '!**/ReconcilRoutes.tsx',
    '!**/routes.tsx',
    '!**/moduleInfo.ts',
    '!**/apiClient.ts',
    '!**/src/MainRoutes.tsx',
    '!**/src/override.ts',
    '!**/src/variables.ts',
    '!**/src/Main.tsx',
    '!**/src/ErrorBoundary.tsx',
    '!**/src/bootstrap.tsx',
    '!**/src/serviceWorkerRegistration.ts',
    '!**/reportWebVitals.ts',
    '!**/providers.ts',
    '!**/AuthorizeRemote.tsx',
    '!**/useAuthorizationRemote.ts',
    '!**/useUserDataRemote.ts',
    '!**/useNavbarLayoutRemote.ts',
    '!**/src/index.tsx',
    '!**/LinkWrapper.tsx',
    '!**/src/modules/depositmodule/DepositScreen/DepositDetails/components/AutoSuggest.tsx',
    '!src/modules/**/Lazy*.tsx',
    '!**/__tests__/**/*',
    '!**/__mocks__/**/*',
  ],
  moduleDirectories: ['node_modules', __dirname],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/src/',
    }),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base|.*.ttf)',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageThreshold: {
    '*/**': {
      statements: 90,
      branches: 90,
      lines: 90,
      functions: 90,
    },
  },
};