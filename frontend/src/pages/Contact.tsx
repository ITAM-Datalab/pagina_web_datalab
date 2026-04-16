/**
 * Página de Contacto
 * Formulario de solicitud para unirse al DataLab ITAM
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactContainer = styled.div`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  min-height: 80vh;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textLight};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  }
`;

const FormContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing['3xl']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  
  span.required {
    color: ${({ theme }) => theme.colors.error};
    margin-left: 4px;
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderDark};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.base};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderDark};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  color: ${({ theme }) => theme.colors.textWhite};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const InfoSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

// URL del Google Apps Script webhook
const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbwqnvkf9-VQrQCOtLoZ7HojP47mbxMrXQjXC_jPNxTJQzCb3eqi3evhv0CMhw7VgAE5/exec';

// Tipos para el formulario
interface FormData {
  nombre: string;
  cu: string;
  email: string;
  telefono: string;
  area: string;
}

interface FormErrors {
  nombre?: string;
  cu?: string;
  email?: string;
  telefono?: string;
  area?: string;
}

const SuccessBanner = styled(motion.div)`
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.base};
    opacity: 0.9;
  }
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    cu: '',
    email: '',
    telefono: '',
    area: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Áreas disponibles
  const areas = [
    { value: '', label: 'Selecciona un área' },
    { value: 'direccion-general', label: 'Dirección General' },
    { value: 'proyectos', label: 'Área de Proyectos (Projects and Development)' },
    { value: 'investigacion', label: 'Área de Investigación y Desarrollo (R&D)' },
    { value: 'calidad', label: 'Área de Calidad, Comunicación y Diseño (Quality, Communication and Design)' },
    { value: 'operaciones', label: 'Área de Operaciones (Operations)' },
    { value: 'talento', label: 'Área de Talento y Cultura (Talent & Culture)' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    // Validar CU (formato típico: 6 dígitos)
    if (!formData.cu.trim()) {
      newErrors.cu = 'La CU es requerida';
    } else if (!/^\d{6}$/.test(formData.cu.trim())) {
      newErrors.cu = 'La CU debe tener 6 dígitos';
    }

    // Validar email ITAM
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!formData.email.includes('@itam.mx')) {
      newErrors.email = 'Debe ser un correo del ITAM (@itam.mx)';
    }

    // Validar teléfono
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }

    // Validar área
    if (!formData.area) {
      newErrors.area = 'Selecciona un área de interés';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const params = new URLSearchParams();
      params.append('nombre', formData.nombre);
      params.append('cu', formData.cu);
      params.append('email', formData.email);
      params.append('telefono', formData.telefono);
      params.append('area', formData.area);

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: params,
      });

      // Con mode:'no-cors' no podemos leer la respuesta, pero si no hay excepción el envío fue exitoso
      setIsSuccess(true);
      setFormData({
        nombre: '',
        cu: '',
        email: '',
        telefono: '',
        area: ''
      });
    } catch (error) {
      alert('Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Header>
            <h1>Únete al DataLab</h1>
            <p>
              ¿Quieres formar parte de nuestra comunidad? Completa el formulario
              y cuéntanos en qué área te gustaría contribuir.
            </p>
          </Header>

          <FormContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSuccess ? (
              <SuccessBanner
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h3>✅ ¡Solicitud enviada con éxito!</h3>
                <p>Gracias por tu interés en el DataLab. Te contactaremos en un plazo de 2-3 días hábiles.</p>
              </SuccessBanner>
            ) : (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="nombre">
                    Nombre completo <span className="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu nombre completo"
                  />
                  {errors.nombre && <ErrorMessage>{errors.nombre}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="cu">
                    CU (Clave Única) <span className="required">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="cu"
                    name="cu"
                    value={formData.cu}
                    onChange={handleInputChange}
                    placeholder="123456"
                    maxLength={6}
                  />
                  {errors.cu && <ErrorMessage>{errors.cu}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">
                    Correo del ITAM <span className="required">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu.nombre@itam.mx"
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="telefono">
                    Número de teléfono <span className="required">*</span>
                  </Label>
                  <Input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="5512345678"
                  />
                  {errors.telefono && <ErrorMessage>{errors.telefono}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="area">
                    Área de interés <span className="required">*</span>
                  </Label>
                  <Select
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                  >
                    {areas.map(area => (
                      <option key={area.value} value={area.value}>
                        {area.label}
                      </option>
                    ))}
                  </Select>
                  {errors.area && <ErrorMessage>{errors.area}</ErrorMessage>}
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </SubmitButton>
              </Form>
            )}
          </FormContainer>

          <InfoSection>
            <h3>¿Tienes preguntas?</h3>
            <p><strong>Email:</strong> itamdatalab@gmail.com</p>
            <p><strong>Teléfono:</strong> +52 477 263 2418</p>
            <p><strong>Instagram:</strong> @datalabitam</p>
            <p>Te responderemos en un plazo de 2-3 días hábiles.</p>
          </InfoSection>
        </motion.div>
      </Container>
    </ContactContainer>
  );
};

export default Contact;
