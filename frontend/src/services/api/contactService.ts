/**
 * Servicio para gestión de contacto
 * Interactúa con el endpoint /api/contact
 */
import apiClient, { ApiResponse } from './apiClient';
import { ContactFormData, ContactInfo, ContactMessage } from '../../types/api.types';

/**
 * Envía formulario de contacto
 */
export const submitContactForm = async (formData: ContactFormData): Promise<{ id: string }> => {
  const { data } = await apiClient.post<ApiResponse<{ id: string }>>('/contact', formData);
  return data.data;
};

/**
 * Obtiene información de contacto de DataLab
 */
export const getContactInfo = async (): Promise<ContactInfo> => {
  const { data } = await apiClient.get<ApiResponse<ContactInfo>>('/contact/info');
  return data.data;
};

/**
 * Obtiene mensajes de contacto (admin)
 */
export const getContactMessages = async (params?: {
  status?: string;
  limit?: number;
  page?: number;
}): Promise<ContactMessage[]> => {
  const { data } = await apiClient.get<ApiResponse<ContactMessage[]>>('/contact/messages', { params });
  return data.data;
};

/**
 * Obtiene un mensaje específico (admin)
 */
export const getContactMessage = async (id: string): Promise<ContactMessage> => {
  const { data } = await apiClient.get<ApiResponse<ContactMessage>>(`/contact/messages/${id}`);
  return data.data;
};

/**
 * Actualiza el status de un mensaje (admin)
 */
export const updateMessageStatus = async (
  id: string,
  status: 'nuevo' | 'en_proceso' | 'resuelto' | 'archivado'
): Promise<ContactMessage> => {
  const { data } = await apiClient.put<ApiResponse<ContactMessage>>(
    `/contact/messages/${id}/status`,
    { status }
  );
  return data.data;
};

const contactService = {
  submitContactForm,
  getContactInfo,
  getContactMessages,
  getContactMessage,
  updateMessageStatus,
};

export default contactService;

