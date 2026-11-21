import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button.tsx';

// Agrupamos los casos del mismo componente para que el reporte de Vitest
// muestre con claridad qué comportamiento está comprobando cada prueba.
describe('Button', () => {
  it('renderiza su contenido como un botón accesible', () => {
    render(<Button>Elegir plan</Button>);

    // Consultar por rol y nombre verifica cómo encontraría el botón una persona
    // que usa tecnologías de asistencia, y evita depender de selectores internos.
    expect(screen.getByRole('button', { name: 'Elegir plan' })).toBeInTheDocument();
  });

  it('usa la variante primary por defecto', () => {
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
  ] as const)('aplica la variante %s', (variant, backgroundClass, textClass) => {
    render(<Button variant={variant}>Acción</Button>);

    expect(screen.getByRole('button', { name: 'Acción' })).toHaveClass(backgroundClass, textClass);
  });

  it('usa type="button" por defecto', () => {
    render(<Button>Elegir plan</Button>);

    expect(screen.getByRole('button', { name: 'Elegir plan' })).toHaveAttribute('type', 'button');
  });

  it('respeta type="submit" cuando se indica', () => {
    render(<Button type="submit">Enviar</Button>);

    // El default protege a los formularios de un envío accidental; este caso
    // comprueba que la salida explícita sigue disponible.
    expect(screen.getByRole('button', { name: 'Enviar' })).toHaveAttribute('type', 'submit');
  });

  it('reenvía props nativas y una clase personalizada', () => {
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

  it('ejecuta onClick al hacer clic', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Elegir plan</Button>);

    await user.click(screen.getByRole('button', { name: 'Elegir plan' }));

    // El botón existe para accionar algo: este test protege el reenvío del evento.
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('no ejecuta onClick si está deshabilitado', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        No disponible
      </Button>
    );

    await user.click(screen.getByRole('button', { name: 'No disponible' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('se activa con Enter desde el teclado', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Elegir plan</Button>);

    await user.tab();
    expect(screen.getByRole('button', { name: 'Elegir plan' })).toHaveFocus();

    await user.keyboard('{Enter}');

    // Si el elemento dejara de ser un <button>, el rol podría seguir pasando;
    // la activación por teclado detecta esa regresión de semántica nativa.
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('muestra un contorno de foco visible', () => {
    render(<Button>Foco</Button>);

    expect(screen.getByRole('button', { name: 'Foco' })).toHaveClass(
      'focus-visible:outline-2',
      'focus-visible:outline-offset-2',
      'focus-visible:outline-blue-700'
    );
  });
});
