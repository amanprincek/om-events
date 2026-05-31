import React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ 
  level = 2, 
  children, 
  className = '', 
  ...props 
}: HeadingProps) {
  const baseStyles = 'font-serif text-[var(--color-text-primary)] tracking-tight';
  
  const levels = {
    1: `text-5xl md:text-7xl lg:text-[80px] leading-[1.1] ${baseStyles}`,
    2: `text-4xl md:text-5xl lg:text-6xl leading-[1.2] ${baseStyles}`,
    3: `text-3xl md:text-4xl leading-[1.3] ${baseStyles}`,
    4: `text-2xl md:text-3xl leading-[1.4] ${baseStyles}`,
    5: `text-xl md:text-2xl leading-[1.4] ${baseStyles}`,
    6: `text-lg md:text-xl font-sans uppercase tracking-[0.2em] text-[var(--color-brand)]`
  };

  const Component = `h${level}` as any;

  return (
    <Component className={`${levels[level]} ${className}`} {...props}>
      {children}
    </Component>
  );
}
