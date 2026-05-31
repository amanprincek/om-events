import { Phone, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button, Container } from '@om-tent/ui-system';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Promise', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-[400ms] ${
        isScrolled ? 'bg-[var(--color-slate-midnight)]/95 backdrop-blur-[var(--blur-macro)] border-b border-[var(--color-border-glass)] py-4 shadow-[var(--shadow-glass-depth)]' : 'bg-transparent py-6'
      }`}
    >
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="font-serif text-2xl font-bold tracking-wider text-white flex items-center">
              OM TENT <span className="text-[var(--color-brand)] ml-2">HOUSE</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-overline text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button 
              size="sm" 
              variant="primary" 
              icon={<Phone className="w-4 h-4" />}
              onClick={() => window.location.href = '#contact'}
            >
              Book Now
            </Button>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-slate-obsidian)] border-b border-[var(--color-border-glass)] absolute w-full pb-6 shadow-2xl">
          <div className="flex flex-col px-6 pt-4 pb-3 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-overline text-[var(--color-text-primary)] hover:text-[var(--color-brand)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[var(--color-border-glass)]">
              <Button 
                variant="primary" 
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.open('https://wa.me/919452460040', '_blank');
                }}
              >
                Contact on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
