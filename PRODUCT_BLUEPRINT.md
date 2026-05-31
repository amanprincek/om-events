# Om Tent House And Caterers — Product Blueprint

## SECTION 1 — PRODUCT VISION

**Product Mission**
To build a digital ecosystem that mirrors the reliability, grandeur, and operational excellence of Om Tent House And Caterers, serving both as a premium brand showcase for customers and a robust operational engine for staff.

**Product Goals**
* Establish a premium digital presence that builds immediate trust.
* Eliminate the chaos of manual inventory and booking tracking.
* Prevent inventory loss and scheduling conflicts.

**Customer Goals**
* Feel absolute confidence that their grand event is in reliable hands.
* Easily visualize the quality and scale of past setups.
* Seamlessly connect with the owners via WhatsApp or phone.

**Business Goals**
* Position the brand as the most premium and reliable choice in the Anpara/Sonbhadra region.
* Increase the volume of high-value, large-scale event inquiries.
* Gain real-time visibility into inventory availability across multiple simultaneous events.

**Staff Goals**
* Have clear, exact lists of items to dispatch and return for specific events.
* Easily report damages or shortages without communication bottlenecks.

---

## SECTION 2 — USER TYPES

### 1. Public Users (Prospective Clients)
* **Responsibilities:** Explore services, view galleries, initiate contact.
* **Needs:** Proof of reliability, visual inspiration, easy contact methods.
* **Pain Points:** Fear of event failure, anxiety over poor arrangements.
* **Permissions:** View public website content, trigger WhatsApp/Phone actions.

### 2. Business Owners (Pawan Kumar, Gopal Kumar)
* **Responsibilities:** Oversee entire operation, manage client negotiations, monitor business health.
* **Needs:** High-level overview of active bookings, inventory bottlenecks, payment settlements.
* **Pain Points:** Double-booking inventory, miscommunication on event scale, tracking pending payments.
* **Permissions:** Super Admin (Full CRUD across all modules).

### 3. Inventory Managers
* **Responsibilities:** Track physical assets entering and leaving the warehouse.
* **Needs:** Clear dispatch lists, return checklists, availability forecasts.
* **Pain Points:** Lost items, damaged goods not reported, last-minute shortages.
* **Permissions:** Read bookings, read/write inventory state, mark items damaged/returned.

### 4. Staff Members (Execution / On-ground Team)
* **Responsibilities:** Setup infrastructure at the venue, handle catering/lighting logistics.
* **Needs:** Clear event details, location pins, and task assignments.
* **Pain Points:** Confusion about what materials to load, lack of venue details.
* **Permissions:** Read-only access to assigned bookings, update dispatch/return status.

---

## SECTION 3 — WEBSITE INFORMATION ARCHITECTURE

**Navigation**
* Home
* Our Promise
* Services
* Gallery / Setups (Future Expansion)
* Contact

**Pages (Single-Page Scrolling Architecture)**
1. **Hero Section:** High-impact cinematic background, direct emotional headline, primary CTA (WhatsApp).
2. **Our Promise Section:** Addressing the "Customer Fear" directly. Statistics on events, staff, and capacity.
3. **Services Section:** Visual grid of Tent Setup, Royal Catering, Decoration, and Lighting.
4. **Consultation/Contact Section:** Direct contact details for owners, operating regions, WhatsApp/Call buttons.

**User Journeys**
* **The Inspiration Journey:** Lands on site -> sees grand hero image -> scrolls to services -> impressed by scale -> clicks WhatsApp.
* **The Validation Journey:** Hears about Om Tent House -> searches online -> reads "Our Promise" -> feels reassured -> Calls owner.

**CTA Strategy**
* Primary: "Message Us Directly" / "WhatsApp Us" (Direct to owners).
* Secondary: "Call for Consultation" / "Book Now".
* *Strict Rule Applicable:* No "Get a Quote" calculators or pricing sheets. Every event is bespoke.

---

## SECTION 4 — MOBILE APP INFORMATION ARCHITECTURE

**Internal Staff App (Progressive Web App / React Native)**

**Navigation System (Bottom Tab Bar)**
* Dashboard
* Bookings
* Inventory
* Profile/Settings

**Screens & Workflows**
1. **Dashboard Home:** Active events today, pending dispatches, alerts for low inventory.
2. **Bookings List:** Calendar or list view of upcoming, ongoing, and completed events.
3. **Booking Detail:** Client details, venue location, allocated inventory list, payment status.
4. **Inventory List:** Searchable catalog of all tents, chairs, lights, and catering items with current 'Available' and 'In-Use' quantities.
5. **Dispatch/Return Screen (Workflow):**
   * Select Booking -> View required items -> Checkboxes to mark "Loaded onto truck".
   * Post-event -> Checkboxes to mark "Returned to warehouse" -> Option to flag "Damaged".

---

## SECTION 5 — INVENTORY MANAGEMENT WORKFLOW

1. **Inventory Added:** Owner adds a new item (e.g., "Premium Gold Chairs", Quantity: 500) to the system.
2. **Inventory Available:** Item sits in the 'Available Pool'.
3. **Booking Assigned:** When a booking is confirmed, items are logically 'reserved' for those dates. Available pool decreases for those dates.
4. **Dispatch:** Day of event. Staff marks reserved items as "Dispatched/In-Transit".
5. **Event Usage:** Items are physically at the venue (Status: "In Use").
6. **Return:** Event ends. Items are loaded back. Staff scans/checks off items arriving at warehouse.
7. **Inspection:** Items are verified against the original dispatch list.
8. **Maintenance/Damage:** If an item is broken, it's flagged as "Damaged" (requires repair/replacement) and removed from the active pool.
9. **Available Again:** Undamaged items return to the physical and logical 'Available Pool'.

---

## SECTION 6 — BOOKING MANAGEMENT WORKFLOW

1. **Lead / Inquiry:** Customer calls or WhatsApps. 
2. **Negotiation:** Offline discussion. Owner creates a Draft Booking in the system with requested dates.
3. **Advance Payment:** Customer agrees to terms and pays an advance.
4. **Confirmed Booking:** Owner marks booking as "Confirmed". System checks inventory availability for those dates and hard-reserves the materials.
5. **Material Allocation:** System generates a specific packing/dispatch list.
6. **Dispatch:** Materials leave the warehouse.
7. **Event Completed:** The function finishes successfully.
8. **Settlement:** Final payment is logged in the system. Booking status changes to "Completed".

---

## SECTION 7 — DATA MODEL PLANNING

**Entity: Customers**
* Purpose: Store client details for repeat business and contact.
* Fields: ID, Name, Phone, Alt Phone, Address.
* Relationships: Has many Bookings.

**Entity: Bookings**
* Purpose: Core event record.
* Fields: ID, CustomerID, EventType (Wedding, Birthday), Venue, StartDate, EndDate, Status (Draft, Confirmed, Completed, Cancelled), AdvancePaid, TotalAmount.
* Relationships: Belongs to Customer, Has many BookingItems.

**Entity: Inventory Categories**
* Purpose: Group items (e.g., Furniture, Tent Fabric, Catering Utensils).
* Fields: ID, Name.

**Entity: Inventory Items**
* Purpose: The physical assets.
* Fields: ID, CategoryID, Name, TotalQuantity, DamagedQuantity.
* Relationships: Belongs to Category, Has many BookingItems.

**Entity: BookingItems (Join Table)**
* Purpose: Allocate specific quantities of inventory to a specific booking.
* Fields: ID, BookingID, InventoryItemID, QuantityNeeded, QuantityDispatched, QuantityReturned, QuantityDamaged.
* Relationships: Belongs to Booking, Belongs to Inventory Item.

**Entity: Staff**
* Purpose: System access.
* Fields: ID, Name, Role (Owner, Manager, Staff), Phone.

---

## SECTION 8 — DESIGN SYSTEM BLUEPRINT

* **Brand Personality:** Royal, Grand, Premium, Trustworthy, Unshakeable.
* **Emotional Design Goals:** "This team can handle the most important event of my life." (Feelings of security, awe, and professionalism).
* **Visual Hierarchy:** Large cinematic imagery -> Strong, confident serif headlines -> Delicate, easy-to-read sans-serif body text -> High contrast CTA buttons.
* **UI Principles:**
  * **Dark Cinematic Aesthetic:** Deep slate/black backgrounds simulating night-time premium events.
  * **Glassmorphism:** Use of blurred, translucent backgrounds for cards and navigation to give a modern, layered, premium feel without obstructing background imagery.
  * **Gold Accents:** Use muted, sophisticated gold tones (#d4af37) for highlights, icons, and critical buttons to signify luxury (no bright, cheap yellows).
* **Typography Strategy:**
  * Headings: **Playfair Display** (Elegant, traditional, royal).
  * Body/UI labels: **Inter** (Modern, highly legible, clean).
* **Image Strategy:** High-resolution, sweeping shots of grand setups. No generic vector illustrations.

---

## SECTION 9 — MVP PLAN

### Version 1: The Trust Anchor (Completed current implementation)
* **Features:** Premium public landing page, high-end visual identity, mobile responsiveness, direct WhatsApp/Phone integration.
* **Priorities:** Establish the digital footprint and begin capturing high-quality leads.
* **Success Metrics:** Increase in incoming calls and WhatsApp inquiries referencing the website.

### Version 2: Core Operational Backend
* **Features:** Secure login for owners, inventory database CRUD, basic booking creation, visual calendar of events.
* **Priorities:** Stop using paper diaries for tracking reservations against inventory.
* **Success Metrics:** Zero instances of double-booking inventory.

### Version 3: The Dispatch Engine
* **Features:** Mobile-friendly views for staff, digital dispatch checklists, return and damage reporting flow, payment tracking.
* **Priorities:** Streamline warehouse-to-venue logistics.
* **Success Metrics:** Reduction in lost items from venues, faster loading times based on clear digital lists.

---

## SECTION 10 — DEVELOPMENT ROADMAP

1. **Phase 1: Brand & Pre-Launch (Current)**
   * Finalize the dark cinematic UI/UX.
   * Deploy the static public-facing application.
2. **Phase 2: Database Architecture**
   * Set up Firebase Firestore schemas based on the Data Model Planning.
   * Implement secure Firebase Authentication for Owners and Staff.
3. **Phase 3: Core Internal Dashboard (V2)**
   * Develop protected routes.
   * Build the Inventory Management views (Add/Edit items).
   * Build the Booking generation form with basic date-collision logic.
4. **Phase 4: Field Operations (V3)**
   * Develop responsive mobile interfaces for dispatch tracking.
   * Implement complex state updates (Available -> Dispatched -> Returned -> Damaged).
5. **Phase 5: Refinement**
   * Role-based access control audits.
   * Performance optimizations for the internal app on slower local networks.
