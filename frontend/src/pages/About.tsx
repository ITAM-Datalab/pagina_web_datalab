/**
 * Página Sobre Nosotros
 * Información del equipo, misión, visión y valores del DataLab ITAM
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  min-height: 80vh;
`;

const Container = styled.div`
  max-width: 1200px;
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

const ContentSection = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
`;

const ContentParagraph = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: justify;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.7;
    text-align: left;
  }

  &:first-of-type {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  }
`;

const About: React.FC = () => {
  const paragraphs = [
    "En el Datalab somos una comunidad multidisciplinaria de estudiantes del ITAM que transforma la ciencia de datos en acción social. Aquí, la curiosidad se convierte en proyectos que impactan de verdad y la teoría se vuelve herramienta para crear soluciones tecnológicas con compromiso hacia México. Somos un laboratorio de innovación donde el análisis, la creatividad y el trabajo en equipo se encuentran para construir un futuro más justo e informado.",
    
    "Creemos que los datos pueden cambiar realidades. Por eso, trabajamos para democratizar su uso y poner la ciencia al servicio de la sociedad. Queremos transformar el aprendizaje en acción, el análisis en impacto y el código en propósito. Nuestra misión es fomentar una cultura basada en la evidencia, la colaboración y el bien común, donde cada proyecto sea una oportunidad para generar valor social.",
    
    "Aprendemos haciendo. En cada proyecto colaborativo, aplicamos herramientas modernas de ciencia de datos para resolver problemas reales y medibles. Nuestro enfoque combina el rigor técnico con el pensamiento crítico y la responsabilidad social. Cada integrante del Datalab desarrolla habilidades que van más allá del código: comunicación, ética y empatía para entender el impacto de lo que creamos.",
    
    "El Datalab es una red de estudiantes que comparten pasión por los datos y el cambio social. Somos un espacio abierto donde aprender, compartir y crecer es en equipo. Nos impulsa una cultura de mentoría: quienes ya recorrieron el camino acompañan a los que inician. Nuestra identidad dentro del ITAM une ciencia, creatividad y propósito social para construir una comunidad que aprende con la cabeza y actúa con el corazón."
  ];

  return (
    <AboutContainer>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Header>
            <h1>Sobre nosotros</h1>
            <p>
              Conoce más sobre nuestro equipo, nuestra misión y cómo trabajamos 
              para crear un impacto positivo a través de los datos.
            </p>
          </Header>
          
          <ContentSection>
            {paragraphs.map((paragraph, index) => (
              <ContentParagraph
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {paragraph}
              </ContentParagraph>
            ))}
          </ContentSection>
        </motion.div>
      </Container>
    </AboutContainer>
  );
};

export default About;
