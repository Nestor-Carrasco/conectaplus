export type CardHeaderProps = {
  title: string;
  description?: string;
};

/**
 * Encabezado de una tarjeta con título y descripción opcional.
 *
 * @param props.title Título que identifica el contenido de la tarjeta.
 * @param props.description Texto secundario que amplía el título.
 */
export function CardHeader({ title, description }: CardHeaderProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {description ? <p className="text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}
