import React from 'react';
import { LayoutDashboard, Truck, ClipboardCheck, ArrowLeftRight } from 'lucide-react';

export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full flex flex-col bg-[var(--color-slate-midnight)] text-[var(--color-text-primary)] md:max-w-md md:mx-auto md:border-x md:border-[var(--color-border-glass)] selection:bg-[var(--color-brand)]/30 selection:text-[var(--color-champagne)]">
      {/* Mobile Safe Area Top Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border-glass)] bg-[var(--color-slate-obsidian)] sticky top-0 z-40">
        <span className="font-serif text-lg tracking-wider text-white">
          OM <span className="text-[var(--color-brand)]">STAFF</span>
        </span>
        <div className="w-8 h-8 rounded-[var(--radius-sharp)] border border-[var(--color-border-glass)] flex items-center justify-center bg-[var(--color-slate-midnight)]">
           <span className="text-[10px] text-[var(--color-text-muted)]">OP</span>
        </div>
      </header>

      {/* Main Scrollable View */}
      <main className="flex-1 overflow-y-auto p-4 pb-28">
        {children}
      </main>

      {/* Bottom Tab Navigation Bar (PWA implementation) */}
      <nav className="fixed bottom-0 w-full md:max-w-md bg-[var(--color-glass-surface)] backdrop-blur-[var(--blur-trust-shield)] border-t border-[var(--color-border-glass)] flex justify-around px-2 pb-6 pt-3 h-20 items-center z-50">
        <button className="flex flex-col items-center gap-1.5 text-[var(--color-brand)] w-16">
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          <span className="text-[9px] tracking-[0.15em] uppercase font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-[var(--color-text-muted)] hover:text-white transition-colors w-16">
          <Truck className="w-5 h-5 flex-shrink-0" />
          <span className="text-[9px] tracking-[0.15em] uppercase font-medium">Dispatch</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-[var(--color-text-muted)] hover:text-white transition-colors w-16">
          <ArrowLeftRight className="w-5 h-5 flex-shrink-0" />
          <span className="text-[9px] tracking-[0.15em] uppercase font-medium">Return</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-[var(--color-text-muted)] hover:text-white transition-colors w-16">
          <ClipboardCheck className="w-5 h-5 flex-shrink-0" />
          <span className="text-[9px] tracking-[0.15em] uppercase font-medium">Inspect</span>
        </button>
      </nav>
    </div>
  );
}
