process.env.JEST_PLAYWRIGHT_CONFIG = './jest-playwright.config.js'

export default {
  roots: ['<rootDir>/e2e'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/e2e/utils/babelTransformer.ts',
  },
  transformIgnorePatterns: ['node_modules/'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testTimeout: 600000,
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: ['<rootDir>/e2e/utils/setupFiles.ts'],
}
