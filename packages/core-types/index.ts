export type ID = string;
export type DateTimeString = string;

// --- Customer Domain ---
export interface Customer {
  id: ID;
  name: string;
  primaryPhone: string;
  altPhone?: string;
  whatsapp?: string;
  address?: string;
  createdAt: DateTimeString;
}

// --- Booking Domain ---
export enum BookingStatus {
  INQUIRY = 'INQUIRY',
  DRAFT = 'DRAFT',
  ADVANCE_PAID = 'ADVANCE_PAID',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Booking {
  id: ID;
  customerId: ID;
  branchId: ID;
  eventId: ID;
  status: BookingStatus;
  totalAmount: number;
  advancePaid: number;
  createdAt: DateTimeString;
}

// --- Event Domain ---
export enum EventType {
  WEDDING = 'WEDDING',
  RECEPTION = 'RECEPTION',
  BIRTHDAY = 'BIRTHDAY',
  CORPORATE = 'CORPORATE',
  SCHOOL = 'SCHOOL',
  RELIGIOUS = 'RELIGIOUS',
  OTHER = 'OTHER'
}

export interface Event {
  id: ID;
  bookingId: ID;
  type: EventType;
  venueDetails: string;
  locationCoordinates?: { lat: number; lng: number };
  setupStartDate: DateTimeString;
  eventDate: DateTimeString;
  teardownEndDate: DateTimeString;
  guestCount: number;
  menuId?: ID;
  assignedStaffIds: ID[];
}

// --- Inventory Domain ---
export interface InventoryCategory {
  id: ID;
  name: string;
  description?: string;
}

export enum TrackingMethod {
  BULK = 'BULK',
  SERIALIZED = 'SERIALIZED'
}

export interface InventoryItem {
  id: ID;
  categoryId: ID;
  branchId: ID;
  name: string;
  totalOwned: number;
  damagedQuantity: number;
  trackingMethod: TrackingMethod;
  imageUrl?: string;
}

export interface AllocationRecord {
  id: ID;
  eventId: ID;
  inventoryItemId: ID;
  quantityNeeded: number;
}

// Logistical Records
export enum DispatchStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED'
}

export interface DispatchRecord {
  id: ID;
  eventId: ID;
  status: DispatchStatus;
  dispatchedAt?: DateTimeString;
  items: { inventoryItemId: ID; quantityDispatched: number }[];
}

export enum ReturnStatus {
  PENDING = 'PENDING',
  PARTIALLY_RETURNED = 'PARTIALLY_RETURNED',
  FULLY_RETURNED = 'FULLY_RETURNED',
  RETURNED_WITH_DAMAGE = 'RETURNED_WITH_DAMAGE',
  RETURNED_WITH_LOSS = 'RETURNED_WITH_LOSS',
  INSPECTION = 'INSPECTION',
  CLEARED = 'CLEARED'
}

export interface ReturnRecord {
  id: ID;
  dispatchRecordId: ID;
  status: ReturnStatus;
  returnedAt?: DateTimeString;
  items: { inventoryItemId: ID; quantityReturned: number; quantityDamaged: number }[];
}

export enum DamageResolution {
  REPORTED = 'REPORTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  IN_REPAIR = 'IN_REPAIR',
  AWAITING_PARTS = 'AWAITING_PARTS',
  COMPLETED = 'COMPLETED',
  RETIRED = 'RETIRED'
}

export enum IssueClassification {
  BROKEN = 'BROKEN',
  DAMAGED = 'DAMAGED',
  MISSING_PARTS = 'MISSING_PARTS',
  CLEANING_REQUIRED = 'CLEANING_REQUIRED',
  INSPECTION_REQUIRED = 'INSPECTION_REQUIRED',
  REPLACEMENT_REQUIRED = 'REPLACEMENT_REQUIRED'
}

export interface DamageReport {
  id: ID;
  returnRecordId: ID;
  inventoryItemId: ID;
  quantity: number;
  issueType: IssueClassification;
  description: string;
  resolution: DamageResolution;
  assignedTechnician?: string;
  reportedAt: DateTimeString;
}

// --- Catering Domain ---
export interface Menu {
  id: ID;
  name: string;
  isTemplate: boolean;
}

export interface MenuSection {
  id: ID;
  menuId: ID;
  name: string;
  order: number;
}

export enum DietaryFlag {
  VEG = 'VEG',
  NON_VEG = 'NON_VEG',
  JAIN = 'JAIN'
}

export interface MenuItem {
  id: ID;
  sectionId: ID;
  name: string;
  description?: string;
  dietaryFlags: DietaryFlag[];
}

// --- Gallery Domain ---
export interface GalleryAlbum {
  id: ID;
  name: string;
  eventId?: ID;
  tags: string[];
  isFeatured: boolean;
  createdAt: DateTimeString;
}

export interface GalleryMedia {
  id: ID;
  albumId: ID;
  url: string;
  type: 'PHOTO' | 'VIDEO';
  caption?: string;
}

// --- Staff & Operations Domain ---
export enum StaffRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  INVENTORY_STAFF = 'INVENTORY_STAFF',
  OPERATIONS_STAFF = 'OPERATIONS_STAFF'
}

export interface StaffMember {
  id: ID;
  branchId: ID;
  name: string;
  phone: string;
  role: StaffRole;
  isActive: boolean;
}

export interface Branch {
  id: ID;
  name: string;
  location: string;
}

// --- Communication Domain ---
export interface Inquiry {
  id: ID;
  name: string;
  phone: string;
  eventType?: string;
  guestCount?: number;
  eventDate?: DateTimeString;
  notes?: string;
  createdAt: DateTimeString;
  isResolved: boolean;
}

