import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ID } from "@om-tent/core-types";
import {
  InventoryService,
  BookingService,
  EventService,
  CustomerService,
  GalleryService,
  MenuService,
  StaffService,
  InquiryService,
  LogisticsService,
  DispatchService,
  MaintenanceService
} from "./services";

export const queryKeys = {
  inventory: ["inventory"] as const,
  inventoryCategories: ["inventoryCategories"] as const,
  inventoryItem: (id: ID) => ["inventory", id] as const,
  bookings: ["bookings"] as const,
  booking: (id: ID) => ["bookings", id] as const,
  events: ["events"] as const,
  event: (id: ID) => ["events", id] as const,
  customers: ["customers"] as const,
  customer: (id: ID) => ["customers", id] as const,
  gallery: ["gallery"] as const,
  galleryAlbum: (id: ID) => ["gallery", id] as const,
  galleryMedia: ["galleryMedia"] as const,
  galleryAlbumMedia: (albumId: ID) => ["galleryMedia", { albumId }] as const,
  menus: ["menus"] as const,
  menu: (id: ID) => ["menus", id] as const,
  staff: ["staff"] as const,
  staffMember: (id: ID) => ["staff", id] as const,
  inquiries: ["inquiries"] as const,
  inquiry: (id: ID) => ["inquiries", id] as const,
  returns: ["returns"] as const,
  dispatches: ["dispatches"] as const,
  dispatch: (id: ID) => ["dispatches", id] as const,
  maintenance: ["maintenance"] as const,
  maintenanceItem: (id: ID) => ["maintenance", id] as const,
};

// Default query configurations
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export function useInventory() {
  return useQuery({
    queryKey: queryKeys.inventory,
    queryFn: () => InventoryService.getAll(),
    staleTime: STALE_TIME,
  });
}

export function useInventoryCategories() {
  return useQuery({
    queryKey: queryKeys.inventoryCategories,
    queryFn: () => InventoryService.getCategories(),
    staleTime: STALE_TIME,
  });
}

export function useInventoryItem(id: ID) {
  return useQuery({
    queryKey: queryKeys.inventoryItem(id),
    queryFn: () => InventoryService.getById(id),
    enabled: !!id,
  });
}

export function useBookings() {
  return useQuery({
    queryKey: queryKeys.bookings,
    queryFn: () => BookingService.getAll(),
    staleTime: STALE_TIME,
  });
}

export function useBooking(id: ID) {
  return useQuery({
    queryKey: queryKeys.booking(id),
    queryFn: () => BookingService.getById(id),
    enabled: !!id,
  });
}

export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: () => EventService.getAll(),
    staleTime: STALE_TIME,
  });
}

export function useCustomers() {
  return useQuery({
    queryKey: queryKeys.customers,
    queryFn: () => CustomerService.getAll(),
    staleTime: STALE_TIME,
  });
}

export function useGalleryAlbums() {
  return useQuery({
    queryKey: queryKeys.gallery,
    queryFn: () => GalleryService.getAll(),
    staleTime: STALE_TIME,
  });
}

export function useGalleryMedia() {
  return useQuery({
    queryKey: queryKeys.galleryMedia,
    queryFn: () => GalleryService.getMediaAll(),
    staleTime: STALE_TIME,
  });
}

export function useGalleryMediaByAlbum(albumId: ID) {
  return useQuery({
    queryKey: queryKeys.galleryAlbumMedia(albumId),
    queryFn: () => GalleryService.getMediaByAlbumId(albumId),
    staleTime: STALE_TIME,
    enabled: !!albumId,
  });
}

export function useMenus() {
  return useQuery({
    queryKey: queryKeys.menus,
    queryFn: () => MenuService.getAll(),
    staleTime: STALE_TIME,
  });
}

export function useStaff() {
  return useQuery({
    queryKey: queryKeys.staff,
    queryFn: () => StaffService.getAll(),
    staleTime: STALE_TIME,
  });
}

export function useInquiries() {
  return useQuery({
    queryKey: queryKeys.inquiries,
    queryFn: () => InquiryService.getAll(),
    staleTime: STALE_TIME,
  });
}

export function useReturns() {
  return useQuery({
    queryKey: queryKeys.returns,
    queryFn: () => LogisticsService.getAllReturns(),
    staleTime: STALE_TIME,
  });
}

export function useDispatches() {
  return useQuery({
    queryKey: queryKeys.dispatches,
    queryFn: () => DispatchService.getAll(),
    staleTime: STALE_TIME,
  });
}

export function useMaintenance() {
  return useQuery({
    queryKey: queryKeys.maintenance,
    queryFn: () => MaintenanceService.getAll(),
    staleTime: STALE_TIME,
  });
}

// Example Mutations
export function useCreateInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof InquiryService.create>[0]) =>
      InquiryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inquiries });
    },
  });
}

export function useResolveInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: ID) => InquiryService.resolveInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inquiries });
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof BookingService.create>[0]) =>
      BookingService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings });
    },
  });
}

export function useConfirmBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: ID) => BookingService.confirmBooking(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings });
      queryClient.invalidateQueries({ queryKey: queryKeys.booking(variables) });
    },
  });
}
