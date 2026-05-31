import { ID, BookingStatus, Booking } from "@om-tent/core-types";
import {
  inventoryRepo,
  inventoryCategoryRepo,
  bookingRepo,
  eventRepo,
  customerRepo,
  galleryRepo,
  menuRepo,
  staffRepo,
  inquiryRepo,
  returnRecordRepo,
  dispatchRecordRepo,
  damageReportRepo
} from "./repositories";

// The Service Layer acts as an orchestrator and holds business logic.
// Returning the repository calls for now.

export const InventoryService = {
  getAll: () => inventoryRepo.getAll(),
  getById: (id: ID) => inventoryRepo.getById(id),
  getCategories: () => inventoryCategoryRepo.getAll(),
  create: (data: Parameters<typeof inventoryRepo.create>[0]) => inventoryRepo.create(data),
  update: (id: ID, data: Parameters<typeof inventoryRepo.update>[1]) => inventoryRepo.update(id, data),
  delete: (id: ID) => inventoryRepo.delete(id),
};

export const BookingService = {
  getAll: () => bookingRepo.getAll(),
  getById: (id: ID) => bookingRepo.getById(id),
  create: (data: Parameters<typeof bookingRepo.create>[0]) => bookingRepo.create(data),
  update: (id: ID, data: Parameters<typeof bookingRepo.update>[1]) => bookingRepo.update(id, data),
  delete: (id: ID) => bookingRepo.delete(id),
  confirmBooking: async (id: ID) => {
    return bookingRepo.update(id, { status: BookingStatus.CONFIRMED });
  }
};

export const EventService = {
  getAll: () => eventRepo.getAll(),
  getById: (id: ID) => eventRepo.getById(id),
  create: (data: Parameters<typeof eventRepo.create>[0]) => eventRepo.create(data),
  update: (id: ID, data: Parameters<typeof eventRepo.update>[1]) => eventRepo.update(id, data),
  delete: (id: ID) => eventRepo.delete(id),
};

export const CustomerService = {
  getAll: () => customerRepo.getAll(),
  getById: (id: ID) => customerRepo.getById(id),
  create: (data: Parameters<typeof customerRepo.create>[0]) => customerRepo.create(data),
  update: (id: ID, data: Parameters<typeof customerRepo.update>[1]) => customerRepo.update(id, data),
  delete: (id: ID) => customerRepo.delete(id),
};

export const GalleryService = {
  getAll: () => galleryRepo.getAll(),
  getById: (id: ID) => galleryRepo.getById(id),
  create: (data: Parameters<typeof galleryRepo.create>[0]) => galleryRepo.create(data),
  update: (id: ID, data: Parameters<typeof galleryRepo.update>[1]) => galleryRepo.update(id, data),
  delete: (id: ID) => galleryRepo.delete(id),
};

export const MenuService = {
  getAll: () => menuRepo.getAll(),
  getById: (id: ID) => menuRepo.getById(id),
  create: (data: Parameters<typeof menuRepo.create>[0]) => menuRepo.create(data),
  update: (id: ID, data: Parameters<typeof menuRepo.update>[1]) => menuRepo.update(id, data),
  delete: (id: ID) => menuRepo.delete(id),
};

export const StaffService = {
  getAll: () => staffRepo.getAll(),
  getById: (id: ID) => staffRepo.getById(id),
  create: (data: Parameters<typeof staffRepo.create>[0]) => staffRepo.create(data),
  update: (id: ID, data: Parameters<typeof staffRepo.update>[1]) => staffRepo.update(id, data),
  delete: (id: ID) => staffRepo.delete(id),
};

export const InquiryService = {
  getAll: () => inquiryRepo.getAll(),
  getById: (id: ID) => inquiryRepo.getById(id),
  create: (data: Parameters<typeof inquiryRepo.create>[0]) => inquiryRepo.create(data),
  update: (id: ID, data: Parameters<typeof inquiryRepo.update>[1]) => inquiryRepo.update(id, data),
  delete: (id: ID) => inquiryRepo.delete(id),
  resolveInquiry: async (id: ID) => {
    return inquiryRepo.update(id, { isResolved: true });
  }
};

export const DispatchService = {
  getAll: () => dispatchRecordRepo.getAll(),
  getById: (id: ID) => dispatchRecordRepo.getById(id),
  create: (data: Parameters<typeof dispatchRecordRepo.create>[0]) => dispatchRecordRepo.create(data),
  update: (id: ID, data: Parameters<typeof dispatchRecordRepo.update>[1]) => dispatchRecordRepo.update(id, data),
  delete: (id: ID) => dispatchRecordRepo.delete(id),
};

export const LogisticsService = {
  getAllReturns: () => returnRecordRepo.getAll(),
  getReturnById: (id: ID) => returnRecordRepo.getById(id),
};

export const MaintenanceService = {
  getAll: () => damageReportRepo.getAll(),
  getById: (id: ID) => damageReportRepo.getById(id),
  create: (data: Parameters<typeof damageReportRepo.create>[0]) => damageReportRepo.create(data),
  update: (id: ID, data: Parameters<typeof damageReportRepo.update>[1]) => damageReportRepo.update(id, data),
  delete: (id: ID) => damageReportRepo.delete(id),
};
