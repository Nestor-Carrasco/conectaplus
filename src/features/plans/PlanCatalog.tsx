import { PlanCard } from '../../components/PlanCard/PlanCard';
import { plans } from '../../data/plans';

/**
 * Catálogo estático con todos los planes disponibles.
 *
 * Los datos se importan de `src/data/plans.ts`; la tarjeta de cada plan
 * se encarga de su presentación y de la acción de elegirlo.
 */
export function PlanCatalog() {
  return (
    <section
      aria-labelledby="catalog-title"
      className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            ConectaPlus
          </p>
          <h1 id="catalog-title" className="mt-2 text-4xl font-bold">
            Planes móviles
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Elige el plan que mejor se adapte a tu forma de usar el teléfono.
          </p>
        </header>

        <ul aria-label="Planes disponibles" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.id}>
              <PlanCard plan={plan} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
