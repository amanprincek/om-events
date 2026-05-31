import React from 'react';
import Hero from '../../components/Hero';
import About from '../../components/About';
import CommitmentBanner from '../../components/CommitmentBanner';
import Services from '../../components/Services';
import FeaturedProjects from '../../components/FeaturedProjects';
import WhyChooseUs from '../../components/WhyChooseUs';
import TrustTestimonials from '../../components/TrustTestimonials';
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
      <TrustTestimonials />
      <Contact />
    </>
  );
}
