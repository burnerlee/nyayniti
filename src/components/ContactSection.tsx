import React from 'react';
import { Link } from 'react-router-dom';

const ContactSection: React.FC = () => {
  return (
    <section className="relative py-16">
      {/* Dark overlay for the background image */}
      <div 
        className="absolute inset-0 bg-black/60 z-0"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'darken'
        }}
      ></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-playfair text-white mb-2">
              Book a free consultation with<br />
              NyayNiti Attorneys
            </h2>
          </div>
          
          <div className="flex flex-col items-start">
            <p className="text-white text-lg mb-6">
              We will respond to your inquiry<br />
              within 24 hours
            </p>
            <Link 
              to="/contact" 
              className="bg-gold hover:bg-darkGold text-white px-8 py-4 transition-colors text-lg"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
