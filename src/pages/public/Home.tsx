import React from 'react';
import Hero from '../../components/Hero';
import About from '../../components/About';
import CommitmentBanner from '../../components/CommitmentBanner';
import Services from '../../components/Services';
import FeaturedProjects from '../../components/FeaturedProjects';
import WhyChooseUs from '../../components/WhyChooseUs';
import EventJourney from '../../components/EventJourney';
import TrustTestimonials from '../../components/TrustTestimonials';
import FAQExperience from '../../components/FAQExperience';
import LeadConversionFunnel from '../../components/LeadConversionFunnel';
import Contact from '../../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CommitmentBanner />
      <Services />
      <FeaturedProjects />
      <WhyChooseUs />
      <EventJourney />
      <TrustTestimonials />
      <FAQExperience />
      <LeadConversionFunnel />
      <Contact />
    </>
  );
}
