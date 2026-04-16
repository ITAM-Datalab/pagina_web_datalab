/**
 * Declaración de tipos para styled-components
 * Extiende DefaultTheme con nuestro tema personalizado
 */
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      success: string;
      warning: string;
      error: string;
      background: string;
      backgroundAlt: string;
      backgroundDark: string;
      text: string;
      textLight: string;
      textDark: string;
      textWhite: string;
      border: string;
      borderLight: string;
      borderDark: string;
    };
    fonts: {
      primary: string;
      heading: string;
      mono: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    fontWeights: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    borderRadius: {
      none: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      full: string;
    };
    shadows: {
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      inner: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    zIndex: {
      hide: number;
      auto: string;
      base: number;
      docked: number;
      dropdown: number;
      sticky: number;
      banner: number;
      overlay: number;
      modal: number;
      popover: number;
      skipLink: number;
      toast: number;
      tooltip: number;
    };
    transitions: {
      fast: string;
      base: string;
      slow: string;
      slower: string;
    };
  }
}
