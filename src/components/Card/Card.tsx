import type { ReactNode } from 'react';

export type CardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Superficie compartida para agrupar contenido relacionado.
 *
 * @param props.children Contenido que se muestra dentro de la tarjeta.
 * @param props.className Clases adicionales para ajustar la tarjeta al contexto.
 */
export function Card({ children, className = '' }: CardProps) {
  const baseClasses = 'rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200';

  return <div className={`${baseClasses} ${className}`.trim()}>{children}</div>;
}
