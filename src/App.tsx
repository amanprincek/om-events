/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { webAdminApp } from '../apps/web-admin';
import { mobileStaffApp } from '../apps/mobile-staff';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { MobileLayout } from '../apps/mobile-staff/src/layouts/MobileLayout';
import Home from './pages/public/Home';

// Lazy load public pages
const AboutPage = lazy(() => import('./pages/public/About'));
const ServicesPage = lazy(() => import('./pages/public/Services'));
const GalleryPage = lazy(() => import('./pages/public/Gallery'));
const ContactPage = lazy(() => import('./pages/public/Contact'));

// Lazy load admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminBookings = lazy(() => import('./pages/admin/Bookings'));
const AdminInventory = lazy(() => import('./pages/admin/Inventory'));
const AdminDispatch = lazy(() => import('./pages/admin/Dispatch'));
const AdminReturns = lazy(() => import('./pages/admin/Returns'));
const AdminMaintenance = lazy(() => import('./pages/admin/Maintenance'));

// Lazy load staff pages
const StaffHome = lazy(() => import('./pages/staff/Home'));
const StaffDispatch = lazy(() => import('./pages/staff/Dispatch'));
const StaffReturns = lazy(() => import('./pages/staff/Returns'));
const StaffInspection = lazy(() => import('./pages/staff/Inspection'));

// Layout Boundaries
const PublicBoundary = () => <PublicLayout><Outlet /></PublicLayout>;
const AdminBoundary = () => <DashboardLayout><Outlet /></DashboardLayout>;
const StaffBoundary = () => <MobileLayout><Outlet /></MobileLayout>;

const LoadingFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-slate-midnight)]">
    <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-[var(--color-brand)] animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Website */}
          <Route element={<PublicBoundary />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminBoundary />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="dispatch" element={<AdminDispatch />} />
            <Route path="returns" element={<AdminReturns />} />
            <Route path="maintenance" element={<AdminMaintenance />} />
          </Route>

          {/* Staff Application */}
          <Route path="/staff" element={<StaffBoundary />}>
            <Route index element={<StaffHome />} />
            <Route path="home" element={<StaffHome />} />
            <Route path="dispatch" element={<StaffDispatch />} />
            <Route path="returns" element={<StaffReturns />} />
            <Route path="inspection" element={<StaffInspection />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<PublicBoundary />}>
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
