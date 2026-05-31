import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '', ...props }: BadgeProps) {
  return (
    <span 
      className={`inline-flex items-center px-4 py-1.5 rounded-[var(--radius-pill)] bg-[var(--color-slate-obsidian)] border border-[rgba(212,175,55,0.15)] text-xs font-sans uppercase tracking-widest text-[var(--color-text-primary)] ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
