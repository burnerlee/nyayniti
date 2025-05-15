import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import AboutSection from '../components/AboutSection';
import ClientsSection from '../components/ClientsSection';
import PracticeAreasSection from '../components/PracticeAreasSection';
import FoundersSection from '../components/FoundersSection';
import TestimonialsSection from '../components/TestimonialsSection';
import MediaSection from '../components/MediaSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <AboutSection />
      <ClientsSection />
      <PracticeAreasSection />
      <FoundersSection />
      <TestimonialsSection />
      <MediaSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
