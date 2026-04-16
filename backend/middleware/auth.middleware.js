/**
 * Middleware de autenticación
 * Verifica tokens JWT de Firebase y permisos de admin
 */
const admin = require('../config/firebase');
const logger = require('../utils/logger');

/**
 * Verifica que el usuario esté autenticado
 * @middleware
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        error: 'No autorizado',
        message: 'Token de autenticación no proporcionado'
      });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    // Verificar token con Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Agregar información del usuario al request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      admin: decodedToken.admin || false,
    };
    
    logger.info(`Usuario autenticado: ${req.user.email}`);
    next();
    
  } catch (error) {
    logger.error('Error en autenticación:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ 
        success: false,
        error: 'Token expirado',
        message: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.'
      });
    }
    
    return res.status(401).json({ 
      success: false,
      error: 'Token inválido',
      message: 'El token de autenticación no es válido'
    });
  }
};

/**
 * Verifica que el usuario tenga permisos de administrador
 * @middleware
 * Debe usarse después de authenticate
 */
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        error: 'No autenticado',
        message: 'Debes estar autenticado para acceder a este recurso'
      });
    }
    
    // Verificar si el usuario tiene rol de admin
    if (!req.user.admin) {
      logger.warn(`Intento de acceso admin por usuario no autorizado: ${req.user.email}`);
      
      return res.status(403).json({ 
        success: false,
        error: 'Acceso denegado',
        message: 'No tienes permisos para acceder a este recurso'
      });
    }
    
    logger.info(`Acceso admin concedido: ${req.user.email}`);
    next();
    
  } catch (error) {
    logger.error('Error verificando permisos de admin:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Error interno',
      message: 'Error al verificar permisos'
    });
  }
};

/**
 * Middleware opcional de autenticación
 * No falla si no hay token, solo agrega user si existe
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        admin: decodedToken.admin || false,
      };
    }
  } catch (error) {
    // No hacer nada si falla, es opcional
    logger.debug('Token opcional inválido o ausente');
  }
  
  next();
};

module.exports = {
  authenticate,
  isAdmin,
  optionalAuth,
};

