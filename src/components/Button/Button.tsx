import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

// Una unión de literales limita `variant` a las opciones que el componente sabe representar.
// TypeScript mostrará un error si alguien intenta usar, por ejemplo, variant="success".
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

// Heredamos los atributos nativos del botón HTML (disabled, onClick, aria-label, etc.)
// y añadimos nuestra propia prop visual: `variant`.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

// `Record` obliga a definir estilos para cada variante declarada en ButtonVariant.
// Si agregamos una variante al tipo y olvidamos sus clases aquí, TypeScript lo detectará.
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      // Un botón dentro de un formulario enviaría el formulario por defecto.
      // Usar "button" evita ese efecto inesperado; el consumidor puede pasar "submit" cuando lo necesite.
      type={type}
      className={clsx(
        // Estas clases son compartidas; `variantStyles` agrega el color y `className`
        // permite que quien usa el componente añada estilos puntuales.
        'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
