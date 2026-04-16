/**
 * Exportación centralizada de todos los servicios API
 */
export { default as projectsService } from './projectsService';
export { default as contentService } from './contentService';
export { default as contactService } from './contactService';
export { default as apiClient } from './apiClient';

// Exportar tipos
export type { ApiResponse, ApiError } from './apiClient';

