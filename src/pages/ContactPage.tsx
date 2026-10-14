import React from 'react';
import ContactHero from '../components/ContactHero';
import ContactInfo from '../components/ContactInfo';
import Footer from '../components/Footer';
import pages from '../utils/pages.json';
import { useSeo } from '../utils/useSeo';

const ContactPage: React.FC = () => {
  useSeo(pages['/contact'].title, pages['/contact'].description);
  return (
    <div className="min-h-screen">
      <ContactHero />
    	<ContactInfo />
      <Footer />
    </div>
  );
};

export default ContactPage;
