import { clsx } from 'clsx';
const variantStyles = {
  default: 'bg-gray-100 text-gray-800',
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-600 text-white',
  danger: 'bg-red-600 text-white',
  success: 'bg-green-600 text-white',
};
const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};
export function Badge({ children, variant = 'default', size = 'md', className }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
