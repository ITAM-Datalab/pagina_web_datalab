/**
 * Componente Logo - Logo de DataLab basado en el diseño proporcionado
 * Cubo 3D con colores teal y naranja
 */
import React from 'react';
import styled from 'styled-components';

interface LogoProps {
  size?: number;
  showText?: boolean;
}

const LogoContainer = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LogoSVG = styled.svg<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const LogoText = styled.div`
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    line-height: 1;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.textLight};
    margin: 0;
    line-height: 1;
  }
`;

const Logo: React.FC<LogoProps> = ({ size = 40, showText = true }) => {
  return (
    <LogoContainer size={size}>
      <LogoSVG 
        size={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexágono exterior con gradiente teal-naranja */}
        <path
          d="M25 15 L75 15 L90 50 L75 85 L25 85 L10 50 Z"
          stroke="url(#hexGradient)"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Cubo interior */}
        <g stroke="#666" strokeWidth="2.5" fill="none">
          {/* Cara frontal del cubo */}
          <path d="M35 35 L65 35 L65 65 L35 65 Z" />
          
          {/* Cara superior del cubo */}
          <path d="M35 35 L45 25 L75 25 L65 35" />
          
          {/* Cara lateral del cubo */}
          <path d="M65 35 L75 25 L75 55 L65 65" />
          
          {/* Líneas internas del cubo */}
          <path d="M45 25 L45 55 L35 65" />
          <path d="M45 55 L75 55" />
        </g>

        {/* Definición del gradiente */}
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d7d7d" />
            <stop offset="100%" stopColor="#f39c12" />
          </linearGradient>
        </defs>
      </LogoSVG>
      
      {showText && (
        <LogoText>
          <h2>DataLab</h2>
          <p>ITAM</p>
        </LogoText>
      )}
    </LogoContainer>
  );
};

export default Logo;
