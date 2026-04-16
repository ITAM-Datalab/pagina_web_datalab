/**
 * Servicio para gestión de proyectos
 * Interactúa con el endpoint /api/projects
 */
import apiClient, { ApiResponse } from './apiClient';
import { Project, ProjectStats, ProjectCategory } from '../../types/api.types';

/**
 * Obtiene lista de proyectos con filtros opcionales
 */
export const getProjects = async (params?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Project[]> => {
  const { data } = await apiClient.get<ApiResponse<Project[]>>('/projects', { params });
  return data.data;
};

/**
 * Obtiene un proyecto específico por ID
 */
export const getProject = async (id: string): Promise<Project> => {
  const { data } = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
  return data.data;
};

/**
 * Obtiene categorías disponibles de proyectos
 */
export const getProjectCategories = async (): Promise<ProjectCategory[]> => {
  const { data } = await apiClient.get<ApiResponse<ProjectCategory[]>>('/projects/categories');
  return data.data;
};

/**
 * Obtiene estadísticas de proyectos
 */
export const getProjectStats = async (): Promise<ProjectStats> => {
  const { data } = await apiClient.get<ApiResponse<ProjectStats>>('/projects/stats');
  return data.data;
};

const projectsService = {
  getProjects,
  getProject,
  getProjectCategories,
  getProjectStats,
};

export default projectsService;

