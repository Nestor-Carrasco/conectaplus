import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button.tsx';

// Agrupamos los casos del mismo componente para que el reporte de Vitest
// muestre con claridad qué comportamiento está comprobando cada prueba.
describe('Button', () => {
  it('renders its content as an accessible button', () => {
    render(<Button>Elegir plan</Button>);

    // Consultar por rol y nombre verifica cómo encontraría el botón una persona
    // que usa tecnologías de asistencia, y evita depender de selectores internos.
    expect(screen.getByRole('button', { name: 'Elegir plan' })).toBeInTheDocument();
  });

  it('uses the primary variant by default', () => {
    render(<Button>Elegir plan</Button>);

    expect(screen.getByRole('button', { name: 'Elegir plan' })).toHaveClass(
      'bg-blue-600',
      'text-white'
    );
  });

  // `it.each` ejecuta el mismo comportamiento con varios datos de entrada.
  // `as const` conserva los valores como literales para que coincidan con ButtonVariant.
  it.each([
    ['primary', 'bg-blue-600', 'text-white'],
    ['secondary', 'bg-gray-600', 'text-white'],
    ['danger', 'bg-red-600', 'text-white'],
  ] as const)('applies the %s variant classes', (variant, backgroundClass, textClass) => {
    render(<Button variant={variant}>Acción</Button>);

    expect(screen.getByRole('button', { name: 'Acción' })).toHaveClass(backgroundClass, textClass);
  });

  it('uses type="button" by default', () => {
    render(<Button>Elegir plan</Button>);

    expect(screen.getByRole('button', { name: 'Elegir plan' })).toHaveAttribute('type', 'button');
  });

  it('forwards native button props and a custom class', () => {
    render(
      <Button disabled className="w-full">
        No disponible
      </Button>
    );

    // Estas aserciones comprueban que el componente conserva atributos HTML
    // recibidos por props y permite añadir una clase del contexto que lo usa.
    expect(screen.getByRole('button', { name: 'No disponible' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'No disponible' })).toHaveClass('w-full');
  });
});
