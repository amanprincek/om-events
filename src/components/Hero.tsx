import { MessageCircle, PhoneCall } from "lucide-react";
import { Container, Heading, Button } from "@om-tent/ui-system";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Wedding Event Setup" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-slate-midnight)] via-[var(--color-slate-midnight)]/60 to-[var(--color-slate-midnight)]"></div>
      </div>

      <Container className="relative z-10 pt-20 text-center">
        <span className="text-overline mb-6 block drop-shadow-md">
          Auri, Anpara & Surrounding Regions
        </span>
        <Heading level={1} className="mb-6 drop-shadow-lg max-w-5xl mx-auto">
          Bade Events Aur Shaadiyan, <br/>
          <span className="font-light italic opacity-90 text-[var(--color-brand)]">Bina Kisi Rok-Tok Ke Poore.</span>
        </Heading>
        <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto font-sans font-light drop-shadow-md leading-relaxed">
          Ekdam pyaare waterproof tent setups se lekar premium bartan aur catering decoration tak, hum aapke parivaar ke sabse bade din ko sundar, tension-free aur behad shandaar banate hain.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="primary" 
            size="lg"
            icon={<MessageCircle className="w-5 h-5" />}
            onClick={() => window.open('https://wa.me/919452460040', '_blank')}
            className="w-full sm:w-auto"
          >
            WhatsApp Karein
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            icon={<PhoneCall className="w-5 h-5" />}
            onClick={() => window.location.href = 'tel:+919452460040'}
            className="w-full sm:w-auto"
          >
            Call Karein
          </Button>
        </div>
      </Container>
    </section>
  );
}
