/**
 * Configuración de Jest para el backend
 */
module.exports = {
  // Entorno de tests
  testEnvironment: 'node',
  
  // Archivos de test
  testMatch: [
    '**/__tests__/**/*.js',
    '**/*.test.js',
    '**/*.spec.js'
  ],
  
  // Coverage
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/config/'
  ],
  collectCoverageFrom: [
    'controllers/**/*.js',
    'services/**/*.js',
    'middleware/**/*.js',
    '!**/node_modules/**'
  ],
  
  // Configuración de cobertura
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  
  // Timeout
  testTimeout: 10000,
  
  // Setup
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Verbose
  verbose: true
};

