import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card.tsx';
import { CardHeader } from './CardHeader.tsx';

describe('Card', () => {
  it('renderiza su contenido', () => {
    render(<Card>Contenido de la tarjeta</Card>);

    // Consultar por texto comprueba que Card no descarta ni envuelve el contenido
    // de forma que deje de ser visible.
    expect(screen.getByText('Contenido de la tarjeta')).toBeInTheDocument();
  });

  it('permite añadir una clase personalizada', () => {
    render(<Card className="mt-8">Contenido de la tarjeta</Card>);

    // Card es un contenedor sin rol accesible propio; la clase personalizada
    // demuestra que acepta ajustes del contexto que lo compone.
    expect(screen.getByText('Contenido de la tarjeta')).toHaveClass('mt-8');
  });

  it('compone el contenido de CardHeader', () => {
    render(
      <Card>
        <CardHeader title="Plan Plus" description="Datos y beneficios" />
      </Card>
    );

    expect(screen.getByRole('heading', { name: 'Plan Plus' })).toBeInTheDocument();
    expect(screen.getByText('Datos y beneficios')).toBeInTheDocument();
  });
});

describe('CardHeader', () => {
  it('muestra el título como encabezado', () => {
    render(<CardHeader title="Plan Esencial" />);

    // El encabezado transmite estructura a lectores de pantalla; el nombre
    // accesible debe ser exactamente el título recibido.
    expect(screen.getByRole('heading', { name: 'Plan Esencial' })).toBeInTheDocument();
  });

  it('usa un encabezado de nivel 2', () => {
    render(<CardHeader title="Plan Esencial" />);

    // El catálogo usará un h1 y cada plan colgará de él como h2. Este test
    // protege que CardHeader no introduzca un salto de nivel.
    expect(screen.getByRole('heading', { level: 2, name: 'Plan Esencial' })).toBeInTheDocument();
  });

  it('muestra la descripción cuando se proporciona', () => {
    render(<CardHeader title="Plan Esencial" description="La opción más económica" />);

    expect(screen.getByText('La opción más económica')).toBeInTheDocument();
  });
});
