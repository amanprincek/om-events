import React, { useState, useMemo } from 'react';
import { Container, Heading, StatCard, GlassPanel, Badge, Button } from '@om-tent/ui-system';
import { useDispatches, useBookings, useCustomers, useEvents, useInventory } from '@om-tent/data-access';
import { Search, Filter, Truck, Package, Calendar, ChevronDown, Plus, Eye, XCircle, Clock, CheckCircle, PackageCheck } from 'lucide-react';
import { DispatchStatus, DispatchRecord } from '@om-tent/core-types';

export default function AdminDispatch() {
  const { data: dispatches = [], isLoading: loadingDispatches } = useDispatches();
  const { data: bookings = [], isLoading: loadingBookings } = useBookings();
  const { data: customers = [], isLoading: loadingCustomers } = useCustomers();
  const { data: events = [], isLoading: loadingEvents } = useEvents();
  const { data: inventory = [], isLoading: loadingInventory } = useInventory();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof DispatchRecord>('dispatchedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const [selectedDispatch, setSelectedDispatch] = useState<DispatchRecord | null>(null);

  const loading = loadingDispatches || loadingBookings || loadingCustomers || loadingEvents || loadingInventory;

  const getStatusStyle = (status: DispatchStatus) => {
    switch (status) {
      case DispatchStatus.PENDING: return 'border-amber-500 text-amber-400 bg-amber-500/10';
      case DispatchStatus.IN_TRANSIT: return 'border-blue-500 text-blue-400 bg-blue-500/10';
      case DispatchStatus.DELIVERED: return 'border-emerald-500 text-emerald-400 bg-emerald-500/10';
      default: return 'border-white/20 text-white bg-white/5';
    }
  };

  const getEvent = (id: string) => events.find(e => e.id === id);
  const getBooking = (eventId: string) => bookings.find(b => b.eventId === eventId);
  const getCustomer = (customerId: string) => customers.find(c => c.id === customerId);

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    return {
      pending: dispatches.filter(d => d.status === DispatchStatus.PENDING).length,
      inTransit: dispatches.filter(d => d.status === DispatchStatus.IN_TRANSIT).length,
      delivered: dispatches.filter(d => d.status === DispatchStatus.DELIVERED).length,
      todayDispatches: dispatches.filter(d => d.dispatchedAt?.startsWith(today)).length,
    };
  }, [dispatches]);

  const filteredDispatches = useMemo(() => {
    return dispatches.filter(d => {
      const event = getEvent(d.eventId);
      const booking = event ? getBooking(event.id) : undefined;
      const customer = booking ? getCustomer(booking.customerId) : undefined;
      
      const searchMatch = 
        customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event?.type.toLowerCase().includes(searchTerm.toLowerCase());
        
      const statusMatch = selectedStatus === 'ALL' || d.status === selectedStatus;
      
      return searchMatch && statusMatch;
    }).sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });
  }, [dispatches, events, bookings, customers, searchTerm, selectedStatus, sortField, sortDirection]);

  const paginatedDispatches = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDispatches.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDispatches, currentPage]);

  const totalPages = Math.ceil(filteredDispatches.length / itemsPerPage);

  const toggleSort = (field: keyof DispatchRecord) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <Heading level={2} className="mb-2">Dispatch Management</Heading>
          <p className="text-[var(--color-text-muted)] tracking-wide">Manage inventory loading, dispatch schedules, and delivery tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 text-sm px-4">
            <Plus size={16} /> New Dispatch
          </Button>
        </div>
      </header>

      {/* Analytics Widgets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Pending Dispatch"
          value={stats.pending.toLocaleString()}
          icon={<Clock className="text-amber-400" size={20} />}
        />
        <StatCard
          label="In Transit"
          value={stats.inTransit.toLocaleString()}
          icon={<Truck className="text-blue-400" size={20} />}
        />
        <StatCard
          label="Completed Deliveries"
          value={stats.delivered.toLocaleString()}
          icon={<CheckCircle className="text-emerald-400" size={20} />}
        />
        <StatCard
          label="Today's Dispatches"
          value={stats.todayDispatches.toLocaleString()}
          icon={<PackageCheck className="text-[var(--color-brand)]" size={20} />}
        />
      </section>

      {/* Dispatch Table Container */}
      <GlassPanel intensity="macro" className="p-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID, Customer, or Event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-10 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
            />
          </div>
          <div className="w-full sm:w-auto flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <Filter size={16} /> Status:
            </div>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] appearance-none pr-8 relative"
            >
              <option value="ALL">All Statuses</option>
              {Object.values(DispatchStatus).map(s => (
                <option key={s} value={s}>{s.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[900px]">
            <thead>
              <tr className="border-b border-white/5 text-[var(--color-text-muted)] bg-white/5">
                <th className="py-4 px-6 font-normal">Dispatch ID</th>
                <th className="py-4 px-6 font-normal">Customer</th>
                <th className="py-4 px-6 font-normal">Event Type</th>
                <th className="py-4 px-6 font-normal cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('dispatchedAt')}>
                  <div className="flex items-center gap-2">Dispatch Date {sortField === 'dispatchedAt' && <ChevronDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="py-4 px-6 font-normal text-right">Items</th>
                <th className="py-4 px-6 font-normal">Status</th>
                <th className="py-4 px-6 font-normal text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedDispatches.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[var(--color-text-muted)]">No dispatch records found.</td>
                </tr>
              ) : (
                paginatedDispatches.map(d => {
                  const event = getEvent(d.eventId);
                  const booking = event ? getBooking(event.id) : undefined;
                  const customer = booking ? getCustomer(booking.customerId) : undefined;
                  const dispatchDate = d.dispatchedAt ? new Date(d.dispatchedAt).toLocaleDateString() : 'N/A';
                  const totalItems = d.items.reduce((sum, item) => sum + item.quantityDispatched, 0);
                  
                  return (
                    <tr key={d.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-6 font-mono text-xs text-[#C1AA7F]">{d.id.substring(0, 8).toUpperCase()}</td>
                      <td className="py-4 px-6 text-white">{customer?.name || 'Unknown Customer'}</td>
                      <td className="py-4 px-6 text-[var(--color-text-muted)]">{event?.type || 'N/A'}</td>
                      <td className="py-4 px-6 text-white">{dispatchDate}</td>
                      <td className="py-4 px-6 text-right font-mono text-[var(--color-text-muted)]">{totalItems}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-pill)] border text-xs font-medium uppercase tracking-wider ${getStatusStyle(d.status)}`}>
                          {d.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          className="p-2 text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 rounded transition-colors" 
                          title="View details"
                          onClick={() => setSelectedDispatch(d)}
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 md:p-6 border-t border-white/5 flex items-center justify-between text-sm text-[var(--color-text-muted)]">
            <div>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredDispatches.length)} of {filteredDispatches.length} records
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-white">{currentPage}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </GlassPanel>

      {/* Dispatch Detail Drawer Modal */}
      {selectedDispatch && (() => {
        const bdEvent = getEvent(selectedDispatch.eventId);
        const bdBooking = bdEvent ? getBooking(bdEvent.id) : undefined;
        const bdCustomer = bdBooking ? getCustomer(bdBooking.customerId) : undefined;
        
        return (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedDispatch(null)} />
            <GlassPanel intensity="shield" className="relative w-full max-w-lg h-full bg-[var(--color-slate-obsidian)] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <Heading level={4}>Dispatch Details</Heading>
                <button onClick={() => setSelectedDispatch(null)} className="text-[var(--color-text-muted)] hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-mono text-[var(--color-brand)]">#{selectedDispatch.id}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-pill)] border text-xs font-medium uppercase tracking-wider ${getStatusStyle(selectedDispatch.status)}`}>
                      {selectedDispatch.status.replace('_', ' ')}
                    </span>
                  </div>
                  {selectedDispatch.dispatchedAt && (
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Dispatched on <span className="text-white">{new Date(selectedDispatch.dispatchedAt).toLocaleDateString()}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Heading level={5} className="text-white border-b border-white/10 pb-2">Booking & Event Info</Heading>
                  {bdEvent && bdCustomer ? (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Customer</p>
                        <p className="text-white">{bdCustomer.name}</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Phone</p>
                        <p className="text-white">{bdCustomer.primaryPhone}</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Event Type</p>
                        <p className="text-white">{bdEvent.type}</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Event Date</p>
                        <p className="text-white">{new Date(bdEvent.eventDate).toLocaleDateString()}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[var(--color-text-muted)] mb-1">Destination Venue</p>
                        <p className="text-white">{bdEvent.venueDetails}</p>
                      </div>
                    </div>
                  ) : <p className="text-sm text-[var(--color-text-muted)]">Event details unavailable.</p>}
                </div>
                
                <div className="space-y-4">
                  <Heading level={5} className="text-white border-b border-white/10 pb-2">Assigned Inventory ({selectedDispatch.items.length} unique items)</Heading>
                  <div className="space-y-3">
                    {selectedDispatch.items.map((item, idx) => {
                      const invData = inventory.find(i => i.id === item.inventoryItemId);
                      
                      // Mock validation warning if we don't have enough available
                      // This simulates real-time availability checking based on actual data
                      const available = invData ? (invData.totalOwned - invData.damagedQuantity) : 0;
                      const hasWarning = available < item.quantityDispatched;

                      return (
                        <div key={idx} className={`p-3 rounded bg-white/5 border ${hasWarning ? 'border-amber-500/30' : 'border-white/5'} flex items-center justify-between text-sm`}>
                          <div className="flex items-center gap-3">
                            <Package size={16} className={hasWarning ? 'text-amber-400' : 'text-[var(--color-text-muted)]'} />
                            <div>
                              <div className="text-white">{invData?.name || item.inventoryItemId}</div>
                              {hasWarning && <div className="text-xs text-amber-400 mt-0.5">Warning: Only {available} available in stock</div>}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-white">{item.quantityDispatched}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">Units</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Heading level={5} className="text-white">Quick Actions</Heading>
                  <div className="grid grid-cols-2 gap-3 flex-wrap">
                    {selectedDispatch.status === DispatchStatus.PENDING && (
                      <Button variant="primary" className="w-full text-center justify-center">Mark as Dispatched</Button>
                    )}
                    {(selectedDispatch.status === DispatchStatus.IN_TRANSIT) && (
                      <Button variant="primary" className="w-full text-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500">Mark as Delivered</Button>
                    )}
                    <Button variant="secondary" className="w-full text-center justify-center">View Packing Slip</Button>
                    <Button variant="secondary" className="w-full text-center justify-center">Assign Staff</Button>
                    {selectedDispatch.status !== DispatchStatus.DELIVERED && (
                      <Button variant="secondary" className="w-full text-center justify-center border-rose-500/50 text-rose-400 hover:bg-rose-500/10">Cancel Dispatch</Button>
                    )}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        );
      })()}
    </Container>
  );
}
