import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PlanCatalog } from './PlanCatalog.tsx';

// Precios y datos escritos de forma independiente al catálogo: si los datos
// cambian, el test obliga a revisar lo que se muestra en la página.
const planesEsperados = [
  {
    name: 'Esencial',
    price: /\$\s*7\.990/,
    dataGb: /20\s*GB/,
    benefitsLabel: 'Beneficios de Esencial',
  },
  {
    name: 'Plus',
    price: /\$\s*12\.990/,
    dataGb: /60\s*GB/,
    benefitsLabel: 'Beneficios de Plus',
  },
  {
    name: 'Max',
    price: /\$\s*18\.990/,
    dataGb: /100\s*GB/,
    benefitsLabel: 'Beneficios de Max',
  },
] as const;

describe('PlanCatalog', () => {
  it('muestra el encabezado principal del catálogo', () => {
    render(<PlanCatalog />);

    // El catálogo es la página completa en esta fase, así que su título
    // debe ser el único h1 y describir lo que se muestra.
    expect(screen.getByRole('heading', { level: 1, name: 'Planes móviles' })).toBeInTheDocument();
  });

  it('renderiza una tarjeta por plan dentro de la lista', () => {
    render(<PlanCatalog />);

    const lista = screen.getByRole('list', { name: 'Planes disponibles' });
    const titulos = within(lista).getAllByRole('heading', { level: 2 });

    // El orden del array debe conservarse para que el catálogo sea predecible.
    expect(titulos.map((titulo) => titulo.textContent)).toEqual(
      planesEsperados.map((plan) => plan.name)
    );
  });

  it('muestra el precio y los datos de cada plan', () => {
    render(<PlanCatalog />);

    for (const plan of planesEsperados) {
      expect(screen.getByText(plan.price)).toBeInTheDocument();
      expect(screen.getByText(plan.dataGb)).toBeInTheDocument();
    }
  });

  it('asocia una lista de beneficios a cada plan', () => {
    render(<PlanCatalog />);

    for (const plan of planesEsperados) {
      const lista = screen.getByRole('list', { name: plan.benefitsLabel });

      // El nombre accesible distingue la lista de beneficios de cada tarjeta.
      expect(within(lista).getAllByRole('listitem').length).toBeGreaterThan(0);
    }
  });

  it('ofrece un botón accesible para elegir cada plan', () => {
    render(<PlanCatalog />);

    for (const plan of planesEsperados) {
      expect(screen.getByRole('button', { name: `Elegir ${plan.name}` })).toHaveAttribute(
        'type',
        'button'
      );
    }
  });
});
