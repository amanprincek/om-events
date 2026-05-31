import React from 'react';
import { GlassPanel } from './GlassPanel';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Card({ 
  children, 
  padding = 'md',
  className = '', 
  ...props 
}: CardProps) {
  
  const paddingStyles = {
    sm: 'p-6',
    md: 'p-10',
    lg: 'p-16'
  };

  return (
    <GlassPanel 
      intensity="macro" 
      className={`rounded-[var(--radius-sharp)] flex flex-col items-start text-left ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </GlassPanel>
  );
}
