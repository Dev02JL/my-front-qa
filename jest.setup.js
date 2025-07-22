import '@testing-library/jest-dom'

// Mock global fetch
global.fetch = jest.fn()

// Mock Nuxt composables
jest.mock('#app', () => ({
  useRuntimeConfig: () => ({
    public: {
      apiBase: 'http://localhost:3000'
    }
  })
})) 