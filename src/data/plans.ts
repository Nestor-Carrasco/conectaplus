export type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
  dataGb: number;
  benefits: string[];
};

export const plans: Plan[] = [
  {
    id: 'esencial',
    name: 'Esencial',
    priceMonthly: 7990,
    dataGb: 20,
    benefits: ['Llamadas ilimitadas', 'WhatsApp incluido'],
  },
  {
    id: 'plus',
    name: 'Plus',
    priceMonthly: 12990,
    dataGb: 60,
    benefits: ['Llamadas ilimitadas', 'Redes sociales incluidas'],
  },
  {
    id: 'max',
    name: 'Max',
    priceMonthly: 18990,
    dataGb: 100,
    benefits: ['Llamadas ilimitadas', 'Roaming en Sudamérica'],
  },
];
