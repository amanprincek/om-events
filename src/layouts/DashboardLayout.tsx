import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Boxes, ArrowLeftRight, Users, Bell, Truck, Wrench, Undo2 } from 'lucide-react';

const NAV_ITEMS = [
  { group: 'Operations', items: [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarDays },
    { name: 'Inventory', path: '/admin/inventory', icon: Boxes },
  ]},
  { group: 'Logistics', items: [
    { name: 'Dispatch', path: '/admin/dispatch', icon: Truck },
    { name: 'Returns', path: '/admin/returns', icon: Undo2 },
    { name: 'Maintenance', path: '/admin/maintenance', icon: Wrench },
  ]},
  { group: 'Management', items: [
    { name: 'Staff', path: '/admin/staff', icon: Users },
  ]}
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-[var(--color-slate-midnight)] text-[var(--color-text-primary)] selection:bg-[var(--color-brand)]/30 selection:text-[var(--color-champagne)]">
      {/* Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[var(--color-border-glass)] bg-[var(--color-slate-obsidian)]">
        <div className="h-20 flex items-center px-6 border-b border-[var(--color-border-glass)]">
          <span className="font-serif text-xl tracking-wider text-white">
            OM TENT <span className="text-[var(--color-brand)]">ADMIN</span>
          </span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
          {NAV_ITEMS.map((group) => (
            <div key={group.group}>
              <div className="text-overline text-[var(--color-text-muted)] px-4 mb-4">{group.group}</div>
              <div className="space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-3 rounded-[var(--radius-sharp)] transition-colors ${
                          isActive || (item.path === '/admin/dashboard' && location.pathname === '/admin')
                            ? 'bg-white/5 text-[var(--color-brand)]' 
                            : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-sans uppercase tracking-widest text-xs font-medium">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--color-border-glass)]">
           <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-[var(--radius-sharp)] bg-[var(--color-brand)] flex items-center justify-center text-[var(--color-slate-midnight)] font-bold text-xs">PK</div>
              <div className="flex flex-col">
                 <span className="text-xs font-medium text-white tracking-wider">Pawan K.</span>
                 <span className="text-[10px] text-[var(--color-brand)] tracking-widest uppercase">Owner</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col">
        <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--color-border-glass)] bg-[var(--color-slate-midnight)]/80 backdrop-blur-[var(--blur-macro)] sticky top-0 z-40">
          <h1 className="text-overline text-[var(--color-text-muted)]">Console Overview</h1>
          <div className="flex items-center gap-6">
            <button className="relative text-[var(--color-text-muted)] hover:text-white transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--color-brand)] border border-[var(--color-slate-midnight)]"></span>
            </button>
          </div>
        </header>
        
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
}
