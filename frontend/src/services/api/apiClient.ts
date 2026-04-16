/**
 * Cliente HTTP configurado con Axios
 * Maneja requests a la API del backend
 */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { auth } from '../../config/firebase';

// Tipos para respuestas de API
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Configuración base
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Crear instancia de Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Agregar token de autenticación
apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    try {
      const user = auth.currentUser;
      
      if (user) {
        const token = await user.getIdToken();
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      return config;
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Manejo de errores
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    // Si el token expiró, intentar renovarlo
    if (error.response?.status === 401 && auth.currentUser) {
      try {
        const token = await auth.currentUser.getIdToken(true);
        
        if (error.config && error.config.headers) {
          error.config.headers.Authorization = `Bearer ${token}`;
          return apiClient.request(error.config);
        }
      } catch (refreshError) {
        // Si falla el refresh, logout
        await auth.signOut();
        window.location.href = '/login';
      }
    }
    
    // Formatear errores
    const apiError: ApiError = {
      success: false,
      error: error.response?.data?.error || 'Error desconocido',
      message: error.response?.data?.message || 'Algo salió mal',
      details: error.response?.data?.details,
      timestamp: new Date().toISOString(),
    };
    
    return Promise.reject(apiError);
  }
);

export default apiClient;
