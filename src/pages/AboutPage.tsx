import React from 'react';
import AboutHero from '../components/AboutHero';
import AboutFirmSection from '../components/AboutFirmSection';
import JourneySection from '../components/JourneySection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import FoundersProfileSection from '../components/FoundersProfileSection';
import MeetAttorneysSection from '../components/MeetAttorneysSection';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutFirmSection />
      <JourneySection />
      <WhyChooseUsSection />
      <FoundersProfileSection />
      <MeetAttorneysSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
