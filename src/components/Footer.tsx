import { Container } from '@om-tent/ui-system';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-slate-midnight)] border-t border-[var(--color-border-glass)] py-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-10 border-b border-[var(--color-border-glass)] gap-8 text-center md:text-left">
          
          <div>
            <a href="#home" className="font-serif text-2xl font-bold tracking-wider text-white">
              OM TENT <span className="text-[var(--color-brand)] ml-2">HOUSE</span>
            </a>
            <p className="text-[var(--color-text-muted)] text-sm mt-3 font-light font-sans max-w-sm">Premium Event Execution Partner serving Anpara & surrounding regions.</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-10 gap-y-4">
            <a href="#about" className="text-overline text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors">Trust</a>
            <a href="#services" className="text-overline text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors">Services</a>
            <a href="#contact" className="text-overline text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="flex flex-col flex-col-reverse md:flex-row justify-between items-center text-[var(--color-text-muted)] text-sm font-light font-sans gap-4">
          <p>&copy; {new Date().getFullYear()} Om Tent House And Caterers. All rights reserved.</p>
          <p className="border border-[var(--color-border-glass)] px-4 py-2 rounded-[var(--radius-pill)]">Founded 2019 • Managed by Pawan & Gopal Kumar</p>
        </div>
      </Container>
    </footer>
  );
}
