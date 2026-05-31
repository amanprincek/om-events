# Om Tent House And Caterers — Technical Architecture Blueprint

## SECTION 1 — ARCHITECTURAL PHILOSOPHY

**System Architecture Philosophy**
The Om Tent House digital ecosystem is built upon "Backend-Agnostic Domain-Driven Design." The core business rules (Bookings, Inventory, Allocations) and the user interface exist entirely independently of the data storage mechanism. The system is designed to gracefully mature from a static marketing site to a complex, multi-branch ERP without requiring UI rewrites.

**Scalability Principles**
*   **Horizontal Modularity:** Features are isolated. Scaling the Booking engine will not break the Media engine.
*   **Stateless Operations:** Business logic layers retain no state between requests, allowing future cloud functions to scale infinitely.
*   **Optimistic UI:** The frontend assumes success to provide a lightning-fast "premium" feel, reconciling with the backend asynchronously.

**Separation of Concerns**
*   *Presentation Layer (UI):* Strictly handles rendering and capturing user intent.
*   *Service Layer:* Handles business logic, validation, and orchestration.
*   *Data Access Layer:* Translates Service Layer requests into database-specific queries (or mock data responses).

**Reusability Principles**
*   "Write once, consume anywhere." Core logic, type definitions, and UI components (buttons, glass panels) are abstracted into shared packages utilized by both Web and Mobile platforms.

**Maintainability Principles**
*   **Strict Dependency Rule:** Inner layers (Domain/Types) cannot depend on outer layers (UI/Frameworks). 
*   **Predictability over Cleverness:** Explicit data flows and strict typing prevent "magic" errors, reducing the cost of onboarding new developers.

---

## SECTION 2 — MONOREPO STRATEGY

**Monorepo vs Multi-repo**
We utilize a **Monorepo Structure** (via tools like Turborepo or Nx). 
*Rationale:* Om Tent House requires a Public Website, an Internal Admin Dashboard, and a Staff Mobile App. These applications share 80% of their DNA (design system, inventory types, booking interfaces, and validation rules). A monorepo ensures that when the "Booking" data model is updated, the changes instantly propagate and validate across all three applications concurrently.

**Ideal Project Structure**
```text
/om-tent-monorepo/
├── apps/
│   ├── web-client/        # Customer-facing public website
│   ├── web-admin/         # Internal operations dashboard (Owners/Managers)
│   └── mobile-staff/      # React Native app for on-ground staff/inventory checks
├── packages/
│   ├── core-types/        # Shared TypeScript interfaces & Enums
│   ├── ui-system/         # Reusable React components (Glassmorphism, buttons)
│   ├── data-access/       # Repositories & API clients
│   ├── mock-data/         # Initial JSON data stores
│   └── utils/             # Shared helpers (date parsing, currency format)
├── docs/                  # Architecture Decision Records (ADRs) & guides
└── configs/               # Shared ESLint, Prettier, TypeScript base configs
```
*   `apps/`: Dedicated application entry points. Lean, connecting packages together.
*   `packages/`: The actual "engine" of the business. Highly tested, isolated logic.

---

## SECTION 3 — APPLICATION ARCHITECTURE

### WEB APPLICATION (Customer & Admin)

*   **Routing Architecture:** Directory-based routing (e.g., Next.js App Router). 
    *   `/` (Public Marketing)
    *   `/admin/*` (Protected Dashboard routes)
*   **Feature Organization:** Feature-Sliced Design. Code is grouped by business domain (e.g., `/features/bookings`, `/features/inventory`), rather than technical type (e.g., leaving the old `/components` or `/hooks` monoliths behind).
*   **Shared Layout Strategy:** Centralized "Shell" layouts. 
    *   *Public:* Glassmorphism Navbar + Footer wrapper.
    *   *Admin:* Persistent Sidebar + Header + Auth Boundary wrapper.
*   **State Boundaries:** Server State (data from DB) is strictly separated from Client State (UI toggles, modal open/close). 

### MOBILE APPLICATION (Staff App)

*   **Navigation Architecture:** Native stack and tab routing. 
    *   *Bottom Tabs:* Dashboard | Dispatch | Returns | Profile.
    *   *Modals:* System alerts, barcode scanner overlays.
*   **Screen Organization:** Screens act purely as data-fetchers that render shared UI components from the `ui-system`.
*   **Shared Features:** The Mobile app consumes the exact same `data-access` fetchers and `core-types` as the Web Admin.

---

## SECTION 4 — SHARED PACKAGE ARCHITECTURE

**`@om-tent/core-types`**
*   *Purpose:* The master dictionary of the business. Defines what a Booking is, what an InventoryItem is.
*   *Ownership:* Domain Architects.
*   *Scalability:* Zero dependencies. Compiles instantly. Shared everywhere.

**`@om-tent/ui-system`**
*   *Purpose:* Controls the exact visual implementation of the "Premium Trust" design language, Glassmorphism panels, and Typography scales.
*   *Dependencies:* Core framework libraries only. Agnostic of business logic.

**`@om-tent/data-access`**
*   *Purpose:* The bridge to the data. Exposes generic API functions (`getInventory()`, `createBooking()`).
*   *Ownership:* Backend integration team.

**`@om-tent/mock-data`**
*   *Purpose:* Provides instant, complex local JSON data mimicking a 2500-guest scale event business. Allows front-end development to proceed at 100% velocity before the backend is built.

---

## SECTION 5 — FEATURE MODULE ARCHITECTURE

Features are treated as isolated mini-applications.

**Example: `inventory` feature**
*   **Responsibilities:** Tracking item counts, flagging damage, computing availability.
*   **Internal Structure:**
    *   `/model`: Types specific to inventory (e.g., `DamageReport`).
    *   `/api`: Data fetching hooks (`useInventoryList`).
    *   `/ui`: Components specific to inventory (e.g., `StockLevelProgressRing`).
    *   `/lib`: Utility math for calculating availability overlap.
*   **Shared Dependencies:** Depends on `@om-tent/ui-system`. No circular dependencies with `bookings`.

---

## SECTION 6 — DATA LAYER ARCHITECTURE

The system is designed with a **Repository Pattern** and **Dependency Injection** (Factory pattern in JS/TS). 

**The Abstraction Flow:**
1.  **UI Component:** Calls `useBookings()`.
2.  **Service Layer:** Translates UI action to a standard interface request.
3.  **The Interface:** `IBookingRepository` demands a `.getById()` method.
4.  **The Implementation Injector:** Environment variables determine which implementation fulfills the interface.

**Transition Strategy (Zero UI changes required):**
*   **Phase 1 (Current):** Inject `MockBookingRepository` -> Reads from `packages/mock-data/bookings.json`.
*   **Phase 2 (Mid-term):** Inject `FirebaseBookingRepository` -> SDK calls to Firestore.
*   **Phase 3 (Enterprise):** Inject `RestApiBookingRepository` -> Fetch calls to a dedicated Node.js/PostgreSQL microservice.

---

## SECTION 7 — STATE MANAGEMENT STRATEGY

*   **Local State:** `useState/useReducer`. Used strictly for isolated UI behaviors (e.g., is this dropdown open? Which tab is active?).
*   **Server State (Crucial):** `TanStack Query` (React Query). Caches API responses, handles loading/error states, orchestrates background refetching, and provides optimistic UI updates. This perfectly divorces the UI from the fetching implementation.
*   **Shared Global State:** `Zustand`. Extremely lightweight. Used only for truly global context (e.g., User Authentication Session, Dark Mode preference).
*   **Form State:** `React Hook Form` combined with `Zod`. Zod schemas are shared in `@om-tent/core-types` so forms validate against the exact same rules the future backend will use.

---

## SECTION 8 — INVENTORY SYSTEM ARCHITECTURE

The inventory architecture utilizes a **Ledger-Based Double-Entry Concept**. Instead of simply changing a number (`Chairs = 450`), every movement is recorded.

**Relationships & Workflows:**
*   **Total Owned:** Fixed asset count.
*   **Allocations (Future overlap prevention):** When Booking X is confirmed for Nov 12th, a ledger entry "reserves" 200 chairs for Nov 10th-13th. 
*   **Availability Computation:** `Total Owned` minus `Sum of Allocations for specific date range` minus `Damaged items`.
*   **Dispatch Lifecycle:**
    *   `Pending Dispatch` (Allocated, in warehouse).
    *   `In-Transit` (On truck).
    *   `In-Use` (At Venue).
    *   `Returned_Pending_Inspection` (Back at warehouse, not yet cleared).
    *   `Cleared` (Available) OR `Damaged` (Requires repair/deducted from Total).

---

## SECTION 9 — BOOKING SYSTEM ARCHITECTURE

A State Machine architecture controls the lifecycle of a single event.

**Lifecycle Nodes:**
1.  **Inquiry (Lead):** Customer details captured. No inventory allocated.
2.  **Negotiation (Draft):** Tentative items added. Soft inventory check performed (Warning if low).
3.  **Advance Paid (Confirmation):** Hard allocation. Inventory mathematically deducted for event dates.
4.  **Event Execution (Active):** Triggers the Dispatch Lifecycle in the Inventory module.
5.  **Completion (Settlement):** All items returned/accounted for, damages invoiced, final payment received. Booking locked/archived.

---

## SECTION 10 — MEDIA & GALLERY ARCHITECTURE

*   **Assets:** Stored conceptually as URIs (Uniform Resource Identifiers). High-resolution premium images.
*   **Mock Phase:** URIs point to Unsplash/static URLs.
*   **Production Phase:** URIs point to a CDN (Content Delivery Network).
*   **Event Albums Structure:** Categorized by Event Type (Reception, Lighting). Supports lazy loading, heavy blur-up placeholders (Glassmorphism loaders), and responsive src-sets for mobile optimization without sacrificing premium visual quality.

---

## SECTION 11 — COMMUNICATION ARCHITECTURE

*   **Decoupled Action Links:** WhatsApp, Phone Calls, and Emails are wrapped in a `CommunicationService`.
*   **Implementation:** Currently utilizes standard `href="wa.me/..."` native protocol handlers.
*   **Future Readiness:** Designed so that `CommunicationService.sendInquiry()` can later be swapped to trigger Twilio SMS, WhatsApp Business API endpoints, or a CRM web-hook.

---

## SECTION 12 — SECURITY & ACCESS MODEL

**Role-Based Access Control (RBAC) Conceptual Matrix:**

*   **Owner (Super Admin):** Complete CRUD over system. Can override booking conflicts. Can view financial settlements.
*   **Manager:** Can create bookings, issue quotes, allocate inventory. Cannot delete hard assets or view total profit margins.
*   **Inventory Staff:** Can view Dispatch Lists. Can mark items "Loaded", "Returned", or "Damaged". Cannot view pricing or customer contract details.
*   **Operations Staff:** Can view venue location, setup deadlines, and allocated infrastructure lists. Read-only.
*   **Viewer (Public):** Access strictly to public marketing pages.

---

## SECTION 13 — DOCUMENTATION STRUCTURE

```text
/docs/
├── architecture/     # High-level blueprints and System Diagrams
├── decisions/        # ADR (Architecture Decision Records) - "Why we chose X over Y"
├── features/         # Business logic rules for Booking, Inventory lifecycle
├── developers/       # Setup guides, contributing rules, Git workflows
└── operations/       # User manuals for Staff and Managers
```

---

## SECTION 14 — FUTURE EXPANSION PLAN

**Multi-Tenant/Branch Support Prep:**
All core entities (`Booking`, `InventoryItem`, `Staff`) include a `branchId` property (defaulted to 'anpara-HQ'). Future branches simply filter data by their ID.

**Asset Tracking Prep:**
Inventory definitions include support for `trackingMethod: 'bulk' | 'serialized'`.
*   *Bulk:* "500 Chairs" (Standard deduction).
*   *Serialized:* "Generator #004" (QR/Barcode trackable via the Mobile Staff App scanner).

**Data Analytics Prep:**
Data mutation actions heavily dispatch events (`BOOKING_CONFIRMED`, `ITEM_DAMAGED`). These event streams can later feed into an Analytics Dashboard to measure peak seasons, loss rates, and ROI per asset category.

---

## SECTION 15 — FINAL ARCHITECTURE BLUEPRINT

**1. Complete Conceptual Folder Structure**
`apps/`, `packages/`, `docs/`, `infra/` (IaC configurations).

**2. Package Relationships**
`apps/*` ➔ depends on ➔ `@om-tent/feature-*`
`@om-tent/feature-*` ➔ depends on ➔ `@om-tent/ui-system`, `@om-tent/data-access`
`@om-tent/data-access` ➔ depends on ➔ `@om-tent/core-types`, `@om-tent/mock-data`

**3. Application Relationships**
*   **Web Client** isolates the public brand experience. High SEO, heavy caching.
*   **Web Admin** securely manages the centralized data source.
*   **Mobile Staff** interfaces with the physical real-world movement of assets.

**4. Data Flow Diagram (Abstracted)**
User Action (Click) ➔ React Component ➔ 
Zustand/Query Hook (Optimistic UI Update) ➔ 
Repository Interface ➔ 
Mock JSON Provider (Simulated network latency) ➔ 
Success Callback ➔ UI Settles.

**5. Feature Dependency Map**
*Bookings* intimately relies on *Inventory Availability*.
*Inventory* runs independent of *Bookings* (can exist without them).
*Media* runs entirely independent of operations.

**6. Scaling Strategy**
Phase 1: Build UI components & wire up Mock Repositories.
Phase 2: Swap Mock Repositories for Cloud Database (BaaS) for real-time sync.
Phase 3: Introduce the Mobile App to replace paper warehouse lists.
Phase 4: Implement Barcode/QR workflows inside the mobile app to map to the Serialized inventory data structure.
