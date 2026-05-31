import React from 'react';
import { Container, Heading, StatCard, GlassPanel, Badge } from '@om-tent/ui-system';
import { Package, Wrench, Calendar, CheckSquare, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { useInventory, useBookings, useEvents, useReturns } from '@om-tent/data-access';
import { BookingStatus, ReturnStatus } from '@om-tent/core-types';

export default function AdminDashboard() {
  const { data: inventory = [], isLoading: loadingInventory } = useInventory();
  const { data: bookings = [], isLoading: loadingBookings } = useBookings();
  const { data: events = [], isLoading: loadingEvents } = useEvents();
  const { data: returns = [], isLoading: loadingReturns } = useReturns();

  const loading = loadingInventory || loadingBookings || loadingEvents || loadingReturns;

  // KPIs
  const totalInventory = inventory.reduce((sum, item) => sum + item.totalOwned, 0);
  const totalDamaged = inventory.reduce((sum, item) => sum + item.damagedQuantity, 0);
  const availableInventory = totalInventory - totalDamaged;
  
  const activeBookings = bookings.filter(b => 
    b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.ADVANCE_PAID
  ).length;

  const upcomingEvents = events.filter(e => new Date(e.eventDate) >= new Date()).slice(0, 5);
  
  const pendingReturns = returns.filter(r => r.status === ReturnStatus.PENDING).length;

  const recentBookings = [...bookings].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const alerts = [];
  if (totalDamaged > 10) {
    alerts.push(`High maintenance backlog: ${totalDamaged} items require repair.`);
  }
  if (pendingReturns > 5) {
    alerts.push(`${pendingReturns} dispatches pending returns inspection.`);
  }
  const lowStockItems = inventory.filter(i => (i.totalOwned - i.damagedQuantity) < 5);
  if (lowStockItems.length > 0) {
    alerts.push(`${lowStockItems.length} inventory items are running critically low.`);
  }

  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-[var(--color-brand)] animate-spin"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 space-y-8 lg:p-10">
      <header className="mb-10">
        <Heading level={2} className="mb-2">Operational Snapshot</Heading>
        <p className="text-[var(--color-text-muted)] tracking-wide">Real-time overview of Om Tent House operations.</p>
      </header>

      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Inventory"
          value={totalInventory.toLocaleString()}
          icon={<Package className="text-[var(--color-brand)]" size={20} />}
          trend={{ value: `${availableInventory} Available`, isPositive: true }}
        />
        <StatCard
          label="In Maintenance"
          value={totalDamaged.toLocaleString()}
          icon={<Wrench className="text-rose-400" size={20} />}
          trend={{ value: 'Requires attention', isPositive: false }}
        />
        <StatCard
          label="Active Bookings"
          value={activeBookings.toLocaleString()}
          icon={<CheckSquare className="text-emerald-400" size={20} />}
        />
        <StatCard
          label="Pending Returns"
          value={pendingReturns.toLocaleString()}
          icon={<Clock className="text-[var(--color-brand)]" size={20} />}
        />
      </section>

      {/* Main Grid Floor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Events */}
          <GlassPanel intensity="macro" className="p-8">
            <div className="flex items-center justify-between mb-6">
              <Heading level={4} className="flex items-center gap-2">
                <Calendar size={18} className="text-[var(--color-brand)]" />
                Upcoming Events
              </Heading>
              <button className="text-xs tracking-wider uppercase text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors flex items-center gap-1">
                View All <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-[var(--color-text-muted)] py-4 text-center">No upcoming events scheduled.</p>
              ) : (
                upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-4 rounded bg-white/5 border border-white/5">
                    <div>
                      <p className="font-medium text-white mb-1">{event.type} Event</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{event.venueDetails || "Venue TBD"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">{new Date(event.eventDate).toLocaleDateString()}</p>
                      <Badge className="mt-1 bg-white/10">{event.guestCount} Guests</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassPanel>

          {/* Recent Bookings */}
          <GlassPanel intensity="macro" className="p-8">
            <div className="flex items-center justify-between mb-6">
              <Heading level={4} className="flex items-center gap-2">
                <CheckSquare size={18} className="text-[var(--color-brand)]" />
                Recent Bookings
              </Heading>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-white/10 text-[var(--color-text-muted)]">
                    <th className="pb-3 font-normal">Booking ID</th>
                    <th className="pb-3 font-normal">Status</th>
                    <th className="pb-3 font-normal">Date Created</th>
                    <th className="pb-3 text-right font-normal">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentBookings.map(b => (
                    <tr key={b.id}>
                      <td className="py-4 text-[#C1AA7F] font-mono text-xs">{b.id.substring(0, 8).toUpperCase()}</td>
                      <td className="py-4">
                        <Badge>{b.status.replace('_', ' ')}</Badge>
                      </td>
                      <td className="py-4 text-[var(--color-text-muted)]">{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 text-right">₹{b.totalAmount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Operational Alerts */}
          <GlassPanel intensity="macro" className="p-8 border-l-2 border-l-rose-500/50">
            <Heading level={4} className="flex items-center gap-2 mb-6">
              <AlertTriangle size={18} className="text-rose-400" />
              Active Alerts
            </Heading>
            {alerts.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)] text-center py-4 bg-white/5 rounded">All systems operational.</p>
            ) : (
              <ul className="space-y-3">
                {alerts.map((alert, i) => (
                  <li key={i} className="text-sm p-3 rounded bg-rose-500/10 text-rose-200 border border-rose-500/20 leading-relaxed">
                    {alert}
                  </li>
                ))}
              </ul>
            )}
          </GlassPanel>
        </div>
      </div>
    </Container>
  );
}
