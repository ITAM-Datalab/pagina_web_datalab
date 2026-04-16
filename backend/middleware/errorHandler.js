/**
 * Middleware de manejo de errores centralizado
 * Captura y formatea todos los errores de la aplicación
 */
const logger = require('../utils/logger');

/**
 * Middleware para manejar errores 404 (ruta no encontrada)
 */
const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Middleware principal de manejo de errores
 * Debe ser el último middleware en la cadena
 */
const errorHandler = (err, req, res, next) => {
  // Determinar status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log del error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.body,
    statusCode,
  });
  
  // Errores de validación de Mongoose/Firebase
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Error de validación',
      message: err.message,
      details: err.errors,
    });
  }
  
  // Errores de Cast (IDs inválidos, etc.)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'ID inválido',
      message: 'El formato del ID proporcionado no es válido',
    });
  }
  
  // Errores de Firebase Auth
  if (err.code && err.code.startsWith('auth/')) {
    const authErrors = {
      'auth/id-token-expired': 'Token de autenticación expirado',
      'auth/id-token-revoked': 'Token de autenticación revocado',
      'auth/invalid-id-token': 'Token de autenticación inválido',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/user-disabled': 'Usuario deshabilitado',
    };
    
    return res.status(401).json({
      success: false,
      error: 'Error de autenticación',
      message: authErrors[err.code] || 'Error de autenticación',
    });
  }
  
  // Errores de permisos
  if (err.code === 'permission-denied') {
    return res.status(403).json({
      success: false,
      error: 'Acceso denegado',
      message: 'No tienes permisos para acceder a este recurso',
    });
  }
  
  // Errores de recursos no encontrados
  if (err.code === 'not-found') {
    return res.status(404).json({
      success: false,
      error: 'No encontrado',
      message: err.message || 'Recurso no encontrado',
    });
  }
  
  // Errores de rate limiting
  if (err.status === 429) {
    return res.status(429).json({
      success: false,
      error: 'Demasiadas solicitudes',
      message: 'Has excedido el límite de solicitudes. Por favor intenta más tarde.',
    });
  }
  
  // Error genérico para producción (no exponer detalles)
  const isProduction = process.env.NODE_ENV === 'production';
  
  res.status(statusCode).json({
    success: false,
    error: isProduction ? 'Error interno del servidor' : err.name || 'Error',
    message: isProduction ? 'Algo salió mal. Por favor intenta más tarde.' : err.message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
};

/**
 * Wrapper para funciones async
 * Evita tener que usar try-catch en cada controlador
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  notFound,
  errorHandler,
  asyncHandler,
};

