/**
 * Componente Button - Botón reutilizable
 * Diferentes variantes y tamaños
 */
import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Interfaces
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

// Variantes de estilo
const buttonVariants = {
  primary: css`
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    color: ${({ theme }) => theme.colors.textWhite};
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.primary});
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textWhite};
    border: 2px solid ${({ theme }) => theme.colors.secondary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.text};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
  `,
  
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.textWhite};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
  `,
  
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.backgroundAlt};
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
};

// Tamaños
const buttonSizes = {
  sm: css`
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    min-height: 36px;
  `,
  
  md: css`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes.base};
    min-height: 44px;
  `,
  
  lg: css`
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    min-height: 52px;
  `,
};

// Styled Component
const StyledButton = styled(motion.button)<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  position: relative;
  overflow: hidden;

  /* Aplicar variante */
  ${({ variant = 'primary' }) => buttonVariants[variant]}

  /* Aplicar tamaño */
  ${({ size = 'md' }) => buttonSizes[size]}

  /* Full width */
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}

  /* Estado disabled */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  /* Estado loading */
  ${({ loading }) => loading && css`
    pointer-events: none;
    opacity: 0.8;
  `}

  /* Focus styles */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const ButtonContent = styled.span<{ loading?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  opacity: ${({ loading }) => loading ? 0 : 1};
  transition: opacity 0.2s ease;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      loading={loading}
      onClick={onClick}
      type={type}
      className={className}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      <ButtonContent loading={loading}>
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </ButtonContent>
      {loading && <LoadingSpinner />}
    </StyledButton>
  );
};

export default Button;
