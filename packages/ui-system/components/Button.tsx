import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-sans uppercase tracking-[0.1em] font-medium transition-all duration-400 ease-out rounded-[var(--radius-sharp)]";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-4 text-sm",
    lg: "px-10 py-5 text-base"
  };

  const variantStyles = {
    primary: "bg-[var(--color-brand)] text-[var(--color-slate-midnight)] hover:bg-[var(--color-champagne)] hover:shadow-[var(--shadow-glow-gold)] hover:scale-[1.02]",
    secondary: "bg-transparent border border-[var(--color-border-glass)] text-[var(--color-text-primary)] backdrop-blur-[var(--blur-ambient)] hover:border-[var(--color-border-gold)] hover:bg-white/5",
    ghost: "bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-brand)]"
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
