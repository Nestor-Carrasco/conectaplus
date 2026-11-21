import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Plan } from '../../data/plans.ts';
import { PlanCard } from './PlanCard.tsx';

// Datos propios del test: si mañana cambia el catálogo real, estas pruebas
// siguen describiendo el contrato de PlanCard sin depender de esos valores.
const planEsencial: Plan = {
  id: 'esencial',
  name: 'Esencial',
  priceMonthly: 7990,
  dataGb: 20,
  benefits: ['Llamadas ilimitadas', 'WhatsApp incluido'],
};

const planMax: Plan = {
  id: 'max',
  name: 'Max',
  priceMonthly: 18990,
  dataGb: 100,
  benefits: ['Llamadas ilimitadas', 'Roaming en Sudamérica'],
};

describe('PlanCard', () => {
  it('muestra el nombre del plan como encabezado de nivel 2', () => {
    render(<PlanCard plan={planEsencial} />);

    // El catálogo tendrá un h1; cada plan debe colgar de él como h2.
    expect(screen.getByRole('heading', { level: 2, name: 'Esencial' })).toBeInTheDocument();
  });

  it('muestra el precio mensual formateado en pesos chilenos', () => {
    render(<PlanCard plan={planEsencial} />);

    // La expresión exige símbolo y separador de miles, pero tolera un espacio
    // variable entre ambos según la versión de ICU que formatee la moneda.
    const precio = screen.getByText(/\$\s*7\.990/);
    expect(precio).toHaveTextContent(/mes/);
  });

  it('muestra los gigabytes incluidos', () => {
    render(<PlanCard plan={planEsencial} />);

    expect(screen.getByText(/20\s*GB/)).toBeInTheDocument();
  });

  it('renderiza los beneficios en una lista accesible', () => {
    render(<PlanCard plan={planEsencial} />);

    // El nombre accesible distingue esta lista de otras tarjetas cuando el
    // catálogo renderice varios planes.
    const lista = screen.getByRole('list', { name: 'Beneficios de Esencial' });
    const beneficios = within(lista).getAllByRole('listitem');

    expect(beneficios).toHaveLength(2);
    expect(within(lista).getByText('Llamadas ilimitadas')).toBeInTheDocument();
    expect(within(lista).getByText('WhatsApp incluido')).toBeInTheDocument();
  });

  it('ofrece un botón para elegir el plan con type="button"', () => {
    render(<PlanCard plan={planEsencial} />);

    // El nombre incluye el plan para que cada botón sea único en el catálogo.
    expect(screen.getByRole('button', { name: 'Elegir Esencial' })).toHaveAttribute(
      'type',
      'button'
    );
  });

  it('usa el plan recibido por props y no datos fijos', () => {
    render(<PlanCard plan={planMax} />);

    // Un segundo plan detecta implementaciones que hardcodeen el primero.
    expect(screen.getByRole('heading', { level: 2, name: 'Max' })).toBeInTheDocument();
    expect(screen.getByText(/\$\s*18\.990/)).toBeInTheDocument();
    expect(screen.getByText(/100\s*GB/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Elegir Max' })).toBeInTheDocument();
  });
});
