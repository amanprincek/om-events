# Om Tent House And Caterers — Domain Model & Business Rules

## SECTION 1 — DOMAIN OVERVIEW

To ensure long-term stability, we divide the business into logical, independent domains. Each domain is responsible for a specific aspect of the business and encapsulates its own rules.

*   **Inventory Domain:** Manages physical assets. Tracks quantities, physical locations, maintenance states, and overarching availability.
*   **Booking Domain:** The core revenue engine. Manages the financial lifecycle, contracts, and state of a customer's order from inquiry to final settlement.
*   **Customer Domain:** Acts as the CRM (Customer Relationship Management). Tracks historical value, contact details, and repeat business.
*   **Event Domain:** Manages the logistical reality of a booking. Handles locations, setup dates, teardown dates, internal staff assignments, and guest counts.
*   **Gallery Domain:** The marketing engine. Manages high-quality visual proof, categorizes events, and tags setups for the public portfolio.
*   **Catering Domain:** Manages culinary operations. Creates master menus, categorizes dishes, and tracks specific food choices for an event.
*   **Staff Domain:** Manages internal operations, role-based access control, and shift or task assignments.
*   **Communication Domain:** Handles external messaging. Logs inquiries, WhatsApp intents, and tracks lead sources.

---

## SECTION 2 — ENTITY CATALOG

**Core Entities:**
1.  **Customer:** A person or entity paying for services.
2.  **Booking:** The financial and legal agreement.
3.  **Event:** The physical occasion tied to a booking.
4.  **Branch:** A physical warehouse/office location (Futureproofing).

**Inventory Entities:**
5.  **InventoryCategory:** Distinct groupings (e.g., Furniture, Lighting, Fabric).
6.  **InventoryItem:** A specific asset type (e.g., "Premium Gold Chiavari Chair").
7.  **AllocationRecord:** A temporary lock on an item for specific dates.
8.  **DispatchRecord:** The physical manifest of items leaving the warehouse.
9.  **ReturnRecord:** The physical manifest of items returning.
10. **DamageReport:** A log of assets broken or lost during an event.

**Catering Entities:**
11. **Menu:** A curated collection of food offerings (e.g., "Royal Wedding Spread").
12. **MenuSection:** Groupings within a menu (e.g., Starters, Main Course).
13. **MenuItem:** Individual dish descriptions.

**Marketing & Communication Entities:**
14. **GalleryAlbum:** A collection of photos from a specific real-world event.
15. **GalleryMedia:** The individual photo/video URI and metadata.
16. **Inquiry:** A raw lead before it becomes a formal Booking.

**Internal Entities:**
17. **StaffMember:** An employee record with RBAC roles.

---

## SECTION 3 — ENTITY RELATIONSHIPS

*   `Branch` **has many** `InventoryItems`, `StaffMembers`, and `Bookings`.
*   `Customer` **has many** `Inquiries` and `Bookings`.
*   `Booking` **belongs to** a `Customer`.
*   `Booking` **has exactly one** `Event`.
*   `Event` **has many** `AllocationRecords` (Infrastructure needed).
*   `Event` **has many** `StaffMembers` (Assigned personnel).
*   `Event` **has exactly one** selected `Menu` (Optional, if catering is chosen).
*   `InventoryItem` **belongs to** an `InventoryCategory`.
*   `InventoryItem` **has many** `AllocationRecords` across time.
*   `AllocationRecord` **belongs to** an `Event` and an `InventoryItem`.
*   `AllocationRecord` **generates one** `DispatchRecord` on event day.
*   `DispatchRecord` **generates one** `ReturnRecord` post-event.
*   `ReturnRecord` **may generate many** `DamageReports`.
*   `Menu` **has many** `MenuSections`, which **have many** `MenuItems`.
*   `GalleryAlbum` **has many** `GalleryMedia`.
*   `GalleryAlbum` **can reference** exactly one `Event` (to show "This setup was from X wedding").

---

## SECTION 4 — INVENTORY DOMAIN

**Concepts:**
*   **Inventory Categories:** Hierarchical sorting.
*   **Inventory Items:** Defined conceptually (bulk) or serially (for future QR). 
    *   *Bulk:* "Plate, White Ceramic" (Qty: 2500).
    *   *Serialized:* "Generator 50kVA" (ID: GEN-001).
*   **Availability Concept:** A ledger system. We never simply overwrite a `CurrentAvailable` number. Availability is computed dynamically for a given date range.
*   **Reservations (Soft vs Hard):** Draft bookings create a soft reservation (warnings trigger if capacity is near). Confirmed bookings create hard allocations (locks the inventory).
*   **Returns & Maintenance:** Items returned short or broken are flagged. Damaged items sit in a `Maintenance` state, mathematically deducting from `Total Owned`.

---

## SECTION 5 — BOOKING DOMAIN

**Lifecycle States:**
1.  **Inquiry:** Lead received. Budget discussed.
2.  **Negotiation (Draft):** Items drafted. Price determined. No dates locked.
3.  **Advance Payment:** The trigger point.
4.  **Confirmation:** Booking officially locked. Inventory allocated.
5.  **Allocation/Preparation:** System generates packing lists.
6.  **Dispatch:** Event is occurring.
7.  **Completion:** Tear down complete. Items back.
8.  **Cancelled:** Can occur before confirmation without penalty. Releases soft allocations.

**Rules:** Financial totals map strictly to Confirmed or Completed states to measure revenue accurately.

---

## SECTION 6 — CUSTOMER DOMAIN

**Concepts:**
*   **Profiles:** Standardized contact data (Primary Phone, Alt Phone, WhatsApp).
*   **Event History:** Calculating Customer Lifetime Value (LTV). E.g., The same family hires us for an engagement, then a wedding, then an anniversary.
*   **Future CRM Support:** Tagging clients (e.g., "VIP", "Corporate Partner") to adjust future pricing/negotiation strategies.

---

## SECTION 7 — EVENT DOMAIN

**Concepts:**
*   **Logistical Reality:** An Event is distinct from a Booking. The Booking is the *money*; the Event is the *work*.
*   **Dates:** Needs multi-point date tracking:
    *   `SetupStartDate`: When the trucks leave.
    *   `EventDate`: When the guests arrive.
    *   `TeardownEndDate`: When the last item returns.
*   **Location:** Venue coordinates, access restrictions (e.g., "No large trucks allowed before 10 PM").
*   **Scale:** Guest Count defines the volume of required catering and baseline furniture.

---

## SECTION 8 — STAFF DOMAIN

**Concepts:**
*   **Owner:** Unrestricted access. Can force-override inventory locks.
*   **Manager:** Can manage schedules, edit bookings, but cannot delete financial records.
*   **Inventory Staff:** Warehouse tablet users. Can only view dispatch lists and submit return/damage logs.
*   **Operations Staff:** On-ground riggers. Can only view location, setup instructions, and assigned packing lists.

---

## SECTION 9 — GALLERY DOMAIN

**Concepts:**
*   **Marketing Engine:** Separate from internal operations. 
*   **Tags:** Media assets are tagged (`#Royal`, `#Lighting`, `#Shaktinagar`) to allow dynamic filtering on the frontend.
*   **Featured Content:** Boolean flags determining which media hit the Homepage Hero section.
*   **Future Support:** Designed to store purely lightweight URIs, anticipating a shift to AWS S3 or Cloudinary.

---

## SECTION 10 — CATERING DOMAIN

**Concepts:**
*   **Templates vs Instances:** The owner designs a Master Menu Template. When an Event selects it, a *copy* (Menu Instance) is attached to the Event. This ensures that changing the Master Template next year won't retroactively alter the historical record of past weddings.
*   **Dietary Tracking:** Flags for Veg, Non-Veg, Jain options at the MenuItem level.

---

## SECTION 11 — BUSINESS RULES

1.  **The Availability Equation:** `Available Inventory For Dates` = `Total Owned` - `Quantity Damaged` - `Quantity Allocated to Confirmed Events (between SetupStartDate and TeardownEndDate)`.
2.  **Hard Constraint:** A Booking cannot be moved to `Confirmed` if `Available Inventory` drops below 0 for any requested item on those specific dates. (Can be overridden *only* by Owner logic, e.g., planning to sub-rent).
3.  **Financial Constraint:** A Booking cannot move to `Completed` until `FinalPayment` status is settled and all items are checked back (or billed for damage).
4.  **Damage Workflow:** Marking an item on a ReturnRecord as `Damaged` automatically creates a `DamageReport` and deducts that quantity from the overarching `Total Owned` pool until a supervisor resolves the report (Repaired vs Written Off).

---

## SECTION 12 — VALIDATION RULES

1.  **Dates:** `SetupStartDate` must be <= `EventDate`. `TeardownEndDate` must be >= `EventDate`.
2.  **Quantities:** `DispatchQuantity` cannot exceed `AllocatedQuantity`. `ReturnQuantity` + `DamageQuantity` must exactly equal `DispatchQuantity`.
3.  **Customers:** Primary Phone must be a valid 10-digit Indian Mobile Number format.
4.  **Guest Count:** Must be a positive integer, max 5000.
5.  **Inventory Values:** `Total Owned` cannot be negative.

---

## SECTION 13 — FUTURE DATABASE READINESS

The domain model is strictly abstract. How this maps to databases later:

*   **Firebase / Firestore (NoSQL):** We will use Subcollections (e.g., `Bookings/{id}/Allocations`) to keep document sizes small. Data like "Customer Name" will be denormalized onto the Booking document to prevent excessive read operations.
*   **Supabase / PostgreSQL (Relational):** Perfect 1:1 mapping with the entity catalog using Primary Keys and Foreign Keys. 
*   **MongoDB:** Embedded arrays for MenuItems and internal Dispatch logs; separate collections for heavyweight concepts like Bookings and InventoryItems.

Regardless of the database, the TypeScript interfaces representing these domains will not need to change.

---

## SECTION 14 — FINAL DOMAIN BLUEPRINT

1.  **Complete Domain Model:** The business operates 8 distinct domains.
2.  **Entity Relationship Map:** A hub-and-spoke model where the `Event` is the logistical center, and the `Booking` is the financial center.
3.  **Business Rules Catalog:** Strict ledger-based math prevents double-booking.
4.  **Validation Rules Catalog:** Protects data integrity at the input level.
5.  **Future Database Readiness Plan:** Domain types remain pure, allowing seamless migration from JSON constants to cloud databases.
