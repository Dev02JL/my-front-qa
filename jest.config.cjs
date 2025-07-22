module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1'
  },
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  collectCoverageFrom: [
    'app/**/*.{js,vue}',
    'components/**/*.{js,vue}',
    '!**/node_modules/**'
  ],
  moduleFileExtensions: ['js', 'json', 'vue'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  }
} 