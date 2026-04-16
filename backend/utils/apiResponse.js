/**
 * Utilidades para respuestas estandarizadas de la API
 * Asegura consistencia en todas las respuestas
 */

/**
 * Respuesta exitosa
 * @param {Object} res - Objeto de respuesta de Express
 * @param {*} data - Datos a enviar
 * @param {String} message - Mensaje opcional
 * @param {Number} statusCode - Código de estado HTTP (default: 200)
 */
const successResponse = (res, data, message = 'Operación exitosa', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Respuesta de error
 * @param {Object} res - Objeto de respuesta de Express
 * @param {String} error - Tipo de error
 * @param {String} message - Mensaje de error
 * @param {Number} statusCode - Código de estado HTTP (default: 400)
 * @param {Object} details - Detalles adicionales del error
 */
const errorResponse = (res, error, message, statusCode = 400, details = null) => {
  const response = {
    success: false,
    error,
    message,
    timestamp: new Date().toISOString(),
  };
  
  if (details) {
    response.details = details;
  }
  
  return res.status(statusCode).json(response);
};

/**
 * Respuesta de validación fallida
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Array} errors - Array de errores de validación
 */
const validationErrorResponse = (res, errors) => {
  return res.status(400).json({
    success: false,
    error: 'Error de validación',
    message: 'Los datos proporcionados no son válidos',
    errors,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Respuesta de recurso no encontrado
 * @param {Object} res - Objeto de respuesta de Express
 * @param {String} message - Mensaje personalizado
 */
const notFoundResponse = (res, message = 'Recurso no encontrado') => {
  return res.status(404).json({
    success: false,
    error: 'No encontrado',
    message,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Respuesta de no autorizado
 * @param {Object} res - Objeto de respuesta de Express
 * @param {String} message - Mensaje personalizado
 */
const unauthorizedResponse = (res, message = 'No autorizado') => {
  return res.status(401).json({
    success: false,
    error: 'No autorizado',
    message,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Respuesta de prohibido (sin permisos)
 * @param {Object} res - Objeto de respuesta de Express
 * @param {String} message - Mensaje personalizado
 */
const forbiddenResponse = (res, message = 'Acceso denegado') => {
  return res.status(403).json({
    success: false,
    error: 'Acceso denegado',
    message,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Respuesta de creación exitosa
 * @param {Object} res - Objeto de respuesta de Express
 * @param {*} data - Datos del recurso creado
 * @param {String} message - Mensaje opcional
 */
const createdResponse = (res, data, message = 'Recurso creado exitosamente') => {
  return res.status(201).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Respuesta sin contenido (para DELETE exitoso)
 * @param {Object} res - Objeto de respuesta de Express
 */
const noContentResponse = (res) => {
  return res.status(204).send();
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse,
  createdResponse,
  noContentResponse,
};

