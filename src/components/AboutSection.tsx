import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="border-l-4 border-yellow-600 pl-4 mb-6">
              <h2 className="text-3xl md:text-4xl font-playfair">About Us</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Providing exceptional legal services with integrity and innovation.
            </p>
          </div>
          
          <div>
            <p className="text-gray-800 mb-8 text-justify">
              At NyayNiti, we are dedicated to providing exceptional legal services with integrity and a client-first approach. Our team of experts provide innovative, tailored approaches to address unique challenges.
            </p>
            
            <Link to="/about" className="border border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 transition-colors">
              Know more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
