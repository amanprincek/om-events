import { BaseRepository } from "./BaseRepository";
import { 
  InventoryItem, 
  InventoryCategory,
  Booking, 
  Event, 
  Customer, 
  GalleryAlbum, 
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
  mockMenus, 
  mockStaff, 
  mockInquiries,
  mockDispatchRecords,
  mockReturnRecords,
  mockDamageReports
} from "@om-tent/mock-data";

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

export class MenuRepositoryImpl extends BaseRepository<Menu> {
  constructor() { super(mockMenus); }
}

export class StaffRepositoryImpl extends BaseRepository<StaffMember> {
  constructor() { super(mockStaff); }
}

export class InquiryRepositoryImpl extends BaseRepository<Inquiry> {
  constructor() { super(mockInquiries); }
}

// Singletons for the mock implementation
export const inventoryRepo = new InventoryRepositoryImpl();
export const inventoryCategoryRepo = new InventoryCategoryRepositoryImpl();
export const bookingRepo = new BookingRepositoryImpl();
export const eventRepo = new EventRepositoryImpl();
export const customerRepo = new CustomerRepositoryImpl();
export const galleryRepo = new GalleryRepositoryImpl();
export const menuRepo = new MenuRepositoryImpl();
export const staffRepo = new StaffRepositoryImpl();
export const inquiryRepo = new InquiryRepositoryImpl();

export class ReturnRecordRepositoryImpl extends BaseRepository<ReturnRecord> {
  constructor() { super(mockReturnRecords); }
}

export class DispatchRecordRepositoryImpl extends BaseRepository<DispatchRecord> {
  constructor() { super(mockDispatchRecords); }
}

export class DamageReportRepositoryImpl extends BaseRepository<DamageReport> {
  constructor() { super(mockDamageReports); }
}

export const returnRecordRepo = new ReturnRecordRepositoryImpl();
export const dispatchRecordRepo = new DispatchRecordRepositoryImpl();
export const damageReportRepo = new DamageReportRepositoryImpl();
