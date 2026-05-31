import React, { useState, useMemo } from 'react';
import { Container, Heading, StatCard, GlassPanel, Badge, Input, Button } from '@om-tent/ui-system';
import { useInventory, useInventoryCategories } from '@om-tent/data-access';
import { Package, Search, Filter, Wrench, ArrowUpDown, ChevronDown, CheckCircle, AlertTriangle, XCircle, Plus, Eye } from 'lucide-react';
import { InventoryItem } from '@om-tent/core-types';

export default function AdminInventory() {
  const { data: inventory = [], isLoading: loadingInventory } = useInventory();
  const { data: categories = [], isLoading: loadingCategories } = useInventoryCategories();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof InventoryItem>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const loading = loadingInventory || loadingCategories;

  // Derive status
  const getStatusInfo = (item: InventoryItem) => {
    // Mocking deployed quantity
    const deployedQuantity = Math.floor(item.totalOwned * 0.2); 
    const availableQuantity = item.totalOwned - item.damagedQuantity - deployedQuantity;
    const availablePercentage = availableQuantity / item.totalOwned;

    if (item.damagedQuantity > item.totalOwned * 0.2) {
      return { label: 'Maintenance Required', color: 'border-amber-500 text-amber-500 bg-amber-500/10', icon: <Wrench size={12} /> };
    }
    if (availableQuantity <= 0) {
      return { label: 'Critical Availability', color: 'border-rose-500 text-rose-500 bg-rose-500/10', icon: <XCircle size={12} /> };
    }
    if (availablePercentage < 0.2) {
      return { label: 'Low Availability', color: 'border-orange-500 text-orange-500 bg-orange-500/10', icon: <AlertTriangle size={12} /> };
    }
    return { label: 'Healthy', color: 'border-emerald-500 text-emerald-500 bg-emerald-500/10', icon: <CheckCircle size={12} /> };
  };

  const getStats = () => {
    let total = 0;
    let damaged = 0;
    let deployed = 0;
    
    inventory.forEach(item => {
      total += item.totalOwned;
      damaged += item.damagedQuantity;
      deployed += Math.floor(item.totalOwned * 0.2);
    });

    return { total, damaged, deployed, available: total - damaged - deployed };
  };

  const stats = getStats();

  const filteredItems = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || item.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
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
  }, [inventory, searchTerm, selectedCategory, sortField, sortDirection]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const toggleSort = (field: keyof InventoryItem) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown Category';
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
          <Heading level={2} className="mb-2">Inventory Management</Heading>
          <p className="text-[var(--color-text-muted)] tracking-wide">Monitor and manage all equipment, furniture, and structure assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="flex items-center gap-2 text-sm px-4">
            <ArrowUpDown size={16} /> Sync Data
          </Button>
          <Button variant="primary" className="flex items-center gap-2 text-sm px-4">
            <Plus size={16} /> Add Item
          </Button>
        </div>
      </header>

      {/* Analytics Widgets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Inventory Assets"
          value={stats.total.toLocaleString()}
          icon={<Package className="text-[var(--color-brand)]" size={20} />}
        />
        <StatCard
          label="Available Now"
          value={stats.available.toLocaleString()}
          icon={<CheckCircle className="text-emerald-400" size={20} />}
          trend={{ value: `${((stats.available / stats.total) * 100).toFixed(0)}% of total`, isPositive: true }}
        />
        <StatCard
          label="Deployed"
          value={stats.deployed.toLocaleString()}
          icon={<Package className="text-blue-400" size={20} />}
        />
        <StatCard
          label="In Maintenance"
          value={stats.damaged.toLocaleString()}
          icon={<Wrench className="text-rose-400" size={20} />}
          trend={{ value: 'Needs attention', isPositive: false }}
        />
      </section>

      {/* Inventory Table Container */}
      <GlassPanel intensity="macro" className="p-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={16} />
            <input 
              type="text" 
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded px-10 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
            />
          </div>
          <div className="w-full sm:w-auto flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <Filter size={16} /> Category:
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] appearance-none pr-8 relative"
            >
              <option value="ALL">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 text-[var(--color-text-muted)] bg-white/5">
                <th className="py-4 px-6 font-normal cursor-pointer hover:text-white transition-colors" onClick={() => toggleSort('name')}>
                  <div className="flex items-center gap-2">Item Name {sortField === 'name' && <ChevronDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="py-4 px-6 font-normal">Category</th>
                <th className="py-4 px-6 font-normal cursor-pointer hover:text-white transition-colors text-right" onClick={() => toggleSort('totalOwned')}>
                  <div className="flex items-center justify-end gap-2">Total {sortField === 'totalOwned' && <ChevronDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="py-4 px-6 font-normal text-right">Available</th>
                <th className="py-4 px-6 font-normal text-right">Deployed</th>
                <th className="py-4 px-6 font-normal cursor-pointer hover:text-white transition-colors text-right" onClick={() => toggleSort('damagedQuantity')}>
                  <div className="flex items-center justify-end gap-2">Maintenance {sortField === 'damagedQuantity' && <ChevronDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="py-4 px-6 font-normal">Status</th>
                <th className="py-4 px-6 font-normal text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[var(--color-text-muted)]">No inventory items found.</td>
                </tr>
              ) : (
                paginatedItems.map(item => {
                  const deployedQuantity = Math.floor(item.totalOwned * 0.2); 
                  const availableQuantity = item.totalOwned - item.damagedQuantity - deployedQuantity;
                  const status = getStatusInfo(item);

                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-6 font-medium text-white">{item.name}</td>
                      <td className="py-4 px-6 text-[var(--color-text-muted)]">{getCategoryName(item.categoryId)}</td>
                      <td className="py-4 px-6 text-right font-mono">{item.totalOwned}</td>
                      <td className="py-4 px-6 text-right font-mono text-emerald-400">{availableQuantity}</td>
                      <td className="py-4 px-6 text-right font-mono text-blue-400">{deployedQuantity}</td>
                      <td className="py-4 px-6 text-right font-mono text-rose-400">{item.damagedQuantity > 0 ? item.damagedQuantity : '-'}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-pill)] border text-xs font-medium ${status.color}`}>
                          {status.icon} {status.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          className="p-2 text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 rounded transition-colors" 
                          title="View details"
                          onClick={() => setSelectedItem(item)}
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
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length} items
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

      {/* Item Detail Drawer Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
          <GlassPanel intensity="shield" className="relative w-full max-w-md h-full bg-[var(--color-slate-obsidian)] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <Heading level={4}>Item Details</Heading>
              <button onClick={() => setSelectedItem(null)} className="text-[var(--color-text-muted)] hover:text-white transition-colors">
                <XCircle size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <Badge className="mb-3">{getCategoryName(selectedItem.categoryId)}</Badge>
                <Heading level={3} className="mb-2 text-white">{selectedItem.name}</Heading>
                <p className="text-sm font-mono text-[var(--color-text-muted)]">ID: {selectedItem.id}</p>
              </div>

              {selectedItem.imageUrl && (
                <div className="aspect-video w-full rounded bg-white/5 border border-white/10 overflow-hidden">
                  <img src={selectedItem.imageUrl} alt={selectedItem.name} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="space-y-4">
                <Heading level={5} className="text-white">Inventory Status</Heading>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded bg-white/5 border border-white/5 text-center">
                    <div className="text-2xl font-trust-number text-[var(--color-brand)]">{selectedItem.totalOwned}</div>
                    <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mt-1">Total Owned</div>
                  </div>
                  <div className="p-4 rounded bg-white/5 border border-white/5 text-center">
                    <div className="text-2xl font-trust-number text-emerald-400">
                      {selectedItem.totalOwned - selectedItem.damagedQuantity - Math.floor(selectedItem.totalOwned * 0.2)}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mt-1">Available</div>
                  </div>
                  <div className="p-4 rounded bg-white/5 border border-white/5 text-center">
                    <div className="text-2xl font-trust-number text-blue-400">
                      {Math.floor(selectedItem.totalOwned * 0.2)}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mt-1">Deployed</div>
                  </div>
                  <div className="p-4 rounded bg-white/5 border border-white/5 text-center">
                    <div className="text-2xl font-trust-number text-rose-400">{selectedItem.damagedQuantity}</div>
                    <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mt-1">Maintenance</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Heading level={5} className="text-white">Quick Actions</Heading>
                <div className="flex flex-col gap-3">
                  <Button variant="secondary" className="w-full">Adjust Quantity</Button>
                  <Button variant="secondary" className="w-full">Report Damage</Button>
                  <Button variant="secondary" className="w-full">View History</Button>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      )}
    </Container>
  );
}
