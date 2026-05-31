import React from 'react';
import Hero from '../../components/Hero';
import About from '../../components/About';
import CommitmentBanner from '../../components/CommitmentBanner';
import Services from '../../components/Services';
import Contact from '../../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <CommitmentBanner />
      <Services />
      <Contact />
    </>
  );
}
