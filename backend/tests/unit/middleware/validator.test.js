/**
 * Tests unitarios para middleware de validación
 */
const { validate, sanitizeInput, sanitizeBody } = require('../../../middleware/validator');

describe('Validator Middleware', () => {
  describe('sanitizeInput', () => {
    it('debe remover caracteres peligrosos', () => {
      const input = '<script>alert("XSS")</script>';
      const result = sanitizeInput(input);
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('debe trimear espacios', () => {
      const input = '  test  ';
      const result = sanitizeInput(input);
      expect(result).toBe('test');
    });

    it('debe limitar longitud a 1000 caracteres', () => {
      const input = 'a'.repeat(2000);
      const result = sanitizeInput(input);
      expect(result.length).toBe(1000);
    });

    it('debe retornar input si no es string', () => {
      const input = 123;
      const result = sanitizeInput(input);
      expect(result).toBe(123);
    });
  });

  describe('sanitizeBody', () => {
    it('debe sanitizar todos los campos string del body', () => {
      const req = {
        body: {
          name: '  John  ',
          email: 'test@test.com',
          message: '<script>test</script>',
          age: 25
        }
      };
      const res = {};
      const next = jest.fn();

      sanitizeBody(req, res, next);

      expect(req.body.name).toBe('John');
      expect(req.body.message).not.toContain('<');
      expect(req.body.age).toBe(25);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('validate', () => {
    it('debe llamar next si no hay errores de validación', () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      // Mock de validationResult sin errores
      jest.mock('express-validator', () => ({
        validationResult: jest.fn(() => ({
          isEmpty: () => true,
          array: () => []
        }))
      }));

      validate(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});

