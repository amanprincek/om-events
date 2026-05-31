import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GlassPanel, Heading, Button } from '@om-tent/ui-system';
import { Lock, Mail, Award, KeyRound, Sparkles, AlertTriangle } from 'lucide-react';

export default function LoginPage() {
  const { login, error, clearError, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Pick up original target route
  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email.trim() || !password.trim()) {
      setLocalError('Please complete all identification fields.');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        // Successful login, navigate to appropriate portal depending on role
        if (email.toLowerCase().includes('staff')) {
          navigate('/staff', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      setLocalError('An unexpected server failure occurred. Please re-try.');
    }
  };

  // Helper for quick testing session credentials
  const handleQuickLogin = (emailPreset: string) => {
    setEmail(emailPreset);
    setPassword('admin123');
    setLocalError(null);
    clearError();
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[var(--color-slate-midnight)] px-4 py-12 overflow-hidden select-none">
      {/* Premium ambient backing blur shapes representing tent house elegance */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#C1AA7F]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="relative w-full max-w-md z-10 space-y-8">
        
        {/* Branding & Logo Display */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full border border-[#C1AA7F]/30 bg-black/45 backdrop-blur-md flex items-center justify-center text-[#C1AA7F]">
            <Award size={22} className="animate-pulse" />
          </div>
          <div className="space-y-1">
            <h1 className="font-serif text-3xl tracking-widest text-white">
              OM TENT HOUSE
            </h1>
            <p className="text-[10px] tracking-[0.25em] text-[#C1AA7F] uppercase font-semibold">
              & CATERERS • PRESTIGE CONSOLE
            </p>
          </div>
        </div>

        {/* Central form component */}
        <GlassPanel intensity="shield" className="p-8 border border-white/10 shadow-2xl relative">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C1AA7F]/45 to-transparent" />

          <Heading level={4} className="text-center font-serif text-white mb-6 tracking-wide">
            Administrative Access
          </Heading>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field Panel */}
            <div className="space-y-2">
              <label className="text-[10px] tracking-wider text-[var(--color-text-muted)] uppercase block font-semibold">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C1AA7F]/60" size={16} />
                <input
                  type="email"
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@omtent.com"
                  className="w-full bg-black/30 border border-white/15 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C1AA7F] transition-all"
                />
              </div>
            </div>

            {/* Password Field Panel */}
            <div className="space-y-2">
              <label className="text-[10px] tracking-wider text-[var(--color-text-muted)] uppercase block font-semibold">
                Access Key Code
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C1AA7F]/60" size={16} />
                <input
                  type="password"
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/30 border border-white/15 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#C1AA7F] transition-all"
                />
              </div>
            </div>

            {/* Interactive Error Display */}
            {(localError || error) && (
              <div className="p-3.5 rounded border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs flex items-start gap-2 animate-in fade-in zoom-in-95 duration-200">
                <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                <p>{localError || error}</p>
              </div>
            )}

            {/* Action Trigger Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full py-3.5 text-xs font-semibold uppercase tracking-widest text-center justify-center flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-t border-r border-[#C1AA7F] animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <KeyRound size={14} /> Unlock Console
                </>
              )}
            </Button>
          </form>

          {/* Quick-Preset Sandbox Credentials Indicator */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3.5">
            <div className="flex items-center gap-2 justify-center text-[10px] tracking-wider text-[#C1AA7F] uppercase font-bold">
              <Sparkles size={11} className="animate-spin" style={{ animationDuration: '6s' }} /> Fast Testing Presets
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <button
                type="button"
                onClick={() => handleQuickLogin('owner@omtent.com')}
                className="p-2 py-2.5 rounded border border-white/5 bg-white/2 hover:bg-[#C1AA7F]/10 hover:border-[#C1AA7F]/30 text-stone-300 text-center transition-all"
              >
                Owner Account
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('manager@omtent.com')}
                className="p-2 py-2.5 rounded border border-white/5 bg-white/2 hover:bg-[#C1AA7F]/10 hover:border-[#C1AA7F]/30 text-stone-300 text-center transition-all"
              >
                Manager Account
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('staff@omtent.com')}
                className="p-2 py-2.5 rounded border border-white/5 bg-white/2 hover:bg-[#C1AA7F]/10 hover:border-[#C1AA7F]/30 text-stone-300 text-center transition-all"
              >
                Staff Account
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('viewer@omtent.com')}
                className="p-2 py-2.5 rounded border border-white/5 bg-white/2 hover:bg-[#C1AA7F]/10 hover:border-[#C1AA7F]/30 text-stone-300 text-center transition-all"
              >
                Viewer Account
              </button>
            </div>
            <p className="text-[9px] text-center text-stone-500 italic mt-1 font-mono">Default code: admin123</p>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
