/**
 * Controlador de proyectos
 * Maneja la lógica de negocio para proyectos
 */
const firestoreService = require('../services/firestore.service');
const logger = require('../utils/logger');
const { 
  successResponse, 
  notFoundResponse 
} = require('../utils/apiResponse');

// Proyectos por defecto
const defaultProjects = [
  {
    id: 'default-1',
    title: 'Sistema de Horas de Servicio',
    description: 'Plataforma digital para gestionar y monitorear las horas de servicio social de estudiantes del ITAM.',
    category: 'Software',
    technologies: ['Flutter', 'Firebase', 'React'],
    status: 'En desarrollo',
    featured: true,
    image: '/images/projects/horas-servicio.jpg',
    githubUrl: '#',
    demoUrl: '#',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'default-2',
    title: 'Visualización de Datos Ambientales',
    description: 'Dashboard interactivo para visualizar datos de calidad del aire y cambio climático en México.',
    category: 'Visualización',
    technologies: ['D3.js', 'Python', 'React'],
    status: 'Completado',
    featured: true,
    image: '/images/projects/datos-ambientales.jpg',
    githubUrl: '#',
    demoUrl: '#',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'default-3',
    title: 'Análisis de Desigualdad Social',
    description: 'Estudio de datos socioeconómicos para identificar patrones de desigualdad en México.',
    category: 'Análisis',
    technologies: ['Python', 'Pandas', 'Matplotlib'],
    status: 'Completado',
    featured: false,
    image: '/images/projects/desigualdad-social.jpg',
    githubUrl: '#',
    demoUrl: '#',
    createdAt: new Date().toISOString(),
  },
];

/**
 * Obtiene lista de proyectos con filtros
 * GET /api/projects
 */
const getProjects = async (req, res, next) => {
  try {
    const { category, featured, limit = 20 } = req.query;
    
    const options = {
      orderBy: { field: 'createdAt', direction: 'desc' },
      limit: parseInt(limit),
      where: [],
    };
    
    // Filtrar por categoría
    if (category) {
      options.where.push(['category', '==', category]);
    }
    
    // Filtrar proyectos destacados
    if (featured === 'true') {
      options.where.push(['featured', '==', true]);
    }
    
    const projects = await firestoreService.getDocuments('projects', options);
    
    // Si no hay proyectos en Firestore, devolver proyectos por defecto
    if (projects.length === 0) {
      logger.info('No hay proyectos en Firestore, devolviendo proyectos por defecto');
      let filteredProjects = [...defaultProjects];
      
      if (category) {
        filteredProjects = filteredProjects.filter(p => p.category === category);
      }
      
      if (featured === 'true') {
        filteredProjects = filteredProjects.filter(p => p.featured === true);
      }
      
      return successResponse(res, filteredProjects, `${filteredProjects.length} proyectos encontrados`);
    }
    
    successResponse(res, projects, `${projects.length} proyectos encontrados`);
    
  } catch (error) {
    logger.error('Error obteniendo proyectos:', error);
    next(error);
  }
};

/**
 * Obtiene un proyecto específico por ID
 * GET /api/projects/:id
 */
const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Buscar en proyectos por defecto primero
    const defaultProject = defaultProjects.find(p => p.id === id);
    if (defaultProject) {
      return successResponse(res, defaultProject, 'Proyecto encontrado');
    }
    
    // Buscar en Firestore
    const project = await firestoreService.getDocument('projects', id);
    
    if (!project) {
      return notFoundResponse(res, 'Proyecto no encontrado');
    }
    
    successResponse(res, project, 'Proyecto encontrado');
    
  } catch (error) {
    logger.error('Error obteniendo proyecto:', error);
    next(error);
  }
};

/**
 * Obtiene categorías disponibles
 * GET /api/projects/categories
 */
const getCategories = async (req, res, next) => {
  try {
    const projects = await firestoreService.getDocuments('projects', { limit: 1000 });
    
    if (projects.length === 0) {
      const defaultCategories = [
        { name: 'Software', count: 1 },
        { name: 'Visualización', count: 1 },
        { name: 'Análisis', count: 1 },
      ];
      return successResponse(res, defaultCategories, 'Categorías disponibles');
    }
    
    // Contar proyectos por categoría
    const categories = {};
    projects.forEach(project => {
      const category = project.category;
      if (category) {
        categories[category] = (categories[category] || 0) + 1;
      }
    });
    
    const categoriesArray = Object.entries(categories).map(([name, count]) => ({
      name,
      count,
    }));
    
    successResponse(res, categoriesArray, 'Categorías disponibles');
    
  } catch (error) {
    logger.error('Error obteniendo categorías:', error);
    next(error);
  }
};

/**
 * Obtiene estadísticas de proyectos
 * GET /api/projects/stats
 */
const getProjectStats = async (req, res, next) => {
  try {
    const projects = await firestoreService.getDocuments('projects', { limit: 1000 });
    
    if (projects.length === 0) {
      const defaultStats = {
        totalProjects: 3,
        completedProjects: 2,
        inProgressProjects: 1,
        totalTechnologies: 8,
      };
      return successResponse(res, defaultStats, 'Estadísticas de proyectos');
    }
    
    const stats = {
      totalProjects: projects.length,
      completedProjects: projects.filter(p => p.status === 'Completado').length,
      inProgressProjects: projects.filter(p => p.status === 'En desarrollo').length,
      totalTechnologies: [...new Set(projects.flatMap(p => p.technologies || []))].length,
    };
    
    successResponse(res, stats, 'Estadísticas de proyectos');
    
  } catch (error) {
    logger.error('Error obteniendo estadísticas:', error);
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  getCategories,
  getProjectStats,
};

