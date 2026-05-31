import React from 'react';
import { SEO } from '../../components/SEO';
import { Section, Container, Heading, GlassPanel, Button, Input } from "@om-tent/ui-system";
import { Phone, MessageCircle, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-slate-midnight)] pt-20">
      <SEO 
        title="Contact Us"
        description="Get in touch with Om Tent House And Caterers for your next event in Anpara, Sonbhadra. Book our services for weddings, receptions, and more."
        canonical="/contact"
      />
      <Section className="text-center">
        <Container>
          <Heading level={1} className="mb-10">Start Your Event Journey</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <GlassPanel className="p-8 text-center"><Phone className="mx-auto mb-4 text-[var(--color-brand)]"/><Heading level={4}>Call Us</Heading><p className="text-[var(--color-text-muted)] mt-2 font-light text-xl">+91 94524 60040</p></GlassPanel>
              <GlassPanel className="p-8 text-center"><MessageCircle className="mx-auto mb-4 text-[var(--color-brand)]"/><Heading level={4}>WhatsApp</Heading><p className="text-[var(--color-text-muted)] mt-2 font-light">Available 24/7</p></GlassPanel>
              <GlassPanel className="p-8 text-center"><MapPin className="mx-auto mb-4 text-[var(--color-brand)]"/><Heading level={4}>Site Visit</Heading><p className="text-[var(--color-text-muted)] mt-2 font-light">Anpara, Sonbhadra</p></GlassPanel>
          </div>
          
          <GlassPanel className="p-12 max-w-2xl mx-auto text-left">
            <Heading level={3} className="mb-8">Send Your Inquiry</Heading>
            <form className="space-y-6">
                <Input placeholder="Name" />
                <Input placeholder="Phone Number" />
                <Input placeholder="Event Type (e.g. Wedding)" />
                <Button variant="primary" className="w-full">Submit Inquiry</Button>
            </form>
          </GlassPanel>
        </Container>
      </Section>
    </div>
  );
}
