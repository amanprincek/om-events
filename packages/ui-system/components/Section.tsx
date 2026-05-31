import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: 'default' | 'none';
  className?: string;
  id?: string;
}

export function Section({ 
  children, 
  spacing = 'default',
  className = '', 
  ...props 
}: SectionProps) {
  const spacingStyles = spacing === 'default' ? 'py-20 md:py-32 lg:py-40' : '';

  return (
    <section className={`relative ${spacingStyles} ${className}`} {...props}>
      {children}
    </section>
  );
}
