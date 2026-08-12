import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Componente genérico de Input com suporte a ícones.
 */
export function Input({
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="relative flex items-center w-full">
      {leftIcon && (
        <div className="absolute left-3.5 text-text-secondary pointer-events-none flex items-center justify-center">
          {leftIcon}
        </div>
      )}
      <input
        className={`w-full bg-background border border-border rounded-xl text-text placeholder:text-text-secondary/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all py-2.5 ${
          leftIcon ? 'pl-10' : 'pl-3.5'
        } ${rightIcon ? 'pr-10' : 'pr-3.5'} ${className}`}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3.5 text-text-secondary flex items-center justify-center">
          {rightIcon}
        </div>
      )}
    </div>
  );
}
