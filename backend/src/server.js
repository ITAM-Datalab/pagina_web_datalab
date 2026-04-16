/**
 * Servidor principal para la API de DataLab
 * Stack: Node.js + Express + Firebase
 * Versión mejorada con seguridad, logging y mejores prácticas
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

// Importar logger y middleware
const logger = require('../utils/logger');
const { generalLimiter } = require('../middleware/rateLimiter');
const { errorHandler, notFound } = require('../middleware/errorHandler');

// Importar rutas
const contentRoutes = require('../routes/content');
const projectRoutes = require('../routes/projects');
const contactRoutes = require('../routes/contact');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad con Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

// Middleware de compresión
app.use(compression());

// Middleware de logging con Winston
app.use(require('morgan')('combined', { stream: logger.stream }));

// Middleware de CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting general
app.use('/api/', generalLimiter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API DataLab ITAM',
    version: '2.0.0',
    description: 'Backend para página web de DataLab - Estudiantes del ITAM enfocados en problemáticas sociales, económicas y ambientales',
    documentation: '/api/docs',
  });
});

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    message: 'DataLab API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '2.0.0',
  });
});

// Rutas de la API
app.use('/api/content', contentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Middleware para rutas no encontradas
app.use(notFound);

// Middleware de manejo de errores (debe ser el último)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`🚀 Servidor DataLab ejecutándose en puerto ${PORT}`);
  logger.info(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`📡 CORS habilitado para: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
  logger.info(`🔒 Seguridad: Helmet, Rate Limiting, Validaciones activas`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

module.exports = app;
