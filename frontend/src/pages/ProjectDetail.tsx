/**
 * Página de Detalle de Proyecto
 * Información detallada de un proyecto específico
 */
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProjectDetailContainer = styled.div`
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

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <ProjectDetailContainer>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Detalle del Proyecto</h1>
          <p>ID del proyecto: {id}</p>
          
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h2>Página en construcción</h2>
            <p>Estamos trabajando en esta sección.</p>
          </div>
        </motion.div>
      </Container>
    </ProjectDetailContainer>
  );
};

export default ProjectDetail;
