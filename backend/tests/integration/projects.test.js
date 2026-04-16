/**
 * Tests de integración para rutas de proyectos
 */
const request = require('supertest');

// Mock de Firebase antes de importar la app
jest.mock('../../config/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      orderBy: jest.fn(() => ({
        limit: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve({
            empty: true,
            docs: []
          }))
        }))
      })),
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({
          exists: false
        }))
      }))
    }))
  }
}));

const app = require('../../src/server');

describe('Projects API', () => {
  describe('GET /api/projects', () => {
    it('debe retornar proyectos por defecto', async () => {
      const response = await request(app)
        .get('/api/projects')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('debe respetar el parámetro limit', async () => {
      const response = await request(app)
        .get('/api/projects?limit=2')
        .expect(200);

      expect(response.body.data.length).toBeLessThanOrEqual(2);
    });

    it('debe filtrar por featured', async () => {
      const response = await request(app)
        .get('/api/projects?featured=true')
        .expect(200);

      expect(response.body.data.every(p => p.featured === true)).toBe(true);
    });
  });

  describe('GET /api/projects/stats', () => {
    it('debe retornar estadísticas de proyectos', async () => {
      const response = await request(app)
        .get('/api/projects/stats')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('totalProjects');
      expect(response.body.data).toHaveProperty('completedProjects');
      expect(response.body.data).toHaveProperty('inProgressProjects');
    });
  });

  describe('GET /api/projects/:id', () => {
    it('debe retornar un proyecto por ID', async () => {
      const response = await request(app)
        .get('/api/projects/default-1')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id', 'default-1');
      expect(response.body.data).toHaveProperty('title');
    });

    it('debe retornar 404 para ID inexistente', async () => {
      const response = await request(app)
        .get('/api/projects/nonexistent-id')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });
  });
});

