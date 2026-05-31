import { 
  Branch, StaffMember, Customer, Booking, Event, AllocationRecord, 
  InventoryCategory, InventoryItem, Inquiry, GalleryAlbum, GalleryMedia, 
  Menu, MenuSection, MenuItem, DispatchRecord, ReturnRecord, DamageReport 
} from '@om-tent/core-types';

import branchesJson from './branches.json';
import staffJson from './staff.json';
import customersJson from './customers.json';
import bookingsJson from './bookings.json';
import eventsJson from './events.json';
import inventoryJson from './inventory.json';
import inquiriesJson from './inquiries.json';
import galleryJson from './gallery.json';
import cateringJson from './catering.json';
import logisticsJson from './logistics.json';

export const mockBranches: Branch[] = branchesJson as Branch[];
export const mockStaff: StaffMember[] = staffJson as StaffMember[];
export const mockCustomers: Customer[] = customersJson as Customer[];
export const mockBookings: Booking[] = bookingsJson as Booking[];

export const mockEvents: Event[] = eventsJson.events as Event[];
export const mockAllocations: AllocationRecord[] = eventsJson.allocations as AllocationRecord[];

export const mockInventoryCategories: InventoryCategory[] = inventoryJson.categories as InventoryCategory[];
export const mockInventoryItems: InventoryItem[] = inventoryJson.items as InventoryItem[];

export const mockInquiries: Inquiry[] = inquiriesJson as Inquiry[];

export const mockGalleryAlbums: GalleryAlbum[] = galleryJson.albums as GalleryAlbum[];
export const mockGalleryMedia: GalleryMedia[] = galleryJson.media as GalleryMedia[];

export const mockMenus: Menu[] = cateringJson.menus as Menu[];
export const mockMenuSections: MenuSection[] = cateringJson.menuSections as MenuSection[];
export const mockMenuItems: MenuItem[] = cateringJson.menuItems as MenuItem[];

export const mockDispatchRecords: DispatchRecord[] = logisticsJson.dispatchRecords as DispatchRecord[];
export const mockReturnRecords: ReturnRecord[] = logisticsJson.returnRecords as ReturnRecord[];
export const mockDamageReports: DamageReport[] = logisticsJson.damageReports as DamageReport[];
