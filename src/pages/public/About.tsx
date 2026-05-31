import React from 'react';
import { SEO } from '../../components/SEO';
import { Section, Container, Heading, GlassPanel, Badge } from "@om-tent/ui-system";
import { Users, History, Award, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-slate-midnight)] pt-20">
      <SEO 
        title="About Us"
        description="Founded in 2019, Om Tent House And Caterers in Anpara, Sonbhadra is dedicated to providing premium event infrastructure and catering services."
        canonical="/about"
      />
      <Section className="text-center min-h-[50vh] flex items-center justify-center">
        <Container>
          <span className="text-overline mb-6 block">Our Legacy</span>
          <Heading level={1} className="max-w-4xl mx-auto drop-shadow-lg">
            "Hamari Pehchaan Bharose Se Bani Hai"
          </Heading>
        </Container>
      </Section>

      <Section className="border-t border-[var(--color-border-glass)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <Heading level={2} className="mb-6">The Om Tent House Journey</Heading>
              <p className="text-[var(--color-text-muted)] font-light leading-relaxed mb-6">
                Founded in 2019 in Anpara, Sonbhadra, Om Tent House And Caterers was started with a simple commitment: 
                to transform local events into unforgettable experiences. Over the years, we have grown by focusing 
                on quality, reliability, and the deep trust our clients place in us.
              </p>
              <p className="text-[var(--color-text-muted)] font-light leading-relaxed">
                We believe every event is a family milestone, not just a job. Our journey from a small tent service 
                to a full-service event styling partner is defined by our dedication to premium standards and 
                family-centered service.
              </p>
            </div>
            <GlassPanel className="p-10 border-l-4 border-l-[var(--color-brand)]">
              <Heading level={3} className="mb-6 text-[var(--color-brand)]">Our Founders</Heading>
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium text-lg">Pawan Kumar</h4>
                  <p className="text-[var(--color-text-muted)]">Operations & Commitment Management</p>
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Gopal Kumar</h4>
                  <p className="text-[var(--color-text-muted)]">Creative & Client Styling Expert</p>
                </div>
              </div>
            </GlassPanel>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--color-border-glass)] text-center">
        <Container>
          <Heading level={3} className="mb-12">By The Numbers</Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Experience", value: "7+" },
              { label: "Guest Capacity", value: "2500+" },
              { label: "Simultaneous Events", value: "2–3" },
              { label: "Staff", value: "10–30" },
            ].map((stat, i) => (
              <GlassPanel key={i} className="p-6">
                <div className="text-[var(--color-brand)] text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider text-[var(--color-text-muted)]">{stat.label}</div>
              </GlassPanel>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
