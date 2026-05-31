import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input 
      className={`w-full bg-transparent border-0 border-b border-[var(--color-border-glass)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] py-3 px-0 focus:ring-0 focus:outline-none focus:border-[var(--color-brand)] transition-colors duration-400 ${className}`}
      {...props}
    />
  );
}
