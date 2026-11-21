import type { Plan } from '../../data/plans';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { CardHeader } from '../Card/CardHeader';

export type PlanCardProps = {
  plan: Plan;
};

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

/**
 * Tarjeta con el resumen de un plan móvil y la acción para elegirlo.
 *
 * @param props.plan Plan que se muestra en la tarjeta.
 */
export function PlanCard({ plan }: PlanCardProps) {
  return (
    <Card>
      <CardHeader title={plan.name} />

      <div className="mt-4 space-y-4">
        <p className="text-2xl font-bold text-slate-900">
          {priceFormatter.format(plan.priceMonthly)}{' '}
          <span className="text-sm font-normal text-slate-600">al mes</span>
        </p>

        <p className="text-sm text-slate-600">{plan.dataGb} GB de datos</p>

        <ul aria-label={`Beneficios de ${plan.name}`} className="space-y-2 text-sm text-slate-700">
          {plan.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>

        <Button type="button" className="w-full">
          Elegir {plan.name}
        </Button>
      </div>
    </Card>
  );
}
