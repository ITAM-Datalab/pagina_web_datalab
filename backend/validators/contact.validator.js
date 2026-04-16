/**
 * Validaciones para rutas de contacto
 * Usa express-validator para validar datos de entrada
 */
const { body } = require('express-validator');

/**
 * Validación para formulario de contacto
 */
const validateContactForm = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es requerido')
    .isEmail()
    .withMessage('Debe proporcionar un email válido')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('El email no debe exceder 100 caracteres'),
  
  body('subject')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('El asunto debe tener entre 3 y 200 caracteres'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('El mensaje es requerido')
    .isLength({ min: 10, max: 2000 })
    .withMessage('El mensaje debe tener entre 10 y 2000 caracteres'),
  
  body('type')
    .optional()
    .isIn(['general', 'proyecto', 'colaboracion', 'otro'])
    .withMessage('Tipo de mensaje inválido'),
];

/**
 * Validación para actualizar status de mensaje
 */
const validateStatusUpdate = [
  body('status')
    .notEmpty()
    .withMessage('El status es requerido')
    .isIn(['nuevo', 'en_proceso', 'resuelto', 'archivado'])
    .withMessage('Status inválido. Debe ser: nuevo, en_proceso, resuelto o archivado'),
];

module.exports = {
  validateContactForm,
  validateStatusUpdate,
};

