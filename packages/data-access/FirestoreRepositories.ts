import { FirestoreBaseRepository } from "./FirestoreBaseRepository";
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
  DamageReport,
  ReturnStatus,
  DamageResolution,
  IssueClassification,
  ID 
} from "@om-tent/core-types";
import { db } from "../../src/lib/firebase";
import { runTransaction, doc } from "firebase/firestore";

// --- Firestore Repositories ---

export class FirestoreInventoryRepository extends FirestoreBaseRepository<InventoryItem> {
  constructor() {
    super("inventory");
  }

  // Transaction for Inventory Allocation
  async allocateInventoryTransaction(inventoryItemId: ID, quantityNeeded: number): Promise<boolean> {
    try {
      await runTransaction(db, async (transaction) => {
        const itemRef = doc(db, "inventory", inventoryItemId);
        const itemDoc = await transaction.get(itemRef);
        if (!itemDoc.exists()) {
          throw new Error(`Inventory Item ${inventoryItemId} does not exist`);
        }
        const itemData = itemDoc.data() as InventoryItem;
        const available = itemData.totalOwned - itemData.damagedQuantity;
        if (available < quantityNeeded) {
          throw new Error(`Insufficient stock for allocation. Required ${quantityNeeded}, available ${available}`);
        }
      });
      return true;
    } catch (e) {
      console.error("Allocation transaction failed: ", e);
      return false;
    }
  }
}

export class FirestoreBookingRepository extends FirestoreBaseRepository<Booking> {
  constructor() {
    super("bookings");
  }
}

export class FirestoreDispatchRepository extends FirestoreBaseRepository<DispatchRecord> {
  constructor() {
    super("dispatches");
  }
}

export class FirestoreReturnsRepository extends FirestoreBaseRepository<ReturnRecord> {
  constructor() {
    super("returns");
  }

  // Transaction for Returns Reconciliation
  async reconcileReturnTransaction(
    returnRecordId: ID, 
    items: { inventoryItemId: ID; quantityReturned: number; quantityDamaged: number }[],
    issueType?: IssueClassification
  ): Promise<boolean> {
    try {
      await runTransaction(db, async (transaction) => {
        const returnRef = doc(db, "returns", returnRecordId);
        const returnDoc = await transaction.get(returnRef);
        if (!returnDoc.exists()) {
          throw new Error(`Return record ${returnRecordId} not found`);
        }
        
        // Dynamically update returns item state
        transaction.update(returnRef, {
          items,
          status: ReturnStatus.CLEARED,
          returnedAt: new Date().toISOString()
        });

        // Process each returned item to adjust inventory damages
        for (const item of items) {
          if (item.quantityDamaged > 0) {
            const invRef = doc(db, "inventory", item.inventoryItemId);
            const invDoc = await transaction.get(invRef);
            if (invDoc.exists()) {
              const invData = invDoc.data() as InventoryItem;
              transaction.update(invRef, {
                damagedQuantity: invData.damagedQuantity + item.quantityDamaged
              });

              // Automatically generate damage report inside transaction
              const damageReportId = Math.random().toString(36).substring(7);
              const damageRef = doc(db, "maintenance_reports", damageReportId);
              transaction.set(damageRef, {
                id: damageReportId,
                returnRecordId,
                inventoryItemId: item.inventoryItemId,
                quantity: item.quantityDamaged,
                issueType: issueType || IssueClassification.DAMAGED,
                description: `Automated transaction entry from Returns Reconciliation for item ${item.inventoryItemId}`,
                resolution: DamageResolution.REPORTED,
                reportedAt: new Date().toISOString()
              });
            }
          }
        }
      });
      return true;
    } catch (e) {
      console.error("Reconciliation transaction failed: ", e);
      return false;
    }
  }
}

export class FirestoreMaintenanceRepository extends FirestoreBaseRepository<DamageReport> {
  constructor() {
    super("maintenance_reports");
  }

  // Transaction for Maintenance Recovery
  async resolveMaintenanceTransaction(damageReportId: ID, resolution: DamageResolution): Promise<boolean> {
    try {
      await runTransaction(db, async (transaction) => {
        const damageRef = doc(db, "maintenance_reports", damageReportId);
        const damageDoc = await transaction.get(damageRef);
        if (!damageDoc.exists()) {
          throw new Error(`Damage report ${damageReportId} not found`);
        }

        const damageData = damageDoc.data() as DamageReport;
        if (damageData.resolution === DamageResolution.COMPLETED || damageData.resolution === DamageResolution.RETIRED) {
          return; // Already resolved
        }

        // Update damage report status in transaction
        transaction.update(damageRef, { resolution });

        // Adjust inventory quantities atomically
        const invRef = doc(db, "inventory", damageData.inventoryItemId);
        const invDoc = await transaction.get(invRef);
        if (invDoc.exists()) {
          const invData = invDoc.data() as InventoryItem;
          const newDamagedQuantity = Math.max(0, invData.damagedQuantity - damageData.quantity);
          
          if (resolution === DamageResolution.RETIRED) {
            const newTotalOwned = Math.max(0, invData.totalOwned - damageData.quantity);
            transaction.update(invRef, {
              damagedQuantity: newDamagedQuantity,
              totalOwned: newTotalOwned
            });
          } else if (resolution === DamageResolution.COMPLETED) {
            transaction.update(invRef, {
              damagedQuantity: newDamagedQuantity
            });
          }
        }
      });
      return true;
    } catch (e) {
      console.error("Maintenance recovery transaction failed: ", e);
      return false;
    }
  }
}

export class FirestoreGalleryRepository extends FirestoreBaseRepository<GalleryAlbum> {
  constructor() {
    super("gallery_albums");
  }
}

export class FirestoreGalleryMediaRepository extends FirestoreBaseRepository<GalleryMedia> {
  constructor() {
    super("gallery_media");
  }
}

export class FirestoreCustomerRepository extends FirestoreBaseRepository<Customer> {
  constructor() {
    super("customers");
  }
}

export class FirestoreStaffRepository extends FirestoreBaseRepository<StaffMember> {
  constructor() {
    super("staff");
  }
}

export class FirestoreInventoryCategoryRepository extends FirestoreBaseRepository<InventoryCategory> {
  constructor() {
    super("inventory_categories");
  }
}

export class FirestoreEventRepository extends FirestoreBaseRepository<Event> {
  constructor() {
    super("events");
  }
}

export class FirestoreMenuRepository extends FirestoreBaseRepository<Menu> {
  constructor() {
    super("menus");
  }
}

export class FirestoreInquiryRepository extends FirestoreBaseRepository<Inquiry> {
  constructor() {
    super("inquiries");
  }
}
