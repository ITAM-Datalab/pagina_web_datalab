/**
 * Rutas para gestión de contacto
 * Maneja formularios de contacto y consultas
 */
const express = require('express');
const router = express.Router();

// Controllers
const contactController = require('../controllers/contact.controller');

// Middleware
const { authenticate, isAdmin } = require('../middleware/auth.middleware');
const { contactLimiter } = require('../middleware/rateLimiter');
const { validate, sanitizeBody } = require('../middleware/validator');
const { validateContactForm, validateStatusUpdate } = require('../validators/contact.validator');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * POST /api/contact
 * Procesa formulario de contacto
 * Público con rate limiting estricto
 */
router.post(
  '/',
  contactLimiter,
  sanitizeBody,
  validateContactForm,
  validate,
  asyncHandler(contactController.submitContactForm)
);

/**
 * GET /api/contact/info
 * Obtiene información de contacto de DataLab
 * Público
 */
router.get('/info', asyncHandler(contactController.getContactInfo));

/**
 * GET /api/contact/messages
 * Obtiene mensajes de contacto
 * Requiere autenticación de admin
 */
router.get(
  '/messages',
  authenticate,
  isAdmin,
  asyncHandler(contactController.getContactMessages)
);

/**
 * GET /api/contact/messages/:id
 * Obtiene un mensaje específico
 * Requiere autenticación de admin
 */
router.get(
  '/messages/:id',
  authenticate,
  isAdmin,
  asyncHandler(contactController.getContactMessage)
);

/**
 * PUT /api/contact/messages/:id/status
 * Actualiza el status de un mensaje
 * Requiere autenticación de admin
 */
router.put(
  '/messages/:id/status',
  authenticate,
  isAdmin,
  validateStatusUpdate,
  validate,
  asyncHandler(contactController.updateMessageStatus)
);

module.exports = router;
