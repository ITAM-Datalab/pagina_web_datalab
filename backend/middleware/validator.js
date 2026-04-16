/**
 * Middleware de validación
 * Utiliza express-validator para validar inputs
 */
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

/**
 * Middleware que verifica resultados de validación
 * Debe usarse después de las reglas de validación
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    logger.warn('Errores de validación:', {
      url: req.originalUrl,
      method: req.method,
      errors: errors.array(),
      ip: req.ip,
    });
    
    // Formatear errores para respuesta
    const formattedErrors = errors.array().map(error => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value,
    }));
    
    return res.status(400).json({
      success: false,
      error: 'Error de validación',
      message: 'Los datos proporcionados no son válidos',
      errors: formattedErrors,
    });
  }
  
  next();
};

/**
 * Sanitiza strings para prevenir XSS
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remover caracteres peligrosos básicos
    .substring(0, 1000); // Limitar longitud
};

/**
 * Middleware para sanitizar body del request
 */
const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeInput(req.body[key]);
      }
    });
  }
  next();
};

module.exports = {
  validate,
  sanitizeInput,
  sanitizeBody,
};

