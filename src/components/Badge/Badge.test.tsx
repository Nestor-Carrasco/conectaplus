import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge.tsx';

describe('Badge', () => {
  it('renderiza el texto y la variante por defecto', () => {
    render(<Badge>Nuevo</Badge>);
    expect(screen.getByText('Nuevo')).toHaveClass('bg-gray-100 text-gray-800');
  });

  it('aplica variante primary', () => {
    render(<Badge variant="primary">Primario</Badge>);
    expect(screen.getByText('Primario')).toHaveClass('bg-blue-600 text-white');
  });

  it('aplica variante danger', () => {
    render(<Badge variant="danger">Peligro</Badge>);
    expect(screen.getByText('Peligro')).toHaveClass('bg-red-600 text-white');
  });

  it('aplica variante success', () => {
    render(<Badge variant="success">Éxito</Badge>);
    expect(screen.getByText('Éxito')).toHaveClass('bg-green-700 text-white');
  });

  it('aplica variante secondary', () => {
    render(<Badge variant="secondary">Secundario</Badge>);
    expect(screen.getByText('Secundario')).toHaveClass('bg-gray-600 text-white');
  });

  it('aplica tamaño sm', () => {
    render(<Badge size="sm">Pequeño</Badge>);
    expect(screen.getByText('Pequeño')).toHaveClass('px-2 py-0.5 text-xs');
  });

  it('aplica tamaño md (default)', () => {
    render(<Badge size="md">Mediano</Badge>);
    expect(screen.getByText('Mediano')).toHaveClass('px-2.5 py-1 text-sm');
  });

  it('aplica tamaño lg', () => {
    render(<Badge size="lg">Grande</Badge>);
    expect(screen.getByText('Grande')).toHaveClass('px-3 py-1.5 text-base');
  });

  it('combina variante y tamaño', () => {
    render(
      <Badge variant="primary" size="lg">
        Grande Primario
      </Badge>
    );
    const badge = screen.getByText('Grande Primario');
    expect(badge).toHaveClass('bg-blue-600');
    expect(badge).toHaveClass('px-3 py-1.5 text-base');
  });

  it('permite className personalizado', () => {
    render(<Badge className="underline">Subrayado</Badge>);
    expect(screen.getByText('Subrayado')).toHaveClass('underline');
  });
});
