import React, { useState, useEffect } from 'react';
import { initializeAnalytics } from '../lib/analytics';
import { Section, Container, Button } from '@om-tent/ui-system';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShow(true);
    } else if (consent === 'true') {
      initializeAnalytics();
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShow(false);
    initializeAnalytics();
  };

  const reject = () => {
    localStorage.setItem('cookie_consent', 'false');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-slate-midnight)] border-t border-[var(--color-border-glass)] p-4 z-50">
      <Container className="flex items-center justify-between gap-4">
        <p className="text-white text-sm">We use cookies to enhance your experience and analyze site traffic.</p>
        <div className="flex gap-2">
            <Button variant="secondary" onClick={reject}>Reject</Button>
            <Button variant="primary" onClick={accept}>Accept</Button>
        </div>
      </Container>
    </div>
  );
};
