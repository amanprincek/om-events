import React from 'react';
import { SEO } from '../../components/SEO';
import { Section, Container, Heading, GlassPanel, Badge } from "@om-tent/ui-system";
import { Tent, Utensils, Zap, Armchair, Palette, Building2 } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    { title: "Tent & Structures", icon: <Tent className="w-8 h-8" />, desc: "Premium waterproof tent setups for all weather conditions." },
    { title: "Decoration & Styling", icon: <Palette className="w-8 h-8" />, desc: "Floral, entrance, and stage design for aesthetic brilliance." },
    { title: "Lighting Systems", icon: <Zap className="w-8 h-8" />, desc: "Ambient and stage lighting to set the perfect mood." },
    { title: "Catering", icon: <Utensils className="w-8 h-8" />, desc: "Multi-cuisine, sanitary, and premium catering services." },
    { title: "Furniture & Seating", icon: <Armchair className="w-8 h-8" />, desc: "Royal seating arrangements and premium furniture." },
    { title: "Event Infrastructure", icon: <Building2 className="w-8 h-8" />, desc: "Complete event infrastructure management." },
  ];

  return (
    <div className="bg-[var(--color-slate-midnight)] pt-20">
      <SEO 
        title="Our Services"
        description="Explore premium event infrastructure services, including tent setup, decoration, lighting, catering, and furniture for weddings and corporate events."
        canonical="/services"
      />
      <Section className="text-center min-h-[40vh] flex items-center justify-center">
        <Container>
          <span className="text-overline mb-6 block">Our Solutions</span>
          <Heading level={1} className="max-w-4xl mx-auto">
            Comprehensive Event Infrastructure
          </Heading>
        </Container>
      </Section>
      <Section className="border-t border-[var(--color-border-glass)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <GlassPanel key={i} className="p-8 hover:border-[var(--color-brand)] transition-colors">
                <div className="text-[var(--color-brand)] mb-6">{s.icon}</div>
                <Heading level={4} className="mb-4">{s.title}</Heading>
                <p className="text-[var(--color-text-muted)] font-light">{s.desc}</p>
              </GlassPanel>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
