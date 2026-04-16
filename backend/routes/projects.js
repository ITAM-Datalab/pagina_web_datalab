/**
 * Rutas para gestión de proyectos
 * Maneja información de proyectos, visualizaciones y soluciones
 */
const express = require('express');
const router = express.Router();

// Controllers
const projectsController = require('../controllers/projects.controller');

// Middleware
const { publicApiLimiter } = require('../middleware/rateLimiter');
const { validate } = require('../middleware/validator');
const { validateProjectsQuery, validateProjectId } = require('../validators/projects.validator');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * GET /api/projects/categories
 * Obtiene las categorías disponibles de proyectos
 * Público
 */
router.get(
  '/categories',
  publicApiLimiter,
  asyncHandler(projectsController.getCategories)
);

/**
 * GET /api/projects/stats
 * Obtiene estadísticas generales de proyectos
 * Público
 */
router.get(
  '/stats',
  publicApiLimiter,
  asyncHandler(projectsController.getProjectStats)
);

/**
 * GET /api/projects/:id
 * Obtiene un proyecto específico por ID
 * Público
 */
router.get(
  '/:id',
  publicApiLimiter,
  validateProjectId,
  validate,
  asyncHandler(projectsController.getProject)
);

/**
 * GET /api/projects
 * Obtiene lista de proyectos con filtros
 * Público
 */
router.get(
  '/',
  publicApiLimiter,
  validateProjectsQuery,
  validate,
  asyncHandler(projectsController.getProjects)
);

module.exports = router;
