import React, { useState, useMemo } from 'react';
import { Container, Heading, StatCard, GlassPanel, Badge, Button } from '@om-tent/ui-system';
import { useReturns, useDispatches, useBookings, useCustomers, useEvents, useInventory } from '@om-tent/data-access';
import { Search, Filter, Undo2, Package, AlertTriangle, ChevronDown, Eye, XCircle, CheckCircle, PackageX, PackageMinus } from 'lucide-react';
import { ReturnStatus, ReturnRecord, DispatchRecord } from '@om-tent/core-types';

export default function AdminReturns() {
  const { data: returns = [], isLoading: loadingReturns } = useReturns();
  const { data: dispatches = [], isLoading: loadingDispatches } = useDispatches();
  const { data: bookings = [], isLoading: loadingBookings } = useBookings();
  const { data: customers = [], isLoading: loadingCustomers } = useCustomers();
  const { data: events = [], isLoading: loadingEvents } = useEvents();
  const { data: inventory = [], isLoading: loadingInventory } = useInventory();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof ReturnRecord>('returnedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const [selectedReturn, setSelectedReturn] = useState<ReturnRecord | null>(null);

  const loading = loadingReturns || loadingDispatches || loadingBookings || loadingCustomers || loadingEvents || loadingInventory;

  const getStatusStyle = (status: ReturnStatus) => {
    switch (status) {
      case ReturnStatus.PENDING: return 'border-amber-500 text-amber-400 bg-amber-500/10';
      case ReturnStatus.PARTIALLY_RETURNED: return 'border-blue-500 text-blue-400 bg-blue-500/10';
      case ReturnStatus.FULLY_RETURNED: return 'border-emerald-500 text-emerald-400 bg-emerald-500/10';
      case ReturnStatus.RETURNED_WITH_DAMAGE: return 'border-orange-500 text-orange-400 bg-orange-500/10';
      case ReturnStatus.RETURNED_WITH_LOSS: return 'border-rose-500 text-rose-400 bg-rose-500/10';
      case ReturnStatus.INSPECTION: return 'border-indigo-500 text-indigo-400 bg-indigo-500/10';
      case ReturnStatus.CLEARED: return 'border-[var(--color-brand)] text-[var(--color-brand)] bg-[var(--color-brand)]/10';
      default: return 'border-white/20 text-white bg-white/5';
    }
  };

  const getDispatch = (id: string) => dispatches.find(d => d.id === id);
  const getEvent = (id: string) => events.find(e => e.id === id);
  const getBooking = (eventId: string) => bookings.find(b => b.eventId === eventId);
  const getCustomer = (customerId: string) => customers.find(c => c.id === customerId);

  const calculateReturnStats = (ret: ReturnRecord) => {
    const dispatch = getDispatch(ret.dispatchRecordId);
    let expected = 0;
    let returned = 0;
    let missing = 0;
    let damaged = 0;
    
    if (dispatch) {
      expected = dispatch.items.reduce((sum, i) => sum + i.quantityDispatched, 0);
    }
    
    returned = ret.items.reduce((sum, i) => sum + i.quantityReturned, 0);
    damaged = ret.items.reduce((sum, i) => sum + i.quantityDamaged, 0);
    missing = Math.max(0, expected - returned);
    
    return { expected, returned, missing, damaged };
  };

  const stats = useMemo(() => {
    let pending = 0;
    let missingTotal = 0;
    let damagedTotal = 0;
    let recentlyClosed = 0;
    
    returns.forEach(r => {
      if (r.status === ReturnStatus.PENDING || r.status === ReturnStatus.PARTIALLY_RETURNED) {
        pending++;
      }
      if (r.status === ReturnStatus.CLEARED && r.returnedAt && new Date(r.returnedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000) {
        recentlyClosed++;
      }
      
      const counts = calculateReturnStats(r);
      missingTotal += counts.missing;
      damagedTotal += counts.damaged;
    });

    return { pending, missingTotal, damagedTotal, recentlyClosed };
  }, [returns, dispatches]);

  const filteredReturns = useMemo(() => {
    return returns.filter(r => {
      const dispatch = getDispatch(r.dispatchRecordId);
      const event = dispatch ? getEvent(dispatch.eventId) : undefined;
      const booking = event ? getBooking(event.id) : undefined;
      const customer = booking ? getCustomer(booking.customerId) : undefined;
      
      const searchMatch = 
        customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.dispatchRecordId.toLowerCase().includes(searchTerm.toLowerCase());
        
      const statusMatch = selectedStatus === 'ALL' || r.status === selectedStatus;
      
      return searchMatch && statusMatch;
    }).sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });
  }, [returns, dispatches, events, bookings, customers, searchTerm, selectedStatus, sortField, sortDirection]);

  const paginatedReturns = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredReturns.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredReturns, currentPage]);

  const totalPages = Math.ceil(filteredReturns.length / itemsPerPage);

  const toggleSort = (field: keyof ReturnRecord) => {
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
          <Heading level={2} className="mb-2">Returns & Reconciliation</Heading>
          <p className="text-[var(--color-text-muted)] tracking-wide">Manage returned inventory, flag damages, and track missing items.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 text-sm px-4">
            <Undo2 size={16} /> Process Return
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Pending Returns"
          value={stats.pending.toLocaleString()}
          icon={<Undo2 className="text-amber-400" size={20} />}
        />
        <StatCard
          label="Missing Items"
          value={stats.missingTotal.toLocaleString()}
          icon={<PackageX className="text-rose-400" size={20} />}
          trend={{ value: 'Needs follow-up', isPositive: false }}
        />
        <StatCard
          label="Damaged Items"
          value={stats.damagedTotal.toLocaleString()}
          icon={<PackageMinus className="text-orange-400" size={20} />}
          trend={{ value: 'Review maintenance', isPositive: false }}
        />
        <StatCard
          label="Recently Closed Returns"
          value={stats.recentlyClosed.toLocaleString()}
          icon={<CheckCircle className="text-[var(--color-brand)]" size={20} />}
        />
      </section>

      {/* Returns Table Container */}
      <GlassPanel intensity="macro" className="p-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={16} />
            <input 
              type="text" 
              placeholder="Search by Return ID, Dispatch ID, Customer..."
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
              {Object.values(ReturnStatus).map(s => (
                <option key={s} value={s}>{s.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/5 text-[var(--color-text-muted)] bg-white/5">
                <th className="py-4 px-6 font-normal">Return ID</th>
                <th className="py-4 px-6 font-normal">Customer</th>
                <th className="py-4 px-6 font-normal cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('returnedAt')}>
                  <div className="flex items-center gap-2">Date {sortField === 'returnedAt' && <ChevronDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="py-4 px-6 font-normal text-right">Expected</th>
                <th className="py-4 px-6 font-normal text-right">Returned</th>
                <th className="py-4 px-6 font-normal text-right">Missing</th>
                <th className="py-4 px-6 font-normal text-right">Damaged</th>
                <th className="py-4 px-6 font-normal">Status</th>
                <th className="py-4 px-6 font-normal text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedReturns.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-[var(--color-text-muted)]">No returns found.</td>
                </tr>
              ) : (
                paginatedReturns.map(r => {
                  const dispatch = getDispatch(r.dispatchRecordId);
                  const event = dispatch ? getEvent(dispatch.eventId) : undefined;
                  const booking = event ? getBooking(event.id) : undefined;
                  const customer = booking ? getCustomer(booking.customerId) : undefined;
                  const returnDate = r.returnedAt ? new Date(r.returnedAt).toLocaleDateString() : 'Pending';
                  
                  const counts = calculateReturnStats(r);
                  
                  return (
                    <tr key={r.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-6 font-mono text-xs text-[#C1AA7F]">{r.id.substring(0, 8).toUpperCase()}</td>
                      <td className="py-4 px-6 text-white">{customer?.name || 'Unknown'}</td>
                      <td className="py-4 px-6 text-white">{returnDate}</td>
                      <td className="py-4 px-6 text-right font-mono text-[var(--color-text-muted)]">{counts.expected}</td>
                      <td className="py-4 px-6 text-right font-mono text-emerald-400">{counts.returned}</td>
                      <td className="py-4 px-6 text-right font-mono text-rose-400">{counts.missing > 0 ? counts.missing : '-'}</td>
                      <td className="py-4 px-6 text-right font-mono text-orange-400">{counts.damaged > 0 ? counts.damaged : '-'}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-pill)] border text-xs font-medium uppercase tracking-wider ${getStatusStyle(r.status)}`}>
                          {r.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          className="p-2 text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 rounded transition-colors" 
                          title="View details"
                          onClick={() => setSelectedReturn(r)}
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
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredReturns.length)} of {filteredReturns.length} forms
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

      {/* Return Detail Drawer Modal */}
      {selectedReturn && (() => {
        const dispatch = getDispatch(selectedReturn.dispatchRecordId);
        const event = dispatch ? getEvent(dispatch.eventId) : undefined;
        const booking = event ? getBooking(event.id) : undefined;
        const customer = booking ? getCustomer(booking.customerId) : undefined;
        const stats = calculateReturnStats(selectedReturn);

        // Map items for reconciliation comparison
        const reconciliationItems = dispatch?.items.map(dItem => {
          const invData = inventory.find(i => i.id === dItem.inventoryItemId);
          const rItem = selectedReturn.items.find(i => i.inventoryItemId === dItem.inventoryItemId);
          
          const expected = dItem.quantityDispatched;
          const returned = rItem ? rItem.quantityReturned : 0;
          const damaged = rItem ? rItem.quantityDamaged : 0;
          const missing = Math.max(0, expected - returned);

          return {
            id: dItem.inventoryItemId,
            name: invData?.name || dItem.inventoryItemId,
            expected,
            returned,
            damaged,
            missing
          };
        }) || [];
        
        return (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedReturn(null)} />
            <GlassPanel intensity="shield" className="relative w-full max-w-xl h-full bg-[var(--color-slate-obsidian)] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <Heading level={4}>Return Details</Heading>
                  <p className="text-xs text-[var(--color-text-muted)] font-mono mt-1">Dispatch: {dispatch?.id}</p>
                </div>
                <button onClick={() => setSelectedReturn(null)} className="text-[var(--color-text-muted)] hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-mono text-[var(--color-brand)]">#{selectedReturn.id}</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-pill)] border text-xs font-medium uppercase tracking-wider ${getStatusStyle(selectedReturn.status)}`}>
                      {selectedReturn.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 p-4 rounded bg-white/5 border border-white/10 text-center">
                    <div>
                      <div className="text-2xl font-trust-number text-white">{stats.expected}</div>
                      <div className="text-[10px] uppercase text-[var(--color-text-muted)] tracking-wider mt-1">Expected</div>
                    </div>
                    <div>
                      <div className="text-2xl font-trust-number text-emerald-400">{stats.returned}</div>
                      <div className="text-[10px] uppercase text-[var(--color-text-muted)] tracking-wider mt-1">Returned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-trust-number text-rose-400">{stats.missing}</div>
                      <div className="text-[10px] uppercase text-[var(--color-text-muted)] tracking-wider mt-1">Missing</div>
                    </div>
                    <div>
                      <div className="text-2xl font-trust-number text-orange-400">{stats.damaged}</div>
                      <div className="text-[10px] uppercase text-[var(--color-text-muted)] tracking-wider mt-1">Damaged</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Heading level={5} className="text-white border-b border-white/10 pb-2">Customer & Event</Heading>
                  {event && customer ? (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Customer</p>
                        <p className="text-white">{customer.name}</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-muted)] mb-1">Event Type</p>
                        <p className="text-white">{event.type}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[var(--color-text-muted)] mb-1">Venue</p>
                        <p className="text-white">{event.venueDetails}</p>
                      </div>
                    </div>
                  ) : <p className="text-sm text-[var(--color-text-muted)]">Details unavailable.</p>}
                </div>
                
                <div className="space-y-4">
                  <Heading level={5} className="text-white flex items-center justify-between border-b border-white/10 pb-2">
                    <span>Reconciliation</span>
                    {stats.missing > 0 && <span className="text-xs text-rose-400 font-medium flex items-center gap-1"><AlertTriangle size={12}/> Discrepancy Found</span>}
                  </Heading>
                  
                  <div className="space-y-3">
                    {reconciliationItems.map((item, idx) => (
                      <div key={idx} className={`p-3 rounded bg-white/5 border ${item.missing > 0 || item.damaged > 0 ? 'border-amber-500/30' : 'border-white/5'} text-sm`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-white font-medium">{item.name}</div>
                          <div className="text-[var(--color-text-muted)] font-mono text-xs">ID: {item.id}</div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[var(--color-text-muted)]">Expected: <span className="text-white font-mono">{item.expected}</span></span>
                          <span className="text-emerald-400">Returned: <span className="font-mono">{item.returned}</span></span>
                          {item.missing > 0 && <span className="text-rose-400">Missing: <span className="font-mono">{item.missing}</span></span>}
                          {item.damaged > 0 && <span className="text-orange-400">Damaged: <span className="font-mono">{item.damaged}</span></span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Heading level={5} className="text-white">Quick Actions</Heading>
                  <div className="grid grid-cols-2 gap-3 flex-wrap">
                    <Button variant="primary" className="w-full text-center justify-center">Update Counts</Button>
                    {stats.missing > 0 || stats.damaged > 0 ? (
                      <Button variant="secondary" className="w-full text-center justify-center text-amber-400 border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300">Generate Invoice</Button>
                    ) : (
                      <Button variant="primary" className="w-full text-center justify-center bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white">Mark as Cleared</Button>
                    )}
                    {(stats.damaged > 0) && (
                      <Button variant="secondary" className="w-full text-center justify-center col-span-2 text-orange-400 border-orange-500/30 hover:bg-orange-500/10">Create Maintenance Ticket</Button>
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
