import React from 'react';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'ambient' | 'macro' | 'shield';
  className?: string;
}

export function GlassPanel({ 
  children, 
  intensity = 'macro',
  className = '', 
  ...props 
}: GlassPanelProps) {
  
  const blurStyles = {
    ambient: 'backdrop-blur-[var(--blur-ambient)]',
    macro: 'backdrop-blur-[var(--blur-macro)]',
    shield: 'backdrop-blur-[var(--blur-trust-shield)]'
  };

  return (
    <div 
      className={`bg-[var(--color-glass-surface)] ${blurStyles[intensity]} border-glass-specular ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
