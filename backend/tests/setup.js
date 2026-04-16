/**
 * Setup para tests del backend
 * Se ejecuta antes de todos los tests
 */

// Configurar variables de entorno para tests
process.env.NODE_ENV = 'test';
process.env.PORT = 3002;
process.env.LOG_LEVEL = 'error';

// Mock de logger para tests
jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  http: jest.fn(),
  stream: {
    write: jest.fn()
  }
}));

// Timeout global para tests
jest.setTimeout(10000);

