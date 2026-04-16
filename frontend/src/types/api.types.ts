/**
 * Tipos TypeScript para las respuestas de la API
 */

// Tipos para proyectos
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  status: 'En desarrollo' | 'Completado' | 'Pausado' | 'Planeado';
  featured: boolean;
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ProjectStats {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  totalTechnologies: number;
}

export interface ProjectCategory {
  name: string;
  count: number;
}

// Tipos para contenido
export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  backgroundImage: string;
}

export interface AboutContent {
  title: string;
  mission: string;
  vision: string;
  values: Value[];
}

export interface Value {
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin?: string;
  github?: string;
  order?: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  featured: boolean;
}

// Tipos para contacto
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type?: 'general' | 'proyecto' | 'colaboracion' | 'otro';
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  officeHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export interface ContactMessage extends ContactFormData {
  id: string;
  status: 'nuevo' | 'en_proceso' | 'resuelto' | 'archivado';
  createdAt: string;
  updatedAt?: string;
  ipAddress?: string;
  userAgent?: string;
}

