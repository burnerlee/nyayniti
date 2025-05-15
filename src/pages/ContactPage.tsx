import React from 'react';
import ContactHero from '../components/ContactHero';
import ContactInfo from '../components/ContactInfo';
import Footer from '../components/Footer';
import { Mail, MapPin, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <ContactHero />
    	<ContactInfo />
      <Footer />
    </div>
  );
};

export default ContactPage;
