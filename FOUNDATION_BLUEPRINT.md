# Om Tent House And Caterers — Implementation Foundation Blueprint

## SECTION 1 — MONOREPO GENERATION

We will utilize a monorepo structure (conceptually via Turborepo or Nx) to ensure that the web public site, the internal dashboard, and the mobile staff app maintain perfect synchrony with our business logic, types, and UI system.

**Folder Structure:**
```text
/
├── apps/
│   ├── web-public/       # Customer-facing marketing website (Next.js/React)
│   ├── web-admin/        # Internal dashboard for Owners/Managers (React)
│   └── mobile-staff/     # Field operations app for logistics (React Native/Expo)
├── packages/
│   ├── core-types/       # Shared business Domain entities (TypeScript interface/enums)
│   ├── mock-data/        # JSON structures mimicking the production DB
│   ├── ui-system/        # Reusable design components (Buttons, Glass panels)
│   ├── data-access/      # Generic API clients/Repositories
│   └── utils/            # Shared utilities (currency formatting, date logic)
├── docs/                 # Project documentation and ADRs
└── configs/              # Shared base configurations (TSConfig, ESLint)
```

**Purpose:**
*   `apps/`: The entry points. They contain routing and page-level assembly. They should contain minimal actual business logic.
*   `packages/`: The engine. Isolated, highly testable logic that the apps consume.

---

## SECTION 2 — WEB APP FOUNDATION

The structure within both `web-public` and `web-admin` follows Feature-Sliced Design.

**React Structure:**
```text
src/
├── app/                  # Application root (Providers, Global CSS, Main Entry)
├── routes/               # Route definitions and guarding logic
├── layouts/              # Shared structural wrappers (e.g., Navbar+Footer, Admin Sidebar)
├── pages/                # High-level page components binding features together
├── features/             # Business domains (The core logic)
│   ├── bookings/
│   │   ├── api/          # Data fetching hooks (React Query)
│   │   ├── ui/           # Feature-specific components
│   │   ├── model/        # Feature-specific local state/types
│   │   └── utils/        # Feature-specific helpers
│   └── inventory/
├── shared/               # Cross-feature modules
│   ├── components/       # App-specific UI components (extending ui-system)
│   ├── hooks/            # App-wide hooks (e.g., useAuth)
│   ├── store/            # Global client state (Zustand)
│   ├── services/         # Wrappers around external SDKs (Firebase/Analytics)
│   └── constants/        # App-wide constants (Routes, feature flags)
```

---

## SECTION 3 — MOBILE APP FOUNDATION

The React Native (Expo) structure mirrors the web app closely but is optimized for mobile hardware and native navigation paradigms.

**React Native Structure:**
```text
src/
├── app/                  # App registry, navigation container, global providers
├── navigation/           # Stack and Tab navigators
├── screens/              # Full-screen views (analogous to pages)
├── features/             # Cross-platform business logic (Bookings, Dispatch logic)
├── shared/
│   ├── components/       # Mobile-specific UI (extending ui-system mapped to RN primitives)
│   ├── hooks/            # Mobile-specific logic (e.g., useScanner, useLocation)
│   └── store/            # Local SQLite sync state or Zustand global state
└── assets/               # Local fonts, icons, offline images
```

---

## SECTION 4 — SHARED PACKAGES

**`packages/core-types`**
*   *Purpose:* Centralized TypeScript interfaces (`IBooking`, `IInventoryItem`).
*   *Dependencies:* None (pure TS).
*   *Ownership:* Domain Architects.

**`packages/mock-data`**
*   *Purpose:* Provides instant, complex local JSON data mimicking a 2500-guest scale event business. Allows UI development to proceed at 100% velocity.
*   *Dependencies:* `core-types`.

**`packages/ui-system`**
*   *Purpose:* The implementation of our Design System.
*   *Dependencies:* Tailwind CSS, generic headless UI libraries (Radix or similar), React.

**`packages/data-access`**
*   *Purpose:* Standardized API fetchers based on the Repository pattern.
*   *Dependencies:* `core-types`, generic HTTP client (Fetch/Axios).

**`packages/utils`**
*   *Purpose:* Pure functions for date formatting, currency math, validation (Zod).

---

## SECTION 5 — DESIGN SYSTEM IMPLEMENTATION PLAN

We will implement the "Royal Vanguard" Cinematic Glassmorphism system via Tailwind CSS extensions and native CSS variables.

*   **Colors:** Extended in `tailwind.config.ts` (`slate-950` base, `gold-500` accent `#D4AF37`).
*   **Typography:** Imported via global CSS. Extended into Tailwind theme (`font-serif` mapped to Playfair Display, `font-sans` mapped to Inter).
*   **Spacing:** Utilizing standard Tailwind scales, but overriding max-widths (`max-w-7xl` acts as our 1440px container).
*   **Glassmorphism:** Created as reusable utility classes (`.bg-glass-slate`, `.border-glass-specular`, `.backdrop-blur-macro`).
*   **Tokens:** Mapped as CSS variables in a central `@layer base` for runtime theme switching if ever required.

---

## SECTION 6 — STATE MANAGEMENT PLAN

*   **Global State (Zustand):** Minimal usage. Only for Auth Session context, Sidebar toggle state, and App-wide notifications.
*   **Data State / Server State (React Query / TanStack Query):** The primary engine. Caches mock data (and later real DB queries), handles loading states, error retries, and optimistic updates.
*   **Feature State (React Context / useReducer):** Used strictly within isolated features (e.g., inside the "Create Booking Wizard" to hold multi-step data before submission).
*   **UI State (React useState):** Trivial local toggles (modals, accordions).
*   **Form State (React Hook Form + Zod):** Manages input values, field validation, and dirty states. Zod schemas are shared with `core-types`.

---

## SECTION 7 — ROUTING PLAN

**Public Website Router:**
*   `/` -> Home (Marketing)
*   `/gallery` -> Dynamic event albums
*   `/contact` -> Lead capture

**Dashboard Router (Protected Wrapper):**
*   `/admin/dashboard` -> Today's events, critical alerts
*   `/admin/bookings` -> Calendar view, list view
*   `/admin/bookings/:id` -> Single booking manager (Negotiation/Allocation)
*   `/admin/inventory` -> Asset ledger, low stock alerts
*   `/admin/inventory/dispatch` -> Active movements
*   `/admin/staff` -> RBAC management

---

## SECTION 8 — DEVELOPMENT ORDER

1.  **Project Setup:** Scaffold the Vite wrapper, tsconfig, and Tailwind base.
2.  **Shared Types (`core-types`):** Define the exact interfaces for business domains.
3.  **Mock Data Engine:** Build the robust JSON local database.
4.  **Theme System (`ui-system`):** Establish CSS globals, Tailwind config, and fonts.
5.  **Layout System:** Build the global navigation, footer, and admin shell.
6.  **UI Components:** Build highly polished glass cards, buttons, typography blocks.
7.  **Website Pages:** Assemble the marketing UI using the components.
8.  **Dashboard:** Wire up React Query to the mock data engine for real operations.
9.  **Mobile App:** Boot up Expo and connect to shared packages.

---

## SECTION 9 — CODE GENERATION ROADMAP

*   **Milestone 1:** Monorepo/Folder creation & Build System configuration.
*   **Milestone 2:** Types, Mock Data, and utility constants.
*   **Milestone 3:** Core UI Component foundation (Buttons, Form Inputs, Structural Cards, Glass utilities).
*   **Milestone 4:** The Public Website (Integration of Hero, Galleries, Contact).
*   **Milestone 5:** The Operations Dashboard (Complex React Query integrations, Form validations).
*   **Milestone 6:** Mobile App integration.

---

## SECTION 10 — READY FOR DEVELOPMENT

This document represents the final abstraction. 
The foundation is defined, dependencies are clear, and the monorepo architecture is prepared for scalable business operations without future rewrites. 

From this point forward, implementation commands should generate literal code, following this blueprint structurally and conceptually.
