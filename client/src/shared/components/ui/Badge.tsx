import React from 'react';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'outline'
  | 'ghost';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  active?: boolean;
  clickable?: boolean;
}

/**
 * Componente genérico de Badge / Pill / Chip.
 * Suporta múltiplas variantes de cor alinhadas às variáveis do useTheme.ts
 */
export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  active = false,
  clickable = false,
  className = '',
  onClick,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all select-none';

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
  };

  const variantStyles: Record<BadgeVariant, string> = {
    primary: active
      ? 'bg-primary text-button-text shadow-sm'
      : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20',
    secondary: active
      ? 'bg-secondary text-button-text shadow-sm'
      : 'bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20',
    success: active
      ? 'bg-success text-button-text shadow-sm'
      : 'bg-success/10 text-success border border-success/20 hover:bg-success/20',
    warning: active
      ? 'bg-warning text-button-text shadow-sm'
      : 'bg-warning/10 text-warning border border-warning/20 hover:bg-warning/20',
    error: active
      ? 'bg-error text-button-text shadow-sm'
      : 'bg-error/10 text-error border border-error/20 hover:bg-error/20',
    outline: active
      ? 'bg-primary text-button-text border border-primary'
      : 'bg-background text-text-secondary border border-border hover:border-primary/50 hover:text-text',
    ghost: active
      ? 'bg-card text-text font-bold'
      : 'bg-transparent text-text-secondary hover:text-text hover:bg-card/50',
  };

  const cursorStyle = clickable || onClick ? 'cursor-pointer active:scale-95' : '';

  return (
    <span
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${cursorStyle} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
