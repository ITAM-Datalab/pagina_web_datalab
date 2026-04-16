/**
 * Validaciones para rutas de proyectos
 * Usa express-validator para validar datos de entrada
 */
const { query, param } = require('express-validator');

/**
 * Validación para query params de lista de proyectos
 */
const validateProjectsQuery = [
  query('category')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('La categoría debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('La categoría solo puede contener letras y espacios'),
  
  query('featured')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('El parámetro featured debe ser "true" o "false"'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser un número entre 1 y 100')
    .toInt(),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número mayor a 0')
    .toInt(),
];

/**
 * Validación para ID de proyecto
 */
const validateProjectId = [
  param('id')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('El ID del proyecto no es válido'),
];

module.exports = {
  validateProjectsQuery,
  validateProjectId,
};

