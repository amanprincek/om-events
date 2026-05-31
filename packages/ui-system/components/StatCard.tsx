import React from 'react';
import { GlassPanel } from './GlassPanel';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  icon?: React.ReactNode;
  trend?: { value: string; isPositive: boolean };
}

export function StatCard({ value, label, icon, trend, className = '', ...props }: StatCardProps) {
  return (
    <GlassPanel 
      intensity="macro" 
      className={`relative flex flex-col items-center justify-center p-6 sm:p-8 text-center shadow-[var(--shadow-trust-anchor)] ${className}`}
      {...props}
    >
      {icon && (
        <div className="absolute top-4 left-4 text-[var(--color-text-muted)]">
          {icon}
        </div>
      )}
      <div className="font-trust-number text-4xl sm:text-5xl text-[var(--color-brand)] mb-2 tracking-tight">
        {value}
      </div>
      <div className="text-overline text-[var(--color-text-primary)]">
        {label}
      </div>
      {trend && (
        <div className={`mt-2 text-xs ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend.value}
        </div>
      )}
    </GlassPanel>
  );
}
