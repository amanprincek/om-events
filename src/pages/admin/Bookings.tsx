import React, { useState, useMemo } from 'react';
import { Container, Heading, StatCard, GlassPanel, Badge, Button } from '@om-tent/ui-system';
import { useBookings, useCustomers, useEvents } from '@om-tent/data-access';
import { Search, Filter, Calendar, Users, MapPin, ChevronDown, Plus, Eye, XCircle, ArrowRight, CheckSquare, Clock } from 'lucide-react';
import { BookingStatus, Booking, Customer, Event } from '@om-tent/core-types';

export default function AdminBookings() {
  const { data: bookings = [], isLoading: loadingBookings } = useBookings();
  const { data: customers = [], isLoading: loadingCustomers } = useCustomers();
  const { data: events = [], isLoading: loadingEvents } = useEvents();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof Booking>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const loading = loadingBookings || loadingCustomers || loadingEvents;

  const getStatusStyle = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.INQUIRY: return 'border-blue-500 text-blue-400 bg-blue-500/10';
      case BookingStatus.DRAFT: return 'border-gray-500 text-gray-400 bg-gray-500/10';
      case BookingStatus.ADVANCE_PAID: return 'border-amber-500 text-amber-400 bg-amber-500/10';
      case BookingStatus.CONFIRMED: return 'border-emerald-500 text-emerald-400 bg-emerald-500/10';
      case BookingStatus.COMPLETED: return 'border-[var(--color-brand)] text-[var(--color-brand)] bg-[var(--color-brand)]/10';
      case BookingStatus.CANCELLED: return 'border-rose-500 text-rose-400 bg-rose-500/10';
      default: return 'border-white/20 text-white bg-white/5';
    }
  };

  const getCustomer = (id: string) => customers.find(c => c.id === id);
  const getEvent = (id: string) => events.find(e => e.id === id);

  const stats = useMemo(() => {
    return {
      active: bookings.filter(b => [BookingStatus.CONFIRMED, BookingStatus.ADVANCE_PAID].includes(b.status)).length,
      upcoming: events.filter(e => new Date(e.eventDate) >= new Date()).length,
      completed: bookings.filter(b => b.status === BookingStatus.COMPLETED).length,
      pending: bookings.filter(b => [BookingStatus.INQUIRY, BookingStatus.DRAFT].includes(b.status)).length,
    };
  }, [bookings, events]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const customer = getCustomer(b.customerId);
      const event = getEvent(b.eventId);
      
      const searchMatch = 
        customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event?.type.toLowerCase().includes(searchTerm.toLowerCase());
        
      const statusMatch = selectedStatus === 'ALL' || b.status === selectedStatus;
      
      return searchMatch && statusMatch;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      return 0;
    });
  }, [bookings, customers, events, searchTerm, selectedStatus, sortField, sortDirection]);

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBookings, currentPage]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const toggleSort = (field: keyof Booking) => {
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
          <Heading level={2} className="mb-2">Booking Management</Heading>
          <p className="text-[var(--color-text-muted)] tracking-wide">Manage customer event bookings, timelines, and allocation.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 text-sm px-4">
            <Plus size={16} /> New Booking
          </Button>
        </div>
      </header>

      {/* Analytics Widgets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Active Bookings"
          value={stats.active.toLocaleString()}
          icon={<CheckSquare className="text-emerald-400" size={20} />}
        />
        <StatCard
          label="Pending Confirmations"
          value={stats.pending.toLocaleString()}
          icon={<Clock className="text-amber-400" size={20} />}
        />
        <StatCard
          label="Upcoming Events"
          value={stats.upcoming.toLocaleString()}
          icon={<Calendar className="text-[var(--color-brand)]" size={20} />}
        />
        <StatCard
          label="Completed Events"
          value={stats.completed.toLocaleString()}
          icon={<CheckSquare className="text-blue-400" size={20} />}
        />
      </section>

      {/* Bookings Table Container */}
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
              {Object.values(BookingStatus).map(s => (
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
                <th className="py-4 px-6 font-normal">Booking ID</th>
                <th className="py-4 px-6 font-normal">Customer</th>
                <th className="py-4 px-6 font-normal">Event Type</th>
                <th className="py-4 px-6 font-normal">Date & Location</th>
                <th className="py-4 px-6 font-normal text-right">Guest Count</th>
                <th className="py-4 px-6 font-normal">Status</th>
                <th className="py-4 px-6 font-normal text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[var(--color-text-muted)]">No bookings found.</td>
                </tr>
              ) : (
                paginatedBookings.map(b => {
                  const customer = getCustomer(b.customerId);
                  const event = getEvent(b.eventId);
                  const eventDate = event ? new Date(event.eventDate).toLocaleDateString() : 'N/A';
                  
                  return (
                    <tr key={b.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-6 font-mono text-xs text-[#C1AA7F]">{b.id.substring(0, 8).toUpperCase()}</td>
                      <td className="py-4 px-6 text-white">{customer?.name || 'Unknown Customer'}</td>
                      <td className="py-4 px-6 text-[var(--color-text-muted)]">{event?.type || 'N/A'}</td>
                      <td className="py-4 px-6">
                        <div className="text-white mb-1">{eventDate}</div>
                        <div className="text-xs text-[var(--color-text-muted)] truncate max-w-[150px]">{event?.venueDetails || 'N/A'}</div>
                      </td>
                      <td className="py-4 px-6 text-right font-mono text-[var(--color-text-muted)]">{event?.guestCount || 0}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-pill)] border text-xs font-medium uppercase tracking-wider ${getStatusStyle(b.status)}`}>
                          {b.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          className="p-2 text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 rounded transition-colors" 
                          title="View details"
                          onClick={() => setSelectedBooking(b)}
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
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
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

      {/* Booking Detail Drawer Modal */}
      {selectedBooking && (() => {
        const bdCustomer = getCustomer(selectedBooking.customerId);
        const bdEvent = getEvent(selectedBooking.eventId);
        
        return (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedBooking(null)} />
            <GlassPanel intensity="shield" className="relative w-full max-w-lg h-full bg-[var(--color-slate-obsidian)] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <Heading level={4}>Booking Details</Heading>
                <button onClick={() => setSelectedBooking(null)} className="text-[var(--color-text-muted)] hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-mono text-[var(--color-brand)]">#{selectedBooking.id}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-pill)] border text-xs font-medium uppercase tracking-wider ${getStatusStyle(selectedBooking.status)}`}>
                      {selectedBooking.status.replace('_', ' ')}
                    </span>
                  </div>
                  <Heading level={3} className="mb-1 text-white">₹{selectedBooking.totalAmount.toLocaleString()}</Heading>
                  <p className="text-sm text-[var(--color-text-muted)]">Advance Paid: ₹{selectedBooking.advancePaid.toLocaleString()}</p>
                </div>

                <div className="space-y-4">
                  <Heading level={5} className="text-white border-b border-white/10 pb-2">Customer Information</Heading>
                  {bdCustomer ? (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Name</p>
                        <p className="text-white">{bdCustomer.name}</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Phone</p>
                        <p className="text-white">{bdCustomer.primaryPhone}</p>
                      </div>
                      {bdCustomer.address && (
                        <div className="col-span-2">
                          <p className="text-[var(--color-text-muted)] mb-1">Address</p>
                          <p className="text-white">{bdCustomer.address}</p>
                        </div>
                      )}
                    </div>
                  ) : <p className="text-sm text-[var(--color-text-muted)]">Customer details unavailable.</p>}
                </div>

                <div className="space-y-4">
                  <Heading level={5} className="text-white border-b border-white/10 pb-2">Event Details</Heading>
                  {bdEvent ? (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Type</p>
                        <p className="text-white">{bdEvent.type}</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Guest Count</p>
                        <p className="text-white">{bdEvent.guestCount}</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Event Date</p>
                        <p className="text-white">{new Date(bdEvent.eventDate).toLocaleDateString()}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[var(--color-text-muted)] mb-1">Venue</p>
                        <p className="text-white">{bdEvent.venueDetails}</p>
                      </div>
                    </div>
                  ) : <p className="text-sm text-[var(--color-text-muted)]">Event details unavailable.</p>}
                </div>
                
                <div className="space-y-4">
                  <Heading level={5} className="text-white border-b border-white/10 pb-2">Inventory Allocation</Heading>
                  <div className="p-4 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm flex items-center justify-between">
                    <span>Allocated Items: <strong>140 units</strong></span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-none">Validated</Badge>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Heading level={5} className="text-white">Quick Actions</Heading>
                  <div className="grid grid-cols-2 gap-3 flex-wrap">
                    <Button variant="primary" className="w-full text-center justify-center">Edit Booking</Button>
                    <Button variant="secondary" className="w-full text-center justify-center">Manage Inventory</Button>
                    <Button variant="secondary" className="w-full text-center justify-center">Process Payment</Button>
                    {selectedBooking.status !== BookingStatus.CANCELLED && (
                      <Button variant="secondary" className="w-full text-center justify-center border-rose-500/50 text-rose-400 hover:bg-rose-500/10">Cancel Booking</Button>
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

