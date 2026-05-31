import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { Section, Container, Heading, GlassPanel, Button } from "@om-tent/ui-system";

export default function Contact() {
  return (
    <Section id="contact" className="bg-[var(--color-slate-midnight)] relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-overline mb-4 block">Get In Touch</span>
            <Heading level={2} className="mb-6">Let's craft your grand event.</Heading>
            <p className="text-[var(--color-text-muted)] font-light text-lg mb-12 max-w-md leading-relaxed">
              Contact us to discuss your vision. We prioritize immediate responses because we know your peace of mind matters.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-5">
                <GlassPanel intensity="ambient" className="p-4 rounded-[var(--radius-sharp)] text-[var(--color-brand)] shrink-0">
                  <Phone className="w-6 h-6" />
                </GlassPanel>
                <div>
                  <h4 className="text-overline mb-2 text-white">Direct Phone</h4>
                  <a href="tel:+919452460040" className="block text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors text-lg mb-1">
                    +91 94524 60040 (Primary)
                  </a>
                  <a href="tel:+919653011551" className="block text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors text-lg">
                    +91 96530 11551 (Alternative)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <GlassPanel intensity="ambient" className="p-4 rounded-[var(--radius-sharp)] text-[var(--color-brand)] shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </GlassPanel>
                <div>
                  <h4 className="text-overline mb-2 text-white">WhatsApp</h4>
                  <p className="text-[var(--color-text-muted)] mb-3 font-light">Available for quick queries and bookings.</p>
                  <a 
                    href="https://wa.me/919452460040" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center text-[var(--color-brand)] hover:text-[var(--color-champagne)] font-medium transition-colors border-b border-[var(--color-brand)] pb-1"
                  >
                    Chat with Pawan Kumar <span>&rarr;</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <GlassPanel intensity="ambient" className="p-4 rounded-[var(--radius-sharp)] text-[var(--color-brand)] shrink-0">
                  <MapPin className="w-6 h-6" />
                </GlassPanel>
                <div>
                  <h4 className="text-overline mb-2 text-white">Office Location</h4>
                  <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                    Om Tent House, Auri <br/>
                    Anpara, Sonbhadra <br/>
                    Uttar Pradesh, India
                  </p>
                  <p className="text-[var(--color-text-muted)] mt-2 text-sm italic font-light opacity-80">
                    Serving Anpara, Auri, Sonbhadra, Renusagar, Shaktinagar, and surrounding areas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-10">
            <GlassPanel intensity="macro" className="p-10 lg:p-14 rounded-[var(--radius-sharp)] flex flex-col justify-center relative overflow-hidden h-full">
               {/* Decorative pattern */}
               <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(var(--color-brand)_1px,transparent_1px)] [background-size:24px_24px]"></div>
               
               <div className="relative z-10 text-center">
                <Heading level={3} className="mb-6">Request a Consultation</Heading>
                <p className="text-[var(--color-text-muted)] font-light mb-10 max-w-sm mx-auto">
                  Due to our commitment to quality, we only accept a limited number of bookings per season. Early discussions are recommended.
                </p>
                
                <div className="bg-[var(--color-slate-midnight)] p-8 rounded-[var(--radius-sharp)] border border-[var(--color-border-glass)] text-left w-full max-w-sm mx-auto shadow-[var(--shadow-trust-anchor)] relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--color-border-glass)] to-transparent pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-[var(--color-border-glass)]">
                    <span className="text-[var(--color-text-muted)] text-sm">Owner & Manager</span>
                    <span className="text-[var(--color-text-primary)] font-medium pl-6 text-right">Pawan Kumar</span>
                  </div>
                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-[var(--color-border-glass)]">
                    <span className="text-[var(--color-text-muted)] text-sm">Working Languages</span>
                    <span className="text-[var(--color-text-primary)] font-medium pl-6 text-right">Hindi, English, Bhojpuri</span>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={() => window.open('https://wa.me/919452460040', '_blank')}
                  >
                    Message Us Directly
                  </Button>
                </div>
               </div>
            </GlassPanel>
          </div>
        </div>
      </Container>
    </Section>
  );
}
