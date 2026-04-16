/**
 * Elementos geométricos dinámicos para el fondo
 * Inspirado en diseños modernos con formas animadas
 */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const GeometricContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled.div<{ 
  size: number; 
  top: string; 
  left: string; 
  delay: number;
  color: string;
}>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  background: ${({ color }) => color};
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
  opacity: 0.4;
`;

const GeometricShape = styled.div<{
  size: number;
  top: string;
  right: string;
  rotation: number;
  color: string;
}>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  background: linear-gradient(45deg, ${({ color }) => color}40, transparent);
  transform: rotate(${({ rotation }) => rotation}deg);
  animation: ${rotate} 20s linear infinite;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
`;

const PulsingDot = styled.div<{
  size: number;
  bottom: string;
  left: string;
  delay: number;
  color: string;
}>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  background: ${({ color }) => color};
  border-radius: 50%;
  animation: ${pulse} 3s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(45, 125, 125, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(45, 125, 125, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: ${pulse} 8s ease-in-out infinite;
`;

const LargeX = styled.div<{
  top: string;
  right: string;
  size: number;
}>`
  position: absolute;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  opacity: 0.1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #2d7d7d, #f39c12);
    top: 50%;
    left: 0;
  }
  
  &::before {
    transform: translateY(-50%) rotate(45deg);
  }
  
  &::after {
    transform: translateY(-50%) rotate(-45deg);
  }
  
  animation: ${rotate} 15s linear infinite;
`;

const GeometricElements: React.FC = () => {
  return (
    <GeometricContainer>
      <GridLines />
      
      {/* Círculos flotantes */}
      <FloatingElement 
        size={8} 
        top="20%" 
        left="10%" 
        delay={0}
        color="#2d7d7d"
      />
      <FloatingElement 
        size={12} 
        top="60%" 
        left="80%" 
        delay={1}
        color="#f39c12"
      />
      <FloatingElement 
        size={6} 
        top="40%" 
        left="70%" 
        delay={2}
        color="#34a0a4"
      />
      
      {/* Formas geométricas */}
      <GeometricShape
        size={100}
        top="15%"
        right="10%"
        rotation={45}
        color="#2d7d7d"
      />
      
      <GeometricShape
        size={60}
        top="70%"
        right="20%"
        rotation={0}
        color="#f39c12"
      />
      
      {/* Puntos pulsantes */}
      <PulsingDot
        size={4}
        bottom="30%"
        left="15%"
        delay={0}
        color="#2d7d7d"
      />
      <PulsingDot
        size={6}
        bottom="60%"
        left="85%"
        delay={1.5}
        color="#f39c12"
      />
      
      {/* X grande como en el ejemplo */}
      <LargeX
        top="25%"
        right="15%"
        size={150}
      />
    </GeometricContainer>
  );
};

export default GeometricElements;
