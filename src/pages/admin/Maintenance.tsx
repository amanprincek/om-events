import React, { useState, useMemo } from 'react';
import { Container, Heading, StatCard, GlassPanel, Badge, Button } from '@om-tent/ui-system';
import { useMaintenance, useReturns, useInventory, useInventoryCategories } from '@om-tent/data-access';
import { Search, Filter, Wrench, AlertTriangle, ChevronDown, Eye, XCircle, CheckCircle, Clock, CheckSquare, Settings } from 'lucide-react';
import { DamageResolution, IssueClassification, DamageReport } from '@om-tent/core-types';

export default function AdminMaintenance() {
  const { data: maintenanceReports = [], isLoading: loadingMaintenance } = useMaintenance();
  const { data: returns = [], isLoading: loadingReturns } = useReturns();
  const { data: inventory = [], isLoading: loadingInventory } = useInventory();
  const { data: categories = [], isLoading: loadingCategories } = useInventoryCategories();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof DamageReport>('reportedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const [selectedReport, setSelectedReport] = useState<DamageReport | null>(null);

  const loading = loadingMaintenance || loadingReturns || loadingInventory || loadingCategories;

  const getStatusStyle = (status: DamageResolution) => {
    switch (status) {
      case DamageResolution.REPORTED: return 'border-amber-500 text-amber-400 bg-amber-500/10';
      case DamageResolution.UNDER_REVIEW: return 'border-blue-500 text-blue-400 bg-blue-500/10';
      case DamageResolution.IN_REPAIR: return 'border-indigo-500 text-indigo-400 bg-indigo-500/10';
      case DamageResolution.AWAITING_PARTS: return 'border-orange-500 text-orange-400 bg-orange-500/10';
      case DamageResolution.COMPLETED: return 'border-emerald-500 text-emerald-400 bg-emerald-500/10';
      case DamageResolution.RETIRED: return 'border-rose-500 text-rose-400 bg-rose-500/10';
      default: return 'border-white/20 text-white bg-white/5';
    }
  };

  const getIssueStyle = (type: IssueClassification) => {
    switch (type) {
      case IssueClassification.BROKEN: return 'text-rose-400';
      case IssueClassification.DAMAGED: return 'text-orange-400';
      case IssueClassification.MISSING_PARTS: return 'text-amber-400';
      case IssueClassification.CLEANING_REQUIRED: return 'text-blue-400';
      case IssueClassification.INSPECTION_REQUIRED: return 'text-indigo-400';
      case IssueClassification.REPLACEMENT_REQUIRED: return 'text-red-400';
      default: return 'text-white';
    }
  }

  const getInventoryItem = (id: string) => inventory.find(i => i.id === id);
  const getCategory = (id: string) => categories.find(c => c.id === id);
  const getReturn = (id: string) => returns.find(r => r.id === id);

  const stats = useMemo(() => {
    return {
      open: maintenanceReports.filter(r => [DamageResolution.REPORTED, DamageResolution.UNDER_REVIEW].includes(r.resolution)).length,
      inRepair: maintenanceReports.filter(r => [DamageResolution.IN_REPAIR, DamageResolution.AWAITING_PARTS].includes(r.resolution)).length,
      completed: maintenanceReports.filter(r => r.resolution === DamageResolution.COMPLETED).length,
      retired: maintenanceReports.filter(r => r.resolution === DamageResolution.RETIRED).length,
    };
  }, [maintenanceReports]);

  const filteredReports = useMemo(() => {
    return maintenanceReports.filter(r => {
      const item = getInventoryItem(r.inventoryItemId);
      const category = item ? getCategory(item.categoryId) : undefined;
      
      const searchMatch = 
        item?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category?.name.toLowerCase().includes(searchTerm.toLowerCase());
        
      const statusMatch = selectedStatus === 'ALL' || r.resolution === selectedStatus;
      
      return searchMatch && statusMatch;
    }).sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });
  }, [maintenanceReports, inventory, categories, searchTerm, selectedStatus, sortField, sortDirection]);

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredReports.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredReports, currentPage]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const toggleSort = (field: keyof DamageReport) => {
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
          <Heading level={2} className="mb-2">Maintenance & Repairs</Heading>
          <p className="text-[var(--color-text-muted)] tracking-wide">Manage asset lifecycle, track repairs, and restore inventory utility.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" className="flex items-center gap-2 text-sm px-4">
            <Wrench size={16} /> Log Issue
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Open Issues"
          value={stats.open.toLocaleString()}
          icon={<AlertTriangle className="text-amber-400" size={20} />}
        />
        <StatCard
          label="In Repair"
          value={stats.inRepair.toLocaleString()}
          icon={<Settings className="text-indigo-400" size={20} />}
        />
        <StatCard
          label="Completed Repairs"
          value={stats.completed.toLocaleString()}
          icon={<CheckCircle className="text-emerald-400" size={20} />}
        />
        <StatCard
          label="Retired Assets"
          value={stats.retired.toLocaleString()}
          icon={<XCircle className="text-rose-400" size={20} />}
        />
      </section>

      {/* Maintenance Table Container */}
      <GlassPanel intensity="macro" className="p-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={16} />
            <input 
              type="text" 
              placeholder="Search by Item, ID, Category..."
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
              {Object.values(DamageResolution).map(s => (
                <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/5 text-[var(--color-text-muted)] bg-white/5">
                <th className="py-4 px-6 font-normal">Task ID</th>
                <th className="py-4 px-6 font-normal">Inventory Item</th>
                <th className="py-4 px-6 font-normal">Category</th>
                <th className="py-4 px-6 font-normal">Issue Type</th>
                <th className="py-4 px-6 font-normal cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('reportedAt')}>
                  <div className="flex items-center gap-2">Date Reported {sortField === 'reportedAt' && <ChevronDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="py-4 px-6 font-normal">Technician</th>
                <th className="py-4 px-6 font-normal">Status</th>
                <th className="py-4 px-6 font-normal text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedReports.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[var(--color-text-muted)]">No maintenance records found.</td>
                </tr>
              ) : (
                paginatedReports.map(r => {
                  const item = getInventoryItem(r.inventoryItemId);
                  const category = item ? getCategory(item.categoryId) : undefined;
                  const dateRep = r.reportedAt ? new Date(r.reportedAt).toLocaleDateString() : 'N/A';
                  
                  return (
                    <tr key={r.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-6 font-mono text-xs text-[#C1AA7F]">{r.id.substring(0, 8).toUpperCase()}</td>
                      <td className="py-4 px-6 text-white font-medium">{item?.name || 'Unknown'} <span className="text-xs text-[var(--color-text-muted)] ml-2">x{r.quantity}</span></td>
                      <td className="py-4 px-6 text-[var(--color-text-muted)]">{category?.name || '-'}</td>
                      <td className={`py-4 px-6 ${getIssueStyle(r.issueType)}`}>{r.issueType?.replace(/_/g, ' ') || 'N/A'}</td>
                      <td className="py-4 px-6 text-[var(--color-text-muted)]">{dateRep}</td>
                      <td className="py-4 px-6 text-white">{r.assignedTechnician || <span className="text-[var(--color-text-muted)] italic">Unassigned</span>}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-pill)] border text-xs font-medium uppercase tracking-wider ${getStatusStyle(r.resolution)}`}>
                          {r.resolution.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          className="p-2 text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 rounded transition-colors" 
                          title="View details"
                          onClick={() => setSelectedReport(r)}
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
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredReports.length)} of {filteredReports.length} records
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

      {/* Detail Drawer Modal */}
      {selectedReport && (() => {
        const item = getInventoryItem(selectedReport.inventoryItemId);
        const category = item ? getCategory(item.categoryId) : undefined;
        const retRecord = getReturn(selectedReport.returnRecordId);
        
        return (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedReport(null)} />
            <GlassPanel intensity="shield" className="relative w-full max-w-lg h-full bg-[var(--color-slate-obsidian)] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <Heading level={4}>Maintenance Ticket</Heading>
                  <p className="text-xs text-[var(--color-text-muted)] font-mono mt-1">ID: {selectedReport.id}</p>
                </div>
                <button onClick={() => setSelectedReport(null)} className="text-[var(--color-text-muted)] hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded font-medium text-sm ${getIssueStyle(selectedReport.issueType)} bg-white/5 border border-white/10`}>
                      {selectedReport.issueType?.replace(/_/g, ' ') || 'Unknown Issue'}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-pill)] border text-xs font-medium uppercase tracking-wider ${getStatusStyle(selectedReport.resolution)}`}>
                      {selectedReport.resolution.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-white">{item?.name || 'Unknown Item'}</h3>
                  <div className="text-[var(--color-text-muted)] text-sm flex gap-4 mt-2">
                    <span>Qty: <strong className="text-white">{selectedReport.quantity}</strong></span>
                    <span>Category: <strong className="text-white">{category?.name || 'N/A'}</strong></span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Heading level={5} className="text-white border-b border-white/10 pb-2">Issue Description</Heading>
                  <div className="p-4 rounded bg-white/5 border border-white/10 text-sm text-[var(--color-text-muted)]">
                    {selectedReport.description || "No description provided."}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Heading level={5} className="text-white border-b border-white/10 pb-2">Ticket Details</Heading>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[var(--color-text-muted)] mb-1">Date Reported</p>
                      <p className="text-white">{selectedReport.reportedAt ? new Date(selectedReport.reportedAt).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[var(--color-text-muted)] mb-1">Return Origin</p>
                      <p className="text-white font-mono text-xs mt-1">{retRecord?.id || selectedReport.returnRecordId}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[var(--color-text-muted)] mb-1">Assigned Technician</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-white">
                          {selectedReport.assignedTechnician ? selectedReport.assignedTechnician.charAt(0) : 'U'}
                        </div>
                        <span className="text-white">{selectedReport.assignedTechnician || 'Unassigned'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Heading level={5} className="text-white">Quick Actions</Heading>
                  <div className="grid grid-cols-2 gap-3 flex-wrap">
                    {selectedReport.resolution === DamageResolution.REPORTED && (
                      <Button variant="primary" className="w-full text-center justify-center">Assign & Start Review</Button>
                    )}
                    {selectedReport.resolution === DamageResolution.UNDER_REVIEW && (
                      <Button variant="primary" className="w-full text-center justify-center">Begin Repair</Button>
                    )}
                    {(selectedReport.resolution === DamageResolution.IN_REPAIR || selectedReport.resolution === DamageResolution.AWAITING_PARTS) && (
                      <Button variant="primary" className="w-full text-center justify-center bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white">Mark as Repaired</Button>
                    )}
                    {selectedReport.resolution !== DamageResolution.RETIRED && selectedReport.resolution !== DamageResolution.COMPLETED && (
                      <Button variant="secondary" className="w-full text-center justify-center text-rose-400 border-rose-500/30 hover:bg-rose-500/10">Retire Asset</Button>
                    )}
                    <Button variant="secondary" className="w-full text-center justify-center col-span-2">Update Notes & History</Button>
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
