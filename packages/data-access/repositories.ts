import { BaseRepository } from "./BaseRepository";
import { 
  InventoryItem, 
  InventoryCategory,
  Booking, 
  Event, 
  Customer, 
  GalleryAlbum, 
  GalleryMedia,
  Menu, 
  StaffMember, 
  Inquiry,
  DispatchRecord,
  ReturnRecord,
  DamageReport
} from "@om-tent/core-types";

import { 
  mockInventoryItems, 
  mockInventoryCategories,
  mockBookings, 
  mockEvents, 
  mockCustomers, 
  mockGalleryAlbums, 
  mockGalleryMedia,
  mockMenus, 
  mockStaff, 
  mockInquiries,
  mockDispatchRecords,
  mockReturnRecords,
  mockDamageReports
} from "@om-tent/mock-data";

import { 
  FirestoreInventoryRepository,
  FirestoreBookingRepository,
  FirestoreDispatchRepository,
  FirestoreReturnsRepository,
  FirestoreMaintenanceRepository,
  FirestoreGalleryRepository,
  FirestoreGalleryMediaRepository,
  FirestoreCustomerRepository,
  FirestoreStaffRepository,
  FirestoreInventoryCategoryRepository,
  FirestoreEventRepository,
  FirestoreMenuRepository,
  FirestoreInquiryRepository
} from "./FirestoreRepositories";

// --- Mock Classes ---

export class InventoryRepositoryImpl extends BaseRepository<InventoryItem> {
  constructor() { super(mockInventoryItems); }
}

export class InventoryCategoryRepositoryImpl extends BaseRepository<InventoryCategory> {
  constructor() { super(mockInventoryCategories); }
}

export class BookingRepositoryImpl extends BaseRepository<Booking> {
  constructor() { super(mockBookings); }
}

export class EventRepositoryImpl extends BaseRepository<Event> {
  constructor() { super(mockEvents); }
}

export class CustomerRepositoryImpl extends BaseRepository<Customer> {
  constructor() { super(mockCustomers); }
}

export class GalleryRepositoryImpl extends BaseRepository<GalleryAlbum> {
  constructor() { super(mockGalleryAlbums); }
}

export class GalleryMediaRepositoryImpl extends BaseRepository<GalleryMedia> {
  constructor() { super(mockGalleryMedia); }
}

export class MenuRepositoryImpl extends BaseRepository<Menu> {
  constructor() { super(mockMenus); }
}

export class StaffRepositoryImpl extends BaseRepository<StaffMember> {
  constructor() { super(mockStaff); }
}

export class InquiryRepositoryImpl extends BaseRepository<Inquiry> {
  constructor() { super(mockInquiries); }
}

export class ReturnRecordRepositoryImpl extends BaseRepository<ReturnRecord> {
  constructor() { super(mockReturnRecords); }
}

export class DispatchRecordRepositoryImpl extends BaseRepository<DispatchRecord> {
  constructor() { super(mockDispatchRecords); }
}

export class DamageReportRepositoryImpl extends BaseRepository<DamageReport> {
  constructor() { super(mockDamageReports); }
}

// --- Repository Switching Factory ---

export const getRepositoryMode = () => {
  const useFirebase = (typeof import.meta !== 'undefined' && (import.meta as any).env && ((import.meta as any).env.VITE_USE_FIREBASE === 'true' || (import.meta as any).env.PROD)) || false;
  return useFirebase ? "firestore" : "mock";
};

const mode = getRepositoryMode();
console.log(`[Repository Factory] Initialized in ${mode.toUpperCase()} Mode`);

export const inventoryRepo = mode === "firestore" ? new FirestoreInventoryRepository() : new InventoryRepositoryImpl();
export const inventoryCategoryRepo = mode === "firestore" ? new FirestoreInventoryCategoryRepository() : new InventoryCategoryRepositoryImpl();
export const bookingRepo = mode === "firestore" ? new FirestoreBookingRepository() : new BookingRepositoryImpl();
export const eventRepo = mode === "firestore" ? new FirestoreEventRepository() : new EventRepositoryImpl();
export const customerRepo = mode === "firestore" ? new FirestoreCustomerRepository() : new CustomerRepositoryImpl();
export const galleryRepo = mode === "firestore" ? new FirestoreGalleryRepository() : new GalleryRepositoryImpl();
export const galleryMediaRepo = mode === "firestore" ? new FirestoreGalleryMediaRepository() : new GalleryMediaRepositoryImpl();
export const menuRepo = mode === "firestore" ? new FirestoreMenuRepository() : new MenuRepositoryImpl();
export const staffRepo = mode === "firestore" ? new FirestoreStaffRepository() : new StaffRepositoryImpl();
export const inquiryRepo = mode === "firestore" ? new FirestoreInquiryRepository() : new InquiryRepositoryImpl();
export const returnRecordRepo = mode === "firestore" ? new FirestoreReturnsRepository() : new ReturnRecordRepositoryImpl();
export const dispatchRecordRepo = mode === "firestore" ? new FirestoreDispatchRepository() : new DispatchRecordRepositoryImpl();
export const damageReportRepo = mode === "firestore" ? new FirestoreMaintenanceRepository() : new DamageReportRepositoryImpl();
