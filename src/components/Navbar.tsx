import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Container } from '@om-tent/ui-system';

interface NavLinkItem {
  name: string;
  href: string;
  hash?: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const location = useLocation();
  const navigate = useNavigate();

  // Unified navigation items strictly as requested
  const navLinks: NavLinkItem[] = [
    { name: 'Home', href: '/', hash: '#home' },
    { name: 'Services', href: '/services', hash: '#services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Projects', href: '/', hash: '#projects' },
    { name: 'About', href: '/about', hash: '#about' },
    { name: 'Contact', href: '/contact', hash: '#contact' },
  ];

  // 1. Optimize scroll and sticky state switching with passive listeners to protect frame rates
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Dual Scroll Spying and Active Route Highlighting via IntersectionObserver
  useEffect(() => {
    // If we're on a separate public page, set active state to the current path root
    if (location.pathname !== '/') {
      const activePath = navLinks.find(link => link.href === location.pathname);
      if (activePath) {
        setActiveSection(activePath.name.toLowerCase());
      }
      return;
    }

    // On home, map IDs to section positions
    const sectionsOnHome = ['home', 'services', 'projects', 'about', 'contact'];
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOption = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Spies exactly on sweet center spot of the page
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleIntersection, observerOption);

    sectionsOnHome.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // 3. Bulletproof scroll resolution (especially cross-route to hash scroll)
  useEffect(() => {
    const storedHash = localStorage.getItem('navHash');
    if (storedHash && location.pathname === '/') {
      localStorage.removeItem('navHash');
      
      const targetId = storedHash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200); // Allow react framework tree render completing

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // 4. Custom click handler overseeing hash vs route resolution
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLinkItem) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // Scenario A: Clicking Gallery or another route that doesn't have a hash on current page
    if (!link.hash) {
      navigate(link.href);
      return;
    }

    // Scenario B: We are on '/ ' and element hash exists in home
    if (location.pathname === '/' && link.href === '/') {
      const targetId = link.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Scenario C: We are on separate route (e.g. /gallery) and want to go to '/' + hash
    localStorage.setItem('navHash', link.hash);
    navigate('/');
  };

  const navItemClass = (linkName: string) => {
    const isActive = activeSection === linkName.toLowerCase();
    return `relative uppercase tracking-[0.15em] text-xs font-semibold select-none cursor-pointer py-2 transition-colors duration-300 ${
      isActive ? 'text-[var(--color-brand)] font-bold' : 'text-[var(--color-text-muted)] hover:text-white'
    }`;
  };

  // Mobile menu Framer Motion sliding configurations
  const drawerVariants: any = {
    closed: {
      x: '100%',
      backdropFilter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        when: 'afterChildren',
      },
    },
    open: {
      x: 0,
      backdropFilter: 'blur(32px)',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
  };

  const staggerVariants: any = {
    closed: { opacity: 0, y: 15 },
    open: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: 'easeOut' } 
    },
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-[450ms] border-b ${
          isScrolled 
            ? 'bg-[var(--color-slate-midnight)]/92 backdrop-blur-md border-[var(--color-border-glass)] py-4 shadow-[var(--shadow-glass-depth)]' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <Container>
          <div className="flex justify-between items-center h-12">
            
            {/* BRAND LUXURY LOGO */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }} 
                className="font-serif text-lg sm:text-2xl font-bold tracking-[0.1em] text-white flex items-center group focus:outline-none"
                aria-label="Om Tent House Crest Landing Page"
              >
                <span className="text-[var(--color-brand)] mr-1.5 font-light">✻</span>
                OM TENT <span className="text-[var(--color-brand)] ml-2 font-serif italic font-light">HOUSE</span>
              </Link>
            </div>
            
            {/* DESKTOP INTEGRATED NAVIGATION LINKS */}
            <nav className="hidden lg:flex items-center gap-x-6 xl:gap-x-10 h-full" aria-label="Desktop primary menu">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name.toLowerCase();
                return (
                  <a
                    key={link.name}
                    href={link.hash || link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={navItemClass(link.name)}
                  >
                    <span>{link.name}</span>
                    
                    {/* Active Route Highlight indicator dot and thin golden slider bar */}
                    {isActive && (
                      <motion.span 
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--color-brand)] shadow-[0_1px_8px_rgba(212,175,55,0.8)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* DESKTOP LOGISTICAL CALL-TO-ACTIONS */}
            <div className="hidden lg:flex items-center gap-4">
              {/* WhatsApp Quick icon link */}
              <a
                href="https://wa.me/919452460040"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-sm border border-[var(--color-border-glass)] text-teal-400 bg-transparent hover:border-teal-500/50 hover:bg-teal-950/20 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow"
                title="Connect on WhatsApp instantly"
                aria-label="Direct WhatsApp link"
              >
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.454L0 24zm6.59-4.846c1.6.95 3.149 1.45 4.674 1.451a9.92 9.92 0 005.148-1.423l.37-.22 3.826.1a12.022 12.022 0 00-.09-3.722l-.241-.383a9.954 9.954 0 001.401-5.066c.002-5.467-4.403-9.913-9.824-9.913a9.8 9.8 0 00-6.945 2.898A9.857 9.857 0 002.13 11.838a9.92 9.92 0 001.439 5.093l-.265.419L3.022 21.03l3.625-.953l-.001-.293z" />
                </svg>
              </a>
              
              {/* Call Now primary anchor */}
              <Button 
                size="sm" 
                variant="primary" 
                icon={<Phone className="w-4 h-4 text-slate-950 shrink-0" />}
                className="shadow-[var(--shadow-glow-gold)] border border-transparent font-semibold border-amber-500/20 text-xs tracking-wider"
                onClick={() => window.location.href = 'tel:+919452460040'}
              >
                Call: +91 94524 60040
              </Button>
            </div>

            {/* TABLET / MOBILE MENU TRIGGER BUTTON */}
            <div className="flex lg:hidden items-center gap-3">
              {/* Responsive WhatsApp Shortcut */}
              <a
                href="https://wa.me/919452460040"
                target="_blank"
                rel="noreferrer"
                className="p-2 sm:p-2.5 rounded-sm border border-[var(--color-border-glass)] text-teal-400 bg-transparent flex items-center justify-center shrink-0"
                aria-label="Direct WhatsApp link"
              >
                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.454L0 24zm6.59-4.846c1.6.95 3.149 1.45 4.674 1.451a9.92 9.92 0 005.148-1.423l.37-.22 3.826.1a12.022 12.022 0 00-.09-3.722l-.241-.383a9.954 9.954 0 001.401-5.066c.002-5.467-4.403-9.913-9.824-9.913a9.8 9.8 0 00-6.945 2.898A9.857 9.857 0 002.13 11.838a9.92 9.92 0 001.439 5.093l-.265.419L3.022 21.03l3.625-.953l-.001-.293z" />
                </svg>
              </a>

              <button
                type="button"
                className="p-2 sm:p-2.5 rounded-sm border border-[var(--color-border-glass)] text-[var(--color-text-muted)] hover:text-white transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)]"
                onClick={() => setMobileMenuOpen(true)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-panel"
                aria-label="Open primary menu navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

          </div>
        </Container>
      </header>

      {/* FULL-SCREEN SLIDE-OVER LUXURY DRAWER (AnimatePresence Overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark backing overlay mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-[4px] z-50"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sliding Content Drawer */}
            <motion.div
              id="mobile-navigation-panel"
              role="dialog"
              aria-modal="true"
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 w-full sm:max-w-md h-full bg-[var(--color-glass-surface)] border-l border-[var(--color-border-glass)] z-[100] flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-6 md:p-8">
                {/* Drawer close header line */}
                <div className="flex justify-between items-center pb-6 border-b border-[var(--color-border-glass)] mb-8">
                  <div className="font-serif text-lg text-white font-semibold flex items-center">
                    <span className="text-[var(--color-brand)] mr-1.5">✻</span>
                    OM SYSTEM
                  </div>
                  
                  <button
                    type="button"
                    className="p-2 border border-[var(--color-border-glass)] rounded-sm text-slate-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)]"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close navigation panel"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Main Link Stack Container */}
                <nav className="flex flex-col space-y-4" aria-label="Mobile primary menu stack">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.name.toLowerCase();
                    return (
                      <motion.div key={link.name} variants={staggerVariants}>
                        <a
                          href={link.hash || link.href}
                          onClick={(e) => handleNavClick(e, link)}
                          className={`flex items-center justify-between py-4 px-5 border rounded-sm transition-all duration-300 ${
                            isActive 
                              ? 'bg-[var(--color-slate-obsidian)] border-[var(--color-brand)] text-[var(--color-brand)] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.06)]' 
                              : 'bg-transparent border-[var(--color-border-glass)] text-white/80 hover:border-[var(--color-brand)]/40 hover:text-white'
                          }`}
                        >
                          <span className="font-serif text-lg tracking-wide uppercase font-light">
                            {link.name}
                          </span>
                          <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-300 opacity-60 ${
                            isActive ? 'text-[var(--color-brand)] rotate-45 scale-110 opacity-100' : 'text-slate-400'
                          }`} />
                        </a>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* HIGH CONVERSION CTAs FLOATED IN PANEL FOOTER */}
              <div className="p-6 md:p-8 bg-[var(--color-slate-midnight)]/90 border-t border-[var(--color-border-glass)] space-y-5">
                <span className="text-[10px] font-mono uppercase text-[var(--color-brand)] tracking-[0.25em] block text-center">
                  DIAL LOGISTICS COORDINATORS
                </span>

                <div className="flex flex-col gap-3">
                  {/* Option A: Quick WhatsApp message with template metadata */}
                  <a
                    href="https://wa.me/919452460040"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-4 px-6 border border-teal-500/20 bg-teal-950/10 text-teal-400 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform rounded-sm shadow text-xs uppercase tracking-wider font-semibold"
                  >
                    <svg className="w-5 h-5 text-teal-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.454L0 24zm6.59-4.846c1.6.95 3.149 1.45 4.674 1.451a9.92 9.92 0 005.148-1.423l.37-.22 3.826.1a12.022 12.022 0 00-.09-3.722l-.241-.383a9.954 9.954 0 001.401-5.066c.002-5.467-4.403-9.913-9.824-9.913a9.8 9.8 0 00-6.945 2.898A9.857 9.857 0 002.13 11.838a9.92 9.92 0 001.439 5.093l-.265.419L3.022 21.03l3.625-.953l-.001-.293z" />
                    </svg>
                    <span>Connect on WhatsApp</span>
                  </a>

                  {/* Option B: Standard phone dial link */}
                  <a
                    href="tel:+919452460040"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-4 px-6 bg-[var(--color-brand)] text-black flex items-center justify-center gap-3 active:scale-[0.98] transition-transform rounded-sm shadow-lg text-xs uppercase tracking-wider font-bold"
                  >
                    <Phone className="w-4 h-4 shrink-0 text-black animate-pulse" />
                    <span>Call +91 94524 60040</span>
                  </a>
                </div>

                <div className="text-[10px] text-center font-mono text-[var(--color-text-muted)] pt-2 uppercase">
                  Available 24/7 • direct owners connect
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
