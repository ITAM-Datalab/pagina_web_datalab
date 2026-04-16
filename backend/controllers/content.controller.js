/**
 * Controlador de contenido
 * Maneja la lógica de negocio para contenido dinámico de la página
 */
const firestoreService = require('../services/firestore.service');
const logger = require('../utils/logger');
const { 
  successResponse, 
  notFoundResponse 
} = require('../utils/apiResponse');

/**
 * Obtiene información del hero section
 * GET /api/content/hero
 */
const getHeroContent = async (req, res, next) => {
  try {
    const heroDoc = await firestoreService.getDocument('content', 'hero');
    
    if (!heroDoc) {
      const defaultHero = {
        title: 'DataLab ITAM',
        subtitle: 'Estudiantes preocupadxs por problemáticas sociales, económicas y ambientales',
        description: 'Desarrollamos software, visualizaciones y soluciones con datos para crear un impacto positivo en México y el mundo.',
        ctaText: 'Conoce nuestros proyectos',
        backgroundImage: '/images/hero-bg.jpg',
      };
      
      return successResponse(res, defaultHero, 'Contenido del hero');
    }
    
    successResponse(res, heroDoc, 'Contenido del hero');
    
  } catch (error) {
    logger.error('Error obteniendo hero content:', error);
    next(error);
  }
};

/**
 * Obtiene información de la sección "Sobre nosotros"
 * GET /api/content/about
 */
const getAboutContent = async (req, res, next) => {
  try {
    const aboutDoc = await firestoreService.getDocument('content', 'about');
    
    if (!aboutDoc) {
      const defaultAbout = {
        title: 'Sobre DataLab',
        mission: 'Nuestra misión es utilizar el poder de los datos para abordar los desafíos más apremiantes de nuestra sociedad.',
        vision: 'Visualizamos un mundo donde la tecnología y los datos se utilicen de manera ética y efectiva para crear soluciones sostenibles.',
        values: [
          {
            title: 'Impacto Social',
            description: 'Nos enfocamos en proyectos que generen un impacto positivo en la sociedad.',
          },
          {
            title: 'Innovación',
            description: 'Utilizamos tecnologías emergentes para crear soluciones innovadoras.',
          },
          {
            title: 'Colaboración',
            description: 'Trabajamos en equipo y con la comunidad para maximizar nuestro impacto.',
          },
          {
            title: 'Transparencia',
            description: 'Mantenemos la transparencia en nuestros procesos y resultados.',
          },
        ],
      };
      
      return successResponse(res, defaultAbout, 'Información sobre nosotros');
    }
    
    successResponse(res, aboutDoc, 'Información sobre nosotros');
    
  } catch (error) {
    logger.error('Error obteniendo about content:', error);
    next(error);
  }
};

/**
 * Obtiene información del equipo
 * GET /api/content/team
 */
const getTeamContent = async (req, res, next) => {
  try {
    const team = await firestoreService.getDocuments('team', {
      orderBy: { field: 'order', direction: 'asc' },
      limit: 100,
    });
    
    if (team.length === 0) {
      const defaultTeam = [
        {
          name: 'Equipo DataLab',
          role: 'Estudiantes ITAM',
          description: 'Somos un grupo diverso de estudiantes apasionados por la tecnología y el impacto social.',
          image: '/images/team-placeholder.jpg',
          linkedin: '#',
          github: '#',
        },
      ];
      
      return successResponse(res, defaultTeam, 'Información del equipo');
    }
    
    successResponse(res, team, `${team.length} miembros del equipo`);
    
  } catch (error) {
    logger.error('Error obteniendo team:', error);
    next(error);
  }
};

/**
 * Obtiene noticias y artículos del blog
 * GET /api/content/news
 */
const getNewsContent = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;
    
    const news = await firestoreService.getDocuments('news', {
      orderBy: { field: 'publishedAt', direction: 'desc' },
      limit: parseInt(limit),
      offset,
    });
    
    successResponse(res, news, `${news.length} artículos encontrados`);
    
  } catch (error) {
    logger.error('Error obteniendo news:', error);
    next(error);
  }
};

/**
 * Obtiene un artículo específico por ID
 * GET /api/content/news/:id
 */
const getNewsArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const article = await firestoreService.getDocument('news', id);
    
    if (!article) {
      return notFoundResponse(res, 'Artículo no encontrado');
    }
    
    successResponse(res, article, 'Artículo encontrado');
    
  } catch (error) {
    logger.error('Error obteniendo artículo:', error);
    next(error);
  }
};

module.exports = {
  getHeroContent,
  getAboutContent,
  getTeamContent,
  getNewsContent,
  getNewsArticle,
};

