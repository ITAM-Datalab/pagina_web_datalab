/**
 * Rutas para gestión de contenido dinámico
 * Maneja información general, noticias y contenido de la página
 */
const express = require('express');
const router = express.Router();

// Controllers
const contentController = require('../controllers/content.controller');

// Middleware
const { publicApiLimiter } = require('../middleware/rateLimiter');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * GET /api/content/hero
 * Obtiene información del hero section
 * Público
 */
router.get('/hero', publicApiLimiter, asyncHandler(contentController.getHeroContent));

/**
 * GET /api/content/about
 * Obtiene información de la sección "Sobre nosotros"
 * Público
 */
router.get('/about', publicApiLimiter, asyncHandler(contentController.getAboutContent));

/**
 * GET /api/content/team
 * Obtiene información del equipo
 * Público
 */
router.get('/team', publicApiLimiter, asyncHandler(contentController.getTeamContent));

/**
 * GET /api/content/news
 * Obtiene noticias y artículos del blog
 * Público
 */
router.get('/news', publicApiLimiter, asyncHandler(contentController.getNewsContent));

/**
 * GET /api/content/news/:id
 * Obtiene un artículo específico por ID
 * Público
 */
router.get('/news/:id', publicApiLimiter, asyncHandler(contentController.getNewsArticle));

module.exports = router;
