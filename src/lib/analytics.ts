declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let initialized = false;

export const initializeAnalytics = () => {
  if (initialized || !GA_MEASUREMENT_ID) return;

  // Add Google Analytics Script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // Handle page views manually for PWA/SPA
    debug_mode: process.env.NODE_ENV === 'development',
  });

  initialized = true;
  console.log('Analytics initialized');
};

export const trackPageView = (path: string) => {
  if (!initialized) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

export type AnalyticsEvent = 
  // Customer Events
  | 'wa_click' | 'phone_click' | 'inquiry_submit' | 'site_visit_request' 
  | 'gallery_album_open' | 'gallery_media_view' | 'service_card_view' 
  | 'contact_cta_click'
  // Business Events
  | 'admin_login' | 'staff_login' | 'booking_create' | 'inventory_update' 
  | 'dispatch_create' | 'return_create' | 'maintenance_ticket_create';

export const trackEvent = (eventName: AnalyticsEvent, params?: Record<string, any>) => {
  if (!initialized) {
    if (process.env.NODE_ENV === 'development') {
        console.warn('Analytics not initialized, event ignored:', eventName);
    }
    return;
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, params);
  }
  
  window.gtag('event', eventName, params || {});
};
