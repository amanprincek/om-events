import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-slate-midnight)] text-[var(--color-text-primary)] selection:bg-[var(--color-brand)]/30 selection:text-[var(--color-champagne)]">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
