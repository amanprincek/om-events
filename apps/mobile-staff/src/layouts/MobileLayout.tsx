import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Truck, ClipboardCheck, ArrowLeftRight, LogOut } from 'lucide-react';
import { useAuth } from '../../../../src/context/AuthContext';

export function MobileLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[var(--color-slate-midnight)] text-[var(--color-text-primary)] md:max-w-md md:mx-auto md:border-x md:border-[var(--color-border-glass)] selection:bg-[var(--color-brand)]/30 selection:text-[var(--color-champagne)]">
      {/* Mobile Safe Area Top Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border-glass)] bg-[var(--color-slate-obsidian)] sticky top-0 z-40">
        <span className="font-serif text-lg tracking-wider text-white">
          OM <span className="text-[var(--color-brand)]">STAFF</span>
        </span>
        <div className="flex items-center gap-2">
          {user && (
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-semibold text-white tracking-wide truncate max-w-[80px]">{user.name}</span>
              <span className="text-[8px] text-[var(--color-brand)] tracking-widest uppercase font-mono">{user.role}</span>
            </div>
          )}
          <div className="w-8 h-8 rounded-[var(--radius-sharp)] border border-[#C1AA7F]/30 flex items-center justify-center bg-[var(--color-slate-midnight)] text-[#C1AA7F] font-bold text-xs select-none">
             {user ? getInitials(user.name) : 'OP'}
          </div>
          <button 
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded hover:bg-white/5 text-stone-400 hover:text-rose-400 transition-colors"
          >
            <LogOut size={16} />
          </button>
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
