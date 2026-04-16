/**
 * Tests para ErrorBoundary component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import theme from '../../styles/theme';

// Componente que lanza error para testing
const ThrowError = () => {
  throw new Error('Test error');
};

// Componente normal para testing
const NormalComponent = () => <div>Normal Content</div>;

describe('ErrorBoundary', () => {
  // Silenciar console.error para los tests
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('debe renderizar children cuando no hay error', () => {
    render(
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <NormalComponent />
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByText('Normal Content')).toBeInTheDocument();
  });

  it('debe mostrar UI de error cuando hay un error', () => {
    render(
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByText('Algo salió mal')).toBeInTheDocument();
    expect(screen.getByText(/Lo sentimos, ha ocurrido un error/)).toBeInTheDocument();
  });

  it('debe renderizar fallback custom si se proporciona', () => {
    const customFallback = <div>Custom Error UI</div>;

    render(
      <ThemeProvider theme={theme}>
        <ErrorBoundary fallback={customFallback}>
          <ThrowError />
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
  });

  it('debe llamar onError callback cuando hay error', () => {
    const onErrorMock = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <ErrorBoundary onError={onErrorMock}>
          <ThrowError />
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(onErrorMock).toHaveBeenCalled();
  });
});

