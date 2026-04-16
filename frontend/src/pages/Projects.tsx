/**
 * Página de Proyectos
 * Muestra todos los proyectos de DataLab
 */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProjectsContainer = styled.div`
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
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textLight};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const Projects: React.FC = () => {
  return (
    <ProjectsContainer>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Header>
            <h1>Nuestros Proyectos</h1>
            <p>
              Explora los proyectos que hemos desarrollado para abordar problemáticas 
              sociales, económicas y ambientales.
            </p>
          </Header>
          
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h2>Página en construcción</h2>
            <p>Estamos trabajando en esta sección. ¡Pronto podrás ver todos nuestros proyectos!</p>
          </div>
        </motion.div>
      </Container>
    </ProjectsContainer>
  );
};

export default Projects;
