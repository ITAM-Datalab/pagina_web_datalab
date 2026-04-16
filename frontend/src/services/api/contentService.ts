/**
 * Servicio para gestión de contenido dinámico
 * Interactúa con el endpoint /api/content
 */
import apiClient, { ApiResponse } from './apiClient';
import { HeroContent, AboutContent, TeamMember, NewsArticle } from '../../types/api.types';

/**
 * Obtiene contenido del hero section
 */
export const getHeroContent = async (): Promise<HeroContent> => {
  const { data } = await apiClient.get<ApiResponse<HeroContent>>('/content/hero');
  return data.data;
};

/**
 * Obtiene contenido de "Sobre nosotros"
 */
export const getAboutContent = async (): Promise<AboutContent> => {
  const { data } = await apiClient.get<ApiResponse<AboutContent>>('/content/about');
  return data.data;
};

/**
 * Obtiene información del equipo
 */
export const getTeamContent = async (): Promise<TeamMember[]> => {
  const { data } = await apiClient.get<ApiResponse<TeamMember[]>>('/content/team');
  return data.data;
};

/**
 * Obtiene lista de noticias/artículos
 */
export const getNewsContent = async (params?: {
  limit?: number;
  page?: number;
}): Promise<NewsArticle[]> => {
  const { data } = await apiClient.get<ApiResponse<NewsArticle[]>>('/content/news', { params });
  return data.data;
};

/**
 * Obtiene un artículo específico
 */
export const getNewsArticle = async (id: string): Promise<NewsArticle> => {
  const { data } = await apiClient.get<ApiResponse<NewsArticle>>(`/content/news/${id}`);
  return data.data;
};

const contentService = {
  getHeroContent,
  getAboutContent,
  getTeamContent,
  getNewsContent,
  getNewsArticle,
};

export default contentService;

