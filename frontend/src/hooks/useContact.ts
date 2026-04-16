/**
 * Custom hook para gestión de contacto
 * Simplifica el uso del formulario de contacto
 */
import { useState, useCallback } from 'react';
import { contactService } from '../services/api';
import { ContactFormData } from '../types/api.types';

interface UseContactFormReturn {
  submitForm: (formData: ContactFormData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

/**
 * Hook para manejar el formulario de contacto
 */
export const useContactForm = (): UseContactFormReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitForm = useCallback(async (formData: ContactFormData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await contactService.submitContactForm(formData);
      
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al enviar el mensaje');
      console.error('Error submitting contact form:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return { submitForm, loading, error, success, reset };
};

export default useContactForm;

