/**
 * Custom hook para gestión de contenido
 * Simplifica el acceso al contenido dinámico de la página
 */
import { useState, useEffect } from 'react';
import { contentService } from '../services/api';
import { HeroContent, AboutContent, TeamMember, NewsArticle } from '../types/api.types';

/**
 * Hook para obtener contenido del hero
 */
export const useHeroContent = () => {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await contentService.getHeroContent();
        setHero(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar contenido del hero');
        console.error('Error fetching hero:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  return { hero, loading, error };
};

/**
 * Hook para obtener contenido de "Sobre nosotros"
 */
export const useAboutContent = () => {
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await contentService.getAboutContent();
        setAbout(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar contenido');
        console.error('Error fetching about:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return { about, loading, error };
};

/**
 * Hook para obtener equipo
 */
export const useTeamContent = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await contentService.getTeamContent();
        setTeam(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar equipo');
        console.error('Error fetching team:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return { team, loading, error };
};

/**
 * Hook para obtener noticias/artículos
 */
export const useNewsContent = (options?: { limit?: number; page?: number }) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await contentService.getNewsContent(options);
        setNews(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar noticias');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [options]);

  return { news, loading, error };
};

/**
 * Hook para obtener un artículo específico
 */
export const useNewsArticle = (id: string | undefined) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await contentService.getNewsArticle(id);
        setArticle(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar artículo');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
};

