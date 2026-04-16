/**
 * Middleware de Rate Limiting
 * Previene abuso de la API limitando requests por IP
 */
const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

/**
 * Limiter general para todas las rutas
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requests por ventana
  message: {
    success: false,
    error: 'Demasiadas solicitudes',
    message: 'Has excedido el límite de solicitudes. Por favor intenta más tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit excedido para IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: 'Demasiadas solicitudes',
      message: 'Has excedido el límite de solicitudes. Por favor intenta más tarde.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
    });
  },
});

/**
 * Limiter estricto para formulario de contacto
 */
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // Máximo 5 mensajes por hora
  message: {
    success: false,
    error: 'Límite de mensajes alcanzado',
    message: 'Has enviado demasiados mensajes. Por favor espera un poco antes de intentar nuevamente.',
  },
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    logger.warn(`Límite de contacto excedido para IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: 'Límite de mensajes alcanzado',
      message: 'Has enviado demasiados mensajes. Por favor espera una hora antes de intentar nuevamente.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
    });
  },
});

/**
 * Limiter para endpoints de autenticación
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Máximo 10 intentos de login
  message: {
    success: false,
    error: 'Demasiados intentos de autenticación',
    message: 'Has intentado autenticarte demasiadas veces. Por favor espera 15 minutos.',
  },
  skipSuccessfulRequests: true, // No contar requests exitosos
  handler: (req, res) => {
    logger.warn(`Límite de auth excedido para IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: 'Demasiados intentos de autenticación',
      message: 'Has intentado autenticarte demasiadas veces. Por favor espera 15 minutos.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000),
    });
  },
});

/**
 * Limiter para API pública (más permisivo)
 */
const publicApiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // Máximo 30 requests por minuto
  message: {
    success: false,
    error: 'Límite de solicitudes alcanzado',
    message: 'Por favor reduce la frecuencia de tus solicitudes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  generalLimiter,
  contactLimiter,
  authLimiter,
  publicApiLimiter,
};

