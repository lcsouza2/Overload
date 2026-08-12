import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

/**
 * Componente genérico de Card container.
 */
export function Card({
  children,
  hoverable = false,
  className = '',
  ...props
}: CardProps) {
  const baseStyles =
    'bg-card border border-card-border rounded-2xl p-5 shadow-sm transition-all duration-200';
  const hoverStyles = hoverable
    ? 'hover:border-primary/50 hover:shadow-md cursor-pointer active:scale-[0.99]'
    : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
