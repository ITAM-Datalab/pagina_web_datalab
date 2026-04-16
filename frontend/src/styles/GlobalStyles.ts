/**
 * Estilos globales de la aplicación
 * Define reset CSS y estilos base
 */
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Configuración base del HTML */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    overflow-x: hidden;
  }

  /* Tipografías */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textDark};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  /* Párrafos y texto */
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.7;
  }

  /* Enlaces */
  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.accent};
      outline-offset: 2px;
    }
  }

  /* Listas */
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.lg};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  /* Imágenes */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Botones */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    transition: ${({ theme }) => theme.transitions.fast};

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.accent};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Inputs */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    transition: ${({ theme }) => theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent};
      box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textLight};
    }
  }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderDark};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textLight};
  }

  /* Utilidades */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 ${({ theme }) => theme.spacing.lg};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 0 ${({ theme }) => theme.spacing.xl};
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Animaciones de entrada */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.6s ease-out;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.6s ease-out;
  }
`;

export default GlobalStyles;
