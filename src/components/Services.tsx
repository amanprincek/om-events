import { Utensils, Tent, Sparkles, Lamp } from 'lucide-react';
import { Section, Container, Heading, GlassPanel, Badge } from "@om-tent/ui-system";

export default function Services() {
  const services = [
    {
      title: "Grand Tent Setup",
      description: "Premium, weather-resistant structural tenting with royal draping, carpeting, and staging for events of all scales.",
      icon: <Tent className="w-8 h-8 text-[var(--color-brand)]" />,
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Royal Catering",
      description: "Exquisite culinary experiences. From traditional regional delicacies to modern multi-cuisine spreads with impeccable service.",
      icon: <Utensils className="w-8 h-8 text-[var(--color-brand)]" />,
      image: "https://images.unsplash.com/photo-1555507036-ab1e4006aa06?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Thematic Decoration",
      description: "Bespoke floral arrangements, entrance gates, stage backgrounds, and table centerpieces tailored to your vision.",
      icon: <Sparkles className="w-8 h-8 text-[var(--color-brand)]" />,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Premium Lighting",
      description: "Ambient, architectural, and dynamic stage lighting that transforms ordinary locations into magical venues.",
      icon: <Lamp className="w-8 h-8 text-[var(--color-brand)]" />,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const categories = [
    "Weddings & Receptions",
    "Corporate Events",
    "Religious Functions",
    "Birthday Celebrations",
    "School Functions",
  ];

  return (
    <Section id="services" className="bg-[var(--color-slate-midnight)]">
      <Container>
        <div className="text-center mb-20">
          <span className="text-overline mb-4 block">What We Offer</span>
          <Heading level={2} className="mb-6">Masterpieces in Infrastructure</Heading>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto font-light text-lg">
            We provide comprehensive end-to-end event infrastructure, ensuring complete synergy between setup, aesthetics, and hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {services.map((service, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[var(--radius-sharp)] border border-[var(--color-border-glass)]">
              <div className="absolute inset-0 z-0">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-[var(--transition-slow)] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-slate-midnight)] via-[var(--color-slate-midnight)]/80 to-transparent"></div>
              </div>
              
              <div className="relative z-10 p-10 flex flex-col h-full justify-end min-h-[360px]">
                <GlassPanel intensity="ambient" className="mb-6 w-16 h-16 rounded-[var(--radius-sharp)] flex items-center justify-center border-none border-[var(--color-border-glass)] shadow-[var(--shadow-glow-gold)]">
                  {service.icon}
                </GlassPanel>
                <Heading level={3} className="mb-4 group-hover:text-[var(--color-brand)] transition-colors">
                  {service.title}
                </Heading>
                <p className="text-[var(--color-text-muted)] font-light leading-relaxed max-w-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--color-border-glass)] pt-20 text-center">
          <h3 className="text-overline mb-8 text-[var(--color-text-primary)]">We Specialize In</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, idx) => (
              <Badge key={idx}>{cat}</Badge>
            ))}
          </div>
        </div>

      </Container>
    </Section>
  );
}
