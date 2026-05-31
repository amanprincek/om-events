import React, { useState, useMemo } from 'react';
import { 
  Container, 
  Heading, 
  StatCard, 
  GlassPanel, 
  Badge, 
  Button 
} from '@om-tent/ui-system';
import { 
  useStaff, 
  useEvents, 
  useDispatches, 
  useMaintenance, 
  StaffService 
} from '@om-tent/data-access';
import { 
  Search, 
  Users, 
  Phone, 
  X, 
  UserPlus, 
  Trash2, 
  UserCheck, 
  Clock, 
  Briefcase, 
  Plus, 
  Check, 
  User, 
  TrendingUp, 
  ChevronRight, 
  Award,
  ChevronLeft,
  Shield,
  Activity,
  FileText,
  UserCheck2,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

// --- Preset Avatars for Elite Event Crew ---
const PRESET_AVATARS = [
  { name: "Pawan Kumar (Classic Owner)", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80" },
  { name: "Gopal Kumar (Classic Owner)", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&q=80" },
  { name: "Executive Senior", url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80" },
  { name: "Operations Lead", url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80" },
  { name: "Creative Supervisor", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80" },
  { name: "Logistics Specialist", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80" },
  { name: "Event Setup Expert", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&q=80" },
  { name: "Catering Supervisor", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80" }
];

const PREDEFINED_SKILLS = [
  "Loading",
  "Dispatch",
  "Setup",
  "Decoration",
  "Lighting",
  "Catering Support",
  "Returns",
  "Maintenance",
  "Heavy Vehicles",
  "Customer Briefing"
];

const ROLES = [
  "Owner",
  "Manager",
  "Supervisor",
  "Setup Crew",
  "Logistics Crew",
  "Catering Crew",
  "Maintenance Crew",
  "Viewer"
];

const STATUSES = [
  "Available",
  "Assigned",
  "On Event",
  "On Leave",
  "Inactive"
];

// --- Interface for local extended fields ---
interface ExtendedStaff {
  id: string;
  branchId: string;
  name: string;
  phone: string;
  role: string;
  status: string;
  experience: string;
  skills: string[];
  joinDate: string;
  photoUrl: string;
  isActive: boolean;
  notes?: string;
  performance: {
    eventsHandled: number;
    dispatchesCompleted: number;
    maintenanceCompleted: number;
    attendanceScore: number;
    reliabilityScore: number;
  };
  assignedEventIds: string[];
  assignedDispatchIds: string[];
  assignedMaintenanceIds: string[];
}

export default function AdminStaff() {
  const queryClient = useQueryClient();
  const { data: rawStaff = [], isLoading: loadingStaff } = useStaff();
  const { data: events = [], isLoading: loadingEvents } = useEvents();
  const { data: dispatches = [], isLoading: loadingDispatches } = useDispatches();
  const { data: maintenanceList = [], isLoading: loadingMaintenance } = useMaintenance();

  // --- State Variables ---
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'joinDate' | 'experience' | 'attendance' | 'reliability'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Drawer / Detail states
  const [selectedStaff, setSelectedStaff] = useState<ExtendedStaff | null>(null);
  const [isNewStaffModalOpen, setIsNewStaffModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // New staff form state
  const [newStaff, setNewStaff] = useState<Omit<ExtendedStaff, 'id'>>({
    branchId: 'branch_1',
    name: '',
    phone: '',
    role: 'Setup Crew',
    status: 'Available',
    experience: '2 Years',
    skills: ['Setup', 'Loading'],
    joinDate: new Date().toISOString().split('T')[0],
    photoUrl: PRESET_AVATARS[6].url,
    isActive: true,
    notes: '',
    performance: {
      eventsHandled: 0,
      dispatchesCompleted: 0,
      maintenanceCompleted: 0,
      attendanceScore: 92,
      reliabilityScore: 90
    },
    assignedEventIds: [],
    assignedDispatchIds: [],
    assignedMaintenanceIds: []
  });

  // --- Parse Raw Database Staff into Extended Database Schema ---
  const staffMembers = useMemo<ExtendedStaff[]>(() => {
    return rawStaff.map((s: any) => {
      // Build safe fallback stats
      const experienceFallback = s.experience || "2 Years";
      const skillsFallback = Array.isArray(s.skills) ? s.skills : ["Setup", "Loading"];
      const joinDateFallback = s.joinDate || "2024-01-01";
      const photoFallback = s.photoUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80";
      const statusFallback = s.status || (s.isActive ? "Available" : "Inactive");
      
      const performanceFallback = s.performance || {
        eventsHandled: Math.floor(Math.random() * 20) + 10,
        dispatchesCompleted: Math.floor(Math.random() * 15) + 5,
        maintenanceCompleted: Math.floor(Math.random() * 12) + 2,
        attendanceScore: Math.floor(Math.random() * 15) + 85,
        reliabilityScore: Math.floor(Math.random() * 12) + 88
      };

      const assignedEventIdsFallback = Array.isArray(s.assignedEventIds) ? s.assignedEventIds : [];
      const assignedDispatchIdsFallback = Array.isArray(s.assignedDispatchIds) ? s.assignedDispatchIds : [];
      const assignedMaintenanceIdsFallback = Array.isArray(s.assignedMaintenanceIds) ? s.assignedMaintenanceIds : [];

      return {
        id: s.id,
        branchId: s.branchId || 'branch_1',
        name: s.name,
        phone: s.phone,
        role: s.role || 'Setup Crew',
        status: statusFallback,
        experience: experienceFallback,
        skills: skillsFallback,
        joinDate: joinDateFallback,
        photoUrl: photoFallback,
        isActive: s.isActive !== undefined ? s.isActive : statusFallback !== 'Inactive',
        notes: s.notes || '',
        performance: performanceFallback,
        assignedEventIds: assignedEventIdsFallback,
        assignedDispatchIds: assignedDispatchIdsFallback,
        assignedMaintenanceIds: assignedMaintenanceIdsFallback
      };
    });
  }, [rawStaff]);

  // --- Aggregate Performance Scores & Health Metrics ---
  const aggregates = useMemo(() => {
    if (staffMembers.length === 0) {
      return {
        total: 0,
        available: 0,
        assigned: 0,
        onEvent: 0,
        onLeaveAll: 0,
        avgAttendance: 0,
        avgReliability: 0
      };
    }
    const av = staffMembers.filter(s => s.status === 'Available').length;
    const as = staffMembers.filter(s => s.status === 'Assigned').length;
    const oe = staffMembers.filter(s => s.status === 'On Event').length;
    const ol = staffMembers.filter(s => s.status === 'On Leave' || s.status === 'Inactive').length;
    
    const totAttendance = staffMembers.reduce((sum, s) => sum + s.performance.attendanceScore, 0);
    const totReliability = staffMembers.reduce((sum, s) => sum + s.performance.reliabilityScore, 0);

    return {
      total: staffMembers.length,
      available: av,
      assigned: as,
      onEvent: oe,
      onLeaveAll: ol,
      avgAttendance: Math.round(totAttendance / staffMembers.length),
      avgReliability: Math.round(totReliability / staffMembers.length)
    };
  }, [staffMembers]);

  // --- Filtered and Sorted Staff Members ---
  const filteredStaff = useMemo(() => {
    return staffMembers.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            s.phone.includes(searchTerm) || 
                            s.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRole = roleFilter === 'ALL' || s.role.toLowerCase() === roleFilter.toLowerCase();
      const matchesStatus = statusFilter === 'ALL' || s.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesRole && matchesStatus;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'joinDate') {
        comparison = a.joinDate.localeCompare(b.joinDate);
      } else if (sortBy === 'experience') {
        const parseExp = (str: string) => parseInt(str) || 0;
        comparison = parseExp(a.experience) - parseExp(b.experience);
      } else if (sortBy === 'attendance') {
        comparison = a.performance.attendanceScore - b.performance.attendanceScore;
      } else if (sortBy === 'reliability') {
        comparison = a.performance.reliabilityScore - b.performance.reliabilityScore;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [staffMembers, searchTerm, roleFilter, statusFilter, sortBy, sortOrder]);

  // --- Paginated Staff ---
  const paginatedStaff = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStaff.slice(start, start + itemsPerPage);
  }, [filteredStaff, currentPage]);

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  // --- Mutations ---
  const saveStaffMutation = useMutation({
    mutationFn: async (staff: any) => {
      if (staff.id) {
        return StaffService.update(staff.id, staff as any);
      } else {
        return StaffService.create(staff as any);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      setIsSaving(false);
      setIsNewStaffModalOpen(false);
    },
    onError: (err) => {
      console.error("Mutation failed for staff setup:", err);
      setIsSaving(false);
    }
  });

  const deleteStaffMutation = useMutation({
    mutationFn: async (id: string) => {
      return StaffService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      setSelectedStaff(null);
    }
  });

  // --- Interaction Handlers ---
  const handleAddNewStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.phone.trim()) {
      alert("Naam aur Mobile Number fill karna anivaarya hai!");
      return;
    }
    setIsSaving(true);
    
    const tempId = `staff_${Date.now()}`;
    await saveStaffMutation.mutateAsync({
      id: tempId,
      branchId: newStaff.branchId,
      name: newStaff.name,
      phone: newStaff.phone,
      role: newStaff.role as any,
      status: newStaff.status,
      experience: newStaff.experience,
      skills: newStaff.skills,
      joinDate: newStaff.joinDate,
      photoUrl: newStaff.photoUrl,
      isActive: newStaff.status !== 'Inactive',
      notes: newStaff.notes,
      performance: newStaff.performance,
      assignedEventIds: newStaff.assignedEventIds,
      assignedDispatchIds: newStaff.assignedDispatchIds,
      assignedMaintenanceIds: newStaff.assignedMaintenanceIds
    });

    // Reset Form
    setNewStaff({
      branchId: 'branch_1',
      name: '',
      phone: '',
      role: 'Setup Crew',
      status: 'Available',
      experience: '2 Years',
      skills: ['Setup'],
      joinDate: new Date().toISOString().split('T')[0],
      photoUrl: PRESET_AVATARS[6].url,
      isActive: true,
      notes: '',
      performance: {
        eventsHandled: 0,
        dispatchesCompleted: 0,
        maintenanceCompleted: 0,
        attendanceScore: 90,
        reliabilityScore: 90
      },
      assignedEventIds: [],
      assignedDispatchIds: [],
      assignedMaintenanceIds: []
    });
  };

  const handleUpdateNotes = async (updatedNotes: string) => {
    if (!selectedStaff) return;
    const updated = {
      ...selectedStaff,
      notes: updatedNotes
    };
    setSelectedStaff(updated);
    await StaffService.update(selectedStaff.id, { notes: updatedNotes } as any);
    queryClient.invalidateQueries({ queryKey: ["staff"] });
  };

  // --- Assignment Handlers ---
  const handleAddAssignment = async (type: 'event' | 'dispatch' | 'maintenance', id: string) => {
    if (!selectedStaff || !id) return;

    let updatedEventIds = [...selectedStaff.assignedEventIds];
    let updatedDispatchIds = [...selectedStaff.assignedDispatchIds];
    let updatedMaintenanceIds = [...selectedStaff.assignedMaintenanceIds];

    if (type === 'event') {
      if (updatedEventIds.includes(id)) return;
      updatedEventIds.push(id);
    } else if (type === 'dispatch') {
      if (updatedDispatchIds.includes(id)) return;
      updatedDispatchIds.push(id);
    } else if (type === 'maintenance') {
      if (updatedMaintenanceIds.includes(id)) return;
      updatedMaintenanceIds.push(id);
    }

    const updatedStatus = "Assigned";
    const updated = {
      ...selectedStaff,
      status: updatedStatus,
      assignedEventIds: updatedEventIds,
      assignedDispatchIds: updatedDispatchIds,
      assignedMaintenanceIds: updatedMaintenanceIds,
      performance: {
        ...selectedStaff.performance,
        eventsHandled: type === 'event' ? selectedStaff.performance.eventsHandled + 1 : selectedStaff.performance.eventsHandled,
        dispatchesCompleted: type === 'dispatch' ? selectedStaff.performance.dispatchesCompleted + 1 : selectedStaff.performance.dispatchesCompleted,
        maintenanceCompleted: type === 'maintenance' ? selectedStaff.performance.maintenanceCompleted + 1 : selectedStaff.performance.maintenanceCompleted
      }
    };

    setSelectedStaff(updated);
    await StaffService.update(selectedStaff.id, updated as any);
    queryClient.invalidateQueries({ queryKey: ["staff"] });
  };

  const handleRemoveAssignment = async (type: 'event' | 'dispatch' | 'maintenance', id: string) => {
    if (!selectedStaff) return;

    let updatedEventIds = selectedStaff.assignedEventIds.filter(x => x !== id);
    let updatedDispatchIds = selectedStaff.assignedDispatchIds.filter(x => x !== id);
    let updatedMaintenanceIds = selectedStaff.assignedMaintenanceIds.filter(x => x !== id);

    const hasLoad = updatedEventIds.length > 0 || updatedDispatchIds.length > 0 || updatedMaintenanceIds.length > 0;
    const updatedStatus = hasLoad ? "Assigned" : "Available";

    const updated = {
      ...selectedStaff,
      status: updatedStatus,
      assignedEventIds: updatedEventIds,
      assignedDispatchIds: updatedDispatchIds,
      assignedMaintenanceIds: updatedMaintenanceIds
    };

    setSelectedStaff(updated);
    await StaffService.update(selectedStaff.id, updated as any);
    queryClient.invalidateQueries({ queryKey: ["staff"] });
  };

  const handleUpdateStatus = async (newStat: string) => {
    if (!selectedStaff) return;
    const updated = {
      ...selectedStaff,
      status: newStat,
      isActive: newStat !== 'Inactive'
    };
    setSelectedStaff(updated);
    await StaffService.update(selectedStaff.id, { status: newStat, isActive: newStat !== 'Inactive' } as any);
    queryClient.invalidateQueries({ queryKey: ["staff"] });
  };

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // --- Initialize Seeding ---
  const handleSeedMockStaff = async () => {
    setIsSaving(true);
    const mockSeedList = [
      {
        id: "staff_se_1",
        branchId: "branch_1",
        name: "Ramesh Sharma",
        phone: "+919560112233",
        role: "Supervisor",
        status: "Available",
        experience: "5 Years",
        skills: ["Setup", "Lighting", "Decoration"],
        joinDate: "2021-03-12",
        photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80",
        isActive: true,
        notes: "Highly reliable event site coordinator. Leads setup crews elegantly.",
        performance: {
          eventsHandled: 84,
          dispatchesCompleted: 45,
          maintenanceCompleted: 15,
          attendanceScore: 98,
          reliabilityScore: 96
        },
        assignedEventIds: [],
        assignedDispatchIds: [],
        assignedMaintenanceIds: []
      },
      {
        id: "staff_se_2",
        branchId: "branch_1",
        name: "Vikram Singh",
        phone: "+919452093412",
        role: "Setup Crew",
        status: "Available",
        experience: "3 Years",
        skills: ["Loading", "Setup", "Returns"],
        joinDate: "2022-09-01",
        photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
        isActive: true,
        notes: "Expert in heavy trussing setups and premium fabric drapes.",
        performance: {
          eventsHandled: 52,
          dispatchesCompleted: 38,
          maintenanceCompleted: 4,
          attendanceScore: 91,
          reliabilityScore: 94
        },
        assignedEventIds: [],
        assignedDispatchIds: [],
        assignedMaintenanceIds: []
      },
      {
        id: "staff_se_3",
        branchId: "branch_1",
        name: "Abhishek Yadav",
        phone: "+919988112275",
        role: "Logistics Crew",
        status: "Available",
        experience: "4 Years",
        skills: ["Heavy Vehicles", "Loading", "Returns"],
        joinDate: "2020-11-15",
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
        isActive: true,
        notes: "Owns heavy loading license. On-time dispatch driver with exemplary feedback.",
        performance: {
          eventsHandled: 120,
          dispatchesCompleted: 115,
          maintenanceCompleted: 9,
          attendanceScore: 96,
          reliabilityScore: 97
        },
        assignedEventIds: [],
        assignedDispatchIds: [],
        assignedMaintenanceIds: []
      },
      {
        id: "staff_se_4",
        branchId: "branch_1",
        name: "Sanjay Mishra",
        phone: "+919129002244",
        role: "Catering Crew",
        status: "Available",
        experience: "6 Years",
        skills: ["Catering Support", "Decoration"],
        joinDate: "2020-01-20",
        photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&q=80",
        isActive: true,
        notes: "Superb buffet management coordinator. Handpicks dining servers.",
        performance: {
          eventsHandled: 104,
          dispatchesCompleted: 0,
          maintenanceCompleted: 35,
          attendanceScore: 94,
          reliabilityScore: 95
        },
        assignedEventIds: [],
        assignedDispatchIds: [],
        assignedMaintenanceIds: []
      }
    ];

    for (const member of mockSeedList) {
      await StaffService.create(member as any);
    }
    
    if (staffMembers.length === 0) {
      await StaffService.create({
        id: "staff_1",
        branchId: "branch_1",
        name: "Pawan Kumar",
        phone: "+919452460040",
        role: "Owner" as any,
        status: "Available",
        experience: "7 Years",
        skills: ["Customer Briefing", "Setup"],
        joinDate: "2019-01-01",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
        isActive: true,
        notes: "Principal Founder of Om Tent House.",
        performance: { eventsHandled: 240, dispatchesCompleted: 180, maintenanceCompleted: 70, attendanceScore: 100, reliabilityScore: 100 },
        assignedEventIds: [], assignedDispatchIds: [], assignedMaintenanceIds: []
      } as any);
      await StaffService.create({
        id: "staff_2",
        branchId: "branch_1",
        name: "Gopal Kumar",
        phone: "+919653011551",
        role: "Owner" as any,
        status: "Available",
        experience: "7 Years",
        skills: ["Customer Briefing", "Catering Support"],
        joinDate: "2019-01-01",
        photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&q=80",
        isActive: true,
        notes: "Co-Owner & Catering Quality Control In-Charge.",
        performance: { eventsHandled: 230, dispatchesCompleted: 140, maintenanceCompleted: 65, attendanceScore: 100, reliabilityScore: 100 },
        assignedEventIds: [], assignedDispatchIds: [], assignedMaintenanceIds: []
      } as any);
    }

    queryClient.invalidateQueries({ queryKey: ["staff"] });
    setIsSaving(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'border-emerald-500 text-emerald-400 bg-emerald-500/10';
      case 'Assigned': return 'border-indigo-500 text-indigo-400 bg-indigo-500/10';
      case 'On Event': return 'border-[var(--color-brand)] text-[var(--color-brand)] bg-[var(--color-brand)]/10';
      case 'On Leave': return 'border-amber-500 text-amber-400 bg-amber-500/10';
      case 'Inactive': return 'border-rose-500 text-rose-400 bg-rose-500/10';
      default: return 'border-white/10 text-white bg-white/5';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/25';
      case 'Manager': return 'bg-teal-500/10 text-teal-400 border border-teal-500/25';
      case 'Supervisor': return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25';
      case 'Setup Crew': return 'bg-orange-500/10 text-orange-400 border border-orange-500/25';
      case 'Logistics Crew': return 'bg-purple-500/10 text-purple-400 border border-purple-500/25';
      case 'Catering Crew': return 'bg-rose-500/10 text-rose-400 border border-rose-500/25';
      default: return 'bg-stone-500/10 text-stone-300 border border-stone-500/20';
    }
  };

  return (
    <Container className="py-8 space-y-8 lg:p-10 select-none">
      
      {/* ================= PAGE HEADER ================= */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <Heading level={2} className="mb-2">Staff & Operations Management</Heading>
          <p className="text-[var(--color-text-muted)] tracking-wide">
            Track elite Sonbhadra crew schedules, manage logistic roles, and execute dynamic event allocations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {staffMembers.length === 0 && (
            <Button 
              variant="secondary" 
              onClick={handleSeedMockStaff}
              disabled={isSaving}
              className="flex items-center gap-2 text-sm border-amber-500/30 text-amber-400 hover:bg-amber-500/5 px-4"
            >
              <Activity className="w-4 h-4 animate-pulse" /> Seed Premium Crew
            </Button>
          )}
          <Button 
            variant="primary" 
            onClick={() => setIsNewStaffModalOpen(true)}
            className="flex items-center gap-2 text-sm px-4"
          >
            <UserPlus size={16} /> New Crew Member
          </Button>
        </div>
      </header>

      {/* ================= PERFORMANCE DASHBOARD (SECTION 7) ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Handpicked Crew"
          value={aggregates.total.toString()}
          icon={<Users className="text-[var(--color-brand)]" size={20} />}
        />
        <StatCard
          label="Available Now"
          value={aggregates.available.toString()}
          icon={<UserCheck2 className="text-emerald-400" size={20} />}
        />
        <StatCard
          label="Assigned / On Venue"
          value={(aggregates.assigned + aggregates.onEvent).toString()}
          icon={<Activity className="text-indigo-400" size={20} />}
        />
        <StatCard
          label="Average Trust Rating"
          value={`${aggregates.avgReliability}% Reliability`}
          icon={<Star className="text-amber-400 fill-amber-400" size={20} />}
        />
      </section>

      {/* ================= ACTIONS BAR (SECTION 2 SEARCH/SORT/FILTER) ================= */}
      <GlassPanel intensity="ambient" className="p-4 md:p-6 flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--color-slate-obsidian)] border border-white/5 rounded-none">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={16} />
          <input 
            type="text" 
            placeholder="Search by Name, Skills, or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          {/* Filter Role */}
          <div className="flex items-center gap-2 bg-white/5 px-2 py-1.5 rounded border border-white/10">
            <Shield size={14} className="text-stone-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent border-none text-xs text-stone-300 focus:outline-none cursor-pointer pr-4"
            >
              <option value="ALL">All Roles</option>
              {ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Filter Status */}
          <div className="flex items-center gap-2 bg-white/5 px-2 py-1.5 rounded border border-white/10">
            <Activity size={14} className="text-stone-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-xs text-stone-300 focus:outline-none cursor-pointer pr-4"
            >
              <option value="ALL">All Statuses</option>
              {STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Sorting Controller */}
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded border border-white/10 text-xs">
            <span className="text-stone-400">Sort:</span>
            <button 
              onClick={() => toggleSort('name')} 
              className={`px-1.5 py-0.5 rounded ${sortBy === 'name' ? 'text-[var(--color-brand)] font-semibold' : 'text-stone-400 hover:text-white'}`}
            >
              Name
            </button>
            <button 
              onClick={() => toggleSort('experience')} 
              className={`px-1.5 py-0.5 rounded ${sortBy === 'experience' ? 'text-[var(--color-brand)] font-semibold' : 'text-stone-400 hover:text-white'}`}
            >
              Exp
            </button>
            <button 
              onClick={() => toggleSort('reliability')} 
              className={`px-1.5 py-0.5 rounded ${sortBy === 'reliability' ? 'text-[var(--color-brand)] font-semibold' : 'text-stone-400 hover:text-white'}`}
            >
              Trust
            </button>
            
            <button 
              onClick={() => setSortOrder(p => p === 'asc' ? 'desc' : 'asc')}
              className="ml-2 pl-2 border-l border-white/10 text-[var(--color-brand)]"
              title={`Currently ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

        </div>

      </GlassPanel>

      {/* ================= STAFF DIRECTORY GRID (SECTION 2) ================= */}
      {loadingStaff ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-[var(--color-brand)] animate-spin"></div>
        </div>
      ) : staffMembers.length === 0 ? (
        <GlassPanel intensity="ambient" className="p-12 text-center border border-dashed border-white/10">
          <Users className="w-12 h-12 text-stone-500 mx-auto mb-4" />
          <Heading level={3} className="text-xl text-stone-300 font-serif mb-2">Pakee Records Kuchh Nahi Mile</Heading>
          <p className="text-stone-500 max-w-md mx-auto text-sm mb-6">
            Database looks clean. Humare authentic predefined elite staff profiles load karne ke liye seed options use kijiye.
          </p>
          <Button variant="secondary" onClick={handleSeedMockStaff}>
            Seed Default Staff Directory
          </Button>
        </GlassPanel>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedStaff.map((staff) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff)}
                  className="group cursor-pointer bg-[var(--color-slate-obsidian)] border border-white/5 hover:border-[var(--color-brand)]/40 p-5 rounded-none hover:shadow-[0_4px_25px_rgba(212,175,55,0.06)] transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  
                  {/* Photo & Role Header */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 shrink-0">
                      <img 
                        src={staff.photoUrl} 
                        alt={staff.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {/* Active Status Indicator Light */}
                      <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-slate-midnight)] ${
                        staff.status === 'Available' ? 'bg-emerald-500' :
                        staff.status === 'On Event' ? 'bg-[var(--color-brand)]' :
                        staff.status === 'On Leave' ? 'bg-amber-500' : 'bg-stone-500'
                      }`} />
                    </div>
                    
                    <div className="overflow-hidden">
                      <h3 className="font-serif text-base font-semibold text-white tracking-wide truncate group-hover:text-[var(--color-brand)] transition-colors">
                        {staff.name}
                      </h3>
                      <p className="text-xs text-stone-300/80 mt-1 font-mono flex items-center gap-1.5">
                        <Phone size={11} className="text-[var(--color-brand)] shrink-0" />
                        <span>{staff.phone}</span>
                      </p>
                      
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        <Badge className={`${getRoleColor(staff.role)} text-[10px] uppercase font-mono px-2 py-0.5`}>
                          {staff.role}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Skills/Join indicators */}
                  <div className="border-t border-white/5 pt-3.5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500">Exp:</span>
                      <span className="text-stone-300 font-medium">{staff.experience}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500">Reliability Index:</span>
                      <span className="text-amber-400 font-mono font-medium flex items-center gap-1">
                        <Star size={11} className="fill-amber-400" />
                        {staff.performance.reliabilityScore}%
                      </span>
                    </div>

                    {/* Quick Skills list tags */}
                    <div className="flex flex-wrap gap-1 max-h-12 overflow-hidden">
                      {staff.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="text-[9px] bg-white/5 border border-white/10 text-stone-400 px-1.5 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                      {staff.skills.length > 3 && (
                        <span className="text-[9px] text-stone-500 font-mono font-bold align-middle pl-1 self-center">
                          +{staff.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button Footer */}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono tracking-wider text-right text-stone-500 group-hover:text-[var(--color-brand)] transition-colors">
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest">{staff.status}</span>
                    <span className="inline-flex items-center gap-1">
                      Manage Workspace <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-xs text-stone-500 font-mono">
                Showing Page {currentPage} of {totalPages} ({filteredStaff.length} results)
              </span>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-2 border-white/10 text-stone-400"
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  variant="secondary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="p-2 border-white/10 text-stone-400"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= SECTION 5 — STAFF PROFILE DRAWER (Slide Out Panel) ================= */}
      <AnimatePresence>
        {selectedStaff && (
          <>
            {/* Backdrop Shading overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStaff(null)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Slider container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-[var(--color-slate-midnight)] border-l border-white/10 z-[60] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-y-auto flex flex-col justify-between select-none"
            >
              
              {/* Profile Drawer Header */}
              <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-[var(--color-slate-obsidian)]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-[var(--color-brand)]/20">
                    <img src={selectedStaff.photoUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-white leading-tight">{selectedStaff.name}</h2>
                    <p className="text-xs text-stone-400 font-mono mt-1 pr-6 flex items-center gap-1.5">
                      <Badge className={`${getRoleColor(selectedStaff.role)} text-[9px] uppercase tracking-wider`}>
                        {selectedStaff.role}
                      </Badge>
                      <Badge className={`${getStatusColor(selectedStaff.status)} text-[9px] uppercase tracking-wider`}>
                        {selectedStaff.status}
                      </Badge>
                    </p>
                  </div>
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedStaff(null)}
                  className="p-2 rounded hover:bg-white/5 border border-white/5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Profile Drawer Contents */}
              <div className="p-6 md:p-8 flex-1 space-y-8 overflow-y-auto">

                {/* Grid 1: Personal Info Card */}
                <GlassPanel intensity="ambient" className="p-5 border border-white/5 space-y-4 rounded-none bg-[var(--color-slate-obsidian)]">
                  <h3 className="text-overline text-[var(--color-brand)] flex items-center gap-2">
                    <User size={13} /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-stone-500">Phone Number:</span>
                      <a href={`tel:${selectedStaff.phone}`} className="text-[var(--color-brand)] font-medium font-mono hover:underline">{selectedStaff.phone}</a>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-stone-500">Experience Profile:</span>
                      <span className="text-stone-300 font-medium">{selectedStaff.experience}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-stone-500">Join Date:</span>
                      <span className="text-stone-300 font-medium font-mono">{selectedStaff.joinDate}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-stone-500">Branch Location:</span>
                      <span className="text-stone-300 font-medium">Auri (Hub HQ)</span>
                    </div>
                  </div>

                  {/* Skills tags selection view */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-stone-500 block uppercase mb-1.5">Registered Skill Proficiency:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedStaff.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-white/5 border border-white/10 text-stone-300 px-2.5 py-1 rounded inline-flex items-center gap-1.5">
                          <Check size={12} className="text-emerald-400" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Manual Status Quick Change Operations */}
                  <div className="pt-3 border-t border-white/5">
                    <span className="text-[10px] font-mono text-stone-500 block uppercase mb-2">Assign Duty Presence Status:</span>
                    <div className="flex flex-wrap gap-2">
                      {STATUSES.map(st => (
                        <button
                          key={st}
                          onClick={() => handleUpdateStatus(st)}
                          className={`text-xs px-3 py-1.5 border transition-colors cursor-pointer capitalize rounded-sm ${
                            selectedStaff.status === st 
                              ? 'border-[var(--color-brand)] text-[var(--color-brand)] bg-[var(--color-brand)]/5'
                              : 'border-white/10 text-stone-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {st === 'On Event' ? 'On Event (Active)' : st}
                        </button>
                      ))}
                    </div>
                  </div>
                </GlassPanel>

                {/* Grid 2: Performance Metrics (SECTION 7) */}
                <GlassPanel intensity="ambient" className="p-5 border border-white/5 space-y-4 rounded-none bg-[var(--color-slate-obsidian)]">
                  <h3 className="text-overline text-amber-400 flex items-center gap-2">
                    <Award size={13} /> Elite Metrics & Reliability Scores
                  </h3>
                  
                  {/* Attendance & Reliability Progress Indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Attendance */}
                    <div className="bg-white/2 p-3.5 border border-white/5 rounded-sm">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-stone-400 flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Attendance Score
                        </span>
                        <span className="font-mono font-bold text-emerald-400">{selectedStaff.performance.attendanceScore}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" 
                          style={{ width: `${selectedStaff.performance.attendanceScore}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-stone-500 mt-2">Perfect attendance ensures seamless loading & dispatch timing.</p>
                    </div>

                    {/* Reliability */}
                    <div className="bg-white/2 p-3.5 border border-white/5 rounded-sm">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-stone-400 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Crew Reliability Ratio
                        </span>
                        <span className="font-mono font-bold text-amber-400">{selectedStaff.performance.reliabilityScore}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500" 
                          style={{ width: `${selectedStaff.performance.reliabilityScore}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-stone-500 mt-2">Calculated dynamically based on on-time event setup reports.</p>
                    </div>

                  </div>

                  {/* Quantitative Stats Counters */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-white/2 border border-white/5 rounded-sm">
                      <span className="block text-2xl font-serif text-white">{selectedStaff.performance.eventsHandled}</span>
                      <span className="text-[10px] text-stone-500 tracking-wider uppercase mt-1 block">Events Setup</span>
                    </div>
                    <div className="p-3 bg-white/2 border border-white/5 rounded-sm">
                      <span className="block text-2xl font-serif text-white">{selectedStaff.performance.dispatchesCompleted}</span>
                      <span className="text-[10px] text-stone-500 tracking-wider uppercase mt-1 block">Dispatches</span>
                    </div>
                    <div className="p-3 bg-white/2 border border-white/5 rounded-sm">
                      <span className="block text-2xl font-serif text-white">{selectedStaff.performance.maintenanceCompleted}</span>
                      <span className="text-[10px] text-stone-500 tracking-wider uppercase mt-1 block">Repairs Done</span>
                    </div>
                  </div>

                </GlassPanel>

                {/* Grid 3: Active Assignments Workload & Assignment Management (SECTION 5 & 6) */}
                <GlassPanel intensity="ambient" className="p-5 border border-white/5 space-y-6 rounded-none bg-[var(--color-slate-obsidian)]">
                  
                  <div>
                    <h3 className="text-overline text-indigo-400 flex items-center gap-1.5 mb-1">
                      <Briefcase size={13} /> Active Operational Resource Allocation
                    </h3>
                    <p className="text-[10px] text-stone-500">Assign this member to upcoming logistical items directly below:</p>
                  </div>

                  {/* 1. Assign to upcoming Events */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold text-white block">A. Assign To Event Setup</span>
                    <div className="flex gap-2">
                      <select 
                        id="event-assign-selector" 
                        defaultValue=""
                        className="flex-1 bg-white/5 border border-white/10 text-xs text-stone-300 p-2.5 rounded focus:outline-none focus:border-[var(--color-brand)] cursor-pointer"
                      >
                        <option value="" disabled>Select an upcoming event...</option>
                        {events.map(ev => (
                          <option key={ev.id} value={ev.id}>
                            {ev.type} • {ev.venueDetails} ({ev.eventDate.split('T')[0]})
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          const selector = document.getElementById('event-assign-selector') as HTMLSelectElement;
                          if (selector && selector.value) {
                            handleAddAssignment('event', selector.value);
                            selector.value = "";
                          }
                        }}
                        className="px-3 border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)]/5 text-xs py-2 h-auto"
                      >
                        Assign Setup
                      </Button>
                    </div>

                    {/* Active Assigned Event Badges with removal triggers */}
                    <div className="space-y-1.5 pt-1">
                      {selectedStaff.assignedEventIds.length === 0 ? (
                        <p className="text-xs text-stone-500 italic">No event setup currently assigned.</p>
                      ) : (
                        selectedStaff.assignedEventIds.map(eId => {
                          const ev = events.find(x => x.id === eId);
                          return (
                            <div key={eId} className="flex items-center justify-between text-xs bg-indigo-500/5 border border-indigo-500/10 p-2.5 rounded-sm">
                              <span className="text-stone-300 font-medium">
                                {ev ? `${ev.type} at ${ev.venueDetails}` : `Event Profile ${eId}`}
                              </span>
                              <button 
                                onClick={() => handleRemoveAssignment('event', eId)}
                                className="p-1 rounded hover:bg-rose-500/10 text-stone-400 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Remove allocation"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* 2. Assign to Dispatches */}
                  <div className="space-y-2.5 border-t border-white/5 pt-4">
                    <span className="text-xs font-semibold text-white block">B. Assign To Transport Dispatch</span>
                    <div className="flex gap-2">
                      <select 
                        id="dispatch-assign-selector" 
                        defaultValue=""
                        className="flex-1 bg-white/5 border border-white/10 text-xs text-stone-300 p-2.5 rounded focus:outline-none focus:border-[var(--color-brand)] cursor-pointer"
                      >
                        <option value="" disabled>Select dispatch batch...</option>
                        {dispatches.map(disp => {
                          const matchedEv = events.find(x => x.id === disp.eventId);
                          return (
                            <option key={disp.id} value={disp.id}>
                              {disp.id.toUpperCase()} • To {matchedEv ? matchedEv.venueDetails : "Event site"} ({disp.status})
                            </option>
                          );
                        })}
                      </select>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          const selector = document.getElementById('dispatch-assign-selector') as HTMLSelectElement;
                          if (selector && selector.value) {
                            handleAddAssignment('dispatch', selector.value);
                            selector.value = "";
                          }
                        }}
                        className="px-3 border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)]/5 text-xs py-2 h-auto"
                      >
                        Assign Dispatch
                      </Button>
                    </div>

                    {/* Active Assigned Dispatch History / list */}
                    <div className="space-y-1.5 pt-1">
                      {selectedStaff.assignedDispatchIds.length === 0 ? (
                        <p className="text-xs text-stone-500 italic">No transport dispatch currently assigned.</p>
                      ) : (
                        selectedStaff.assignedDispatchIds.map(dId => {
                          const disp = dispatches.find(x => x.id === dId);
                          const matchedEv = disp ? events.find(x => x.id === disp.eventId) : null;
                          return (
                            <div key={dId} className="flex items-center justify-between text-xs bg-purple-500/5 border border-purple-500/10 p-2.5 rounded-sm">
                              <span className="text-stone-300 font-medium font-mono">
                                {dId.toUpperCase()} {matchedEv ? `(Route: ${matchedEv.venueDetails})` : ""}
                              </span>
                              <button 
                                onClick={() => handleRemoveAssignment('dispatch', dId)}
                                className="p-1 rounded hover:bg-rose-500/10 text-stone-400 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Remove allocation"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* 3. Assign to Maintenance Tasks */}
                  <div className="space-y-2.5 border-t border-white/5 pt-4">
                    <span className="text-xs font-semibold text-white block">C. Assign To Maintenance & Repair Task</span>
                    <div className="flex gap-2">
                      <select 
                        id="maint-assign-selector" 
                        defaultValue=""
                        className="flex-1 bg-white/5 border border-white/10 text-xs text-stone-300 p-2.5 rounded focus:outline-none focus:border-[var(--color-brand)] cursor-pointer"
                      >
                        <option value="" disabled>Select active damage recovery item...</option>
                        {maintenanceList.map(m => (
                          <option key={m.id} value={m.id}>
                            {m.id.toUpperCase()} • Qty: {m.quantity} damaged ({m.issueType})
                          </option>
                        ))}
                      </select>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          const selector = document.getElementById('maint-assign-selector') as HTMLSelectElement;
                          if (selector && selector.value) {
                            handleAddAssignment('maintenance', selector.value);
                            selector.value = "";
                          }
                        }}
                        className="px-3 border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)]/5 text-xs py-2 h-auto"
                      >
                        Assign Repair
                      </Button>
                    </div>

                    {/* Active Assigned Maintenance List */}
                    <div className="space-y-1.5 pt-1">
                      {selectedStaff.assignedMaintenanceIds.length === 0 ? (
                        <p className="text-xs text-stone-500 italic">No active maintenance task assigned.</p>
                      ) : (
                        selectedStaff.assignedMaintenanceIds.map(mId => {
                          const mInfo = maintenanceList.find(x => x.id === mId);
                          return (
                            <div key={mId} className="flex items-center justify-between text-xs bg-amber-500/5 border border-amber-500/10 p-2.5 rounded-sm">
                              <span className="text-stone-300 font-medium font-mono">
                                {mId.toUpperCase()} {mInfo ? `(${mInfo.issueType} - Qty: ${mInfo.quantity})` : ""}
                              </span>
                              <button 
                                onClick={() => handleRemoveAssignment('maintenance', mId)}
                                className="p-1 rounded hover:bg-rose-500/10 text-stone-400 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Remove allocation"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                </GlassPanel>

                {/* Grid 4: Interactive Notes Panel */}
                <GlassPanel intensity="ambient" className="p-5 border border-white/5 space-y-3 rounded-none bg-[var(--color-slate-obsidian)]">
                  <h3 className="text-overline text-stone-300 flex items-center gap-1.5">
                    <FileText size={13} /> Logistical Supervisor Notes
                  </h3>
                  <p className="text-[10px] text-stone-500">Record specific field performance, special trussing/catering talent, and general commentary:</p>
                  <textarea
                    rows={4}
                    defaultValue={selectedStaff.notes}
                    onBlur={(e) => handleUpdateNotes(e.target.value)}
                    placeholder="E.g., Sanjay displays fantastic leadership skills during multi-staged buffer setups. Handled Anpara mega-wedding with 10 helpers seamlessly..."
                    className="w-full bg-[var(--color-slate-midnight)] border border-white/10 rounded p-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[var(--color-brand)] resize-none"
                  />
                  <div className="flex justify-between items-center text-[10px] text-stone-500 pt-1.5">
                    <span>* Changes save automatically on focus-out.</span>
                    <span className="text-[var(--color-brand)]">Notes synced with dynamic SQLite/Firestore</span>
                  </div>
                </GlassPanel>

              </div>

              {/* Profile Drawer Footer Actions (Delete operations) */}
              <div className="p-6 md:p-8 border-t border-white/10 bg-[var(--color-slate-obsidian)] flex justify-between items-center">
                <p className="text-xs text-stone-500 font-mono">
                  Database Record ID: <span className="text-stone-400 font-bold">{selectedStaff.id}</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`${selectedStaff.name} ko system se completely remove karna chahte hain?`)) {
                      deleteStaffMutation.mutate(selectedStaff.id);
                    }
                  }}
                  className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white px-3.5 py-2 text-xs uppercase font-mono tracking-wider transition-all duration-300 rounded border border-rose-500/20 active:scale-[0.98] cursor-pointer"
                >
                  <Trash2 size={13} /> Remove Record
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= SECTION 10 — CREATION NEW STAFF MODAL ================= */}
      <AnimatePresence>
        {isNewStaffModalOpen && (
          <>
            {/* Backdrop Shading */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewStaffModalOpen(false)}
              className="fixed inset-0 bg-black z-[100] pointer-events-auto"
            />

            {/* Modal Dialog Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-[var(--color-slate-midnight)] border border-white/10 z-[110] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] p-6 md:p-8 rounded-none overflow-hidden select-none"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                <div>
                  <Heading level={3} className="text-lg font-serif text-white">Add Elite Crew Member</Heading>
                  <p className="text-xs text-stone-500 mt-0.5">Register a trusted workforce resource under Om Tent House.</p>
                </div>
                <button 
                  onClick={() => setIsNewStaffModalOpen(false)}
                  className="p-1.5 rounded hover:bg-white/5 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Input Body */}
              <form onSubmit={handleAddNewStaff} className="space-y-4">
                
                {/* Crew Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-stone-300 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Sanjay Prasad Yadav"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                {/* Crew Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-stone-300 block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="E.g., +91 94520 XXXXX"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff(p => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>

                {/* Roles & Status Select row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300 block">Operational Role</label>
                    <select
                      value={newStaff.role}
                      onChange={(e) => setNewStaff(p => ({ ...p, role: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[var(--color-brand)] cursor-pointer"
                    >
                      {ROLES.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300 block">Duty Presence Status</label>
                    <select
                      value={newStaff.status}
                      onChange={(e) => setNewStaff(p => ({ ...p, status: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[var(--color-brand)] cursor-pointer"
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Experience & Join Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300 block">Experience Level</label>
                    <input
                      type="text"
                      placeholder="E.g., 3 Years"
                      value={newStaff.experience}
                      onChange={(e) => setNewStaff(p => ({ ...p, experience: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--color-brand)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300 block">Registration Join Date</label>
                    <input
                      type="date"
                      value={newStaff.joinDate}
                      onChange={(e) => setNewStaff(p => ({ ...p, joinDate: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[var(--color-brand)]"
                    />
                  </div>
                </div>

                {/* Interactive Avatar Select Selector (Photo selections preset) */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-mono text-stone-300 block">Select Professional Portrait Photo Selection</label>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
                    {PRESET_AVATARS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewStaff(p => ({ ...p, photoUrl: av.url }))}
                        className={`relative w-12 h-12 rounded-full overflow-hidden border shrink-0 transition-all ${
                          newStaff.photoUrl === av.url ? 'border-[var(--color-brand)] scale-110 !p-0.5' : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={av.url} alt="" className="w-full h-full object-cover rounded-full" />
                        {newStaff.photoUrl === av.url && (
                          <span className="absolute inset-0 bg-[var(--color-brand)]/20 flex items-center justify-center text-white">
                            <Check size={14} className="stroke-[3px]" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills Register Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-stone-300 block">Registered Skill Proficiencies (Select any)</label>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1.5 bg-white/2 border border-white/5 rounded">
                    {PREDEFINED_SKILLS.map((skill) => {
                      const selected = newStaff.skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            if (selected) {
                              setNewStaff(p => ({ ...p, skills: p.skills.filter(x => x !== skill) }));
                            } else {
                              setNewStaff(p => ({ ...p, skills: [...p.skills, skill] }));
                            }
                          }}
                          className={`text-xs px-2.5 py-1 transition-all rounded-sm cursor-pointer border ${
                            selected 
                              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                              : 'bg-white/5 border-white/10 text-stone-400 hover:text-white'
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Footer */}
                <div className="pt-4 border-t border-white/5 flex justify-end gap-3.5">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsNewStaffModalOpen(false)}
                    className="border-white/10 text-stone-400 hover:text-white text-xs px-4"
                  >
                    Discard Changes
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSaving}
                    className="text-xs px-4 flex items-center gap-1 bg-[var(--color-brand)] hover:bg-[var(--color-champagne)] font-semibold text-black"
                  >
                    {isSaving ? "Saving Workforce..." : "Submit Workforce Entry"}
                  </Button>
                </div>

              </form>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </Container>
  );
}
