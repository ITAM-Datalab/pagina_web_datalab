/**
 * Custom hook para gestión de proyectos
 * Simplifica el uso de la API de proyectos
 */
import { useState, useEffect, useCallback } from 'react';
import { projectsService } from '../services/api';
import { Project, ProjectStats, ProjectCategory } from '../types/api.types';

interface UseProjectsOptions {
  category?: string;
  featured?: boolean;
  limit?: number;
  autoFetch?: boolean;
}

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para obtener lista de proyectos
 */
export const useProjects = (options: UseProjectsOptions = {}): UseProjectsReturn => {
  const { category, featured, limit, autoFetch = true } = options;
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsService.getProjects({ category, featured, limit });
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar proyectos');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }, [category, featured, limit]);

  useEffect(() => {
    if (autoFetch) {
      fetchProjects();
    }
  }, [autoFetch, fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
};

/**
 * Hook para obtener un proyecto específico
 */
export const useProject = (id: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectsService.getProject(id);
        setProject(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar proyecto');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { project, loading, error };
};

/**
 * Hook para obtener estadísticas de proyectos
 */
export const useProjectStats = () => {
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectsService.getProjectStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar estadísticas');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

/**
 * Hook para obtener categorías de proyectos
 */
export const useProjectCategories = () => {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectsService.getProjectCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar categorías');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

